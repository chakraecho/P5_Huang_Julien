
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
              /*  $('#objectList').append('<li id="object_' + index + '"class="listed-object mt-1"></li>');
                $('#object_' + index).append('<div class="row" id="row_object_' + index + '"></div>');
                $('#row_object_' + index).append('<div class="col-3"><img class="object_img" src = "' + response[index].imageUrl + '" alt = "image of a teddy" /></div ><div class="col-8"><div class="row align-items-center h-100"><div class="col-6">' + response[index].name +'</div><div class="offset-2 col-3 offset-lg-2 col-lg-1"><img class="cart" alt="ajouter au panier" src="img/main/add.svg"> </div></div></div>');
                console.log(element) */
                $('#objectList').append('<div class="card col-md-5 col-sm-8  ml-2 mr-2 mb-2" id="card_' + index + '"></div>');
                $('#card_' + index).append('<img class="card-img-top" id="card-img_' + index + '" alt="image de' + response[index].name + '" src="' + response[index].imageUrl + '"/>');
                $('#card_' + index).append('<div class="card-body" id="card-body_' + index + '"> </div>');
                $('#card-body_' + index).append('<div class="card-title text-center" id="card-title_' + index + '">' + response[index].name + '</div>');
                $('#card-body_' + index).append('<div class="row"><button type="button" class="btn btn-success mx-auto" id="add_cart_'+ index +'">Ajouter au panier</button></div>')

            })

        }
        else if (response.length === 0) {//if no teddy in stock
            $('#objectList').html("Il n'y a plus d'article disponible!")
        }
    }
}
