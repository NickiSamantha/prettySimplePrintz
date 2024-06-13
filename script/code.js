// Create products and store it on the local storage
let wrapper = document.querySelector('[recentProducts]')
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
// Current year
document.querySelector('[currentYear]').textContent =
    new Date().getUTCFullYear()
function recentProducts() {
    try {
        let arrSize = products.length
        let latestProducts = products.reverse().slice(0, arrSize >> 1)
        latestProducts.forEach(product => {
            wrapper.innerHTML += `
            
            <div class="products col-md-4 pt-4 pb-4 mb-3">
            <img src="${product.img_url}" class="card-img-top" alt="${product.productName}" loading='lazy'>
            <div class="card-body text-center">
                <h4 class="card-title pt-4">${product.productName}</h4>
                <button class="btn btn-primary view-product-btn" data-id="${product.id}">View Product</button>

            </div>
            </div>
    `
        })
    } catch (e) {
        wrapper.textContent = "Please contact the administrator"
        setTimeout(() => {
            location.reload()
        },
            2000
        )
    }
}
recentProducts()
// Counter
window.onload = () => {
    document.querySelector('[counter]').textContent = JSON.parse(localStorage.getItem('checkout'))
        ? JSON.parse(localStorage.getItem('checkout')).length
        : 0
}
wrapper.addEventListener('click', (e) => {
  if (e.target.classList.contains('view-product-btn')) {
    const productId = e.target.dataset.id;
    window.location.href = `/products/${productId}`;
  }
})

