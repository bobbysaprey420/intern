
var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection');


//create user table
router.get('/create-user-table', (req, res) => {
    let sql = "CREATE TABLE user(user_id VARCHAR(512) PRIMARY KEY NOT NULL, email VARCHAR(512) NOT NULL, first_name VARCHAR(128) NOT NULL, mobile_number VARCHAR(20) NOT NULL, last_name VARCHAR(128))"
    mysqlConnection.query(sql, (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    })
 });

 //insert user table
router.post('/add-user', (req, res) => {
    var user_id       = req.body.user_id;
	var email         = req.body.email;
    var first_name    = req.body.first_name;
	var mobile_number = req.body.mobile_number;
    var last_name     = req.body.last_name || null;

    if(!user_id){
        console.log("Invalid insert, user id cannot be empty");
        res.status(202).send({ error: 'Invalid insert, user id cannot be empty' })
    }
    else if(!first_name){
        console.log("Invalid insert, first name cannot be empty");
        res.status(202).send({ error: 'Invalid insert, first name cannot be empty' })
    }
    else if(!email){
        console.log("Invalid insert, email cannot be empty");
        res.status(202).send({ error: 'Invalid insert, email cannot be empty' })
    }
    else if(!mobile_number){
        console.log("Invalid insert, mobile number cannot be empty");
        res.status(202).send({ error: 'Invalid insert, mobile number cannot be empty' })
    }
    else{
        var value    = [[user_id, email, first_name, mobile_number, last_name]];
        let sql = "INSERT INTO user(user_id, email, first_name, mobile_number, last_name) VALUES ?"
        mysqlConnection.query(sql, [value] , (err, result) => {
            if(err){
                res.status(202).send({ error: err })
            }
            else{
                res.status(200).send(result);
            }
        })
    }
});

// Fetch a particular user from the user table using user id
router.get('/fetch-user/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM user WHERE user_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    });
});

// Fetch the entire table of the users
router.get('/fetch-users', (req, res) => {
    let sql = "SELECT * FROM user"
    mysqlConnection.query(sql, function(err, result) {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    });
});

// update a particular user from the user table
router.put('/update-user/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM user WHERE user_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        if(result.length !=0){
            var email         = req.body.email         || result[0].email;
            var first_name    = req.body.first_name    || result[0].first_name;
            var mobile_number = req.body.mobile_number || result[0].mobile_number;
            var last_name     = req.body.last_name     || result[0].last_name;
            let sql2 = "UPDATE user SET email = ?, first_name = ?, mobile_number = ?, last_name =? WHERE user_id= ?";
            mysqlConnection.query(sql2, [email, first_name, mobile_number, last_name, id], (err2, result2) => {
                if(err2) {
                    res.status(202).send({ error: err2 })
                }
                else{
                    res.status(200).send({success : "Table was succesfully updated."});
                }
            });
        }
        else{
            res.status(400).send({error : "No user with this user id exits."});
        }
      }
    });
});

// delete a particular user from the user table
router.delete('/delete-user/:id', function(req, res, next) {
    var id = req.params.id;
    var sql = "DELETE FROM user WHERE user_id=" + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    })
  });


 module.exports = router;