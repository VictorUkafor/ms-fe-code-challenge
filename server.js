import express from 'express';
import bodyParser from 'body-parser';
import twitterProxyServer from 'twitter-proxy';
import exphbs from 'express-handlebars';
import cors from 'cors';
import {} from 'dotenv/config';
import config from './config';

const router = require('./routes');

const app = express();
const port = process.env.PORT;

twitterProxyServer(config);

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

app.listen(port);

export default app;
