const inputContainer=document.querySelector(".input");
const input=inputContainer.firstElementChild;
const submit=inputContainer.lastElementChild;


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
        console.log(allWork);
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



                        // handel completed and uncompleted

document.querySelector('.lists').addEventListener('click',completedAndUncompleted);

function completedAndUncompleted(event){
    const item=event.target;
    // console.log(item);
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