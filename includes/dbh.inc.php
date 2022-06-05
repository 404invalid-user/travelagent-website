<?php

$serverName = 'localhost';
$DBUserName = 'root';
$DBPassword = '';
$DBName = 'travelagent-test';

$conn = mysqli_connect($serverName, $DBUserName, $DBPassword, $DBName);


if (!$conn) {
    die("connection failed: ". mysqli_connect_error());
}