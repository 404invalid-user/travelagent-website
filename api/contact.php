<?php

require_once "../includes/config.php";
require_once "../includes/funtions.php";
require_once "../includes/config.php";


//show nothing to get requests
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo "";
    exit();
}


//post
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['subject']) || empty($_POST['message'])) {
        header('location: ../contact.php?error=missinginput');
        exit();
    }
    if (!isset($_POST['h-captcha-response']) || empty($_POST['h-captcha-response'])) {
        header('location: ../contact.php?error=hcaptchafail');
        exit();
    }
    if (!verifyhcaptcha($hcaptcha_secret, $_POST['h-captcha-response'])) {
        header('location: ../contact.php?error=hcaptchafail');
        exit();
    }
    //we dont want html the sender could hack the email reciver
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    //send the email using my api
    $sentemail = sendEmail($SMPT_api_token, $SMTP_api_uri, $SMPT_to, $_POST['email'], $subject, $message, $message);

    //see if email sent succesfully
    if (!$sentemail) {
        header('location: ../contact.php?error=syserr');
        exit();
    }
    header('location: ../contact.php?error=none&atn=contact');
    exit();
}
