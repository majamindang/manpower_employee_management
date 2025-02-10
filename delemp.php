<?php
include './inc/session.php';
if(isset($_POST['submit'])){
	include './inc/db.php';
	$emp_id = sanEmp($_POST['EmpID']);
	$q3 = "SELECT `Image` from `emp_info` where `EmpID` = '".$emp_id."'";
	$image_res = $conn->query($q3);
	$image_row = $image_res->fetch_assoc();
	$q2 = "DELETE FROM `emp_info` WHERE `EmpID` = '".$emp_id."'";
	$result = $conn->query($q2);
	if($result === TRUE) {
		$msg = array();
		$msg['success'] = "Employee ".$emp_id." Deleted!";
		print_r(json_encode($msg));
		$conn->close();
		unlink($image_row['Image']);
		die();
	} else {
		$msg = array();
		$msg['error'] = "Error Deleting Employee!";
		print_r(json_encode($msg));
		$conn->close();
		die();
	}
} else {
	die();
}
?>