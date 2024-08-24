import { Display,searchInput,selectAll,deleteSelectedButton,countOfSelected,noneblock} from "./dom.js";

const API = 'https://66c2cf27d057009ee9bdf8d3.mockapi.io/todoapp/Data_EX3';

let atr='';

deleteSelectedButton.onclick=()=>{
    DeleteAll();
}

selectAll.onchange=(e)=>{
    SelectAll(e.target.checked);
}

searchInput.oninput=(e)=>{
    if(e.target.value.trim()!='')
    {
        atr = '?&name='+e.target.value.trim();
        GetData();
    }
    else
    {
        atr='';
        GetData();
    }
}

async function SelectAll(bl) {
    try {
        const { data } = await axios.get(API);
        for (const e of data) {
            e.deleteStatus = bl;
            try {
                const response = await axios.put(`${API}/${e.id}`, e);
            } catch (error) {
                console.error(error);
            }
        }
        GetData();
    } catch (error) {
        console.error(error);
    }
}



async function DeleteAll() {
    try {
        const {data} = await axios.get(API);
        for (const e of data){
            if(e.deleteStatus){
                try {
                    const response = await axios.delete(`${API}/${e.id}`);
                } catch (error) {
                    console.error(error);
                    
                }
            }
        }
        GetData();
    } catch (error) {
        console.error(error);
    }
}


async function DeleteData(id) {
    try {
        const response = await axios.delete(`${API}/${id}`);
        GetData();
    } catch (error) {
        console.error(error);
        
    }
}

async function PutData(Obj,id) {
    try {
        const response = await axios.put(`${API}/${id}`,Obj);
        GetData();
    } catch (error) {
        console.error(error);
        
    }
}

async function PostData(Obj) {
    try {
        const response = await axios.post(API,Obj);
        GetData();
    } catch (error) {
        console.error(error);
        
    }
}

async function GetData() {
    try {
        const {data} = await axios.get(API+atr);
        let cnt=0;
        for(let e of data){
            if(e.deleteStatus) cnt++;
        }
        if(cnt){
            noneblock.style.display = 'flex';
            noneblock.style.justifyContent = 'space-between';
            countOfSelected.innerHTML = cnt+' selected';
        }
        else{
            noneblock.style.display = 'none';
        }
        Display(data);
    } catch (error) {
        console.error(error);
        Display([])
    }
}

export {GetData,PostData,PutData,DeleteData};