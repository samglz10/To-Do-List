
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
    renderTask(newTask);
    todoForm.reset();
});

function renderTask(task) {
    const row = document.createElement('tr');
    row.innerText = task; // Set the description as the row's text content


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
            <button class="complete-btn">✅</button>
        </td>
    `;

    todoBody.appendChild(row);

    const dateInput = row.querySelector(`#due-date-${task.key}`);
    dateInput.addEventListener('change', () => {
        task.dueDate = dateInput.value;
    });
}


/*

function addTodoToDOM(taskDescription) {
    const newTodo = document.createElement('li');
    newTodo.innerText = taskDescription;
    newTodo.classList.add('defaultTask');
    taskLists.appendChild(newTodo);

    newTodo.addEventListener('click', function () {
        newTodo.classList.toggle("CompletedList");
    });

    newTodo.addEventListener('dblclick', function () {
        taskLists.removeChild(newTodo);

    });
}

allTasks.forEach(task => addTodoToDOM(task.description));


function uniqueKey(number) {
    let randomNumber = Math.floor(Math.random() * number) + 1;
    let timestamp = Date.now();
    let uniqueKey = randomNumber + '-' + timestamp;

    console.log(uniqueKey);
    return uniqueKey;
};


submitTodo.addEventListener('click', function (e) {
    e.preventDefault();
    let newTask = {
        "key": uniqueKey(Math.floor(Math.random() * 1000000)),
        priority: "",
        description: inputField.value,
        creationDate: Date.now(),
        dueDate: "",
        completed: false,
        deleted: false,
        completionDate: "",
    };

    console.log(newTask);
    //console.log(uniqueKey(10));
    if (inputField.value === '') {
        alert('Please enter a Task');
    } else {
        
        addTodoToDOM(inputField.value);
        allTasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(allTasks));
        console.log(allTasks);
        inputField.value = "";
        
        addTodoToDOM(inputField.value);
    }

})

defaultTask.addEventListener('click', () => {
    console.log('clicked')
    defaultTask.classList.toggle("CompletedList");

})

defaultTask.addEventListener('dblclick', function () {
    defaultTask.remove(defaultTask);

});


*/