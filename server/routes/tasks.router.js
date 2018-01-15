const pool = require('../modules/pool');
const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
    
    // const queryText = 'SELECT * FROM tasks ORDER BY id';
    const queryText = 'SELECT * FROM tasks';
    pool.query(queryText)
        .then((result) => {
            console.log('query results:', result);
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('error making query:', err);
            res.sendStatus(500);
        });
});

router.get('/:id', function(req, res) {

    const queryText = 'SELECT * FROM tasks WHERE id=$1';
    pool.query(queryText, [req.params.id])
        .then((result) => {
            console.log('query results:', result);
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('error making query:', err);
            res.sendStatus(500);
        });
});

router.put('/update/:id', (req, res) => {
    const queryText = 'UPDATE tasks SET name = $1, description = $2';
    pool.query(queryText, [req.body.task, req.body.description])
        .then((result) => {
            console.log('result:', result.rows);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('error:', err);
            res.sendStatus(500);
        });
});

router.post('/', function(req, res) {
    const queryText = 'INSERT INTO tasks (name, description) VALUES ($1, $2);'
    pool.query(queryText, [req.body.name, req.body.description])
        .then((result) => {
            console.log('result:', result.rows);
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('error:', err);
            res.sendStatus(500);
        });
});

router.delete('/:id', function(req,res) {
    const queryText = 'DELETE FROM task WHERE id=$1';
    pool.query(queryText,[req.params.id])
        .then((result) => {
            console.log('result:', result.rows);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('error:', err);
            res.sendStatus(500);
        });

});
module.exports = router;