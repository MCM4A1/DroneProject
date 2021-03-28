
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



        switch(key){
            case "battery?":
                    droneCommandHandler("battery?")
                    break;
            case "command":
                    droneCommandHandler("command")
                    break;
            /*
            case "ArrowUp":
                console.log("FORWARD")
                break;
            case "ArrowDown":
                console.log("BACKWARDS")
                break;
            case "ArrowLeft":
                console.log("LEFT")
                break;
            case "ArrowRight":
                console.log("RIGHT")
                break;
            case " ":
                console.log("UP")
                break;
            case "Shift":
                console.log("DOWN")
                break;
            default :
                console.log(`Command ${key} in not recognized`)*/
        }


        return res.status(200).send({type: 'success' });
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

const droneCommandHandler = async (command) =>{

    console.log(command, command.length)
 
const dgram = require('dgram')
const wait = require('waait')

const droneIp = "192.168.10.1"
const portToCommand = "8889"
const statePort = "8890"


const drone = dgram.createSocket('udp4')
drone.bind(statePort)

drone.on('message', message =>{
    console.log(`${message}`)
});

const errorHandler = (err) =>{
    if(err){
        console.err("There is an error")
        //console.log(err)
    }
}

//command, callback, length of command, port, host, errorhandler
drone.send(command, 0, command.length, portToCommand, droneIp, errorHandler)
//drone.send(command, 0, '8', portToCommand, droneIp, errorHandler)

console.log("started")
}