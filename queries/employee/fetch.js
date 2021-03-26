exports.fetchrec = function(a1nm,a1vl,a2nm,a2vl,a3nm,a3vl,a4nm,a4vl,a5nm,a5vl,callback){
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
    var myquery = "SELECT * FROM `Customer`";
    var first=true;
    if(a1nm==="" && a2vl===""){
        console.log("First entry null");
    }
    else{
        if(first==true){
            first=false;
            myquery+=" WHERE "+a1nm+' = "'+a1vl+'"';
        }
        else{
            myquery+=" AND "+a1nm+' = "'+a1vl+'"';
        }
    }
    if(a2nm==="" && a2vl===""){
        console.log("Second entry null");
    }
    else{
        if(first==true){first=false;myquery+=" WHERE "+a2nm+' = "'+a2vl+'"';}
        else{myquery+=" AND "+a2nm+' = "'+a2vl+'"';}
    }
    if(a3nm==="" && a3vl===""){
        console.log("Third entry null");
    }
    else{
        if(first==true){first=false;myquery+=" WHERE "+a3nm+' = "'+a3vl+'"';}
        else{myquery+=" AND "+a3nm+' = "'+a3vl+'"';}
    }
    if(a4nm==="" && a4vl===""){
        console.log("Fourth entry null");
    }
    else{
        if(first==true){first=false;myquery+=" WHERE "+a4nm+' = "'+a4vl+'"';}
        else{myquery+=" AND "+a4nm+' = "'+a4vl+'"';}
    }
    if(a5nm==="" && a5vl===""){
        console.log("Fifth entry null");
    }
    else{
        if(first==true){first=false;myquery+=" WHERE "+a5nm+' = "'+a5vl+'"';}
        else{myquery+=" AND "+a5nm+' = "'+a5vl+'"';}
    }
    myquery+=";";
    console.log("Query:"+myquery);
    // console.log(a1nm+"->"+a1vl);
    // console.log(a2nm+"->"+a2vl);
    // console.log(a3nm+"->"+a3vl);
    // console.log(a4nm+"->"+a4vl);
    // console.log(a5nm+"->"+a5vl);
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