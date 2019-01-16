import pool from '../config/config';

const dropMeetupTable = 'DROP TABLE meetups';
const dropQuestionTable = 'DROP TABLE questions';
const dropRsvpTable = 'DROP TABLE votes';
const dropVoteTable = 'DROP TABLE rsvp';
const dropUsers = 'DROP TABLE users';

async function deletemeetup() {
  try {
    await pool.query(dropMeetupTable);
    console.log('Tables successfully deleted');
  } catch (error) {
    console.log('meetup doesn\'t exist');
  }
}

async function deletequestion() {
  try {
    await pool.query(dropQuestionTable);
    console.log('Tables successfully deleted');
  } catch (error) {
    console.log('question doesn\'t exist');
  }
}

async function deletersvp() {
  try {
    await pool.query(dropRsvpTable);
    console.log('Tables successfully deleted');
  } catch (error) {
    console.log('rsvp doesn\'t exist');
  }
}

async function deletevote() {
  try {
    await pool.query(dropVoteTable);
    console.log('Tables successfully deleted');
  } catch (error) {
    console.log('vote doesn\'t exist');
  }
}

async function deleteuser() {
  try {
    await pool.query(dropUsers);
    console.log('Tables successfully deleted');
  } catch (error) {
    console.log('user doesn\'t exist');
  }
}

deletemeetup();
deletequestion();
deletevote();
deletersvp();
deleteuser();
