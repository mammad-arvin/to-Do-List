const inputContainer=document.querySelector(".input");
const input=inputContainer.firstElementChild;
const submit=inputContainer.lastElementChild;

                    // every time load 
document.addEventListener('DOMContentLoaded',getSavedTodo);
function getSavedTodo(){
    allWorkValidation();
    allWork.forEach(todo => {
        const lists=document.querySelector('.lists');
        const listShow=document.createElement('div')
        listShow.className='listShow';
        const listShowP=document.createElement('p');
        listShowP.className='listShowPara';
        const listShowICheck=document.createElement('i');
        listShowICheck.className='checkBox fa-solid fa-square-check iconStyle';
        const listShowITrash=document.createElement('i');
        listShowITrash.className='deleteBox fa-solid fa-trash-can iconStyle';
        listShow.appendChild(listShowP);
        listShow.appendChild(listShowICheck);
        listShow.appendChild(listShowITrash);
        lists.appendChild(listShow);
        listShow.firstChild.innerText=todo;
    });
    completedValidation()
    completed.forEach(todo =>{
        const lists=document.querySelector('.lists');
        const listShow=document.createElement('div')
        listShow.className='listShow';
        const listShowP=document.createElement('p');
        listShowP.className='listShowPara checked';
        const listShowICheck=document.createElement('i');
        listShowICheck.className='checkBox fa-solid fa-square-check iconStyle';
        const listShowITrash=document.createElement('i');
        listShowITrash.className='deleteBox fa-solid fa-trash-can iconStyle';
        listShow.appendChild(listShowP);
        listShow.appendChild(listShowICheck);
        listShow.appendChild(listShowITrash);
        lists.appendChild(listShow);
        listShow.firstChild.innerText=todo;
    })
}
                    // add listShow
function addingListShow(){
    const lists=document.querySelector('.lists');
    const listShow=document.createElement('div')
    listShow.className='listShow';
    const listShowP=document.createElement('p');
    listShowP.className='listShowPara';
    const listShowICheck=document.createElement('i');
    listShowICheck.className='checkBox fa-solid fa-square-check iconStyle';
    const listShowITrash=document.createElement('i');
    listShowITrash.className='deleteBox fa-solid fa-trash-can iconStyle';
    listShow.appendChild(listShowP);
    listShow.appendChild(listShowICheck);
    listShow.appendChild(listShowITrash);
    lists.appendChild(listShow);
    listShow.firstChild.innerText=input.value;
    input.value="";
}
                    // add todo to array & localStorage and listShow
let allWork;
function allWorkValidation(){
        if(localStorage.getItem('allWork') === null){
            allWork = [];
        }
        else{
            allWork=JSON.parse(localStorage.getItem("allWork"));
        }
}
function inputValidation(text){
    const inputText=text.split("");
    let result=false;
    for(let i of inputText){
        if(i !== " "){
            result=true;
        }
    }
    return result;
}
function submitToLocal(){
    const validate=inputValidation(input.value)
    if(input.value && validate){
        allWorkValidation();
        allWork.push(input.value);
        localStorage.setItem('allWork',JSON.stringify(allWork))
        addingListShow();
    }
}
function enterKey(event){
    if(event.keyCode === 13){
        submitToLocal();
    }
}
submit.addEventListener('click',submitToLocal)
input.addEventListener('keydown',enterKey)



                  // handel completed and uncompleted button and remove from localStorage

document.querySelector('.lists').addEventListener('click',completedAndUncompleted);

function completedAndUncompleted(event){
    const item=event.target;
    if(item.classList[0]=== 'checkBox'){
        const previousEl=item.previousElementSibling;
        previousEl.classList.toggle('checked');
        completedWorksHandel(previousEl);
    }
    else if(item.classList[0] ==='deleteBox'){
        removeFromLocal(item.parentElement);
        item.parentElement.remove();
    }
}

function removeFromLocal(item){
    allWorkValidation();
    const todoText=item.firstElementChild.innerText;
    if(allWork.indexOf(todoText)>=0){
        allWork.splice(allWork.indexOf(todoText),1);
        localStorage.setItem('allWork',JSON.stringify(allWork));
    }
    else{
        completedValidation();
        completed.splice(completed.indexOf(todoText),1);
        localStorage.setItem('completed',JSON.stringify(completed));
    }
}

                                // filter todos
const lists=document.querySelector('.lists');
const todoFiler=document.querySelector('#todoFiler');
todoFiler.addEventListener('click',filterTodos);

function filterTodos(event){   

    const todos=lists.children;

    for(let child of todos){
        const listShowPara=child.firstChild;
        switch(event.target.value){
            case "all":
                child.style.display="flex";
                break;
            case "completed":
                if(listShowPara.classList.contains('checked')){
                    child.style.display="flex";
                    break
                }else{
                    child.style.display="none";
                }
                break;
            case "uncompleted":
                if(listShowPara.classList.contains('checked')){
                    child.style.display="none";
                    break
                }else{
                    child.style.display="flex";
                }
                break;
        }
    }
}

                    // show completed when document reload

let completed;
function completedValidation(){
    if(localStorage.getItem('completed') === null){
        completed = [];
    }
    else{
        completed=JSON.parse(localStorage.getItem("completed"));
    }
}
                // remove From Allwork and submit to completed or reverse
function completedWorksHandel(todoPara){
    completedValidation();
    todoText=todoPara.innerText;
    if(todoPara.classList.contains('checked')){
        completed.push(todoText);
        localStorage.setItem('completed',JSON.stringify(completed));
        allWork.splice(allWork.indexOf(todoText),1);
        localStorage.setItem('allWork',JSON.stringify(allWork));
        console.log(todoText);
    }else{
        allWork.push(todoText);
        localStorage.setItem('allWork',JSON.stringify(allWork));
        completed.splice(completed.indexOf(todoText),1);
        localStorage.setItem('completed',JSON.stringify(completed));
    }

}