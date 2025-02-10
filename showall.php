<?php
include './inc/session.php';
if(isset($_POST['submit'])) {
	include './inc/db.php';
	$q = 'SELECT * FROM `emp_info` ORDER BY `EmpID` asc';
	$result = $conn->query($q);
	if($result->num_rows > 0) {
		$rows = $result->fetch_all(MYSQLI_ASSOC);
		$msg = array();
		$msg["success"] = json_encode($rows);
		print_r(json_encode($msg));
	} else {
		$msg = array();
		$msg["error"] = "No Employees Found!";
		print_r(json_encode($msg));
	}
} else {
	die();
}
?>