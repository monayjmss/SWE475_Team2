function myfunction(){
    var x = document.getElementById("password");

    if (x.type === "password"){
        x.type = "text";
    }
    else{
        x.type = "password";
    }
}

//    function validate(){
//        event.preventDefault();
//        var password = document.getElementById("password");
//
//        if (password.value.length >= 8){
//            window.location.replace("homepage.html");
//            return false;
//        } else{ 
//            alert("Login Failed");
//        }
//    }

async function validate(event) {
    event.preventDefault(); // Prevent form submission

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        alert("Please enter both username and password.");
        return;
    }

    try {
        // Fetch and read the Excel file
        let response = await fetch("C:\Users\Owner\OneDrive\Desktop\SWE475_Team2\Back_end\login.xlsx"); // Adjust path if needed
        let arrayBuffer = await response.arrayBuffer();
        let workbook = XLSX.read(arrayBuffer, { type: "array" });

        let sheetName = workbook.SheetNames[0];
        let sheet = workbook.Sheets[sheetName];

        // Convert sheet to JSON
        let data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Check credentials
        let validUser = false;

        for (let i = 1; i < data.length; i++) { // Start from index 1 to skip headers
            if (data[i][0] === username && data[i][1] === password) {
                validUser = true;
                break;
            }
        }

        if (validUser) {
            alert("Login successful!");
            // Redirect to another page if needed
            window.location.href = "C:\Users\Owner\OneDrive\Desktop\SWE475_Team2\Front_end\homepage.html"; // Adjust target page
        } else {
            alert("Invalid username or password. Please try again.");
        }
    } catch (error) {
        console.error("Error reading the Excel file:", error);
        alert("An error occurred while processing the login. Please try again later.");
    }
}


//document.getElementById('registrationForm').addEventListener('submit', function(event){
//    validate(event);
//})

