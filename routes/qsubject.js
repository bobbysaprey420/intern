var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection');

// create Question subject table
router.get('/create-question-subject-table', (req, res) => {
    let sql = "CREATE TABLE question_subject(question_subject_id INT AUTO_INCREMENT PRIMARY KEY, subject_name TEXT NOT NULL, description TEXT)"
    mysqlConnection.query(sql, (err, result) => {
      if(err){
        res.status(202).send({ error: err });
      }
      else{
        res.status(200).send(result);
      }
    })
 });
 

 // insert Question subject in the Question subject table by making a post request
 router.post('/insert-question-subject', (req, res) => {
   var subject_name  = req.body.subject_name;
   var description = req.body.description || null;

   if(!subject_name){
     console.log("Invalid insert, subject name cannot be empty");
     res.status(202).send({ error: 'Compulsary field cannot be empty' })
   }
   else{
     var value    = [[subject_name, description]];
     let sql = "INSERT INTO question_subject (subject_name, description) VALUES ?"
     mysqlConnection.query(sql, [value] , (err, result) => {
        if(err){
            res.status(202).send({ error: err });
        }
        else{
        res.status(200).send(result);
        }
     })
   }
  });
 
 // Fetch the entire table of the question subject table
router.get('/fetch-question-subject', (req, res) => {
    let sql = "SELECT * FROM question_subject"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err });
        }
        else{
            res.status(200).send(result);
        }
      })
  });
 
 // Fetch a particular id from the question subject table
router.get('/fetch-question-subject/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM question_subject WHERE question_subject_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
        if(err){
            res.status(202).send({ error: err });
        }
        else{
            res.status(200).send(result);
        }
    })
});

// update a particular question subject from the question subject table
router.put('/update-question-subject/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM question_subject WHERE question_subject_id="  + mysql.escape(id);
  mysqlConnection.query(sql, function(err, result) {
    if(err) {
      res.status(202).send({ error: err })
    }
    else{
      if(result.length !=0){
          var subject_name = req.body.subject_name || result[0].subject_name;
          var description = req.body.description || result[0].description;
          let sql2 = "UPDATE question_subject SET subject_name = ?, description = ? WHERE question_subject_id= ?";
          mysqlConnection.query(sql2, [subject_name, description, id], (err2, result2) => {
              if(err2) {
                  res.status(202).send({ error: err2 })
              }
              else{
                  res.status(200).send({success : "Table was succesfully updated."});
              }
          });
      }
      else{
          res.status(400).send({error : "No question subject with this id exits."});
      }
    }
  })
});

// delete a particular question subject from the question subject table
router.delete('/delete-question-subject/:id', function(req, res, next) {
  var id = req.params.id;
      var sql2 = "DELETE FROM integer_type_questions WHERE question_subject_id=" + mysql.escape(id);
      mysqlConnection.query(sql2, function(err2, result) {
        if(err2) {
          res.status(202).send({ error: err2 })
        }
        else{
          var sql3 = "DELETE FROM subjective_type_questions WHERE question_subject_id=" + mysql.escape(id);
          mysqlConnection.query(sql3, function(err3, result) {
            if(err3)  {
              res.status(202).send({ error: err3 })
            }
            else{
				var sql4 = "DELETE FROM multiple_choice_questions WHERE question_subject_id=" + mysql.escape(id);
				mysqlConnection.query(sql4, function(err4, result) {
				if(err4)  {
				res.status(202).send({ error: err4 })
			}
			else{
			var sql5 = "DELETE FROM single_choice_question WHERE question_subject_id=" + mysql.escape(id);
          mysqlConnection.query(sql5, function(err5, result) {
            if(err5)  {
              res.status(202).send({ error: err5 })
            }
            else{
              var sql6 = "DELETE FROM question_subject WHERE question_subject_id=" + mysql.escape(id);
              mysqlConnection.query(sql6, function(err6, result) {
                if(err6)  {
                  res.status(202).send({ error: err6 })
                }
                else{
                  res.status(200).send({'status': 'success'})
                }
							})
						 }
				     });
        
				   }
				  });
				}
			});
		}
	  });
    
});

module.exports = router;