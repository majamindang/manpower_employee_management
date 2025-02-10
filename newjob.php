<?php
include './inc/session.php';
if(isset($_POST['submit'])){
	include './inc/db.php';
	$newJobInput = sanNormal($_POST['newJob']);
	$q2 = "INSERT INTO `job_title`(`name`) VALUES ('".$newJobInput."')";
	$result = $conn->query($q2);
	if($result === TRUE) {
		$last_id = $conn->insert_id;
		$msg = array();
		$msg['success'] = "Added Job Successfully!";
		$msg['id'] = $last_id;
		print_r(json_encode($msg));
		$conn->close();
		die();
	} else {
		$msg = array();
		$msg['error'] = "Error!";
		print_r(json_encode($msg));
		$conn->close();
		die();
	}
} else {
	die();
}
?>