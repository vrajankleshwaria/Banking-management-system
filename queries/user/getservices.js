exports.gs = function(service,amt,accno,callback){
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

    var myquery = "INSERT INTO `services` (`Type`, `Amount`, `Acc_no`) VALUES ('"+service+"','"+amt+"','"+accno+"')"
    connection.query(myquery, (error,result) => {
        if(error){
            console.log('service failed')
            return callback(false)
        } else {
            console.table('service placed');
            return callback(result);
        }
    })

}