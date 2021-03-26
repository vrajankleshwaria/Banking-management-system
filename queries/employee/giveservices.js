exports.gs = function(accno,pwd,amt,callback){
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

    var myquery = "SELECT * FROM `customer` NATURAL JOIN `account` WHERE Acc_no='" +accno+"'AND `Password` ='"+pwd+"'";
    connection.query(myquery , (error,result) => {
        if (error || result.length==0) 
        {
            console.log("false un / pwd")
            return callback(false)
        }
        else
        {
            var user=result[0]
            console.log(user)
            var bal=parseInt(user["Balance"])+parseInt(amt)
            if (bal<0)
            {
                console.log("Abe salle , balance nahi hai")
                return callback(false)
            }
            else
            {
                var anquery="UPDATE `account` SET `Balance` = '"+bal+"' WHERE `Acc_no` = '"+accno +"'";
                connection.query(anquery , (error,result) => {
                    if (error) 
                    {
                        return callback(false)
                    }
                    else
                    {
                        console.log("Balance updated")
                        return callback(result)
                    }
                })
            }
        }
    })
}