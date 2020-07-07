//order ID insertion
let orderID = window.location.search.split('=')[1]
document.querySelector('h2').innerHTML = 'commande n°' + orderID

//ins-recap insertion => sum of order
let insRecap = document.querySelector('#ins-recap')
let items = JSON.parse(localStorage.inCart)

for (let i = 0; i < items.length; i++) {
    insRecap.insertAdjacentHTML('beforeend', `
    <div class='row'>
        <div class='col-3 text-center'>
            ${items[i].name}
        </div>
        <div class='col-3 text-center'>
            ${items[i].color}r
        </div>
        <div class='col-3 text-center'>
            ${items[i].qty}
        </div>
        <div class='col-3 text-center'>
            ${items[i].qty * items[i].price}
        </div>
    </div>
    `)
}