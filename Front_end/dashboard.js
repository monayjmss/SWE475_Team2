// Load AWS SDK
AWS.config.update({
     
    region: "us-east-1"  // Change to your AWS region
});

const s3 = new AWS.S3();
const bucketName = "student-applications-bucket"; // Replace with your S3 bucket name
const fileName = "applications.json";

let applications = []; // Stores all applications
let filteredApplications = []; // Used for searching and filtering

let currentPage = 1;
const rowsPerPage = 5; // Adjust as needed

// Fetch applications from S3
async function fetchApplications() {
    try {
        const params = { Bucket: bucketName, Key: fileName };
        const data = await s3.getObject(params).promise();

        applications = JSON.parse(data.Body.toString("utf-8"));
        filteredApplications = [...applications]; // Ensure filteredApplications is assigned
        displayTable(); // Populate the table
    } catch (error) {
        console.error("Error fetching applications:", error);
    }
}

// Display applications with pagination
function displayTable() {
    const tableBody = document.getElementById("appTable");
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = applications.slice(start, end);

    paginatedItems.forEach((app, index) => {
        const actualIndex = start + index; // Map paginated index to actual applications index

        const reviewedClass = app.reviewed.toLowerCase() === "yes" ? "reviewed-yes" : "reviewed-no";
        const renewedClass = app.renewed.toLowerCase() === "yes" ? "renewed-yes" : "renewed-no";
        const categoryClass = app.category.toLowerCase() === "traditional" ? "category-traditional" : "category-non-traditional";

        const row = `<tr onclick="showDetails(${actualIndex})">
            <td>${app.lastName}, ${app.firstName}</td>
            <td>${app.applicationNumber}</td>
            <td class="${categoryClass}">${app.category}</td>
            <td contenteditable="true" onBlur="editApplication(${actualIndex}, 'score', this.innerText)">${app.score}</td>
            <td>${app.rank}</td>
            <td contenteditable="true" class="${renewedClass}" onBlur="editApplication(${actualIndex}, 'renewed', this.innerText)">${app.renewed}</td>
            <td contenteditable="true" class="${reviewedClass}" onBlur="editApplication(${actualIndex}, 'reviewed', this.innerText)">${app.reviewed}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });

    document.getElementById("page-info").innerText = `Page ${currentPage} of ${Math.ceil(applications.length / rowsPerPage)}`;
}

function showDetails(index) {
    let app = applications[index];
    let details = `Applicant: ${app.firstName} ${app.lastName}\n\n`
        + `Address: ${app.address}, ${app.city}, ${app.state} ${app.zipCode}\n`
        + `Phone: ${app.phone}\n`
        + `Email: ${app.email}\n\n`
        + `High School: ${app.highSchool}\n`
        + `Graduation Date: ${app.gradDate}\n`
        + `GPA: ${app.GPA}`;

    document.getElementById("modal-text").innerText = details;
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}





// Pagination controls
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

// Search function
function filterTable() {
    const searchInput = document.getElementById("search").value.toLowerCase().trim();
    
    if (searchInput === "") {
        filteredApplications = [...applications]; // Reset to full dataset when search is empty
    } else {
        filteredApplications = applications.filter(app =>
            (app.lastName && app.lastName.toLowerCase().includes(searchInput)) ||
            (app.firstName && app.firstName.toLowerCase().includes(searchInput)) ||
            (app.applicationNumber && app.applicationNumber.toString().toLowerCase().includes(searchInput)) ||
            (app.category && app.category.toLowerCase().includes(searchInput)) ||
            (app.score && app.score.toString().toLowerCase().includes(searchInput)) ||
            (app.rank && app.rank.toString().toLowerCase().includes(searchInput)) ||
            (app.renewed && app.renewed.toLowerCase().includes(searchInput)) ||
            (app.reviewed && app.reviewed.toLowerCase().includes(searchInput))
        );
    }
    
    currentPage = 1; // Reset to first page
    displayTable();
}

// Attach event listener for real-time search functionality
document.getElementById("search").addEventListener("input", filterTable);

function editApplication(index, field, value) {
    applications[index][field] = value.trim(); // Update in main dataset
    filteredApplications = [...applications]; // Sync filtered list
}



async function saveApplicationsToS3() {
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: JSON.stringify(applications), // Convert updated data to JSON
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



// Initialize fetch on page load
fetchApplications();

/*[ This is how it needs to be formatted in S3 for me.
    {
        "lastName": "Doe",
        "firstName": "John",
        "applicationNumber": "2024001",
        "category": "Traditional",
        "score": 85,
        "rank": 2,
        "renewed": "Yes",
        "reviewed": "No"
    },
    {
        "lastName": "Smith",
        "firstName": "Jane",
        "applicationNumber": "2024002",
        "category": "Non-Traditional",
        "score": 90,
        "rank": 1,
        "renewed": "No",
        "reviewed": "Yes"
    }
]

JSON IAM POLICY:
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-bucket-name/applications.json"
        }
    ]
}



*/