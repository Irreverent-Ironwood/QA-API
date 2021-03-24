var db = require('./index.js');

module.exports = {
  getQuestions: (product_id) => {
    return new Promise((resolve, reject) => {
      db.query(`select id, date_written, asker_name, reported, helpful from questions where (product_id = ${product_id})`, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  },
  getAnswersInQuestions: (product_id) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from answers where question_id in (
        select id from questions where product_id = ${product_id}
      )`, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  },
  getAnswers: (question_id) => {
    return new Promise((resolve, reject) => {
      db.query(`select id, body, date_written, answerer_name, reported, helpful from answers where (question_id = ${question_id})`, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  },
  getPhotosInAnswers: (question_id) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from photos where answer_id in (
        select id from answers where question_id = ${question_id}
      )`, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  },
  getPhotosInQuestions: (product_id) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from photos where answer_id in (select id from answers where question_id in (select id from questions where product_id = ${product_id}))`, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      })
    })
  },
  photoInsert: (url, answer_id) => {
    return new Promise((resolve, reject) => {
      db.query(`insert into photos (answer_id, url) values (${answer_id}, "${url}")`, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      })
    })
  }
};


// select * from questions where product_id = ${product_id};

// select * from answers where question_id in (select id from questions where product_id = ${product_id})

// select * from photos where answer_id in (select id from answers where question_id in (select id from questions where product_id = ${product_id}));