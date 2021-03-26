const express       = require('express');
var methodOverride  = require("method-override");
var bodyParser      = require("body-parser");
const app           = express();
var mysqlConnection = require('./connection')
app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Create the database
app.get('/createdb', (req,res) => {
    let sql = 'CREATE DATABASE examerly'
    mysqlConnection.query(sql, (err, result) => {
        if(err) console.log(err);
        console.log(result);
        res.send('Database Created');
    })
});


var courseRoutes   = require("./routes/course");
var subjectRoutes  = require("./routes/subject");
var lectureRoutes  = require("./routes/lecture");
var notesRoutes    = require("./routes/notes");
var questionRoutes = require("./routes/question");
var answerRoutes   = require("./routes/answer");
var examRoutes     = require("./routes/exam");
var userRoutes     = require("./routes/user");
var qsubjectRoutes = require("./routes/qsubject");

app.use("/course", courseRoutes);
app.use("/subject", subjectRoutes);
app.use("/lecture", lectureRoutes);
app.use("/notes", notesRoutes);
app.use("/question", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/exam", examRoutes);
app.use("/user", userRoutes);
app.use("/qsubject", qsubjectRoutes);

let server=app.listen('3000', () => {
    console.log('Server started at port 3000');
});

module.exports=server;