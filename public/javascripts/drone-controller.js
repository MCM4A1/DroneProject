
const letsPlay = ()=>{
    console.log("spielen")
}

const testSubmit = () =>{
    let szoveg = "szoveg";
    let szam = 2
    let autoData = {szoveg: szoveg, szam : szam}

    fetch(('/testSubmitRequest'),{
        method: "POST",
        body: JSON.stringify(autoData),
    })
        .then((res) =>{
            console.log(res)

            res.json().then((data) => {
                if(data){
                    console.log(data)
            }
        });
    })
    .catch((err) => console.log(err));

}

const sendToSdk = (form) =>{
    let userInput = form.querySelector(`[name="sdkSubmit"]`).value
    console.log(userInput)
	fetch((`/submitSdkRequest`), {
		method: "POST",
		//headers: { "Content-Type": "application/json" },
		body: JSON.stringify(userInput),
	})
		.then((res) => {
            console.log(res)
            console.log(res.message)
            console.log(res.name)
            //console.log(data)

			res.json().then((data) => {
                if(data){
                    console.log(data)
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
