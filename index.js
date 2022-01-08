var storageData = JSON.parse(sessionStorage.getItem('array'));
var tasksArr = (storageData == null) ? [] : storageData;
var modeData = JSON.parse(sessionStorage.getItem('mode'));
var colorMode = (modeData == null || modeData == true) ? true : false;
var inputText;
var count = 0;


if (tasksArr != []){
    var innerCount = 0;
    tasksArr.forEach(task => {
        createList(task[0] , task[1]);
        innerCount = task[1];
        (task[2] == true) ? doneWord("done"+task[1]) : null; 
    }) 
    count = innerCount;  
} 
if(colorMode == false){
    document.body.classList.toggle("dark-mode")
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const date = new Date();
let fullday = date.getDate()+" "+months[date.getMonth()]+" "+date.getFullYear()
document.getElementById("displayDate").innerHTML = fullday

function getWord(){
    inputText = document.querySelector("#addTask");
}
function updateStatus(boolean, id){
    for(let i= 0; i < tasksArr.length; i++){
        if(tasksArr[i][1] == id){
            tasksArr[i][2] = boolean;
            sessionStorage.setItem('array', JSON.stringify(tasksArr));
            break;
    }}
}
function updateWord(task, id){
    for(let i= 0; i < tasksArr.length; i++){
        if(tasksArr[i][1] == id){
            tasksArr[i][0] = task;
            sessionStorage.setItem('array', JSON.stringify(tasksArr));
            break;
    }}
}
function doneWord(name){
    const buttonParent = document.getElementById(name);
    const pnextSib = buttonParent.nextElementSibling;
    const pnextSibId = buttonParent.nextElementSibling.id;
    if (pnextSib.style.fontStyle =="italic"){ //completed -> uncompleted
        buttonParent.childNodes[0].setAttribute("class","far fa-check-circle");
        pnextSib.style.fontStyle="normal";
        pnextSib.style.textDecoration="none";
        updateStatus(false, pnextSibId);
    }
    else{ //uncompleted -> completed
        buttonParent.childNodes[0].setAttribute("class","fas fa-check-circle");
        pnextSib.style.fontStyle="italic";
        pnextSib.style.textDecoration="line-through";
        updateStatus(true, pnextSibId);
    }    
}

function createList(text, count){
    var list = document.querySelector("#list");
        let li = document.createElement("li");
        let p = document.createElement("p");
        let iDone = document.createElement("i");
        let iEdit = document.createElement("i");
        let iDel = document.createElement("i");
        let doneButton = document.createElement("button");
        let editButton = document.createElement("button");
        let delButton = document.createElement("button");

        p.textContent = text;
        li.setAttribute("id","li"+count);
        
        iDone.setAttribute("class","far fa-check-circle");
        iEdit.setAttribute("class","fas fa-pen");
        iDel.setAttribute("class","fas fa-times");
        doneButton.setAttribute("id","done"+count);
        editButton.setAttribute("id","edit"+count);
        delButton.setAttribute("id","del"+count);
        p.setAttribute("id", count);
        p.setAttribute("class", "task");

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
}
function addToList(){
    var text = inputText.value;
    if (text == ""){
        return false;
    }
    else{
        count++;
        tasksArr.push([text, count, false]);     
        createList(text,count);
        sessionStorage.setItem('array', JSON.stringify(tasksArr));
        document.getElementById("addTask").value = "";

    } 
}


function changeMode(){
    document.body.classList.toggle("dark-mode")
    let mode = document.getElementById("changeMode");
    let modeprevSib = mode.previousElementSibling;
    if(colorMode == true){ //light -> dark
        mode.innerHTML = "Light";
        modeprevSib.setAttribute("class","far fa-sun");
        colorMode = false;
        sessionStorage.setItem('mode', JSON.stringify(colorMode));
    }
    else{ // dark -> light
        mode.innerHTML = "Dark";
        modeprevSib.setAttribute("class","far fa-moon");
        colorMode = true;  
        sessionStorage.setItem('mode', JSON.stringify(colorMode));
    } 
    
}
var edit = false;
function editWord(name){
    var button = document.getElementById(name);
    var p = button.previousElementSibling;
    var pId = button.previousElementSibling.id;
    var pText = p.innerHTML;
    var li = button.parentElement;
    var allBut = document.querySelectorAll('button')
    if (edit == false){
        for(let i= 0; i < allBut.length; i++){
            allBut[i].disabled = true;
        }
        button.disabled=false;
        button.children[0].setAttribute("class","fas fa-check")
        li.removeChild(p);
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", pId);
        input.setAttribute("value", pText);
        li.insertBefore(input, li.children[1]);
        edit = true;

    }
    else{
        for(let i= 0; i < allBut.length; i++){
            allBut[i].disabled = false;
        }
        button.children[0].setAttribute("class","fas fa-pen");
        let input = document.getElementById(pId);
        let inputText = input.value;
        li.removeChild(input);
        let p = document.createElement("p");
        p.setAttribute("id", pId);
        p.setAttribute("class", "task");
        p.textContent = inputText;
        li.insertBefore(p, li.children[1]);
        updateWord(inputText,pId);
        edit = false;
    }
    var inputEdit = document.getElementById(pId);
    if(inputEdit != null){
    inputEdit.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
         event.preventDefault();
         document.getElementById(name).click();
        }
    });
}

}

var input = document.getElementById("addTask");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("button").click();
  }
});
