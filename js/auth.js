const handleRegistration = (event) => {
    event.preventDefault();
    const username = getValue("username");
    const first_name =getValue("first_name");
    const last_name=getValue("last_name");
    const email=getValue("email");
    const password=getValue("password");
    const confirm_password=getValue("confirm_password");

    const info ={
        username,first_name,last_name,email,password,confirm_password,
    };
    if(password==confirm_password){
        document.getElementById("error").innerText=""
        if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)){
        
            fetch("http://127.0.0.1:8000/user/register/",{
                method :"POST",
                headers:{"Content-type" : "application/json"},
                body:JSON.stringify(info)

            })
            .then((res)=> res.json())
            // .then((data)=>console.log(data)); 
            window.location.href = "./login.html";
            alert("Pleace chack your email for confirmation mail");
        }
        else{
            document.getElementById("error").innerText="Minimum eight characters, at least one letter, one number and one special character"
        }
    }
    else{
        document.getElementById("error").innerText="Password and Confirm password do not match"
    }

};

const getValue=(id)=>{
    const value=document.getElementById(id).value;
    return value;
}





const handleLogin = (event) => {
    event.preventDefault();
    const form = document.getElementById("login-form");
    const formData = new FormData(form);
  
    const loginData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    fetch("http://127.0.0.1:8000/user/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.detail || "Login failed");
        }
        return res.json();
      })
      .then((data) => {
        if (data.is_disabled) {
          alert("Your account is disabled.");
          return;
        }
        console.log("Auth token received:", data.token);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user_id", data.user_id);
        window.location.href = "./index.html";
      })
      .catch((err) => {
        console.log("Login error", err.message);
        alert("Login failed: " + err.message);
      });
  };

  const handleLogout =() =>{
    const token=localStorage.getItem("authToken");
    fetch("http://127.0.0.1:8000/user/logout/",{
      method :"GET",
      headers:{
        "Content-Type": "application/json",
        Authorization:`Token ${token}`,
      },

    })
    .then(res=>{
       if (res.ok){
        localStorage.removeItem("authToken");
        window.location.href="./index.html";
       }
    })
  }