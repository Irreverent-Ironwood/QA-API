const db = require('./mySQL/index.js');
const { getQuestions, getAnswersInQuestions, getAnswers, getPhotosInAnswers, getPhotosInQuestions, photoInsert } = require('./mySQL/queries.js');

module.exports = {
  answersWphotos: async function(question_id, callback) {
    var resultA = await getAnswers(question_id);
    var resultB = await getPhotosInAnswers(question_id);

    var obj = {
      "question": question_id,
      "results": resultA,
    }
    for (var i = 0; i < resultA.length; i++) {
      obj.results[i].photos = [];
      for (var j = 0; j < resultB.length; j++) {
        if (resultB[j].answer_id === obj.results[i].id) {
          obj.results[i].photos.push({
            "id": resultB[j].id,
            "url": resultB[j].url
          })
        }
      }
    }

    callback(null, obj);
  },
  questionsWanswers: async function(product_id, callback) {
    var questions = await getQuestions(product_id);
    var answers = await getAnswersInQuestions(product_id);
    var photos = await getPhotosInQuestions(product_id);

    var obj = {
      "product_id": product_id,
      "results": questions,
    }

    for (var i = 0; i < answers.length; i++) {
      answers[i].photos = [];
      for (var j = 0; j < photos.length; j++) {
        if (photos[j].answer_id === answers[i].id) {
          answers[i].photos.push({
            "id": photos[j].id,
            "url": photos[j].url
          })
        }
      }
    }

    for (var i = 0; i < obj.results.length; i++) {
      obj.results[i].answers = {};
      for (var j = 0; j < answers.length; j++) {
        if (answers[j].question_id === obj.results[i].id) {
          obj.results[i].answers[answers[j].id] = answers[j];
        }
      }
    }


    callback(null, obj);
  },
  addQuestion: (body, name, email, product_id, callback) => {
    db.query(`INSERT INTO questions (product_id, body, asker_name, asker_email) VALUES (${product_id}, "${body}", "${name}", "${email}")`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    })
  },
  addAnswer: (body, name, email, photos, question_id, callback) => {
    db.query(`INSERT INTO answers (question_id, body, answerer_name, answerer_email) VALUES (${question_id}, "${body}", "${name}", "${email}")`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        db.query(`SELECT LAST_INSERT_ID()`, (err, result) => {
          if (err) {
            callback(err)
          }

          const { 'LAST_INSERT_ID()': answerId } = result[0];

          photoInsert(photos[0], answerId).then((result3) => {
            callback(null, result3)
          })
          .catch((err) => {
            callback(err);
          })
        })
      }
    })
  }
}