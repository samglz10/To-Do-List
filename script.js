
const submitTodo = document.getElementById('addBtn');
const taskLists = document.getElementById('taskLists');
const description = document.getElementById('inputField');
const githubLink = document.getElementById('github-link');
const defaultTask = document.getElementById('defaultTask');
const menu = document.getElementById('menu');
const menuCancel = document.getElementById('menu-cancel');
const trashItems = document.getElementById('trash');
const todoForm = document.getElementById('todo-form');
const todoTable = document.getElementById('todo-table');
const priorityInput = document.getElementById('priority-input');
const dueDateInput = document.getElementById('due-date');

const allTrashTasks = [];
const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];

const getAllTasks = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    console.log(storedTasks);
    return storedTasks;
}

const todoBody = document.getElementById('todo-body');

const toggleMenu = () => {
    // 1. Toggle the visibility of the form itself
    const isFormHidden = todoForm.classList.toggle('hidden');

    // 2. Sync the buttons based on the form's state
    if (isFormHidden) {
        // If form is hidden: Show "Open" menu, hide "Cancel"
        menu.classList.remove('hidden');
        menuCancel.classList.add('hidden');
    } else {
        // If form is visible: Hide "Open" menu, show "Cancel"
        menu.classList.add('hidden');
        menuCancel.classList.remove('hidden');
        todoForm.style.display = 'flex'; // Ensure layout is correct when shown
    }
};

todoForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Create the object as requested
    let newTask = {
        key: `ID-${Math.floor(Math.random() * 1000000)}`,
        priority: priorityInput.value,
        description: description.value,
        dueDate: dueDateInput.value,
        completed: false,
        deleted: false,
        creationDate: new Date().toLocaleDateString(), // Formatted for readability
        completionDate: "",

    };
    console.log(newTask);
    allTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    renderTask(newTask);
    todoForm.reset();
});

const updateTaskProperty = (key, field, value) => {
    const taskIndex = allTasks.findIndex(task => task.key === key);
    if (taskIndex !== -1) {
        allTasks[taskIndex][field] = value;
        localStorage.setItem('tasks', JSON.stringify(allTasks));
    }
};

function renderTask(task) {
    const row = document.createElement('tr');
    row.innerText = task.description; // Set the description as the row's text content


    // Applying a class if completed (useful for CSS striking through text)
    if (task.completed) row.classList.add('completed');


    row.innerHTML = `
        <td class="priority-cell">
        <select id="priority-select-${task.key}" class="priority-select">
            <option value="low" ${task.priority === "🧊" ? "selected" : ""}>🧊</option>
            <option value="medium" ${task.priority === "⚡" ? "selected" : ""}>⚡</option>
            <option value="high" ${task.priority === "‼️" ? "selected" : ""}>‼️</option>
        </select>
        </td>
        <td>
            <input class="description-input" type="text" value="${task.description}">
        </td>
        <td>${task.creationDate}</td>
        <td>
            <select id="status-select-${task.key}" class="status-select">
                <option value="pending" ${!task.completed ? "selected" : ""}>⏳ Pending</option>
                <option value="completed" ${task.completed ? "selected" : ""}>✅ Done</option>
            </select>
        </td>
         <td>     
            <input class="due-date-input" type="date" id="due-date-${task.key}" name="due-date-${task.key}" value="${task.dueDate}">
        </td>  
        
        <td class="action-buttons">
            <button class="delete-btn">✕</button>
        </td>
    `;

    todoBody.appendChild(row);
//
    const prioritySelect = row.querySelector(`#priority-select-${task.key}`);
    prioritySelect.addEventListener('change', () => {
        updateTaskProperty(task.key, 'priority', prioritySelect.value);
    });

// Due date change listener
    const dateInput = row.querySelector(`#due-date-${task.key}`);
    dateInput.addEventListener('change', () => {
        updateTaskProperty(task.key, 'dueDate', dateInput.value);
    });
// Status change listener
    const statusSelect = row.querySelector(`#status-select-${task.key}`);
    statusSelect.addEventListener('change', () => {
        const isCompleted = statusSelect.value === 'completed';
        updateTaskProperty(task.key, 'completed', isCompleted);
        row.classList.toggle('completed', isCompleted);
    });
// Description change listener
    const descriptionInput = row.querySelector('.description-input');
    descriptionInput.addEventListener('change', () => {
        updateTaskProperty(task.key, 'description', descriptionInput.value);
    });
}

 // Function to update tasks in localStorage   
updateTasksInLocalStorage = () => {
    localStorage.getItem('tasks', JSON.stringify(allTasks));
    //console.log(`allTasks`, allTasks);
    allTasks.forEach(task => {
        if(task.completed) {

        }
        console.log(`task`, task);
    });

}
// Initial rendering of tasks on page load
updateTasksInLocalStorage();

// Render all tasks from localStorage when the page loads
allTasks.forEach(task => {
    if (!task.deleted){
        renderTask(task);
    }
});
