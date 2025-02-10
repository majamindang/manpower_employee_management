<?php
include './inc/session.php';
if(isset($_POST['submit'])) {
	include './inc/db.php';	
	$last_name = sanNormal($_POST['last_name']);
	$first_name = sanNormal($_POST['first_name']);
	$mid_name = sanNormal($_POST['mid_name']);
	$full_name = $last_name.", ".$first_name." ".$mid_name;
	$gender = sanNormal($_POST['gender']);
	$birthday = sanDate($_POST['birthday']);
	$nationality = sanNormal($_POST['nationality']);
	$marital = sanNormal($_POST['marital']);
	$emp_id = sanEmp($_POST['emp_id']);
	$job = sanNormal($_POST['job']);
	$client = sanClient($_POST['client']);
	$date_start = sanDate($_POST['date_start']);
	$date_end = sanDate($_POST['date_end']);
	$d_rate = sanNum($_POST['d_rate']);
	$allowance = sanNum($_POST['allowance']);
	$contracttype = sanNormal($_POST['contract']);
	$sss = sanSocial($_POST['sss']);
	$pagibig = sanSocial($_POST['pagibig']);
	$philhealth = sanSocial($_POST['philhealth']);
	$tin = sanSocial($_POST['tin']);
	$addr = sanAddr($_POST['addr']);
	$mob_num = sanPhone($_POST['mob_num']);
	$email = sanEmail($_POST['email']);
	$addr = sanAddr($_POST['addr']);
	$status = sanNormal($_POST['status']);
	
	$q3 = "SELECT * FROM `emp_info` WHERE `EmpID` = '".$emp_id."'";
	$result = $conn->query($q3);
	
	if($result->num_rows > 0) {
		$msg = array();
		$msg['error'] = "Duplicate Employee ID!";
		print_r(json_encode($msg));
		$conn->close();
		die();
	}
	
	
	$target_dir = "images/emp_images/";
	$file_name = basename($_FILES["uploadpic"]["name"]);
	$imageFileType = strtolower(pathinfo($target_dir . $file_name, PATHINFO_EXTENSION));
	$target_file = $target_dir .$emp_id.  "." . $imageFileType;
	$uploadOk = 1;

	// Check if image file is a actual image or fake image
	if(isset($_POST["submit"])) {
	  $check = getimagesize($_FILES["uploadpic"]["tmp_name"]);
	  if($check !== false) {
		$uploadOk = 1;
	  } else {
		$msg = array();
		$msg['error'] = "Not an Image!";
		print_r(json_encode($msg));
		$conn->close();
		die();
		$uploadOk = 0;
	  }
	}

	// Check if file already exists
	if (file_exists($target_file)) {
		$msg = array();
		$msg['error'] = "Image File Name Already Exists!";
		print_r(json_encode($msg));
		$conn->close();
		die();
		$uploadOk = 0;
	}

	// Check file size
	if ($_FILES["uploadpic"]["size"] > 500000) {
		$msg = array();
		$msg['error'] = "File too large!";
		print_r(json_encode($msg));
		$conn->close();
		die();
		$uploadOk = 0;
	}

	// Allow certain file formats
	if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
	&& $imageFileType != "webp" && $imageFileType != "bmp") {
		$msg = array();
		$msg['error'] = "This is not an Image!";
		print_r(json_encode($msg));
		$conn->close();
		die();
		$uploadOk = 0;
	}

	// Check if $uploadOk is set to 0 by an error
	if ($uploadOk == 0) {
		$msg = array();
		$msg['error'] = "Something is Wrong!";
		print_r(json_encode($msg));
		$conn->close();
		die();
	// if everything is ok, try to upload file
	} else {
	  if (move_uploaded_file($_FILES["uploadpic"]["tmp_name"], $target_file)) {
		$q = "INSERT INTO `emp_info` (`FullName`, `LastName`, `FirstName`, `MidName`, `Birthday`, `Gender`, `Nationality`, `MaritalStatus`, `EmpID`, `JobTitle`, `Client`, `DateStart`, `DateEnd`, `DailyRate`, `Allowance`, `ContractType`, `SSS`, `PAGIBIG`, `PHILHEALTH`, `TIN`, `Address`, `MobileNumber`, `Email`, `Image`, `Status`) VALUES ('".$full_name."', '".$last_name."', '".$first_name."', '".$mid_name."', '".$birthday."', '".$gender."', '".$nationality."', '".$marital."', '".$emp_id."', '".$job."', '".$client."', '".$date_start."', '".$date_end."', '".$d_rate."', '".$allowance."', '".$contracttype."', '".$sss."', '".$pagibig."', '".$philhealth."', '".$tin."', '".$addr."', '".$mob_num."', '".$email."', '".$target_file."', '".$status."')";
		$result = $conn->query($q);
		if ($result === TRUE) {
			$msg = array();
			$msg['success'] = "Employee Added Successfully!";
			print_r(json_encode($msg));
			$conn->close();
			die();
		} else {
			$msg = array();
			$msg['error'] = "Employee Not Added!";
			print_r(json_encode($msg));
			$conn->close();
			die();
		}
		
	  } else {
		$msg = array();
		$msg['error'] = "Something is Wrong!";
		print_r(json_encode($msg));
		$conn->close();
		die();
	  }
	}
} else {
	die();
	$conn->close();
}
?>