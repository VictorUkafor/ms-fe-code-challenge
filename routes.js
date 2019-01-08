import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  const makeschoolUrl = 'http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=makeschool';
  const newsycombinatorUrl = 'http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=newsycombinator';
  const ycombinatorUrl = 'http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=ycombinator';
  const tweets = {}

  try{
    const makeschoolRes = await axios.get(makeschoolUrl);
    const newsycombinatorRes = await axios.get(newsycombinatorUrl);
    const ycombinatorRes = await axios.get(ycombinatorUrl);

    tweets[makeschoolRes.data[0].user.screen_name] = makeschoolRes.data
    tweets[newsycombinatorRes.data[0].user.screen_name] = newsycombinatorRes.data
    tweets[ycombinatorRes.data[0].user.screen_name] = ycombinatorRes.data

    return res.render('test', {tweets});
  } catch(error){
    console.log(error)
  }  
});


module.exports = router;