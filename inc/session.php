<?php
include 'db.php';
include 'sanitize.php';
session_start();

$q = 'SELECT `u_name`, `p_word` FROM `admins`';
$res = $conn->query($q);
$row = $res->fetch_assoc();

if(!isset($_SESSION['token']) || $_SESSION['token'] == "" || $_SESSION['token'] != $row['p_word']) {
	header("location: http://localhost/empx/login.html");
	die();
}

$conn->close();
	
?>	