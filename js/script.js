const inputContainer=document.querySelector(".input");
const input=inputContainer.firstElementChild;
const submit=inputContainer.lastElementChild;

                    // every time load 
document.addEventListener('DOMContentLoaded',getSavedTodo);
function getSavedTodo(){
    validation();
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
function validation(){
        if(localStorage.getItem('allWork') === null){
            allWork = [];
        }
        else{
            allWork=JSON.parse(localStorage.getItem("allWork"));
        }
}

function submitToLocal(){
    if(input.value){
        validation();
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
    }
    else if(item.classList[0] ==='deleteBox'){
        removeFromLocal(item.parentElement);
        item.parentElement.remove();
    }
}

function removeFromLocal(item){
    validation();
    const todoText=item.firstElementChild.innerText;
    allWork.splice(allWork.indexOf(todoText),1);
    localStorage.setItem('allWork',JSON.stringify(allWork));
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