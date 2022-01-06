var storageData = JSON.parse(sessionStorage.getItem('array'));
var tasksArr = (storageData == null) ? [] : storageData;
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

function getWord(){
    inputText = document.querySelector("#addTask");
}
function updateWord(boolean, id){
    for(let i= 0; i < tasksArr.length; i++){
        if(tasksArr[i][1] == id){
            tasksArr[i][2] = boolean;
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
        updateWord(false, pnextSibId);
    }
    else{ //uncompleted -> completed
        buttonParent.childNodes[0].setAttribute("class","fas fa-check-circle");
        pnextSib.style.fontStyle="italic";
        pnextSib.style.textDecoration="line-through";
        updateWord(true, pnextSibId);
    }    
}

function createList(text, count){
    var list = document.querySelector("#list");
        let li = document.createElement("li");
        let p = document.createElement("p");
        let iDone = document.createElement("i");
        let iDel = document.createElement("i");
        let doneButton = document.createElement("button");
        let delButton = document.createElement("button");

        p.textContent = text;
        li.setAttribute("id","li"+count);
        
        iDone.setAttribute("class","far fa-check-circle");
        iDel.setAttribute("class","fas fa-times");
        doneButton.setAttribute("id","done"+count);
        delButton.setAttribute("id","del"+count);
        p.setAttribute("id", count);

        doneButton.setAttribute("onclick","doneWord(this.id)");
        delButton.setAttribute("onclick","deleteWord(this.id)");
        
        list.appendChild(li);
        li.appendChild(doneButton);
        doneButton.appendChild(iDone);
        li.appendChild(p);
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

    }
    
}
