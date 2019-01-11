const button = document.querySelectorAll(".button");
const form = document.querySelector(".can-hide");

button[2].addEventListener("click", (event) => {
	if(form.className === "can-hide"){
		button[2].textContent = "Post meetup";
		form.style.display = "block";
		form.className = "can-view";
	}
	else{
		form.style.display = "none";
		form.className = "can-hide";
		button[2].textContent = "Add meetup";
	}
});