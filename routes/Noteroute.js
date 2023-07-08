const Note = require('../models/notes');
const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");


router.get('/getallnotes',[],fetchuser,async(req,res)=>{
    try{
    const notescoll = await Note.find({user:req.user.id});
    res.json(notescoll);
    }
    catch(errors){
        console.error(errors);
        res.status(404).json(errors);
    }
});

router.post('/addnote',fetchuser,async(req,res)=>{
    try{
    let {title,desc} = req.body;
    const note = new Note({
       title,desc,user:req.user.id
    });
    console.log(note);
    const notesaver = await note.save();
    console.log(notesaver);
    res.json(note);
}
catch(errors){
    console.log(errors.message);
    return res.status(500).send("Internal server Error");
}
})

router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    try{
    let {title,desc} = req.body;
    let newobj ={};
    if(title){newobj.title = title};
    if(title){newobj.desc = desc};

    const mynote = await Note.findById(req.params.id);
    if(!mynote) return res.status(402).send("Note Not Found");
    // console.log(mynote.user.toString());
    // console.log(req.params.id);
    if(mynote.user.toString() != req.user.id)
    {
        return res.status(401).send("Invalid Access");
    }

    const update = await Note.findByIdAndUpdate(req.params.id, {$set:newobj} , {new:true});
    if(!update){
        return res.status(401).send("Not updated");
    }
    res.json(update);
    }
    catch(errors){
        console.error(errors);
        res.status(404).json(errors);
    }
});

router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try{
    const mynote = await Note.findById(req.params.id);
    if(!mynote) return res.status(402).send("Note Not Found");
    if(mynote.user.toString() != req.user.id)
    {
        return res.status(401).send("Invalid Access");
    }

    const deletetion = await Note.findByIdAndDelete(req.params.id);
    if(!deletetion){
        return res.status(401).send("Not Deleted");
    }
    res.json(deletetion);
    }
    catch(errors){
        console.error(errors);
        res.status(404).json(errors);
    }
});
module.exports = router;