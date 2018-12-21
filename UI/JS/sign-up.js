const users = {
	Admin : {
		UserName: "Admin",
		password: "12345",
		isAdmin: true,
		id: 0
	}
};

const getSignupInfo = () =>{
	let UserName = document.getElementById("UserName").value;
	let FirstName = document.getElementById("FirstName").value;
	let LastName = document.getElementById("LastName").value;
	let OtherName = document.getElementById("OtherName").value;
	let Email = document.getElementById("Email").value;
	let PhoneNumber = document.getElementById("PhoneNumber").value;
	let password = document.getElementById("password").value;
	let obj = {UserName, FirstName, LastName, OtherName, Email, PhoneNumber, password};
	obj.id = users.length;
	obj.isAdmin = false;
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

const signup = document.querySelector(".signUpForm");
signup.addEventListener("submit", (event) => {
	event.preventDefault();
	const details = getSignupInfo();
	const validUser = itExists(details.UserName, "Email", details.Email);

	if(!validUser){
		details.registered = new Date();
		users[details.UserName] = details;
	}
	else
		alert("USERNAME OR EMAIL ALREADY EXISTS");

});