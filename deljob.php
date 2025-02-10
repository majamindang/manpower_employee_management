<?php
include './inc/session.php';
if(isset($_POST['submit'])){
	include './inc/db.php';
	$JobId = sanNum($_POST['JobId']);
	$q2 = "DELETE FROM `job_title` WHERE `id` = ".$JobId;
	$result = $conn->query($q2);
	if($result === TRUE) {
		$conn->insert_id;
		$msg = array();
		$msg['success'] = "Job Deleted!";
		print_r(json_encode($msg));
		$conn->close();
		die();
	} else {
		$msg = array();
		$msg['error'] = "Error Deleting Job!";
		print_r(json_encode($msg));
		$conn->close();
		die();
	}
} else {
	die();
}
?>