<?php
// Include form submission script
include_once 'includes/applications.php';
include_once 'includes/settings.php';
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NCBW-QCMC Application Form</title>
    <!-- Link to external CSS file -->
    <link rel="stylesheet" href="index.css">
</head>
<body>

    <section class="header">
            <header>National Coalition of 100 Black Women, Inc.</header>
            <header>Queen City Metropolitan Chapter (QCMC)</header>
            <header style="margin-bottom: 70px;">Scholarship Application</header>
    </section>
    <section class = "header2">
        <h1>Purpose</h1>
        <p>The National Coalition of 100 Black Women, Inc. is a nonprofit organization that focuses on
            improving the lives of Black women and their families. The National Coalition of 100 Black
            Women, Inc. Queen City Metropolitan Chapter (NCBW-QCMC) was chartered in Charlotte, NC
            on September 20, 2009. Our mission is to advocate on behalf of Black women and girls to
            promote leadership development and gender equity in the areas of health, education, and
            economic empowerment. We carry out our mission through advocacy work and by offering a
            variety of programs such as financial literacy classes, advocacy training, mentoring, Historically
            Black colleges and universities-HBCU college fairs, and health awareness events.</p>
            
            <p>NCBW-QCMC is proud to sponsor this scholarship in an endeavor to provide encouragement
            and financial assistance to Black women who wish to further their education. This merit/need-
            based scholarship is for high school seniors who meet the GPA requirement and demonstrate
            financial aid needs. Four scholarships will be awarded, one of which will be awarded to an
            applicant pursuing a STEAM (science, technology, engineering, arts, and mathematics) field of
            study.</p>

        <h1>Eligibility</h1>
        <p>Applicants <span>must</span> meet the following criteria to be considered for this 
            scholarship : 
        </p>
        <ul>
            <li>Be a Black Woman</li>
            <li>Be a high school senior graduating within the 2023-2024 school year from a high school in one
                of the following counties: Mecklenburg, Cabarrus, Iredell, Lincoln, Gaston, Union, 
                Lancaster(SC), and York(SC)
            </li>
            <li>Have a cumulative Grade Point Average (GPA) of 2.5 or higher on a 4.0 Scale at the time of application</li>
            <li>Have been accepted into an accredited institution of higher learning: a two to four-year college or university or
                a technical or vocational school at the time of application (Proof of acceptance such as a copy of your acceptance 
                letter is required)
            </li>
            <li><span>To be eligible for the STEAM </span> scholarship the applicant
             must declare a major in a qualifying field of study and agree to provide a copy of course schedule for 
            renewal</li>
        </ul>
        <h1>Selection Criteria</h1>
            <p>The Scholarship Committee will take into consideration the following when selecting
            scholarship recipients :</p>
                <ul>
                    <li>Completeness of application packet (incomplete applications <span>will not be</span> 
                    considered)</li>
                    <li>A minimum of 20 hours of extracurricular activities and/or community involvement
                        (school or community organizations, volunteer activity, work experiences)
                    </li>
                    <li>Strength of personal statement</li>
                    <li>Demonstartion of financial need through completed FAFSA or other documentation</li>
                    <li>Academic achievement</li>
                    <li>Letters of recommendation (2)</li>
                    <li>Interview</li>
                </ul>
        <h1>Scholarship Awards</h1>
            <p>Three (3) traditional awards and one (1) STEAM award in the amount of $1,000.00 (payable in
                two (2) installments of $500). The awards will be sent directly to the recipient’s school upon
                verification of enrollment. The awards are renewable for up to 4 years provided academic
                standards are met.</p>
        <h1>Eligibility for Renewal</h1>
            <p>This scholarship is renewable for up 4 years providing that the following criteria are met:</p>
                <ul>
                    <li>Students maintain a GPA of 2.5 or higher each year.</li>
                    <li>The recipient of the STEAM scholarship must provide documentation of continued STEAM course of study
                        beginning each fall.</li>
                </ul>
        <h1>Application Packet</h1>
            <p>Applicants must submit their completed packet to the NCBW QCMC scholarship committee by
                March 11, 2023. The following must be included in the application packet:</p>
                <ul>
                    <li>Scholarship Applicant Form</li>
                    <li>Applicant Activity Sheet</li>
                    <li>Official, sealed trasncript of grades</li>
                    <li>Two sealed letter of recommendation</li>
                    <ul>
                        <li>One letter must be written by school personnel, one from a member of the
                            community that is not a family member</li>
                    </ul>
                    <li>Copy of completed Free Application for Federal Student Aid (FAFSA) or other approved
                        documentation demonstrating financial need</li>
                    <li>A personal statement that is 250 typed words or less.</li>
                </ul>
        <h1 style = "text-align: center; margin-top: 40px; text-decoration: underline; font-style: normal">Personal Statement</h1>
        <h1>Traditional Awards</h1>
            <p><span>Scholarship Details:</span> This need-based scholarship is an endeavor to provide encouragement and
                financial assistance to Black women who wish to further their education and by doing so plan to
                advocate on behalf of Black women and girls the areas of health, education, and economic
                empowerment.</p>
            <p><span>Personal Statement </span>(250 typed words or less): NCBW-QCMC aims to improve the lives of Black
                women and girls and with the focus on health, education, and economic empowerment. What
                impact could you have in these areas by furthering your education?</p>
        <h1>STEAM Award</h1>
            <p><span>Scholarship Details: </span>High school seniors planning to major in a STEAM field (science/medicine,
                technology, engineering, arts, or mathematics). The increasing role of technology innovations in
                our daily life cannot be understated, and by recognizing the significance of the arts, the STEAM
                field provides a vast amount of opportunity for those interested in it. NCBW-QCMC created this
                scholarship to honor Black women who embrace and celebrate the STEAM field and thrive
                within it.</p>
            <p><span>Personal statement </span>(250 typed words or less): NCBW-QCMC aims to improve the lives of Black
                women and girls and with the focus on health, education, and economic empowerment. What
                has inspired you to pursue a career in a STEAM field? What are your career goals and what
                impact could you have in these areas by furthering your education?</p>

        <h1>Application Deadline</h1>
            <p>The applications, with required materials, must be postmarked before or by <strong><mark><?php echo $currentDeadline; ?></mark></strong>.
                Submit application and required materials via mail to:</p>
            <p style = "text-indent: 40px;">Education Committee</p>
            <p style = "text-indent: 40px;margin-top: -15px;">National Coalition of 100 Black Women - QCMC</p>
            <p style = "text-indent: 40px; margin-top: -15px;">P.O. Box 32364</p>
            <p style = "text-indent: 40px; margin-top: -15px;">Charlotte, NC</p>
            <p style = "text-indent: 40px; margin-top: -15px;">28232</p>
            <p>For more information or questions, please contact :</p>
            <p style = "text-indent: 40px;">Education Committe</p>
            <p style = "text-indent: 40px; margin-top: -15px;">Education.qcmc@gmail.com</p>
    </section>



    <header>Scholarship Application Form</header>
        <div class="container">
            <div class = "main">
                <form id ="form" action="" method="post" enctype="multipart/form-data">

                <!-- for traditional and non traditional forms -->
                    <fieldset>
                        <legend>Award Type?</legend>
                            <div class = "inline">
                                <input type="radio" id = "traditional" name = "category" value = "traditional">
                                <label for="traditional">Traditional Award - Traditional Student</label>

                                <input type="radio" id = "non-traditional" name = "category" value = "non-traditional">
                                <label for="non-traditional">Traditional Award - Non-Traditional Student</label>

                                <input type="radio" id = "STEAM" name = "category" value = "STEAM">
                                <label for="STEAM">STEAM Award - Traditional Student</label>
                            </div>
                        </fieldset>
                    <div class="input-box">
                        <h2>Personal Details:</h2>
                            <!-- group of 2! first & last name -->
                            <div class = "form-group2">
                                <div class = "form-item2">
                                    <label for="first_name">First Name</label>
                                    <input type="text" id = "first_name" name = "first_name" placeholder = "Enter your first name">
                                </div>
                                <div class = "form-item2">
                                <label for="last_name">Last Name</label>

                                    <input type="text" id = "last_name" name = "last_name" placeholder = "Enter your last name">
                                </div>
                            </div>
                            <label for="address">Address</label>
                            <input type="text" id = "address" name = "address" placeholder = "Enter your street address">

                            <!-- group of 3! city, state, address -->

                            <div class = "form-group3">
                                <div class="form-item3">
                                    <label for="city">City</label>
                                    <input type="text" id = "city" name = "city">
                                     <!-- <select name="city" id="city">
                                        <option value="Mecklenburg">Mecklenburg</option>
                                        <option value="Cabarrus">Cabarrus</option>
                                        <option value="Iredell">Iredell</option>
                                        <option value="Lincoln">Lincoln</option>
                                        <option value="Gaston">Gaston</option>
                                        <option value="Union">Union</option>
                                        <option value="Lancaster">Lancaster</option>
                                        <option value="York">York</option>
                                     </select> -->
                                </div>
                                <div class="form-item3">
                                    <label for="state">State</label>
                                    <select name="state" id="state">
                                        <option value="NC">North Carolina</option>
                                        <option value="SC">South Carolina</option>
                                    </select>
                                </div>
                                <div class="form-item3">
                                <label for="zipcode">Zipcode</label>

                                    <input type="text" id = "zipcode" name = "zipcode">
                                </div>
                            </div>
                            
                            <div class = "form-group2">
                                <div class = "form-item2">
                                    <label for="phone">Mobile</label>
                                    <input type="tel" id = "phone" name = "phone" placeholder = "Enter your contact number">
                                </div>

                                <div class = "form-item2">
                                    <label for="email">Email</label>
                                    <input type="email" id = "email" name = "email" placeholder = "Enter your email">
                                </div>
                            </div>

                            <div id = "traditional-fields">
                                <label for="highschool">High School Name</label>
                                <input type="text" id = "highschool" name = "highschool" placeholder = "Enter your high school">

                                <label for="guidance_counselor">Guidance Counselor</label>
                                <input type="text" id = "guidance_counselor" name = "guidance_counselor" placeholder = "Enter your guidance counselor name">

                                <div class = "form-group2">
                                    <div class = "form-item2">
                                        <label for="graduation_date">Graduation Date</label>
                                        <input type="date" id = "graduation_date" name = "graduation_date" placeholder = "Enter your graduation date">
                                    </div>

                                    <div class = "form-item2">
                                        <label for="GPA">GPA</label>
                                        <input type="number" id = "GPA" name = "GPA" step = "0.01" min = "0.0" max = "4.0" placeholder = "Enter your current GPA">
                                    </div>
                                </div>

                                <div class = "form-group2">   
                                    <div class = "form-item2">
                                        <label for="SAT">SAT Score</label>
                                        <input type="number" id = "SAT" name = "SAT" placeholder = "Enter your SAT score">
                                    </div>
                                    <div class = "form-item2">
                                        <label for="ACT">ACT Score</label>
                                        <input type="number" id = "ACT" name = "ACT" placeholder = "Enter your ACT score">
                                    </div>
                                </div>
                            </div>

                        <h2>College or University You Plan to Attend in the Fall:</h2>
                            <label for="college_name">College Name</label>
                            <input type="text" id = "college_name" name = "college_name" placeholder = "Enter name of College/University">

                            <div class = "form-group2">
                                <div class = "form-item2">
                                    <label for="college_city">College City</label>
                                    <input type="text" id = "college_city" name = "college_city" placeholder = "Enter city of College/University">
                                </div>
                                <div class = "form-item2">
                                    <label for="college_state">College State</label>
                                        <select name="college_state" id="college_state">
                                            <option value="AL">Alabama</option>
                                            <option value="AK">Alaska</option>
                                            <option value="AZ">Arizona</option>
                                            <option value="AR">Arkansas</option>
                                            <option value="CA">California</option>
                                            <option value="CO">Colorado</option>
                                            <option value="CT">Connecticut</option>
                                            <option value="DE">Delaware</option>
                                            <option value="DC">District of Columbia</option>
                                            <option value="FL">Florida</option>
                                            <option value="GA">Georgia</option>
                                            <option value="HI">Hawaii</option>
                                            <option value="ID">Idaho</option>
                                            <option value="IL">Illinois</option>
                                            <option value="IN">Indiana</option>
                                            <option value="IA">Iowa</option>
                                            <option value="KS">Kansas</option>
                                            <option value="KY">Kentucky</option>
                                            <option value="LA">Louisiana</option>
                                            <option value="ME">Maine</option>
                                            <option value="MD">Maryland</option>
                                            <option value="MA">Massachusetts</option>
                                            <option value="MI">Michigan</option>
                                            <option value="MN">Minnesota</option>
                                            <option value="MS">Mississippi</option>
                                            <option value="MO">Missouri</option>
                                            <option value="MT">Montana</option>
                                            <option value="NE">Nebraska</option>
                                            <option value="NV">Nevada</option>
                                            <option value="NH">New Hampshire</option>
                                            <option value="NJ">New Jersey</option>
                                            <option value="NM">New Mexico</option>
                                            <option value="NY">New York</option>
                                            <option value="NC">North Carolina</option>
                                            <option value="ND">North Dakota</option>
                                            <option value="OH">Ohio</option>
                                            <option value="OK">Oklahoma</option>
                                            <option value="OR">Oregon</option>
                                            <option value="PA">Pennsylvania</option>
                                            <option value="RI">Rhode Island</option>
                                            <option value="SC">South Carolina</option>
                                            <option value="SD">South Dakota</option>
                                            <option value="TN">Tennessee</option>
                                            <option value="TX">Texas</option>
                                            <option value="UT">Utah</option>
                                            <option value="VT">Vermont</option>
                                            <option value="VA">Virginia</option>
                                            <option value="WA">Washington</option>
                                            <option value="WV">West Virginia</option>
                                            <option value="WI">Wisconsin</option>
                                            <option value="WY">Wyoming</option>
                                        </select>
                                </div>
                            </div>

                            <fieldset>
                                <legend>Were you accepted?:</legend>
                                    <div>
                                        <input type="radio" id = "yes" name = "accepted" value = "yes">
                                        <label for="yes">Yes</label>

                                        <input type="radio" id = "waiting" name = "accepted" value = "waiting">
                                        <label for="waiting">Waiting for Decision</label>
                                    </div>
                            </fieldset>

                        
        
                            <!-- parent1 info -->
                        <h2>Family Status:</h2>


                        <div id = "traditional-fields">
                                <div class = "form-group2">
                                    <div class = "form-item2">
                                        <label for="parent1_name">Parent/Legal Guardian Name:</label>
                                        <input type="text" id = "parent1_name" name = "parent1_name" placeholder = "Enter name of parent/guardian">
                                    </div>
                                    <div class = "form-item2">
                                        <label for="parent1_phone">Parent/Guardian Contact Number</label>
                                        <input type="tel" id = "parent1_phone" name = "parent1_phone" placeholder = "Enter contact number of parent/guardian">
                                    </div>
                                </div>

                                <!-- parent2 info -->
                                <div class = "form-group2">
                                    <div class ="form-item2">
                                        <label for="parent2_name">Parent/Legal Guardian Name</label>
                                        <input type="text" id = "parent2_name" name = "parent2_name" placeholder = "Enter name of parent/guardian">
                                    </div>

                                    <div class = "form-item2">
                                        <label for="parent2_phone">Parent2/Guardian Contact Number</label>
                                        <input type="tel" id = "parent2_phone" name = "parent2_phone" placeholder = "Enter contact number of parent/guardian">
                                    </div>
                                </div>
                                <p><span>Note:</span> You may substitute guardian for mother or father for the personal
                                with whom you reside.</p>
                        </div>

                            <!--STARTING ACTIVITY SHEER-->
                        <header>Applicant Activity Sheet</header>
                        <!--AWARD STUFF-->
                            <p style="text-align: center;"><span>List any school or community awards or honors you
                            have received.</span></p>
                            <p style = "text-align: center; color: gray;" >(Please list the Award title, the Organization that granted the award, and the Year the award
                            was received. Exhaustive responses are not necessary.) </p>

                        <!-- AWARD INFO -->
                            <label for="awards">Awards</label>
                            <textarea name="awards" id="awards" placeholder= "Please enter award if applicable"></textarea>


                        <!-- SCHOOL ORG ACTIVITY -->

                            <p style="text-align: center;"><span>List any school-related organizations/activities in which you 
                            are or have been involved:</span></p>
                            <p style = "text-align: center; color: gray;">(Please list the Oraganization/Activity, the Position Held, and the Length of time
                            position held.) </p>

                            <label for="school_org_activity">School Organizations & Activities</label>
                            <textarea name="school_org_activity" id="school_org_activity" placeholder= "Please enter school organizations if applicable."></textarea>

                        <!-- VOLUNTEER STUFF -->

                            <p style="text-align: center;"><span>List any volunteer or other community activity involvement outside of school. Include religious
                            activities, charitable organizations, clubs, etc.</span></p>
                            <p style = "text-align: center; color: gray;">(Please list the Organization/Activity, the Position Held, and the Length of time
                            position held.) </p>

                            <label for="vol_community_activity">Volunteer/Community Activites</label>
                            <textarea name="vol_community_activity" id="vol_community_activity" placeholder= "Please enter volunteer/community activities if applicable"></textarea>

                        <!-- WORK EXPERIENCE -->

                            <p style="text-align: center;"><span>List any work experiences:</span></p>
                            <p style = "text-align: center; color: gray;">(Please list the Employer, Position Held, and length of time
                            position was held.)</p>

                            
                            <label for="work_experience">Work Experience</label>
                            <textarea name="work_experience" id="work_experience" placeholder= "Please enter work experience if applicable"></textarea>


                        <!-- disclaimer for false info -->
                            <h2 style="text-align: center;">Please check the box indicating you understand and agree to the terms below.</h2>
                            <div class = "inline">
                                <input type="checkbox" id= "actTrue" name = "actTrue" value = "understood" required>
                                <p style="text-align: center;">The application provided is, to the best of my knowledge, 
                                    complete and accurate. I understand that false statements in this application will 
                                    disqualify me from receiving a scholarship award. I understand due to funding, 
                                    not every eligible applicant will receive an award; however, no application materials will be returned.
                                </p>
                            </div>

                        <!--PERSONAL STATEMENT  -->

                        <header style="margin: 20px;">Personal Statement</header>
                            <p id = "personalStmtPrompt" style="text-align:center;">(250 typed words or less): NCBW-QCMC aims to improve the lives of Black
                            women and girls and with the focus on health, education, and economic empowerment. What
                            impact could you have in these areas by furthering your education?</p>


                            <label for="personal_statement">Personal Statement</label>
                            <textarea name="personal_statement" id="personal_statement" placeholder= "Please enter response"></textarea>


                        <!--  Document upload section -->
                        <header style="margin: 20px;">Upload Required Documents</header> 
                            <p style="text-align: center;">Please upload the follow documents:</p>
                            <div style="text-align: center;">
                                <ul>
                                    <li>Copy of completed Free Application fro Federal Student Aid (FAFSA) or other
                                        approved documentation demonstrating financial need</li>
                                    <li>2 Letter of Recommendation</li>
                                    <li>Proof of applicant’s intent to enroll (i.e., letter of acceptance, etc.)</li>
                                </ul>
                            </div> 

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

                    <div>
                        <header style="margin: 20px;">Application and Information Release Statment</header>
                        <h2 style="text-align: center;">Please check the boxes indicating you understand and agree to the terms below.</h2>

                        <div class = "inline">
                            <input type="checkbox" id= "TandC" name = "TandC" value = "understood" required>
                            <p style="text-align: center;">I/we _____ hereby represent that we are the parents and/or guardian
                                of ____ , a minor, and that I/we voluntarily give my/our consent to the videotaping, photographing, 
                                and audo recording of my minor daughter. I understand that materials obtained can be used
                                marketing purposes and/or release to the media which includes social media.
                            </p>
                        </div>

                        <div class = "inline">
                            <input type="checkbox" id= "TandC2" name = "TandC2" value = "understood" required>
                            <p style="text-align: center;">I _____ give permission for any college or school to release to the 
                                National Coalition 100 Black Women, Inc. - Queen City Metropolitan Chapter Scholarship Committee 
                                any information necessary to process my scholarship application.
                            </p>
                        </div>

                    </div>


                
                        <!-- status msg -->
                        <div id = "status"></div>

                        <div class="form-group">
                            <input type="submit" class="form-control btn-primary" id = "submit" name="submit" value="Submit" <?php echo $disabled; ?>>
                        </div>
                    </div>
                    <!-- end input box div -->
                </form>
            </div>
        </div>

        <script>

            //APPLCIATION TYPE STUFF: TRADITIONAL/NONTRADITIONAL/STEAM
            document.addEventListener("DOMContentLoaded", () =>{
                const traditionalRadio = document.getElementById("traditional");
                const nonTraditionalRadio = document.getElementById("non-traditional");
                const steamRadio = document.getElementById("STEAM");

                const personalStmtField = document.getElementById("personalStmtPrompt")

                const fieldsToDisable = document.querySelectorAll("#traditional-fields input, #traditional-fields select, #traditional-fields textarea");
                // const graduationDateField = document.getElementById("graduation_date");

                //store original placeholders
                const originalPlaceholders = {};

                fieldsToDisable.forEach(field => {
                    if (field.placeholder){
                        originalPlaceholders[field.name] = field.placeholder; //saves placehodlersx
                    }
                });

                //traditional vs non traditonal 
                function toggleFields() {
                    if (nonTraditionalRadio.checked){
                        fieldsToDisable.forEach(field => {
                            field.disabled = true;
                            field.value = ""; //clears value

                            if (field.placeholder){
                                field.placeholder = ""; //remove placeholder text
                            }
                        });

                    } else{
                        fieldsToDisable.forEach(field => {
                            field.disabled = false; 

                            //restore placeholders
                            if (originalPlaceholders[field.name]){
                                field.placeholder = originalPlaceholders[field.name];
                            }
                        });
                    }
                }

                const traditionalStmt = `(250 typed words or less): NCBW-QCMC aims to improve 
                the lives of Black women and girls and with the focus on health, 
                education, and economic empowerment. What impact could you have 
                in these areas by furthering your education?`

                const steamStmt = `(250 typed words or less): 
                NCBW-QCMC aims to improve the lives of Black women 
                and girls and with the focus on health, education, 
                and economic empowerment. What has inspired you to 
                pursue a career in a STEAM field? What are your career 
                goals and what impact could you have in these areas by 
                furthering your education?`

                //chnage placeholder on STEAM vs tradtional award
                function updatePersonalStmt(){
                    if (steamRadio.checked){
                        personalStmtField.textContent = steamStmt;
                    } else{
                        personalStmtField.textContent = traditionalStmt;
                    }
                }
                //event listeners for toggle fields
                traditionalRadio.addEventListener("change", toggleFields);
                steamRadio.addEventListener("change", toggleFields);
                nonTraditionalRadio.addEventListener("change", toggleFields);

                steamRadio.addEventListener("change", updatePersonalStmt);
                traditionalRadio.addEventListener("change", updatePersonalStmt);
                nonTraditionalRadio.addEventListener("change", updatePersonalStmt);

                toggleFields();
                updatePersonalStmt();
            });

            //CHANGE DUE DATE




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

                //no reload on enter stuff
                document.addEventListener("DOMContentLoaded", function(){
                    document.querySelectorAll("input[type=text]").forEach(input =>{
                        input.addEventListener("keydown", function(event){
                            if (event.key === "Enter"){
                                event.preventDefault(); //wont reload on enter
                            }
                        });
                    });
                })

                //pop up after hitting submit to give the page a sec
                //EDIT!!! maybe dont need?
                document.addEventListener("DOMContentLoaded", function(){
                    document.getElementById("form").addEventListener("submit", function(event){
                        //alert("Your application is being submitted. Please wait...");
                        let message = document.createElement("p");
                        
                        message.textContent= "Your application is being submitted. Please wait...";
                        document.getElementById("form").appendChild(message);
                    });
                });
                
        </script>
</body>
</html>