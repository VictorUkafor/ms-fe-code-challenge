import {} from 'dotenv/config';

export const trimDate = (date) => {
  const formatedDate = date.substring(0, 11);
  return formatedDate;
};

export const urls = (count) => {
  const makeschoolUrl = `http://localhost:${process.env.TWITTER_PORT}/1.1/statuses/user_timeline.json?count=${count}&screen_name=makeschool`;
  const newsycombinatorUrl = `http://localhost:${process.env.TWITTER_PORT}/1.1/statuses/user_timeline.json?count=${count}&screen_name=newsycombinator`;
  const ycombinatorUrl = `http://localhost:${process.env.TWITTER_PORT}/1.1/statuses/user_timeline.json?count=${count}&screen_name=ycombinator`;

  return [makeschoolUrl, newsycombinatorUrl, ycombinatorUrl];
};
