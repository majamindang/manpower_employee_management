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
	
	if ($result->num_rows == 0) {
		$msg = array();
		$msg['error'] = "Employee ID Not Found";
		print_r(json_encode($msg));
		$conn->close();
		die();
	}
	
	if(isset($_POST['uploadpic']) && $_POST['uploadpic'] == "") {
		
		$q = "UPDATE `emp_info` SET `FullName`='".$full_name."',`LastName`='".$last_name."',`FirstName`='".$first_name."',`MidName`='".$mid_name."',`Birthday`='".$birthday."',`Gender`='".$gender."',`Nationality`='".$nationality."',`MaritalStatus`='".$marital."',`EmpID`='".$emp_id."',`JobTitle`='".$job."',`Client`='".$client."',`DateStart`='".$date_start."',`DateEnd`='".$date_end."',`DailyRate`='".$d_rate."',`Allowance`='".$allowance."',`ContractType`='".$contracttype."',`SSS`='".$sss."',`PAGIBIG`='".$pagibig."',`PHILHEALTH`='".$philhealth."',`TIN`='".$tin."',`Address`='".$addr."',`MobileNumber`='".$mob_num."',`Email`='".$email."',`Status`='".$status."' WHERE `EmpID` = '".$emp_id."'";
			$result = $conn->query($q);
			if ($result === TRUE) {
				$msg = array();
				$msg['success'] = "Employee Updated Successfully!";
				print_r(json_encode($msg));
				$conn->close();
				die();
			} else {
				$msg = array();
				$msg['error'] = "Employee Not Updated!";
				print_r(json_encode($msg));
				$conn->close();
				die();
			}
			
	} else {
		$target_dir = "images/emp_images/";
		$file_name = basename($_FILES["uploadpic"]["name"]);
		$imageFileType = strtolower(pathinfo($target_dir . $file_name, PATHINFO_EXTENSION));
		$target_file = $target_dir.$emp_id.".".$imageFileType;
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
			$q = "UPDATE `emp_info` SET `LastName`='".$last_name."',`FirstName`='".$first_name."',`MidName`='".$mid_name."',`Birthday`='".$birthday."',`Gender`='".$gender."',`Nationality`='".$nationality."',`MaritalStatus`='".$marital."',`EmpID`='".$emp_id."',`JobTitle`='".$job."',`Client`='".$client."',`DateStart`='".$date_start."',`DateEnd`='".$date_end."',`DailyRate`='".$d_rate."',`Allowance`='".$allowance."',`ContractType`='".$contracttype."',`SSS`='".$sss."',`PAGIBIG`='".$pagibig."',`PHILHEALTH`='".$philhealth."',`TIN`='".$tin."',`Address`='".$addr."',`MobileNumber`='".$mob_num."',`Email`='".$email."',`Image`='".$target_file."',`Status`='".$status."' WHERE `EmpID` = '".$emp_id."'";
			$result = $conn->query($q);
			if ($result === TRUE) {
				$msg = array();
				$msg['success'] = "Employee Updated Successfully!";
				print_r(json_encode($msg));
				$conn->close();
				die();
			} else {
				$msg = array();
				$msg['error'] = "Employee Not Updated!";
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
	}	
} else {
	$conn->close();
	die();
}
?>