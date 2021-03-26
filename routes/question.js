var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection');

 // create Single choice question table
 router.get('/create-single-choice-question', (req, res) => {
    let sql = "CREATE TABLE single_choice_question(question_id INT AUTO_INCREMENT PRIMARY KEY, question_subject_id INT NOT NULL, question_type INT NOT NULL, question_image_url VARCHAR(256), options INT NOT NULL, correct_answer INT, total_marks FLOAT, question_description TEXT, solution_image_url VARCHAR(256), negative_mark FLOAT DEFAULT 0, partial_mark FLOAT DEFAULT 0, FOREIGN KEY (question_subject_id) REFERENCES question_subject(question_subject_id), FOREIGN KEY (question_type) REFERENCES exam_question_type(exam_question_type_id))"
    mysqlConnection.query(sql, (err, result) => {
      if(err){
        res.status(202).send({ error: err })
      }else{
        res.status(200).send(result);
      }
    })
});

 // create Multiple choice questions table
 router.get('/create-multiple-choice-questions-table', (req, res) => {
    let sql = "CREATE TABLE multiple_choice_questions(question_id INT AUTO_INCREMENT PRIMARY KEY, question_subject_id INT NOT NULL, question_type INT NOT NULL, question_image_url TEXT, options INT NOT NULL, correct_answer VARCHAR(20), total_marks FLOAT, question_description TEXT, solution_image_url VARCHAR(256), negative_mark FLOAT DEFAULT 0, partial_mark FLOAT DEFAULT 0, FOREIGN KEY (question_subject_id) REFERENCES question_subject(question_subject_id), FOREIGN KEY (question_type) REFERENCES exam_question_type(exam_question_type_id))"
    mysqlConnection.query(sql, (err, result) => {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    });
 });

  // create subjective type questions table
router.get('/create-subjective-type-questions-table', (req, res) => {
    let sql = "CREATE TABLE subjective_type_questions(question_id INT AUTO_INCREMENT PRIMARY KEY, question_subject_id INT NOT NULL, question_type INT NOT NULL, question_image_url TEXT, correct_answer TEXT, total_marks FLOAT, question_description TEXT, solution_image_url VARCHAR(256), negative_mark FLOAT DEFAULT 0, partial_mark FLOAT DEFAULT 0, FOREIGN KEY (question_type) REFERENCES exam_question_type(exam_question_type_id), FOREIGN KEY (question_subject_id) REFERENCES question_subject(question_subject_id))"
    mysqlConnection.query(sql, (err, result) => {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

 // create integer type questions table
 router.get('/create-integer-type-questions-table', (req, res) => {
    let sql = "CREATE TABLE integer_type_questions(question_id INT AUTO_INCREMENT PRIMARY KEY, question_subject_id INT NOT NULL, question_type INT NOT NULL, question_image_url VARCHAR(256), correct_answer FLOAT, total_marks FLOAT, question_description TEXT, solution_image_url VARCHAR(256), negative_mark FLOAT DEFAULT 0, partial_mark FLOAT DEFAULT 0, FOREIGN KEY (question_type) REFERENCES exam_question_type(exam_question_type_id), FOREIGN KEY (question_subject_id) REFERENCES question_subject(question_subject_id))"
    mysqlConnection.query(sql, (err, result) => {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

// insert Single choice question in the Single choice question table by making a post request
router.post('/insert-single-choice-question', (req, res) => {
    var question_type  		= req.body.question_type;
    var options  		    = req.body.options;
    var question_subject_id = req.body.question_subject_id;
    var question_image_url	= req.body.question_image_url   || null;
    var correct_answer    	= req.body.correct_answer       || null;
    var total_marks       	= req.body.total_marks          || null;
    var question_description= req.body.question_description || null;
    var solution_image_url  = req.body.solution_image_url   || null;
   var negative_mark  = req.body.negative_mark   || 0;
   var partial_mark  = req.body.partial_mark  || 0;
   
    if(!options){
      console.log("Invalid insert, options cannot be empty");
      res.status(202).send({ error: 'Invalid insert, options cannot be empty' })
    }
    else if(!question_subject_id){
        console.log("Invalid insert question subject id cannot be empty");
        res.status(202).send({ error: 'Invalid insert question subject id cannot be empty' })
    }
    else if(!question_type){
        console.log("Invalid insert question_type cannot be empty");
        res.status(202).send({ error: 'Invalid insert question_type cannot be empty' })
    }
    else{
      var value    = [[question_subject_id, question_type, options, question_image_url, correct_answer, total_marks, question_description, solution_image_url, negative_mark, partial_mark]];
      let sql = "INSERT INTO single_choice_question (question_subject_id, question_type, options, question_image_url, correct_answer, total_marks, question_description, solution_image_url, negative_mark, partial_mark) VALUES ?"
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

 // insert multiple choice question in the multiple choice question table by making a post request
 router.post('/insert-multiple-choice-question', (req, res) => {
    var question_type  		= req.body.question_type;
    var options  		    = req.body.options;
    var question_subject_id   = req.body.question_subject_id;
    var question_image_url	= req.body.question_image_url   || null;
    var correct_answer    	= req.body.correct_answer       || null;
    var total_marks       	= req.body.total_marks          || null;
    var question_description= req.body.question_description || null;
    var solution_image_url  = req.body.solution_image_url   || null;
    var negative_mark  = req.body.negative_mark   || 0;
    var partial_mark  = req.body.partial_mark  || 0;
   
    if(!options){
      console.log("Invalid insert, options cannot be empty");
      res.status(202).send({ error: 'Invalid insert, options cannot be empty' })
    }
    else if(!question_subject_id){
        console.log("Invalid insert question subject id cannot be empty");
        res.status(202).send({ error: 'Invalid insert question subject id cannot be empty' })
    }
    else if(!question_type){
        console.log("Invalid insert question_type cannot be empty");
        res.status(202).send({ error: 'Invalid insert question_type cannot be empty' })
    }
    else{
      var value    = [[question_subject_id, question_type, options, question_image_url, correct_answer, total_marks, question_description, solution_image_url, negative_mark, partial_mark]];
      let sql = "INSERT INTO multiple_choice_question (question_subject_id, question_type, options, question_image_url, correct_answer, total_marks, question_description, solution_image_url, negative_mark, partial_mark) VALUES ?"
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

// insert subjective type questions in the subjective type questions table by making a post request
router.post('/insert-subjective-choice-question', (req, res) => {
    var question_type  		= req.body.question_type;
    var question_subject_id   = req.body.question_subject_id;
    var question_image_url	= req.body.question_image_url   || null;
    var correct_answer    	= req.body.correct_answer       || null;
    var total_marks       	= req.body.total_marks          || null;
    var question_description= req.body.question_description || null;
    var solution_image_url  = req.body.solution_image_url   || null;
    var negative_mark  = req.body.negative_mark   || 0;
    var partial_mark  = req.body.partial_mark  || 0;
   
    if(!question_type){
        console.log("Invalid insert question_type cannot be empty");
        res.status(202).send({ error: 'Invalid insert question_type cannot be empty' })
    }
    else if(!question_subject_id){
        console.log("Invalid insert question subject id cannot be empty");
        res.status(202).send({ error: 'Invalid insert question subject id cannot be empty' })
    }
    else{
      var value    = [[question_subject_id, question_type, question_image_url, correct_answer, total_marks, question_description, solution_image_url, negative_mark, partial_mark]];
      let sql = "INSERT INTO subjective_type_question (question_subject_id, question_type, question_image_url, correct_answer, total_marks, question_description, solution_image_url, negative_mark, partial_mark) VALUES ?"
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

// insert integer type questions in the subjective type questions table by making a post request
router.post('/insert-integer-choice-question', (req, res) => {
    var question_type  		= req.body.question_type;
    var question_subject_id   = req.body.question_subject_id;
    var question_image_url	= req.body.question_image_url   || null;
    var correct_answer    	= req.body.correct_answer       || null;
    var total_marks       	= req.body.total_marks          || null;
    var question_description= req.body.question_description || null;
    var solution_image_url  = req.body.solution_image_url   || null;
    var negative_mark  = req.body.negative_mark   || 0;
    var partial_mark  = req.body.partial_mark  || 0;
   
    if(!question_type){
        console.log("Invalid insert question_type cannot be empty");
        res.status(202).send({ error: 'Invalid insert question_type cannot be empty' })
    }
    else if(!question_subject_id){
        console.log("Invalid insert question subject id cannot be empty");
        res.status(202).send({ error: 'Invalid insert question subject id cannot be empty' })
    }
    else{
      var value    = [[question_subject_id, question_type, question_image_url, correct_answer, total_marks, question_description, solution_image_url, negative_mark, partial_mark]];
      let sql = "INSERT INTO integer_type_question (question_subject_id, question_type, question_image_url, correct_answer, total_marks, question_description, solution_image_url, negative_mark, partial_mark) VALUES ?"
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

// Fetch the entire data of the single choice question table
router.get('/fetch-single-choice-question', (req, res) => {
    let sql = "SELECT * FROM single_choice_question"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
      })
});

// Fetch the entire data of the multiple choice questions table
router.get('/fetch-multiple-choice-questions', (req, res) => {
    let sql = "SELECT * FROM multiple_choice_question"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
      })
  });

// Fetch the entire data of the subjective type questions table
router.get('/fetch-subjective-type-questions', (req, res) => {
    let sql = "SELECT * FROM subjective_type_question"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
      })
});

// Fetch the entire data of the integer type questions table
router.get('/fetch-integer-type-questions', (req, res) => {
    let sql = "SELECT * FROM integer_type_question"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
      });
});

// Fetch a particular id from the Single choice question table using its question id
router.get('/fetch-single-choice-question-by-questionid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM single_choice_question WHERE question_id="  + mysql.escape(id) ;
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    });
  });

  // Fetch a particular id from the Single choice question table using its question type
router.get('/fetch-single-choice-question-by-question-type/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM single_choice_question WHERE question_type="  + mysql.escape(id) ;
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    });
});

// Fetch a particular id from the Single choice question table using its question subject id
router.get('/fetch-single-by-Qsubjectid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM single_choice_question WHERE question_subject_id="  + mysql.escape(id) ;
    mysqlConnection.query(sql, function(err, result) {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    })
  });

// Fetch a particular id from the Multiple choice question table using its question id
router.get('/fetch-multiple-choice-question-by-questionid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM multiple_choice_question WHERE question_id="  + mysql.escape(id) ;
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    });
  });
  
  
  // Fetch a particular id from the Multiple choice question table using its question type
router.get('/fetch-multiple-choice-question-by-question-type/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM multiple_choice_question WHERE question_type="  + mysql.escape(id) ;
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    });
});

// Fetch a particular id from the Multiple choice question table using its question subject id
router.get('/fetch-multiple-by-Qsubjectid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM multiple_choice_questions WHERE question_subject_id="  + mysql.escape(id) ;
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    })
  });

// Fetch a particular id from the subjective type question table using its question id
router.get('/fetch-subjective-type-question-by-questionid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM subjective_type_question WHERE question_id="  + mysql.escape(id) ;
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    });
  });
  
  
  // Fetch a particular id from the subjective type question table using its question type
  router.get('/fetch-subjective-type-question-by-question-type/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM subjective_type_question WHERE question_type="  + mysql.escape(id) ;
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    });
});

// Fetch a particular id from the subjective type question table using its question subject id
router.get('/fetch-subjective-by-Qsubjectid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM subjective_type_questions WHERE question_subject_id="  + mysql.escape(id) ;
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    })
  });

// Fetch a particular id from the integer type question table using its question id
router.get('/fetch-integer-type-question-by-questionid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM integer_type_question WHERE question_id="  + mysql.escape(id) ;
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    });
  });
  
  
// Fetch a particular id from the integer question table using its question type
router.get('/fetch-integer-type-question-by-question-type/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM integer_type_question WHERE question_type="  + mysql.escape(id) ;
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    });
});

// Fetch a particular id from the integer type question table using its question subject id
router.get('/fetch-integer-by-Qsubjectid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM integer_type_questions WHERE question_subject_id="  + mysql.escape(id) ;
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    })
  });

// update a particular Single choice question from the single choice question table
router.post('/update-single-choice-question/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM single_choice_question WHERE question_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        if(result.length !=0){
            var question_type        = req.body.question_type        || result[0].question_type;
            var question_subject_id  = req.body.question_subject_id  || result[0].question_subject_id;
            var question_image_url   = req.body.question_image_url   || result[0].question_image_url;
            var options              = req.body.options              || result[0].options;
            var correct_answer       = req.body.correct_answer       || result[0].correct_answer;
            var total_marks          = req.body.total_marks          || result[0].total_marks;
            var question_description = req.body.question_description || result[0].question_description;
            var solution_image_url   = req.body.solution_image_url   || result[0].solution_image_url;
            var negative_mark        = req.body.negative_mark        || result[0].negative_mark;
            var partial_mark         = req.body.partial_mark         || result[0].partial_mark;
            let sql2 = "UPDATE single_choice_question SET question_type = ?, question_subject_id = ?, question_image_url =?, options = ?, correct_answer = ?, total_marks = ?, question_description = ?, solution_image_url = ?, negative_mark = ?, partial_mark = ? WHERE question_id= ?";
            mysqlConnection.query(sql2, [question_type, question_subject_id, question_image_url, options, correct_answer, total_marks, question_description, solution_image_url, negative_mark, partial_mark, id], (err2, result2) => {
                if(err2) {
                    res.status(202).send({ error: err2 })
                }
                else{
                    res.status(200).send({success : "Table was succesfully updated."});
                }
            });
        }
        else{
            res.status(400).send({error : "No question with this questionid exits."});
        }
      }
    })
});

// update a particular Multiple choice questions from the Multiple choice questions table
router.post('/update-multiple-choice-question/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM multiple_choice_question WHERE question_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        if(result.length !=0){
            var question_type        = req.body.question_type        || result[0].question_type;
            var question_subject_id  = req.body.question_subject_id  || result[0].question_subject_id;
            var question_image_url   = req.body.question_image_url   || result[0].question_image_url;
            var options              = req.body.options              || result[0].options;
            var correct_answer       = req.body.correct_answer       || result[0].correct_answer;
            var total_marks          = req.body.total_marks          || result[0].total_marks;
            var question_description = req.body.question_description || result[0].question_description;
            var solution_image_url   = req.body.solution_image_url   || result[0].solution_image_url;
            var negative_mark        = req.body.negative_mark        || result[0].negative_mark;
            var partial_mark         = req.body.partial_mark         || result[0].partial_mark;
            let sql2 = "UPDATE multiple_choice_question SET question_type = ?, question_subject_id = ?, question_image_url =?, options = ?, correct_answer = ?, total_marks = ?, question_description = ?, solution_image_url = ?, negative_mark = ?, partial_mark = ? WHERE question_id= ?";
            mysqlConnection.query(sql2, [question_type, question_subject_id, question_image_url, options, correct_answer, total_marks, question_description, solution_image_url, negative_mark, partial_mark, id], (err2, result2) => {
                if(err2) {
                    res.status(202).send({ error: err2 })
                }
                else{
                    res.status(200).send({success : "Table was succesfully updated."});
                }
            });
        }
        else{
            res.status(400).send({error : "No question with this questionid exits."});
        }
      }
    })
});

// update a particular subjective type questions from the subjective type questions table
router.post('/update-subjective-type-question/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM subjective_type_question WHERE question_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        if(result.length !=0){
            var question_type        = req.body.question_type        || result[0].question_type;
            var question_subject_id  = req.body.question_subject_id  || result[0].question_subject_id;
            var question_image_url   = req.body.question_image_url   || result[0].question_image_url;
            var correct_answer       = req.body.correct_answer       || result[0].correct_answer;
            var total_marks          = req.body.total_marks          || result[0].total_marks;
            var question_description = req.body.question_description || result[0].question_description;
            var solution_image_url   = req.body.solution_image_url   || result[0].solution_image_url;
            var negative_mark        = req.body.negative_mark        || result[0].negative_mark;
            var partial_mark         = req.body.partial_mark         || result[0].partial_mark;
            let sql2 = "UPDATE subjective_type_question SET question_type = ?, question_subject_id = ?, question_image_url =?, correct_answer = ?, total_marks = ?, question_description = ?, solution_image_url = ?, negative_mark = ?, partial_mark = ? WHERE question_id= ?";
            mysqlConnection.query(sql2, [question_type, question_subject_id, question_image_url, correct_answer, total_marks, question_description, solution_image_url, negative_mark, partial_mark, id], (err2, result2) => {
                if(err2) {
                    res.status(202).send({ error: err2 })
                }
                else{
                    res.status(200).send({success : "Table was succesfully updated."});
                }
            });
        }
        else{
            res.status(400).send({error : "No question with this questionid exits."});
        }
      }
    })
});

// update a particular integer type questions from the subjective type questions table
router.post('/update-integer-type-question/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM integer_type_question WHERE question_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        if(result.length !=0){
            var question_type        = req.body.question_type        || result[0].question_type;
            var question_subject_id  = req.body.question_subject_id  || result[0].question_subject_id;
            var question_image_url   = req.body.question_image_url   || result[0].question_image_url;
            var correct_answer       = req.body.correct_answer       || result[0].correct_answer;
            var total_marks          = req.body.total_marks          || result[0].total_marks;
            var question_description = req.body.question_description || result[0].question_description;
            var solution_image_url   = req.body.solution_image_url   || result[0].solution_image_url;
            var negative_mark        = req.body.negative_mark        || result[0].negative_mark;
            var partial_mark         = req.body.partial_mark         || result[0].partial_mark;
            let sql2 = "UPDATE integer_type_question SET question_type = ?, question_subject_id = ?, question_image_url =?, correct_answer = ?, total_marks = ?, question_description = ?, solution_image_url = ?, negative_mark = ?, partial_mark = ? WHERE question_id= ?";
            mysqlConnection.query(sql2, [question_type, question_subject_id, question_image_url, correct_answer, total_marks, question_description, solution_image_url, negative_mark, partial_mark, id], (err2, result2) => {
                if(err2) {
                    res.status(202).send({ error: err2 })
                }
                else{
                    res.status(200).send({success : "Table was succesfully updated."});
                }
            });
        }
        else{
            res.status(400).send({error : "No question with this questionid exits."});
        }
      }
    })
});

// delete a particular Single choice question from the Single choice question table
router.delete('/delete-single-choice-question/:id', function(req, res, next) {
    var id = req.params.id;
    var sql = "DELETE FROM single_choice_question WHERE question_id=" + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err)  {
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send({'status': 'success'});
      }
    });
  });
  
// delete a particular Multiple choice question from the Multiple choice question table
router.delete('/delete-multiple-choice-question/:id', function(req, res, next) {
    var id = req.params.id;
    var sql = "DELETE FROM multiple_choice_question WHERE question_id=" + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
        if(err)  {
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send({'status': 'success'});
        }
    });
  });
  
// delete a particular subjective type question from the subjective type question table
router.delete('/delete-subjective-type-question/:id', function(req, res, next) {
    var id = req.params.id;
    var sql = "DELETE FROM subjective_type_question WHERE question_id=" + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
        if(err)  {
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send({'status': 'success'});
        }
    });
  });
  
// delete a particular integer type question from the integer type question table
router.delete('/delete-integer-type-question/:id', function(req, res, next) {
    var id = req.params.id;
    var sql = "DELETE FROM integer_type_question WHERE question_id=" + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
        if(err)  {
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send({'status': 'success'});
        }
    });
});

module.exports = router;
