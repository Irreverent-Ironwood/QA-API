DROP DATABASE IF EXISTS qna;

CREATE DATABASE qna;

USE qna;

CREATE TABLE questions (
  id int unsigned NOT NULL AUTO_INCREMENT,
  product_id int unsigned NOT NULL,
  body varchar(400) NOT NULL,
  date_written date DEFAULT (CURRENT_DATE),
  asker_name varchar(40) NOT NULL,
  asker_email varchar(64) NOT NULL,
  reported boolean DEFAULT false,
  helpful int DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE answers (
  id int unsigned NOT NULL AUTO_INCREMENT,
  question_id int unsigned NOT NULL,
  body varchar(400) NOT NULL,
  date_written date DEFAULT (CURRENT_DATE),
  answerer_name varchar(40) NOT NULL,
  answerer_email varchar(64) NOT NULL,
  reported boolean DEFAULT false,
  helpful int DEFAULT 0,
  PRIMARY KEY (id),
  FOREIGN KEY(question_id)
    REFERENCES questions(id)
    ON DELETE CASCADE
);

CREATE TABLE photos (
  id int unsigned NOT NULL AUTO_INCREMENT,
  answer_id int unsigned NOT NULL,
  url varchar(400) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(answer_id)
    REFERENCES answers(id)
    ON DELETE CASCADE
);

LOAD DATA LOCAL INFILE './mySQL/clean_data/clean_questions.csv' INTO TABLE questions
FIELDS TERMINATED BY ',' optionally enclosed by '"'
LINES TERMINATED BY '\n'
(id,product_id,body,date_written,asker_name,asker_email,reported,helpful);



LOAD DATA LOCAL INFILE './mySQL/clean_data/clean_answers.csv' INTO TABLE answers
FIELDS TERMINATED BY ',' optionally enclosed by '"'
LINES TERMINATED BY '\n'
(id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful);

LOAD DATA LOCAL INFILE './mySQL/clean_data/clean_answers_photos.csv' INTO TABLE photos
FIELDS TERMINATED BY ',' optionally enclosed by '"'
LINES TERMINATED BY '\n'
(id,answer_id,url);


ALTER TABLE questions ADD INDEX product_id_index (product_id);
ALTER TABLE answers ADD INDEX question_id_index (question_id);
ALTER TABLE photos ADD INDEX answer_id_index (answer_id);