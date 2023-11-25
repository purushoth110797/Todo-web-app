// Accessing the todo item container
let todoItemsContainer = document.getElementById("todoItemsContainer");
// Accessing the add button
let addTodoButton   = document.getElementById("addTodoButton");
// Accessing the add button
let saveTodoButton   = document.getElementById("saveTodoButton");

// To get the data from the local storage
function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);

    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
};

// initialise the todoList
let todoList = getTodoListFromLocalStorage();

// variable to count the todo item
let todoCount = todoList.length;

// adding event listener to the save buttons
saveTodoButton.onclick = function(){
    localStorage.setItem("todoList", JSON.stringify(todoList));
};


// function to change the task status
function onTodoStatusChange(checkboxId,labelId,todoId) {
    // Get the checkbox and label element to change it dyanamically when the check box is clicked!
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    // strike through the label element is not checked when clicking and vice versa
    // if (checkboxElement.checked === true){
    //     labelElement.classList.add("checked");
    // } else {
    //     labelElement.classList.remove("checked");
    // }  
    // instead of above if loop we can use the toggle function
    labelElement.classList.toggle("checked");

    // getting the index of the todo object and store the status in the local storage
    let todoObjectIndex = todoList.findIndex(function(eachItem) {
        let eachTodoId = "todo" + eachItem.uniqueNo;
        // condition
        if (eachTodoId === todoId){
            return true;
        }
        else{
            return false;
        }
    })
    let todoObject = todoList[todoObjectIndex]

    // changing the ischecked status:
    if (todoObject.isChecked === true){
        todoObject.isChecked = false;
    }
    else{
        todoObject.isChecked = true;
    }
};

// function to delete the todo element
function onDeleteTodoElement(todoId){
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deleteTodoItemIndex = todoList.findIndex(function(eachitem) {
        let eachTodoId = "todo" + eachitem.uniqueNo;
        // condition
        if (eachTodoId === todoId){
            return true;
        }
        else {
            return false;
        }
    });

    // Deleting the Todo element
    todoList.splice(deleteTodoItemIndex,1);
}


// Create the function to increase the reusablility
function createAndAppendTodo(todo) {
    // checkbox id
    let checkboxId = "checkbox" + todo.uniqueNo;
    // label ID
    let labelId = "label" + todo.uniqueNo;
    // todo ID
    let todoId = 'todo' + todo.uniqueNo;
    // Creating the todo item container dynamically
    let todoElement = document.createElement('li');
    todoElement.classList.add("todo-item-container" , "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);
    // Create the input element and append this to the todoElement
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");
    // adding the event listener on check box to strike the task when completed:
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId,labelId,todoId);
    }
    // Append the element to todo element
    todoElement.appendChild(inputElement);

    // Create the element for the div element for label container
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("d-flex", "flex-row", "label-container");
    // Appending the labelContainer to the todoElement
    todoElement.appendChild(labelContainer);

    // Creating the label element indide the label container
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelElement.id = labelId;
    // initialize the label as checked if ischecked is true 
    if (todo.isChecked === true){
        labelElement.classList.add("checked");
    };
    // Add this label to the labelContainer
    labelContainer.appendChild(labelElement);

    // Create the delete icon container
    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    // Append the delete container into the label container
    labelContainer.appendChild(deleteIconContainer);

    // Create the delete icon component
    let deleteIconElement = document.createElement("i");
    deleteIconElement.classList.add("fa-solid", "fa-trash-arrow-up", "delete-icon");
    // Adding the event listener to the delete icon
    deleteIconElement.onclick = function() {
        onDeleteTodoElement(todoId);
    }
    // Append this to the delete icon container
    deleteIconContainer.appendChild(deleteIconElement);
};


// calling the createAndAppendTodo function to each element in the todo list:
for (let todo of todoList) {
    createAndAppendTodo(todo);
};

// Function to add the todo element the when the add button is clicked
function onAddTodo(){
    // get the user input value assess the input element
    let userInputElement = document.getElementById("userInput");
    // Get the user input values
    let userInputValue = userInputElement.value;
    // Show the alert message when the user input is empty
    if (userInputValue === ""){
        alert("Enter valid Text!");
        return;
    };
    // update the todo count
    todoCount= todoCount +1;
    // store the user input value and respective todo count in the new todo object
    let newTodo = {
        text: userInputValue,
        uniqueNo: todoCount,
        isChecked: false
    }
    todoList.push(newTodo);
    // create new todo using newTodo
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
};


// Adding the event listener on the add button
addTodoButton.onclick = function(){
    onAddTodo();
};






