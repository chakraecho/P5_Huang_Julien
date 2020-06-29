var response;
const api = "http://localhost:3000/api/teddies"

//LOCAL STORAGE
let cart = localStorage
let itemsInCart;//create array for items
let qtyInCart; //qty in cart

function refreshCart(){
    let cart_number = 0
    for(let i=0; i < qtyInCart.length;i++){
        cart_number += qtyInCart[i]
    }
    //numbers of items in cart to the nav bar
    $('#in_cart_count').html(cart_number)
}
function clickAddCart(){
    $('.add_cart').on('click', function (e) {//ADD CART on button listener
        console.log(cart)
        if(itemsInCart.includes(this.id)){
            for(let i=0; i< itemsInCart.length;i++){
                if(this.id === itemsInCart[i]){
                    newQty = qtyInCart[i]
                    newQty++
                    qtyInCart[i] = newQty
                }
            }
        }
        else{
            itemsInCart.push(this.id)
            qtyInCart.push(1)
        }
        cart.setItem('inCart', JSON.stringify(itemsInCart))
        cart.setItem('qtyInCart',JSON.stringify(qtyInCart))
        refreshCart();
    });
}

//request GET to api
var req = new XMLHttpRequest
req.open('GET', api)
req.send()
req.onreadystatechange = function () {

    if (localStorage == null || localStorage.length == 0) {//if first time connecting to this website
        itemsInCart = []
        qtyInCart = []
        $('#in_cart_count').html('0')
    }
    else {
        itemsInCart = JSON.parse(cart.getItem('inCart'))
        qtyInCart = JSON.parse(cart.getItem('qtyInCart'))
        refreshCart();
    };

    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        response = JSON.parse(this.responseText)
        console.log(response.length)//number of object available
        console.log(response[1])//test request

        if (response.length > 0) {//if teddy in stock
            response.forEach((element, index, array) => {//insert all teddies in a list
                //insert card
                $('#objectList').append(`
                <div class="card col-md-5 align-content-between col-sm-8 p-0 ml-2 mr-2 mb-2" id="card_' + index + '"data-id=" ${response[index]._id}">
                        <a href="./product.html?${response[index]._id}" >
                            <img class="card-img-top" id="card-img_' + index + '" alt="image de ${response[index].name}" src="${response[index].imageUrl}"/>
                        </a>
                        <div class="card-body" id="card-body_${index}"> 
                            <a href="./product.html?${response[index]._id}" >
                                <div class="card-title text-center" id="card-title_${index}">
                                ${response[index].name}
                                </div>
                            </a>
                            <div class="card-text text-center" id="card-text_${index}">
                            ${response[index].price / 100}\u20ac
                            </div>
                            <div class="row">
                            <button type="button" class="btn add_cart mx-auto btn-success" id="${response[index]._id}" id="${response[index]._id}">
                                Ajouter au panier
                            </button>
                        </div>
                    </div>
                </div>
            `);
            })

        }
        else if (response.length === 0) {//if no teddy in stock
            $('#objectList').html("Il n'y a plus d'article disponible!")
        }
    }
    else if (this.status == 404) {//if error
        $('#objectList').html("Erreur 404, liste non recu !")
    }
    $('#add_cart').on('click',clickAddCart())
};


$('#in_cart').on('mouseover',function(){//Fade in Popover incart items
    $('#in_cart_popover').fadeIn('slow')
})
$('#in_cart').on('mouseout',function(){//Fade out Popover incart items
    $('#in_cart_popover').fadeOut('slow')
})

