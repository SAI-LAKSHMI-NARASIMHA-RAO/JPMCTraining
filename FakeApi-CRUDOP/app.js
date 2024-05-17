async function getList(){
    const data=await axios.get("http://localhost:3000/users")
    const tbody=document.getElementById("listCrud")
    tbody.innerHTML="";
    data.data.forEach((item)=>{
        console.log(item);
        let row=document.createElement('tr')
        row.innerHTML=`
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.branch}</td>
        <td><button onclick="deleteItem(${item.id})">Delete</button></td>
        <td><button onclick="editItem(${item.id})">Edit</button></td>`
        tbody.appendChild(row);
    })
}
async function addData(){
    const data={
        id:(document.getElementById("id").value),
        name:document.getElementById("name").value,
        age:document.getElementById("age").value,
        branch:document.getElementById("branch").value,
    }
    const res=await axios.post("http://localhost:3000/users",data)
}

async function deleteItem(id){
    const del=await axios.delete(`http://localhost:3000/users/${id}`)
    alert(`Data with id : ${id} has been deleted`)
}

async function editItem(idea){
    const users=await axios.get("http://localhost:3000/users");
    const uarr=users.data
    const emp=uarr.find((e)=>e.id==idea)
    const {id:uid,name:uname,age:uage,branch:ubranch}=emp
    const data={
        name:uname,
        age:uage,
        branch:ubranch
    }
    if(document.getElementById("name").value!=null) data.name=document.getElementById("name").value;
    else if(document.getElementById("age").value!=null) data.age=document.getElementById("age").value
    else if(document.getElementById("branch").value!=null) data.branch=document.getElementById("branch").value;
    const edit=await axios.patch(`http://localhost:3000/users/${idea}`,data);
    alert(`Data with id: ${idea} has been updated`)
}
