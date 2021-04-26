

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

    fetch(`/loginSubmit`, {
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
            activeThis("up")
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


//setInterval(() => {loadDataFromBackend()}, 1000);

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