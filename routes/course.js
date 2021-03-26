var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection');


// create course table
router.get('/create-course-table', (req, res) => {
    let sql = "CREATE TABLE course(course_id INT AUTO_INCREMENT PRIMARY KEY, course_name VARCHAR(256) NOT NULL, description TEXT, priority INT, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)"
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

router.get('/taken',(req,res)=>{
  let sql = "CREATE TABLE opt(user_id int, course_id int,FOREIGN key (user_id) REFERENCES user(user_id), FOREIGN key (course_id) REFERENCES course(course_id))"
  mysqlConnection.query(sql,(err,result)=>{
    if(err)
      console.log(err);
    else {
      res.status(200).send(result);
    }
  })
});

router.post('/taken_course/:id',(req,res)=>{
  var userid=req.params.id;
  var courseid=req.body.course_id;
  var value    = [[userid, courseid]];
  let sql = "INSERT INTO opt (user_id, course_id) VALUES ?"
  mysqlConnection.query(sql, [value] , (err, result) => {
     if(err) {
         console.log(err);
         res.status(202).send({ error: err })
     }
     else{
        res.status(200).send(result);
     }
  })
  console.log(courseid);
});

// insert course in the course table by making a post request
router.post('/insert-course', (req, res) => {
    var course_name  = req.body.course_name;
    var description  = req.body.description || null;
    var priority     = req.body.priority || null;

    if(!course_name){
      console.log("Invalid insert, course name cannot be empty");
      res.status(202).send({ error: 'Course name cannot be empty' })
    }
    else{
      var value    = [[course_name, description, priority]];
      let sql = "INSERT INTO course (course_name, description, priority) VALUES ?"
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

// Fetch the entire table of the courses
router.get('/fetch-courses', (req, res) => {
    let sql = "SELECT * FROM course ORDER BY priority"
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


// Fetch a particular id from the courses
router.get('/fetch-course/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM course WHERE course_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

// update a particular course from the course table
router.put('/update-course/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM course WHERE course_id="  + mysql.escape(id);
  console.log(req.body);
  console.log(id);
  mysqlConnection.query(sql, function(err, result) {
    if(err) {
      res.status(202).send({ error: err })
    }
    else{
      if(result.length !=0){
          var course_name = req.body.course_name || result[0].course_name;
          var description = req.body.description || result[0].description;
          var priority    = req.body.priority    || result[0].priority;
          let sql2 = "UPDATE course SET course_name = ?, description = ?, priority = ? WHERE course_id= ?";
          mysqlConnection.query(sql2, [course_name, description, priority, id], (err2, result2) => {
              if(err2) {
                  res.status(202).send({ error: err2 })
              }
              else{
                  res.status(200).send({success : "Table was succesfully updated."});
              }
          });
      }
      else{
          res.status(400).send({error : "No course with this courseid exits."});
      }
    }
  })
});

 // delete a particular course from the course table
 router.delete('/delete-course/:id', function(req, res, next) {
    var id = req.params.id;
    var sql = "DELETE FROM course WHERE course_id=" + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
        if(err){
        res.status(202).send({ error: err });
        }
        else{

                res.status(200).send({'status': 'Deleting the course was a success'});

        }
    });
});

module.exports = router;
