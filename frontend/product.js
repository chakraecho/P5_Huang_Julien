var response;
const api = "http://localhost:3000/api/teddies"


//LOCAL STORAGE
let cart = localStorage
let itemsInCart;//create array for items
let product

let fetchGET = { //get
    method: 'GET',
    mode: 'cors'
}



function refreshCart(){
    let cart_number = 0
    itemsInCart.forEach(element => {
        cart_number += element.qty
    });
    //numbers of items in cart to the nav bar
    $('#in_cart_count').html(cart_number)
}

function clickAddCart(){

    $('.add_cart').on('click', function (e) {//ADD CART on button listener
        let colorSelect = document.querySelector('#color-select_menu').value
        let isInCart = false
        if(itemsInCart.length > 0){
            for(let i=0; i< itemsInCart.length;i++){
                if(this.id === itemsInCart[i].id && colorSelect === itemsInCart[i].color){
                    console.log(this.id)
                        itemsInCart[i].qty++
                        isInCart = true
                }
            }
            if(isInCart == false){
                itemsInCart.push({'id' :this.id, 'color': colorSelect, 'qty': 1})

            }
        }
        else{
            itemsInCart.push({'id' :this.id, 'color': colorSelect, 'qty': 1})
        }
        console.log(itemsInCart)

        cart.setItem('inCart', JSON.stringify(itemsInCart))
        refreshCart();
    });
}
function insHTML(){
    $('title').html("oribear - "+product.name)
    $('#product-title').html(product.name)
    $('#product_body').append(`
    <img class="col-sm-6 col-md-3 offset-md-1" src="${product.imageUrl}" alt="image de ${product.name}"/>
    <p class="col-md-4 col-sm-8" id="product_description">${product.description}</p>
    <div class="col-md-3 col-sm-10 d-flex flex-column justify-content-between align-items-center" id="product_cart_col">
        <form id="color-select">
            <label for="color-select_menu" id="color-label">Couleur :</label>
            <select required="" name="color-select_menu" id="color-select_menu" >
            </select>
        </form>
    </div>
    <h2>${product.price/100}€</h2>
    <button type="button" class="btn add_cart mx-auto btn-success" id="${product._id}" id="${product._id}">Ajouter au panier</button>
    `)
    for(let i=0; i < product.colors.length;i++){
        $('#color-select_menu').append('<option value="'+product.colors[i]+'">'+product.colors[i]+'</option>')
    }
    if (localStorage == null) {//if first time connecting to this website
        itemsInCart = []
        $('#card_button').html('0')
    }
    else if(localStorage.length ==0){
        itemsInCart = []
        $('#card_button').html('0')
    }
    else {
        itemsInCart = JSON.parse(cart.getItem('inCart'))
        refreshCart();
    };
    clickAddCart();
}

//REQ TO ID

    //PRODUCT PAGE GET /:id
    let chemin = window.location.search
    let idProduct = chemin.substring(1)
 /*   let XHR = new XMLHttpRequest
    XHR.open('GET',api+ '/'+idProduct)
    XHR.send()
    XHR.onreadystatechange = function(){

        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            let product = JSON.parse(this.responseText)
            console.log(this.responseText)
            console.log(product)
            $('title').html("oribear - "+product.name)
            $('#product-title').html(product.name)
            $('#product_body').append(`
            <img class="col-sm-6 col-md-3 offset-md-1" src="${product.imageUrl}" alt="image de ${product.name}"/>
            <p class="col-md-4 col-sm-8" id="product_description">${product.description}</p>
            <div class="col-md-3 col-sm-10 d-flex flex-column justify-content-between align-items-center" id="product_cart_col">
                <form id="color-select">
                    <label for="color-select_menu" id="color-label">Couleur :</label>
                    <select required="" name="color-select_menu" id="color-select_menu" >
                    </select>
                </form>
            </div>
            <h2>${product.price/100}€</h2>
            <button type="button" class="btn add_cart mx-auto btn-success" id="${product._id}" id="${product._id}">Ajouter au panier</button>
            `)
            for(let i=0; i < product.colors.length;i++){
                $('#color-select_menu').append('<option value="'+product.colors[i]+'">'+product.colors[i]+'</option>')
            }
        }
        if (localStorage == null) {//if first time connecting to this website
            itemsInCart = []
            $('#card_button').html('0')
        }
        else if(localStorage.length ==0){
            itemsInCart = []
            $('#card_button').html('0')
        }
        else {
            itemsInCart = JSON.parse(cart.getItem('inCart'))
            refreshCart();
        };
        clickAddCart();
    } */

if (sessionStorage.items == undefined){
    fetch(api+ '/'+idProduct, fetchGET)
    .then(response => {
       try{ 
           response.json().then(
            (data) => {
                product = data
                insHTML()
            }
           )
    } catch {
        console.log('error parsing data')
    }
}).catch(error => console.log(error))
}
else{
    for (let i = 0; i< JSON.parse(sessionStorage.items).length; i++){
        if(idProduct == JSON.parse(sessionStorage.items)[i]._id){
            product = JSON.parse(sessionStorage.items)[i]
        }
    }
    insHTML();
}

    