const CardProduct = () => {
    const authUser = JSON.parse(localStorage.getItem("user_id"));
    fetch(`http://127.0.0.1:8000/order/orders/?user=${authUser}`)
    .then((res) => res.json())
    .then((products) => {
        
        const allCart = document.getElementById("productCart"); 
        products.forEach((product) => {
       
            fetch(`http://127.0.0.1:8000/product/product/${product.product}/`)
            .then((res) => res.json())
            .then((productdetail) => { 
                console.log(productdetail.price); 
             
                const colorName = product.color; 
                
                const div = document.createElement("div");
                div.innerHTML = `
                    <div class="product-item flex" style="margin-top: 30px; margin-left: 145px; width: 80%; box-shadow: 4px 4px 4px 4px gray; padding: 2px; background-color: rgb(119, 206, 206); justify-content: space-between;">
                        <div class="flex">
                            <div>
                                <img class="w-20 h-20" src="${productdetail.image}" alt="${productdetail.title}">
                            </div>
                            <div>
                                <h1 class="text-2xl font-bold ml-5">${productdetail.title}</h1>
                                <div class="flex gap-2 ml-5 mt-2">
                                    <h1 class="text-xl">Color: ${product.color} |</h1> 
                                    <h1 class="text-xl">Size: ${product.size} |</h1>
                                    <h1 class="text-xl">${product.status}</h1>
                                </div>
                            </div>
                        </div>
                        <div class="flex gap-5">
                            <div>
                                <h1 class="text-xl">Price: $${productdetail.price}</h1>
                                <h1 class="text-xl mt-2">Qty: ${product.quantity}</h1>
                            </div>
                            <div>
                                <button style="margin-top: 18px;" type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onclick="deletcard(${product.id}, event)">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                `;

                // Append the created div to the productCart element
                allCart.appendChild(div);
            });
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

const deletcard = (productId, event) => {    
    console.log(productId)
    const token = localStorage.getItem("authToken");
    fetch(`http://127.0.0.1:8000/order/orders/${productId}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`, 
        }
    })
    .then((response) => {
        if (response.ok) {
            const itemElement = event.target.closest(".product-item"); 
            itemElement.remove();  // Remove the item from the DOM
        } else {
            console.error("Failed to delete order.");
        }
    })
    .catch((error) => {
        console.error("Error deleting cart item:", error);
    });
};
deletcard();
CardProduct();
