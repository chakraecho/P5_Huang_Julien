var response;
const api = "http://localhost:3000/api/teddies"

//LOCAL STORAGE
let cart = localStorage
let itemsInCart;//create array for items
let qtyInCart; //qty in cart
//request GET to api
var req = new XMLHttpRequest
req.open('GET', api)
req.send()
req.onreadystatechange = function () {

    if (localStorage == null) {//if first time connecting to this website
        itemsInCart = []
        qtyInCart = []
        $('#in_cart_count').html('0')
    }
    else if(localStorage.length ==0){
        itemsInCart=[]
        qtyInCart = []
        $('#in_cart_count').html('0')
    }
    else {
        itemsInCart = JSON.parse(cart.getItem('inCart'))
        qtyInCart = JSON.parse(cart.getItem('qtyInCart'))
        $('#in_cart_count').html(itemsInCart.length) ///TO CAHNGE
    };

    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        response = JSON.parse(this.responseText)
        console.log(response.length)//number of object available
        console.log(response[1])//test request

        if (response.length > 0) {//if teddy in stock
            response.forEach((element, index, array) => {//insert all teddies in a list
                //insert card
                $('#objectList').append('<div class="card col-md-5 align-content-between col-sm-8 p-0 ml-2 mr-2 mb-2" id="card_' + index + '"data-id="' + response[index]._id + '"></div>');
                $('#card_' + index).append('<a href="./product.html?' + response[index]._id + '" ><img class="card-img-top" id="card-img_' + index + '" alt="image de' + response[index].name + '" src="' + response[index].imageUrl + '"/></a>');
                $('#card_' + index).append('<div class="card-body" id="card-body_' + index + '"> </div>');
                $('#card-body_' + index).append('<a href="./product.html?' + response[index]._id + '" ><div class="card-title text-center" id="card-title_' + index + '">' + response[index].name + '</div></a>');
                $('#card-body_' + index).append('<div class="card-text text-center" id="card-text_' + index + '">' + response[index].price / 100 + '\u20ac</div>');
                $('#card-body_' + index).append('<div class="row"><button type="button" class="btn add_cart mx-auto btn-success" id="'+response[index]._id+'" id="'+response[index]._id+'">Ajouter au panier</button></div>')

            })

        }
        else if (response.length === 0) {//if no teddy in stock
            $('#objectList').html("Il n'y a plus d'article disponible!")
        }
    }
    else if (this.status == 404) {//if error
        $('#objectList').html("Erreur 404, liste non recu !")
    }
    $('.add_cart').on('click', function (e) {//ADD CART on button listener
        console.log(cart)
        itemsInCart.push(this.id);
        cart.setItem('inCart', JSON.stringify(itemsInCart))
        console.log(JSON.parse(cart.getItem('inCart')))
        //numbers of items in cart to the nav bar
        $('#in_cart_count').html(itemsInCart.length)
    })

};


$('#in_cart').on('mouseover',function(){//Fade in Popover incart items
    $('#in_cart_popover').fadeIn('slow')
})
$('#in_cart').on('mouseout',function(){//Fade out Popover incart items
    $('#in_cart_popover').fadeOut('slow')
})

