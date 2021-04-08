
/**
 * Handle SDK request
 * @method POST 
 * @route /sdkHandler
 *  
 * Request PARAM
 * @param {string} userInput 
 * 
 * 
 * Function params
 * @param {object} req - Request object coming from the user
 * @param {object} res - The response object which will be forwarded back to the user
 * @param {object} next - Calling the next middleware function in the stack
 */
exports.submitSdk = async (req, res, next) => {
    try {
        const { key } = req.body;
        let command = "pitch:20;jaw:20;asd:10;kutya:69;cica:420";

        console.log(command.split(";"))

        command = command.split(";")

        for(let com of command){
            console.log(com);
        }
        /*
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
            console.log(command)

        let droneResponse = droneCommandHandler(command)

        console.log("kutyacica", droneResponse)
            */
        return res.status(200).send({type: "success", key });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);

    }
};

exports.loginHandler = async (req,res,next) =>{
    try {
        console.log(req.body)
        const {user} = req.body;
        let {username, password} = user

        let message

        if(username=="admin" && password == "secret")
            message={
                type:"success",
                text:"successful login",
            }
        else
            message={
                type:"error",
                text:"failed login",
            }


        return res.status(200).send({message, username, password})
        
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
        
    }
}

const droneIp = "192.168.10.1"
const portToCommand = "8889"
const statePort = "8890"
const dgram = require('dgram')
const wait = require('waait')

const drone = dgram.createSocket('udp4')
drone.bind(statePort)


const droneCommandHandler = async (command) =>{
    console.log("Command sent to drone + length:  ",command, command.length)
    drone.send(command, 0, command.length, portToCommand, droneIp, errorHandler)

    drone.on('message', message =>{
        let splittedMessage
        if(message.length>50)
            splittedMessage = message.split(';')
        else 
            splittedMessage = message
        console.log(`DRONE: ${splittedMessage}`)
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

const droneCommandTakeoffLand = async ()=>{
    let commands = ['command', 'takeoff', 'land']
    for(let command of commands){
        drone.send(command, 0, command.length, portToCommand, droneIp, errorHandler)
        console.log(command)
        await wait(5000)
    }
}

