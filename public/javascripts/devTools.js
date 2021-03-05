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