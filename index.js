// Storage Variables
var storageData = JSON.parse(sessionStorage.getItem('array'));
let tasksArr = (storageData == null) ? [] : storageData;
var modeData = JSON.parse(sessionStorage.getItem('mode'));
var colorMode = (modeData == null || modeData == true) ? true : false;

// Global Variables
var inputId = 0;
var editBool = false;
var input = document.querySelector("#addTask");
var filterOption = document.querySelector("#selectClass")
var todoList = document.querySelector("#displayList");

// Event Listener
filterOption.addEventListener("click",filterTasks)
input.addEventListener("keyup",enterSubmitTask)
 
// Onload functions 
// Display saved tasks on refresh
if (tasksArr != []){    
    var count = 0;
    tasksArr.forEach(task => {
        createList(task[0] , task[1]);
        count = task[0];
        (task[2] == true) ? doneWord("done"+task[0]) : null; 
    }) 
    inputId = count;  
    document.getElementById("displayCount").innerHTML = tasksArr.length + " Tasks"
} 

       
// Colour Mode
if(colorMode == false){ // toggle to dark mode on refresh
    let mode = document.getElementById("changeMode");
    document.body.classList.toggle("dark--theme")
    mode.innerHTML = "Light";
    mode.previousElementSibling.setAttribute("class","mode__i far fa-sun");
}
// Date
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const date = new Date();
let fullday = date.getDate()+" "+months[date.getMonth()]+" "+date.getFullYear()
document.getElementById("displayDate").innerHTML = fullday

// Functions
function filterTasks(){
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
function countUpdate(){ // Tasks count
    var count = 0;
    tasksArr.forEach(task => {
        if(task[2] == false){
            count++;
        }else{count = count}
    })
    document.getElementById("displayCount").innerHTML = count + " Tasks"
}

function updateWord(task, id){ // Edit task
    for(let i = 0; i < tasksArr.length; i++){
        if(tasksArr[i][0] == id){
            tasksArr[i][1] = task;
            sessionStorage.setItem('array', JSON.stringify(tasksArr));
            break;
    }}
}

function updateStatus(boolean, id){ // Completion status updata
    for(let i= 0; i < tasksArr.length; i++){
        if(tasksArr[i][0] == id){
            tasksArr[i][2] = boolean;
            tasksArr.push(tasksArr[i])
            tasksArr.splice(i , 1)
            sessionStorage.setItem('array', JSON.stringify(tasksArr));
    }}
}

function doneWord(name){ // Word completed
    const buttonParent = document.getElementById(name);
    const liParent = buttonParent.parentElement;
    const pnextSib = buttonParent.nextElementSibling;
    const pnextSibId = buttonParent.nextElementSibling.id;
    if (pnextSib.style.fontStyle =="italic"){ //completed -> uncompleted
        buttonParent.childNodes[0].setAttribute("class","list__li__i far fa-check-circle");
        liParent.className = "list__li uncomplete"
        pnextSib.style.fontStyle="normal";
        pnextSib.style.textDecoration="none";
        updateStatus(false, pnextSibId);
        countUpdate()
    }
    else{ //uncompleted -> completed
        buttonParent.childNodes[0].setAttribute("class","list__li__i fas fa-check-circle");
        liParent.className = "list__li complete"
        pnextSib.style.fontStyle="italic";
        pnextSib.style.textDecoration="line-through";
        updateStatus(true, pnextSibId);
        countUpdate()
    }    
}

function createList(inputId, text){ // Print task list
    var list = document.querySelector("#displayList");
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
    doneButton.setAttribute("onclick","doneWord(this.id)");
    editButton.setAttribute("onclick","editWord(this.id)");
    delButton.setAttribute("onclick","deleteWord(this.id)");
        
    list.appendChild(li);
    li.appendChild(doneButton);
    doneButton.appendChild(iDone);
    li.appendChild(p);
    li.appendChild(editButton);
    editButton.appendChild(iEdit); 
    li.appendChild(delButton);
    delButton.appendChild(iDel); 
}
// Add Task
function addToList(){
    var text = input.value;
    if (text == ""){
        return false;
    }
    else{
        inputId++;
        tasksArr.push([inputId, text, false]);     
        createList(inputId, text);
        sessionStorage.setItem('array', JSON.stringify(tasksArr));
        input.value = "";
        countUpdate()
    } 
}

// Delete task
function deleteWord(name){
    var index = 0;
    const buttonParent = document.getElementById(name);
    var textClass = parseInt(buttonParent.previousElementSibling.id);
    buttonParent.parentElement.remove();
    for(let i= 0; i < tasksArr.length; i++){
        if(tasksArr[i][1] == textClass){
            index = i;
            break;
    }}
    tasksArr.splice(index, 1);
    sessionStorage.setItem('array', JSON.stringify(tasksArr));
    countUpdate()
}

// Toggle colour mode
function changeMode(){
    document.body.classList.toggle("dark--theme")
    let mode = document.getElementById("changeMode");
    let modeprevSib = mode.previousElementSibling;
    if(colorMode == true){ //light -> dark
        mode.innerHTML = "Light";
        modeprevSib.setAttribute("class","mode__i far fa-sun");
        colorMode = false;
        sessionStorage.setItem('mode', JSON.stringify(colorMode));
    }
    else{ // dark -> light
        mode.innerHTML = "Dark";
        modeprevSib.setAttribute("class","mode__i far fa-moon");
        colorMode = true;  
        sessionStorage.setItem('mode', JSON.stringify(colorMode));
    } 
    
}

function editWord(name){
    var button = document.getElementById(name);
    var p = button.previousElementSibling;
    var pId = button.previousElementSibling.id;
    var pText = p.innerHTML;
    var li = button.parentElement;
    var allBut = document.querySelectorAll('button')
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
        updateWord(inputText,pId);
        editBool = false;
    }
    var inputEdit = document.getElementById(pId);
    if(inputEdit != null){
    inputEdit.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
         event.preventDefault();
         document.getElementById(name).click();
        }
    });
}}

function enterSubmitTask(event){
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("button").click();
}};