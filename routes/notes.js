var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection');


// create notes table
router.get('/create-notes-table', (req, res) => {
    let sql = "CREATE TABLE notes(notes_id INT AUTO_INCREMENT PRIMARY KEY, lecture_id INT NOT NULL, notes_name VARCHAR(256) NOT NULL, notes_link TEXT, hide BOOLEAN, priority INT, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (lecture_id) REFERENCES lecture(lecture_id))"
    mysqlConnection.query(sql, (err, result) => {
      if(err){
        console.log(err);
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

// insert notes in the notes table by making a post request
router.post('/insert-notes/:lectureid', (req, res) => {
    var lecture_id      = req.params.lectureid;
    var notes_name     = req.body.notes_name;
    var notes_link     = req.body.notes_link     || null;
    var hide           = req.body.hide           || 0;
    var priority       = req.body.priority       || null;

    if(!notes_name){
      console.log("Invalid insert, notes name cannot be empty");
      res.status(202).send({ error: 'Notes Name cannot be empty' })
    }
    else{
      var value    = [[lecture_id, notes_name, notes_link, hide, priority]];
      let sql = "INSERT INTO notes (lecture_id, notes_name, notes_link, hide, priority) VALUES ?"
      mysqlConnection.query(sql, [value] , (err, result) => {
         if(err) {
             console.log(err);
             res.status(202).send({ error: err })
         }
         else{
            res.status(200).send(result);
         }
      })
    }
});

// Fetch the entire table of the notess
router.get('/fetch-all-notes', (req, res) => {
    let sql = "SELECT * FROM notes"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            console.log(err);
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    })
});

// Fetch all notes of a course from notes table using lecture id for normal users (hide = false)
router.get('/fetch-notes-by-lectureid-normal-users/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM notes WHERE lecture_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            console.log(err);
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    })
});

// Fetch all notess of a course from notes table using lecture id for premium users (hide = false)
router.get('/fetch-notes-by-lectureid-premium-users/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM notes WHERE lecture_id="  + mysql.escape(id) + " ORDER BY priority";
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            console.log(err);
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    });
});

// Fetch a particular notes from the notess id
router.get('/fetch-notes-by-notesid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM notes WHERE notes_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

// update a particular notes from the notes table
router.post('/update-notes/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM notes WHERE notes_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        if(result.length !=0){
            var notes_name = req.body.notes_name || result[0].notes_name;
            var lecture_id = req.body.lecture_id  || result[0].lecture_id;
            var notes_link = req.body.notes_link || result[0].notes_link;
            var hide       = req.body.hide       || result[0].hide;
            var priority   = req.body.priority   || result[0].priority;
            let sql2 = "UPDATE notes SET lecture_id = ?, notes_name = ?, notes_link = ?, hide = ?, priority = ? WHERE notes_id= ?";
            mysqlConnection.query(sql2, [lecture_id, notes_name, notes_link, hide, priority, id], (err2, result2) => {
                if(err2) {
                    res.status(202).send({ error: err2 })
                }
                else{
                    res.status(200).send({success : "Table was succesfully updated."});
                }
            });
        }
        else{
            res.status(400).send({error : "No notes with this notesid exits."});
        }
      }
    })
});

 // delete a particular notes from the notes table
 router.delete('/delete-notes/:id', function(req, res, next) {
    var id = req.params.id;
    var sql = "DELETE FROM notes WHERE notes_id=" + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
        if(err){
        res.status(202).send({ error: err });
        }
        res.status(200).send({'status': 'Deleting the notes was a success'});
    });
});

 // delete all notes from the notes table of a particular lecture
 router.delete('/delete-notes-by-lectureid/:id', function(req, res, next) {
    var id = req.params.id;
    var sql = "DELETE FROM notes WHERE lecture_id=" + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
        if(err){
        res.status(202).send({ error: err });
        }
        res.status(200).send({'status': 'Deleting the notes was a success'});
    });
});

module.exports = router;