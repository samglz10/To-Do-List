
let submitTodo = document.getElementById('addBtn');
let taskLists = document.getElementById('taskLists');
let inputField = document.getElementById('inputField');

submitTodo.addEventListener('click', function(){
    //creates a new li tag
    let newTodo = document.createElement('li');
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


