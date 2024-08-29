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

                    products.innerHTML = `
                        <div class="cole row d-flex  flex gap-10 p-10 ">
                            <div class="bg-gray- col-6">
                                <img class="image ml-20" src="${product.image}" alt="">
                            </div>
                            <div class="details ml-20 col-6">
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
                                    <div class="d-flex flex">
                                        <a href="#">
                                            <img class="cursor-pointer w-10 h-10" src="./image/wishlist.png" alt="">
                                        </a>
                                        <a href="#_" class="byn relative inline-flex items-center justify-end p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500">
                                            <span class="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                                            <span class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                                            <span class="relative text-white">Buy Now</span>
                                        </a>
                                    </div>
                                </div>
                            </div>    
                        </div>
                    `;

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

            reviews.forEach(review => {
                const div = document.createElement("div");
                div.innerHTML = `
                    <div class="border p-3 mb-3 rounded">
                        <h1 class="font-bold text-xl">${review.reviewer}</h1>
                        <h4 class="mt-1">${review.create}</h4>
                        <p class="text-s mt-1">${review.body}</p>
                        <p class="text-gray-600 font-bold mt-1">Rating: ${review.rating} /5</p>
                    </div>
                `;
                reviewSection.appendChild(div);
            });
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
