// Select the spinner element
const spinner = document.querySelector('.spinner');

// Function to display the spinner
function showSpinner() {
    spinner.style.display = 'block';
}

// Function to hide the spinner
function hideSpinner() {
    spinner.style.display = 'none';
}

// Select elements using querySelector
let container = document.querySelector('[data-ourStore]');
let searchProduct = document.querySelector('[data-searchProduct]');
let errorContainer = document.getElementById('searchError'); // Define the error container

let sortingByAmount = document.querySelector('[data-sorting]');
let checkoutItems = JSON.parse(localStorage.getItem('checkout')) || [];

let wrapper = document.querySelector('[data-recentProducts]');
let products = JSON.parse(localStorage.getItem('products')) || [];

// Current year
document.querySelector('[currentYear]').textContent = new Date().getUTCFullYear();

// Product constructor function
class Product {
    constructor(id, productName, category, description, amount, img_url) {
        this.id = id;
        this.productName = productName;
        this.category = category;
        this.description = description;
        this.amount = parseFloat(amount);
        this.img_url = img_url;
    }
}

// Function to display products in the admin table
function displayProducts(productsArray) {
    let productTableBody = document.querySelector('#productTableBody');
    productTableBody.innerHTML = '';
    productsArray.forEach((product, index) => {
        if (product.amount !== null) {
            productTableBody.innerHTML += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.productName}</td>
                    <td><img src="${product.img_url}" alt="${product.productName}" class="img-fluid" style="max-width: 100px;"></td>
                    <td>${product.category}</td>
                    <td>R${product.amount.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-dark btn-sm mb-2 mt-2" onclick="editProduct(${index})">Edit</button>
                        <button class="btn btn-danger btn-sm mb-2 mt-2" onclick="deleteProduct(${index})">Delete</button>
                    </td>
                </tr>
            `;
        } else {
            console.log(`Product ${product.productName} has no amount`);
        }
    });

    if (productsArray.length === 0) {
        productTableBody.innerHTML = "<tr><td colspan='6'>No products found.</td></tr>";
    }

    // Hide the spinner after products are displayed
    hideSpinner();
}

// Function to add a new product
function addProduct() {
    // Show the spinner before adding a product
    showSpinner();

    let productName = document.querySelector('#productName').value;
    let productCategory = document.querySelector('#productCategory').value;
    let productDescription = document.querySelector('#productDescription').value;
    let productAmount = document.querySelector('#productAmount').value;
    let productImage = document.querySelector('#productImage').value;

    let newProduct = new Product(
        products.length + 1,
        productName,
        productCategory,
        productDescription,
        productAmount,
        productImage
    );

    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts(products);
    document.querySelector('#productForm').reset();
    let successModal = new bootstrap.Modal(document.getElementById('successModal'));
    let productModal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
    productModal.hide();
    successModal.show();
    // Redirect to admin page after 2 seconds
    setTimeout(() => {
        successModal.hide();
        window.location.href = 'admin.html';
    }, 2000);
}

// Function to edit a product
function editProduct(index) {
    let product = products[index];
     
    document.querySelector('#productName').value = product.productName;
    document.querySelector('#productCategory').value = product.category;
    document.querySelector('#productDescription').value = product.description;
    document.querySelector('#productAmount').value = product.amount;
    document.querySelector('#productImage').value = product.img_url;

    document.querySelector('#saveProductBtn').innerText = 'Update Product';
    document.querySelector('#saveProductBtn').onclick = function() {
        updateProduct(index); 
    };
    let productModal = new bootstrap.Modal(document.getElementById('productModal'));
    productModal.show();
}

// Function to update a product
function updateProduct(index) {
    products[index].productName = document.querySelector('#productName').value;
    products[index].category = document.querySelector('#productCategory').value;
    products[index].description = document.querySelector('#productDescription').value;
    products[index].amount = parseFloat(document.querySelector('#productAmount').value);
    products[index].img_url = document.querySelector('#productImage').value;

    localStorage.setItem('products', JSON.stringify(products));
    displayProducts(products);
    document.querySelector('#productForm').reset();
    let productModal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
    productModal.hide();
}

// Function to delete a product
function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts(products);
}

// Function to sort products by amount
let isToggle = false;
function sortProducts() {
    if (!products) {
        alert('Please try again later');
        return;
    }
    if (!isToggle) {
        products.sort((a, b) => b.amount - a.amount);
        sortingByAmount.textContent = 'Sorted by highest amount';
    } else {
        products.sort((a, b) => a.amount - b.amount);
        sortingByAmount.textContent = 'Sorted by lowest amount';
    }
    isToggle = !isToggle;
    displayProducts(products);
}
// Function to handle product search
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
        errorContainer.textContent = e.message || 'Please try again later';
        errorContainer.computedStyleMap.display = 'block'
    }
});

// Function to add a product to the cart
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
            document.querySelector('[counter]').textContent = checkoutItems.length || 0;
            updateCheckoutTable();
        } else {
            throw new Error("Product not found");
        }
    } catch (e) {
        console.error("Unable to add to cart:", e);
    }
}

// Event listeners
document.querySelector('#saveProductBtn').addEventListener('click', addProduct);
document.querySelector('#sortButton').addEventListener('click', sortProducts);

// Counter
window.onload = () => {
    // Show the spinner before loading products from local storage
    showSpinner();

    let totalQuantity = 0;
    let checkoutItems = JSON.parse(localStorage.getItem("checkout")) || [];
    checkoutItems.forEach(item => {
        totalQuantity += item.qty || 0;
    });
    document.querySelector("[counter]").textContent = totalQuantity;
    displayProducts(products); 
};

