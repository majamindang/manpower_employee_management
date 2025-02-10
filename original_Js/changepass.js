
var user = document.getElementById('username');
var pass = document.getElementById('password');
var loginSubmit = document.getElementById('login_submit');
var changeSubmit = document.getElementById('change_submit');
var mBox = document.getElementById("messageBox");
var mIcon = document.getElementById("mIcon");
var mText = document.getElementById("mText");
var mChoice = document.getElementById("mChoice");
var modal2 = document.getElementById("modal2");
var eye = document.querySelectorAll('.far');
var newPass = document.getElementById('newPass');
var confPass = document.getElementById('confPass');
var inputs = document.querySelectorAll('input');

for (i=0; i<eye.length; i++) {
	eye[i].addEventListener("click",function() {
		if(this.parentElement.children[1].type == "password") {
			this.parentElement.children[1].type = "text";
			this.classList.remove("fa-eye");
			this.classList.add("fa-eye-slash");
		} else {
			this.parentElement.children[1].type = "password";
			this.classList.remove("fa-eye-slash");
			this.classList.add("fa-eye");
		}
	});
	
}


function messageBox(type, msgContent) {
	var one = {"icon":"../images/success.png","size":"30%","message":msgContent,"buttons":'<button class="messageBtnYes">OK</button>',"justify":"center"};
	var two = {"icon":"../images/error.png","size":"50%","message":msgContent,"buttons":'<button class="messageBtnNo">OK</button>',"justify":"center"};
	var three = {"icon":"../images/success.png","size":"30%","message":msgContent,"buttons":'<button class="messageBtnYes">OK</button>',"justify":"center"};
	var four = {"icon":"../images/success.png","size":"30%","message":msgContent,"buttons":'<button class="messageBtnYes">OK</button>',"justify":"center"};
	var five = {"icon":"../images/success.png","size":"30%","message":msgContent,"buttons":'<button class="messageBtnYes">OK</button>',"justify":"center"};
	var six = {"icon":"../images/error.png","size":"50%","message":msgContent,"buttons":'<button class="messageBtnNo">OK</button>',"justify":"center"};
	
	if (type == 1) {
		var data = one;
	}
	
	if (type == 2) {
		var data = two;
	}
	
	if (type == 3) {
		var data = three;
	}
	
	if (type == 4) {
		var data = four;
	}
	
	if (type == 5) {
		var data = five;
	}
	
	if (type == 6) {
		var data = six;
	}
	modal2.style.display = "flex";
	mBox.style.display = "flex";
	mIcon.src = data['icon'];
	mIcon.style.width = data['size'];
	mText.innerHTML = data['message'];
	mChoice.style.justifyContent = data['justify'];
	mChoice.innerHTML = data['buttons'];
	
	var okbtn = document.querySelectorAll(".messageBtnYes, .messageBtnNo");

	for (y of okbtn) {
		y.addEventListener("click",function(){
			this.parentElement.parentElement.style.display = "none";
			this.parentElement.parentElement.parentElement.style.display = "none";
		});
	}
}

changeSubmit.addEventListener("click",function(){
	var k = new FormData();
	k.append('oldPass', password.value);
	k.append('newPass', newPass.value);
	k.append('confPass', confPass.value);
	k.append('submit','submit');
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		  var g = JSON.parse(this.responseText);
				if("error" in g) {
					console.log("Error Found!");
					console.log(this.responseText);
					messageBox(2, g['error']);
				} else if ("success" in g) {
					console.log("Success!");
					messageBox(1, g['success']);
					
				} else {
					messageBox(2, "Oooops, something is wrong!");
				}
		}
	};
	xhttp.open("POST", "changePass.php", true);
	xhttp.send(k);
	
});