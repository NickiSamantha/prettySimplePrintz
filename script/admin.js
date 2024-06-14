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
}
// Function to open the Add Product modal
function openAddModal() {
    let productModalAdd = new bootstrap.Modal(document.getElementById('productModalAdd'));
    productModalAdd.show();
}

// Function to open the Edit Product modal
function openEditModal(index) {
    let product = products[index];
    document.getElementById('productNameEdit').value = product.productName;
    document.getElementById('productCategoryEdit').value = product.category;
    document.getElementById('productDescriptionEdit').value = product.description;
    document.getElementById('productAmountEdit').value = product.amount;
    document.getElementById('productImageEdit').value = product.img_url;

    let saveBtnEdit = document.getElementById('saveProductBtnEdit');
    saveBtnEdit.dataset.productId = product.id; // Set productId in dataset for update

    let productModalEdit = new bootstrap.Modal(document.getElementById('productModalEdit'));
    productModalEdit.show();
}
// Event listeners
document.getElementById('addProductBtn').addEventListener('click', openAddModal);

// Function to add a new product
function addProduct() {
    let productName = document.getElementById('productNameAdd').value;
    let productCategory = document.getElementById('productCategoryAdd').value;
    let productDescription = document.getElementById('productDescriptionAdd').value;
    let productAmount = parseFloat(document.getElementById('productAmountAdd').value);
    let productImage = document.getElementById('productImageAdd').value;

    let newProductId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    let newProduct = new Product(newProductId, productName, productCategory, productDescription, productAmount, productImage);

    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts(products);

    let successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();

    // Close modal and redirect after 2 seconds
    setTimeout(() => {
        successModal.hide();
        let productModalAdd = new bootstrap.Modal(document.getElementById('productModalAdd'));
        productModalAdd.hide();
        window.location.href = 'admin.html'; // Redirect to admin page
    }, 2000);
}

// Event listener for editing product button in the table
function editProduct(index) {
    openEditModal(index);
}
// Event listener for updating a product
document.getElementById('saveProductBtnEdit').addEventListener('click', function() {
    let productId = this.dataset.productId;
    let productIndex = products.findIndex(p => p.id === parseInt(productId));
    if (productIndex !== -1) {
        updateProduct(productIndex, productId);
    } else {
        console.error(`Product with ID ${productId} not found.`);
    }
});

// Function to update a product
function updateProduct(index, productId) {
    products[index].productName = document.getElementById('productNameEdit').value;
    products[index].category = document.getElementById('productCategoryEdit').value;
    products[index].description = document.getElementById('productDescriptionEdit').value;
    products[index].amount = parseFloat(document.getElementById('productAmountEdit').value);
    products[index].img_url = document.getElementById('productImageEdit').value;

    localStorage.setItem('products', JSON.stringify(products));
    displayProducts(products);

    let productModalEdit = new bootstrap.Modal(document.getElementById('productModalEdit'));
    productModalEdit.hide();
}
// Initial display of products on page load
window.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
});

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

//counter
window.onload = () => {
    let totalQuantity = 0;
    let checkoutItems = JSON.parse(localStorage.getItem("checkout")) || [];
    checkoutItems.forEach(item => {
        totalQuantity += item.qty || 0;
    });
    document.querySelector("[counter]").textContent = totalQuantity;
    displayProducts(products); 
};

