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
    itemsInCart.forEach(element => {
        cart_number += element.qty
    });
    cart.setItem('inCart', JSON.stringify(itemsInCart))

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

function updateQty(id, qty) {
    document.querySelector("[data-qty='" + id + "']").innerHTML = qty
}

function addOne(e) {
    let split = e.target.id.split('-')
    for (let i = 0; i < itemsInCart.length; i++) {
        if (itemsInCart[i].id == split[0] && itemsInCart[i].color == split[1]) {
            itemsInCart[i].qty++
            cart.inCart = JSON.stringify(itemsInCart)
            updateQty(e.target.id, itemsInCart[i].qty)
        }
    }
}

function removeOne(e) {
    let split = e.target.id.split('-')
    for (let i = 0; i < itemsInCart.length; i++) {
        if (itemsInCart[i].id == split[0] && itemsInCart[i].color == split[1]) {
            itemsInCart[i].qty--
            cart.inCart = JSON.stringify(itemsInCart)
            updateQty(e.target.id, itemsInCart[i].qty)
        }
        if(itemsInCart == null == undefined || itemsInCart.length == 0){
            document.querySelector('#in-cart').innerHTML = 'Votre Panier est vide !'
        }
    }
}

function deleteOne(e) {
    let split = e.target.id.split('-')
    for (let i = 0; i < itemsInCart.length; i++) {
        if (itemsInCart[i].id == split[0] && itemsInCart[i].color == split[1]) {
            itemsInCart.splice(i, 1)
            cart.inCart = JSON.stringify(itemsInCart)
        }
        if(itemsInCart == null == undefined || itemsInCart.length == 0){
            document.querySelector('#in-cart').innerHTML = 'Votre Panier est vide !'
        }
    }
    document.querySelector('[data="' + e.target.id + '"]').remove()
}




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

function validationForm(){
    let name = document.querySelector('#name').value
    let firstName = document.querySelector('#first-name').value
    let email = document.querySelector('#email').value
    let address = document.querySelector('#adress').value
    let city = document.querySelector('#city').value
    let CP = document.querySelector('#CP').value
    let regexMail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/
    let regexCP = new RegExp('[0-9]{5}')
    if(name.length < 2 || firstName.length < 2 || email.length < 2 || address.length <2 || city.length <2 || CP.length<2){
        return false
    }
    else if(!regexMail.test(email)){
        return false
    }
    else if(!regexCP.test(CP)){
        return false
    }
    else{
        return true
    }
}


//is there smthng in cart ?????
function insHTML() {
    console.log(objects)
    if (cart == undefined || cart.length == 0 || itemsInCart.length == 0 ||itemsInCart == null == undefined) {
        document.querySelector('#in-cart').innerHTML = "votre panier est vide !"
    } else {
        $('#in-cart-list').append(
            `
            <div class="col-md-10 col-sm-12 d-none d-md-block">
                <div class="row">
                    <div class="col-md-5 text-center ">
                        <p>désignation</p>
                    </div>
                    <div class="col-md-2 ">
                    <p>couleur</p>
                    </div>
                    <div class="col-md-2 text-center">
                        <p>quantité</p>
                    </div>
                    <div class="col-md-3">
                        <p>sous-total</p>
                    </div>
                </div>
            </div>
            `
        )
        for (let j = 0; j < itemsInCart.length; j++) {
            console.log('boucle id ok')
            console.log(j)
            for (let i = 0; i < objects.length; i++) {
                console.log('objets accedé')
                if (objects[i]._id == itemsInCart[j].id) {
                    $('#in-cart-list').html(
                        `
                        <div class="col-12 in-cart-object" data="${objects[i]._id}-${itemsInCart[j].color}">
                            <div class="row py-3">
                                <div class="col-md-2 col-3">
                                    <img src="${objects[i].imageUrl}" class="w-100" alt="image de ${objects[i].name}">
                                </div>
                                <div class="col-md-10 col-9  d-flex flex-row flex-wrap">
                                    <div class="col-md-2 col-12">
                                    <p> ${objects[i].name} </p>
                                    </div>
                                    <div class="col-md-2 col-12">
                                    <p> ${itemsInCart[j].color} </p>
                                    </div>
                                    <div class="col-md-3 text-center col-4">
                                        <p><button type="button" class="remove-one mr-1" id="${objects[i]._id}-${itemsInCart[j].color}">-</button><span data-qty="${objects[i]._id}-${itemsInCart[j].color}">${itemsInCart[j].qty}</span><button type="button" class="add-one ml-1" id="${objects[i]._id}-${itemsInCart[j].color}">+</button></p>
                                    </div>
                                    <div class="col-md-4 col-6">
                                        <p> ${objects[i].price /100 * itemsInCart[j].qty} €</p>
                                    </div>
                                    <div class="col-md-1 col-2">
                                        <img class="delete-button w-50" id="${objects[i]._id}-${itemsInCart[j].color}" src="./img/cart/trash.svg" />
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
                                    <input type="text" required class='col mx-2 form-control-sm' id="name"  />
                                    <label for='first-name'>
                                        Prénom
                                    </label>
                                    <input type="text" class='col mx-2 form-control-sm' required id="first-name" />
                                </div>
                                <div class="form-row mt-1">
                                    <label for='email' class="col-2">
                                        email
                                    </label>
                                    <input type="email" class='col-5 mx-2 form-control-sm'required  id="email" />
                                </div>
                                <div class="form-row mt-1">
                                    <label for='adress' class='col-2'>
                                        adresse
                                    </label>
                                    <input type="text" class='col mx-2 form-control-sm' required id="adress" />
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
                                    <input type="text" class='col mx-2 form-control-sm' required id="city" name="city" />
                                </div>

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
    //add remove and delete

    for (let i = 0; i < document.getElementsByClassName('add-one').length; i++) {
        document.getElementsByClassName('add-one')[i].addEventListener('click', addOne)
    }
    for (let i = 0; i < document.getElementsByClassName('remove-one').length; i++) {
        document.getElementsByClassName('remove-one')[i].addEventListener('click', removeOne)
    }
    for (let i = 0; i < document.getElementsByClassName('delete-button').length; i++) {
        document.getElementsByClassName('delete-button')[i].addEventListener('click', deleteOne)
    }

}






//POST to localhost:3000
var formContact = document.querySelector('#POSTdata')

function stringifyPost() {
    let name = document.querySelector('#name').value
    let firstName = document.querySelector('#first-name').value
    let email = document.querySelector('#email').value
    let address = document.querySelector('#adress').value
    let city = document.querySelector('#city').value
    let contact = {
        firstName: firstName,
        lastName: name,
        email: email,
        address: address,
        city: city
    }
    let products = []
    for (i = 0; i < itemsInCart.length; i++) {
        products.push(itemsInCart[i].id)
    }
    return JSON.stringify({
        contact,
        products
    })
}


formContact.addEventListener('click', function (e) { //submit
    if(validationForm() == true){
        e.preventDefault();
        fetch('http://localhost:3000/api/teddies/order', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: stringifyPost()

        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            console.log(jsonResponse)
            sessionStorage.setItem('confirmation',JSON.stringify(itemsInCart))
            window.location.href = './order.html?confirmation='+jsonResponse.orderId
        })
        .catch((error) => {
            alert('fetch POST error : ' + error)
        })
    }
})