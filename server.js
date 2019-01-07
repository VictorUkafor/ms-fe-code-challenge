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

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);



app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`));

export default app;

// var spawn = require('child_process').exec;

// spawn('twitter-proxy');
// spawn('http-server');
// spawn('express');

// const app = express();

// app.use(cors());
 

// console.log('Server running on http://localhost:8080');
// console.log('Request the Twitter API using: http://localhost:7890/1.1/statuses/user_timeline.json\?count\=30\&screen_name\=makeschool');


