const express = require("express");
const router = express.Router();
const { getAllUserNotes,createNote,getNote,updateNote,deleteNote } = require("../controllers/noteController");

// create, update, read, delete

// get notes by providing userId
router.route('/:userId').get(getAllUserNotes);

// create note
router.route('/create/:userId').post(createNote);

// get note
router.route('/getnote/:noteId').get(getNote);

// update note 
router.route('/update/:noteId').put(updateNote);

// delete note
router.route('/delete/:noteId').delete(deleteNote);

module.exports = router;