let container = document.querySelector('[ourStore]');
let searchProduct = document.querySelector('[searchProduct]');
let sortingByAmount = document.querySelector('[sorting]');
let products = JSON.parse(localStorage.getItem('products')) || [];
let checkoutItems = JSON.parse(localStorage.getItem('checkout')) || [];

// Current year
document.querySelector('[currentYear]').textContent = new Date().getUTCFullYear();

function displayProducts(productsArray) {
    container.innerHTML = "";
    try {
        productsArray.forEach(product => {
            container.innerHTML += `
                <div class="col-sm-4">
                    <img src="${product.img_url}" class="card-img-top" alt="${product.productName}" loading='lazy'>
                    <div class="card-body">
                        <h5 class="card-title">${product.productName}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">
                            <span class=" fw-bold">Amount</span>
                            R${product.amount}
                        </p>
                        <button type='button' class="btn" onclick='addToCart(${JSON.stringify(product)})'>Add to cart</button>
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

function addToCart(product) {
    try {
        checkoutItems.push(product);
        localStorage.setItem('checkout', JSON.stringify(checkoutItems));
        document.querySelector('[counter]').textContent = checkoutItems.length || 0;
    } catch (e) {
        alert("Unable to add to cart");
    }
}

window.onload = () => {
    document.querySelector('[counter]').textContent = checkoutItems.length || 0;
}


// if (typeof(Storage) !== "undefined") {
//     let container = document.getElementById('ourStore');
//     let searchProduct = document.getElementById('searchProduct');
//     let sortingByAmount = document.getElementById('sorting');
//     let products = JSON.parse(localStorage.getItem('products')) || [];
//     let checkoutItems = JSON.parse(localStorage.getItem('checkout')) || [];

//     // Current year
//     document.getElementById('currentYear').textContent = new Date().getUTCFullYear();

//     function displayProducts(productsArray) {
//         container.innerHTML = "";
//         try {
//             productsArray.forEach(product => {
//                 container.innerHTML += `
//                     <div class="col-sm-4">
//                         <img src="${product.img_url}" class="card-img-top" alt="${product.productName}" loading='lazy'>
//                         <div class="card-body">
//                             <h5 class="card-title">${product.productName}</h5>
//                             <p class="card-text">${product.description}</p>
//                             <p class="card-text">
//                                 <span class="shadow text-success fw-bold">Amount</span>
//                                 R${product.amount}
//                             </p>
//                             <button type='button' class="btn btn-success" onclick='addToCart(${JSON.stringify(product)})'>Add to cart</button>
//                         </div>
//                     </div>
//                 `;
//             });

//             if (productsArray.length === 0) {
//                 container.textContent = "No products found.";
//             }
//         } catch (e) {
//             container.textContent = "Please try again later.";
//         }
//     }
//     displayProducts(products);

//     searchProduct.addEventListener('keyup', () => {
//         try {
//             let searchValue = searchProduct.value.toLowerCase();
//             if (searchValue.length < 1) {
//                 displayProducts(products);
//                 return;
//             }
//             let filteredProducts = products.filter(product => product.productName.toLowerCase().includes(searchValue));
//             displayProducts(filteredProducts);
//             if (filteredProducts.length === 0) {
//                 throw new Error(`${searchProduct.value} was not found.`);
//             }
//         } catch (e) {
//             container.textContent = e.message || 'Please try again later';
//         }
//     });

//     let isToggle = false;
//     sortingByAmount.addEventListener('click', () => {
//         try {
//             if (!products) throw new Error('Please try again later');
//             if (!isToggle) {
//                 products.sort((a, b) => b.amount - a.amount);
//                 sortingByAmount.textContent = 'Sorted by highest amount';
//             } else {
//                 products.sort((a, b) => a.amount - b.amount);
//                 sortingByAmount.textContent = 'Sorted by lowest amount';
//             }
//             isToggle = !isToggle;
//             displayProducts(products);
//         } catch (e) {
//             container.textContent = e.message || 'We are working on this issue';
//         }
//     });

//     function addToCart(product) {
//         try {
//             checkoutItems.push(product);
//             localStorage.setItem('checkout', JSON.stringify(checkoutItems));
//             let counter = document.getElementById('counter');
//             if (counter) counter.textContent = checkoutItems.length || 0;
//         } catch (e) {
//             alert("Unable to add to cart");
//         }
//     }

//     window.onload = () => {
//         let counter = document.getElementById('counter');
//         if (counter) counter.textContent = checkoutItems.length || 0;
//     }
// } else {
//     alert("Sorry, your browser does not support Web Storage. Please use a modern browser.");
// }

