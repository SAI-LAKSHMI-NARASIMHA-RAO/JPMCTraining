//Express API METHODS
const express=require('express')
const fs=require('fs')
const app=express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
var users=require('./users.json')
const getEmp=()=>{
    return users;
}
//GET METHOD
const setEmp=(employees)=>{
    fs.writeFile('./users.json',JSON.stringify(employees),(err)=>{
        if(err) console.log("Eror in writing..")
    })
}
app.get('/api/employees',(req,res)=>{
    var employees=getEmp();
    res.json(employees)
})
app.get('/api/employees/:id',(req,res)=>{
    const emp=employees.find(e=>e.id===parseInt(req.params.id))
    if(!emp) res.json({message:"Id doesn't exists"})
    else res.json(emp);
});

//POST METHOD
app.post('/api/employees',(req,res)=>{
    var employees=getEmp();
    const obj={
        id:employees.length+1,
        name:req.body.name,
        dept:req.body.dept 
    }
    employees.push(obj);
    setEmp(employees)
    res.json(obj)
});

//PUT OR PATCH METHOD
app.put('/api/employees/:id',(req,res)=>{
    var employees=getEmp();
    const emp=employees.find(e=>e.id===parseInt(req.params.id))
    if(!emp) 
        res.json({message:"Id doesn't exists"})
    else{
        emp.name=req.body.name;
        emp.dept=req.body.dept;
        emp.id=parseInt(req.params.id)
        setEmp(employees)
        res.json(emp);
    }
})

app.patch('/api/employees/:id',(req,res)=>{
    var employees=getEmp();
    const emp=employees.find(e=>e.id===parseInt(req.params.id))
    if(!emp)
        res.json({message:"Id doesn't exists"})
    else{
        emp.id=parseInt(req.params.id)
        if(req.body.name!=undefined) emp.name=req.body.name;
        if(req.body.dept!=undefined) emp.dept=req.body.dept;
        setEmp(employees)
        res.json(emp);
    }
})
app.delete('/api/employees/:id',(req,res)=>{
    var employees=getEmp();
    const emp=employees.find(e=>e.id===parseInt(req.params.id))
    if(!emp) 
        res.json({message:"Id does not exists"})
    else{
        var idx=employees.indexOf(emp)
        employees.splice(idx,1)
        setEmp(employees)
        res.json(emp);
    }
})
app.listen(2000,()=>{
    console.log("Server is running on port 2000")
})