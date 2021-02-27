
const letsPlay = ()=>{
    console.log("spielen")
}

const sendToSdk = (form) =>{
    let userInput = form.querySelector(`[name="sdkSubmit"]`).value
    console.log(userInput)

	fetch(`/sdkhandler`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput }),
    })
        .then((res) => {
            res.json().then((data) => {
                if (handleResponseMessage(data.message)) {
                    return console.err('Response message failed');
                } else {
                    console.log(data);
                }
            });
        })
        .catch((err) => console.log(err));

}
/*
const droneControlMain = (direction)=>{
    const xpos = document.querySelector(`input[name="xpos"]`)
    const ypos = document.querySelector(`input[name="ypos"]`)
    const zpos = document.querySelector(`input[name="zpos"]`)
    
    
    switch(direction){
        case "up":
            zpos.value++;
            break;
        case "down":
            zpos.value--;
            break;
        case "forward":
            ypos.value++;
            break;
        case "back":
            ypos.value--;
            break;
        case "left":
            xpos.value--;
            break;
        case "right":
            xpos.value++;
            break;
    }


}*/
