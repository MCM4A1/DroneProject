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
                console.log(data)
            });
        })
        .catch((err) => console.log(err));
}
