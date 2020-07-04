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



function refreshCart() {
    let cart_number = 0
    for (let i = 0; i < qtyInCart.length; i++) {
        cart_number += qtyInCart[i]
    }
    //numbers of items in cart to the nav bar
    $('#in_cart_count').html(cart_number)
}

fetch(api, fetchGET)
    .then(
        (response) => {
            try {
                response.json().then(
                    (data) => {
                        console.log(data)
                        console.log('GET effectué')
                        objects = data
                        insLocalStorage();
                        insHTML();
                    }
                )
            } catch {
                console.log('error parsing data')
            }
        }
    )
    .catch(
        error => {
            console.log('fetch errror:', error)
        }
    )


function insLocalStorage() {
    if (localStorage == null || localStorage.length == 0 || localStorage == undefined) { //if first time connecting to this website
        itemsInCart = []
        qtyInCart = []
        $('#card_button').html('0')
        return "ok"
    } else {
        itemsInCart = JSON.parse(cart.getItem('inCart'))
        qtyInCart = JSON.parse(cart.getItem('qtyInCart'))
        refreshCart();
        return "ok"
    };
    console.log('insertion ok')

}

//is there smthng in cart ?????
function insHTML() {
    console.log(objects)
    if (cart == undefined || cart.length == 0) {
        document.querySelector('#in-cart').innerHTML = "votre panier est vide !"
    } else {
        $('#in-cart-list').append(
            `
            <div class="col-md-10 col-sm-12 d-none d-md-block">
                <div class="row">
                    <div class="col-md-5 text-center ">
                        <p>désignation</p>
                    </div>
                    <div class="col-md-4 text-center">
                        <p>quantité</p>
                    </div>
                    <div class="col-md-3">
                        <p>sous-total</p>
                    </div>
                </div>
            </div>
            `
        )
        for (id in itemsInCart) {
            console.log('boucle id ok')
            console.log(id)
            for (let i = 0; i < objects.length; i++) {
                console.log('objets accedé')
                if (objects[i]._id == itemsInCart[id]) {
                    $('#in-cart-list').append(
                        `
                        <div class="col-12 in-cart-object">
                            <div class="row py-3">
                                <div class="col-md-2 col-3">
                                    <img src="${objects[i].imageUrl}" class="w-100" alt="image de ${objects[i].name}">
                                </div>
                                <div class="col-md-10 col-9  d-flex flex-row flex-wrap">
                                    <div class="col-md-2 col-12">
                                    <p> ${objects[i].name} </p>
                                    </div>
                                    <div class="col-md-5 text-center col-4">
                                        <p>${qtyInCart[i]}</p>
                                    </div>
                                    <div class="col-md-4 col-6">
                                        <p> ${objects[i].price /100 * qtyInCart[i]} €</p>
                                    </div>
                                    <div class="col-md-1 col-2">
                                        <span class="delete-button" id="${objects[i]._id}"></span>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        `
                    )
                    console.log('condition if ok')
                }
            }
        }
        $('#contact-form').append(`
                    <div class="container">

                                <div class="form-row mt-1">
                                    <label for='name' class="col-2">
                                        Nom
                                    </label>
                                    <input type="text" class='col mx-2 form-control-sm' id="name" required>
                                    <label for='first-name'>
                                        Prénom
                                    </label>
                                    <input type="text" class='col mx-2 form-control-sm' id="first-name" required>
                                </div>
                                <div class="form-row mt-1">
                                    <label for='email' class="col-2">
                                        email
                                    </label>
                                    <input type="email" class='col-5 mx-2 form-control-sm' id="email" required>
                                </div>
                                <div class="form-row mt-1">
                                    <label for='adress' class='col-2'>
                                        adresse
                                    </label>
                                    <input type="text" class='col mx-2 form-control-sm' id="adress" required>
                                </div>
                                <div class="form-row mt-1">
                                    <label for='CP' class='col-2'>
                                        CP
                                    </label>
                                    <input type="text" class='col-2 mx-2 form-control-sm' maxlength="5" id="CP" name="CP" pattern="[0-9]{5}"
                                        required>
                                    <label for='city' class='col-2'>
                                        Ville
                                    </label>
                                    <input type="text" class='col mx-2 form-control-sm' id="city" name="city" required>
                                </div>

                            </div>
                            

                    `)
                    $('#payment').append(` 
                    <div class="row mt-5">
                        <p> Mode de paiement (pour la mise en page, données non transmis, non-required) </p>
                    </div>
                    <div class="form-row justify-content-center">
                            <input type='radio' name='payment-method' id="mastercard">
                            <label for="mastercard" class="col-4 col-md-2" control="mastercard">
                                <img src="./img/cart/mastercard.svg" class="mr-2" alt="mastercard" /> 
                            </label>

                            <input type='radio' id="visa" name='payment-method' class="ml-2" control="visa">
                            <label for="visa" class="col-4 col-md-2"><img src="./img/cart/visa.svg" alt="visa" /> </label>
                    </div>



                        <div class="form-group">
                            <label for="card-number" class="px-0 col-4">numéro de carte</label>
                            <input type="text" pattern="\d{16}" name='card-number' maxlength="16" id='card-number'
                                class='col-7 form-control-sm' />
                        </div>
                        <div class="form-group">
                            <label for="card-name" class='px-0 col-4'>Titulaire</label>
                            <input type="text" name='card-name' id='card-name' class="col-7 form-control-sm" />
                        </div>
                        <div class="form-row">
                            <div class="form-group col-6">
                                <label for="card-expire">exp</label>
                                <input type="text" class="col-4 form-control-sm" max="12" maxlength="2"
                                    name='card-expire-month' id='card-expire' />
                                <input type="text" max="99" class="col-4 form-control-sm" maxlength="2" min="20"
                                    name='card-expire-year' id="card-expire-year" />
                            </div>
                            <div class='form-group col-6 justify-content-end'>
                                <label for='card-code'>code :</label>
                                <input type="text" pattern="\d{3}" maxlength="3" id='card-code' name='card-code'
                                    class="col-4 form-control-sm" />
                            </div>
                        </div>
                    
                        `)

    }
}

var formContact = document.querySelector('#POSTdata')

function stringifyPost(){
    let name = document.querySelector('#name').value
    let firstName = document.querySelector('#first-name').value
    let email = document.querySelector('#email').value
    let address = document.querySelector('#adress').value
    let city = document.querySelector('#city').value
    let contact = {
        firstName : firstName,
        lastName : name,
        email : email,
        address: address,
        city: city
    }
    let products = itemsInCart
    return JSON.stringify({contact, products})
}


formContact.addEventListener('click', function(e){ //submit
    fetch('http://localhost:3000/api/teddies/order', {
        method:'POST',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
          },
        body: stringifyPost()
    }).then(function(response){
        alert(response.json())
    }).catch(alert('fetch error'))
}) 