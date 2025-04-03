<?php
// To prevent the user from hitting the back button and reloading the form
header('Cache-Control: no-store, no-cache, must-revalidate'); // Disable cache
header('Pragma: no-cache'); // Older HTTP/1.0
header('Expires: 0'); // Ensure the page is not cached
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application Submitted Successfully</title>
    <script type="text/javascript">
        // Alert the user that the application has been successfully submitted
        //alert("Your application has been submitted successfully!");

        // Prompt the user to close the window
        function closeWindow() {
            window.close(); // Close the window automatically
        }

        // Automatically close the window after 5 seconds
        setTimeout(closeWindow, 5000); // 5000 milliseconds = 5 seconds
    </script>
</head>
<body>
    <h1>Your application has been submitted successfully!</h1>
    <p>The window will automatically close in 5 seconds. If it doesn't, you can manually close it by clicking the button below.</p>
    <button onclick="closeWindow()">Close Window</button>
</body>
</html>
