const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('../data/answers.csv', {encoding: "utf8"}, {start: 1}),
  crlfDelay: Infinity,
});

const outStream = fs.createWriteStream('../clean_data/clean_answers.csv', {encoding: "utf8"});

let count = 0;

rl.on('line', (line) => {
  const re = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/
  const fields = line.split(re);

  if (fields.length !== 8) {
    return;
  }

  const [id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful] = fields;

  function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
  }

  /* check numbers are not negative or out of range */

  if (!isNumeric(id) || !isNumeric(question_id) || !isNumeric(reported) || !isNumeric(helpful)) {
    return;
  }

  if (Number(id) <= 0 || Number(question_id) <= 0 || Number(reported) < 0 || Number(reported) > 1 || Number(helpful) < 0) {
    return;
  };

  /* check text inputs are not empty */

  if (body.length < 3 || answerer_name.length < 3 || answerer_email.length < 7) {
    return;
  }

  const splitEmail = answerer_email.split('@');

  if (splitEmail.length < 2) {
    return;
  }

  if (date_written.length !== 12 || date_written[5] !== '-' || date_written[8] !== '-') {
    return
  }


  outStream.write(line + '\n');
})

