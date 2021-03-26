var express = require("express");
var router = express.Router();


const mysql = require('mysql');
var mysqlConnection = require('../connection');

// create exam question type table
router.get('/create-exam-question-type-table', (req, res) => {
    let sql = "CREATE TABLE exam_question_type(exam_question_type_id INT AUTO_INCREMENT PRIMARY KEY, name TEXT NOT NULL, description TEXT)"
    mysqlConnection.query(sql, (err, result) => {
        if(err) {
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    })
 });



 // create exam table
router.get('/create-exam-table', (req, res) => {
    let sql = "CREATE TABLE exam(exam_id INT AUTO_INCREMENT PRIMARY KEY, exam_name TEXT NOT NULL, exam_deadline_start DATE, exam_deadline_end DATE, exam_description TEXT, exam_details_image_url VARCHAR(256), total_marks_of_exam FLOAT)"
    mysqlConnection.query(sql, (err, result) => {
        if(err) {
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    })
});

 // create exam questions table
router.get('/create-exam-questions-table', (req, res) => {
    let sql = "CREATE TABLE exam_questions(exam_question_id INT AUTO_INCREMENT PRIMARY KEY, exam_id INT NOT NULL, exam_question_type_id INT NOT NULL, question_id INT, question_marks FLOAT, FOREIGN KEY (exam_id) REFERENCES exam(exam_id), FOREIGN KEY (exam_question_type_id) REFERENCES exam_question_type(exam_question_type_id))"
    mysqlConnection.query(sql, (err, result) => {
        if(err) {
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    })
});

 // insert exam question type in the exam question type table by making a post request
 router.post('/insert-exam-question-type', (req, res) => {
   var name  		= req.body.name;
   var description  = req.body.description || null;

   if(!name){
     console.log("Invalid insert, name cannot be empty");
   res.status(202).send({error: 'Compulsary field cannot be empty'})
   }
   else{
     var value    = [[name, description]];
     let sql = "INSERT INTO exam_question_type (name, description) VALUES ?"
     mysqlConnection.query(sql, [value] , (err, result) => {
        if(err) {
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
     })
   }
  });


  // insert exam details in the exam table by making a post request
 router.post('/insert-exam', (req, res) => {
  var exam_name  				= req.body.exam_name;
  var exam_deadline_start		= req.body.exam_deadline_start || null;
  var exam_deadline_end    		= req.body.exam_deadline_end || null;
  var exam_description       	= req.body.exam_description || null;
  var exam_details_image_url  	= req.body.exam_details_image_url || null;
  var total_marks_of_exam    	= req.body.total_marks_of_exam || null;

  if(!exam_name){
    console.log("Invalid insert, exam name cannot be empty");
    res.status(202).send({ error: 'Compulsary field cannot be empty' })
  }
  else{
    var value    = [[exam_name, exam_deadline_start, exam_deadline_end, exam_description, exam_details_image_url, total_marks_of_exam]];
    let sql = "INSERT INTO exam (exam_name, exam_deadline_start, exam_deadline_end, exam_description, exam_details_image_url, total_marks_of_exam) VALUES ?"
    mysqlConnection.query(sql, [value] , (err, result) => {
        if(err) {
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    })
  }
 });

// insert exam questions in the exam questions table by making a post request
 router.post('/insert-exam-questions', (req, res) => {
  var exam_id  				= req.body.exam_id;
  var exam_question_type_id = req.body.exam_question_type_id;
  var question_id			= req.body.question_id || null;
  var question_marks		= req.body.question_marks || null;

  if(!exam_id){
    console.log("Invalid insert, exam id cannot be empty");
    res.status(202).send({ error: 'Compulsary field cannot be empty' })
  }
  else if(!exam_question_type_id){
    console.log("Invalid insert, exam question type id cannot be empty");
    res.status(202).send({ error: 'Compulsary field cannot be empty' })
  }
  else{
    var value    = [[exam_id, exam_question_type_id, question_id, question_marks]];
    let sql = "INSERT INTO exam_questions (exam_id, exam_question_type_id, question_id, question_marks) VALUES ?"
    mysqlConnection.query(sql, [value] , (err, result) => {
        if(err) {
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    })
  }
 });


// Fetch the entire data of the exam question type table
router.get('/fetch-exam-question-type', (req, res) => {
    let sql = "SELECT * FROM exam_question_type"
    mysqlConnection.query(sql , (err, result) => {
        if(err) {
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
      })
  });


// Fetch the entire data of the exam table
router.get('/fetch-exam', (req, res) => {
  let sql = "SELECT * FROM exam"
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// Fetch the entire data of the exam questions table
router.get('/fetch-exam-questions', (req, res) => {
  let sql = "SELECT * FROM exam_questions"
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  });
});



// Fetch a particular id from the exam question type table
router.get('/fetch-exam-question-type/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM exam_question_type WHERE exam_question_type_id="  + mysql.escape(id);
    mysqlConnection.query(sql , (err, result) => {
        if(err) {
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    });
});


// Fetch a particular id from the exam table using its exam id
router.get('/fetch-exam/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM exam WHERE exam_id="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  });
});


// Fetch a particular id from the exam questions using its exam question id
router.get('/fetch-exam-questions/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM exam_questions WHERE exam_question_id="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  });
});

// Fetch a particular id from the exam questions using its exam id
router.get('/fetch-exam-questions-by-exam-id/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM exam_questions WHERE exam_id="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// Fetch a particular id from the exam questions using its exam question type id
router.get('/fetch-exam-questions-by-question-type-id/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM exam_questions WHERE exam_question_type_id="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// update a particular exam question type from the exam question type table
router.post('/update-exam-question-type/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM exam_question_type WHERE exam_question_type_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        if(result.length !=0){
            var name        = req.body.name        || result[0].name;
            var description = req.body.description || result[0].description;
            let sql2 = "UPDATE exam_question_type SET name = ?, description =? WHERE exam_question_type_id= ?";
            mysqlConnection.query(sql2, [name, description, id], (err2, result2) => {
                if(err2) {
                    res.status(202).send({ error: err2 })
                }
                else{
                    res.status(200).send({success : "Table was succesfully updated."});
                }
            });
        }
        else{
            res.status(400).send({error : "No exam question type with this id exits."});
        }
      }
    })
});

  // update a particular exam from the exam table
router.post('/update-exam/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM exam WHERE exam_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        if(result.length !=0){
            var exam_name              = req.body.exam_name              || result[0].exam_name;
            var exam_deadline_start    = req.body.exam_deadline_start    || result[0].exam_deadline_start;
            var exam_deadline_end      = req.body.exam_deadline_end      || result[0].exam_deadline_end;
            var exam_description       = req.body.exam_description       || result[0].exam_description;
            var exam_details_image_url = req.body.exam_details_image_url || result[0].exam_details_image_url;
            var total_marks_of_exam    = req.body.total_marks_of_exam    || result[0].total_marks_of_exam;
            let sql2 = "UPDATE exam SET exam_name = ?, exam_deadline_start =?, exam_deadline_end =?, exam_description =?, exam_details_image_url =?, total_marks_of_exam = ? WHERE exam_id= ?";
            mysqlConnection.query(sql2, [exam_name, exam_deadline_start, exam_deadline_end, exam_description, exam_details_image_url, total_marks_of_exam, id], (err2, result2) => {
                if(err2) {
                    res.status(202).send({ error: err2 })
                }
                else{
                    res.status(200).send({success : "Table was succesfully updated."});
                }
            });
        }
        else{
            res.status(400).send({error : "No exam question type with this id exits."});
        }
      }
    })
});

// update a particular exam questions from the exam questions table
router.put('/update-exam-questions/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM exam_questions WHERE exam_question_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        if(result.length !=0){
            var exam_id              = req.body.exam_id              || result[0].exam_id;
            var exam_question_type_id    = req.body.exam_question_type_id    || result[0].exam_question_type_id;
            var question_id      = req.body.question_id      || result[0].question_id;
            var question_marks       = req.body.question_marks       || result[0].question_marks;
            let sql2 = "UPDATE exam_questions SET exam_id = ?, exam_question_type_id =?, question_id =?, question_marks =? WHERE exam_question_id= ?";
            mysqlConnection.query(sql2, [exam_id, exam_question_type_id, question_id, question_marks, id], (err2, result2) => {
                if(err2) {
                    res.status(202).send({ error: err2 })
                }
                else{
                    res.status(200).send({success : "Table was succesfully updated."});
                }
            });
        }
        else{
            res.status(400).send({error : "No exam question type with this id exits."});
        }
      }
    })
});

// delete a particular exam question type from the exam question type table
/* router.delete('/delete-exam-question-type/:id', function(req, res, next) {
  var id = req.params.id;
  var sql1 = "DELETE FROM exam_questions WHERE exam_question_type_id=" + mysql.escape(id);
  mysqlConnection.query(sql1, function(err, result) {
    if(err) {
      res.status(202).send({ error: 'Error in deleting all exam questions from exam questions table under a current exam question type id' })
    }
    else{
      var sql2 = "DELETE FROM integer_type_questions WHERE question_type=" + mysql.escape(id);
      mysqlConnection.query(sql2, function(err2, result) {
        if(err2) {
          res.status(202).send({ error: 'Error in deleting all integer type questions from integer type questions table under a current exam question type id' })
        }
        else{
          var sql3 = "DELETE FROM subjective_type_questions WHERE question_type=" + mysql.escape(id);
          mysqlConnection.query(sql3, function(err3, result) {
            if(err3)  {
              res.status(202).send({ error: 'Error in deleting all subjective type questions from subjective type questions table under a current exam question type id' })
            }
            else{
				var sql4 = "DELETE FROM multiple_choice_questions WHERE question_type=" + mysql.escape(id);
				mysqlConnection.query(sql4, function(err4, result) {
				if(err4)  {
				res.status(202).send({ error: 'Error in deleting all multiple choice questions from multiple choice questions table of a particular exam question type id' })
			}
			else{
			var sql5 = "DELETE FROM single_choice_question WHERE question_type=" + mysql.escape(id);
          mysqlConnection.query(sql5, function(err5, result) {
            if(err5)  {
              res.status(202).send({ error: 'Error in deleting all single choice question from single choice question table of a particular exam question type id' })
            }
            else{
              var sql6 = "DELETE FROM exam_question_type WHERE exam_question_type_id=" + mysql.escape(id);
              mysqlConnection.query(sql6, function(err6, result) {
                if(err6)  {
                  console.log(err);
                  res.status(202).send({ error: 'Error in deleting a exam question type from exam question type table' })
                }
                res.send({'status': 'success'})
							})
						 }
				     });

				   }
				  });
				}
			});
		}
	  });
    }
  });
}); */



// delete a particular exam from the exam table
/* router.delete('/delete-exam/:id', function(req, res, next) {
  var id = req.params.id;

  var sql1 = "DELETE FROM exam_questions WHERE exam_id=" + mysql.escape(id);
  mysqlConnection.query(sql1, function(err, result) {
    if(err)  {
      console.log(err);
      res.status(202).send({ error: 'Error in deleting all exam questions from exam questions table under current exam id' })
    }
    else{
      var sql2 = "DELETE FROM exam WHERE exam_id=" + mysql.escape(id);
      mysqlConnection.query(sql2, function(err, result) {
        if(err)  {
          console.log(err);
          res.status(202).send({ error: 'Error in deleting a exam from exam table' })
        }
        else{
          res.send({'status': 'success'})
        }

      })
    }
  });

}); */

// delete a particular exam question from the exam questions table
router.delete('/delete-exam-questions/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = "DELETE FROM exam_questions WHERE exam_question_id=" + mysql.escape(id);
  mysqlConnection.query(sql, function(err, result) {
    if(err)  {
      console.log(err);
      res.status(202).send({ error: 'Error in deleting a exam question from exam questions table' })
    }
    else{
      res.send({'status': 'success'})
    }

  })
});

module.exports = router;
