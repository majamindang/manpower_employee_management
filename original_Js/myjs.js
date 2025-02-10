var searchSubmit = document.querySelector(".search #submit"),
    allSearch = document.querySelectorAll(".search input, .search select"),
    regPatt = /['`.,!@#$%^&*()~\[\]+=:;{}<>_?\/\\|-]/,
    regPattAddr = /['`!@$%^*()~\[\]+=:;{}<>_?\/\\|]/,
    regPattEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    regPattPhone = /^(\d{11}$)(?![-a-zA-Z'`,.!@&$%^*()~\[\]+=:;{}<>_?\/\\|]).*$/,
    regPattSocial = /^([0-9]+-)*[0-9]+$/,
    regPattEmp = /^\d{4}-\d{3}-\d{4}$/,
    regPattFile = /(jpe?g|png|webp|bmp)$/,
    regPattClient = /['`!@#$%^*()~\[\]+=:;{}<>_?\/\\|-]/,
    regPattNumber = /^\d{1,5}$|^\d{1,5}([.]\d{1,4})$/,
    allPersonal = document.querySelectorAll(".modal .box_new_emp * select, .modal .box_new_emp * input"),
    modal = document.getElementById("modal"),
    modal2 = document.getElementById("modal2"),
    newEmpBtn = document.getElementById("new_emp"),
    newJobBtn = document.getElementById("new_job"),
    newClientBtn = document.getElementById("new_client"),
    newEmpForm = document.getElementById("newempform"),
    newJobForm = document.getElementById("newjobform"),
    newClientForm = document.getElementById("newclientform"),
    mBox = document.getElementById("messageBox"),
    mIcon = document.getElementById("mIcon"),
    mText = document.getElementById("mText"),
    mChoice = document.getElementById("mChoice"),
    newJobSubmit = document.getElementById("newJobSubmit"),
    newJobInput = document.getElementById("newJobInput"),
    newClientSubmit = document.getElementById("newClientSubmit"),
    newClientInput = document.getElementById("newClientInput"),
    ClientList = document.getElementById("client_list"),
    JobList = document.getElementById("job_list"),
    closebtn = document.querySelectorAll("#close"),
    workInfo = document.getElementById("work_info"),
    tblNext = document.getElementById("tbl_next"),
    tblPrev = document.getElementById("tbl_prev"),
    changePassBtn = document.getElementById("changePass"),
    logOutBtn = document.getElementById("logOut");
function messageBox(e, t) {
    if (1 == e) var n = { icon: "./images/success.png", size: "70%", message: t, buttons: '<button class="messageBtnYes">OK</button>', justify: "center" };
    if (2 == e) n = { icon: "./images/error.png", size: "50%", message: t, buttons: '<button class="messageBtnNo">OK</button>', justify: "center" };
    if (3 == e) n = { icon: "./images/notfound.png", size: "100%", message: t, buttons: '<button class="messageBtnNo">OK</button>', justify: "center" };
    if (4 == e) n = { icon: "./images/success.png", size: "30%", message: t, buttons: '<button class="messageBtnYes">OK</button>', justify: "center" };
    if (5 == e) n = { icon: "./images/success.png", size: "30%", message: t, buttons: '<button class="messageBtnYes">OK</button>', justify: "center" };
    if (6 == e) n = { icon: "./images/error.png", size: "50%", message: t, buttons: '<button class="messageBtnNo">OK</button>', justify: "center" };
    (modal2.style.display = "flex"), (mBox.style.display = "flex"), (mIcon.src = n.icon), (mIcon.style.width = n.size), (mText.innerHTML = n.message), (mChoice.style.justifyContent = n.justify), (mChoice.innerHTML = n.buttons);
    var i = document.querySelectorAll(".messageBtnYes, .messageBtnNo");
    for (y of i)
        y.addEventListener("click", function () {
            (this.parentElement.parentElement.style.display = "none"), (this.parentElement.parentElement.parentElement.style.display = "none");
        });
}
function promptBox(e, t, n) {
    if (1 == e) var s = { icon: "./images/success.png", size: "70%", message: t, buttons: '<button class="messageBtnYes">View</button>&nbsp;&nbsp;<button class="messageBtnNo">Back</button>', justify: "space-between" };
    if (2 == e) s = { icon: "./images/error.png", size: "60%", message: t, buttons: '<button class="messageBtnYes">Ok</button>&nbsp;&nbsp;<button class="messageBtnNo">Cancel</button>', justify: "space-between" };
    (modal2.style.display = "flex"), (mBox.style.display = "flex"), (mIcon.src = s.icon), (mIcon.style.width = s.size), (mText.innerHTML = s.message), (mChoice.style.justifyContent = s.justify), (mChoice.innerHTML = s.buttons);
    var r = document.querySelectorAll(".messageBtnYes"),
        l = document.querySelectorAll(".messageBtnNo");
    for (i = 0; i < r.length; i++) r[i].addEventListener("click", n);
    for (i = 0; i < l.length; i++)
        l[i].addEventListener("click", function () {
            (this.parentElement.parentElement.style.display = "none"), (this.parentElement.parentElement.parentElement.style.display = "none");
        });
}
function setBtnFunc() {
	var e = document.getElementById("personalSubmit");
	var f = document.getElementById("updateSubmit");
	
	e.addEventListener("click", function() {
		valCheck(allPersonal);
	});
	
	f.addEventListener("click", function() {
		valCheckUpdate(allPersonal);
	});
}
setBtnFunc();
function closer() {
    var e = document.querySelectorAll("#close");
    for (x of e)
        x.addEventListener("click", function () {
            for (this.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "none", this.parentElement.parentElement.parentElement.parentElement.style.display = "none", i = 0; i < allPersonal.length; i++)
                allPersonal[i].value = "";
            (newJobInput.value = ""), (newClientInput.value = ""), closer();
        });
}
function valCheck(e) {
    let t = 0;
    for (i = 0; i < e.length; i++)
        if ("" != e[i].value || ["sss", "pagibig", "philhealth", "tin"].includes(e[i].className)) {
            if ("mob_num" == e[i].className) {
                if (regPattPhone.test(e[i].value)) {
                    (e[i].style.border = ""), e[i].parentElement.classList.remove("error4", "error3"), t++;
                    continue;
                }
                (e[i].style.border = "1px solid red"), e[i].parentElement.classList.add("error4");
                continue;
            }
            if ("emp_id" == e[i].className) {
                if (regPattEmp.test(e[i].value)) {
                    (e[i].style.border = ""), e[i].parentElement.classList.remove("error7", "error3"), t++;
                    continue;
                }
                (e[i].style.border = "1px solid red"), e[i].parentElement.classList.add("error7");
                continue;
            }
            if ("file" == e[i].type) {
                if (regPattFile.test(e[i].files[0].name)) {
                    (e[i].style.border = ""), e[i].parentElement.classList.remove("error8", "error3"), t++;
                    continue;
                }
                e[i].parentElement.classList.add("error8");
                continue;
            }
            if ("deploy" == e[i].className) {
                if (regPattClient.test(e[i].value)) {
                    (e[i].style.border = "1px solid red"), e[i].parentElement.classList.add("error1");
                    continue;
                }
                (e[i].style.border = ""), e[i].parentElement.classList.remove("error1", "error3"), t++;
                continue;
            }
            if (["daily_rate", "allowance"].includes(e[i].className)) {
                if (regPattNumber.test(e[i].value)) {
                    (e[i].style.border = ""), e[i].parentElement.classList.remove("error10", "error3"), t++;
                    continue;
                }
                (e[i].style.border = "1px solid red"), e[i].parentElement.classList.add("error10");
                continue;
            }
            if ("home_addr" == e[i].className) {
                if (regPattAddr.test(e[i].value)) {
                    (e[i].style.border = "1px solid red"), e[i].parentElement.classList.add("error5");
                    continue;
                }
                (e[i].style.border = ""), e[i].parentElement.classList.remove("error5", "error3"), t++;
                continue;
            }
            if (["sss", "pagibig", "philhealth", "tin"].includes(e[i].className)) {
                if (regPattSocial.test(e[i].value)) {
                    (e[i].style.border = ""), e[i].parentElement.classList.remove("error9", "error3"), t++;
                    continue;
                }
                if ("" == e[i].value || " " == e[i].value) {
                    (e[i].style.border = ""), e[i].parentElement.classList.remove("error9", "error3");
                    continue;
                }
                (e[i].style.border = "1px solid red"), e[i].parentElement.classList.add("error9");
                continue;
            }
            if ("email" == e[i].className) {
                if (regPattEmail.test(e[i].value)) {
                    (e[i].style.border = ""), e[i].parentElement.classList.remove("error6", "error3"), t++;
                    continue;
                }
                (e[i].style.border = "1px solid red"), e[i].parentElement.classList.add("error6");
                continue;
            }
            if ("date" == e[i].type) {
                if (regPatt.test(e[i].value.replace(/-/g, ""))) {
                    (e[i].style.border = "1px solid red"), e[i].parentElement.classList.add("error1");
                    continue;
                }
                (e[i].style.border = ""), e[i].parentElement.classList.remove("error1", "error3"), t++;
                continue;
            }
            if (regPatt.test(e[i].value)) {
                (e[i].style.border = "1px solid red"), e[i].parentElement.classList.add("error1");
                continue;
            }
            (e[i].style.border = ""), e[i].parentElement.classList.remove("error1", "error2", "error3", "error4", "error5", "error6", "error7"), t++;
        } else (e[i].style.border = "1px solid red"), e[i].parentElement.classList.add("error3");
    if ((t < e.length && ((modal2.style.display = "flex"), (mBox.style.display = "flex"), messageBox(2, "Please check the errors!")), t == e.length)) {
        var n = document.querySelector("#uploadpic").files[0],
            s = new FormData();
        for (i = 0; i < allPersonal.length - 1; i++) s.append(allPersonal[i].name, allPersonal[i].value);
        s.append("submit", "submit"), s.append("uploadpic", n);
        var r = new XMLHttpRequest();
        (r.onreadystatechange = function () {
            if (4 == this.readyState && 200 == this.status) {
                var e = JSON.parse(this.responseText);
                if ("error" in e) { 
					messageBox(2, e.error);
				}
                
				else if ("success" in e) {
                    fetch_all(current);
                    messageBox(1, "Successfully Added!"), (modal.style.display = "none"), (newEmpForm.style.display = "none");
                } else messageBox(2, "Oooops, check the console!");
            }
        });
            r.open("POST", "newemp.php", !0);
            r.send(s);
    }
};

function newJob() {
    var e = 0;
    if (
        ("" != newJobInput.value
            ? regPatt.test(newJobInput.value)
                ? ((newJobInput.style.border = "1px solid red"), newJobInput.parentElement.classList.add("error1alt"))
                : ((newJobInput.style.border = ""), newJobInput.parentElement.classList.remove("error1alt", "error2alt", "error3alt", "error4alt", "error5alt", "error6alt", "error7alt"), e++)
            : ((newJobInput.style.border = "1px solid red"), newJobInput.parentElement.classList.add("error3alt")),
        e < 1 && ((modal2.style.display = "flex"), (mBox.style.display = "flex"), messageBox(2, "Please Check the Error!")),
        1 == e)
    ) {
        (modal2.style.display = "flex"), (mBox.style.display = "flex");
        var t = new FormData();
        t.append("newJob", newJobInput.value), t.append("submit", "submit");
        var n = new XMLHttpRequest();
        (n.onreadystatechange = function () {
            if (4 == this.readyState && 200 == this.status) {
                var e = JSON.parse(this.responseText);
                "error" in e
                    ? messageBox(2, e.error)
                    : "success" in e
                    ? (messageBox(1, e.success),
                      "No Jobs Listed" == JobList.innerText
                          ? (JobList.innerHTML = '<div class="job_buttons" id="job_buttons" data-job-id="' + e.id + '">' + newJobInput.value + '<span><i class="fas fa-times" id="delJob"></i></span></div> ')
                          : (JobList.innerHTML += '<div class="job_buttons" id="job_buttons" data-job-id="' + e.id + '">' + newJobInput.value + '<span><i class="fas fa-times" id="delJob"></i></span></div> '),
                      (newJobInput.value = ""),
                      delJobs())
                    : messageBox(2, "Oooops, check the console!");
            }
        }),
            n.open("POST", "newjob.php", !0),
            n.send(t);
    }
}
function valCheckUpdate(e) {
    let t = 0;
    for (i = 0; i < e.length; i++)
        if ("" != e[i].value || ["sss", "pagibig", "philhealth", "tin"].includes(e[i].className)) {
            if ("mob_num" == e[i].className) {
                if (regPattPhone.test(e[i].value)) {
                    (e[i].style.border = ""), e[i].parentElement.classList.remove("error4", "error3"), t++;
                    continue;
                }
                (e[i].style.border = "1px solid red"), e[i].parentElement.classList.add("error4");
                continue;
            }
            if ("emp_id" == e[i].className) {
                if (regPattEmp.test(e[i].value)) {
                    (e[i].style.border = ""), e[i].parentElement.classList.remove("error7", "error3"), t++;
                    continue;
                }
                (e[i].style.border = "1px solid red"), e[i].parentElement.classList.add("error7");
                continue;
            }
            if ("file" == e[i].type) {
                if (regPattFile.test(e[i].files[0].name)) {
                    (e[i].style.border = ""), e[i].parentElement.classList.remove("error8", "error3"), t++;
                    continue;
                }
                e[i].parentElement.classList.add("error8");
                continue;
            }
            if ("deploy" == e[i].className) {
                if (regPattClient.test(e[i].value)) {
                    (e[i].style.border = "1px solid red"), e[i].parentElement.classList.add("error1");
                    continue;
                }
                (e[i].style.border = ""), e[i].parentElement.classList.remove("error1", "error3"), t++;
                continue;
            }
            if (["daily_rate", "allowance"].includes(e[i].className)) {
                if (regPattNumber.test(e[i].value)) {
                    (e[i].style.border = ""), e[i].parentElement.classList.remove("error10", "error3"), t++;
                    continue;
                }
                (e[i].style.border = "1px solid red"), e[i].parentElement.classList.add("error10");
                continue;
            }
            if ("home_addr" == e[i].className) {
                if (regPattAddr.test(e[i].value)) {
                    (e[i].style.border = "1px solid red"), e[i].parentElement.classList.add("error5");
                    continue;
                }
                (e[i].style.border = ""), e[i].parentElement.classList.remove("error5", "error3"), t++;
                continue;
            }
            if (["sss", "pagibig", "philhealth", "tin"].includes(e[i].className)) {
                if (regPattSocial.test(e[i].value)) {
                    (e[i].style.border = ""), e[i].parentElement.classList.remove("error9", "error3"), t++;
                    continue;
                }
                if ("" == e[i].value || " " == e[i].value) {
                    (e[i].style.border = ""), e[i].parentElement.classList.remove("error9", "error3");
                    continue;
                }
                (e[i].style.border = "1px solid red"), e[i].parentElement.classList.add("error9");
                continue;
            }
            if ("email" == e[i].className) {
                if (regPattEmail.test(e[i].value)) {
                    (e[i].style.border = ""), e[i].parentElement.classList.remove("error6", "error3"), t++;
                    continue;
                }
                (e[i].style.border = "1px solid red"), e[i].parentElement.classList.add("error6");
                continue;
            }
            if ("date" == e[i].type) {
                if (regPatt.test(e[i].value.replace(/-/g, ""))) {
                    (e[i].style.border = "1px solid red"), e[i].parentElement.classList.add("error1");
                    continue;
                }
                (e[i].style.border = ""), e[i].parentElement.classList.remove("error1", "error3"), t++;
                continue;
            }
            if (regPatt.test(e[i].value)) {
                (e[i].style.border = "1px solid red"), e[i].parentElement.classList.add("error1");
                continue;
            }
            (e[i].style.border = ""), e[i].parentElement.classList.remove("error1", "error2", "error3", "error4", "error5", "error6", "error7"), t++;
        } else if ("file" != e[i].type || "" != e[i].value) (e[i].style.border = "1px solid red"), e[i].parentElement.classList.add("error3");
        else {
            t++;
            var n = 1;
            (e[i].style.border = ""), e[i].parentElement.classList.remove("error3", "error1");
        }
    if ((t < e.length && ((modal2.style.display = "flex"), (mBox.style.display = "flex"), messageBox(2, "Please check the errors!")), t == e.length)) {
        var s = document.querySelector("#uploadpic").files[0],
            r = new FormData();
        for (i = 0; i < allPersonal.length - 1; i++) r.append(allPersonal[i].name, allPersonal[i].value);
        r.append("submit", "submit"), 1 == n ? r.append("uploadpic", "") : r.append("uploadpic", s);
        var l = new XMLHttpRequest();
        (l.onreadystatechange = function () {
            if (4 == this.readyState && 200 == this.status) {
                var e = JSON.parse(this.responseText);
                if ("error" in e) {
					messageBox(2, e.error);
				}
                else if ("success" in e) {
                    empViewFunc(allPersonal[7].value), (document.getElementById("newempform").style.display = "none"), messageBox(1, e.success), fetch_all(current);
                } else messageBox(2, "Oooops, check the console!");
            }
        }),
            l.open("POST", "updateemp.php", !0),
            l.send(r);
    }
}
function newClient() {
    var e = 0;
    if (
        ("" != newClientInput.value
            ? regPattClient.test(newClientInput.value)
                ? ((newClientInput.style.border = "1px solid red"), newClientInput.parentElement.classList.add("error1alt"), console.log(newClientInput.className + " Error!"))
                : ((newClientInput.style.border = ""), newClientInput.parentElement.classList.remove("error1alt", "error2alt", "error3alt", "error4alt", "error5alt", "error6alt", "error7alt"), e++)
            : ((newClientInput.style.border = "1px solid red"), newClientInput.parentElement.classList.add("error3alt")),
        e < 1 && ((modal2.style.display = "flex"), (mBox.style.display = "flex"), messageBox(2, "Please Check the Error!")),
        1 == e)
    ) {
        (modal2.style.display = "flex"), (mBox.style.display = "flex");
        var t = new FormData();
        t.append("newClient", newClientInput.value), t.append("submit", "submit");
        var n = new XMLHttpRequest();
        (n.onreadystatechange = function () {
            if (4 == this.readyState && 200 == this.status) {
                var e = JSON.parse(this.responseText);
                "error" in e
                    ? messageBox(2, e.error)
                    : "success" in e
                    ? (messageBox(1, e.success),
                      "No Clients Listed" == ClientList.innerText
                          ? (ClientList.innerHTML = '<div class="client_buttons" id="client_buttons" data-client-id="' + e.id + '">' + newClientInput.value + '<span><i class="fas fa-times" id="delClient"></i></span></div> ')
                          : (ClientList.innerHTML += '<div class="client_buttons" id="client_buttons" data-client-id="' + e.id + '">' + newClientInput.value + '<span><i class="fas fa-times" id="delClient"></i></span></div> '),
                      (newJobInput.value = ""),
                      delClients())
                    : messageBox(2, "Oooops, check the console!");
            }
        }),
            n.open("POST", "newclient.php", !0),
            n.send(t);
    }
}
closer(),
    newEmpBtn.addEventListener("click", function () {
		var e = document.getElementById("personalSubmit");
		var f = document.getElementById("updateSubmit");
		document.querySelector(".emp_id").removeAttribute("readonly");
		f.style.display = "none";
        (modal.style.display = "flex"),
            (newempform.style.display = "block"),
            (document.getElementById("empform_title").innerHTML = '<i class="fas fa-user-plus"></i>New Employee<span><i class="fas fa-times" id="close"></i></span>'),
            (e.style.display = "block"),
			(f.style.display = "none"),
            document.querySelector(".box_new_emp .section_title").scrollIntoView();
			
        var e = document.querySelectorAll("#close");
        for (x of e)
            x.addEventListener("click", function () {
                for (this.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "none", this.parentElement.parentElement.parentElement.parentElement.style.display = "none", i = 0; i < allPersonal.length; i++)
                    allPersonal[i].value = "";
                (newJobInput.value = ""), (newClientInput.value = ""), closer();
            });
    }),
    newJobBtn.addEventListener("click", function () {
        closer(), (modal.style.display = "flex"), (newjobform.style.display = "block");
    }),
    newClientBtn.addEventListener("click", function () {
        closer(), (modal.style.display = "flex"), (newclientform.style.display = "block");
    });
var delCliBtn = document.querySelectorAll("#delClient"),
    delJobBtn = document.querySelectorAll("#delJob");
function delClients() {
    var e = document.querySelectorAll("#delClient");
    for (i = 0; i < e.length; i++) {
        let t = e[i].parentElement.parentElement,
            n = e[i].parentElement.parentElement.dataset.clientId;
        e[i].addEventListener("click", function () {
            var e = new FormData();
            e.append("ClientId", n), e.append("submit", "submit");
            var i = new XMLHttpRequest();
            (i.onreadystatechange = function () {
                if (4 == this.readyState && 200 == this.status) {
                    var e = JSON.parse(this.responseText);
                    "error" in e ? messageBox(2, e.error) : "success" in e ? (messageBox(1, e.success), t.remove()) : messageBox(2, "Oooops, check the console!");
                }
            }),
                i.open("POST", "delclient.php", !0),
                i.send(e);
        });
    }
}
function delEmps(e) {
    var t = new FormData();
    t.append("EmpID", e), t.append("submit", "submit");
    var n = new XMLHttpRequest();
    (n.onreadystatechange = function () {
        if (4 == this.readyState && 200 == this.status) {
            var e = JSON.parse(this.responseText);
            if ("error" in e) {
				messageBox(2, e.error);
			}
			
            else if ("success" in e) {
                messageBox(1, e.success), fetch_all(current), (document.getElementById("showEmp").style.display = "none"), (modal.style.display = "none");
            } else messageBox(2, "Oooops, check the console!");
        }
    }),
        n.open("POST", "delemp.php", !0),
        n.send(t);
}
function delJobs() {
    var e = document.querySelectorAll("#delJob");
    for (i = 0; i < e.length; i++) {
        let t = e[i].parentElement.parentElement,
            n = e[i].parentElement.parentElement.dataset.jobId;
        e[i].addEventListener("click", function () {
            var e = new FormData();
            e.append("JobId", n), e.append("submit", "submit");
            var i = new XMLHttpRequest();
            (i.onreadystatechange = function () {
                if (4 == this.readyState && 200 == this.status) {
                    var e = JSON.parse(this.responseText);
                    "error" in e ? messageBox(2, e.error) : "success" in e ? (messageBox(1, e.success), t.remove()) : messageBox(2, "Oooops, check the console!");
                }
            }),
                i.open("POST", "deljob.php", !0),
                i.send(e);
        });
    }
}
delClients(), delJobs();
var empTable = document.getElementById("emp_table");
function fetch_all(e) {
    var t = new FormData(),
        n = e;
    t.append("submit", "submit");
    var s = new XMLHttpRequest();
    (s.onreadystatechange = function () {
        if (4 == this.readyState && 200 == this.status) {
            var e = JSON.parse(this.responseText);
            if ("error" in e) {
				"No Employees Found!" == e.error && (tblNext.setAttribute("disabled", !0), 
				tblPrev.setAttribute("disabled", !0)), 
				messageBox(2, e.error);
			}
            else if ("success" in e) {
                empTable.innerHTML = "";
                var t = JSON.parse(e.success),
                    s = document.querySelectorAll(".search input, .search select"),
                    r = {};
                for ("" != s[0].value && (r[s[1].value] = s[0].value), i = 2; i < s.length; i++) "All" != s[i].value && "" != s[i].value && (r[s[i].name] = s[i].value);
                var l = r,
                    o = t;
                if (
                    searchClick > 0 &&
                    !(function () {
                        var e = 0;
                        for (x of s) "searchBy" != x.name && (("" != x.value && "All" != x.value) || e++);
                        return e == s.length - 1;
                    })() &&
                    0 != Object.keys(r).length
                ) {
                    var d = [];
                    for (i = 0; i < o.length; i++) {
                        var c = 0;
                        for (a = 0; a < Object.keys(l).length; a++) o[i][Object.keys(l)[a]].toLowerCase().includes(l[Object.keys(l)[a]].toLowerCase()) && c++;
                        c != Object.keys(l).length || d.push(o[i]);
                    }
                    if (d.length > n + 5 && n - 5 < 0) {
                        var m = n + 5;
                        for (tblNext.removeAttribute("disabled"), tblPrev.setAttribute("disabled", !0), i = n; i < m; i++)
                            empTable.innerHTML +=
                                '<tr data-empID="' +
                                d[i].EmpID +
                                '"><td><p class="' +
                                d[i].Status.toLowerCase() +
                                '">' +
                                d[i].Status +
                                "</p></td><td>" +
                                d[i].EmpID +
                                "</td><td>" +
                                d[i].LastName +
                                ", " +
                                d[i].FirstName +
                                " " +
                                d[i].MidName +
                                "</td><td>" +
                                d[i].JobTitle +
                                "</td><td>" +
                                d[i].ContractType +
                                "</td><td>" +
                                d[i].DateStart +
                                '</td><td class="option_cell"><i class="far fa-edit" id="emp_edit"></i><i class="far fa-trash-alt" id="emp_del"></i><i class="fas fa-external-link-alt" id="emp_view"></i></td></tr>';
                    } else if (d.length > n + 5 && n - 5 >= 0) {
                        m = n + 5;
                        for (tblPrev.removeAttribute("disabled"), tblNext.removeAttribute("disabled"), i = n; i < n + 5; i++)
                            empTable.innerHTML +=
                                '<tr data-empID="' +
                                d[i].EmpID +
                                '"><td><p class="' +
                                d[i].Status.toLowerCase() +
                                '">' +
                                d[i].Status +
                                "</p></td><td>" +
                                d[i].EmpID +
                                "</td><td>" +
                                d[i].LastName +
                                ", " +
                                d[i].FirstName +
                                " " +
                                d[i].MidName +
                                "</td><td>" +
                                d[i].JobTitle +
                                "</td><td>" +
                                d[i].ContractType +
                                "</td><td>" +
                                d[i].DateStart +
                                '</td><td class="option_cell"><i class="far fa-edit" id="emp_edit"></i><i class="far fa-trash-alt" id="emp_del"></i><i class="fas fa-external-link-alt" id="emp_view"></i></td></tr>';
                    } else if (n - 5 >= 0 && n + 5 >= d.length) {
                        m = d.length;
                        for (tblNext.setAttribute("disabled", !0), tblPrev.removeAttribute("disabled"), i = n; i < d.length; i++)
                            empTable.innerHTML +=
                                '<tr data-empID="' +
                                d[i].EmpID +
                                '"><td><p class="' +
                                d[i].Status.toLowerCase() +
                                '">' +
                                d[i].Status +
                                "</p></td><td>" +
                                d[i].EmpID +
                                "</td><td>" +
                                d[i].LastName +
                                ", " +
                                d[i].FirstName +
                                " " +
                                d[i].MidName +
                                "</td><td>" +
                                d[i].JobTitle +
                                "</td><td>" +
                                d[i].ContractType +
                                "</td><td>" +
                                d[i].DateStart +
                                '</td><td class="option_cell"><i class="far fa-edit" id="emp_edit"></i><i class="far fa-trash-alt" id="emp_del"></i><i class="fas fa-external-link-alt" id="emp_view"></i></td></tr>';
                    } else {
                        m = d.length;
                        for (tblNext.setAttribute("disabled", !0), tblPrev.setAttribute("disabled", !0), i = n; i < d.length; i++)
                            empTable.innerHTML +=
                                '<tr data-empID="' +
                                d[i].EmpID +
                                '"><td><p class="' +
                                d[i].Status.toLowerCase() +
                                '">' +
                                d[i].Status +
                                "</p></td><td>" +
                                d[i].EmpID +
                                "</td><td>" +
                                d[i].LastName +
                                ", " +
                                d[i].FirstName +
                                " " +
                                d[i].MidName +
                                "</td><td>" +
                                d[i].JobTitle +
                                "</td><td>" +
                                d[i].ContractType +
                                "</td><td>" +
                                d[i].DateStart +
                                '</td><td class="option_cell"><i class="far fa-edit" id="emp_edit"></i><i class="far fa-trash-alt" id="emp_del"></i><i class="fas fa-external-link-alt" id="emp_view"></i></td></tr>';
                    }
                    var p = document.getElementById("min_count"),
                        u = document.getElementById("total_count");
                    0 == d.length
                        ? (messageBox(3, "Ooops, No Results Found!"),
                          (empTable.innerHTML += '<tr><td colspan="7" style="text-align: center; color: red; font-weight: bold;"><p>No Employees Found!</p></td></tr>'),
                          (p.innerText = d.length),
                          (u.innerText = d.length))
                        : ((p.innerText = n + 1 + " - " + m), (u.innerText = d.length));
                } else {
                    if (t.length > n + 5 && n - 5 < 0) {
                        m = n + 5;
                        for (tblNext.removeAttribute("disabled"), tblPrev.setAttribute("disabled", !0), i = n; i < m; i++)
                            empTable.innerHTML +=
                                '<tr data-empID="' +
                                t[i].EmpID +
                                '"><td><p class="' +
                                t[i].Status.toLowerCase() +
                                '">' +
                                t[i].Status +
                                "</p></td><td>" +
                                t[i].EmpID +
                                "</td><td>" +
                                t[i].LastName +
                                ", " +
                                t[i].FirstName +
                                " " +
                                t[i].MidName +
                                "</td><td>" +
                                t[i].JobTitle +
                                "</td><td>" +
                                t[i].ContractType +
                                "</td><td>" +
                                t[i].DateStart +
                                '</td><td class="option_cell"><i class="far fa-edit" id="emp_edit"></i><i class="far fa-trash-alt" id="emp_del"></i><i class="fas fa-external-link-alt" id="emp_view"></i></td></tr>';
                    } else if (t.length > n + 5 && n - 5 >= 0) {
                        m = n + 5;
                        for (tblPrev.removeAttribute("disabled"), tblNext.removeAttribute("disabled"), i = n; i < n + 5; i++)
                            empTable.innerHTML +=
                                '<tr data-empID="' +
                                t[i].EmpID +
                                '"><td><p class="' +
                                t[i].Status.toLowerCase() +
                                '">' +
                                t[i].Status +
                                "</p></td><td>" +
                                t[i].EmpID +
                                "</td><td>" +
                                t[i].LastName +
                                ", " +
                                t[i].FirstName +
                                " " +
                                t[i].MidName +
                                "</td><td>" +
                                t[i].JobTitle +
                                "</td><td>" +
                                t[i].ContractType +
                                "</td><td>" +
                                t[i].DateStart +
                                '</td><td class="option_cell"><i class="far fa-edit" id="emp_edit"></i><i class="far fa-trash-alt" id="emp_del"></i><i class="fas fa-external-link-alt" id="emp_view"></i></td></tr>';
                    } else if (n - 5 >= 0 && n + 5 >= t.length) {
                        m = t.length;
                        for (tblNext.setAttribute("disabled", !0), tblPrev.removeAttribute("disabled"), i = n; i < t.length; i++)
                            empTable.innerHTML +=
                                '<tr data-empID="' +
                                t[i].EmpID +
                                '"><td><p class="' +
                                t[i].Status.toLowerCase() +
                                '">' +
                                t[i].Status +
                                "</p></td><td>" +
                                t[i].EmpID +
                                "</td><td>" +
                                t[i].LastName +
                                ", " +
                                t[i].FirstName +
                                " " +
                                t[i].MidName +
                                "</td><td>" +
                                t[i].JobTitle +
                                "</td><td>" +
                                t[i].ContractType +
                                "</td><td>" +
                                t[i].DateStart +
                                '</td><td class="option_cell"><i class="far fa-edit" id="emp_edit"></i><i class="far fa-trash-alt" id="emp_del"></i><i class="fas fa-external-link-alt" id="emp_view"></i></td></tr>';
                    } else {
                        m = t.length;
                        for (tblNext.setAttribute("disabled", !0), tblPrev.setAttribute("disabled", !0), i = n; i < t.length; i++)
                            empTable.innerHTML +=
                                '<tr data-empID="' +
                                t[i].EmpID +
                                '"><td><p class="' +
                                t[i].Status.toLowerCase() +
                                '">' +
                                t[i].Status +
                                "</p></td><td>" +
                                t[i].EmpID +
                                "</td><td>" +
                                t[i].LastName +
                                ", " +
                                t[i].FirstName +
                                " " +
                                t[i].MidName +
                                "</td><td>" +
                                t[i].JobTitle +
                                "</td><td>" +
                                t[i].ContractType +
                                "</td><td>" +
                                t[i].DateStart +
                                '</td><td class="option_cell"><i class="far fa-edit" id="emp_edit"></i><i class="far fa-trash-alt" id="emp_del"></i><i class="fas fa-external-link-alt" id="emp_view"></i></td></tr>';
                    }
                    (p = document.getElementById("min_count")), (u = document.getElementById("total_count"));
                    0 == t.length
                        ? (messageBox(3, "Ooops, No Results Found!"),
                          (empTable.innerHTML += '<tr><td colspan="7" style="text-align: center; color: red; font-weight: bold;"><p>No Employees Found!</p></td></tr>'),
                          (p.innerText = t.length),
                          (u.innerText = t.length))
                        : ((p.innerText = n + 1 + " - " + m), (u.innerText = t.length));
                }
                var b = document.querySelectorAll("#emp_edit"),
                    f = document.querySelectorAll("#emp_del"),
                    y = document.querySelectorAll("#emp_view");
                document.getElementById("empform_title");
                for (i = 0; i < b.length; i++)
                    b[i].addEventListener("click", function () {
                        updateEmp(this.parentElement.parentElement.dataset.empid);
                    });
                for (i = 0; i < f.length; i++)
                    f[i].addEventListener("click", function () {
                        let e = this.parentElement.parentElement.dataset.empid;
                        promptBox(2, "Delete " + e, function () {
                            delEmps(e);
                        });
                    });
                for (i = 0; i < y.length; i++)
                    y[i].addEventListener("click", function () {
                        empViewFunc(this.parentElement.parentElement.dataset.empid);
                    });
            } else messageBox(2, "Oooops, check the console!");
        }
    }),
        s.open("POST", "showall.php", !0),
        s.send(t);
}
var current = 0;
function updateEmp(e) {
    closer();
    var t = document.getElementById("empform_title"),
        n = new FormData();
    n.append("EmpID", e), n.append("submit", "submit");
    var s = new XMLHttpRequest();
    (s.onreadystatechange = function () {
        if (4 == this.readyState && 200 == this.status) {
            var e = JSON.parse(this.responseText);
            if ("error" in e) {
				
			}
            else if ("success" in e) {
                let s = JSON.parse(e.success);
                for (i = 0; i < allPersonal.length - 1; i++)
                    if (8 == i || 9 == i) {
                        let e = [];
                        for (v = 0; v < allPersonal[i].options.length; v++) e.push(allPersonal[i].options[v].value);
                        e.includes(s[allPersonal[i].dataset.tbname])
                            ? (allPersonal[i].value = s[allPersonal[i].dataset.tbname])
                            : ((allPersonal[i].innerHTML += '<option value="' + s[allPersonal[i].dataset.tbname] + '">' + s[allPersonal[i].dataset.tbname] + "</option>"), (allPersonal[i].value = s[allPersonal[i].dataset.tbname]));
                    } else allPersonal[i].value = s[allPersonal[i].dataset.tbname];
                for (i = 0; i < allPersonal.length - 1; i++)
                    (allPersonal[i].style.border = ""), allPersonal[i].parentElement.classList.remove("error1", "error2", "error3", "error4", "error5", "error6", "error7", "error8", "error9", "error10");
                (allPersonal[allPersonal.length - 1].style.border = ""),
                    allPersonal[allPersonal.length - 1].parentElement.classList.remove("error1", "error2", "error3", "error4", "error5", "error6", "error7", "error8", "error9", "error10"),
					allPersonal[allPersonal.length - 1].value = "";
                    (t.innerHTML = '<i class="fas fa-user-plus"></i>Update Employee Information<span><i class="fas fa-times" id="close"></i></span>');
                var n = document.getElementById("personalSubmit");
				var f = document.getElementById("updateSubmit");
                document.querySelector(".emp_id").setAttribute("readonly", !0),
                    (f.style.display = "block"),
					(n.style.display = "none"),
                    (modal.style.display = "flex"),
                    (newempform.style.display = "block"),
                    document.querySelector(".section_title").scrollIntoView();
                    closer();
            }
        }
    }),
        s.open("POST", "fetchemp.php", !0),
        s.send(n);
}
function empViewFunc(e) {
    (modal2.style.display = "none"), (mBox.style.display = "none");
    var t = document.getElementById("showEmp"),
        n = document.querySelectorAll("#showEmp td.info"),
        s = document.querySelector("#emp_box1 h1"),
        r = document.getElementById("emp_box1"),
        l = [
            "EmpID",
            "ContractType",
            "Client",
            "JobTitle",
            "DateStart",
            "DailyRate",
            "Allowance",
            "LastName",
            "FirstName",
            "MidName",
            "Gender",
            "Birthday",
            "Nationality",
            "MaritalStatus",
            "Address",
            "MobileNumber",
            "Email",
            "SSS",
            "PAGIBIG",
            "PHILHEALTH",
            "TIN",
        ],
        a = new FormData();
    a.append("EmpID", e), a.append("submit", "submit");
    var o = new XMLHttpRequest();
    (o.onreadystatechange = function () {
        if (4 == this.readyState && 200 == this.status) {
            var e = JSON.parse(this.responseText);
            if ("error" in e) {
				
			}
            else if ("success" in e) {
                let a = JSON.parse(e.success);
                for (
                    document.getElementById("emp_img_frame").style.backgroundImage = "url('./" + a.Image + "')",
                        s.innerHTML = '<span><p class="' + a.Status.toLowerCase() + '">' + a.Status + "</p></span>" + a.LastName + ", " + a.FirstName + " " + a.MidName,
                        i = 0;
                    i < n.length;
                    i++
                )
                    4 == i ? (n[i].innerHTML = a[l[i]] + " — " + a.DateEnd) : 5 == i ? (n[i].innerHTML = (30 * a[l[i]]).toFixed(2)) : (n[i].innerHTML = a[l[i]]);
                (modal.style.display = "flex"), (t.style.display = "block"), r.scrollIntoView(), showEmpBtns(a.EmpID), closer();
            }
        }
    }),
        o.open("POST", "fetchemp.php", !0),
        o.send(a);
}
function showEmpBtns(e) {
    document.getElementById("updatebtn"), document.getElementById("delbtn");
    updatebtn.addEventListener("click", function () {
		updateEmp(e), (document.getElementById("showEmp").style.display = "none");
    }),
        delbtn.addEventListener("click", function () {
            promptBox(2, "Delete " + e, function () {
                delEmps(e);
            });
        });
}
fetch_all(current),
    tblNext.addEventListener("click", function () {
        fetch_all((current += 5));
    }),
    tblPrev.addEventListener("click", function () {
        fetch_all((current -= 5));
    });

	var searchClick = 0,
    printBtn = document.getElementById("printbtn");
	
printBtn.addEventListener("click", function () {
    $(".box_show_emp").printThis({ base: !1, loadCSS: "css/print.css" });
}),
    searchSubmit.addEventListener("click", function () {
        searchClick++, fetch_all((current = 0));
    }),
    newClientSubmit.addEventListener("click", function () {
        newClient();
    }),
    newJobSubmit.addEventListener("click", function () {
        newJob();
    }),
    logOutBtn.addEventListener("click", function () {
        window.location = "./logout.php";
    });
