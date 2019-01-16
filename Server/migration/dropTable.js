import pool from '../config/config';

const dropMeetupTable = 'DROP TABLE meetups';
const dropQuestionTable = 'DROP TABLE questions';
const dropRsvpTable = 'DROP TABLE votes';
const dropVoteTable = 'DROP TABLE rsvp';

async function deleted() {
  try {
    await pool.query(dropMeetupTable);
    await pool.query(dropQuestionTable);
    await pool.query(dropRsvpTable);
    await pool.query(dropVoteTable);
    console.log('Tables successfully deleted');
  } catch (error) {
    console.log(error);
  }
}

deleted();
