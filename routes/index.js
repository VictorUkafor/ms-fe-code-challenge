import express from 'express';
import {
  fetchTweets, showSetting, setSetting, processForm
} from '../controller';

const router = express.Router();

// route for the index tweets page
router.get('/', fetchTweets);

// route for the settings page
router.get('/settings', showSetting);

// route for the update settings page
router.get('/edit-settings', setSetting);

// route for the processing form for
// updating settings
router.post('/add-settings', processForm);

export default router;
