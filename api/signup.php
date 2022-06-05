<?php
//debug remove this
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//redirect to proper signup page
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header("location: ../signup.php?error=makepost");
    exit();
}


//post
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $name = $_POST['name'];
    $email = $_POST['email'];
    $username = $_POST['username'];
    $pwd = $_POST['password'];
    $pwdrepeat = $_POST['passwordv'];


    include_once '../includes/dbh.inc.php';
    include_once "../includes/funtions.php";
    include_once "../includes/config.php";

    if (emptyInputSignup($name, $email, $username, $pwd, $pwdrepeat)) {
        header("location: ../signup.php?error=emptyinput");
        exit();
    };
    if (!isset($_POST['h-captcha-response']) || empty($_POST['h-captcha-response'])) {
        header('location: ../signup.php?error=hcaptchafail');
        exit();
    }
    if (!verifyhcaptcha($hcaptcha_secret, $_POST['h-captcha-response'])) {
        header('location: ../signup.php?error=hcaptchafail');
        exit();
    }
    if (!validateUserName($username)) {
        header("location: ../signup.php?error=invalidusername");
        exit();
    };
    if (invalidEmail($email)) {
        header("location: ../signup.php?error=invalidemail");
        exit();
    };
    if (pwdMatch($pwd, $pwdrepeat) !== false) {
        header("location: ../signup.php?error=pwdnotmatch");
        exit();
    };

    if (getUser($conn, $username, $email) !== false) {
        header("location: ../signup.php?error=usernametaken");
        exit();
    };

    $make_user = createUser($conn, $name, $email, $username, $pwd);

    if (!$make_user) {
        header("location: ../signup.php?error=syserr");
        exit();
    }
    //send the to login page
    header("location: /login.php?error=none&user=" . $username);
    exit();
}



//make user in db
function createUser($conn, $name, $email, $username, $pwd) {
    //make place holder for prepared statiment
    $sql = "INSERT INTO users (username, email,name, password) VALUES (?, ?, ?, ?);";

    //init prepared statment
    $stmt = mysqli_stmt_init($conn);

    //prepere prepered statement
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        return false;
    }
    //hash password
    $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);

    //ss for string string add another s for another string
    mysqli_stmt_bind_param($stmt, "ssss", $username, $email, $name, $hashedPwd);
    mysqli_stmt_execute($stmt);

    //close the connection
    mysqli_stmt_close($stmt);
    return true;
}



//check that email is a email
function invalidEmail($email)
{
    $result = false;
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $result = true;
    }
    return $result;
}

//check that password and password verify match
function pwdMatch($pwd, $pwdrepeat) {
    $result = false;
    if ($pwd !== $pwdrepeat) {
        $result = true;
    }
    return $result;
}

function emptyInputSignup($name, $email, $username, $pwd, $pwdrepeat) {
    $result = false;
    if (empty($name) || empty($email) || empty($username) || empty($pwd) || empty($pwdrepeat)) {
        $result = true;
    }
    return $result;
}
