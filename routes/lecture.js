var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection');


// create lecture table
router.get('/create-lecture-table', (req, res) => {
    let sql = "CREATE TABLE lecture(lecture_id INT AUTO_INCREMENT PRIMARY KEY, course_id INT NOT NULL, subject_id INT NOT NULL, lecture_name VARCHAR(256) NOT NULL, video_link TEXT, description TEXT, hide BOOLEAN, priority INT, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (course_id) REFERENCES course(course_id), FOREIGN KEY (subject_id) REFERENCES subject(subject_id))"
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

// insert lecture in the lecture table by making a post request
router.post('/insert-lecture/:courseid/:subjectid', (req, res) => {
    var course_id      = req.params.courseid;
    var subject_id     = req.params.subjectid;
    var lecture_name   = req.body.lecture_name;
    var video_link     = req.body.video_link     || null;
    var description    = req.body.description    || null;
    var hide           = req.body.hide           || 0;
    var priority       = req.body.priority       || null;

    if(!lecture_name){
      console.log("Invalid insert, lecture name cannot be empty");
      res.status(202).send({ error: 'lecture name cannot be empty' })
    }
    else{
      var value    = [[course_id, subject_id, lecture_name, video_link, description, hide, priority]];
      let sql = "INSERT INTO lecture (course_id, subject_id, lecture_name, video_link, description, hide, priority) VALUES ?"
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

// Fetch the entire table of the lectures
router.get('/fetch-lectures', (req, res) => {
    let sql = "SELECT * FROM lecture"
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

// Fetch all lectures of a course from lecture table using course id for normal users (hide = false)
router.get('/fetch-lecture-by-courseid-normal-users/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM lecture WHERE course_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
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

// Fetch all lectures of a course from lecture table using course id for premium users (hide = false)
router.get('/fetch-lecture-by-courseid-premium-users/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM lecture WHERE course_id="  + mysql.escape(id) + " ORDER BY priority";
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

// Fetch all lectures of a course from lecture table using subject id for normal users (hide = false)
router.get('/fetch-lecture-by-subjectid-normal-users/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM lecture WHERE subject_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
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

// Fetch all lectures of a course from lecture table using subject id for premium users (hide = false)
router.get('/fetch-lecture-by-subjectid-premium-users/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM lecture WHERE subject_id="  + mysql.escape(id) + " ORDER BY priority";
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

// Fetch a particular lecture from the lectures id
router.get('/fetch-lecture-by-lectureid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM lecture WHERE lecture_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

// update a particular lecture from the lecture table
router.post('/update-lecture/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM lecture WHERE lecture_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
          console.log(id);
        if(result.length !=0){
            var lecture_name = req.body.lecture_name || result[0].lecture_name;
            var subject_id   = req.body.subjectid    || result[0].subject_id;
            var course_id    = req.body.course_id    || result[0].course_id;
            var video_link   = req.body.video_link   || result[0].video_link;
            var description  = req.body.description  || result[0].description;
            var hide         = req.body.hide         || result[0].hide;
            var priority     = req.body.priority     || result[0].priority;
            let sql2 = "UPDATE lecture SET course_id = ?, subject_id =?, lecture_name = ?, video_link = ?, description = ?, hide = ?, priority = ? WHERE lecture_id= ?";
            mysqlConnection.query(sql2, [course_id, subject_id, lecture_name, video_link, description, hide, priority, id], (err2, result2) => {
                if(err2) {
                    res.status(202).send({ error: err2 })
                }
                else{
                    res.status(200).send({success : "Table was succesfully updated."});
                }
            });
        }
        else{
            res.status(400).send({error : "No lecture with this lectureid exits."});
        }
      }
    })
});

 // delete a particular lecture from the lecture table
 router.delete('/delete-lecture/:id', function(req, res, next) {
    var id = req.params.id;
    var sql = "DELETE FROM notes WHERE lecture_id=" + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
        if(err){
        res.status(202).send({ error: err });
        }
        else{
            var sql2 = "DELETE FROM lecture WHERE lecture_id=" + mysql.escape(id);
            mysqlConnection.query(sql2, function(err2, result2) {
                if(err2){
                res.status(202).send({ error: err2 });
                }
                else{
                    res.status(200).send({'status': 'Deleting the lecture was a success'});
                }
            });
        }
    });
});



 

module.exports = router;