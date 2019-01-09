import express from 'express';
import { fetchTweets, showSetting } from './controller';

const router = express.Router();

router.get('/', fetchTweets);
router.get('/settings', showSetting);


export default router;
