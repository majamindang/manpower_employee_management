
<?php
	include './inc/session.php';
?>

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Employee Management System</title>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
  <link rel="stylesheet" href="./css/styles.css">
  <link rel="icon" type="image/png" href="./images/abbotslogo.png">
</head>

<body>
	<header>
		<div class="navbar">
			<div class="logo"><img src="./images/abbotslogo.png"><h1>ABBOTS MANPOWER SERVICES</h1></div>
			<ul class="nav-items">
				<li><button class="logOut" id="logOut"><i class="fas fa-power-off"></i>Logout</button></li>
			</ul>
		</div>
	</header>
	<div class="main">
		<div class="home">
			<div class="main_options">
				<div class="option_top">
					<div class="home_title">
						<h1>EMPLOYEES</h1>
					</div>
					<div class="functions">
						<button class="func-btn new_emp" id="new_emp"><i class="fas fa-user-plus"></i>New Employee</button>
						<button class="func-btn new_job" id="new_job"><i class="fas fa-briefcase"></i>Jobs</button>
						<button class="func-btn new_client" id="new_client"><i class="fas fa-user-friends"></i>Clients</button>
					</div>
				</div>	
				<div class="search">
					<div class="bar">
						<div class="input">
							<input type="text" name="searchTerm" placeholder="Search">
						</div>
						<div class="icon">
							<i class="fas fa-search"></i>
						</div>
					</div>
					<button class="search_btn" id="submit">Search</button>
					<div class="by-wrapper">
						<select class="group_btn" name="searchBy" id="by">
							<option value="FullName">Name</option>
							<option value="EmpID">Employee ID</option>
							<option value="Email">Email</option>
						</select>
					</div>
					<div class="status-wrapper">
						<select class="group_btn" name="Status" id="status">
							<option value="All">All</option>
							<option value="Active">Active</option>
							<option value="Resigned">Resigned</option>
							<option value="Terminated">Terminated</option>
						</select>
					</div>
					<div class="contract-wrapper">
						<select class="group_btn" name="ContractType" id="contract">
							<option value="All">All</option>
							<option value="Regular">Regular</option>
							<option value="Contractual">Contractual</option>
						</select>
					</div>
					<div class="job-wrapper">
						<select class="group_btn" name="JobTitle" id="job_title">
							<?php
								include './inc/db.php';
								$q = "SELECT * FROM `job_title`";
								$result = $conn->query($q);
								if($result->num_rows > 0) {
									echo '<option value="All">All</option>';
									$rows = $result->fetch_all(MYSQLI_ASSOC);
									for ($i=0; $i < count($rows); $i++) {
										echo '<option value="'.$rows[$i]['name'].'">'.$rows[$i]['name'].'</option>';
									}
								} else {
									echo "";
								}
							?>
						</select>
					</div>
					<div class="deployed-wrapper">
						<select class="group_btn" name="Client" id="deployedto">
							<?php
								include './inc/db.php';
								$q = "SELECT * FROM `clients`";
								$result = $conn->query($q);
								if($result->num_rows > 0) {
									echo '<option value="All">All</option>';
									$rows = $result->fetch_all(MYSQLI_ASSOC);
									for ($i=0; $i < count($rows); $i++) {
										echo '<option value="'.$rows[$i]['client_name'].'">'.$rows[$i]['client_name'].'</option>';
									}
								} else {
									echo "";
								}
							?>
						</select>
					</div>
					<div class="date-wrapper">
						<input class="date-btn" type="date" id="date" name="DateStart">
					</div>
				</div>
			</div>
			
			<div class="main_table">
				<table class="employees">
					<thead>
						<tr><th>Status</th><th>Employee ID #</th><th>Name</th><th>Job Title</th><th>Contract</th><th>Date Started</th><th>Options</th></tr>
					</thead>
					<tbody id="emp_table">
						<tr><td colspan="7" style="text-align: center; color: red; font-weight: bold;"><p>No Employees Found!</p></td></tr>
					</tbody>
				</table>
				<div class="table_nav">
					<div class="counts">
						<p class="counting">Showing <span class="count" id="min_count">0</span> of <span class="count" id="total_count">0</span> results</p>
					</div>
					<div class="nav_btn">
						<button class="tbl_nav_btn" id="tbl_prev"><i class="fas fa-arrow-left"></i>PREV</button>
						<button class="tbl_nav_btn" id="tbl_next">NEXT<i class="fas fa-arrow-right"></i></button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal" id="modal">
		<div class="box_new_emp" id="newempform">
			<div class="box_header">
				<h1 id="empform_title"><i class="fas fa-user-plus"></i>New Employee<span><i class="fas fa-times" id="close"></i></span></h1>
			</div>
			<div class="box_body">
				<h1 class="section_title">Personal Information</h1>
				<div class="personal_info">
						<div class="new_input_wrapper" id="last_name">
							<input class="last_name" name="last_name" type="text" placeholder="Dela Cruz" data-tbname="LastName">
						</div>					
						<div class="new_input_wrapper" id="first_name">
							<input class="first_name" name="first_name" type="text" placeholder="Juan" data-tbname="FirstName">
						</div>
						<div class="new_input_wrapper" id="mid_name">
							<input class="mid_name" name="mid_name" type="text" placeholder="Santos" data-tbname="MidName">
						</div>
						<div class="new_input_wrapper" id="gender">
							<select class="gender" name="gender" data-tbname="Gender">
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							</select>
						</div>	
						<div class="new_input_wrapper" id="birthday">
							<input class="birthday" name="birthday" type="date" data-tbname="Birthday">
						</div>
						<div class="new_input_wrapper" id="nationality">
							<input class="nationality" name="nationality" type="text" placeholder="Filipino, American, Bulldog" data-tbname="Nationality">
						</div>
						<div class="new_input_wrapper" id="marital">
							<select class="marital" name="marital" data-tbname="MaritalStatus">
								<option value="Single">Single</option>
								<option value="Married">Married</option>
								<option value="Widowed">Widowed</option>
								<option value="Divorced">Divorced</option>
							</select>
						</div>	
				</div>
				<h1 class="section_title">Job Information</h1>
				<div class="work_info" id="work_info">
					<div class="new_input_wrapper" id="emp_id">
						<input class="emp_id" name="emp_id" type="text" placeholder="0000-000-0000" data-tbname="EmpID">
					</div>
					<div class="new_input_wrapper" id="job">
						<select class="job" name="job" data-tbname="JobTitle">
							<?php
								include './inc/db.php';
								$q = "SELECT * FROM `job_title`";
								$result = $conn->query($q);
								if($result->num_rows > 0) {
									$rows = $result->fetch_all(MYSQLI_ASSOC);
									for ($i=0; $i < count($rows); $i++) {
										echo '<option value="'.$rows[$i]['name'].'">'.$rows[$i]['name'].'</option>';
									}
								} else {
									echo "";
								}
							?>
						</select>
					</div>	
					<div class="new_input_wrapper" id="deploy">
						<select class="deploy" name="client" data-tbname="Client">
							<?php
								include './inc/db.php';
								$q = "SELECT * FROM `clients`";
								$result = $conn->query($q);
								if($result->num_rows > 0) {
									$rows = $result->fetch_all(MYSQLI_ASSOC);
									for ($i=0; $i < count($rows); $i++) {
										echo '<option value="'.$rows[$i]['client_name'].'">'.$rows[$i]['client_name'].'</option>';
									}
								} else {
									echo "";
								}
							?>
						</select>
					</div>	
					<div class="new_input_wrapper" id="start_date">
						<input class="start_date" type="date" name="date_start" data-tbname="DateStart">
					</div>
					<div class="new_input_wrapper" id="end_date">
						<input class="end_date" name="date_end" type="date" data-tbname="DateEnd">
					</div>
					<div class="new_input_wrapper" id="daily_rate">
						<input class="daily_rate" name="d_rate" type="text" placeholder="Daily Rate" data-tbname="DailyRate">
					</div>
					<div class="new_input_wrapper" id="allowance">
						<input class="allowance" name="allowance" type="text" placeholder="Allowance" data-tbname="Allowance">
					</div>
					<div class="new_input_wrapper" id="contract">
						<select class="contract" name="contract" id="contract" data-tbname="ContractType">
							<option value="Regular">Regular</option>
							<option value="Contractual">Contractual</option>
						</select>
					</div>
					<div class="new_input_wrapper" id="status">
						<select class="status" name="status" id="statusField" data-tbname="Status">
							<option value="Active">Active</option>
							<option value="Terminated">Terminated</option>
							<option value="Resigned">Resigned</option>
						</select>
					</div>
				</div>
				<h1 class="section_title">Government IDs</h1>
				<div class="gov_info">
					<div class="new_input_wrapper" id="sss">
						<input class="sss" type="text" name="sss" placeholder="SSS ID Number" data-tbname="SSS">
					</div>
					<div class="new_input_wrapper" id="pagibig">
						<input class="pagibig" name="pagibig" type="text" placeholder="PAG-IBIG ID NUMBER" data-tbname="PAGIBIG">
					</div>
					<div class="new_input_wrapper" id="philhealth">
						<input class="philhealth" name="philhealth" type="text" placeholder="PHILHEALTH ID NUMBER" data-tbname="PHILHEALTH">
					</div>
					<div class="new_input_wrapper" id="tin">
						<input class="tin" type="text" name="tin" placeholder="TIN ID NUMBER" data-tbname="TIN">
					</div>
				</div>
				<h1 class="section_title">Contact Information</h1>
				<div class="contact_info">
					<div class="new_input_wrapper" id="home_addr">
						<input class="home_addr" name="addr" type="text" placeholder="123 Block 4 Lot 5 Lucky6 Village" data-tbname="Address">
					</div>
					<div class="new_input_wrapper" id="mob_num">
						<input class="mob_num" name="mob_num" type="text" placeholder="11 digit number (ex. 09123456789)" data-tbname="MobileNumber">
					</div>
					<div class="new_input_wrapper" id="email">
						<input class="email" name="email" type="text" placeholder="juandelacruz@email.com" data-tbname="Email">
					</div>
				</div>
				<h1 class="section_title">Upload an Image</h1>
				<div class="upload_pic">
					<div class="upload_wrapper">
						<input name="uploadpic" id="uploadpic" type="file">
					</div>
				</div>
				<button class="pos-btn" id="personalSubmit">SUBMIT</button>
				<button class="pos-btn" style="" id="updateSubmit">UPDATE</button>
			</div>
		</div>
		<div class="box_new_job" id="newjobform">
			<div class="box_header">
				<h1><i class="fas fa-briefcase"></i>Jobs<span><i class="fas fa-times" id="close"></i></span></h1>
			</div>
			<div class="box_body">
				<div class="new_input_wrapper" id="job">
					<input class="job" type="text" placeholder="Name of Job" id="newJobInput">
				</div>
				<button class="pos-btn" id="newJobSubmit">ADD</button>
				<div class="job_list" id="job_list">
					<?php
					include './inc/db.php';
					$q = "SELECT * FROM `job_title`";
					$result = $conn->query($q);
					if($result->num_rows > 0) {
						$rows = $result->fetch_all(MYSQLI_ASSOC);
						for ($i=0; $i < count($rows); $i++) {
							echo '<div class="job_buttons" id="job_buttons" data-job-id="'.$rows[$i]['id'].'">
					'.$rows[$i]['name'].'<span><i class="fas fa-times" id="delJob"></i></span>
					</div> ';
						}
					} else {
						echo "No Jobs Listed";
					}
					?>
					
				</div>
			</div>
		</div>
		<div class="box_new_client" id="newclientform">
			<div class="box_header">
				<h1><i class="fas fa-user-friends"></i>Clients<span><i class="fas fa-times" id="close"></i></span></h1>
			</div>
			<div class="box_body">
				<div class="new_input_wrapper" id="client">
					<input class="client" type="text" placeholder="Client Name" id="newClientInput">
				</div>
				<button class="pos-btn" id="newClientSubmit">ADD</button>
				<div class="client_list" id="client_list">
					<?php
					include './inc/db.php';
					$q = "SELECT * FROM `clients`";
					$result = $conn->query($q);
					if($result->num_rows > 0) {
						$rows = $result->fetch_all(MYSQLI_ASSOC);
						for ($i=0; $i < count($rows); $i++) {
							echo '<div class="client_buttons" id="client_buttons" data-client-id="'.$rows[$i]['id'].'">'.$rows[$i]['client_name'].'<span><i class="fas fa-times" id="delClient"></i></span>
					</div> ';
						}
					} else {
						echo "No Clients Listed";
					}
					?>
					
				</div>
			</div>
		</div>
		
		<div class="box_show_emp" id="showEmp">
			<div class="box_header">
				<h1><i class="fas fa-user-friends"></i>Employee Details<span><i class="fas fa-times" id="close"></i></span></h1>
			</div>
			<div class="box_body">
				<div class="emp_img" id="emp_img">
					<div class="emp_img_frame" id="emp_img_frame">
					
					</div>
				</div>
				<div class="emp_box1" id="emp_box1">
					<h1></h1>
					
					<table>
					<tbody>
						
						<tr><td class="key">Employee ID</td><td class="info" data-tblId="EmpID"></td></tr>
						<tr><td class="key">Contract Type</td><td class="info" data-tblId="ContractType"></td></tr>
						<tr><td class="key">Deployed to</td><td class="info" data-tblId="Client"></td></tr>
						<tr><td class="key">Job Title</td><td class="info" data-tblId="JobTitle"></td></tr>
						<tr><td class="key">Contract Period</td><td class="info" data-tblId="DateStartToEnd"></td></tr>
						<tr><td class="key">Daily Rate</td><td class="info" data-tblId="DailyRate"></td></tr>
						<tr><td class="key">Allowance</td><td class="info" data-tblId="Allowance"></td></tr>
						
					</tbody>
					</table>
				</div>		
				<div class="emp_box2" id="emp_box2">
					<h3><span><i class="far fa-file-alt"></i></span>Personal Information</h3>
					<table>
					<tbody>
						
						<tr><td class="key">Last Name</td><td class="info"></td></tr>
						<tr><td class="key">First Name</td><td class="info"></td></tr>
						<tr><td class="key">Middle Name</td><td class="info"></td></tr>
						<tr><td class="key">Gender</td><td class="info"></td></tr>
						<tr><td class="key">Birthday</td><td class="info"></td></tr>
						<tr><td class="key">Nationality</td><td class="info"></td></tr>
						<tr><td class="key">Marital Status</td><td class="info"></td></tr>
						
					</tbody>
					</table>
					<button id="printbtn"><i class="fas fa-print"></i>&nbsp; PRINT</button><button id="updatebtn"><i class="fas fa-pen"></i>&nbsp; UPDATE</button><button id="delbtn"><i class="fas fa-trash"></i>&nbsp; DELETE</button>
				</div>
				<div class="emp_box3" id="emp_box3">
					<h3><span><i class="fas fa-mobile-alt"></i></span>Contact Information</h3>
					<table>
					<tbody>
						
						<tr><td class="key">Address</td><td class="info"></td></tr>
						<tr><td class="key">Mobile Number</td><td class="info"></td></tr>
						<tr><td class="key">Email</td><td class="info"></td></tr>
						
					</tbody>
					</table>
					
					<h3><span><i class="fas fa-id-card"></i></span>Government IDs</h3>
					<table>
					<tbody>
						
						<tr><td class="key">SSS</td><td class="info"></td></tr>
						<tr><td class="key">PAG-IBIG</td><td class="info"></td></tr>
						<tr><td class="key">PhilHealth</td><td class="info"></td></tr>
						<tr><td class="key">TIN</td><td class="info"></td></tr>
						
					</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	<div class="modal2" id="modal2">
		<div class="messageBox" id="messageBox">
			<div class="messageIcon">
				<img src="" id="mIcon">
			</div>
			<div class="messageBody">
				<p class="messageText" id="mText"></p>
			</div>
			<div class="messageChoices" id="mChoice">
			</div>
		</div>
	</div>
	
  <script src="js/myjs.js"></script>
  <script src="js/jquery-3.5.1.min.js"></script>
  <script src="js/printthis/printThis.js"></script>
</body>
</html>