'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controller = require('../controller');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// route for the index tweets page
router.get('/', _controller.fetchTweets);

// route for the settings page
router.get('/settings', _controller.showSetting);

// route for the update settings page
router.get('/edit-settings', _controller.setSetting);

// route for the processing form for
// updating settings
router.post('/add-settings', _controller.processForm);

exports.default = router;
//# sourceMappingURL=index.js.map