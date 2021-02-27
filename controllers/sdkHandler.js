
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
        const { userInput } = req.body;
        console.log(userInput);
        return res.status(200).send({ message: 'Hey' });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};