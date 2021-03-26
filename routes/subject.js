var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection');


// create subject table
router.get('/create-subject-table', (req, res) => {
    let sql = "CREATE TABLE subject(subject_id INT AUTO_INCREMENT PRIMARY KEY, course_id INT NOT NULL, subject_name VARCHAR(256) NOT NULL, description TEXT, hide BOOLEAN, priority INT, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (course_id) REFERENCES course(course_id))"
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

// insert subject in the subject table by making a post request
router.post('/insert-subject/:id', (req, res) => {
    var course_id    = req.params.id;
    var subject_name = req.body.subject_name;
    var description  = req.body.description || null;
    var hide         = req.body.hide || 0;
    var priority     = req.body.priority || null;

    if(!subject_name){
      console.log("Invalid insert, subject name cannot be empty");
      res.status(202).send({ error: 'subject name cannot be empty' })
    }
    else{
      var value    = [[course_id, subject_name, description, hide, priority]];
      let sql = "INSERT INTO subject (course_id, subject_name, description, hide, priority) VALUES ?"
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

// Fetch the entire table of the subjects
router.get('/fetch-subjects', (req, res) => {
    let sql = "SELECT * FROM subject"
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

// Fetch all subjects of a course from subject table using course id for normal users (hide = false)
router.get('/fetch-subject-by-courseid-normal-users/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM subject WHERE course_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
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

// Fetch all subjects of a course from subject table using course id for premium users (hide = false)
router.get('/fetch-subject-by-courseid-premium-users/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM subject WHERE course_id="  + mysql.escape(id) + " ORDER BY priority";
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

// Fetch a particular subject from the subjects id
router.get('/fetch-subject-by-subjectid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM subject WHERE subject_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

// update a particular subject from the subject table
router.post('/update-subject/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM subject WHERE subject_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        if(result.length !=0){
            var subject_name = req.body.subject_name || result[0].subject_name;
            var course_id    = req.body.course_id    || result[0].course_id;
            var description  = req.body.description  || result[0].description;
            var hide         = req.body.hide         || result[0].hide;
            var priority     = req.body.priority     || result[0].priority;
            let sql2 = "UPDATE subject SET course_id = ?, subject_name = ?, description = ?, hide = ?, priority = ? WHERE subject_id= ?";
            mysqlConnection.query(sql2, [course_id, subject_name, description, hide, priority, id], (err2, result2) => {
                if(err2) {
                    res.status(202).send({ error: err2 })
                }
                else{
                    res.status(200).send({success : "Table was succesfully updated."});
                }
            });
        }
        else{
            res.status(400).send({error : "No subject with this subjectid exits."});
        }
      }
    })
});

 // delete a particular subject from the subject table
 router.delete('/delete-subject/:id', function(req, res, next) {
    var id = req.params.id;
    var sql = "DELETE FROM lecture WHERE subject_id=" + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
        if(err){
        res.status(202).send({ error: err });
        }
        else{
            var sql2 = "DELETE FROM subject WHERE subject_id=" + mysql.escape(id);
            mysqlConnection.query(sql2, function(err2, result2) {
                if(err2){
                res.status(202).send({ error: err2 });
                }
                else{
                    res.status(200).send({'status': 'Deleting the subject was a success'});
                }
            });
        }
    });
});

module.exports = router;