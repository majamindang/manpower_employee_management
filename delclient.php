<?php
include './inc/session.php';
if(isset($_POST['submit'])){
	include './inc/db.php';
	$ClientId = sanNum($_POST['ClientId']);
	$q2 = "DELETE FROM `clients` WHERE `id` = ".$ClientId;
	$result = $conn->query($q2);
	if($result === TRUE) {
		$conn->insert_id;
		$msg = array();
		$msg['success'] = "Client Deleted!";
		print_r(json_encode($msg));
		$conn->close();
		die();
	} else {
		$msg = array();
		$msg['error'] = "Error Deleting Client!";
		print_r(json_encode($msg));
		$conn->close();
		die();
	}
} else {
	die();
}
?>