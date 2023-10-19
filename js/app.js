const getTodos = () => {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}

const saveTodos = todo => {
    const todos = getTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

const deleteTodo = event => {
    let title = event.target.previousSibling.previousSibling.innerText;
    let text = event.target.previousSibling.innerText
    let todos = getTodos();
    let id = todos.findIndex(element => element.title === title && element.taskText === text);
    todos.splice(id, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

const addTodoOnPage = formData => {
    const todosList = document.querySelector('#todos');

    const div = document.createElement('div');
    div.classList.add('todo-container');

    const h3 = document.createElement('h3');
    h3.innerText = formData.title;
    div.appendChild(h3);

    const text = document.createElement('p');
    text.innerText = formData.taskText;
    div.appendChild(text);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    deleteButton.addEventListener('click', () => {
        deleteTodo(event);
        location.reload();
    });
    deleteButton.innerText = 'Delete TODO';
    div.appendChild(deleteButton)

    todosList.appendChild(div);
}

window.addEventListener('DOMContentLoaded', () =>{
    console.log(getTodos());
    getTodos().forEach(element => addTodoOnPage(element));
})

const form = document.querySelector('.addTodo');
const inputs = form.querySelectorAll('input');
const formData = {}
for(let input of inputs){
    input.addEventListener('change', function(event){
        const {name, value} = event.target;
        console.log(name, " ", value)
        formData[name] = value;
    })
}

form.addEventListener('submit', ()=>{
    saveTodos(formData);
    addTodoOnPage(formData);
});
