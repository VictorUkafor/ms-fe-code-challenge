import {} from 'dotenv/config';
import { LocalStorage } from 'node-localstorage';

const localStorage = new LocalStorage('./scratch');

// formates created_at date of tweets
export const trimDate = (date) => {
  const formatedDate = date.substring(0, 11);
  return formatedDate;
};

// gets tweet of a user
export const getColumn = (tweets, position) => tweets[position];

// urls to get fetch tweets from twitter
export const urls = (count) => {
  const makeschoolUrl = `http://localhost:${process.env.TWITTER_PORT}/1.1/statuses/user_timeline.json?count=${count}&screen_name=makeschool`;
  const newsycombinatorUrl = `http://localhost:${process.env.TWITTER_PORT}/1.1/statuses/user_timeline.json?count=${count}&screen_name=newsycombinator`;
  const ycombinatorUrl = `http://localhost:${process.env.TWITTER_PORT}/1.1/statuses/user_timeline.json?count=${count}&screen_name=ycombinator`;

  return [makeschoolUrl, newsycombinatorUrl, ycombinatorUrl];
};

// changing the colour palette of the app
export const skinColour = () => {
  if (localStorage.getItem('background_colour') === 'Default'
   || localStorage.getItem('background_colour') === null
   || localStorage.getItem('background_colour') === undefined) {
    return '#e44d3a';
  }
  return (localStorage.getItem('background_colour')).toLowerCase();
};

// configuration for twitter-proxy
export const config = {
  consumerKey: process.env.TWITTER_API_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_API_CONSUMER_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  port: process.env.TWITTER_PORT
};
