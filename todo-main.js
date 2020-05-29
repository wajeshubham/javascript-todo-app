const todoInput = document.querySelector("#to-do-input");
const todoBtn = document.querySelector("#to-do-btn");
const todoList = document.querySelector("#event");
const todoFilter = document.querySelector(".filter");

todoBtn.addEventListener("click", addToDo);
todoFilter.addEventListener('click', filterToDo);
document.addEventListener("DOMContentLoaded", showToDos);

function addToDo(event) {
    event.preventDefault();
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");

    const toDoLi = document.createElement("li");
    toDoLi.innerText = todoInput.value;
    toDoLi.classList.add("todo-item");
    saveToDos(todoInput.value);

    const toDoDelBtn = document.createElement("button");
    toDoDelBtn.innerHTML = "<i class='far fa-trash-alt'></i>";
    toDoDelBtn.classList.add("delete-btn");

    const toDoChkBtn = document.createElement("button");
    toDoChkBtn.innerHTML = "<i class='far fa-check-square'></i>";
    toDoChkBtn.classList.add("checked-btn");

    toDoDiv.appendChild(toDoLi);
    toDoDiv.appendChild(toDoChkBtn);
    toDoDiv.appendChild(toDoDelBtn);
    let ul= document.getElementById("event");
    ul.insertBefore(toDoDiv,ul.childNodes[0]);
    toDoDelBtn.addEventListener('click', delEvent);
    toDoChkBtn.addEventListener('click', chkEvent);
    todoInput.value = "";
}

function delEvent(event) {
    const eventItem = event.target;
    if (eventItem.classList[0] === 'delete-btn') {
        const todo = eventItem.parentElement;
        todo.classList.add('fall');
        removeLocalToDos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }
}

function chkEvent(event) {
    const eventItem = event.target;
    if (eventItem.classList[0] === 'checked-btn') {
        const todo = eventItem.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterToDo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "none";
                } else {
                    todo.style.display = "flex";
                }
                break;
        }
    });
}

function saveToDos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        // if there is no todos create one
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function showToDos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        // if there is no todos create one
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add("todo");

        const toDoLi = document.createElement("li");
        toDoLi.innerText = todo;
        toDoLi.classList.add("todo-item");

        const toDoDelBtn = document.createElement("button");
        toDoDelBtn.innerHTML = "<i class='far fa-trash-alt'></i>";
        toDoDelBtn.classList.add("delete-btn");

        const toDoChkBtn = document.createElement("button");
        toDoChkBtn.innerHTML = "<i class='far fa-check-square'></i>";
        toDoChkBtn.classList.add("checked-btn");

        toDoDiv.appendChild(toDoLi);
        toDoDiv.appendChild(toDoChkBtn);
        toDoDiv.appendChild(toDoDelBtn);
        document.getElementById("event").appendChild(toDoDiv);
        toDoDelBtn.addEventListener('click', delEvent);
        toDoChkBtn.addEventListener('click', chkEvent);

    });
}


function removeLocalToDos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        // if there is no todos create one
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.splice(todos.indexOf(todo.children[0].innerText), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
