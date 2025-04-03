// Load AWS SDK
AWS.config.update({
    
    region: "us-east-1"
});

const s3 = new AWS.S3();
const bucketName = "student-applications-bucket";
const fileName = "applications.json";

let applications = [];
let filteredApplications = [];

let currentPage = 1;
const rowsPerPage = 5;

async function fetchApplications() {
    try {
        const params = { Bucket: bucketName, Key: fileName };
        const data = await s3.getObject(params).promise();

        applications = JSON.parse(data.Body.toString("utf-8"));
        filteredApplications = [...applications];
        displayTable();
    } catch (error) {
        console.error("Error fetching applications:", error);
    }
}

function displayTable() {
    const tableBody = document.getElementById("appTable");
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = filteredApplications.slice(start, end);

    paginatedItems.forEach((app, index) => {
        const actualIndex = start + index;

        const row = `<tr>
            <td>${app.last_name}, ${app.first_name}</td>
            <td>${app.application_id}</td>
            <td>
                <select onchange="editApplication(${actualIndex}, 'category', this.value)">
                    <option value="Traditional" ${app.category === 'Traditional' ? 'selected' : ''}>Traditional</option>
                    <option value="Non-Traditional" ${app.category === 'Non-Traditional' ? 'selected' : ''}>Non-Traditional</option>
                    <option value="STEAM" ${app.category === 'STEAM' ? 'selected' : ''}>STEAM</option>
                </select>
            </td>
            <td>
                <select onchange="editApplication(${actualIndex}, 'status', this.value)">
                    <option value="Reviewed" ${app.status === 'Reviewed' ? 'selected' : ''}>Reviewed</option>
                    <option value="Renewed" ${app.status === 'Renewed' ? 'selected' : ''}>Renewed</option>
                    <option value="Awarded" ${app.status === 'Awarded' ? 'selected' : ''}>Awarded</option>
                    <option value="Rejected" ${app.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                    <option value="Needs More Info" ${app.status === 'Needs More Info' ? 'selected' : ''}>Needs More Info</option>
                    <option value="Not Reviewed" ${app.status === 'Not Reviewed' ? 'selected' : ''}>Not Reviewed</option>
                </select>
            </td>
            <td>${app.submissionDate || "N/A"}</td>
            <td contenteditable="true" onBlur="editApplication(${actualIndex}, 'score', this.innerText)">${app.score}</td>
            <td><button onclick="showDetails(${actualIndex})" title="View Details">🔍</button></td>
            <td><button onclick="openEmailModal(${actualIndex})" title="Send Email">✉️</button></td>
        </tr>`;
        tableBody.innerHTML += row;
    });

    document.getElementById("page-info").innerText = `Page ${currentPage} of ${Math.ceil(filteredApplications.length / rowsPerPage)}`;
}

function showDetails(index) {
    const app = applications[index];
    const details = `
Applicant: ${app.first_name} ${app.last_name}

Address: ${app.address}, ${app.city}, ${app.state} ${app.zipcode}
Phone: ${app.phone || "N/A"}
Email: ${app.email || "N/A"}

High School: ${app.highschool || "N/A"}
Graduation Date: ${app.graduation_date || "N/A"}
GPA: ${app.GPA || "N/A"}
SAT: ${app.SAT || "N/A"}
ACT: ${app.ACT || "N/A"}

College: ${app.college_name || "N/A"}
College Location: ${app.college_city || ""}, ${app.college_state || ""}

Accepted: ${app.accepted ? "Yes" : "No"}

Parent/Guardian 1: ${app.parent1_name || "N/A"} (${app.parent1_phone || "N/A"})
Parent/Guardian 2: ${app.parent2_name || "N/A"} (${app.parent2_phone || "N/A"})

Awards: ${app.awards || "N/A"}
School/Org Activity: ${app.school_org_activity || "N/A"}
Volunteer/Community Activity: ${app.vol_community_activity || "N/A"}
Work Experience: ${app.work_experience || "N/A"}

Personal Statement:
${app.personal_statement || "N/A"}
    `.trim();

    document.getElementById("modal-text").innerText = details;
    document.getElementById("modal").style.display = "block";
    document.getElementById("modal-overlay").style.display = "block";
}


function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("modal-overlay").style.display = "none";
}

function nextPage() {
    if (currentPage * rowsPerPage < applications.length) {
        currentPage++;
        displayTable();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayTable();
    }
}

function filterTable() {
    const searchInput = document.getElementById("search").value.toLowerCase().trim();

    if (searchInput === "") {
        filteredApplications = [...applications];
    } else {
        filteredApplications = applications.filter(app =>
            (app.last_name && app.last_name.toLowerCase().includes(searchInput)) ||
            (app.first_name && app.first_name.toLowerCase().includes(searchInput)) ||
            (app.application_id && app.application_id.toString().toLowerCase().includes(searchInput)) ||
            (app.category && app.category.toLowerCase().includes(searchInput)) ||
            (app.score && app.score.toString().toLowerCase().includes(searchInput))
        );
    }

    currentPage = 1;
    displayTable();
}

document.getElementById("search").addEventListener("input", filterTable);

function editApplication(index, field, value) {
    applications[index][field] = value.trim();
    filteredApplications = [...applications];
}

async function saveApplicationsToS3() {
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: JSON.stringify(applications),
        ContentType: "application/json"
    };

    try {
        await s3.putObject(params).promise();
        alert("Changes saved successfully!");
    } catch (error) {
        console.error("Error saving to S3:", error);
        alert("Failed to save changes.");
    }
}

// Auto timeout
let idleTime = 0;
const maxIdleMinutes = 15;
const redirectUrl = "timeout.html";

function resetIdleTimer() {
    idleTime = 0;
}

setInterval(() => {
    idleTime++;
    if (idleTime >= maxIdleMinutes) {
        window.location.href = redirectUrl;
    }
}, 60000);

["mousemove", "keydown", "scroll", "touchstart"].forEach(event => {
    document.addEventListener(event, resetIdleTimer);
});

function openEmailModal(index) {
    const app = applications[index];

    const email = app.email;
    let subject = "";
    let body = "";

    switch (app.status) {
        case "Awarded":
            subject = "Congratulations on Your Scholarship Award!";
            body = `Dear ${app.first_name},\n\nWe are thrilled to inform you that you have been selected as a recipient of our scholarship award. Congratulations!\n\nPlease reply with any questions.\n\nBest,\nScholarship Committee`;
            break;
        case "Rejected":
            subject = "Scholarship Application Decision";
            body = `Dear ${app.first_name},\n\nThank you for applying. Unfortunately, you were not selected this time. We wish you the best in your academic journey.\n\nSincerely,\nScholarship Committee`;
            break;
        case "Needs More Info":
            subject = "Additional Info Needed for Your Application";
            body = `Dear ${app.first_name},\n\nWe need more information to process your application. Please respond with the missing details.\n\nThanks,\nScholarship Committee`;
            break;
        case "Renewed":
            subject = "Your Scholarship Has Been Renewed!";
            body = `Dear ${app.first_name},\n\nWe are happy to inform you that your scholarship has been renewed for the upcoming academic period.\n\nPlease check your email for any next steps or required documentation.\n\nCongratulations again, and we wish you continued success!\n\nBest,\nScholarship Committee`;
            break;
        default:
            subject = "Your Scholarship Application Status";
            body = `Dear ${app.first_name},\n\nYour current status is: ${app.status}.\n\nIf you have any questions, feel free to reply.\n\nBest,\nScholarship Committee`;
    }

    const fullName = `${app.first_name} ${app.last_name}`;
    const emailInput = document.getElementById("emailTo");
    emailInput.value = email;
    emailInput.dataset.fullname = fullName; 
    document.getElementById("emailSubject").value = subject;
    document.getElementById("emailBody").value = body;

    document.getElementById("email-modal").style.display = "block";
    document.getElementById("email-modal-overlay").style.display = "block";
}

function closeEmailModal() {
    document.getElementById("email-modal").style.display = "none";
    document.getElementById("email-modal-overlay").style.display = "none";
}


async function sendEmailFromModal() {
    const to = document.getElementById("emailTo").value;
    const subject = document.getElementById("emailSubject").value;
    const body = document.getElementById("emailBody").value;
    const name = document.getElementById("emailTo").dataset.fullname || to.split("@")[0];

    try {
        const response = await fetch("send_email.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: to,
                name: name,
                subject: subject,
                body: body
            })
        });

        const result = await response.json();

        if (result.success) {
            alert("Email sent successfully!");
            closeEmailModal();
        } else {
            alert("Failed to send email: " + (result.error || "Unknown error"));
        }
    } catch (error) {
        console.error("Error sending email:", error);
        alert("Error sending email.");
    }
}


function copyApplicationLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert("Link copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy link: ", err);
        alert("Failed to copy the link.");
    });
}




fetchApplications();
