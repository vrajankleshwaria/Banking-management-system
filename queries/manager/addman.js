exports.addman = function(id,pwd,callback){
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

    var myquery = "INSERT INTO `manager` (`Mang_id`, `Password`) VALUES ('"+id+"', '"+pwd+"')"; 

    connection.query(myquery, (error,result) => {
        if(error){
            console.log("man. fail")
            return callback(false)
        } else {
            console.log("man. pass")
            return callback(result);
        }
    })
}