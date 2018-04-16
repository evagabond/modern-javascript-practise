// Define UI Vars
// Assigning HTML ids & classes  to JS vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load Task Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add Task Event
  form.addEventListener('submit', addTask);
  // Remove Task Event
  taskList.addEventListener('click', removeTask);
  // Clear Task Event
  clearBtn.addEventListener('click', clearTasks);
  // Filter Tasks Event
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS to display them in the index.html page
function getTasks() {
  let tasks;
  // Check if tasks already exists in Local Storage 
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    // Since local storage only stores  data as strings we have to parse it as JSON data while retrieving it
    // so that the retrieved data can be read by JS
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  // Display retrieved task 
  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    // If in materialize-css you want your list to look good then ul should have a class called collection
    // & each list item should have a class called collection-item
    li.className = 'collection-item';    
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    // secondary-content class will set item to the right in materialize-css
    link.className = 'delete-item secondary-content';
    // Add icon html
    // fa = Font Awesome icons
    link.innerHTML = '<i class ="fa fa-remove"></i>'
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  })
}

// Add Task
function addTask() {
  if(taskInput.value === '') {
    alert('Add a task');
  }
  // Create li element
  const li = document.createElement('li');
  // Add class
  // If in materialize-css you want your list to look good then ul should have a class called collection
  // & each list item should have a class called collection-item
  li.className = 'collection-item';
  // Create text node and append to li
  // taskInput.value represents the input entered by the user as task. It's an 'Input Text value Property'
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  // secondary-content class will set item to the right in materialize-css
  link.className = 'delete-item secondary-content';
  // Add icon html
  // fa = Font Awesome icons
  link.innerHTML = '<i class ="fa fa-remove"></i>'
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  // Check if tasks already exists in Local Storage 
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    // Since local storage only stores  data as strings we have to parse it as JSON while retrieving it
    // for the retrieved data to be in a readable by JS
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // Push the 'task' passed as a parameter in line 61 to the 'tasks array'
  tasks.push(task);

  // Since Local Storage can only store data in string format, converting JSON to string
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }       
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  // Check if tasks already exists in Local Storage 
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    // Since local storage only stores  data as strings we have to parse it as JSON while retrieving it
    // for the retrieved data to be in a readable by JS
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));  
}

// Clear Tasks
function clearTasks() {
  // taskList.innerHTML = '';

  // The while solution below executes Faster than taskList.innerHTML in Line-67 
  // Refer: // https://jsperf.com/innerhtml-vs-removechild
  // The statement below means - while there is still data in the firstChild, remove it
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from LS
  clearTasksfromLocalStorage();
}

// Clear Tasks from LS
function clearTasksfromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  // text is the text that's being typed
  const text = e.target.value.toLowerCase();

  // task is the currentValue of the arrayItem passed by querySelectorAll
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
