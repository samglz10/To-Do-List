
const submitTodo = document.getElementById('addBtn');
const taskLists = document.getElementById('taskLists');
const inputField = document.getElementById('inputField');
const githubLink = document.getElementById('github-link')

submitTodo.addEventListener('click', function(){
    //creates a new li tag
    const newTodo = document.createElement('li');
    newTodo.innerText = inputField.value;
    newTodo.classList.add('newTodoStyle')

    //appends the child to field
    taskLists.appendChild(newTodo);
    inputField.value='';

    newTodo.addEventListener('click', function(){
        newTodo.classList.toggle("CompletedList")
    })

    newTodo.addEventListener('dblclick', function(){
        taskLists.removeChild(newTodo);
    })
     
})








