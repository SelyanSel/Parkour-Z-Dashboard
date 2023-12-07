function openLink(url){
    window.location = url
}

function login(){
    fetch("https://api.playmanity.net/sign-in", {
        method: "POST",
        body: JSON.stringify({
            username:document.getElementById("username").value,
            password:document.getElementById("password").value
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((json) => {
        if(json['error'] == undefined || null){
            if(json['value'] == undefined || null){
                console.error("Response from API contained a JSON where value is null, when value was expected to be JWT.")
                alert('An error occured. Seek console for more details.')
            }else{
                localStorage.setItem("jwt", json['value'])
                window.location = "./index.html"
            }
        }else{
            alert(json['error'])
        }
    });
}