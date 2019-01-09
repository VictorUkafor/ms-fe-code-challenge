import express from 'express';
import { fetchTweets } from './controller';

const router = express.Router();

router.get('/', fetchTweets);


export default router;
