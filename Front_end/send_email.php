<?php
require 'vendor/autoload.php'; // adjust path if needed

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load environment variables (optional: if you want to use .env securely)
$gmailUser = 'team2csci476@gmail.com';         // Or hardcode for now
$gmailPass = 'nmoh nawh himr rolv';

$data = json_decode(file_get_contents("php://input"), true);

$recipientEmail = $data['email'] ?? '';
$recipientName  = $data['name'] ?? '';
$subject = $data['subject'] ?? 'NCBW-QCMC Scholarship Update';
$body = $data['body'] ?? 'No message body provided.';

$mail = new PHPMailer(true);

try {
    // SMTP Config
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $gmailUser;
    $mail->Password = $gmailPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;

    // Email Content
    $mail->setFrom($gmailUser, 'NCBW-QCMC Scholarship Team');
    $mail->addAddress($recipientEmail, $recipientName);
    $mail->Subject = $subject;
    $mail->Body = $body;

    $mail->send();
    echo json_encode(["success" => true]);

} catch (Exception $e) {
    error_log("PHPMailer error: " . $mail->ErrorInfo);
    echo json_encode(["success" => false, "error" => $mail->ErrorInfo]);
}
