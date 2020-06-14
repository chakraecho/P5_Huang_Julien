
const api = "http://localhost:3000/api/teddies"

//request GET to api

var req = new XMLHttpRequest
req.open('GET', api)
req.send()
req.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText)
        console.log(response)
    }
}

