exports.login = function(accno,pwd,callback){
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
    var myquery = "SELECT * FROM `customer` WHERE Acc_no='" +accno+"'AND `Password` ='"+pwd+"'";
    connection.query(myquery, (error,result) => {
        if(error || result.length == 0)
        {
            console.log('Query failed');
            return callback(false)
        } else 
        {
            var finalquery = "SELECT * FROM `customer` NATURAL JOIN `branch` NATURAL JOIN `account` WHERE Acc_no='"+accno+"'";
            connection.query(finalquery,(error,result) => {
                if(error)
                {
                    return callback(false)
                }
                else
                {
                    console.log("successful login")
                    console.table(result)
                    return callback(result)
                }
            })
        }
    })
}