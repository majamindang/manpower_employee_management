<?php
include './inc/session.php';
if(isset($_POST['submit'])){
	include './inc/db.php';
	$newClientInput = sanClient($_POST['newClient']);
	$q2 = "INSERT INTO `clients` (`client_name`) VALUES ('".$newClientInput."')";
	$result = $conn->query($q2);
	if($result === TRUE) {
		$last_id = $conn->insert_id;
		$msg = array();
		$msg['success'] = "Added Client Successfully!";
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