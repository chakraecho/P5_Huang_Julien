
const api = "http://localhost:3000/api/teddies"
//let list = "<li class='listed-object col-10'><div class='row'></div ></li > "
//request GET to api
let response;
var req = new XMLHttpRequest
req.open('GET', api)
req.send()
req.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        response = JSON.parse(this.responseText)
        console.log(response.length)//number of object available
        console.log(response[1])//test request

        if (response.length > 0) {//if teddy in stock
            response.forEach((element, index, array) => {//insert all teddies in a list
                //insert card
                $('#objectList').append('<a href="product.html?' + response[index]._id + '" class="stretched-link card col-md-5 col-sm-8  ml-2 mr-2 mb-2" id="card_' + index + '"data-id="' + response[index]._id + '"></div>');
                $('#card_' + index).append('<img class="card-img-top" id="card-img_' + index + '" alt="image de' + response[index].name + '" src="' + response[index].imageUrl + '"/>');
                $('#card_' + index).append('<div class="card-body" id="card-body_' + index + '"> </div>');
                $('#card-body_' + index).append('<div class="card-title text-center" id="card-title_' + index + '">' + response[index].name + '</div>');
                $('#card-body_' + index).append('<div class="card-text text-center" id="card-text_' + index + '">' + response[index].price / 100 + '\u20ac</div>');
                $('#card-body_' + index).append('<div class="row"><button type="button" class="btn btn-success mx-auto" id="add_cart_' + index + '" data-id="' + response[index]._id + '">Ajouter au panier</button></div>')

            })

        }
        else if (response.length === 0) {//if no teddy in stock
            $('#objectList').html("Il n'y a plus d'article disponible!")
        }
    }
    else if (this.status == 404) {//if error
        $('#objectList').html("Erreur 404, liste non reçu !")

    }
}
