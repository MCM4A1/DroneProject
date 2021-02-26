const { render } = require("../app");

/**
 * Handle SDK request
 * @method POST 
 * @route /submitSdkRequest
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
    console.log("helo")
    try {
        let name = "nev"
        let karakter = "karakter"
        let message = req.body;
        const data =  {
            name: name,
            karakter: karakter,
            message: message}

        return res.status(200).send(data);
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};


/**
 * Handle SDK request
 * @method POST 
 * @route /testSubmitRequest
 *  
 * Request PARAM
 * @param {json} autoData 
 * 
 * 
 * Function params
 * @param {object} req - Request object coming from the user
 * @param {object} res - The response object which will be forwarded back to the user
 * @param {object} next - Calling the next middleware function in the stack
 */
exports.testSubmitRes = async (req,res,next) => {
    try {
        let feData = req.body;
        console.log(feData)

        return res.status(200).send(feData)
        
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};