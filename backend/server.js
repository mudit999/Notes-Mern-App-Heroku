// Web server
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db")
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");

const app = express();
dotenv.config();
connectDB();
// For accepting json data from user
app.use(express.json());

app.use('/api/users',userRoutes);
app.use('/api/notes', noteRoutes);

// Deployment----

__dirname = path.resolve();
if(process.env.NODE_ENV === 'production'){
    // static folder
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    // it will check all other routes other than routes availabe on server.js
    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    })
}else{
    app.get("/",(req, res) => {
        res.send("API is running...");
    });
}

// --------------

// error handler middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));