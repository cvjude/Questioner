const prodUrl = '';

// const devUrl = 'localhost:5001';
const devUrl = 'https://questioner-postgres.herokuapp.com/';
const api = 'api/v1/';

const baseApiRoute = devUrl + api;

//api
let loginURL = baseApiRoute + 'auth/login';
let signUpURL = baseApiRoute + 'auth/signup';