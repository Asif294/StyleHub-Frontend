fetch("navber.html")
    .then((res)=>res.text())
    .then((data)=>{
        document.getElementById("navber").innerHTML=data;

        const navElement=document.getElementById("navber-ele");
        const token = localStorage.getItem("authToken");
        if (token){
            navElement.innerHTML += `
             <a class="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200" href="profile.html">Profile</a>
            <a class="cursor-pointer hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" onclick="handleLogout()">Log Out</a>
            
            `
        }
        else{
            navElement.innerHTML += `
            <a class="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200" href="registration.html">Sign In</a>
            <a class=" hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" href="login.html">Log In</a>
            
            `
        }
    });