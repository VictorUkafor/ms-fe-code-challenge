import express from 'express';
import {
  fetchTweets, showSetting, setSetting, processForm
} from './controller';

const router = express.Router();

router.get('/', fetchTweets);
router.get('/settings', showSetting);
router.get('/edit-settings', setSetting);

router.post('/add-settings', processForm);

export default router;
