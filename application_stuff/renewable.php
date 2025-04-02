<?php
// Include form submission script
include_once 'includes/settings.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload Renewable Documents</title>
    <link rel="stylesheet" href="index.css">

</head>
<body>
    <header>Upload Renewable Documents</header>
    <h2>Please upload required documents in order to be considered for continued funding</h2>
    <form method="post">

        <label for="first_name">First Name:</label>
        <input type="text" id = "first_name" name = "first_name" placeholder = "Enter your first name">
    
        <label for="last_name">Last Name:</label>
        <input type="text" id = "last_name" name = "last_name" placeholder = "Enter your last name">
    
        <label for="application_id">Application ID:</label>
        <input type="number" id = "application_id" name = "application_id" placeholder = "Enter your application id">
    
        <br><br>

                                
        <!-- FILE UPLOAD STUFF -->
        <div class = "box">
               <div class = "input-box">
                   <h2 class = "upload-area-title">Upload File</h2>
                       <input type="file" id = "userfile" name = "userfile[]" multiple hidden>
                       <label for="userfile" class = "uploadlabel"> 
                           <!-- <span><img src="upload.png" alt=""></span> -->
                           <p>Click to Upload</p>
                       </label>
               </div>
           
               <div id = "filewrapper">
                   <h3 class="uploaded">Uploaded Documents</h3>
               </div>
           </div>
           
           <button type = "submit" namoe = "upload_renewables" >Upload</button>
    </form>

    <script>
        //FILE UPLOAD STUFF: 

        window.addEventListener("load", ()=>{
                    const input = document.getElementById("userfile");
                    const filewrapper = document.getElementById("filewrapper");
                    //tracking slected files
                    let selectedFiles = [];
                    //set max file size
                    const maxFileSize = 5*1024*1024; //5MB
                    //allowed file types
                    const allowedTypes = ["pdf", "doc", "docx"];
                
                    input.addEventListener("change", (e)=>{
                        //file list to array
                        const files = Array.from(e.target.files);
                        files.forEach(file => {

                            //check file type
                            const filetype = file.name.split('.').pop().toLowerCase(); 
                            if (!allowedTypes.includes(filetype)){
                                alert(`Error: ${file.name} is not a supported file type. Please upload a PDF or Word document.`);
                                return;//skips file
                            }
                            //check the file size before adding
                            if (file.size > maxFileSize){
                                alert(`Error: ${file.name} exceeds the 5MB size limit.`);
                                return; //skip file????
                            }
                            //make sure they dont upload duplicates?
                            if (!selectedFiles.some(f => f.name === file.name)){
                                selectedFiles.push(file);
                                fileshow(file.name, file.name.split('.').pop());
                            }
                        });
                        //Create a new DataTransfer object to update input.files with all selected files
                        const dataTransfer = new DataTransfer();
                        selectedFiles.forEach(file => dataTransfer.items.add(file));
                        input.files = dataTransfer.files; // Update input field with full file list
                    });
                
                    const fileshow = (fileName, filetype)=>{
                        const showfileboxElem = document.createElement("div");
                        showfileboxElem.classList.add("showfilebox");
                    
                        const leftElem = document.createElement("div");
                        leftElem.classList.add("left");
                        
                        //get the file type
                        const fileTypeElem = document.createElement("span");
                        fileTypeElem.classList.add("filetype");
                        fileTypeElem.innerHTML = filetype;
                        leftElem.append(fileTypeElem);
                        
                        //get the file title
                        const filetitleElem = document.createElement("h3");
                        filetitleElem.innerHTML = fileName;
                        leftElem.append(filetitleElem);
                        showfileboxElem.append(leftElem);
                    
                        //div class right - the x button
                        const rightElem = document.createElement("div");
                        rightElem.classList.add("right");
                        showfileboxElem.append(rightElem);
                        const crossElem = document.createElement("span");
                        crossElem.innerHTML = "&#215;";
                        rightElem.append(crossElem);
                        filewrapper.append(showfileboxElem);
                    
                        //deleting files & array
                        crossElem.addEventListener("click", ()=>{
                            filewrapper.removeChild(showfileboxElem);
                            selectedFiles = selectedFiles.filter(f => f.name !== fileName);

                            //remake file list wihout remove file
                            const dataTransfer = new DataTransfer();
                            selectedFiles.forEach(file => dataTransfer.items.add(file));
                            input.files = dataTransfer.files;

                        });
                    };
                });
    </script>
</body>
</html>
