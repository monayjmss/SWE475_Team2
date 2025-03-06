function myfunction(){
    var x = document.getElementById("password");

    if (x.type === "password"){
        x.type = "text";
    }
    else{
        x.type = "password";
    }
}
const bcrypt = window.bcrypt || require('bcryptjs'); 
//    function validate(){
//        event.preventDefault();
//        var password = document.getElementById("password");

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
        console.log("Fetching the Excel file...");

        // Fetch and read the Excel file
        let response = await fetch("../Back_end/login.xlsx"); 
        let arrayBuffer = await response.arrayBuffer();
        let workbook = XLSX.read(arrayBuffer, { type: "array" });

        let sheetName = workbook.SheetNames[0];
        let sheet = workbook.Sheets[sheetName];

        // Convert sheet to JSON
        let data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        console.log("Excel data:", data);


        let validUser = false;

        for (let i = 1; i < data.length; i++) { // Start from index 1 to skip headers
            let storedUsername = data[i][0];  // Username from Excel
            let storedHashedPassword = data[i][1]; // Hashed password from Excel

            console.log(`Checking user: ${storedUsername}`);
            if (storedUsername === username) {
                let match = await bcrypt.compare(password, storedHashedPassword);
                if (match) {
                validUser = true;
                break;
            }
        }
    }
        if (validUser) {
            alert("Login successful!");
            // Redirect to another page if needed
            window.location.href = "../Front_end/homepage.html"; 
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

