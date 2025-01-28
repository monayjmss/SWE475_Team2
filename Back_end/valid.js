function myfunction(){
    var x = document.getElementById("password");

    if (x.type === "password"){
        x.type = "text";
    }
    else{
        x.type = "password";
    }
}

    function validate(){
        event.preventDefault();
        var password = document.getElementById("password");

        if (password.value.length >= 8){
            window.location.replace("homepage.html");
            return false;
        } else{ 
            alert("Login Failed");
        }
    }

document.getElementById('registrationForm').addEventListener('submit', function(event){
    validate(event);
})

