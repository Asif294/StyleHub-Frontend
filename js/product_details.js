const getQueryParams = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

const getProductDetail = () => {
    const postId = getQueryParams("id");
   
    fetch(`http://127.0.0.1:8000/product/product/${postId}/`,)
        .then((res) => res.json())
        .then((product) => {
            const products = document.getElementById("product-details");
            fetch(`http://127.0.0.1:8000/product/brand/${product.brand}/`)
                .then((res) => res.json())
                .then((brand) => {
                    const brand_name = brand.brand;

                    let sizesHtml = '';
                    product.size.forEach(size => {
                        sizesHtml += `<button class="text-white ml-4 bg-gray-500 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"> ${size} </button>`;
                    });

                    let colorsHtml = '';
                    product.color.forEach(color => {
                        colorsHtml += `<span class="inline-block w-7 h-7 ml-3 rounded-full me-2 mb-2" style="background-color:${color};"></span>`;
                    });
                    const token = localStorage.getItem("authToken");
                   if (token){
                    products.innerHTML = `
                        <div class="cole row d-flex flex gap-10 p-10 ">
                            <div class="bg-gray- flex-1 col-6">
                                <img class="image ml-20" src="${product.image}" alt="">
                            </div>
                            <div class="details flex-1 ml-20 col-6">
                                <h1 class="text-3xl font-bold">${product.title}</h1>
                                <br>
                                <h1 class="text-2xl">Category : ${product.category}</h1>
                                <br>
                                <div class="d-flex flex">
                                    <h1 class="text-3xl text-gray-700 font-bold">$${product.price} </h1> 
                                    <h1 class="text-xl text-red-700 ml-20 font-bold">Brand : ${brand_name} </h1>
                                </div>
                                <br>
                                <h1 class="font-bold text-gray-600 text-2xl">Color:</h1>
                                <div class="d-flex flex mt-2">
                                    ${colorsHtml}
                                </div>
                                <br>
                                <div style="width: 550px;">
                                    <p>${product.body}</p>
                                    <br>
                                    <div class="d-flex  flex">
                                     <a href="" onclick="postWishlist(event,${product.id})">
                                        <img class="wishlist-icon cursor-pointer w-10 mt-4 h-10" src="./image/wishlist.png" alt="Add to Wishlist">
                                         </a>                              
                                         <button type="button" class=" mt-4 ml-20 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Bye Now</button>
                                        
                                    </div>
                                </div>
                            </div>    
                        </div>
                    `;
                   }
                   else{
                    products.innerHTML = `
                    <div class="cole row d-flex flex gap-10 p-10 ">
                        <div class="bg-gray- flex-1 col-6">
                            <img class="image ml-20" src="${product.image}" alt="">
                        </div>
                        <div class="details flex-1 ml-20 col-6">
                            <h1 class="text-3xl font-bold">${product.title}</h1>
                            <br>
                            <h1 class="text-2xl">Category : ${product.category}</h1>
                            <br>
                            <div class="d-flex flex">
                                <h1 class="text-3xl text-gray-700 font-bold">$${product.price} </h1> 
                                <h1 class="text-xl text-red-700 ml-20 font-bold">Brand : ${brand_name} </h1>
                            </div>
                            <br>
                            <h1 class="font-bold text-gray-600 text-2xl">Color:</h1>
                            <div class="d-flex flex mt-2">
                                ${colorsHtml}
                            </div>
                            <br>
                            <div style="width: 550px;">
                                <p>${product.body}</p>
                                <br>
                               
                            </div>
                        </div>    
                    </div>
                `;
                   }
                    fetchReviews(postId);
                    // postcomment(postId);
                })
                .catch(error => console.error('Error fetching brand:', error));
        })
        .catch(error => console.error('Error fetching product:', error));
};

const fetchReviews = (postId) => {
    fetch(`http://127.0.0.1:8000/product/review/?product=${postId}`)
        .then(res => res.json())
        .then(reviews => {
            const reviewSection = document.getElementById("review");


            let sumOfRatings = 0;

            reviews.forEach(review => {
            sumOfRatings += review.rating;
            fetch(`http://127.0.0.1:8000/user/user/${review.reviewer}/`)
        
            .then((res) => res.json())
            .then((user) => {
               
                const div = document.createElement("div");
                
                div.innerHTML = `
                    <div class="border p-3 mb-3 rounded">
                        <h1 class="font-bold text-xl">${user.username}</h1>
                        <h4 class="mt-1">${review.create}</h4>
                        <p class="text-s mt-1">${review.body}</p>
                        <p class="text-gray-600 font-bold mt-1">Rating: ${review.rating} /5</p>
                    </div>
                `;
                reviewSection.appendChild(div);
            });
        })
        console.log(sumOfRatings.length)
        let averageRating = (sumOfRatings.length / 5).toFixed(1)
        console.log( averageRating);
    })
        .catch(error => console.error('Error fetching reviews:', error));
};


const postcomment = () => {
    const reviewForm = document.getElementById("reviewForm");
    const postId = getQueryParams("id");

    const authUser = JSON.parse(localStorage.getItem("user_id"));
    reviewForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const body = document.getElementById("reviewBody").value;
        const rating = document.getElementById("reviewRating").value;
    
        const token = localStorage.getItem("authToken");
        
        fetch(`http://127.0.0.1:8000/product/review/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,  
            },
            body: JSON.stringify({
                reviewer: authUser,
                body: body,
                rating: rating,
                product: postId
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        })
        .then(data => {
            console.log("Review submitted:", data);
            fetchReviews(postId);
            reviewForm.reset();
        })
        .catch(error => console.error('Error:', error));
    });
};

postcomment();

getProductDetail();