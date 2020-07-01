const api = "http://localhost:3000/api/teddies"
var objects; //stockage des objets

//LOCAL STORAGE
let cart = localStorage
let itemsInCart; //create array for items
let qtyInCart; //qty in cart

//fetch method
let fetchGET = { //get
    method: 'GET',
    mode: 'cors'
}
let fetchPOST = { //post
    method: 'GET',
    mode: 'cors'
}

function refreshCart() {
    let cart_number = 0
    for (let i = 0; i < qtyInCart.length; i++) {
        cart_number += qtyInCart[i]
    }
    //numbers of items in cart to the nav bar
    $('#in_cart_count').html(cart_number)
}


function GETall() {
    fetch(api, fetchGET)
        .then(
            (response) => {
                if (response.status != 200) {
                    console.log('erreur ' + response.status)
                } else {
                    response.json().then(
                        (data) => {
                            console.log(data)
                            objects = data

                        }
                    )
                }
            }
        )
        .catch(
            error => {
                console.log('fetch errror:', error)
            }
        )
}
async function insLocalStorage() {
    await GETall();
    if (localStorage == null || localStorage.length == 0 || localStorage == undefined) { //if first time connecting to this website
        itemsInCart = []
        qtyInCart = []
        $('#card_button').html('0')
    } else {
        itemsInCart = JSON.parse(cart.getItem('inCart'))
        qtyInCart = JSON.parse(cart.getItem('qtyInCart'))
        refreshCart();
    };
    console.log('insertion ok')
}


insLocalStorage();

