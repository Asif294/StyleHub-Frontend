const getallproduct = (searchQuery = '') => {
    fetch(`http://127.0.0.1:8000/product/product/?search=${searchQuery}`)
    .then((res) => res.json())
    .then((products) => {
        const allProduct = document.getElementById("all-product");
        allProduct.innerHTML = ''; 

        products.forEach(product => {
            const div = document.createElement("div");
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
                            <a hraf="#">
                                <img class="cursor-pointer w-7 h-7" src="./image/wishlist.png" alt="">
                            </a>
                            <a href="./product_details.html?id=${product.id}" class="text-black bg-green-600 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-blue-400 dark:hover:bg-blue-500 dark:focus:ring-blue-800">Details</a>
                        </div>
                        <a hraf="#">
                            <h1 style="width: 150px;" class="mt-2 p-2 ml-14 rounded-2xl text-m bg-black text-white cursor-pointer text-center h-10">Add to card</h1>
                        </a>
                    </div>
                </div>
            `;
            allProduct.appendChild(div);
        });
    });
};

const lodeProduct=(search)=>{
    const allProduct = document.getElementById("all-product");
    console.log(search)
    fetch(`http://127.0.0.1:8000/product/product/?search=${search ? search:""}`)
    .then((res)=> res.json())
    .then((data)=>{
        getallproduct(data?.results);
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
                    <button onclick="lodeProduct('${item.color}')" class="btn btn-secondary m-1">${item.color}</button>
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
                    <button onclick="lodeProduct('${item.size}')" class="btn btn-secondary m-1">${item.size}</button>
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
