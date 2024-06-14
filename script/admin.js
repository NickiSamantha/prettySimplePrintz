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
    

    let productName = document.querySelector('#productName').value;
    let productCategory = document.querySelector('#addproductCategory').value;
    let productDescription = document.querySelector('#addproductDescription').value;
    let productAmount = document.querySelector('#addproductAmount').value;
    let productImage = document.querySelector('#addproductImage').value;

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
    
     // Close the modal after adding the product
     let addProductModal = new bootstrap.Modal(document.getElementById('addProductModal'));
     addProductModal.hide();
         // Show success modal
    showSuccessModal('Product added successfully!');
}
 
// Event listener for saving new product
document.getElementById('saveAddProductBtn').addEventListener('click', function() {
    addProduct();
});

// Function to show success modal
function showSuccessModal(message) {
    let successModal = new bootstrap.Modal(document.getElementById('successModal'));
    let successModalMessage = document.getElementById('successModalMessage');
    successModalMessage.textContent = message;
    successModal.show();
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
                        <button class="btn btn-dark btn-sm mb-2 mt-2" onclick="editProductModal(${index})">Edit</button>
                        <button class="btn btn-danger btn-sm mb-2 mt-2" onclick="deleteProduct(${index})">Delete</button>
                    </td>
                </tr>
            `;
        } else {
            console.log(`Product ${product.productName} has no amount`);
        }
    });

    if (productsArray.length === 0) {
        productTableBody.innerHTML = "<tr><td colspan='6'>Product not found</td></tr>";
    }
}
    // document.querySelector('#productForm').reset();

    // let successModal = new bootstrap.Modal(document.getElementById('successModal'));
    // let productModal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
    // productModal.hide();
    // successModal.show();  


// Reset form fields when Add Product modal is shown
document.getElementById('addProductModal').addEventListener('show.bs.modal', function() {
    document.getElementById('addProductForm').reset();
});


// Function to edit a product
function editProductModal(index) {
    let product = products[index];

    document.getElementById('editProductId').value = index;
    document.getElementById('editProductName').value = product.productName;
    document.getElementById('editProductCategory').value = product.category;
    document.getElementById('editProductDescription').value = product.description;
    document.getElementById('editProductAmount').value = product.amount.toFixed(2);
    document.getElementById('editProductImage').value = product.img_url;
   
    let editProductModal = new bootstrap.Modal(document.getElementById('editProductModal'));
    editProductModal.show();
}

// Function to update a product
function updateProduct() {
    let index = document.getElementById('editProductId').value;
    products[index].productName = document.getElementById('editProductName').value;
    products[index].category = document.getElementById('editProductCategory').value;
    products[index].description = document.getElementById('editProductDescription').value;
    products[index].amount = parseFloat(document.getElementById('editProductAmount').value);
    products[index].img_url = document.getElementById('editProductImage').value;

    // Save updated products array to local storage
    localStorage.setItem('products', JSON.stringify(products));

    // Display updated products in the table
    displayProducts(products);

      // Reset form and close modal
      document.getElementById('editProductForm').reset();
      let editProductModal = new bootstrap.Modal(document.getElementById('editProductModal'));
      editProductModal.hide();
  
      // Show success modal
      showSuccessModal('Product updated successfully!');
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
        errorContainer.style.display = 'block'
    }
});

// Event listener for adding new product
document.getElementById('saveAddProductBtn').addEventListener('click', function() {
    addProduct();
    let addProductModal = new bootstrap.Modal(document.getElementById('addProductModal'));
    addProductModal.show();
});

// Event listener for updating product
document.getElementById('saveEditProductBtn').addEventListener('click', updateProduct);

// Counter
window.onload = () => {
    let totalQuantity = 0;
    let checkoutItems = JSON.parse(localStorage.getItem("checkout")) || [];
    checkoutItems.forEach(item => {
        totalQuantity += item.qty || 0;
    });
    
    document.querySelector("[counter]").textContent = totalQuantity;
   
   
        displayProducts(products);
};



