var response;
const api = "http://localhost:3000/api/teddies"

//LOCAL STORAGE
let cart = localStorage

//request GET to api
var req = new XMLHttpRequest
req.open('GET', api)
req.send()
req.onreadystatechange = function () {
    let itemsInCart;//create array for items
    if (localStorage == null) {//if first time connecting to this website
        itemsInCart = []
        $('#card_button').html('0')
    }
    else if(localStorage.length ==0){
        itemsInCart=[]
        $('#card_button').html('0')
    }
    else {
        itemsInCart = JSON.parse(cart.getItem('inCart'))
        $('#card_button').html(itemsInCart.length)

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
        $('#card_button').html(itemsInCart.length)
    })

};



//REQ TO ID

var nom = window.location.pathname;
nom = nom.split("/");
nom = nom[nom.length - 1];
nom = nom.substr(0, nom.lastIndexOf("."));
nom = nom.replace(new RegExp("(%20|_|-)", "g"), "");
console.log(nom)

if(nom == 'product'){
    //PRODUCT PAGE GET /:id
    let chemin = window.location.search
    let idProduct = chemin.substring(1)
    console.log(idProduct)

    let XHR = new XMLHttpRequest
    XHR.open('GET',api+ '/'+idProduct)
    XHR.send()
    XHR.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            let product = JSON.parse(this.responseText)
            console.log(this.responseText)
            console.log(product)
            $('title').html("oribear "+product.name)
            $('#product-title').html(product.name)
            $('#product_body').append('<img class="col-sm-6 col-md-3" src="'+ product.imageUrl +'" alt="image de '+ product.name + '"/>')
            $('#product_body').append('<p class="col-md-4 col-sm-8" id="product_description">'+product.description+'</p>')
            $('#product_body').append('<div class="col-md-3 col-sm-10" id="product_cart_col"></div>')
            $('#product_cart_col').append('<form id="color-select"> </form>')
            $('#color-select').append('<label for="color-select_menu" id="color-label">Couleur :</label>')
            $('#color-select').append('<select name="color-select_menu" id="color-select_menu"></select>')
            $('#color-select_menu').append('<option value="">choisissez une couleur</option>')
            for(let i=0; i <= product.colors.length;i++){
                $('#color-select_menu').append('<option value="'+product.colors[i]+'">'+product.colors[i]+'</option>')
            }
            $('#product_cart_col').append('<button type="button" class="btn add_cart mx-auto btn-success" id="'+product._id+'" id="'+product._id+'">Ajouter au panier</button>')

            console.log(product)
        }
    }

}

