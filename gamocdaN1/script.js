// Objective: შექმენით ონლაინ მაღაზიის აპლიკაცია, სადაც მომხმარებელს შეუძლია პროდუქტების კალათაში დამატება/წაშლა/რაოდენობის განახლება.

// Requirements:
// 1. ძირითადი ფუნქციები: API-ის გამოყენებით წამოიღეთ პროდუქტები და გამოიტანეთ საიტზე.
// თითოეულ პროდუქტს უნდა ჰქონდეს კალათაში დამატების ღილაკი. დაამატეთ კალათიდან პროდუქტის წაშლის ფუნქცია. კალათის თითოეული განახლებისას მონაცემები აუცილებლად უნდა შეინახოთ localStorage-ში. დამატეთ კალათაში ჩამატებული პროდუქტების რაოდენობის შეცვლის ფუნქცია. როდესაც პროდუქტის რაოდენობა გახდება ნულის ტოლი ის ავტომატურად უნდა წაიშალოს კალათიდან. 

// 2. დიზაინი: გასტილეთ საიტი ლამაზად. პროდუქტების გამოსატანათ გამოიყენეთ grid-ი. კარგი იქნება თუ დაამატებთ რესპონსივს.
// 3. დამატებითი ფუნქციები: დაამატეთ თითოეული პროდუქტისთვის ფასის გამოთვლა.(რაოდენობა * ფასზე). გამოითვალეთ კალათაში დამატებული პროდუქტების full price მათი რაოდენობის გათვალისწინებით

document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('products-grid');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    let products = [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    async function fetchProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            products = await response.json();
            displayProducts();
        } catch (error) {
            console.error('Error fetching products:', error);
            productsGrid.innerHTML = '<p>Error loading products. Please try again later.</p>';
        }
    }
    
    function displayProducts() {
        productsGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `).join('');
        
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                addToCart(productId);
            });
        });
    }
    
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        
        if (!product) return;
        
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        updateCart();
    }
    
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }
    
    function updateQuantity(productId, newQuantity) {
        const item = cart.find(item => item.id === productId);
        
        if (!item) return;
        
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            updateCart();
        }
    }
    
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartTotal.textContent = '0.00';
            return;
        }
        
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" width="50">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)} each</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <p class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
        
        document.querySelectorAll('.minus').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                const item = cart.find(item => item.id === productId);
                if (item) updateQuantity(productId, item.quantity - 1);
            });
        });
        
        document.querySelectorAll('.plus').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                const item = cart.find(item => item.id === productId);
                if (item) updateQuantity(productId, item.quantity + 1);
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                removeFromCart(productId);
            });
        });
    }
    
    function init() {
        fetchProducts();
        updateCart();
    }
    
    init();
});



























