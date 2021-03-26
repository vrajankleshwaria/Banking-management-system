const express = require("express");
const app = express();

const ulogin = require("./queries/user/login");
const uinfo = require("./queries/user/info");
const changepwd = require("./queries/user/changepwd");
const signup = require("./queries/user/signup");
const bdet = require("./queries/user/getBranchDet");
const updateinfo = require("./queries/user/updateinfo");
const getservice = require("./queries/user/getservices");
const giveservices = require("./queries/employee/giveservices");

// user

var user = undefined;
app.set("view-engine", "ejs");

//middleware
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/user/signup", (req, res) => {
  bdet.getDetails((result) => {
    res.render("./user/signup.ejs", { data: { branches: result } });
  });
});

app.post("/user/signup", (req, res) => {
  var fn = req.body.fname;
  var ln = req.body.lname;
  var dob = req.body.dob;
  var addr = req.body.addr;
  var pwd = req.body.pwd;
  var gender = req.body.genderval;
  var branch = req.body.branchval;
  var acctype = req.body.acctypeval;
  var interest = req.body.interest;
  var aadhar = req.body.aadhar;
  console.log(fn, ln, dob, pwd, addr, gender, branch, acctype, interest);
  signup.su(
    fn,
    ln,
    dob,
    addr,
    pwd,
    gender,
    branch,
    aadhar,
    acctype,
    interest,
    (result) => {
      if (result == false) {
        console.log("Signup fail");
        res.redirect("/user/signup");
      } else {
        console.log("Signup Successful ");
        res.render("index.ejs");
        //res.redirect("/")
        // res.redirect("/user/signup")
      }
    }
  );
});

app.get("/user/login", (req, res) => {
  user = undefined;
  res.render("./user/login.ejs");
});

app.post("/user/login", (req, res) => {
  var acc = req.body.accno;
  var upwd = req.body.pwd;
  ulogin.login(acc, upwd, (result) => {
    if (result == false) {
      acc = undefined;
      upwd = undefined;

      // <div class="alert alert-danger" >
      // <button type="button" class="close" data-dismiss="alert">&times;</button>
      // <strong> Login Failed</strong>
      // </div>

      // res.render("./user/login.ejs")
      res.redirect("/user/login");
    } else {
      // <div class="alert alert-success" >
      // <button type="button" class="close" data-dismiss="alert">&times;</button>
      // <strong>Successful Login !</strong>
      // </div>

      user = result[0];
      res.redirect("/user/info"); //
    }
  });
});

app.get("/user/logout", (req, res) => {
  user = undefined;
  res.redirect("/");
});

app.get("/user/info", (req, res) => {
  res.render("./user/info.ejs");
});

app.get("/user/pinfo", (req, res) => {
  res.render("./user/pinfo.ejs", { data: { user: user } });
});

app.post("/user/getbankinfo", (req, res) => {
  res.render("./queries/user/getbankinfo.js", { data: { user: user } });
});

app.get("/user/ainfo", (req, res) => {
  res.render("./user/ainfo.ejs", { data: { user: user } });
});

app.get("/user/changepwd", (req, res) => {
  res.render("./user/changepwd.ejs");
});
app.post("/user/changepwd", (req, res) => {
  var newpwd = req.body.pwd;
  var accno = user["Acc_no"];
  changepwd.change(newpwd, accno, (result) => {
    if (result == false) {
      console.log("Error in updating pwd");
    } else {
      console.log("Pwd updated");
      res.redirect("/user/info");
    }
  });
});

app.get("/user/updateinfo", (req, res) => {
  res.render("./user/updateinfo.ejs");
});

app.post("/user/updateinfo", (req, res) => {
  var fn = req.body.fname;
  var ln = req.body.lname;
  var addr = req.body.addr;
  var dob = req.body.dob;
  var aadhar = req.body.aadhar;
  var accno = user["Acc_no"];
  updateinfo.update(accno, fn, ln, addr, dob, aadhar, (result) => {
    if (result == false) {
      console.log("update unsuccessful");
      res.redirect("/user/info");
    } else {
      console.log("update successful");
      res.redirect("/user/info");
    }
  });
});

app.get("/user/services", (req, res) => {
  res.render("./user/services.ejs");
});

app.post("/user/services", (req, res) => {
  var service = req.body.services;
  var amt = req.body.amt;
  var accno = user["Acc_no"];
  getservice.gs(service, amt, accno, (result) => {
    if (result == false) {
      console.log("Service not placed");
      res.redirect("/user/info");
    } else {
      console.log("Service placed");
      res.redirect("/user/info");
    }
  });
});

app.get("/employee/giveservices", (req, res) => {
  console.log("In emp");
  res.render("./employee/giveservices.ejs");
});

app.post("/employee/giveservices", (req, res) => {
  var accno = req.body.accno;
  var pwd = req.body.pwd;
  var amt = req.body.amt;
  console.log(accno, pwd, amt);
  giveservices.gs(accno, pwd, amt, (result) => {
    if (result == false) {
      console.log("no debit/credit");
      res.redirect("/employee/eaccess");
    } else {
      console.log("debit/credit");
      res.redirect("/employee/eaccess");
    }
  });
});

//-----------------------------------------------Kartik Done----------------------------------------------------------

//var

const mlogin = require("./queries/manager/login");
const elogin = require("./queries/employee/login");
const madd = require("./queries/manager/addman");
const eadd = require("./queries/employee/addemp");

// manager

app.get("/manager/login", (req, res) => {
  res.render("./manager/login.ejs");
});

var mid = undefined;
var mpwd = undefined;
var manager = undefined;
app.post("/manager/login", (req, res) => {
  mid = req.body.id;
  mpwd = req.body.pwd;

  mlogin.login(mid, mpwd, (result) => {
    if (result == false) {
      res.render("/manager/login");
    } else {
      manager = result[0];
      res.redirect("/manager/maccess"); //
    }
  });
});

app.get("/manager/maccess", (req, res) => {
  if (manager == undefined) {
    res.redirect("/manager/login");
  } else {
    res.render("./manager/maccess.ejs");
  }
});

app.get("/manager/addman", (req, res) => {
  if (manager == undefined) {
    res.redirect("/manager/login");
  } else {
    res.render("./manager/addman.ejs");
  }
});

app.post("/manager/addman", (req, res) => {
  var id = req.body.id;
  var pwd = req.body.pwd;
  madd.addman(id, pwd, (result) => {
    if (result) {
      res.redirect("/manager/maccess");
    } else {
      res.redirect("/manager/addman");
    }
  });
});

app.get("/manager/logout", (req, res) => {
  manager = undefined;
  res.redirect("/");
});

//----------------------------------------------------------------------------------------------

const minp = require("./queries/manager/fetch");

// ahiya j nai aavtu
app.get("/manager/getinputfake", (req, res) => {
  console.log("INside manager , app.get");
  if (manager == undefined) {
    res.redirect("/manager/login");
  } else {
    res.render("./manager/getinput.ejs");
  }
});

app.post("/manager/getinput", (req, res) => {
  var a1nm = req.body.val1;
  console.log("INside manager , app.post");
  var a1vl = req.body.inpval1;
  var a2nm = req.body.val2;
  var a2vl = req.body.inpval2;
  var a3nm = req.body.val3;
  var a3vl = req.body.inpval3;
  var a4nm = req.body.val4;
  var a4vl = req.body.inpval4;
  var a5nm = req.body.val5;
  var a5vl = req.body.inpval5;
  console.log(a1nm + "->" + a1vl);
  console.log(a2nm + "->" + a2vl);
  console.log(a3nm + "->" + a3vl);
  console.log(a4nm + "->" + a4vl);
  console.log(a5nm + "->" + a5vl);
  minp.fetchrec(
    a1nm,
    a1vl,
    a2nm,
    a2vl,
    a3nm,
    a3vl,
    a4nm,
    a4vl,
    a5nm,
    a5vl,
    (result) => {
      if (result) {
        res.render("./manager/showtable.ejs", { Entries: result });
      } else {
        res.redirect("/manager/getinput");
      }
    }
  );
});

//employee

app.get("/employee/login", (req, res) => {
  res.render("./employee/login.ejs");
});

var eid = undefined;
var epwd = undefined;
var employee = undefined;
app.post("/employee/login", (req, res) => {
  eid = req.body.id;
  epwd = req.body.pwd;

  elogin.login(eid, epwd, (result) => {
    if (result == false) {
      res.redirect("/employee/login");
    } else {
      employee = result[0];
      res.render("./employee/eaccess.ejs");
    }
  });
});

app.get("/employee/eaccess", (req, res) => {
  if (employee == undefined) {
    res.redirect("/employee/login");
  } else {
    res.render("./employee/eaccess.ejs"); //,{data:{"admin_details":current_admin}});
  }
});

app.get("/employee/addemp", (req, res) => {
  res.render("./employee/addemp.ejs");
});

app.post("/employee/addemp", (req, res) => {
  var fname = req.body.fname;
  var lname = req.body.lname;

  var gender = req.body.gender;
  var id = req.body.id;
  var pwd = req.body.pwd;
  var address = req.body.address;
  eadd.addemp(
    fname,
    lname,
    req.body.dob,
    gender,
    id,
    pwd,
    address,
    (result) => {
      if (result) {
        res.redirect("/employee/eaccess");
      } else {
        res.redirect("/employee/addemp");
      }
    }
  );
});

app.get("/employee/logout", (req, res) => {
  employee = undefined;
  res.redirect("/");
});

const ninp = require("./queries/employee/fetch");

app.get("/employee/getinput", (req, res) => {
  if (employee == undefined) {
    res.redirect("/employee/login");
  } else {
    res.render("./employee/getinput.ejs");
  }
});

app.post("/employee/getinput", (req, res) => {
  var a1nm = req.body.val1;
  var a1vl = req.body.inpval1;
  var a2nm = req.body.val2;
  var a2vl = req.body.inpval2;
  var a3nm = req.body.val3;
  var a3vl = req.body.inpval3;
  var a4nm = req.body.val4;
  var a4vl = req.body.inpval4;
  var a5nm = req.body.val5;
  var a5vl = req.body.inpval5;
  console.log(a1nm + "->" + a1vl);
  console.log(a2nm + "->" + a2vl);
  console.log(a3nm + "->" + a3vl);
  console.log(a4nm + "->" + a4vl);
  console.log(a5nm + "->" + a5vl);
  ninp.fetchrec(
    a1nm,
    a1vl,
    a2nm,
    a2vl,
    a3nm,
    a3vl,
    a4nm,
    a4vl,
    a5nm,
    a5vl,
    (result) => {
      if (result) {
        res.render("./employee/showtable.ejs", { Entries: result });
      } else {
        res.redirect("/employee/getinput");
      }
    }
  );
});

app.listen(3000);
