req.onreadystatechange = function () {
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
