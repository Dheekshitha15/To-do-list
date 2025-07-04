// --------------------
// To-Do List Logic
// --------------------
window.onload = () => {
  loadTasks();
  updateTaskCount();
};

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = { text: taskText, completed: false };
  let tasks = getTasksFromStorage();
  tasks.push(task);
  saveTasksToStorage(tasks);
  taskInput.value = "";
  loadTasks();
  updateTaskCount();
}

function loadTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  const tasks = getTasksFromStorage();
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${task.text}</span>
      <button class="remove-btn" onclick="removeTask(${index})">Remove</button>`;
    taskList.appendChild(li);
  });
}

function removeTask(index) {
  let tasks = getTasksFromStorage();
  tasks.splice(index, 1);
  saveTasksToStorage(tasks);
  loadTasks();
  updateTaskCount();
}

function toggleComplete(index) {
  let tasks = getTasksFromStorage();
  tasks[index].completed = !tasks[index].completed;
  saveTasksToStorage(tasks);
  loadTasks();
  updateTaskCount();
}

function clearAllTasks() {
  localStorage.removeItem("tasks");
  loadTasks();
  updateTaskCount();
}

function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskCount() {
  const tasks = getTasksFromStorage();
  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.length - completed;
  document.getElementById("taskCount").innerText = `Pending: ${pending} | Completed: ${completed}`;
}

// ----------------------------
// Contact Form Submit Logic
// ----------------------------

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop page reload

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    // Show popup confirmation
    alert("✅ Your message has been sent successfully!");

    // Reset the form
    contactForm.reset();
  });
}
