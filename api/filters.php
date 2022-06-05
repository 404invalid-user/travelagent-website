<?php
//debug remove this
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//id: type name

include_once "../includes/dbh.inc.php";

function getlocations($conn) {
    $sth = mysqli_query($conn, "SELECT id, name FROM `filters` WHERE type='locations';");
    $rows = array();
    while ($r = mysqli_fetch_assoc($sth)) {
        $rows[] = $r;
    }
    return  $rows;
}


function getActivities($conn) {
    $sth = mysqli_query($conn, "SELECT id, name FROM `filters` WHERE type='activities';");
    $rows = array();
    while ($r = mysqli_fetch_assoc($sth)) {
        $rows[] = $r;
    }
    return  $rows;
}
function getDuration($conn) {
    $sth = mysqli_query($conn, "SELECT id, name FROM `filters` WHERE type='duration';");
    $rows = array();
    while ($r = mysqli_fetch_assoc($sth)) {
        $rows[] = $r;
    }
    return  $rows;
}


echo "{\"locations\": ".json_encode(getlocations($conn)).", \"activities\": ".json_encode(getActivities($conn)).", \"duration\": ".json_encode(getDuration($conn))."}";

//json_encode($rows);