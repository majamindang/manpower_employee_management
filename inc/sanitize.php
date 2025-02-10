<?php

function sanNormal($str) {
	if(!preg_match('/[\'`.!@#$%^&*\(\)~\[\]+=:;{}<>_?\/\\|-]/', $str)) {
		return $str;
	} else {
		ob_end_clean();
		$msg = array();
		$msg['error'] = "We don't do that here!";
		print_r(json_encode($msg));
		die();
	}
}

function sanNum($str) {
	if(preg_match('/^\d{1,5}$|^\d{1,5}([.]\d{1,4})$/', $str)) {
		return $str;
	} else {
		ob_end_clean();
		$msg = array();
		$msg['error'] = "We don't do that here!";
		print_r(json_encode($msg));
		die();
	}
}

function sanClient($str) {
	if(!preg_match('/[\'`!@#$%^*\(\)~\[\]+=:;{}<>_?\/\\|-]/', $str)) {
		return $str;
	} else {
		ob_end_clean();
		$msg = array();
		$msg['error'] = "We don't do that here!";
		print_r(json_encode($msg));
		die();
	}
}

function sanAddr($str) {
	if(!preg_match('/[\'`!@$%^*\(\)~\[\]+=:;{}<>_?\/\\|]/', $str)) {
		return $str;
	} else {
		ob_end_clean();
		$msg = array();
		$msg['error'] = "We don't do that here!";
		print_r(json_encode($msg));
		die();
	}
}

function sanEmail($str) {
	if(preg_match('/^\w+([\.-]?\w+)*\@\w+([\.-]?\w+)*(\.\w{2,3})+$/', $str)) {
		return $str;
	} else {
		ob_end_clean();
		$msg = array();
		$msg['error'] = "We don't do that here!";
		print_r(json_encode($msg));
		die();
	}
}

function sanPhone($str) {
	if(preg_match('/^(\d{11}$)(?![-a-zA-Z\'`,.!@&$%^*\(\)~\[\]+=:;{}<>_?\/\\|]).*$/', $str)) {
		return $str;
	} else {
		ob_end_clean();
		$msg = array();
		$msg['error'] = "We don't do that here!";
		print_r(json_encode($msg));
		die();
	}
}

function sanSocial($str) {
	if(preg_match('/^([0-9]+-)*[0-9]+$/', $str)) {
		return $str;
	} else {
		ob_end_clean();
		$msg = array();
		$msg['error'] = "We don't do that here!";
		print_r(json_encode($msg));
		die();
	}
}

function sanEmp($str) {
	if(preg_match('/^\d{4}-\d{3}-\d{4}$/', $str)) {
		return $str;
	} else {
		ob_end_clean();
		$msg = array();
		$msg['error'] = "We don't do that here!";
		print_r(json_encode($msg));
		die();
	}
}


function sanDate($str) {
	if(preg_match('/^(([1]{1}[9]{1}[9]{1}\d{1})|([2-9]{1}\d{3}))\-[0,1]?\d{1}\-(([0-2]?\d{1})|([3][0,1]{1}))$/', $str)) {
		return $str;
	} else {
		ob_end_clean();
		$msg = array();
		$msg['error'] = "We don't do that here!";
		print_r(json_encode($msg));
		die();
	}
}

?>