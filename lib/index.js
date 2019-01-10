import { LocalStorage } from 'node-localstorage';
import {} from 'dotenv/config';

const localStorage = new LocalStorage('./scratch');

export const trimDate = (date) => {
  const formatedDate = date.substring(0, 11);
  return formatedDate;
};

export const getColumn = (tweets, position) => tweets[position];

export const urls = (count) => {
  const makeschoolUrl = `http://localhost:${process.env.TWITTER_PORT}/1.1/statuses/user_timeline.json?count=${count}&screen_name=makeschool`;
  const newsycombinatorUrl = `http://localhost:${process.env.TWITTER_PORT}/1.1/statuses/user_timeline.json?count=${count}&screen_name=newsycombinator`;
  const ycombinatorUrl = `http://localhost:${process.env.TWITTER_PORT}/1.1/statuses/user_timeline.json?count=${count}&screen_name=ycombinator`;

  return [makeschoolUrl, newsycombinatorUrl, ycombinatorUrl];
};


export const defaultSetting = {
  position: {
    left: localStorage.getItem('left_position') || 'MakeSchool',
    center: localStorage.getItem('center_position') || 'newsycombinator',
    right: localStorage.getItem('right_position') || 'ycombinator'
  },
  backgroundColor: localStorage.getItem('background_colour') || 'blue',
  numberOfTweets: localStorage.getItem('number_of_tweets') || 30,
  date: localStorage.getItem('date') || ''
};
