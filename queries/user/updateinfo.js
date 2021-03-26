exports.update = function(accno,fn,ln,addr,dob,aadhar,callback){
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

    var myquery = "UPDATE `customer` SET First_name='"+fn+"',Last_name='"+ln+"',Date_of_birth='"+dob+"',Address='"+addr+"',Aadhar='"+aadhar+"' WHERE Acc_no = '"+accno+"'" 

    connection.query(myquery , (error , result) => {
        if(error)
        {
            console.log("Update fail")
            return callback(false)
        }
        else
        {
            console.log("Update Done")
            return callback(result)
        }
    })
}