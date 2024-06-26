document.querySelector('[currentYear]').textContent = new Date().getUTCFullYear();

let checkoutItems = JSON.parse(localStorage.getItem('checkout')) || [];
let checkoutTable = document.getElementById('checkoutBody');
let totalAmountElement = document.getElementById('totalAmount');
let payNowBtn = document.getElementById('payNowBtn');
let clearBtn = document.getElementById('clearBtn');
let counterElement = document.getElementById('counter');

// Function to calculate total amount
function calculateTotalAmount() {
    let totalAmount = 0;
    checkoutItems.forEach(item => {
        totalAmount += item.amount * item.qty;
    });
    return totalAmount.toFixed(2);
}

// Function to update table and total amount
function updateCheckoutTable() {
    checkoutTable.innerHTML = "";
    checkoutItems.forEach(item => {
        let row = checkoutTable.insertRow();
        row.innerHTML = `
            <td>${item.productName}</td>
            <td>${item.category}</td>
            <td>${item.amount}</td>
            <td>${item.qty}</td>
            <td>${(item.amount * item.qty).toFixed(2)}</td>
         `;
    });
    totalAmountElement.textContent = calculateTotalAmount();
    updateCounter();
}
// Function to update cart counter
function updateCounter() {
    let totalItems = checkoutItems.reduce((sum, item) => sum + item.qty, 0);
    counterElement.textContent = totalItems;
}

// Function to handle payment
function payNow() {
    if (checkoutItems.length === 0) {
        let emptyCartModal = new bootstrap.Modal(document.getElementById('emptyCartModal'));
        emptyCartModal.show();
    } else {
        let paymentSuccessModal = new bootstrap.Modal(document.getElementById('paymentSuccessModal'));
        paymentSuccessModal.show();
        checkoutItems = [];
        localStorage.setItem('checkout', JSON.stringify(checkoutItems));
        updateCheckoutTable();
    }
}
function clearCart() {
    let clearCartModal = new bootstrap.Modal(document.getElementById('clearCartModal'));
    clearCartModal.show();
}

document.getElementById('confirmClearBtn').addEventListener('click', function() {
    checkoutItems = [];
    localStorage.setItem('checkout', JSON.stringify(checkoutItems));
    updateCheckoutTable();
    let clearCartModal = bootstrap.Modal.getInstance(document.getElementById('clearCartModal'));
    clearCartModal.hide();
});

// Display initial table and total amount
updateCheckoutTable();
payNowBtn.addEventListener('click', payNow);
clearBtn.addEventListener('click', clearCart);