<?php
//debug remove this
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


include_once "../includes/dbh.inc.php";

$sth = mysqli_query($conn, "SELECT * FROM `locations`;");
$rows = array();
while ($r = mysqli_fetch_assoc($sth)) {
    $rows[] = $r;
}

echo json_encode($rows);
