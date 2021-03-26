exports.change = function(newpwd,accno,callback){
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

    var myquery = "UPDATE `customer` SET Password = '"+newpwd+"' WHERE Acc_no = '"+accno+"'";
    connection.query(myquery , (error , result) => {
        if(error) 
        {
            return callback(false)
        }
        else
        {
            return callback(result)
        }
    })

}