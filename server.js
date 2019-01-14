import path from 'path';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import twitterProxyServer from 'twitter-proxy';
import exphbs from 'express-handlebars';
import cors from 'cors';
import {} from 'dotenv/config';
import config from './config';
import router from './routes';

twitterProxyServer(config);

const app = express();
const port = process.env.PORT || '8000';
const hbs = exphbs.create({
  defaultLayout: 'main'
});

app.use(express.static(path.join(__dirname, '/public')));
app.use(logger("combined"));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
app.listen(port);

export default app;
