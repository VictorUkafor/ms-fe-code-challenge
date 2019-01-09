import { LocalStorage } from 'node-localstorage';
import {} from 'dotenv/config';

const localStorage = new LocalStorage('./scratch');

export const trimDate = (date) => {
  const formatedDate = date.substring(0, 11);
  return formatedDate;
};

export const getColumn = (tweets, position) => {
  return tweets[position];
}

export const urls = (count) => {
  const makeschoolUrl = `http://localhost:${process.env.TWITTER_PORT}/1.1/statuses/user_timeline.json?count=${count}&screen_name=makeschool`;
  const newsycombinatorUrl = `http://localhost:${process.env.TWITTER_PORT}/1.1/statuses/user_timeline.json?count=${count}&screen_name=newsycombinator`;
  const ycombinatorUrl = `http://localhost:${process.env.TWITTER_PORT}/1.1/statuses/user_timeline.json?count=${count}&screen_name=ycombinator`;

  return [makeschoolUrl, newsycombinatorUrl, ycombinatorUrl];
};

export const defaultSetting = {
  position: {
    left: 'MakeSchool',
    center: 'newsycombinator',
    right: 'ycombinator'
  },
  backgroundColor: 'blue',
  numberOfTweets: 30,
  date: ''
};


export const layoutSetting = () => {
  if (localStorage.getItem('layout_setting')) {
    const setting = localStorage.getItem('layout_setting');
    return setting;
  }
  return defaultSetting;
};
