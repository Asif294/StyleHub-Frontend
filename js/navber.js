fetch("navber.html")
    .then((res) => res.text())
    .then((data) => {
        document.getElementById("navber").innerHTML = data;

        const navElement = document.getElementById("navber-ele");
        const token = localStorage.getItem("authToken");
        
        const CardProduct = () => {
            const authUser = JSON.parse(localStorage.getItem("user_id"));
            fetch(`http://127.0.0.1:8000/order/orders/?user=${authUser}`)
            .then((res) => res.json())
            .then((products) => {
                // Update the dynamic count with the number of products
                const dynamicCount = document.querySelector(".dynamic-count");
                dynamicCount.textContent = products.length;
            });
        }

        if (token) {
            navElement.innerHTML += `
                <a href="cart.html">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <sup class="dynamic-count">0</sup>
                </a>
                <a class="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200" href="profile.html">Profile</a>
                <a class="cursor-pointer hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" onclick="handleLogout()">Log Out</a>
            `;
            // Call CardProduct to update the cart count dynamically
            CardProduct();
        } else {
            navElement.innerHTML += `
                <a class="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200" href="registration.html">Sign In</a>
                <a class="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" href="login.html">Log In</a>
            `;
        }
    });
