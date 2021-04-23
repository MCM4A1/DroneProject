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
