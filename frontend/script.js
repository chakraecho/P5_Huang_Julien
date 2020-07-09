var response;
const api = "http://localhost:3000/api/teddies"

//LOCAL STORAGE
let cart = localStorage
let itemsInCart = [];//create array for items
let storedItems
//fetch method
let fetchGET = { //get
    method: 'GET',
    mode: 'cors'
}

function refreshCart(){
    let cart_number = 0
    if(localStorage.length == 0 || localStorage.inCart ==undefined){
        $('#in_cart_count').html(0)

    }
    else{
        itemsInCart = JSON.parse(cart.inCart)
        itemsInCart.forEach(element => {
            console.log(element)
            cart_number += element.qty
        });
    }
    //numbers of items in cart to the nav bar
    $('#in_cart_count').html(cart_number)
}

function insItems(){
    storedItems.forEach((element, index) => {//insert all teddies in a list
        //insert card
        $('#objectList').append(`
        <div class="card col-md-5 align-content-between col-sm-8 p-0 ml-2 mr-2 mb-2" id="card_' + index + '"data-id=" ${storedItems[index]._id}">
                <a href="./product.html?${storedItems[index]._id}" >
                    <img class="card-img-top" id="card-img_' + index + '" alt="image de ${storedItems[index].name}" src="${storedItems[index].imageUrl}"/>
                </a>
                <div class="card-body" id="card-body_${index}"> 
                    <a href="./product.html?${storedItems[index]._id}" >
                        <div class="card-title text-center" id="card-title_${index}">
                        ${storedItems[index].name}
                        </div>
                    </a>
                    <div class="card-text text-center" id="card-text_${index}">
                    ${storedItems[index].price / 100}\u20ac
                    </div>
                    <div class="row">
                    <a href='./product.html?${storedItems[index]._id}' class="btn add_cart mx-auto btn-success" id="${storedItems[index]._id}">
                        Personnalisez votre nounours !
                    </a>
                </div>
            </div>
        </div>
    `);
    })
}


if(sessionStorage.items == null || sessionStorage.items == undefined || sessionStorage.items.length == 0){

    fetch(api, fetchGET ).then(
        (response)=>{
            response.json().then(
                data => {
                    console.log(response.length)//number of object available
                    console.log(response[1])//test request
                    storedItems = data
                    if (data.length > 0) {//if teddy in stock
                        sessionStorage.setItem('items', JSON.stringify(data))
                        insItems();
            
                    }
                    else if (data.length === 0) {//if no teddy in stock
                        $('#objectList').html("Il n'y a plus d'article disponible!")
                    }
                }
            )
        }
    )
    .catch(error => {
        document.querySelector('.listed-Object').innerHTML = error
    });
/*
    //request GET to api
    var req = new XMLHttpRequest
    req.open('GET', api)
    req.send()
    req.onreadystatechange = function () {
    
        refreshCart()
    
        if (this.readyState == XMLHttpRequest.DONE && this.status >= 200 < 300 ) {
            response = JSON.parse(this.responseText)
            console.log(response.length)//number of object available
            console.log(response[1])//test request
            storedItems = response
            if (response.length > 0) {//if teddy in stock
                sessionStorage.setItem('items', JSON.stringify(response))
                insItems();
    
            }
            else if (response.length === 0) {//if no teddy in stock
                $('#objectList').html("Il n'y a plus d'article disponible!")
            }
        }
        else {//if error
            $('#objectList').html("Erreur serveur")
        }
    }*/
    }
    else{
        storedItems = JSON.parse(sessionStorage.items)
        insItems();
    }
refreshCart();


$('#in_cart').on('mouseover',function(){//Fade in Popover incart items
    $('#in_cart_popover').fadeIn('slow')
})
$('#in_cart').on('mouseout',function(){//Fade out Popover incart items
    $('#in_cart_popover').fadeOut('slow')
})

