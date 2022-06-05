<?php

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header("location: ../index.php");
    exit();
}



//post
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start();
    include_once "../../includes/dbh.inc.php";
    include_once "../../includes/funtions.php";


    if (!isAdmin($conn, $_SESSION['id'])) {
        header("location: ../../index.php?error=notadmin");
        exit();
    }

    $type = $_POST['type'];
    $name = $_POST['name'];

    if (!isset($type) || !isset($name)) {
        header("location: ../index.php?error=missinginuput");
        exit();
    }

    if ($type != "locations" && $type != "activities" && $type != "duration") {
        header("location: ../index.php?error=invalidtype");
        exit();
    }

    $incertid = createFilter($conn, $type, $name);

    if (!$incertid) {
        header("location: ../index.php?error=syserr");
        exit();
    }


    header("location: ../index.php?error=none&info=added " . $name." to the ". $type. " filter with id: " . $incertid);
    exit();
}


//make user in db
function createFilter($conn, $type, $name) {
    //make place holder for prepared statiment
    $sql = "INSERT INTO filters (type,name) VALUES (?, ?);";

    //init prepared statment
    $stmt = mysqli_stmt_init($conn);

    //prepere prepered statement
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        return false;
    }

    //ss for string string add another s for another string
    mysqli_stmt_bind_param($stmt, "ss", $type, $name);
    mysqli_stmt_execute($stmt);

    //close the connection
    mysqli_stmt_close($stmt);
    return mysqli_insert_id($conn);
}
