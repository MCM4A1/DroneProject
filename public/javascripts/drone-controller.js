
const letsPlay = ()=>{
    console.log("spielen")
}

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


}