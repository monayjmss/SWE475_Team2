const nodemailer = require('nodemailer');

//create transporter for gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ncbw1176@gmail.com', 
        pass: 'yryq mkmn ynxw qrnq'  //app password  
    }
});

//email templates
const emailTemplates = {
    //confirmation email
    applicationConfirmation: (name) => ({
        subject: 'NCBW-QCMC Scholarship Application Received',
        text: `Dear ${name},

Thank you for submitting your application to the NCBW-QCMC Scholarship program.

We have successfully received your application and it is currently under review.

You will be contacted shortly regarding scheduling an interview. Please keep an eye on your email for further instructions.

Best regards,
NCBW-QCMC Scholarship Team`
    }),

    //status notification emails
    acceptanceEmail: (name) => ({
        subject: 'NCBW-QCMC Scholarship - Application Accepted',
        text: `Dear ${name},

Congratulations! We are pleased to inform you that you have been selected as a recipient of the NCBW-QCMC Scholarship.
fill in the rest with whatever we need`
    }),

    rejectionEmail: (name) => ({
        subject: 'NCBW-QCMC Scholarship - Application Status',
        text: `Dear ${name},

Thank you for applying to the NCBW-QCMC Scholarship program.

After careful consideration of all applications, we regret to inform you that your application was not selected for this year's scholarship award.
`
    }),

    //interview request email
    interviewRequest: (name) => ({
        subject: 'NCBW-QCMC Scholarship - Interview Request',
        text: `Dear ${name},

Interview email text`
    }),

    //document request for renewals
    renewalDocumentRequest: (name, deadline) => ({
        subject: 'NCBW-QCMC Scholarship - Renewal Documents Required',
        text: `Dear ${name},

Doc renewal text`
    }),

    //password reset
    passwordResetCode: (code) => ({
        subject: 'Password Reset Code',
        text: `Your code is: ${code}`,
        html: `<p>Your password reset code is: <strong>${code}</strong></p>
               <p>This code expires in 15 minutes.</p>`
    }),

    passwordResetConfirmation: () => ({
        subject: 'Password Reset Successful',
        text: 'Your password has been successfully reset.\nIf you didn\'t request this change, please contact support immediately.'
    })
};

//send emails
async function sendEmail(to, templateName, data) {
    try {
        //get email template
        const template = emailTemplates[templateName](...data);
        const mailOptions = {
            from: 'ncbw1176@gmail.com', 
            to: to,
            subject: template.subject,
            text: template.text
        };

        //send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
}
function sendApplicationConfirmation(applicantEmail, applicantName) {
    return sendEmail(applicantEmail, 'applicationConfirmation', [applicantName]);
}
function sendAcceptanceEmail(applicantEmail, applicantName) {
    return sendEmail(applicantEmail, 'acceptanceEmail', [applicantName]);
}
function sendRejectionEmail(applicantEmail, applicantName) {
    return sendEmail(applicantEmail, 'rejectionEmail', [applicantName]);
}
function sendInterviewRequest(applicantEmail, applicantName) {
    return sendEmail(applicantEmail, 'interviewRequest', [applicantName]);
}
function sendRenewalRequest(applicantEmail, applicantName, deadline) {
    return sendEmail(applicantEmail, 'renewalDocumentRequest', [applicantName, deadline]);
}
function sendPasswordResetCode(email, code) {
    return sendEmail(email, 'passwordResetCode', [code]);
}
function sendPasswordResetConfirmation(email) {
    return sendEmail(email, 'passwordResetConfirmation', []);
}


module.exports = {
    sendApplicationConfirmation,
    sendAcceptanceEmail,
    sendRejectionEmail,
    sendInterviewRequest,
    sendRenewalRequest,
    sendPasswordResetCode,
    sendPasswordResetConfirmation
};