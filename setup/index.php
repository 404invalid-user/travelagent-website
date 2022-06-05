<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>setup</title>
</head>

<body>

    <h1 style="color:Red;">delete this folder once you have finished</h1>

</body>

</html>
<?php

include_once "../includes/config.php";
include_once "../includes/dbh.inc.php";
makeUsers($conn);
makeFilters($conn);
makeActivities($conn);
makeLocations($conn);
makeAdmin($conn);

function makeUsers($conn){
    $sql = "CREATE TABLE users (
        id INT(60) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(300) NOT NULL,
        username VARCHAR(300) NOT NULL,
        email VARCHAR(50),
        password TEXT NOT NULL,
        admin VARCHAR(1) DEFAULT '0' NOT NULL
        )";

    if ($conn->query($sql) === TRUE) {
        echo "Table users created successfully";
    } else {
        echo "Error creating table: " . $conn->error;
    }
}

function makeFilters($conn){
    $sql = "CREATE TABLE filters (
        id INT(60) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(300) NOT NULL,
        name TEXT NOT NULL
        )";

    if ($conn->query($sql) === TRUE) {
        echo "<p>Table filters created successfully</p>";
    } else {
        echo "Error creating table: " . $conn->error;
    }
}


function makeActivities($conn){
    $sql = "CREATE TABLE activities (
        id INT(60) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        filter TEXT NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        map TEXT NOT NULL,
        location TEXT NOT NULL,
        local TEXT NOT NULL,
        image TEXT NOT NULL
        )";

    if ($conn->query($sql) === TRUE) {
        echo "<p>Table Activities created successfully</p>";
    } else {
        echo "Error creating table: " . $conn->error;
    }
}

function makeLocations($conn){
    $sql = "CREATE TABLE locations (
        `id` INT(60) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `name` TEXT NOT NULL,
        `description` TEXT NOT NULL,
        `map` TEXT NOT NULL,
        `location` TEXT NOT NULL,
        `local` TEXT NOT NULL,
        `image` TEXT NOT NULL,
        `stars` FLOAT NOT NULL DEFAULT 1,
        `activities` TEXT NOT NULL,
        `durations` TEXT NOT NULL
        )  ENGINE = InnoDB";

    if ($conn->query($sql) === TRUE) {
        echo "<p>Table locations created successfully</p>";
    } else {
        echo "Error creating table: " . $conn->error;
    }
}

function makeAdmin($conn){
    $randompw = generateRandomString();
    
    $hashedpw = password_hash($randompw, PASSWORD_DEFAULT);
    $sql = "INSERT INTO `users` (`name`, `username`, `email`, `password`, `admin`) VALUES ('admin', 'admin', 'admin@localhost', '".$hashedpw."', '1');";

    if ($conn->query($sql) === TRUE) {
        echo "<p>made admin login with admin ".$randompw."</p>";
    } else {
        echo "Error creating table: " . $conn->error;
    }
}


function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

?>