import { LocalStorage } from 'node-localstorage';
import axios from 'axios';
import {
  trimDate, urls, layoutSetting, defaultSetting, getColumn
} from './lib';

const localStorage = new LocalStorage('./scratch');

export const fetchTweets = async (req, res) => {
  try {
    const {
      position, numberOfTweets, date, backgroundColor
    } = layoutSetting();
    const { left, center, right } = position;
    const allUrls = urls(numberOfTweets);
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
      left,
      center,
      right,
      numberOfTweets,
      backgroundColor,
      date,
      helpers: { trimDate, getColumn }
    });
  } catch (error) {
    return res.render('home', { error: 'Server error' });
  }
};


export const showSetting = (req, res) => {
  let setting = {}
  if (localStorage.getItem('layout_setting')) {
    setting = localStorage.getItem('layout_setting');
  }
  setting = defaultSetting;

  return res.render('layout_setting', { setting });
}