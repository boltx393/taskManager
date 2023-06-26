const taskInput = document.getElementById('taskInput');
const taskDescription = document.getElementById('taskDescription');
const taskVenue = document.getElementById('taskVenue');
const taskDeadline = document.getElementById('taskDeadline');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.querySelector('.taskList');
const exampleTask = document.querySelector('.example-task');

addTaskBtn.addEventListener('click', addTask);

function addTask() {
  const taskName = taskInput.value.trim();
  if (taskName !== '') {
    const description = taskDescription.value.trim().substring(0, 140); // Limit description to 140 characters
    const venue = taskVenue.value.trim();
    const deadline = taskDeadline.value;
    const li = document.createElement('li');
    li.classList.add('task');
    li.innerHTML = `
      <div class="task-info">
        <span class="task-title">${taskName}</span>
        <span class="task-desc">${description}</span>
        <span class="task-venue">${venue ? `Venue: ${venue}` : ''}</span>
        <span class="task-deadline">${deadline ? `Deadline: ${deadline}` : ''}</span>
      </div>
      <div class="button-container">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    taskList.insertBefore(li, exampleTask);
    resetInputFields();

    // Hide the example task
    exampleTask.style.display = 'none';
  }
}

function resetInputFields() {
  taskInput.value = '';
  taskDescription.value = '';
  taskVenue.value = '';
  taskDeadline.value = '';
}

function editTask() {
  const taskItem = this.parentNode.parentNode;
  const taskInfo = taskItem.querySelector('.task-info');
  const taskTitle = taskInfo.querySelector('.task-title');
  const taskDesc = taskInfo.querySelector('.task-desc');
  const taskVenueElem = taskInfo.querySelector('.task-venue');
  const taskDeadlineElem = taskInfo.querySelector('.task-deadline');

  taskInput.value = taskTitle.textContent;
  taskDescription.value = taskDesc.textContent;
  taskVenue.value = taskVenueElem ? taskVenueElem.textContent.replace('Venue: ', '') : '';
  taskDeadline.value = taskDeadlineElem ? taskDeadlineElem.textContent.replace('Deadline: ', '') : '';

  taskList.removeChild(taskItem);
}

// Event listener for edit button click
taskList.addEventListener('click', function (event) {
  if (event.target.classList.contains('edit-btn')) {
    editTask.call(event.target);
  }
});

// Event listener for delete button click
taskList.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-btn')) {
    const taskItem = event.target.parentNode.parentNode;
    taskList.removeChild(taskItem);
  }
});
