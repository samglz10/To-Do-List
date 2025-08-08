
const submitTodo = document.getElementById('addBtn');
const taskLists = document.getElementById('taskLists');
const inputField = document.getElementById('inputField');
const githubLink = document.getElementById('github-link');
const defaultTask = document.getElementById('defaultTask');
const allTasks = [];


function uniqueKey(number) {
    let randomNumber = Math.floor(Math.random() * number) + 1;
    let timestamp = Date.now();
    let uniqueKey = randomNumber + '-' + timestamp;

    console.log(uniqueKey);
    return uniqueKey;
};


submitTodo.addEventListener('click', function () {

    let newTask = {
        "key": uniqueKey(100),
        priority: "",
        description: "",
        creationDate: Date.now(),
        dueDate: "",
        completed: false,
        deleted: false,
        completionDate: "",
    };



    console.log(newTask);
    //console.log(uniqueKey(10));




    const newTodo = document.createElement('li');
    newTodo.innerText = inputField.value;

    
    if (inputField.value === '') {
        alert('Please enter a Task');
    } else {
        newTodo.classList.add('newTodoStyle')
        taskLists.appendChild(newTodo);
        allTasks.push(newTask);
        console.log(allTasks);
        inputField.value = "";

        newTodo.addEventListener('click', function () {
            newTodo.classList.toggle("CompletedList")
        })

        newTodo.addEventListener('dblclick', function () {
            taskLists.removeChild(newTodo);
        });


    }

})

defaultTask.addEventListener('click', () => {
    console.log('clicked')
    defaultTask.classList.toggle("CompletedList");
    console.log(defaultTask.classList)
})

defaultTask.addEventListener('dblclick', function () {
    defaultTask.remove(defaultTask);
});

