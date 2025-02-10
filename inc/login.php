<?php
session_start();
	if(isset($_POST['submit'])) {
		include './db.php';
		include './sanitize.php';
		
		$user = $_POST['username'];
		$pass = $_POST['password'];
		
		$q = 'SELECT `u_name`, `p_word` FROM `admins`';
		$res = $conn->query($q);
		$row = $res->fetch_assoc();
		
		if($user == $row['u_name'] && md5($pass) == $row['p_word']) {
			
			ob_end_clean();
			$msg = array();
			$msg['success'] = "Successfully Login!";
			print_r(json_encode($msg));
			$_SESSION['token'] = $row['p_word'];
			die();
			
		} else {
			ob_end_clean();
			$msg = array();
			$msg['error'] = "Incorrect Credentials!";
			print_r(json_encode($msg));
			die();
		}
		
	} else {
		die();
	}
?>