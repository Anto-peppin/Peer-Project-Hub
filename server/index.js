const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())

mongoose.connect(`${process.env.MONGODBURL}`).then(()=>{console.log('DB Connected Successfully...');
})



const user = mongoose.model('user',{name:String,mail:String,pass:String,role:String,picColor:String},'user')
const allProjects = mongoose.model('allProjects',{mail:String,discription:String,fileUrl:String,git:String,live:String,tech:[String],title:String,time:String,dataType:String,uName:String,bgColor:String,likes:[String],comment:[{mail:String,data:String}]},'allProjects')


app.get('/',(req,res)=>{
    res.send('Server is running...')
})

app.get('/allprojects',async(req,res)=>{
   const respo = await allProjects.find().sort({_id:-1})
   res.send(respo)
})

app.get('/getuser',async(req,res)=>{
    const {email} = req.query
 const userData = await user.findOne({mail:email},{pass:0})
   res.send(userData)
 
})

app.put('/likes',async(req,res)=>{
   const {id,ourId} = req.body
   const data = await allProjects.findOne({_id:id})
   
   
    if(!(data.likes).includes(ourId)){
       await allProjects.updateOne({_id:id},{$push:{likes:ourId}})
     res.send(true)

    }
    else{
        await allProjects.updateOne({_id:id},{$pull:{likes:ourId}})
        res.send(false)
    }
   

})

app.post('/comment',async(req,res)=>{
    const {id,userMail,data} = req.body
   const respo = await allProjects.updateOne({_id:id},{$push:{comment:{mail:userMail,data:data}}})

})

app.get('/total/myproject',async(req,res)=>{
    const data = req.query
   const info = await allProjects.find({mail:data.mail}).sort({_id:-1})
   res.send(info)

})

app.post('/myproject',async(req,res)=>{
try {
    const respo = await allProjects.insertOne(req.body.final)
    res.send(true)

} catch (error) {
    res.send(error.false)
}

   
 
})



app.post('/user',async(req,res)=>{
 
   await user.insertOne(req.body.user)
res.send(true)

})

app.get('/detail',async(req,res)=>{
    const {id} = req.query
   const data = await allProjects.find({_id:id})
   res.send(data);
   

})

app.listen(`${process.env.PORT}`||3000,()=>{
    console.log('Server Started...');
    
})
