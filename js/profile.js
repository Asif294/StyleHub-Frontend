const ProfileDetails = () => {
    const authUser = JSON.parse(localStorage.getItem("user_id"));
    console.log(authUser);
    
    fetch(`http://127.0.0.1:8000/user/user/${authUser}/`)
    .then((res) => res.json())
    .then((detail) => {
        console.log(detail);
        const details = document.getElementById("user-profile");
        
        details.innerHTML = `
            <h2 class="text-xl font-semibold mb-2 text-gray-800">Username :  ${ detail.username}</h2>
            <h1 class="text-lg font-medium mb-2 text-gray-700">First Name :  ${ detail.first_name}</h1>
            <h1 class="text-lg font-medium mb-2 text-gray-700">Last Name :  ${ detail.last_name}</h1>
            <h3 class="text-base font-normal text-gray-600">Email :  ${ detail.email}</h3>
        `;
    });
}

ProfileDetails();


