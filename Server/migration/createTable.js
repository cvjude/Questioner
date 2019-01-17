import pool from '../config/config';
import { hash } from '../helper/passwordHash';

const meetupTable = `CREATE TABLE IF NOT EXISTS meetups(
  id serial PRIMARY KEY,
  createdOn text NOT NULL,
  location text NOT NULL,
  images text[],
  title text NOT NULL,
  happeningOn text NOT NULL,
  tags text[]
  );
`;

const userTable = `CREATE TABLE IF NOT EXISTS users(
  id serial PRIMARY KEY,
  firstname text NOT NULL,
  lastname text NOT NULL,
  othername text,
  email text NOT NULL,
  phoneNumber text,
  username text NOT NULL,
  registerd text NOT NULL,
  isAdmin text NOT NULL,
  password text NOT NULL
  );
`;

const questionTable = `CREATE TABLE IF NOT EXISTS questions(
  id serial PRIMARY KEY,
  createdOn text NOT NULL,
  createdBy integer NOT NULL,
  meetupid integer NOT NULL,
  title text NOT NULL,
  body text NOT NULL,
  votes integer NOT NULL
  );`;


const voteTable = `CREATE TABLE IF NOT EXISTS votes(
  id serial NOT NULL,
  questionid integer NOT NULL,
  userid integer PRIMARY KEY,
  upvote integer NOT NULL,
  downvote integer NOT NULL
  );
`;

const RsvpTable = `CREATE TABLE IF NOT EXISTS rsvp(
  id serial NOT NULL,
  userid integer NOT NULL,
  meetupid integer NOT NULL,
  status text NOT NULL,

  PRIMARY KEY(userid, meetupid)
  );
`;

const commentTable = `CREATE TABLE IF NOT EXISTS comments(
  id serial NOT NULL,
  userid integer NOT NULL,
  questionid integer NOT NULL,
  comment text NOT NULL
  );
`;

const tagTable = `CREATE TABLE IF NOT EXISTS tags(
  id serial NOT NULL,
  meetupid integer NOT NULL,
  tags text[] NOT NULL
  );
`;

const imageTable = `CREATE TABLE IF NOT EXISTS images(
  id serial NOT NULL,
  userid integer PRIMARY KEY,
  images text[] NOT NULL
  );
`;

const date = new Date().toString();
const nextDate = new Date('March 13, 2019 05:35:32').toString();

async function create() {
  const createTable = `${meetupTable}${questionTable}${voteTable}${RsvpTable}${userTable}${commentTable}${tagTable}${imageTable}`;
  const meetup = {
    text: 'INSERT INTO meetups (createdOn, location, images, title, happeningOn, tags) VALUES($1, $2, $3, $4, $5, $6)',
    values: [date, 'Warri', '{"image-1", "image-2"}', 'title-1', nextDate, '{"Andela", "Motivation"}'],
  };
  const meetupTwo = {
    text: 'INSERT INTO meetups (createdOn, location, images, title, happeningOn, tags) VALUES($1, $2, $3, $4, $5, $6)',
    values: [date, 'London', '{"image-3", "image-4"}', 'title-2', date, '{"Js", "Angular"}'],
  };
  const meetupThree = {
    text: 'INSERT INTO meetups (createdOn, location, images, title, happeningOn, tags) VALUES($1, $2, $3, $4, $5, $6)',
    values: [date, 'Lagos', '{"image-5", "image-6"}', 'title-3', nextDate, '{"React", "Vue"}'],
  };
  const question = {
    text: 'INSERT INTO questions (createdOn, createdby, meetupid, title, body, votes) VALUES($1, $2, $3, $4, $5, $6)',
    values: [date, 1, 1, 'Qtitle-1', 'boby-1', 0],
  };
  const vote = {
    text: 'INSERT INTO votes (questionid, userid, upvote, downvote) VALUES($1, $2, $3, $4)',
    values: [1, 1, 1, 0],
  };
  const rsvp = {
    text: 'INSERT INTO rsvp (userid, meetupid, status) VALUES($1, $2, $3)',
    values: [1, 1, 'yes'],
  };
  const user = {
    text: `INSERT INTO users(  
    firstname,
    lastname,
    othername,
    email,
    phoneNumber,
    username,
    registerd,
    isadmin,
    password) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    values: ['jude', 'Chinoso', 'Violet', 'jjchinosoviolet@gmail.com', '0802-744-4796', 'cvjude', date, true, hash('seven')],
  };
  try {
    await pool.query(createTable);
    await pool.query(meetup);
    await pool.query(question);
    await pool.query(vote);
    await pool.query(rsvp);
    await pool.query(meetupTwo);
    await pool.query(meetupThree);
    await pool.query(user);
    console.log('Created tables');
  } catch (error) {
    console.log(error);
  }
}

create();
