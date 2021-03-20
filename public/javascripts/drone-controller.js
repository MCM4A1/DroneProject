const sendToSdk = (key) =>{

    console.log(key)

	fetch(`/sdkhandler`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
    })
        .then((res) => {
            res.json().then((data) => {
                console.log(data.type)
            });
        })
        .catch((err) => console.log(err));
}
