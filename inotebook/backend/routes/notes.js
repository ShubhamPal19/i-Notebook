const express = require('express'); 
const router = express.Router();
const fetchuser = require("../middleware/fetchuser")
const Notes = require('../models/Notes')
const {body, validationResult}= require('express-validator')



// ROUTE 1: Get all the notes using : GET " /api/notes/fetchallnotes" Login required
router.get('/fetchallnotes',fetchuser,
    async (req,res)=>{


    
    const notes = await Notes.find({user: req.user.id});
    res.json(notes)
})




// ROUTE 2: Add new Note  : Post " /api/notes/addnotes" Login required
 router.post('/addnote',fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({ min: 5 }),
  ],
  async (req,res)=>{
    
try {
    const {title, description, tag}= req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }


    const note = new Note({

        titel,description,tag,user: req.user.id

    })

    const savedNote = await note.save();
    res.json(savedNote);}

    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
      }
})


module.exports= router