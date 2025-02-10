<?php
	
	if(isset($_POST['submit']) && isset($_POST['oldPass']) && $_POST['oldPass'] != "" && isset($_POST['newPass']) && $_POST['newPass'] != "" && isset($_POST['confPass']) && $_POST['confPass'] != "") {
		include 'db.php';
		include 'sanitize.php';
		$q = "SELECT `p_word` FROM `admins` where 1";
		$qs = $conn->query($q);
		$pass = $qs->fetch_assoc()['p_word'];
		if($pass == md5($_POST['oldPass'])) {
			if($_POST['newPass'] != $_POST['confPass']) {
				ob_end_clean();
				$msg = array();
				$msg['error'] = "New Passwords didn't match!";
				print_r(json_encode($msg));
				die();
			}
			
			if(strlen($_POST['newPass']) < 8) {
				ob_end_clean();
				$msg = array();
				$msg['error'] = "Password should be at least 8 characters long!";
				print_r(json_encode($msg));
				die();
			}
			
			$q = "UPDATE `admins` SET `p_word`='".md5($_POST['newPass'])."' WHERE 1";
			$qs = $conn->query($q);
			if($qs === TRUE) {
				ob_end_clean();
				$msg = array();
				$msg['success'] = "Changed Password Successfully";
				print_r(json_encode($msg));
				die();
			}
			
		} else {
				ob_end_clean();
				$msg = array();
				$msg['error'] = "Old Password is Incorrect!";
				print_r(json_encode($msg));
				die();
		}
	} else {
		ob_end_clean();
		$msg = array();
		$msg['error'] = "Don't leave blank!";
		print_r(json_encode($msg));
		die();
	}
?>