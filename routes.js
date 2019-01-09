import express from 'express';
import fetchTweets from './lib/fetchTweets';

const router = express.Router();

router.get('/', (req, res) => {
  const makeschoolUrl = 'http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=makeschool';
  const newsycombinatorUrl = 'http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=newsycombinator';
  const ycombinatorUrl = 'http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=ycombinator';
  const urls = [makeschoolUrl, newsycombinatorUrl, ycombinatorUrl];

  return fetchTweets(urls, res);
});


export default router;
