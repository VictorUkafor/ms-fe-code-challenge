import {} from 'dotenv/config';

const config = {
  consumerKey: process.env.TWITTER_API_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_API_CONSUMER_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  port: process.env.TWITTER_PORT
}

export default config;