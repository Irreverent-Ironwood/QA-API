import http from 'k6/http';
import { sleep } from 'k6';

// get questions from product id

// const prefix = 'http://localhost:3003/qa/questions?product_id=';
// const id = Math.floor(Math.random() * 350001) + 3171634;
// const path = `${prefix}${id}`;

// get answers from question id
// const id = Math.floor(Math.random() * 3521624);
// const path = `http://localhost:3003/qa/questions/${id}/answers`

export let options = {
  vus: 1000,
  duration: '30s',
};
export default function () {
  http.get(path);
  sleep(1);
}
