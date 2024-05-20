const studentModel=require('../models/student.model')
async function addStudent(req,res){
    try{
        const obj=await studentModel.create({
            _id:(req.body.id),
            name:req.body.name,
            phone:(req.body.phone),
            email:req.body.email
        })
        res.status(200).json(obj);
    }
    catch(err){console.log(`Error in adding student data..`)}
}
async function getStudentDetails(req,res){
    try{
        const students=await studentModel.find({})
        res.status(200).json(students)
    }
    catch(err){console.log(err)}
}


async function getStudentById(req,res){
    let id=parseInt(req.params.id);
    try{
        const sFind=await studentModel.findById(id);
        if(!sFind) res.status(200).send({"message": `Student with ${id} is not found`})
        else res.status(200).json(sFind);
    }
    catch(err){console.log(`Error in Accessing..`)}

}

async function updateStudent(req,res){
    let id=parseInt(req.params.id);
    try{
        const student=await studentModel.findByIdAndUpdate(id,{
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email
        })
        if(!student)
            res.status(404).send(`ID not Found..`)
        else{
            const updatedStudent=await studentModel.findById(id);
            res.status(200).json(updatedStudent);
        }
    }
    catch(err){
        console.log(`Error in updating the record of ${id} student`);
    }
}

async function deleteStudent(req,res){
    let id=parseInt(req.params.id);
    try{
        const delStudent=await studentModel.findByIdAndDelete(id);
        if(!delStudent)
            res.status(404).send(`Cannot find Student with id: ${id}`)
        else{
            res.status(200).json({message:`Deleted student with id : ${id}`})
        }
    }
    catch(err){
        console.log(`Error in deleting the File..`)
    }
}
module.exports={addStudent,getStudentDetails,getStudentById,updateStudent,deleteStudent}