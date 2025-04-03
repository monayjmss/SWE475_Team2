<?php
// Include form submission script
include_once 'includes/settings.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Change Deadline</title>
</head>
<body>
    <h1>Application Settings:</h1>
    <h2>Change Application Deadline</h2>
    <p>Current Deadline: <strong><?php echo $currentDeadline; ?></strong></p>
    <form method="post">
        <label for="newDeadline">Select New Deadline:</label>
        <input type="date" id="newDeadline" name="newDeadline" required>
        <button type="submit" name = "update_deadline" >Update Deadline</button>
    </form>

    <!-- could make db for each field you would want them to edit, ask if that'd be prefered or
     if editing html would be easier -->
</body>
</html>
