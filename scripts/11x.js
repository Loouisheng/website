
const todoList = JSON.parse(localStorage.getItem('todolist'))||[{
    name:'make dinner',
    dueDate:'2022-12-22'
},{ 
    name:'wash dishes',
    dueDate:'2022-12-22'

}];

renderTodoList();

function renderTodoList(){
    let todoListHTML='';

    for (let i = 0;i<todoList.length;i++){
        const todoObject = todoList[i];
        //const name = todoObject.name;
        //const dueDate = todoObject.dueDate;
        const {name,dueDate} = todoObject;
        const html = `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button onclick="
            todoList.splice(${i},1)
            renderTodoList();
        " class="delete-todo-button">Delete</button>
        `;
        todoListHTML += html;
    }

    document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}
function addTodo(){
    const inputElem = document.querySelector('.js-name-input');
    const name = inputElem.value;

    const dataInputElement = document.querySelector('.js-due-date-input');
    const dueDate = dataInputElement.value;

    todoList.push({
        //name: name,
        //dueDate: dueDate
        name,
        dueDate
    });


    inputElem.value = '';

    renderTodoList();
    todoStorage();
}

function todoStorage(){
    localStorage.setItem('todolist',JSON.stringify(todoList));
}