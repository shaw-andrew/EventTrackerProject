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
	let addForm = document.getElementById('addForm');
	addForm.style.display = 'none';
	let tbody = document.getElementById('exerciseTableBody');
	tbody.textContent = '';
	errorDiv.textContent = '';
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
	console.log("exercisediv");
	let listDiv = document.getElementById('exerciseDiv');
	listDiv.style.display = 'none';
	let br = document.createElement('br');
	let exerciseDiv = document.getElementById('exerciseDetailsDiv');
	exerciseDiv.textContent = '';
	exerciseDiv.style.display = 'block';
	let h2 = document.createElement('h2');
	let edate = new Date(exercise.date);
	h2.textContent = exercise.type + " for " + exercise.distanceInMiles + " miles at " + exercise.description + " on " + edate.toLocaleDateString() + "!";
	exerciseDiv.appendChild(h2);
	let hr = document.createElement('hr');
	exerciseDiv.appendChild(hr);
	let backButton = document.createElement('button');
	backButton.textContent = 'Back to List';
	exerciseDiv.appendChild(backButton);
	backButton.addEventListener('click', function(e) {
		listDiv.style.display = 'block';
		exerciseDiv.style.display = 'none';
		window.location.reload();
	});
	exerciseDiv.appendChild(br);

	let updateButton = document.createElement('button');
	updateButton.textContent = 'Update this Entry';
	exerciseDiv.appendChild(updateButton);
	updateButton.addEventListener('click', function(e) {
		updateEntry(exercise);
	});

	let deleteButton = document.createElement('button');
	deleteButton.textContent = 'Delete this Entry';
	exerciseDiv.appendChild(deleteButton);
	deleteButton.addEventListener('click', function(e) {
		deleteEntry(exercise.id);
	});

}

function displayAddForm() {
	let listDiv = document.getElementById('exerciseDiv');
	let exerciseDiv = document.getElementById('exerciseDetailsDiv');
	document.getElementById('addButton').addEventListener('click', function(e) {
		listDiv.style.display = 'none';
		exerciseDiv.style.display = 'none';
		let addForm = document.getElementById('addForm');

		addForm.style.display = 'inline';

		addExerciseForm.addExerciseButton.addEventListener('click', function(e) {
			e.preventDefault();

			let exercise = {
				type: addExerciseForm.cardio.value,
				description: addExerciseForm.description.value,
				date: addExerciseForm.date.value,
				distanceInMiles: addExerciseForm.distance.value,
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
				let addForm = document.getElementById('addForm');
				addForm.style.display = 'none';
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

function updateEntry() {

}

function deleteEntry(exerciseId) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/exercises/' + exerciseId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 204) {
				//deleteConfirmation();
				let listDiv = document.getElementById('exerciseDiv');
				let deleteConfirm = document.getElementById('deleteConfirmDiv');
				let addForm = document.getElementById('addForm');
				let exerciseInfo = document.getElementById('exerciseDetailsDiv');
				deleteConfirm.style.display = 'block';
				listDiv.style.display = 'none';
				exerciseInfo.style.display = 'none';
				addForm.style.display = 'none';
				let h2 = document.createElement('h2');
				h2.textContent = "Entry successfully deleted."
				deleteConfirm.appendChild(h2);
				let backButton = document.createElement('button');
				backButton.textContent = 'Back to List';
				deleteConfirm.appendChild(backButton);
				backButton.addEventListener('click', function() {
					listDiv.style.display = 'block';
					exerciseDiv.style.display = 'none';
					addForm.style.display = 'none';
					window.location.reload();
				})
				} else if (xhr.status === 404) {
				displayError("Exercise not found");
			}
			else {
				displayError('An error occurred: ' + xhr.status);
			}
		}
	};

	xhr.send(exerciseId);
}

function deleteConfirmation() {
	let listDiv = document.getElementById('exerciseDiv');
	let deleteConfirm = document.getElementById('exerciseDetailsDiv');
	let addForm = document.getElementById('addForm');
	deleteConfirm.style.display = 'block';
	listDiv.style.display = 'none';
	addForm.style.display = 'none';
	let h2 = document.createElement('h2');
	h2.textContent = "Entry successfully deleted."
	deleteConfirm.appendchild(h2);
	backButton.textContent = 'Back to List';
	deleteConfirm.appendChild(backButton);
	backButton.addEventListener('click', function() {
		listDiv.style.display = 'block';
		exerciseDiv.style.display = 'none';
		addForm.style.display = 'block';
	});
}




