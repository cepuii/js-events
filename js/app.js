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
    const parentElement = event.target.parentElement;
    let title = parentElement.querySelector('h3').textContent;
    let taskText = parentElement.querySelector('p').textContent;
    let todos = getTodos();
    let id = todos.findIndex(element => element.title === title && element.taskText === taskText);
    if(id != -1){
        todos.splice(id, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

const addTodoOnPage = formData => {
    const todosList = document.querySelector('.todos');

    const div = document.createElement('div');
    div.classList.add('todo-container');

    const h3 = document.createElement('h3');
    h3.innerText = formData.title;
    h3.classList.add('todoItem');
    div.appendChild(h3);

    const text = document.createElement('p');
    text.classList.add('todoItem');
    text.innerText = formData.taskText;
    div.appendChild(text);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-light', 'deleteButton');
    deleteButton.addEventListener('click', (event) => {
        deleteTodo(event);
        location.reload();
    });
    deleteButton.innerText = 'Delete task';
    div.appendChild(deleteButton)

    todosList.appendChild(div);
}

window.addEventListener('DOMContentLoaded', () => getTodos().forEach(element => addTodoOnPage(element)));

const form = document.querySelector('.addTodo');
form.addEventListener('submit', (event)=>{
    const formData = {}
    const {title, taskText} = event.target.children;
    formData.title = title.value;
    formData.taskText = taskText.value;
    saveTodos(formData);
    addTodoOnPage(formData);
});
