import {} from 'dotenv/config';
import Twitter from 'twitter';

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
