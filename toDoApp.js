const toDoInput = document.querySelector(".todo-add input");
const newToDo = document.querySelector("ul.todo-items");
const addBtn = document.querySelector(".todo-add-btn");
const totalItems = document.querySelector(".output");

let tasks = [];

function renderTask(){
    
    newToDo.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        newToDo.innerHTML += `<li data-id=${tasks[i].id}>
        <span class="todoID">${tasks[i].id}.</span>
        <span class="${tasks[i].completed?'completed': ''}">${tasks[i].title}</span>
        <div class="removeTodo"><i class="far fa-trash-alt"></i></div>
        </li>`;     
        
    }

    countTasks();
    toDoInput.value='';
    toDoInput.focus();
}

function countTasks(){
    let counter=tasks.length;
    totalItems.innerHTML = counter;
}

function addTask(){
    let taskText = toDoInput.value;
    let newId;

    if (tasks.length === 0){
        newId = 1;
    }
    else{
        newId = tasks[tasks.length-1].id + 1;
    }
    
    let newTask = {
        "id": newId,
        "title": taskText,
        "completed": false
    };

    tasks = [...tasks, newTask];

    renderTask();
}

function removeTask(e){

    let targetTask;
    if (e.target.classList.contains("fa-trash-alt")){
        targetTask = e.target.parentNode.parentNode;
    }else if( e.target.classList.contains('removeTodo')){
		targetTask = e.target.parentNode;
    }else{
        return;
    }

    const indexDelItem = targetTask.dataset.id*1;
    let index = tasks.findIndex(task => task.id === indexDelItem);

    if (index >= 0){
        tasks.splice(index,1);
    }

    renderTask();
}


function completedTask(e){
    let targetNode;
	if (e.target.tagName === "LI"){
		targetNode = e.target;
	}else if (e.target.tagName === "SPAN"){
		targetNode = e.target.parentElement;
	}else{
		return;
	}
	const todoID = targetNode.dataset.id*1;

	let idx = tasks.findIndex(todo => todo.id === todoID);

	// toggle todo object 'completed' property value:
	tasks[idx].completed = !tasks[idx].completed;
	localStorage.setItem('tasks',JSON.stringify(tasks));

	renderTask();
}
newToDo.addEventListener('click', completedTask);
newToDo.addEventListener("click", removeTask);
addBtn.addEventListener("click", addTask);
toDoInput.addEventListener("keyup", e =>{
    if(e.keyCode === 13){
        addTask();
    }
});

