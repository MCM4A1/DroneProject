const logValues = (id, value)  =>{
    console.log("logValues",id,value)
}

const handleResponseMessage = (message)=>{
    if(message.type=="error")return true
    else return false
}

const submitLogin  = (loginElement )=>{
    console.log(loginElement)
    let username = loginElement.querySelector(`[id="username"]`).value
    let password = loginElement.querySelector(`[id="loginpass"]`).value


    let user = {username, password}
    console.log(user)

    fetch(`/sdkHandler/loginSubmit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user }),
    })
        .then((res) => {
            res.json().then((data) => {
                
                if(data.message.type=="success")
                    window.location.href = "/";
                else console.error("Wrong username or password")


            });
        })
        .catch((err) => console.log(err));

}



const addKeyPressListener = () =>{
    if (document.querySelector(`.positions`)){
        document.addEventListener('keydown', keyPressHandler);
        console.log("controller listener added")
    }
}

window.onload = function(){
    addKeyPressListener()
}

const keyPressHandler = (pressedKey)=>{

    if(document.activeElement.nodeName=="INPUT") return

    
    let pressedKeyValue = pressedKey.key
    sendToSdk(pressedKeyValue)

    let posX = document.querySelector(".XPos input")
    let posY = document.querySelector(".YPos input")
    let posZ = document.querySelector(".ZPos input")

    switch(pressedKeyValue){
       case "ArrowUp":
            posY.value=parseInt(posY.value)+1
            break;
       case "ArrowDown":
            posY.value=parseInt(posY.value)-1
            break;
       case "ArrowLeft":
            posX.value=parseInt(posX.value)-1
            break;
       case "ArrowRight":
            posX.value=parseInt(posX.value)+1
            break;
       case " ":
            posZ.value=parseInt(posZ.value)+1
            break;
       case "Shift":
            posZ.value=parseInt(posZ.value)-1
            break;
    }


}