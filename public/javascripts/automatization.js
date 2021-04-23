const addNewCard = (cardElement)=>{
    console.log("add new card")

    let newCard = document.createElement("div")
    newCard.classList.add("auto__card")

    createChildrendForAuto(newCard)

    cardElement.after(newCard)
}

const removeCard = (cardToRemove)=>{
    console.log("remove card")
    cardToRemove.remove()
}

const sendCommandsToSdk = ()=>{
    let cardHolder = document.querySelector(".card__holder")
    console.log(cardHolder)
    let cardInputs = cardHolder.querySelectorAll(".auto__card input")

    let cardInputValues = []

    for(cardInput of cardInputs)
        cardInputValues.push(cardInput.value)

    sendAutoToSdk(cardInputValues)

    
}

const sendAutoToSdk = (cardInputValues) =>{
    //console.log(key)
	fetch(`/sdkhandler/automatization`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardInputValues }),
    })
        .then((res) => {
            res.json().then((data) => {
                //console.log(data.type)
            });
        })
        .catch((err) => console.log(err));
}

const createChildrendForAuto = (newCard)=>{
    let commandInput = document.createElement("input")
    commandInput.setAttribute("type", "text")

    
    let addButton = document.createElement("button")
    let removeButton = document.createElement("button")
    
    addButton.innerText = "Add"
    addButton.addEventListener("click", function() {
        addNewCard(this.parentElement);
      })
    
    removeButton.innerText = "Remove"
    removeButton.addEventListener("click", function() {
        removeCard(this.parentElement);
    })
    
    newCard.appendChild(commandInput)
    newCard.appendChild(addButton)
    newCard.appendChild(removeButton)

    return newCard


}