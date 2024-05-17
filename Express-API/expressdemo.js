const express=require('express')
const path=require('path')
const app=express()

app.use(express.static(path.join(__dirname,'public')))

const employees=[
    {id:1,name:"John",dept:"IT"},
    {id:2,name:"Smith",dept:"Development"},
    {id:3,name:"Wick",dept:"HR"}
]

app.get('/',(req,res)=>{
    res.status(200).send("This is Home Page")
})

app.get('/demo',(req,res)=>{
    res.status(200).sendFile(__dirname+'/demo.html')
})

app.get('/api/employees',(req,res)=>{
    res.status(200).json(employees);
})

app.get('/api/employees/:id',(req,res)=>{
    const emp=employees.find(e=>e.id===parseInt(req.params.id))
    if(!emp) res.status(404).json({message:"Employees does not exits"})
    else res.status(200).json(emp)
})

app.listen(3090,()=>{
    console.log("Server is running on port 3090")
})