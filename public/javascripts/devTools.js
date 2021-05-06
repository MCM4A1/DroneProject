

const logValues = (id, value)  =>{
    console.log("logValues",id,value)
}

const handleResponseMessage = (message)=>{
    if(message.type=="error")return true
    else return false
}

const submitLogin  = (loginElement )=>{
    let username = loginElement.querySelector(`[id="username"]`).value
    let password = loginElement.querySelector(`[id="loginpass"]`).value


    let user = {username, password}

    fetch(`/loginSubmit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user }),
    })
        .then((res) => {
            res.json().then((data) => {
                if(data.ifSuccess==true)
                    window.location.href = "/";
                else console.error("Wrong username or password")


            });
        })
        .catch((err) => console.log(err));

}

const submitRegister = (loginElement=>{
    console.log(loginElement)
    let username = loginElement.querySelector(`[id="username"]`).value
    let password = loginElement.querySelector(`[id="loginpass"]`).value


    let user = {username, password}
    console.log(user)

    fetch(`/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user }),
    })
        .then((res) => {
            res.json().then((data) => {
                
                if(data.ifSuccess)
                    console.log("Successful registration")
                else console.error("Registration failed")


            });
        })
        .catch((err) => console.log(err));

})



const addKeyPressListener = () =>{
    if (document.querySelector(`.listener__trigger`)){
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

    switch (pressedKeyValue) {
        case "ArrowUp":
            activeThis("forward")
            break;
        case "ArrowDown":
            activeThis("back")
            break;
        case "ArrowRight":
            activeThis("right")
            break;
        case "ArrowLeft":
            activeThis("left")
            break;
        case "Shift":
            activeThis("down")
            break;
        case " ":
            activeThis("up")
            break;
        case "q":
            activeThis("turnccw")
            break;
        case "e":
            activeThis("turncw")
            break;
        default:
            break;
    }
}

const activeThis = (elementToActive) =>{
    document.querySelector(`[name="${elementToActive}"]`).classList.add("active__grid__item")
    setTimeout(function(){
        document.querySelector(`[name="${elementToActive}"]`).classList.remove("active__grid__item")
        }, 100);
}


const loadBackendContent = () =>{
    console.log("Loading backend data")

    fetch(`/loadBackend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((res) => {
            res.json().then((data) => {
                console.log(data)
                loadBackendDataOnPage(data.droneDataObjects)
                
            });
        })
        .catch((err) => console.log(err));
}

const loadBackendDataOnPage = (dataObjects) =>{
    let dataContentDiv = document.querySelector(".data__content")
    console.log(dataObjects)

    for(let dataObject of dataObjects){
        let newRow = document.createElement("div")
        newRow.classList.add("data__flex")
        for(let droneData of dataObject){
            newRow.appendChild(createPElementWithContent(droneData))
        }
        dataContentDiv.appendChild(newRow)
    }

}

const createPElementWithContent = (content)=>{
    let pElement = document.createElement("p")
    pElement.innerHTML=content
    return pElement
}

//TODO SET THIS TO 1000
setInterval(() => {loadDataFromBackend()}, 10000);

const  loadDataFromBackend = ()=>{
    fetch(`sdkHandler/updateData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((res) => {
            res.json().then((data) => {
                changeControlHTMLContent(data.dataToFe)
            });
        })
        .catch((err) => console.log(err));
}

const submitSettings = (settingsElements)=>{
    let droneSpeed = settingsElements.querySelector(`[name="droneSpeed"]`).value
    let wifiSSID = settingsElements.querySelector(`[name="wifiSSID"]`).value
    let wifiPassword = settingsElements.querySelector(`[name="wifiPassword"]`).value
    let settings = {
        droneSpeed, wifiSSID, wifiPassword
    }

        fetch(`/updateSettings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ settings }),
        })
            .then((res) => {
                res.json().then((data) => {
                    console.log("Data saved")
                });
            })
            .catch((err) => console.log(err));

}