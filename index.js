// Storage Variables
const storageData = JSON.parse(sessionStorage.getItem('array'));
let tasksArr = (storageData == null) ? [] : storageData;
const modeData = JSON.parse(sessionStorage.getItem('mode'));
let colorMode = (modeData == null || modeData == true) ? true : false;

// Global Variables
let inputId = 0; // assign id to tasks
let editBool = false; // remember color mode
let inputVal = document.querySelector("#addTask");
let currentMode = document.querySelector("#changeMode");
let filterOption = document.querySelector("#selectClass")
let todoList = document.querySelector("#displayList");

// Event Listener
window.addEventListener("DOMContentLoaded", loadTask)
window.addEventListener("DOMContentLoaded", loadColorMode)
window.addEventListener("DOMContentLoaded", loadDate)
filterOption.addEventListener("click",filterTasks)
inputVal.addEventListener("keyup",enterSubmitTask)


// Functions
function loadTask(){ // Display saved tasks on refresh
    if (tasksArr != []){
        let countTemp = 0;
        tasksArr.forEach(task => {
            createList(task[0] , task[1]);
            countTemp = task[0];
            (task[2] == true) ? doneTask("done"+task[0]) : null; 
        }) 
        if (countTemp > inputId){
            inputId = countTemp; 
            
        }
        document.getElementById("displayCount").innerHTML = tasksArr.length + " Tasks"
    } 
    else{
        return false
    }
};

 
function loadColorMode(){ // Toggle to selected current mode on refresh
     if(colorMode == false){ 
        document.body.classList.toggle("dark--theme")
        currentMode.innerHTML = "Light";
        currentMode.previousElementSibling.setAttribute("class","mode__i far fa-sun");
    }
} 
function loadDate(){ // Date
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date();
    let fullday = date.getDate()+ " " + months[date.getMonth()] + " " + date.getFullYear()
    document.getElementById("displayDate").innerHTML = fullday

} 

// Other Functions
function createList(inputId, text){ // Print task list
    let li = document.createElement("li");
    let p = document.createElement("p");
    let iDone = document.createElement("i");
    let iEdit = document.createElement("i");
    let iDel = document.createElement("i");
    let doneButton = document.createElement("button");
    let editButton = document.createElement("button");
    let delButton = document.createElement("button");

    p.textContent = text;
    p.setAttribute("class", "list__li__p");
    p.setAttribute("id", inputId);

    li.setAttribute("id","li"+inputId);
    li.setAttribute("class","list__li uncomplete");
        
    iDone.setAttribute("class","list__li__i far fa-check-circle");
    iEdit.setAttribute("class","list__li__i fas fa-pen");
    iDel.setAttribute("class","list__li__i fas fa-times");
    
    doneButton.setAttribute("id","done"+inputId);
    editButton.setAttribute("id","edit"+inputId);
    delButton.setAttribute("id","del"+inputId);
    doneButton.setAttribute("onclick","doneTask(this.id)");
    editButton.setAttribute("onclick","editTask(this.id)");
    delButton.setAttribute("onclick","deleteTask(this.id)");
        
    todoList.appendChild(li);
    li.appendChild(doneButton);
    doneButton.appendChild(iDone);
    li.appendChild(p);
    li.appendChild(editButton);
    editButton.appendChild(iEdit); 
    li.appendChild(delButton);
    delButton.appendChild(iDel); 
}

function addToList(){ // Add Task
    let text = inputVal.value;
    if (text == ""){
        return false;
    }else{
        inputId++;
        tasksArr.push([inputId, text, false]);     
        createList(inputId, text);
        sessionStorage.setItem('array', JSON.stringify(tasksArr));
        console.log(tasksArr)
        inputVal.value = "";
        countUpdate()
    } 
}
function enterSubmitTask(event){
     if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("button").click();
}};

function doneTask(name){ // Complete tasks
    const buttonParent = document.getElementById(name);
    const liParent = buttonParent.parentElement;
    const pnextSib = buttonParent.nextElementSibling;
    const pnextSibId = buttonParent.nextElementSibling.id;
    if (pnextSib.style.fontStyle =="italic"){ //completed -> uncompleted
        buttonParent.childNodes[0].setAttribute("class","list__li__i far fa-check-circle");
        liParent.className = "list__li uncomplete"
        pnextSib.style.fontStyle="normal";
        pnextSib.style.textDecoration="none";
        statusUpdate(false, pnextSibId);
        countUpdate();
        filterTasks();
    }
    else{ //uncompleted -> completed
        buttonParent.childNodes[0].setAttribute("class","list__li__i fas fa-check-circle");
        liParent.className = "list__li complete"
        pnextSib.style.fontStyle="italic";
        pnextSib.style.textDecoration="line-through";
        statusUpdate(true, pnextSibId);
        countUpdate()
        filterTasks();
    }    
}

function deleteTask(name){ // Delete tasks
    let indexTemp = 0;
    const buttonParent = document.getElementById(name);
    let idNum = name.replace( /^\D+/g, '')
    buttonParent.parentElement.remove();
    tasksArr.forEach(task =>{
        if(task[0] == idNum){
            tasksArr.splice(indexTemp, 1);
            sessionStorage.setItem('array', JSON.stringify(tasksArr));
            countUpdate();
        }
        indexTemp++;
    })
}

function editTask(name){ // Edit tasks
    let button = document.getElementById(name);
    let p = button.previousElementSibling;
    let pId = button.previousElementSibling.id;
    let pText = p.innerHTML;
    let li = button.parentElement;
    let allBut = document.querySelectorAll('button')
    if (editBool == false){
        for(let i= 0; i < allBut.length; i++){
            allBut[i].disabled = true;
        }
        button.disabled=false;
        button.children[0].setAttribute("class","list__li__i fas fa-check")
        li.removeChild(p);
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "list__li__input");
        input.setAttribute("id", pId);
        input.setAttribute("value", pText);
        li.insertBefore(input, li.children[1]);
        editBool = true;
    }
    else{
        for(let i= 0; i < allBut.length; i++){
            allBut[i].disabled = false;
        }
        button.children[0].setAttribute("class","list__li__i fas fa-pen");
        let input = document.getElementById(pId);
        let inputText = input.value;
        li.removeChild(input);
        let p = document.createElement("p");
        p.setAttribute("id", pId);
        p.setAttribute("class", "list__li__p");
        p.textContent = inputText;
        li.insertBefore(p, li.children[1]);
        wordUpdate(inputText,pId);
        editBool = false;
    }
    let inputEdit = document.getElementById(pId);
    if(inputEdit != null){
    inputEdit.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
         event.preventDefault();
         document.getElementById(name).click();
        }
    });
}}


function filterTasks(){ // Filter through tasks
    todoList.childNodes.forEach( tasks => {
        switch(filterOption.value){
            case 'all' :
                tasks.style.display = 'flex';
                break;
            case 'active':
                if(tasks.classList.contains('complete')){
                    tasks.style.display = 'none'
                }else{
                    tasks.style.display = 'flex'
                }
                break;
            case 'complete':
                if(tasks.classList.contains('uncomplete')){
                    tasks.style.display = 'none'
                }else{
                    tasks.style.display = 'flex'
                }
                break;
            default:
                console.log('Error in filterTasks function.')
                break;
        }
    })
}
function deleteComplete(){  // Delete all completed tasks
    let indexTemp = 0;
    tasksArr.forEach(task =>{
        if(task[2] == true){
            let liTemp = document.getElementById("del"+task[0])
            liTemp.parentNode.remove()
            tasksArr.splice(indexTemp, 1);
            sessionStorage.setItem('array', JSON.stringify(tasksArr))
        }
        indexTemp++
    })
}

function changeMode(){ // Toggle colour mode
    document.body.classList.toggle("dark--theme")
    let modePrevSib = currentMode.previousElementSibling;
    if(colorMode == true){ //light -> dark
        currentMode.innerHTML = "Light";
        modePrevSib.setAttribute("class","mode__i far fa-sun");
        colorMode = false;
        sessionStorage.setItem('mode', JSON.stringify(colorMode));
    }
    else{ // dark -> light
        currentMode.innerHTML = "Dark";
        modePrevSib.setAttribute("class","mode__i far fa-moon");
        colorMode = true;  
        sessionStorage.setItem('mode', JSON.stringify(colorMode));
    }   
}

// Functions for Updating

function statusUpdate(boolean, id){ // Completion status updata
    for(let i= 0; i < tasksArr.length; i++){
        if(tasksArr[i][0] == id){
            tasksArr[i][2] = boolean;
            sessionStorage.setItem('array', JSON.stringify(tasksArr));
    }}
}

function wordUpdate(task, id){ // Edit task
    for(let i = 0; i < tasksArr.length; i++){
        if(tasksArr[i][0] == id){
            tasksArr[i][1] = task;
            sessionStorage.setItem('array', JSON.stringify(tasksArr));
            break;
    }}
}

function countUpdate(){ // Update tasks count
    let countTemp = 0;
    tasksArr.forEach(task => {
        if(task[2] == false){
            countTemp++;
        }else{countTemp = countTemp}
    })
    document.getElementById("displayCount").innerHTML = countTemp + " Tasks"
}





