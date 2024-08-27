import { PostData,PutData,DeleteData } from "./api.js";

const box = document.querySelector('.box');

const addUserButton = document.querySelector('.addUserButton');
const addUserDialog = document.querySelector('.addUserDialog');
const addUserForm = document.querySelector('.addUserForm');
const closeAddUserDialog = document.querySelector('.closeAddUserDialog');

const moreActionsDialog = document.querySelector('.moreActionsDialog');
const closeMoreActionsDialog = document.querySelector('.closeMoreActionsDialog');

const editUserButton = document.querySelector('.editUserButton');
const editUserDialog = document.querySelector('.editUserDialog');
const editUserForm = document.querySelector('.editUserForm');
const closeEditUserDialog = document.querySelector('.closeEditUserDialog');

const deleteUserButton = document.querySelector('.deleteUserButton');

const searchInput = document.querySelector('.searchInput');

const selectAll = document.querySelector('.selectAll');

const noneblock = document.querySelector('.noneblock');
const countOfSelected = document.querySelector('.countOfSelected');
const deleteSelectedButton = document.querySelector('.deleteSelectedButton');

const switchThemeButton = document.querySelector('.switchThemeButton');

let ind = 0;

localStorage.setItem('theme', 'true');

switchThemeButton.onclick=()=>{
    let x=localStorage.getItem('theme');
    if(x=='true') x='false';
    else x='true';
    localStorage.setItem('theme',x);
    document.querySelector('body').className = localStorage.getItem('theme');
}

deleteUserButton.onclick=()=>{
    DeleteData(ind);
    moreActionsDialog.close();
}

closeEditUserDialog.onclick=()=>{
    editUserDialog.close();
}

editUserForm.onsubmit=(e)=>{
    e.preventDefault();
    if(editUserForm.editName.value.trim()=='' || editUserForm.editCompany.value.trim()=='' || editUserForm.editRole.value.trim()=='')
    {
        alert('Please fill all fields!')
    }
    else
    {
        let Obj={
            name: editUserForm.editName.value,
            company: editUserForm.editCompany.value,
            role: editUserForm.editRole.value,
            status: false,
            deleteStatus: false
        }
        PutData(Obj,ind);
        editUserDialog.close();
        moreActionsDialog.close();
    }
}

editUserButton.onclick = () => {
    editUserDialog.showModal();
}

closeMoreActionsDialog.onclick=()=>{
    moreActionsDialog.close();
}

closeAddUserDialog.onclick=()=>{
    addUserForm.reset();
    addUserDialog.close();
}

addUserForm.onsubmit=(e)=>{
    e.preventDefault();
    if(addUserForm.addName.value.trim()=='' || addUserForm.addCompany.value.trim()=='' || addUserForm.addRole.value.trim()=='')
    {
        alert('Please fill all fields!')
    }
    else
    {
        let Obj={
            name: addUserForm.addName.value,
            company: addUserForm.addCompany.value,
            role: addUserForm.addRole.value,
            status: false,
            deleteStatus: false
        }
        PostData(Obj);
        addUserForm.reset();
        addUserDialog.close();
    }
}

addUserButton.onclick=()=>{
    addUserDialog.showModal();
}

function Display(Data) {
    box.innerHTML= '';
    Data.forEach((e,i) => {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        let td6 = document.createElement('td');
        let td7 = document.createElement('td');
        let td1_1 = document.createElement('input');
        let td7_1 = document.createElement('button');
        td1_1.type = 'checkbox';
        td1_1.checked = e.deleteStatus;
        td1_1.onchange=(el)=>{
            e.deleteStatus=!e.deleteStatus;
            PutData(e,e.id);
        }
        td2.innerHTML = e.name;
        td3.innerHTML = e.company;
        td4.innerHTML = e.role;
        td5.innerHTML = "Yes";
        td6.innerHTML = e.status?'Active':'Banned';
        td6.onclick=()=>{
            e.status=!e.status;
            PutData(e,e.id);
        }
        td7_1.innerHTML = '...';
        td7_1.onclick = () => {
            ind = e.id;
            editUserForm.editName.value = e.name;
            editUserForm.editCompany.value = e.company;
            editUserForm.editRole.value = e.role;
            moreActionsDialog.showModal();
        }
        td1.appendChild(td1_1);
        td7.appendChild(td7_1);
        tr.append(td1,td2,td3,td4,td5,td6,td7);
        box.appendChild(tr);
    });
}

export {Display,searchInput,selectAll,deleteSelectedButton,noneblock,countOfSelected}