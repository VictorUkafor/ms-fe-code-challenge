import axios from 'axios';
import { trimDate, urls } from './lib';

export const fetchTweets = async (req, res) => {
  const allUrls = urls(30);
  try {
    const tweets = {};
    const responses = await Promise.all(allUrls.map(async (url) => {
      const data = await axios.get(url);
      return data;
    }));

    responses.map((response) => {
      tweets[response.data[0].user.screen_name] = response.data;
      return tweets;
    });

    return res.render('home', {
      tweets,
      helpers: { trimDate }
    });
  } catch (error) {
    return res.render('home', { error: 'Server error' });
  }
};
