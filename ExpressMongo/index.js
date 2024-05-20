require('dotenv').config()
const express=require('express')
const app=express()
const studentRoute=require('./routes/student.routes');
const port=process.env.PORT;
const mongoose=require('mongoose')
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/testDb')
.then(()=>console.log('Connection established successfully'))

app.use('/api/students',studentRoute);


app.listen(port,()=>{
    console.log(`Server is listening at port ${port}..`)
})