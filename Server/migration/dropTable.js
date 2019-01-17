import pool from '../config/config';

const dropMeetupTable = 'DROP TABLE meetups';
const dropQuestionTable = 'DROP TABLE questions';
const dropRsvpTable = 'DROP TABLE votes';
const dropVoteTable = 'DROP TABLE rsvp';
const dropUsers = 'DROP TABLE users';
const dropComments = 'DROP TABLE comments';
const dropTags = 'DROP TABLE tags';
const dropImages = 'DROP TABLE images';

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

async function deleteComment() {
  try {
    await pool.query(dropComments);
    console.log('Tables successfully deleted');
  } catch (error) {
    console.log('comment doesn\'t exist');
  }
}

async function deleteTag() {
  try {
    await pool.query(dropTags);
    console.log('Tables successfully deleted');
  } catch (error) {
    console.log('tag doesn\'t exist');
  }
}

async function deleteImage() {
  try {
    await pool.query(dropImages);
    console.log('Tables successfully deleted');
  } catch (error) {
    console.log('image doesn\'t exist');
  }
}
deletemeetup();
deletequestion();
deletevote();
deletersvp();
deleteuser();
deleteComment();
deleteTag();
deleteImage();