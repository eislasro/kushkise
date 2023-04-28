

function loadRandomProducts(category, id) {
    const currency = localStorage.getItem('currency');
    const productsShow = category === 'all'
                ? seleccionarObjetosAleatorios(products())
                : seleccionarObjetosAleatorios(products().filter(product => product.category === category));
    var html = ``;

    productsShow.forEach((product)=>{
        let colors = ``;
        product.colors.forEach((color)=> colors += `<a href="#color_${product.reference}_${color}" id="color_${product.reference}_${color}" style="background: #${color};"><span class="sr-only">Color name</span></a>`)
        html += `<div class="product product-2 product-small">
                    <figure class="product-media">
                        <a href="product.html?reference=${product.reference}">
                            <img src="assets/images/product/${product.reference}_1.jpg" class="product-img-small" alt="Product image" class="product-image">
                        </a>


                        <div class="product-action">
                            <a onClick="addCart('${product.reference}')" class="btn-product btn-cart mouse-pointer" title="Agregar al carrito"><span>Agregar al carrito</span></a>
                        </div><!-- End .product-action -->
                    </figure><!-- End .product-media -->

                    <div class="product-body">
                        
                        <h3 class="product-title"><a href="product.html?reference=${product.reference}">${product.name}</a></h3><!-- End .product-title -->
                        <div class="product-price">
                            ${currency} ${formatNumber(product[currency] ?? 0)}
                        </div><!-- End .product-price -->
                        <div class="ratings-container">
                            <div class="ratings">
                                <div class="ratings-val" style="width: ${product.stars * 100 / 5}%;"></div><!-- End .ratings-val -->
                            </div><!-- End .ratings -->
                            <span class="ratings-text">( ${product.reference} )</span>
                        </div><!-- End .rating-container -->

                        <div class="product-nav product-nav-dots">
                           ${colors}
                        </div><!-- End .product-nav -->
                    </div><!-- End .product-body -->
                </div><!-- End .product -->`
    })
    $(`#${id}`).html(html)
    
}

function addCart(productReference){
    var cartProducts = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    var added = false;
    console.log(cartProducts);
    cartProducts = cartProducts.map((product) => {
        if(product.reference == productReference){
            product.quantity = product.quantity ? product.quantity + 1 : 1;
            added = true
        } 
        return product
    })

    if(!added){
        cartProducts.push({reference: productReference, quantity: 1})
    }
    localStorage.setItem('cart', JSON.stringify(cartProducts))
    Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        showConfirmButton: false,
        timer: 1000
      })
    loadCartProducts()
}

function removeCart(productReference){
    var cartProducts = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    console.log(cartProducts);
    cartProducts = cartProducts.filter((product) => product.reference != productReference)
    
    localStorage.setItem('cart', JSON.stringify(cartProducts))
    
    loadCartProducts()
}
function removeCartView(productReference){
    var cartProducts = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    console.log(cartProducts);
    cartProducts = cartProducts.filter((product) => product.reference != productReference)
    
    localStorage.setItem('cart', JSON.stringify(cartProducts))
    loadCartProducts()
    loadViewCartProducts()
    quantityInputs()
}

function loadCartProducts(){
    const currency = localStorage.getItem('currency') ?? 'CLP';
    var cartProducts = localStorage.getItem('cart')
    if(cartProducts !== null){
        //dropdown-cart-products
        cartProducts = JSON.parse(cartProducts);
        var total = 0;
        var quantity = 0;
        var html = ``;

        const productsObj = {};
            products().forEach(item => {
            productsObj[item.reference] = item;
            });

        const result = [];
        cartProducts.forEach(item => {
        let product = productsObj[item.reference];
        if (product) {
            var obj = {
                reference: item.reference,
                name: product.name,
                quantity: item.quantity
            };
            obj[currency] = product[currency]

            result.push(obj);
        }
        });

        result.forEach((product)=> {
            html += `<div class="product">
                        <div class="product-cart-details">
                            <h4 class="product-title">
                                <a href="product.html?reference=${product.reference}">${product.name}</a>
                            </h4>

                            <span class="cart-product-info">
                                <span class="cart-product-qty">${product.quantity}</span>
                                x ${currency} ${formatNumber(product[currency] ?? 0)}
                            </span>
                        </div><!-- End .product-cart-details -->

                        <figure class="product-image-container">
                            <a href="product.html" class="product-image">
                                <img class="product-img-cart" src="assets/images/product/${product.reference}_1.jpg" alt="product">
                            </a>
                        </figure>
                        <a class="btn-remove" onClick="removeCart('${product.reference}')" title="Remove Product"><i class="icon-close"></i></a>
                    </div><!-- End .product -->`
            total += product[currency] ? product[currency] * product.quantity : 0;
            quantity += parseInt(product.quantity);
        })
        $('.dropdown-cart-products').html(html)
        $('.cart-count').html(`${quantity}`)
        $('.cart-total-price').html(`${currency} ${formatNumber(total ?? 0)}`)

        if(quantity == 0){
            $('#checkout_btn').hide()
        }else{
            $('#checkout_btn').show()
        }
        
    }
}

function loadViewCartProducts(){
    const currency = localStorage.getItem('currency') ?? 'CLP';
    var cartProducts = localStorage.getItem('cart')
    if(cartProducts !== null){
        //dropdown-cart-products
        cartProducts = JSON.parse(cartProducts);
        var total = 0;
        var html = ``;

        const productsObj = {};
            products().forEach(item => {
            productsObj[item.reference] = item;
            });

        const result = [];
        cartProducts.forEach(item => {
        let product = productsObj[item.reference];
        if (product) {
            var obj = {
                reference: item.reference,
                name: product.name,
                quantity: item.quantity
            };
            obj[currency] = product[currency]

            result.push(obj);
        }
        });

        result.forEach((product)=> {
            html += `<tr>
                        <td class="product-col">
                            <div class="product">
                                <figure class="product-media">
                                    <a href="product.html?reference=${product.reference}">
                                        <img class="product-img-cart" src="assets/images/product/${product.reference}_1.jpg" alt="product">
                                    </a>
                                </figure>

                                <h3 class="product-title">
                                    <a href="product.html?reference=${product.reference}">${product.name}</a>
                                </h3><!-- End .product-title -->
                            </div><!-- End .product -->
                        </td>
                        <td class="price-col">${currency} ${formatNumber(product[currency] ?? 0)}</td>
                        <td class="quantity-col">
                            <div class="cart-product-quantity">
                                <input type="number" id="quantity_${product.reference}" onChange="updateCart('${product.reference}', ${product[currency]})" class="form-control" value="${product.quantity}" min="1" max="10" step="1" data-decimals="0">
                            </div><!-- End .cart-product-quantity -->
                        </td>
                        <td class="total-col" id="total_${product.reference}">${currency} ${formatNumber(product[currency] ? product[currency] * product.quantity : 0)}</td>
                        <td class="remove-col"><button onClick="removeCartView('${product.reference}')" class="btn-remove"><i class="icon-close"></i></button></td>
                    </tr>`
            total += product[currency] ? product[currency] * product.quantity : 0;
        })
        $('#cart-tbody').html(html)
        $('.total').html(`${currency} ${formatNumber(total ?? 0)}`)

    }
}

function updateCart(reference, price) {
    var quantity = $(`#quantity_${reference}`).val()
    var cartProducts = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    const currency = localStorage.getItem('currency') ?? 'CLP';
    
    console.log(cartProducts);
    var total = 0;
    cartProducts = cartProducts.map((product) => {
        if(product.reference == reference){
            product.quantity = quantity;
            total = price * quantity;
        } 
        return product
    })

    localStorage.setItem('cart', JSON.stringify(cartProducts))
    $(`#total_${reference}`).html(`${currency} ${formatNumber(total ?? 0)}`)
    loadCartProducts()
}

function seleccionarObjetosAleatorios(array) {
    const objetosSeleccionados = [];
    let objetosRestantes = [...array];
    const randomNumber = Math.random() * (8 - 5) + 5;
    
    for (let i = 0; i < randomNumber && objetosRestantes.length > 0; i++) {
      const indiceAleatorio = Math.floor(Math.random() * objetosRestantes.length);
      objetosSeleccionados.push(objetosRestantes[indiceAleatorio]);
      objetosRestantes = objetosRestantes.filter((_, index) => index !== indiceAleatorio);
    }
    
    return objetosSeleccionados;
  }


  function formatNumber(num) {
    const partes = num.toString().split('.');
    let numFormateado = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    if (partes.length === 2) {
        numFormateado += "," + partes[1].replace(/(\d{3})/g, "$1.");
    }

    return numFormateado;
  }
  

function loadProductInfo() {
    const currency = localStorage.getItem('currency') ?? 'CLP';

    // Obtener la URL actual
    var urlParams = new URLSearchParams(window.location.search);

    // Obtener el valor del parámetro "reference"
    var reference = urlParams.get('reference');
    console.log(reference);
    loadRandomProducts('all', 'maylike-products');

    
    var productFilter = products().filter((prod)=>prod.reference == reference);
    if(productFilter != null){
        var product = productFilter[0]
        var htmlImages = ``;
        for (let index = 0; index < product.images; index++) {
            htmlImages += `<figure class="product-separated-item">
                            <img src="assets/images/product/${reference}_${index+1}.jpg" data-zoom-image="assets/images/product/${reference}_${index+1}.jpg" alt="product image">
                            </figure>
                            `
        }

        let htmlStars = `<div class="ratings">
                            <div class="ratings-val" style="width: ${product.stars * 100 / 5}%;"></div><!-- End .ratings-val -->
                        </div><!-- End .ratings -->`

        let colors = ``;
        product.colors.forEach((color)=> colors += `<a href="#color_${product.reference}_${color}" id="color_${product.reference}_${color}" style="background: #${color};"><span class="sr-only">Color name</span></a>`)

        let category = categories().filter((cat)=>cat.name == product.category);
        let htmlCat = `<span>Categoria:</span>
        <a href="category.html?category=${category ? category[0].id : 0}">${product.category}</a>
        <span>Marca:</span>
        <a href="category.html?brand=${product.brand}">${product.brand}</a>`

        $('.product-title').html(product.name)
        $('.product-gallery').html(htmlImages)
        $('#product-stars').html(htmlStars)
        $('.new-price').html(`${currency} ${formatNumber(product[currency] ?? 0)}`)
        $('.product-content').html(`<p>${product.short_description}</p>`)
        $('#product_colors').html(colors)
        $('.product-cat').html(htmlCat)
        $('#product-description').html(product.description)
        $('#product-aditional').html(product.aditional)
        console.log(product.aditional);
        
    }

}

function addCartFromDetail(){
    var urlParams = new URLSearchParams(window.location.search);

    // Obtener el valor del parámetro "reference"
    var reference = urlParams.get('reference');
    console.log(reference);
    addCart(reference)
}