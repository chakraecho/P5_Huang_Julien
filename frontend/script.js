
const api = "http://localhost:3000/api/teddies"
//let list = "<li class='listed-object col-10'><div class='row'></div ></li > "
//request GET to api
var req = new XMLHttpRequest
req.open('GET', api)
req.send()
req.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText)
        console.log(response.length)//number of object available
        console.log(response[1])//test request

        if (response.length > 0) {//if teddy in stock
            response.forEach((element, index, array)=> {//insert all teddies in a list
                $('#objectList').append('<li id="object_' + index + '"class="listed-object"></li>');
                $('#object_' + index).append('<div class="row" id="row_object_' + index + '"></div>');
                $('#row_object_' + index).append('<div class="col-md-3 col-sm-4"><img class="object_img" src = "' + response[index].imageUrl + '" alt = "image of a teddy" /></div ><div class="col-sm-8 col-md-3"><div class="row"><div class="col-12">' + response[index].name +'</div></div><div class="row mt-auto"><div class="offset-6 col-3">buy </div></div></div>');
                console.log(element)
            })

        }
        else if (response.length === 0) {//if no teddy in stock
            
        }
    }
}

