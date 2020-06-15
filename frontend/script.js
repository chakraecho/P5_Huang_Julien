
const api = "http://localhost:3000/api/teddies"
//let list = "<li class='listed-object col-10'><div class='row'></div ></li > "
//request GET to api
var req = new XMLHttpRequest
req.open('GET', api)
req.send()
req.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText)
        console.log(response.length)//number of object available
        console.log(response[1])//test request

        if (response.length > 0) {//if teddy in stock
            for (let i = 0; i <= response.length; i++) {//insert all teddies in a list
                $('#objectList').html('<li id="object_' + i + '"></li>');
                $('#object_' + i).html('<div class="row" id="row_object_' + i + '"></div>');
                $('#row_object_' + i).html('<div class="col-md-3 col-sm-4">< img src = "'+ response[i].imageUrl+ '" alt = "image of a teddy" /></div >')
            }
        }
        else if (response.length === 0) {//if no teddy in stock
            
        }
    }
}

