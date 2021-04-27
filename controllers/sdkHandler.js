const droneIp = "192.168.10.1"
const portToCommand = "8889"
const statePort = "8890"
const dgram = require('dgram')
const wait = require('waait');
let droneData;

//SQL Stuff
let mysql = require('mysql');
let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'almafa',
    database: 'drone_adatbazis'
});
connection.connect(function(err) {
    if (err) throw err;
  });


const drone = dgram.createSocket('udp4')
drone.bind(statePort)

  
  

const droneCommandHandler = async (command) =>{
    console.log("Command sent to drone + length:  ",command, command.length)
    drone.send(command, 0, command.length, portToCommand, droneIp, errorHandler)

    drone.on('message', message =>{
        droneData=`${message}`;
        console.log(`DRONE: ${message}`)

        return message;
    });
}



//command, callback, length of command, port, host, errorhandler
//drone.send(command, 0, '8', portToCommand, droneIp, errorHandler)
const errorHandler = (err) =>{
    if(err){
        console.error("There is an error")
    }
}




exports.submitSdk = async (req, res, next) => {
    try {
        const { key } = req.body;

        console.log("backend: ",key)

        droneCommandHandler(key)

        let queryData = []

        let query = "select * from user";
        connection.query(query,function  (err, result, fields) {
            if (err) throw err;
            queryData=JSON.parse(JSON.stringify(result))
            
            
            switch (key) {
                case "ArrowUp":
                    command="forward 30"
                break;
                case "ArrowDown":
                    command="back 30"
                break;
                case "ArrowLeft":
                    command="left 30"
                break;
                case "ArrowRight":
                    command="right 30"
                break;
                case " ":
                    command="land"
                break;
                default:
                    command=key;
                break;
                }
                                    
                                    
        return res.status(200).send({type: "success", key , queryData});
                                    
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);

    }
};

//Automatization
exports.submitAutoToSdk = async (req, res, next) => {
    try {
        const cardInputValues  = req.body.cardInputValues;
        for(let cardValue of cardInputValues){
            console.log(cardValue)
            await wait(500)
            //droneCommandHandler(cardValue)
        }
        return res.status(200).send({type: "success"});
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);

    }
};


//Frontend pings this to update the drone data from the backend every second.
exports.updateDroneData = async (req, res, next) => {
    try {
        let dataToFe = droneData
        //let dataToFe = Math.floor(Math.random()*10)
        return res.status(200).send({type: "success", dataToFe});
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};