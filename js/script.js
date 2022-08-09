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
    listShowICheck.className='fa-solid fa-square-check iconStyle checkBox';
    const listShowITrash=document.createElement('i');
    listShowITrash.className='fa-solid fa-trash-can iconStyle deleteBox';
    listShow.appendChild(listShowP);
    listShow.appendChild(listShowICheck);
    listShow.appendChild(listShowITrash);
    lists.appendChild(listShow);
    listShow.firstChild.innerText=input.value;
    input.value="";
}
                    // add todo to array & localStorage and listShow

function submitToLocal(){
    if(input.value){
        let allWork;
        if(localStorage.getItem('allWork') === null){
            allWork = [];
        }
        else{
            allWork=JSON.parse(localStorage.getItem("allWork"));
        }
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
