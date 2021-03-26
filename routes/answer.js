var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection');

 // create Single choice answer table
router.get('/create-single-choice-answer', (req, res) => {
  let sql = "CREATE TABLE single_choice_answer(answer_id INT AUTO_INCREMENT PRIMARY KEY, question_id INT NOT NULL, question_type INT NOT NULL, user_id VARCHAR(128) NOT NULL, answer INT, answer_gain FLOAT default 0, FOREIGN KEY (question_id) REFERENCES single_choice_question(question_id), FOREIGN KEY (question_type) REFERENCES exam_question_type(exam_question_type_id), FOREIGN KEY (user_id) REFERENCES user(user_id))"
  mysqlConnection.query(sql, (err, result) => {
    if(err) {
      res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

 // create multiple choice answer table
router.get('/create-multiple-choice-answer', (req, res) => {
  let sql = "CREATE TABLE multiple_choice_answer(answer_id INT AUTO_INCREMENT PRIMARY KEY, question_id INT NOT NULL, question_type INT NOT NULL, user_id VARCHAR(128) NOT NULL, answer TEXT, answer_gain FLOAT default 0, FOREIGN KEY (question_id) REFERENCES multiple_choice_question(question_id), FOREIGN KEY (question_type) REFERENCES exam_question_type(exam_question_type_id), FOREIGN KEY (user_id) REFERENCES user(user_id))"
  mysqlConnection.query(sql, (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
      }
      else{
          res.status(200).send(result);
      }
  })
});

 // create subjective type answer table
router.get('/create-subjective-type-answer', (req, res) => {
  let sql = "CREATE TABLE subjective_type_answer(answer_id INT AUTO_INCREMENT PRIMARY KEY, question_id INT NOT NULL, question_type INT NOT NULL, user_id VARCHAR(128) NOT NULL, answer TEXT, answer_gain FLOAT default 0, FOREIGN KEY (question_id) REFERENCES subjective_type_question(question_id), FOREIGN KEY (question_type) REFERENCES exam_question_type(exam_question_type_id), FOREIGN KEY (user_id) REFERENCES user(user_id))"
  mysqlConnection.query(sql, (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
      }
      else{
          res.status(200).send(result);
      }
  })
});

 // create integer type answer table
router.get('/create-integer-type-answer', (req, res) => {
  let sql = "CREATE TABLE integer_type_answer(answer_id INT AUTO_INCREMENT PRIMARY KEY, question_id INT NOT NULL, question_type INT NOT NULL, user_id VARCHAR(128) NOT NULL, answer FLOAT, answer_gain FLOAT default 0, FOREIGN KEY (question_id) REFERENCES integer_type_question(question_id), FOREIGN KEY (question_type) REFERENCES exam_question_type(exam_question_type_id), FOREIGN KEY (user_id) REFERENCES user(user_id))"
  mysqlConnection.query(sql, (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
      }
      else{
          res.status(200).send(result);
      }
  })
});
 
   // insert Single choice answer in the Single choice answer table by making a post request
 router.post('/insert-single-choice-answer', (req, res) => {
  var question_id  	= req.body.question_id;
  var question_type = req.body.question_type;
  var user_id		= req.body.user_id;
  var answer    	= req.body.answer || null;
  var answer_gain	= req.body.answer_gain || 0;

  if(!question_id){
    console.log("Invalid insert, question id cannot be empty");
    res.status(202).send({ error: 'Invalid insert, question id cannot be empty' });
  }
  else if(!question_type){
    console.log("Invalid insert, question type cannot be empty");
    res.status(202).send({ error: 'Invalid insert, question type cannot be empty' });
  }
  else if(!user_id){
    console.log("Invalid insert, user_id cannot be empty");
    res.status(202).send({ error: 'Invalid insert, user_id cannot be empty' });
  }
  else{
    var value    = [[question_id, question_type, user_id, answer, answer_gain]];
    let sql = "INSERT INTO single_choice_answer (question_id, question_type, user_id, answer, answer_gain) VALUES ?"
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
 
    // insert multiple choice answer in the multiple choice answer table by making a post request
 router.post('/insert-multiple-choice-answer', (req, res) => {
  var question_id  	= req.body.question_id;
  var question_type = req.body.question_type;
  var user_id		= req.body.user_id;
  var answer    	= req.body.answer || null;
  var answer_gain	= req.body.answer_gain || 0;

  if(!question_id){
    console.log("Invalid insert, question id cannot be empty");
    res.status(202).send({ error: 'Invalid insert, question id cannot be empty' });
  }
  else if(!question_type){
    console.log("Invalid insert, question type cannot be empty");
    res.status(202).send({ error: 'Invalid insert, question type cannot be empty' });
  }
  else if(!user_id){
    console.log("Invalid insert, user_id cannot be empty");
    res.status(202).send({ error: 'Invalid insert, user_id cannot be empty' });
  }
  else{
    var value    = [[question_id, question_type, user_id, answer, answer_gain]];
    let sql = "INSERT INTO multiple_choice_answer (question_id, question_type, user_id, answer, answer_gain) VALUES ?"
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
 
    // insert subjective type answer in the subjective type answer table by making a post request
 router.post('/insert-subjective-type-answer', (req, res) => {
  var question_id  	= req.body.question_id;
  var question_type = req.body.question_type;
  var user_id		= req.body.user_id;
    var answer    	= req.body.answer || null;
	var answer_gain	= req.body.answer_gain || 0;

  if(!question_id){
    console.log("Invalid insert, question id cannot be empty");
    res.status(202).send({ error: 'Invalid insert, question id cannot be empty' });
  }
  else if(!question_type){
    console.log("Invalid insert, question type cannot be empty");
    res.status(202).send({ error: 'Invalid insert, question type cannot be empty' });
  }
  else if(!user_id){
    console.log("Invalid insert, user_id cannot be empty");
    res.status(202).send({ error: 'Invalid insert, user_id cannot be empty' });
  }
  else{
    var value    = [[question_id, question_type, user_id, answer, answer_gain]];
    let sql = "INSERT INTO subjective_type_answer (question_id, question_type, user_id, answer, answer_gain) VALUES ?"
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
 
    // insert integer type answer in the integer type answer table by making a post request
 router.post('/insert-integer-type-answer', (req, res) => {
  var question_id  	= req.body.question_id;
  var question_type = req.body.question_type;
  var user_id		= req.body.user_id;
  var answer    	= req.body.answer || null;
  var answer_gain	= req.body.answer_gain || 0;

  if(!question_id){
    console.log("Invalid insert, question id cannot be empty");
    res.status(202).send({ error: 'Invalid insert, question id cannot be empty' });
  }
  else if(!question_type){
    console.log("Invalid insert, question type cannot be empty");
    res.status(202).send({ error: 'Invalid insert, question type cannot be empty' });
  }
  else if(!user_id){
    console.log("Invalid insert, user_id cannot be empty");
    res.status(202).send({ error: 'Invalid insert, user_id cannot be empty' });
  }
  else{
    var value    = [[question_id, question_type, user_id, answer, answer_gain]];
    let sql = "INSERT INTO integer_type_answer (question_id, question_type, user_id, answer, answer_gain) VALUES ?"
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

// Fetch the entire data of the single choice answer table
router.get('/fetch-single-choice-answer', (req, res) => {
  let sql = "SELECT * FROM single_choice_answer"
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// Fetch the entire data of the multiple choice answer table
router.get('/fetch-multiple-choice-answer', (req, res) => {
  let sql = "SELECT * FROM multiple_choice_answer"
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// Fetch the entire data of the subjective type answer table
router.get('/fetch-subjective-type-answer', (req, res) => {
  let sql = "SELECT * FROM subjective_type_answer"
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// Fetch the entire data of the integer type answer table
router.get('/fetch-integer-type-answer', (req, res) => {
  let sql = "SELECT * FROM integer_type_answer"
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// Fetch a particular id from the Single choice answer table using its answer id
router.get('/fetch-single-choice-answer/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM single_choice_answer WHERE answer_id="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// Fetch a particular id from the Single choice answer table using its question id
router.get('/fetch-single-answer-by-questionid/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM single_choice_answer WHERE question_id="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// Fetch a particular id from the Single choice answer table using its question type
router.get('/fetch-single-answer-by-questiontype/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM single_choice_answer WHERE question_type="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// Fetch a particular id from the Single choice answer table using its user id
router.get('/fetch-single-answer-by-userid/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM single_choice_answer WHERE user_id="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// Fetch a particular id from the multiple choice answer table using its answer id
router.get('/fetch-multiple-choice-answer/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM multiple_choice_answer WHERE answer_id="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// Fetch a particular id from the multiple choice answer table using its question id
router.get('/fetch-multiple-answer-by-questionid/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM multiple_choice_answer WHERE question_id="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// Fetch a particular id from the multiple choice answer table using its question type
router.get('/fetch-multiple-answer-by-questiontype/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM multiple_choice_answer WHERE question_type="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// Fetch a particular id from the multiple choice answer table using its user id
router.get('/fetch-multiple-answer-by-userid/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM multiple_choice_answer WHERE user_id="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// Fetch a particular id from the subjective type answer table using its answer id
router.get('/fetch-subjective-type-answer/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM subjective_type_answer WHERE answer_id="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// Fetch a particular id from the subjective type answer table using its question id
router.get('/fetch-subjective-answer-by-questionid/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM subjective_type_answer WHERE question_id="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// Fetch a particular id from the subjective type answer table using its question type
router.get('/fetch-subjective-answer-by-questiontype/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM subjective_type_answer WHERE question_type="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// Fetch a particular id from the subjective type answer table using its user id
router.get('/fetch-subjective-answer-by-userid/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM subjective_type_answer WHERE user_id="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// Fetch a particular id from the integer type answer table using its answer id
router.get('/fetch-integer-type-answer/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM integer_type_answer WHERE answer_id="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// Fetch a particular id from the integer type answer table using its question id
router.get('/fetch-integer-answer-by-questionid/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM integer_type_answer WHERE question_id="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// Fetch a particular id from the integer type answer table using its question type
router.get('/fetch-integer-answer-by-questiontype/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM integer_type_answer WHERE question_type="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// Fetch a particular id from the integer type answer table using its user id
router.get('/fetch-integer-answer-by-userid/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM integer_type_answer WHERE user_id="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// update a particular Single choice answer from the single choice answer table
router.post('/update-single-choice-answer/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM single_choice_answer WHERE answer_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        if(result.length !=0){
            var question_id   = req.body.question_id   || result[0].question_id;
            var question_type = req.body.question_type || result[0].question_type;
            var user_id       = req.body.user_id       || result[0].user_id;
            var answer        = req.body.answer        || result[0].answer;
			var answer_gain	  = req.body.answer_gain   || result[0].answer_gain;
            let sql2 = "UPDATE single_choice_answer SET question_id = ?, question_type =?, user_id = ?, answer = ?, answer_gain = ? WHERE answer_id= ?";
            mysqlConnection.query(sql2, [question_id, question_type, user_id, answer, answer_gain, id], (err2, result2) => {
                if(err2) {
                    res.status(202).send({ error: err2 })
                }
                else{
                    res.status(200).send({success : "Table was succesfully updated."});
                }
            });
        }
        else{
            res.status(400).send({error : "No answer with this answer id exits."});
        }
      }
    })
});

// update a particular multiple choice answer from the multiple choice answer table
router.post('/update-multiple-choice-answer/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM multiple_choice_answer WHERE answer_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        if(result.length !=0){
            var question_id   = req.body.question_id   || result[0].question_id;
            var question_type = req.body.question_type || result[0].question_type;
            var user_id       = req.body.user_id       || result[0].user_id;
            var answer        = req.body.answer        || result[0].answer;
			var answer_gain	  = req.body.answer_gain   || result[0].answer_gain;
            let sql2 = "UPDATE multiple_choice_answer SET question_id = ?, question_type =?, user_id = ?, answer = ?, answer_gain = ? WHERE answer_id= ?";
            mysqlConnection.query(sql2, [question_id, question_type, user_id, answer, answer_gain, id], (err2, result2) => {
                if(err2) {
                    res.status(202).send({ error: err2 })
                }
                else{
                    res.status(200).send({success : "Table was succesfully updated."});
                }
            });
        }
        else{
            res.status(400).send({error : "No answer with this answer id exits."});
        }
      }
    })
 });

// update a particular subjective type answer from the subjective type answer table
router.post('/update-subjective-type-answer/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM subjective_type_answer WHERE answer_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        if(result.length !=0){
            var question_id   = req.body.question_id   || result[0].question_id;
            var question_type = req.body.question_type || result[0].question_type;
            var user_id       = req.body.user_id       || result[0].user_id;
            var answer        = req.body.answer        || result[0].answer;
			var answer_gain	  = req.body.answer_gain   || result[0].answer_gain;
            let sql2 = "UPDATE subjective_type_answer SET question_id = ?, question_type =?, user_id = ?, answer = ?, answer_gain = ? WHERE answer_id= ?";
            mysqlConnection.query(sql2, [question_id, question_type, user_id, answer, answer_gain, id], (err2, result2) => {
                if(err2) {
                    res.status(202).send({ error: err2 })
                }
                else{
                    res.status(200).send({success : "Table was succesfully updated."});
                }
            });
        }
        else{
            res.status(400).send({error : "No answer with this answer id exits."});
        }
      }
    })
 });

// update a particular integer type answer from the integer type answer table
router.post('/update-integer-type-answer/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM integer_type_answer WHERE answer_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        if(result.length !=0){
            var question_id   = req.body.question_id   || result[0].question_id;
            var question_type = req.body.question_type || result[0].question_type;
            var user_id       = req.body.user_id       || result[0].user_id;
            var answer        = req.body.answer        || result[0].answer;
			var answer_gain	  = req.body.answer_gain   || result[0].answer_gain;
            let sql2 = "UPDATE integer_type_answer SET question_id = ?, question_type =?, user_id = ?, answer = ?, answer_gain = ? WHERE answer_id= ?";
            mysqlConnection.query(sql2, [question_id, question_type, user_id, answer, answer_gain, id], (err2, result2) => {
                if(err2) {
                    res.status(202).send({ error: err2 })
                }
                else{
                    res.status(200).send({success : "Table was succesfully updated."});
                }
            });
        }
        else{
            res.status(400).send({error : "No answer with this answer id exits."});
        }
      }
    })
 });

// delete a particular Single choice answer from the Single choice answer table
router.delete('/delete-single-choice-answer/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = "DELETE FROM single_choice_answer WHERE answer_id=" + mysql.escape(id);
  mysqlConnection.query(sql, function(err, result) {
    if(err)  {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send({'status': 'success'});
    }
  });
});

// delete a particular Multiple choice answer from the Multiple choice answer table
router.delete('/delete-multiple-choice-answer/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = "DELETE FROM multiple_choice_answer WHERE answer_id=" + mysql.escape(id);
  mysqlConnection.query(sql, function(err, result) {
    if(err)  {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send({'status': 'success'});
    }
  });
});

// delete a particular subjective type answer from the subjective type answer table
router.delete('/delete-subjective-type-answer/:id', function(req, res, next) {
  var id = req.params.id;
  var sql3 = "DELETE FROM subjective_type_answer WHERE answer_id=" + mysql.escape(id);
  mysqlConnection.query(sql3, function(err, result) {
    if(err)  {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send({'status': 'success'});
    }
  });
});

// delete a particular integer type answer from the integer type answer table
router.delete('/delete-integer-type-answer/:id', function(req, res, next) {
  var id = req.params.id;
  var sql3 = "DELETE FROM integer_type_answer WHERE answer_id=" + mysql.escape(id);
  mysqlConnection.query(sql3, function(err, result) {
    if(err)  {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send({'status': 'success'});
    }
  });
});  

module.exports = router;