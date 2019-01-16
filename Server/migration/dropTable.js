import pool from '../config/config';

const dropMeetupTable = 'DROP TABLE meetups';
const dropQuestionTable = 'DROP TABLE questions';
const dropRsvpTable = 'DROP TABLE votes';
const dropVoteTable = 'DROP TABLE rsvp';
const dropUsers = 'DROP TABLE users';

async function deleted() {
  try {
    await pool.query(dropMeetupTable);
    await pool.query(dropQuestionTable);
    await pool.query(dropRsvpTable);
    await pool.query(dropVoteTable);
    await pool.query(dropUsers);
    console.log('Tables successfully deleted');
  } catch (error) {
    console.log(error);
  }
}

deleted();
