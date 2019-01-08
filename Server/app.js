import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/', router);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`app is listening on ${port}!`);
});
