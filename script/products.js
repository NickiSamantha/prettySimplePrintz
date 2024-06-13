let container = document.querySelector('[ourStore]');
let searchProduct = document.querySelector('[searchProduct]');
let sortingByAmount = document.querySelector('[sorting]');
let filterCategory = document.querySelector('[filterCategory]');
let checkoutItems = JSON.parse(localStorage.getItem('checkout')) || [];
let wrapper = document.querySelector('[recentProducts]')
let counterElement = document.querySelector('[counter]');
let products =
    JSON.parse(localStorage.getItem('products'))
        ? JSON.parse(localStorage.getItem('products'))
        : localStorage.setItem('products',
            JSON.stringify(
                [
                    {
                        id: 1,
                        productName : "Discipline T-shirt",
                        category: "Vinyl Prints" ,
                        description: "Women's slimfit T-shirt. 100% Cotton White T-shirt. Size range SS to XXXL. ",
                        amount : 250.00,
                        img_url: "https://nickisamantha.github.io/allImages/images/pspp3.jpg" 
                    },
                    {
                        id: 2,
                        productName : "Best Dad T-shirt",
                        category : "Vinyl Prints" ,
                        description: "Men's Round Neck Slimfit T-shirt. Size range SS to XXXL. Colors displayed is colors available.",
                        amount : 250.00,
                        img_url: "https://nickisamantha.github.io/allImages/images/pspp4.jpg" 
                    },
                    {
                        id: 3,
                        productName : "World's #1 DAD Ceremic Mug",
                        category: "Sublimation" ,
                        description: "Standard sized ceremic mug with a sublimation print.",
                        amount: 150.00,
                        img_url: "https://nickisamantha.github.io/allImages/images/pspp1.jpg" 
                    },
                    {
                        id: 4,
                        productName : "Dad est'20 Tumbler",
                        category: "Sublimation" ,
                        description: "1L insulated tumbler with a sublimation print. Perfect all year round. ",
                        amount: 350.00,
                        img_url: "https://nickisamantha.github.io/allImages/images/pspp2.jpg" 
                    },
                    {
                        id: 5,
                        productName : "Girl Boss Tumbler",
                        category: "Sublimation" ,
                        description: "250ml insulated tumbler with a sublimation print. Perfect all year round.",
                        amount : 300.00,
                        img_url: "https://nickisamantha.github.io/allImages/images/pspp5.jpg" 
                    },
                    {
                        id: 6,
                        productName : "Be Kind Keyring",
                        category : "Sublimation" ,
                        description : "White polymer keyrings with sublimation print on it.",
                        amount : 30.00,
                        img_url : "https://nickisamantha.github.io/allImages/images/pspp10.jpg" 
                    },
                    {
                        id: 7,
                        productName : "Positive Mind Keyring",
                        category : "Sublimation" ,
                        description : "White polymer keyrings with sublimation print on it.",
                        amount : 30.00,
                        img_url : "https://nickisamantha.github.io/allImages/images/pspp8.jpg" 
                    },
                    {
                        id: 8,
                        productName : "Pray more Keyring",
                        category : "Sublimation" ,
                        description : " White polymer keyrings with sublimation print on it.",
                        amount : 30.00,
                        img_url : "https://nickisamantha.github.io/allImages/images/pspp9.jpg" 
                    },
                    {
                        id: 9,
                        productName : "Always choose joy Keyring",
                        category : "Sublimation" ,
                        description : "White polymer keyrings with sublimation print on it.",
                        amount : 30.00,
                        img_url : "https://nickisamantha.github.io/allImages/images/pspp7.jpg" 
                    },
                    {
                        id: 10,
                        productName : "Focus on the good Keyring",
                        category : "Sublimation" ,
                        description : "White polymer keyrings with sublimation print on it.",
                        amount : 30.00,
                        img_url : "https://nickisamantha.github.io/allImages/images/pspp6.jpg" 
                    }
                ]
            )
        )

// Save default products to localStorage if not already present
if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(products));
}
// Current year
document.querySelector('[currentYear]').textContent = new Date().getUTCFullYear();

function displayProducts(productsArray) {
    container.innerHTML = "";
    try {
        productsArray.forEach(product => {
            container.innerHTML += `
                <div class="products col-sm-4">
                    <img src="${product.img_url}" class="card-img-top pt-4" alt="${product.productName}" loading='lazy'>
                    <div class="card-body">
                        <h5 class="card-title pt-4">${product.productName}</h5>
                        <p class="description card-text">${product.description}</p>
                        <p class="card-text">
                            <span class=" fw-bold">Amount</span>
                            R${product.amount}
                        </p>
                        <button type='button' class="btn btn-light " onclick='addToCart(${product.id})'>Add to Cart</button>
                    </div>
                </div>
            `;
        });

        if (productsArray.length === 0) {
            container.textContent = "No products found.";
        }
    } catch (e) {
        container.textContent = "Please try again later.";
    }
}
displayProducts(products);

searchProduct.addEventListener('keyup', () => {
    try {
        let searchValue = searchProduct.value.toLowerCase();
        if (searchValue.length < 1) {
            displayProducts(products);
            return;
        }
        let filteredProducts = products.filter(product => product.productName.toLowerCase().includes(searchValue));
        displayProducts(filteredProducts);
        if (filteredProducts.length === 0) {
            throw new Error(`${searchProduct.value} was not found.`);
        }
    } catch (e) {
        container.textContent = e.message || 'Please try again later';
    }
});

let isToggle = false;
sortingByAmount.addEventListener('click', () => {
    try {
        if (!products) throw new Error('Please try again later');
        if (!isToggle) {
            products.sort((a, b) => b.amount - a.amount);
            sortingByAmount.textContent = 'Sorted by highest amount';
        } else {
            products.sort((a, b) => a.amount - b.amount);
            sortingByAmount.textContent = 'Sorted by lowest amount';
        }
        isToggle = !isToggle;
        displayProducts(products);
    } catch (e) {
        container.textContent = e.message || 'We are working on this issue';
    }
});

filterCategory.addEventListener('change', () => {
    try {
        let selectedCategory = filterCategory.value;
        if (selectedCategory === "all") {
            displayProducts(products);
            return;
        }
        let filteredProducts = products.filter(product => product.category === selectedCategory);
        displayProducts(filteredProducts);
    } catch (e) {
        container.textContent = e.message || 'Please try again later';
    }
});

function addToCart(productId) {
    try {
        let product = products.find(p => p.id === productId);
        if (product) {
           
            let existingItemIndex = checkoutItems.findIndex(item => item.id === productId);
            if (existingItemIndex !== -1) {
                checkoutItems[existingItemIndex].qty += 1;
            } else {
                product.qty = 1;
                checkoutItems.push(product);
            }
            localStorage.setItem('checkout', JSON.stringify(checkoutItems));
        
            updateCounter();
        } else {
            throw new Error("Product not found");
        }
    } catch (e) {
        console.error("Unable to add to cart:", e);
    }
}

// Function to update cart counter
function updateCounter() {
    let totalItems = checkoutItems.reduce((sum, item) => sum + item.qty, 0);
    counterElement.textContent = totalItems;
}

window.onload = () => {
    document.querySelector('[counter]').textContent = checkoutItems.length || 0;
    
}