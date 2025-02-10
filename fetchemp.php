<?php
include './inc/session.php';
if(isset($_POST['submit'])) {
	include './inc/db.php';
	$q = 'SELECT * FROM `emp_info` WHERE `EmpID` = "'.sanEmp($_POST['EmpID']).'"';
	$result = $conn->query($q);
	if($result->num_rows > 0) {
		$rows = $result->fetch_assoc();
		$msg = array();
		$msg["success"] = json_encode($rows);
		print_r(json_encode($msg));
	}
} else {
	die();
}
?>