//order ID insertion
let orderID = window.location.search.split('=')[1]
document.querySelector('h2').innerHTML = 'commande n°' + orderID

//ins-recap insertion => sum of order
let insRecap = document.querySelector('#ins-recap')
let items = JSON.parse(localStorage.inCart)
let objects = JSON.parse(sessionStorage.items)

for (let i = 0; i < items.length; i++) {
    for (let j = 0; j< objects.length; j++){
        if(items[i].id == objects[j]._id){
            insRecap.insertAdjacentHTML('beforeend', `
            <div class='row'>
                <div class='col-3 text-center'>
                    ${objects[j].name}
                </div>
                <div class='col-3 text-center'>
                    ${items[i].color}
                </div>
                <div class='col-3 text-center'>
                    ${items[i].qty}
                </div>
                <div class='col-3 text-center'>
                    ${items[i].qty * objects[j].price /100}€
                </div>
            </div>
            `)
        }
    }
}
//info desti
let infoDesti = document.querySelector('#infos-dest')
let contact = JSON.parse(sessionStorage.contact)

infoDesti.insertAdjacentHTML('beforeend',`
    <div class='row'>
        destinaire: ${contact.lastName} ${contact.firstName}
    </div>
    <div class='row'>
        email: ${contact.email}
    </div>
    <div class='row'>
        adresse: ${contact.address}
    </div>
    <div class='row'>
        ville: ${contact.city}
    </div>
`)

sessionStorage.clear();
localStorage.clear();