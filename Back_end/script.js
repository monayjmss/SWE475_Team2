const form = document.querySelector("form"),
        nextButton = form.querySelector(".nxtButton"),
        backButton = form.querySelector(".backButton"),
        submitButton = form.querySelector(".submit"),
        allInput = form.querySelectorAll(".first input"); //WORKS WITH COPY>HTML
        //allInput = form.querySelectorAll("input[required]"),
        messageElement = document.getElementById("message");

nextButton.addEventListener("click", function(e) {
    e.preventDefault();

    let allFilled = true;
    allInput.forEach(input => {
        if (input.value === ""){
            allFilled = false;
            //add red border to necessary input fields
            input.style.border = "2px solid red";
        } 
        else{ 
            input.style.border = "";
        }
    });
    //switch to the second secion if all inputs are filled
    if (allFilled){
        form.classList.add('secActive');
    } else{ 
        form.classList.remove('secActive');
        messageElement.textContent = "Please fill out all required fields!";
        messageElement.style.display = "block";
        messageElement.style.backgroundColor = "red";
        messageElement.style.color = "white";
    }
});

//back button functionaity 
backButton.addEventListener("click", () => form.classList.remove('secActive'));

//form submission
form.addEventListener('submit', async function(event){
    event.preventDefault();

    //show submitting message
    messageElement.textContent = "submitting...";
    messageElement.style.display = "block";
    submitButton.disabled= true;

    //collect form data
    const formData = new FormData(form);
    const data = {};

    //convert form data to plain object
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try{
        //send the form data to the server using a POST request using fetch
        const googleResponse=await fetch('https://script.google.com/macros/s/AKfycbyGCRc4aY6qisV_PXPrB8muMBV_7rHIQ7i2sq7sN6pj073A4Xp_UARHChN7phvQtz-m/exec', {
            method:'POST', 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:new URLSearchParams(data).toString(), //convert data to JSON string
        });
        //also send to local servers, testing purposes
        const localResponse=await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullName: `${data.firstname} ${data.lastname}`,
                email: data.email,
                dob: data.dob,
                mobile: data.mobile
                //can add whatever other fields we need
            }),
        });
        //local server response
        const responseText = await localResponse.text();
        console.log('Local server response:', responseText);
        //try to parse response as JSON
        let responseData;
        try {
            responseData = JSON.parse(responseText);
        } catch (e) {
            responseData = { success: false, message: responseText };
        }
        
        /*messageElement.textContent = "data submited successfully";
        messageElement.style.backgrounColor = "green";
        messageElement.style.color = "black";
        submitButton.disabled = false;
        //alert(data); //display success message from server
        form.reset(); //optionally reset form fields

        setTimeout(function(){
            messageElement.textContent = "";
            messageElement.style.display = "none";
        }, 2600);*/

        //success response handling
        if (responseData.success) {
            //redirect to the submitted page
            window.location.href = '/Front_end/submitted.html';
        } else {
            messageElement.textContent = "Error submitting application. Please try again.";
            messageElement.style.backgroundColor = "red";
            messageElement.style.color = "white";
            messageElement.style.display = "block";
            submitButton.disabled= false;
        }

    } catch(error) {
        console.error('Error', error);
        messageElement.textContent = "An error occurred while submitting the form";
        messageElement.style.display = "block";
        submitButton.disabled = false;
    }
});