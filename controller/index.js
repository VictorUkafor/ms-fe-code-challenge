'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processForm = exports.setSetting = exports.showSetting = exports.fetchTweets = undefined;

var _nodeLocalstorage = require('node-localstorage');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _lib = require('../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var localStorage = new _nodeLocalstorage.LocalStorage('./scratch');

// This method fetches tweets from Twitter API and
// displays them on the page
var fetchTweets = exports.fetchTweets = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var left, center, right, backgroundColour, numberOfTweets, date, allUrls, tweets, responses;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            // get settings values from the localStorage
            left = localStorage.getItem('left_position') || 'MakeSchool';
            center = localStorage.getItem('center_position') || 'newsycombinator';
            right = localStorage.getItem('right_position') || 'ycombinator';
            backgroundColour = localStorage.getItem('background_colour') || 'Default';
            numberOfTweets = localStorage.getItem('number_of_tweets') || 30;
            date = localStorage.getItem('date') || '';
            allUrls = (0, _lib.urls)(numberOfTweets);
            tweets = {};
            _context2.next = 11;
            return Promise.all(allUrls.map(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var data;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _axios2.default.get(url);

                      case 2:
                        data = _context.sent;
                        return _context.abrupt('return', data);

                      case 4:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 11:
            responses = _context2.sent;


            responses.map(function (response) {
              tweets[response.data[0].user.screen_name] = response.data;
              return tweets;
            });

            // values for meta tags
            res.locals.metaTags = {
              title: 'Home',
              description: "You're welcome",
              keywords: 'Twitter, API'
            };

            res.render('home', {
              tweets: tweets,
              left: left,
              center: center,
              right: right,
              numberOfTweets: numberOfTweets,
              backgroundColour: backgroundColour,
              date: date,
              helpers: { trimDate: _lib.trimDate, getColumn: _lib.getColumn }
            });
            _context2.next = 20;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2['catch'](0);

            res.render('home', { error: 'Server error' });

          case 20:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 17]]);
  }));

  return function fetchTweets(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// displays settings page
var showSetting = exports.showSetting = function showSetting(req, res) {
  // get settings values from the localStorage
  var left = localStorage.getItem('left_position') || 'MakeSchool';
  var center = localStorage.getItem('center_position') || 'newsycombinator';
  var right = localStorage.getItem('right_position') || 'ycombinator';
  var backgroundColour = localStorage.getItem('background_colour') || 'Default';
  var numberOfTweets = localStorage.getItem('number_of_tweets') || 30;
  var date = localStorage.getItem('date') || '';

  // values for meta tags
  res.locals.metaTags = {
    title: 'Settings',
    description: 'Settings Page',
    keywords: 'Twitter, API'
  };

  res.render('layout_setting', {
    left: left,
    center: center,
    right: right,
    numberOfTweets: numberOfTweets,
    backgroundColour: backgroundColour,
    date: date
  });
};

// displays the edit settings page
var setSetting = exports.setSetting = function setSetting(req, res) {
  // values for meta tags
  res.locals.metaTags = {
    title: 'Update Settings',
    description: 'Update Settings',
    keywords: 'Twitter, API'
  };

  res.render('edit_setting');
};

// processes the edit settings page
var processForm = exports.processForm = function processForm(req, res) {
  // get values from settings form
  var _req$body = req.body,
      columnOrder = _req$body.columnOrder,
      numberOfTweets = _req$body.numberOfTweets,
      backgroundColour = _req$body.backgroundColour,
      date = _req$body.date;

  // validates form

  if (columnOrder === 'choose . . .') {
    columnOrder = 'makeschool newsycombinator ycombinator';
  }
  if (numberOfTweets === 'choose . . .') {
    numberOfTweets = '30';
  }
  if (backgroundColour === 'choose . . .') {
    backgroundColour = 'Default';
  }
  if (date === 'choose . . .') {
    date = '';
  }

  var position = columnOrder.split(' ');
  var left = position[0];
  var center = position[1];
  var right = position[2];

  // saves settings values to localstorage
  localStorage.setItem('left_position', left);
  localStorage.setItem('center_position', center);
  localStorage.setItem('right_position', right);
  localStorage.setItem('background_colour', backgroundColour);
  localStorage.setItem('number_of_tweets', numberOfTweets);
  localStorage.setItem('date', date);

  res.redirect('/');
};
//# sourceMappingURL=index.js.map