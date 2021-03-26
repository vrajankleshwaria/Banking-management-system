exports.su = function(fn,ln,dob,addr,pwd,gender,branch,aadhar,acctype,interest,callback){
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


    var myquery = "INSERT INTO `customer` (`First_name`, `Last_name`, `Date_of_birth`, `Gender`, `Password`, `Address`, `Branch_Code`, `Aadhar`) VALUES ('"+fn+"','"+ln+"','"+dob+"','"+gender+"','"+pwd+"','"+addr+"','"+branch+"','"+aadhar+"')"
    connection.query(myquery, (error,result) => {
        if(error){
            console.log('signup failed')
            return callback(false)
        } else {
            console.table('signup done');
            
            myquery = "INSERT INTO `account`( `Acc_type`, `Interest`) VALUES ('"+acctype+"','"+interest+"')"
            connection.query(myquery, (error,result) => {
                if(error){
                    console.log('signup in acc table failed')
                    return callback(false)
                } else {
                    console.table('signup in acc table done');
                    return callback(result);
                }
            })
        }
    })

}