const express = require('express');
const db = require('./mySQL/index.js');
const { getQuestions, getAnswers } = require('./mySQL/queries.js')
const { answersWphotos, questionsWanswers, addQuestion, addAnswer } = require('./controller.js');
const app = express();
app.use(express.json());
const port = 3003;

app.get('/qa/questions', (req, res) => {
  const { product_id, page, count } = req.query;
  questionsWanswers(product_id, (err, results) => {
    if (err) {
      throw err;
    }

    res.send(results);
  })
})


app.get('/qa/questions/:question_id/answers', (req, res) => {
  const { page, count } = req.query;
  const { question_id } = req.params;

  answersWphotos(question_id, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
})

app.post('/qa/questions', (req, res) => {
  const { body, name, email, product_id } = req.body;

  addQuestion(body, name, email, product_id, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.sendStatus(201);
  })
})

app.post('/qa/questions/:question_id/answers', (req, res) => {
  const { body, name, email, photos } = req.body;
  const { question_id } = req.params;

  addAnswer(body, name, email, photos, question_id, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.sendStatus(201);
  })

})
/* report/helpful PUTs */
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  const { question_id } = req.params;

  db.query(`UPDATE questions SET helpful = helpful + 1 WHERE id = ${question_id}`, (err, result) => {
    if (err) {
      throw err;
    }
    res.sendStatus(204);
  })
})

app.put('/qa/questions/:question_id/report', (req, res) => {
  const { question_id } = req.params;

  db.query(`UPDATE questions SET reported = 1 WHERE id = ${question_id}`, (err, result) => {
    if (err) {
      throw err;
    }
    res.sendStatus(204);
  })
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  const { answer_id } = req.params;

  db.query(`UPDATE answers SET helpful = helpful + 1 WHERE id = ${answer_id}`, (err, result) => {
    if (err) {
      throw err;
    }
    res.sendStatus(204);
  })
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  const { answer_id } = req.params;

  db.query(`UPDATE answers SET reported = 1 WHERE id = ${answer_id}`, (err, result) => {
    if (err) {
      throw err;
    }
    res.sendStatus(204);
  })
})



app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})

// on readable i write it to a file?