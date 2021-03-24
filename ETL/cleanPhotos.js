const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('../data/answers_photos.csv', {encoding: "utf8"}, {start: 1}),
  crlfDelay: Infinity,
});

const outStream = fs.createWriteStream('../clean_data/clean_answers_photos.csv', {encoding: "utf8"});


rl.on('line', (line) => {
  const re = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/
  const fields = line.split(re);

  if (fields.length !== 3) {
    return;
  }

  const [id, answer_id, url] = fields;

  function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
  }

  /* check numbers are not negative or out of range */

  if (!isNumeric(id) || !isNumeric(answer_id)) {
    return;
  }

  if (Number(id) <= 0 || Number(answer_id) <= 0) {
    return;
  };

  const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

  function isValidURL(url) {
    let str = url;
    // remove surrounding double quotes
    if (url[0] === '"' && url[0] === url[url.length - 1]) {
      str = url.substring(1, url.length - 1);
    }

    return !!urlPattern.test(str);
  }

  if (!isValidURL(url)) {
    return;
  }

  outStream.write(line + '\n');
})

