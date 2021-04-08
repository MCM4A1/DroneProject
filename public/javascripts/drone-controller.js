const sendToSdk = (key) =>{
    //console.log(key)
	fetch(`/sdkhandler`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
    })
        .then((res) => {
            res.json().then((data) => {
                //console.log(data.type)
                changeControlHTMLContent(data.key)
            });
        })
        .catch((err) => console.log(err));
}

const changeControlHTMLContent = (text) =>{
    let controlDataParagraph = document.querySelector(`[name="webSocketContent"]`)
    controlDataParagraph.innerText = text
}


