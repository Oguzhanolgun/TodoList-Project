const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");



eventListeners();

function eventListeners() {

    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);

}
String.prototype.toTRLowerCase = function() {
    for (var i = ["Ç", "Ü", "Ğ", "I", "İ", "Ş", "Ö"], r = ["ç", "ü", "ğ", "ı", "i", "ş", "ö"], t = this, n = 0; n < i.length; n++)
        t = t.replace(new RegExp(i[n],"g"), r[n]);
    return t.toLowerCase();
  };



function clearAllTodos() {

    while(todoList.firstElementChild != null) {
        todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
}

function filterTodos(e) {
    let filterValue = e.target.value.toTRLowerCase();
    let listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(listItem => {
        let text = listItem.textContent.toTRLowerCase();
        if (text.indexOf(filterValue) === -1) {
            listItem.setAttribute("style", "display:none!important");
        }
        else {
            listItem.setAttribute("style", "display:block");
        }
    })

}

function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodosFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo basariyla silindi.");
    }
}

function deleteTodosFromStorage(deleteTodo) {
    let todos = getTodosFromStorage();
    todos.forEach((todo, index) => {
        if(todo === deleteTodo) {
            todos.splice(index,1);
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI () {
    let todos = getTodosFromStorage();
    todos.forEach(todo => {
        addTodoToUI(todo);
    });
}

function addTodo(e) {
    

    const newTodo = todoInput.value.trim();
    if (newTodo === "") {
        showAlert("danger","Lütfen bir todo giriniz");
    } else if (controller(newTodo)) {
        showAlert("danger", "bu Todo zaten var.");
    } 
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Todo başarıyla eklendi.");
    }

    e.preventDefault();

}

function getTodosFromStorage() {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
    todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo) {
   let todos = getTodosFromStorage();
   todos.push(newTodo);
   localStorage.setItem("todos",JSON.stringify(todos));
}

function showAlert(type, message) {
//     <div class="alert alert-danger" role="alert">
//          This is a danger alert—check it out!
//     </div>
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    setTimeout(function() {
        alert.remove();
    }, 1000);
}

function addTodoToUI(newTodo) {
    //  <li class="list-group-item d-flex justify-content-between">
    //                          Todo 1
    //                          <a href = "#" class ="delete-item">
    //                              <i class = "fa fa-remove"></i>
    //                          </a>
    //  </li>


    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    todoList.appendChild(listItem);
    todoInput.value = "";
    

}

function controller(todo){
    answer = false;
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function(eleman){
        if (eleman.textContent == todo){
            answer =  true;
        }
 
 
    })
 
    return answer;
}
