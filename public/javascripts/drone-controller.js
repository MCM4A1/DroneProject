const sendToSdk = (key) =>{
    //console.log(key)
	fetch(`/sdkhandler`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
    })
        .then((res) => {
            res.json().then((data) => {
                console.log("success")
            });
        })
        .catch((err) => console.log(err));
}

const changeControlHTMLContent = (droneDataString) =>{

    //droneDataString="pitch:-1;roll:-179;yaw:148;vgx:-1;vgy:0;vgz:0;templ:76;temph:78;tof:10;h:0;bat:90;baro:196.55;time:0;agx:-22.00;agy:5.00;agz:1002.00;";

    if(!droneDataString){
        console.error("Drone not connected")
        return
    }
    let socketContentTable = document.querySelector(`[name="webSocketContent"]`)
    let droneDataArray = droneDataString.split(";")
    let droneDataObject = {}

    for (arrayItem of droneDataArray){
        let arrayItemArray = arrayItem.split(":");
        droneDataObject[`${arrayItemArray[0]}`] = arrayItemArray[1];
        if(arrayItem.length<3){
            return
        }
        let tableDataRow =  socketContentTable.querySelector(`[name="${arrayItemArray[0]}"]`)
        if(tableDataRow){
            tableDataRow.lastElementChild.innerHTML=`${arrayItemArray[1]}`
        }
    }

    
    

    console.log(droneDataObject)
    //controlDataParagraph.innerText = text
}


