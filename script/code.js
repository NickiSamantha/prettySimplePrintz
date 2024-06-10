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
            
            <div class="col-md-6">
            <img src="${product.img_url}" class="card-img-top" alt="${product.productName}" loading='lazy'>
            <div class="card-body">
                <h5 class="card-title">${product.productName}</h5>
                <p class="card-text">${product.description}</p>
            </div>
            </div>
    `
        })
    } catch (e) {
        wrapper.textContent = "Please contact our administrator"
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