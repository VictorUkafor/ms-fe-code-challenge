'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urls = exports.getColumn = exports.trimDate = undefined;

require('dotenv/config');

var _twitter = require('twitter');

var _twitter2 = _interopRequireDefault(_twitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// formates created_at date of tweets
var trimDate = exports.trimDate = function trimDate(date) {
  var formatedDate = date.substring(0, 11);
  return formatedDate;
};

// gets tweet of a user
var getColumn = exports.getColumn = function getColumn(tweets, position) {
  return tweets[position];
};

// urls to get fetch tweets from twitter
var urls = exports.urls = function urls(count) {
  var makeschoolUrl = 'http://localhost:' + process.env.TWITTER_PORT + '/1.1/statuses/user_timeline.json?count=' + count + '&screen_name=makeschool';
  var newsycombinatorUrl = 'http://localhost:' + process.env.TWITTER_PORT + '/1.1/statuses/user_timeline.json?count=' + count + '&screen_name=newsycombinator';
  var ycombinatorUrl = 'http://localhost:' + process.env.TWITTER_PORT + '/1.1/statuses/user_timeline.json?count=' + count + '&screen_name=ycombinator';

  return [makeschoolUrl, newsycombinatorUrl, ycombinatorUrl];
};
//# sourceMappingURL=index.js.map