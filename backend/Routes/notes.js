const express=require('express')
const router= express.Router()
const fetchuser=require('../Middleware/fetchuser');
const Note = require('../models/Notes')
// routs1--get all notes get request
const { body, validationResult } = require('express-validator');
router.get('/fetchallnotes' ,fetchuser,async (req,res)=>{
    try {
        const notes=await Note.find({user:req.user.id});
     res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).send("some erroe occured");
      }
 
})


// routs2--add anew note usig post login required
router.post('/addnotes' ,fetchuser,[
body('title', 'enter a vlid title').isLength({ min: 3 }),
body('description', 'enter avalid name ').isLength({ min: 1 })
// body('tag', 'correct password').isLength({ min: 5 })
],async (req,res)=>{
try {
    
    const   {title,description,tag}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const notes= new Note({
   title,description,tag,user:req.user.id
    })
    const savenote =await notes.save();
      res.json(savenote);

} catch (error) {
    console.log(error);
    res.status(500).send("some erroe occured");
  }
     })



     // routs2--update anew note usig post login required
     router.put('/update/:id' ,fetchuser,async (req,res)=>{
const {title,description,tag}=req.body;
try {
    

const newnote={};
if(title){newnote.title=title};
if(description){newnote.description=description};
if(tag){newnote.tag=tag};

//route 3find the note to be updated
let note =await Note.findById(req.params.id);
if(!note){
    return res.status(400).send("not found");
}

  if(note.user.toString()!==req.user.id){
    return res.status(400).send("not found");
}


     note=await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
     res.json(note);
    } catch (error) {
        console.log(error);
        res.status(500).send("some erroe occured");
    }
     })



   // routs2--delete an existing node 
   router.delete('/delete/:id' ,fetchuser,async (req,res)=>{

   //route 3find the note to be updated
   try {
    
  
    let note =await Note.findById(req.params.id);
    if(!note){
        return res.status(400).send("not found");
    }
    
      if(note.user.toString()!==req.user.id){
        return res.status(400).send("not found");
    }
    
    
         note=await Note.findByIdAndDelete(req.params.id)
         res.json({"sucess":"deleted"});
         
        } catch (error) {
            console.log(error);
            res.status(500).send("some erroe occured");
        }

         })
       
module.exports=router