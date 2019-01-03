const display1 = () =>{
	for(element in meetup){
		display(meetup[element]);
	}
}

const meetup = {};

const getMeetUpInfo = () =>{
	let Topic = document.getElementById("Topic").value;
	let Location = document.getElementById("Location").value;
	let HappeningOn = document.getElementById("HappeningOn").value;
	let obj = {Topic, Location, HappeningOn};
	obj.id = meetup.length;
	return obj;
}

const addMeetUp = document.querySelector("#addMeetUp");
const saveMeetUp = document.querySelector("#saveMeetUp");
const meetUpForm = document.querySelector(".meetUpForm");
const section = document.querySelector("section");

const display = (key) =>{
	let div = document.createElement("div");
	let btn = document.createElement("button");
	div.classList.add("content");
	btn.classList.add("delete");
	btn.textContent = "delete";
	for(element in key){
		if(element === "displayed")
			break;
		div.appendChild(add(key[element]));
	}
	div.appendChild(btn);
	section.appendChild(div);
}


section.addEventListener("click", (event) => {
	if(event.target.className == "delete"){
		const div = event.target.parentElement;
		section.removeChild(div);
		delete meetup[div.children[0].textContent];
	}
});

const add = (text) =>{
	let p = document.createElement("p");
	p.textContent = text;
	return p;
}

addMeetUp.addEventListener("click", () => {
	addMeetUp.style.display = "none";
	meetUpForm.style.display = "block";
});

meetUpForm.addEventListener("submit", (event) => {
	event.preventDefault();
	
	let meetdetails = getMeetUpInfo(); //Meetuo detials Object

	meetdetails.createdOn = new Date();//add Created on attribute to object
	//meetdetails.displayed = false;
	meetup[meetdetails.Topic] = meetdetails;//use the topic of the Meetup to create a new Meetup in the Meet up Object
	
	display(meetdetails);

	addMeetUp.style.display = "initial";
	meetUpForm.style.display = "none";
});

