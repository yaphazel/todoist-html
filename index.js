var inputText;
var count = 0;
function getWord(){
    inputText = document.querySelector("#addTask")
}
function doneWord(name){
    const buttonParent = document.getElementById(name)
    const pnextSib = buttonParent.nextElementSibling
    if (pnextSib.style.fontStyle =="italic"){
        buttonParent.childNodes[0].setAttribute("class","far fa-check-circle")
        pnextSib.style.fontStyle="normal"
        pnextSib.style.textDecoration="none"
    }
    else{
        buttonParent.childNodes[0].setAttribute("class","fas fa-check-circle")
        pnextSib.style.fontStyle="italic"
        pnextSib.style.textDecoration="line-through"
    }
    
}

function deleteWord(name){
    const buttonParent = document.getElementById(name)
    buttonParent.parentElement.remove()
}
function addToList(){
    var text = inputText.value
    if (text == ""){
        return false
    }
    else{
        count++
        var list = document.querySelector("#list")
        let li = document.createElement("li")
        let p = document.createElement("p")
        let iDone = document.createElement("i")
        let iDel = document.createElement("i")
        let doneButton = document.createElement("button")
        let delButton = document.createElement("button")

        p.textContent = text;
        li.setAttribute("id","li"+count)
        
        iDone.setAttribute("class","far fa-check-circle")
        iDel.setAttribute("class","fas fa-times")
        doneButton.setAttribute("id","done"+count)
        delButton.setAttribute("id","del"+count)

        doneButton.setAttribute("onclick","doneWord(this.id)")
        delButton.setAttribute("onclick","deleteWord(this.id)")


        
        list.appendChild(li)
        li.appendChild(doneButton)
        doneButton.appendChild(iDone)
        li.appendChild(p)
        li.appendChild(delButton)
        delButton.appendChild(iDel) 
        //Format 
        // <ul>
        //    <li> 
        //     <button><i></i></button>
        //     <p></p>
        //     <button><i></i></button>
        //    </li>        
        // </ul>
    }
    
}
