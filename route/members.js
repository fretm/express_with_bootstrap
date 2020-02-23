const express = require('express')
const uuid =require("uuid")
const members =require('../members')
const router = express.Router()

//get all members 
router.get("/", (req, res) => {
    res.json(members);
});

//get single member 
router.get("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
   res.json(members.filter(member => member.id === parseInt(req.params.id))
   )}
   else{
       res.status(400).json({msg:`member not found with id ${req.params.id} `})
   }
  });

  //creat members
  router.post('/',(req,res)=>{
    const newmembers ={
       id:uuid.v4(),
       name:req.body.name,
       email:req.body.email,
       status:"active"
    }
    if(!newmembers.name || !newmembers.email){
      return res.status(400).json({
            msg:"pleas includ name and email"
        })
    }
    members.push(newmembers)
    //res.json(members)
    res.redirect('/')
  }),


  //update member 
  router.put("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
  const updatemember =req.body;
  members.forEach(member=>{
      if(member.id === parseInt(req.params.id)){
          member.name = updatemember.name ? updatemember.name :member.name ;
          member.email = updatemember.email ? updatemember.email:member.email 
          res.json({
              msg: "updated sucessfully ", member
          })
      }
  })
   }
   else{
       res.status(400).json({msg:`member not found with id ${req.params.id} `})
   }
  });

//delet member 

  router.delete("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
   res.json({msg:`member deleted `, member:members.filter(member => member.id !== parseInt(req.params.id))
    })}
   else{
       res.status(400).json({msg:`could not find in db  ${req.params.id} `})
   }
  });


  module.exports=router