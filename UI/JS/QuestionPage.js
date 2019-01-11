const button = document.querySelector(".button");
const form = document.querySelector(".can-hide");
// const saveMeetUp = document.querySelector("#saveMeetUp");

// section.addEventListener("click", (event) => {
// 	if(event.target.className == "delete"){
// 		const div = event.target.parentElement;
// 		section.removeChild(div);
// 		delete meetup[div.children[0].textContent];
// 	}
// });
button.addEventListener("click", (event) => {
	if(form.className === "can-hide"){
		form.style.display = "block";
		form.className = "can-view";
		button.textContent = "Post Question";
	}
	else{
		form.style.display = "none";
		form.className = "can-hide";
		button.textContent = "Add Question";
	}
});