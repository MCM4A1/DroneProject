const droneIp = "192.168.10.1"
const portToCommand = "8889"
const statePort = "8890"
const dgram = require('dgram')
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
        if(message.length>10)
            droneData=`${message}`;
        console.log(`DRONE: ${message}`)

        return message;
    });
}



//command, callback, length of command, port, host, errorhandler
//drone.send(command, 0, '8', portToCommand, droneIp, errorHandler)
const errorHandler = (err) =>{
    if(err){
        console.error("Drone error")
    }
}


exports.submitSdk = async (req, res, next) => {
    try {
        const { key } = req.body;
        console.log("backend key: ",key)
            
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
                    command="up 20"
                    break;
                case "SHIFT":
                    command="down 20"
                break;
                default:
                    command=key;
                break;
                }
        droneCommandHandler(command)                
                                    
        return res.status(200).send({type: "success", key});
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


//droneDataString="pitch:-1;roll:-179;yaw:148;vgx:-1;vgy:0;vgz:0;templ:76;temph:78;tof:10;h:0;bat:90;baro:196.55;time:0;agx:-22.00;agy:5.00;agz:1002.00;";

//Frontend pings this to update the drone data from the backend every second.
exports.updateDroneData = async (req, res, next) => {
    try {
        let dataToFe = droneData
        console.log(dataToFe)

            if(!dataToFe){
                console.log("NO DRONE DATA")
                return res.status(418)
            }

        let droneDataArray = dataToFe.split(";")
        let droneDataObject = {}

    for (arrayItem of droneDataArray){
        let arrayItemArray = arrayItem.split(":");
        droneDataObject[`${arrayItemArray[0]}`] = arrayItemArray[1];
    }
    //droneDataObject.pitch.value, droneDataObject.roll.value, droneDataObject.yaw.value, droneDataObject.vgx.value, droneDataObject.vgy.value, droneDataObject.vgz.value, droneDataObject.templ.value, droneDataObject.templh.value, droneDataObject.tof.value, droneDataObject.h.value, droneDataObject.bat.value, droneDataObject.baro.value, droneDataObject.time.value, droneDataObject.agx.value, droneDataObject.agy.value, droneDataObject.agz.value

        let query = `insert into flydata(pitch, roll, yaw, vgx, vgy, vgz, templ, temph, tof, h, bat, baro, time, agx, agy, agz) values(
                ${droneDataObject.pitch}
                ,${droneDataObject.roll}
                ,${droneDataObject.yaw}
                ,${droneDataObject.vgx} 
                ,${droneDataObject.vgy} 
                ,${droneDataObject.vgz} 
                ,${droneDataObject.templ} 
                ,${droneDataObject.temph} 
                ,${droneDataObject.tof} 
                ,${droneDataObject.h} 
                ,${droneDataObject.bat} 
                ,${droneDataObject.baro} 
                ,${droneDataObject.time} 
                ,${droneDataObject.agx} 
                ,${droneDataObject.agy} 
                ,${droneDataObject.agz})`



                connection.query(query,function  (err, result, fields) {
                    if (err) throw err;
                    console.log("Data inserted")
                                  
                return res.status(200).send({type: "success", dataToFe});
            });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};