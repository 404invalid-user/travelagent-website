<?php
//debug remove this
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


include_once "../includes/dbh.inc.php";

$sth = mysqli_query($conn, "SELECT * FROM `activities`;");
$rows = array();
while ($r = mysqli_fetch_assoc($sth)) {
    $rows[] = $r;
}

echo json_encode($rows);


/*

   "id": "75tygh8fo5",
    "filter": "phtuii4",
    "name": "Delta Force Paintball",
    "description": "",
    "map": "Delta+Force+Paintball+Cardiff",
    "location": "75tygh8fo5",
    "local": "cardiff",
    "image": "./cdn/delta-force-paintball-cardiff.jpg"


CREATE TABLE activities (
    id INT(60) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    filter TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    map TEXT NOT NULL
    location TEXT NOT NULL,
    local TEXT NOT NULL,
    image TEXT NOT NULL
    )

    */