<?php


//redirect to proper signup page
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header("location: ../login.php");
    exit();
}



//post
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    include_once "../includes/dbh.inc.php";
    include_once "../includes/funtions.php";
    include_once "../includes/config.php";

    if (emptyInputLogin($username, $password) !== false) {
        header("location: ../login.php?error=emptyinput");
        exit();
    };
    if (!isset($_POST['h-captcha-response']) || empty($_POST['h-captcha-response'])) {
        header('location: ../login.php?error=hcaptchafail');
        exit();
    }
    if (!verifyhcaptcha($hcaptcha_secret, $_POST['h-captcha-response'])) {
        header('location: ../login.php?error=hcaptchafail');
        exit();
    }
    $user = getUser($conn, $username, $username);

    if (!$user) {
        header("location: ../login.php?error=wronglogin");
        exit();
    }
    if (!password_verify($password, $user['password'])) {
        header("location: ../login.php?error=wronglogin");
        exit();
    }
    session_start();
    $_SESSION['id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['name'] = $user['name'];
    $_SESSION['admin'] = $user['admin'];
    header("location: ../index.php?info=loggedin");
    exit();
}





//make sure 
function emptyInputLogin($username, $pwd) {
    $result = false;
    if (empty($username) || empty($pwd)) {
        $result = true;
    }
    return $result;
}
