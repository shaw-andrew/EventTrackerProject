window.addEventListener('load', function(e) {
	console.log('script.js is loaded');
	init();
});

function init() {
	loadExerciseList();
	displayAddForm();

}

function loadExerciseList() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', '/api/exercises/');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let exercises = JSON.parse(xhr.responseText);
				displayExerciseList(exercises);
			}
			else if (xhr.status === 404) {
				displayError("Exercise not found");
			}
			else {
				displayError('An error occurred: ' + xhr.status);
			}
		}
	};
	xhr.send();
}

function displayError(msg) {
	let errorDiv = document.getElementById('errorDiv');
	errorDiv.textContent = '';
	let h4 = document.createElement('h4');
	h4.textContent = msg;
	errorDiv.appendChild(h4);
}

function displayExerciseList(exercises) {
	let tbody = document.getElementById('exerciseTableBody');
	tbody.textContent = '';
	if (exercises && Array.isArray(exercises) && exercises.length > 0) {
		for (let exercise of exercises) {
			let tr = document.createElement('tr');
			let td = document.createElement('td');
			let edate = new Date(exercise.date);
			td.textContent = edate.toDateString();
			tr.appendChild(td);
			td = document.createElement('td');
			td.textContent = exercise.type;
			tr.appendChild(td);
			tbody.appendChild(tr);

			tr.addEventListener('click', function(e) {
				getExercise(exercise.id);
			})

		}
	}
}

function getExercise(exerciseId) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', '/api/exercises/' + exerciseId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let exercise = JSON.parse(xhr.responseText);
				displayExerciseById(exercise);
			}
			else if (xhr.status === 404) {
				displayError("Exercise not found");
			}
			else {
				displayError('An error occurred: ' + xhr.status);
			}
		}
	};
	xhr.send();
}

function displayExerciseById(exercise) {
	let listDiv = document.getElementById('exerciseDiv');
	listDiv.style.display = 'none';

	let exerciseDiv = document.getElementById('exerciseDetailsDiv');
	exerciseDiv.textContent = '';
	exerciseDiv.style.display = 'block';
	let h2 = document.createElement('h2');
	let edate = new Date(exercise.date);
	h2.textContent = exercise.type + " for " + exercise.distanceInMiles + " miles at " + exercise.description + " on " + edate.toLocaleDateString();
	exerciseDiv.appendChild(h2);

	let backButton = document.createElement('button');
	backButton.textContent = 'Back to List';
	exerciseDiv.appendChild(backButton);
	backButton.addEventListener('click', function() {
		listDiv.style.display = 'block';
		exerciseDiv.style.display = 'none';
	})
}

function displayAddForm() {
	console.log('displayaddform');
	let listDiv = document.getElementById('exerciseDiv');
	let exerciseDiv = document.getElementById('exerciseDetailsDiv');
	document.getElementById('addButton').addEventListener('click', function(e) {
		listDiv.style.display = 'none';
		exerciseDiv.style.display = 'none';
		let form = document.createElement('form');
		let br = document.createElement("br");
		let h3 = document.createElement('h3');
		h3.textContent = "Add an Exercise";

		let addExercise = document.getElementById('addForm');
		addExercise.style.display = 'block';
		form.setAttribute("method", "POST");
		form.setAttribute("action", "submit");
		addExercise.appendChild(h3);
		addExercise.appendChild(form);


		let type = document.createElement("input");
		type.setAttribute("type", "text");
		type.setAttribute("name", "cardio");
		type.setAttribute("placeholder", "What kind of workout?");


		let description = document.createElement("input");
		description.setAttribute("type", "text");
		description.setAttribute("name", "description");
		description.setAttribute("placeholder", "Where did this happen?");

		let date = document.createElement("input");
		date.setAttribute("type", "text");
		date.setAttribute("name", "date");
		date.setAttribute("placeholder", "yyyy-mm-dd");

		let distance = document.createElement("input");
		distance.setAttribute("type", "number");
		distance.setAttribute("name", "distance");
		distance.setAttribute("placeholder", "How far did you go?");

		let submit = document.createElement("input");
		submit.setAttribute("type", "submit");
		submit.setAttribute("value", "Submit");
		//addExercise.appendChild(addForm);

		form.appendChild(type);
		form.appendChild(br);
		form.appendChild(description);
		form.appendChild(br);
		form.appendChild(date);
		form.appendChild(br);
		form.appendChild(distance);
		form.appendChild(br);
		form.appendChild(submit);

		submit.addEventListener('click', function(e) {
			e.preventDefault();

			let exercise = {
				type: form.cardio.value,
				description: form.description.value,
				date: form.date.value,
				distanceInMiles: form.distance.value,
			}
			addEvent(exercise);
		})
	});
}

function addEvent(exercise) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/exercises/');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let newExercise = JSON.parse(xhr.responseText);
				displayExerciseById(newExercise);
			}
			else {
				displayError('An error occurred: ' + xhr.status);
			}
		}
	};
	let exerciseJSON = JSON.stringify(exercise);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(exerciseJSON);
}