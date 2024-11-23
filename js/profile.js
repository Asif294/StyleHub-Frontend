const ProfileDetails = () => {
    const authUser = JSON.parse(localStorage.getItem("user_id"));
    console.log(authUser);
    
    fetch(`http://127.0.0.1:8000/user/user/${authUser}/`)

    .then((res) => res.json())
    .then((detail) => {
        
        const details = document.getElementById("user-profile");
        
        details.innerHTML = `
            <h2 class="text-xl font-semibold mb-2 text-gray-800">Username :  ${ detail.username}</h2>
            <h1 class="text-lg font-medium mb-2 text-gray-700">First Name :  ${ detail.first_name}</h1>
            <h1 class="text-lg font-medium mb-2 text-gray-700">Last Name :  ${ detail.last_name}</h1>
            <h3 class="text-base font-normal text-gray-600">Email :  ${ detail.email}</h3>
        `;
    });
};



const showWishlist = () => {
    const authUser = JSON.parse(localStorage.getItem("user_id"));
   
    fetch(`http://127.0.0.1:8000/product/wishlist/?user=${authUser}`)
        .then((res) => res.json())
        .then((wish) => {
            const details = document.getElementById("show-wish");
            details.innerHTML = '';
            wish.forEach(item => {
                fetch(`http://127.0.0.1:8000/product/product/${item.product}/`)
                    .then((res) => res.json())
                    .then((productDetails) => {
                        details.innerHTML += `
                        
                            <div class="wishp flex justify-between">
                            <div class="">
                            <h2 class="font-bold" >${productDetails.title}</h2>
                            <h2 class="mt-1">Price: ${productDetails.price}</h2>
                          </div>
                          <div class="">
                          <button type="button" class="  focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-1.5 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Bye Now</button>
                          <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onclick="deletewish(${item.id}, event)">delete</button>
                          </div>
                        </div>
                        `;
                    })
                    .catch((error) => {
                        console.error("Error fetching product details:", error);
                    });
            });
        })
        .catch((error) => {
            console.error("Error fetching wishlist:", error);
        });
};


const postWishlist = (event, productId) => {
   
    event.preventDefault();
    
    const authUser = JSON.parse(localStorage.getItem("user_id"));
    console.log(authUser);
    const token = localStorage.getItem("authToken");
    fetch(`http://127.0.0.1:8000/product/wishlist/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({
            user: authUser,
            product: [productId]
        })
    })
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                console.error('Response error:', data);  
                throw new Error('Failed to add to wishlist');
            }
            alert("Product added to wishlist successfully!"); 
            console.log("Product added to wishlist:", data);
        });
    })
    .then(data => {
        console.log("Product added to wishlist:", data);
    })
    .catch(error => console.error('Error:', error));
}



const deletewish = (productId, event) => {
    
    const token = localStorage.getItem("authToken");

    fetch(`http://127.0.0.1:8000/product/wishlist/${productId}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`, 
        }
    })
    .then((response) => {
        if (response.ok) {
            const itemElement = event.target.closest(".wishp"); 
            itemElement.remove();  
        } else {
            
        }
    })
    .catch((error) => {
        console.error("Error deleting wishlist item:", error);
    });
};


deletewish();
ProfileDetails();
showWishlist();
postWishlist();



