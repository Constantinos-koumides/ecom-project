let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart  = document.querySelector("#close-cart");
let PaypalButton = document.querySelector('#paypal-button-container'); 

cartIcon.onclick = () => {
    cart.classList.add('active');
};
closeCart.onclick = () => {
    cart.classList.remove('active');
};
if (document.readyState == 'loading'){
   document.addEventListener('DOMContentLoaded', ready);
}else{
    ready()
}
function ready(){
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i= 0; i< removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i= 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    var addCart = document.getElementsByClassName('add-cart');
    for (var i= 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
}
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart (title, price, productImg);
    updateTotal();
    
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    if (buttonClicked) {
        buttonClicked.parentElement.remove();
        updateTotal();
    }
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}
function  addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i =0; i< cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            alert('You have already added this item to cart');
            return;
        }
    }
    var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price"> ${price}</div>
        <input type="number" value="1" class="cart-quantity" onchange="updateCartQuantity(this)" />
    </div>
    <i class='bx bxs-trash cart-remove'></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName('cart-remove')[0]
        .addEventListener('click', removeCartItem);
    cartShopBox
        .getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', quantityChanged);
}

function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('€',''));
        var quantity = quantityElement.value;
        total += price*quantity;
    }
    document.getElementsByClassName('total-price')[0].innerText = '€'+ total;
    total = Math.round(total*100)/ 100;

}
//----------------------
document.addEventListener('DOMContentLoaded', ready);

function ready() {
    // Load cart from localStorage
    loadCart();

    // Existing code
    let cartIcon = document.querySelector("#cart-icon");
    let cart = document.querySelector(".cart");
    let closeCart = document.querySelector("#close-cart");

    cartIcon.onclick = () => {
        cart.classList.add('active');
    };
    closeCart.onclick = () => {
        cart.classList.remove('active');
    };

    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
}

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    if (buttonClicked) {
        buttonClicked.parentElement.remove();
        updateTotal();
    }
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert('You have already added this item to cart');
            return;
        }
    }
    var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity" onchange="updateCartQuantity(this)" />
    </div>
    <i class='bx bxs-trash cart-remove'></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName('cart-remove')[0]
        .addEventListener('click', removeCartItem);
    cartShopBox
        .getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', quantityChanged);

    saveCart();
}

function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('€', ''));
        var quantity = quantityElement.value;
        total += price * quantity;
    }
    document.getElementsByClassName('total-price')[0].innerText = '€' + total;
    total = Math.round(total * 100) / 100;

    saveCart();
}

function saveCart() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var cart = [];
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var title = cartBox.getElementsByClassName('cart-product-title')[0].innerText;
        var price = cartBox.getElementsByClassName('cart-price')[0].innerText;
        var quantity = cartBox.getElementsByClassName('cart-quantity')[0].value;
        var imgSrc = cartBox.getElementsByClassName('cart-img')[0].src;
        cart.push({ title, price, quantity, imgSrc });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    var cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
        for (var i = 0; i < cart.length; i++) {
            var item = cart[i];
            addProductToCart(item.title, item.price, item.imgSrc);
            var cartContent = document.getElementsByClassName('cart-content')[0];
            var cartBoxes = cartContent.getElementsByClassName('cart-box');
            var cartBox = cartBoxes[cartBoxes.length - 1];
            cartBox.getElementsByClassName('cart-quantity')[0].value = item.quantity;
        }
        updateTotal();
    }
}
//0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
//00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
paypal.Buttons({
    createOrder: function (data, actions) {
        // Calculate total dynamically
        let totalElement = document.querySelector('.total-price');
        if (!totalElement) {
            console.error('Total price element not found');
            return;
        }

        let total = totalElement.innerText.replace('€', '').trim();
        
        // Ensure total is a valid number
        if (isNaN(total) || total <= 0) {
            console.error('Invalid total amount:', total);
            return;
        }

        return actions.order.create({
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',  // Set currency to Euro
                    value: total
                }
            }]
        }).catch(function(err) {
            console.error('Order creation failed:', err);
        });
    },
    onApprove: function (data, actions) {
        return actions.order.capture().catch(function(err) {
            console.error('Order capture failed:', err);
        });
    }
}).render('#paypal');

