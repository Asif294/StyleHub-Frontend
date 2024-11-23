
let renderCardData=document.querySelector(".renderCardData")
let  dynamic_count=document.querySelector(".dynamic-count");

const getallproduct = (searchQuery = '',orderBy = 'price') => {
    fetch(`http://127.0.0.1:8000/product/product/?search=${searchQuery}&ordering=${orderBy}`)
    .then((res) => res.json())
    .then((products) => { 
       
        const allProduct = document.getElementById("all-product");
        console.log(products.length)
        if(products.length==0){
            console.log("insiteif")
            allProduct.innerHTML =`
            
            <div  class="nodata" >
        
            <img class="nodatas" src="./image/nodata.jpg" alt="no data found">

           </div>
            `
            return ;
        }
       
        else{
            allProduct.innerHTML = ''; 
        products.forEach((product,key)  => {
            const div = document.createElement("div");
            const token = localStorage.getItem("authToken");
            if (token){
            div.innerHTML = `
                <div class="card-c bg-white rounded-lg">
                    <a href="#">
                        <img class="card-img" src="${product.image}" alt="product image" />
                    </a>
                    <div class="px-2 pb-5">
                        <a href="#">
                            <h5 class="text-l mt-1 font-semibold tracking-tight text-gray-900 dark:text-white">${product.title.slice(0,35)}</h5>
                        </a>
                        <div class="flex items-center mt-2.5 mb-5">
                            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">avarag review</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-xl font-bold text-gray-900 dark:text-white">$${product.price}</span>
                            <button onclick="postWishlist(event, ${product.id})" class="cursor-pointer">
                              <img class="wishlist-icon w-7 h-7" src="./image/wishlist.png" alt="Add to Wishlist">
                                </button>

                            <a href="./product_details.html?id=${product.id}" class="text-black bg-green-600 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-blue-400 dark:hover:bg-blue-500 dark:focus:ring-blue-800">Details</a>
                        </div>
                        
                           <button id="add-to-${key}" style="width: 150px;" onclick="addToCard(${product.id}, '${product.image}', '${product.title}','${product.price}')" class="mt-2 p-2 ml-14 rounded-2xl text-m bg-black text-white cursor-pointer text-center h-10">Add to Cart</button>
                        
                    </div>
                </div>
            `;
        
        }
        else{
            div.innerHTML = `
                <div class="card-c bg-white rounded-lg">
                    <a href="#">
                        <img class="card-img" src="${product.image}" alt="product image" />
                    </a>
                    <div class="px-2 pb-5">
                        <a href="#">
                            <h5 class="text-l mt-1 font-semibold tracking-tight text-gray-900 dark:text-white">${product.title.slice(0,35)}</h5>
                        </a>
                        <div class="flex items-center mt-2.5 mb-5">
                            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-xl font-bold text-gray-900 dark:text-white">$${product.price}</span>
                           
                            <a href="./product_details.html?id=${product.id}" class="text-black bg-green-600 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-blue-400 dark:hover:bg-blue-500 dark:focus:ring-blue-800">Details</a>
                        </div>
                        <a class=" hidden lg:inline-block py-2 px-6 bg-red-500 hover:bg-red-600 text-sm text-white font-bold rounded-xl transition duration-200" href="login.html">log in...</a>
                          
                        
                    </div>
                </div>
            `;
            

        }

            allProduct.appendChild(div);
        });
        }
    });
};



const handleSearch = () => {
    const searchInput = document.getElementById('search').value;
    getallproduct(searchInput); 
};

const lodeColor = () => {
    fetch("http://127.0.0.1:8000/product/color/")
    .then((res) => res.json())
    .then((data) => {
        const parent = document.getElementById("color-con");
        data.forEach((item) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <ul class="mt- ">
                    <button onclick="getallproduct('${item.color}')" class="btn btn-success bg-gray-500   m-1">${item.color}</button>
                 </ul>
            `;
            parent.appendChild(div);
        });
    });
};

const lodeSize = () => {
    fetch("http://127.0.0.1:8000/product/size/")
    .then((res) => res.json())
    .then((data) => {
        const parent = document.getElementById("size-con");
        data.forEach((item) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <ul class="mt- ">
                    <button onclick="getallproduct('${item.size}')" class="btn btn-success bg-gray-500  m-1">${item.size}</button>
                 </ul>
            `;
            parent.appendChild(div);
        });
    });
};




getallproduct();
lodeColor();
lodeSize();

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault(); 
    handleSearch();
});

const handleSort = () => {
    const sortOption = document.getElementById('sort-options').value;
    getallproduct('', sortOption);  // Pass the selected ordering to the getallproduct function
};

