function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

var decodedToken

if (localStorage.getItem("jwt") == undefined || null){
    window.location = "/login.html"
}else{
    decodedToken = parseJwt(localStorage.getItem("jwt"))

    fetch('https://api.playmanity.net/user/small-profile', {
    headers: {
        'Accept': 'application/json',
        'Authorization':localStorage.getItem("jwt")
    }
    })
    .then((response) => response.json())
    .then((json) => {
        //document.getElementById("pfpimage").setAttribute("src", json['avatarUrl'])
        document.getElementById("profilename").textContent = json['username']
    })
}