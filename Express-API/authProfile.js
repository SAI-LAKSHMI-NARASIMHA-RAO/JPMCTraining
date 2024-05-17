const express=require('express')
const jwt=require("jsonwebtoken")

const app=express()
app.use(express.json())

//Creating login so every client will get distinct tokens
app.get("/login",(req,res)=>{
    const user={
        name:req.body.name,
        pass:req.body.pass
    }
    jwt.sign({user},"secret key",(err,token)=>{
        // req.headers.authorization="Bearer "+token.toString()
        // console.log(res.headers.authorization);
        // req.headers.authorization=
        res.status(200).json({token})
    })
})

//middleware
function verify(req,res,next){
    token=req.headers.authorization.split(" ")[1];
    console.log(token);
    req.token=token
    next()
}

//Only Authorised users can access this end point
app.post("/profile",verify,(req,res)=>{
    console.log(req.token);
    jwt.verify(req.token,"secret key",(err,data)=>{
        if(!err){
            res.status(200).json({
            message:"Access Granted",
            user:{
                name:req.body.name,
                message:"Welcome"
            }
        })
        }
        else res.json({message:"Access Denied!!"})
    })
})

//This end point is not protected, anyone can access it
app.get("/nothing",(req,res)=>res.json({message:"Allowed!!"}))


app.listen(2067,()=>{
    console.log("Server running at Port 2067..")
})