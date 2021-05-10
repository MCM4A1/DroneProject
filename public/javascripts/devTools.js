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
                loadBackendDataOnPage(data.result)
                
            });
        })
        .catch((err) => console.log(err));
}

const loadBackendDataOnPage = (dataObjects) =>{
    let dataContentDiv = document.querySelector(".data__content")

    for(let dataObject of dataObjects){
        let newRow = document.createElement("div")
        newRow.classList.add("data__flex")
        console.log(dataObject)

        let {agx, agy, agz, baro, bat, date, h, pitch, roll, temph, templ, time, username, vgx, vgy, vgz, yaw} = dataObject

        let stringToDisplay = `Drone data:  agx: ${agx}, agy: ${agy}, agz: ${agz}, baro: ${baro}, bat: ${bat}, date: ${date}, h: ${h}, pitch: ${pitch}, roll: ${roll}, temph: ${temph}, templ: ${templ}, time: ${time}, username: ${username}, vgx: ${vgx}, vgy: ${vgy}, vgz: ${vgz}, yaw: ${yaw}`
        

        newRow.appendChild(createPElementWithContent(stringToDisplay))
        
        dataContentDiv.appendChild(newRow)
    }

}

const createPElementWithContent = (content)=>{
    let pElement = document.createElement("p")
    pElement.innerHTML=content
    return pElement
}



var timer;

function startLoading(){
    timer = setInterval(loadDataFromBackend, 1000)
}

const stopLoading = ()=>{
    clearInterval(timer);
}

//TODO SET THIS TO 1000




const  loadDataFromBackend = ()=>{
    fetch(`sdkHandler/updateData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((res) => {
            res.json().then((data) => {
                if(data.type=="fail"){
                    console.log("No value to insert into DB")
                    return
                }
                changeControlHTMLContent(data.dataToFe)
            });
        })
        .catch((err) => console.log(err));
}





const submitSettings = (settingsElements)=>{
    let wifiSSID = settingsElements.querySelector(`[name="wifiSSID"]`).value
    let wifiPassword = settingsElements.querySelector(`[name="wifiPassword"]`).value
    if(!wifiSSID || !wifiPassword){
        console.error("Missing password or SSID")
        return;
    }
    let settings = {
        wifiSSID, wifiPassword
    }
    console.log(settings)

        fetch(`sdkHandler/updateSettings`, {
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