'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _twitterProxy = require('twitter-proxy');

var _twitterProxy2 = _interopRequireDefault(_twitterProxy);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

require('dotenv/config');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _twitterProxy2.default)(_config2.default);

var app = (0, _express2.default)();
var port = process.env.PORT;
var hbs = _expressHandlebars2.default.create({
  defaultLayout: 'main'
});

app.use(_express2.default.static(_path2.default.join(__dirname, '/public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use('/', _routes2.default);
app.listen(port);

exports.default = app;
//# sourceMappingURL=server.js.map