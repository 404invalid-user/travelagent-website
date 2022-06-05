<?php

//send email using my custom api
function sendEmail($token, $api_uri, $to, $from, $subject, $html_content, $text_content) {
    $data = array(
        'token' => $token,
        'to' => $to,
        'replyto' => $from,
        'subject' => $subject,
        'html' => $html_content,
        'text' => $text_content
    );
    $verify = curl_init();
    curl_setopt($verify, CURLOPT_URL, $api_uri);
    curl_setopt($verify, CURLOPT_POST, true);
    curl_setopt($verify, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($verify, CURLOPT_RETURNTRANSFER, true);
    $verifyResponse = curl_exec($verify);
    $responseData = json_decode($verifyResponse);
    if ($responseData->success) {
        return true;
    }
    return false;
}

function sendDiscordWebhook($wh_uri, $title, $content) {

}


//verify captcha for for forms
function verifyhcaptcha($secret, $response){
    $data = array(
        'secret' => $secret,
        'response' => $response
    );
    $verify = curl_init();
    curl_setopt($verify, CURLOPT_URL,   "https://hcaptcha.com/siteverify");
    curl_setopt($verify, CURLOPT_POST, true);
    curl_setopt($verify, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($verify, CURLOPT_RETURNTRANSFER, true);
    $verifyResponse = curl_exec($verify);
    $responseData = json_decode($verifyResponse);
    if ($responseData->success) {
        return true;
    }
    return false;
}


//see if user is an admin
function isAdmin($conn,$id){
    $sql = "SELECT * FROM users WHERE id = ?;";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        return false;
    }
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $resultData = mysqli_stmt_get_result($stmt);
    $isadmin = false;
    if ($row = mysqli_fetch_assoc($resultData)) {
        if ($row['admin'] == "1") {
            $isadmin= true;
        }
    }
    mysqli_stmt_close($stmt);
    return $isadmin;
}



//get user in db if dont exist return false
function getUser($conn, $username, $email) {
    //make place holder for prepared statiment
    $sql = "SELECT * FROM users WHERE username = ? OR email = ?;";

    //init prepared statment
    $stmt = mysqli_stmt_init($conn);

    //prepere prepered statement
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../signup.php?error=syserr");
        exit();
    }
    //ss for string string add another s for another string
    mysqli_stmt_bind_param($stmt, "ss", $username, $email);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);
    if ($row = mysqli_fetch_assoc($resultData)) {
        return $row;
    } else {
        //user does not exist
        return false;
    }

    //close the connection
    mysqli_stmt_close($stmt);
}

//check username only letters and numbers
function validateUserName($userName) {
    if (preg_match('/^[a-zA-Z][0-9a-zA-Z_]{2,23}[0-9a-zA-Z]$/', $userName)) {
        return true;
    }
    return false;
}