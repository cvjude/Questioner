import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/', router);

app.all('*', (req, res) => {
	return res.status(404).json({
          status: 404,
          error: 'Page not found',
        });
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`app is listening on ${port}!`);
});

export default app;
