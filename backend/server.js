// Web server
const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// API endpoint
app.get("/",(req,res) => {
    res.send("Node.js server is running");
})

// get all notes
app.get("/api/notes",(req,res) => {
    res.json(notes);
})

// get note by id
app.get("/api/notes/:id",(req,res) => {
    const note = notes.find((n) => n._id === req.params.id);
    res.send(note);
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));