exports.addemp = function(fname,lname,dob,gender,id,pwd,address,callback){
    const mysql = require("mysql")
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'BankingDB'
    });
    connection.connect(function(error,errconnect){
        if(!!error){
            console.log('Eror in Connecting to database');
            errconnect.release();
            return callback(false);
        } else {
            console.log('Database Connected');
        }
    });
    var myquery = "INSERT INTO `employee` (`First_name`, `Last_name`, `Date_of_birth`, `Gender`,`Employee_id`, `Password`, `Address`) VALUES ('"+fname+"','"+lname+"','"+dob+"','"+gender+"','"+id+"','"+pwd+"','"+address+"')"
     
    connection.query(myquery, (error,result) => {
        if(error){
            console.log('Query failed')
            return callback(false)
        } else {
            console.table(result);
            return callback(result);
        }
    })
}