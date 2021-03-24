var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var questionModel = new Schema({
  product_id: {
    type: Number,
    required: true,
  },
  results: [{
    question_id: {
      type: Number,
      required: true,
    },
    question_body: String,
    question_date: String,
    asker_name: String,
    question_helpfulness: Number,
    reported: Boolean,
    answers: [{
      id: Number,
      body: String,
      date: String,
      answerer_name: String,
      helpfulness: Number,
      photos: [{
        id: Number,
        url: String,
      }]
    }]
  }]
});
// ******************
// var questionModelSchema = new Schema({
//   product_id: String,
//   question_id: Number,
//   question_body: String,
//   question_date: String,
//   asker_name: String,
//   question_helpfulness: Number,
//   reported: Boolean,
// })
// mongoose.model('question ',questionModelSchema ,'question ')


// var answerModelSchema = new Schema({
//   id: Number,
//   body: String,
//   date: String,
//   answerer_name: String,
//   helpfulness: Number,
//   photos: [{
//     id: Number,
//     url: String,
//   }],
// });
// mongoose.model('answer', answerModelSchema, 'answer')