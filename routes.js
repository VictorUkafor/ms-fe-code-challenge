import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  const makeschoolUrl = 'http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=makeschool';
  const newsycombinatorUrl = 'http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=newsycombinator';
  const ycombinatorUrl = 'http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=ycombinator';

  try {
    const makeschoolRes = await axios.get(makeschoolUrl);
    const newsycombinatorRes = await axios.get(newsycombinatorUrl);
    const ycombinatorRes = await axios.get(ycombinatorUrl);
    const responses = [makeschoolRes, newsycombinatorRes, ycombinatorRes];
    const tweets = {};

    responses.map(async (res) => {
      tweets[res.data[0].user.screen_name] = res.data;
    });

    return res.render('test', { tweets });
  } catch (error) {
    return res.render('test', { error: 'Server error' });
  }
});


module.exports = router;
