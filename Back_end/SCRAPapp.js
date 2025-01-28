const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000; //this is our port number
const xlsx = require('xlsx');
const fs = require('fs');
const app = express(); //this is our app or instance of express

//static files (CS, JS, images)
app.use(express.static(__dirname));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '/Front_end/index.html'));
});
//route for registration form
app.get('/apply.html', (req,res) => {
    res.sendFile(path.join(__dirname, '/Front_end/PhaseI/apply.html')); //make sure in same directory... cause its not rn 
});


//API ROUTES

//route to handle form submissions
app.post('/submit',(req,res)=>{
    const formData = req.body;

    //check if exce file exists, if not create
    const filePath = path.join(__dirname, '.data.xlsx');
    let wb; 
    if (fs.existsSync(filePath)){
        wb = xlsx.readFile(filePath); //read existing excel file
    } else{
        wb = xlsx.utils.book_new(); //create a new sheet if file doeesnt exist
    }

    //create or access sheet
    let ws = wb.Sheets['Sheet1'];
    if (!ws){
        ws = xlsx.utils.aoa_to_sheet([ //create sheet if it doesnt exist
            ['Full Name', 'DOB', 'Email', 'Mobile #', 'Gender', 
                'Occupation', 'ID Type', 'ID #', 'Issued Authority', 
                'Issued State', 'Issued Date', 'Expiry Date', 'Address Type', 
                'Nationality', 'State', 'District', 'Block #', 'Ward #', 
                'Father Name', 'Mother Name', 'Grandfather', 'Spouse Name', 
                'FIL', 'MIL']
        ]);
    }
    //add new row to sheet with form data
    const newRow = [
        formData.fullName, 
        formData.dob, 
        formData.email, 
        formData.mobile, 
        formData.gender, 
        formData.occupation, 
        formData.idType, 
        formData.idNumber, 
        formData.issuedAuthority, 
        formData.issuedState, 
        formData.issuedDate, 
        formData.expirationDate, 
        formData.addressType, 
        formData.nationality, 
        formData.state, 
        formData.district, 
        formData.blockNumber, 
        formData.wardNumber, 
        formData.fatherName, 
        formData.motherName,
        formData.grandfather, 
        formData.spouseName, 
        formData.fatherInLaw, 
        formData.motherInLaw
    ];
    //append data to sheet
    if (!ws['!rows']) ws['!rows'] = [];
    ws['!rows'].push(newRow);

    //write update excel file
    xlsx.writeFile(wb,filePath);

    //write response for applicant
    res.send('Form submitted successfully!');
});

//start server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
});