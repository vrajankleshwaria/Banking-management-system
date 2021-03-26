exports.login = function(id,pwd,callback){
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
    var myquery = "SELECT * FROM `employee` WHERE Employee_id='" +id+"'AND Password ='"+pwd+"'";
    
    connection.query(myquery, (error,result) => {
        if(error)
        {
            console.log('Query failed')
            return callback(false)
        } 
        else 
        {
            console.table(result);
            return callback(result);
        }
    })
}