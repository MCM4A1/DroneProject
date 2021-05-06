let mysql = require('mysql');
let cryptoJS = require("crypto-js");
let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'almafa',
    database: 'drone_adatbazis'
});
connection.connect(function(err) {
    if (err) throw err;
  });

exports.getIndex = (req, res) => {
    res.render('index.pug');
}

exports.sendData = async (req,res) =>{
    try {
        let droneDataObjects = []
        let dataObj = "“pitch:%d;roll:%d;yaw:%d;vgx:%d;vgy%d;vgz:%d;templ:%d;temph:%d;tof:%d;h:%d;bat:%d;baro:%.2f; time:%d;agx:%.2f;agy:%.2f;agz:%.2f;".split(";")
        console.table(dataObj)

        for(let i=0; i<Math.floor(Math.random()*10); i++)
            droneDataObjects.push(dataObj)


    return res.status(200).send({type: "success", droneDataObjects });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }

}

//Crypto js
//cryptoJS.MD5(password) to convert
//(md5Hash.toString()) convert MD5 to string

exports.loginHandler = async (req,res) =>{
    const {user} = req.body;
        let ifSuccess = false; 
        let {username, password} = user
        password=cryptoJS.MD5(password);

       let query = `
            select * from user where
            username='${username}' and  password='${password}'`
    try {
        connection.query(query,function  (err, result, fields) {
            if (err) throw err;
                if(result.length>0){
                    ifSuccess=true;
                    return res.status(200).send({type: "success", ifSuccess}).render(`/home`);
                }
                          
        return res.status(200).send({type: "success", ifSuccess});
                                    
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
        
    }
}


exports.registerHandler = async (req,res) =>{
        let ifSuccess = false; 
        const {user} = req.body;
        let {username, password} = user
        password=cryptoJS.MD5(password)
        let query = `
            insert User(username, password)
            values('${username}', '${password}')`
    try {
        connection.query(query,function  (err, result, fields) {
            if (err) throw err;
                console.log(result)
            ifSuccess = true; 
            
                         
                                    
        return res.status(200).send({type: "success", ifSuccess});
                                    
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
        
    }
}
