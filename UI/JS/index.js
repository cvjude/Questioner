const users = {
	Admin : {
		UserName: "Admin",
		password: "12345",
		isAdmin: true,
		id: 0
	}
};

const getSigninInfo = () =>{
	let UserName = document.getElementById("UserName").value;
	let password = document.getElementById("password").value;
	let obj = {UserName, password};
	return obj;
}

const itExists = (key, attribute, userData) =>{
	if(users[key] === undefined)
		return false;
	else
		if(users[key][attribute] === userData)
			return true;
	return false;
}

const signin = document.querySelector(".signInForm");
signin.addEventListener("submit", (event) => {
	console.log("signin event");
	event.preventDefault();
	const details = getSigninInfo();
	let validUser = itExists(details.UserName, "password", details.password);
	if(!validUser)
		alert("INVALID USERNAME OR PASSWORD");
	else{
		
	}
	console.log(users);
});
