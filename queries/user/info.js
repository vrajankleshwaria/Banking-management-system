exports.personalInfo = function(accno,callback){
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
    var myquery = "SELECT * from `customer` WHERE Acc_no='"+accno+"'";
    connection.query(myquery, (error,result) => {
        if(error){
            console.log('Pinfo failed')
            return callback(false)
        } else {
            console.table('Pinfo fetched');
            return callback(result);
        }
    })
} 