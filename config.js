'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('dotenv/config');

var config = {
  consumerKey: process.env.TWITTER_API_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_API_CONSUMER_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  port: process.env.TWITTER_PORT
};

exports.default = config;
//# sourceMappingURL=config.js.map