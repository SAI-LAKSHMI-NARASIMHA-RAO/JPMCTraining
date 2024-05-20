const express=require('express')
const routes=express.Router()
const controllers=require('../controller/student.controller')
const studentModel=require('../models/student.model')

routes.get("/",controllers.getStudentDetails)
routes.get("/:id",controllers.getStudentById)
routes.post('/',controllers.addStudent)
routes.put('/:id',controllers.updateStudent)
routes.delete('/:id',controllers.deleteStudent)
module.exports=routes