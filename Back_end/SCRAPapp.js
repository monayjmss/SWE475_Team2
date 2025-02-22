const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000; //this is our port number
const xlsx = require('xlsx');
const fs = require('fs');
const app = express(); //this is our app or instance of express
const emailSend = require('./email'); //import the email service

//static files (CS, JS, images)
app.use(express.static(path.join(__dirname, '..')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../Front_end/index.html'));
});
//route for registration form
app.get('/apply.html', (req,res) => {
    res.sendFile(path.join(__dirname, '../Front_end/PhaseI/apply.html')); //make sure in same directory... cause its not rn 
});


//API ROUTES

//route to handle form submissions
app.post('/submit', async(req,res)=>{
    const formData = req.body;

    try{
        //check if exce file exists, if not create
        const filePath = path.join(__dirname, 'data.xlsx');
        let wb; 
        if (fs.existsSync(filePath)){
            wb = xlsx.readFile(filePath); //read existing excel file
        } else{
            wb = xlsx.utils.book_new(); //create a new sheet if file doesnt exist
            wb.SheetNames.push('Sheet1');
            wb.Sheets['Sheet1'] = xlsx.utils.aoa_to_sheet([
                ['Full Name', 'DOB', 'Email', 'Mobile #', 'Gender', 
                    'Occupation', 'ID Type', 'ID #', 'Issued Authority', 
                    'Issued State', 'Issued Date', 'Expiry Date', 'Address Type', 
                    'Nationality', 'State', 'District', 'Block #', 'Ward #', 
                    'Father Name', 'Mother Name', 'Grandfather', 'Spouse Name', 
                    'FIL', 'MIL']
            ]);
        }

        //create or access sheet
        let ws = wb.Sheets['Sheet1'];
        let data =xlsx.utils.sheet_to_json(ws);
        //add new row to sheet with form data
        data.push({
            'Full Name': formData.fullName,
            'DOB': formData.dob,
            'Email': formData.email,
            'Mobile #': formData.mobile,
            'Gender': formData.gender || '',
            'Occupation': formData.occupation || '',
            'ID Type': formData.idType || '',
            'ID #': formData.idNumber || '',
            'Issued Authority': formData.issuedAuthority || '',
            'Issued State': formData.issuedState || '',
            'Issued Date': formData.issuedDate || '',
            'Expiry Date': formData.expirationDate || '',
            'Address Type': formData.addressType || '',
            'Nationality': formData.nationality || '',
            'State': formData.state || '',
            'District': formData.district || '',
            'Block #': formData.blockNumber || '',
            'Ward #': formData.wardNumber || '',
            'Father Name': formData.fatherName || '',
            'Mother Name': formData.motherName || '',
            'Grandfather': formData.grandfather || '',
            'Spouse Name': formData.spouseName || '',
            'FIL': formData.fatherInLaw || '',
            'MIL': formData.motherInLaw || ''
        });
        
        //convert back to worksheet
        wb.Sheets['Sheet1'] = xlsx.utils.json_to_sheet(data);

        //write update excel file
        xlsx.writeFile(wb,filePath);

        //send conf email
        await emailSend.sendApplicationConfirmation(
            formData.email,
            formData.fullName
        );
        //write response for applicant
        res.json({ 
            success: true, 
            message: 'Form submitted successfully! Confirmation email sent.'
        });
    } catch (error) {
        console.error('Error processing submission:', error);
        res.status(500).json({ 
            success: false, 
            message: 'An error occurred while processing your submission.',
            error: error.message 
        });
    }
});

//start server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
});