import { LocalStorage } from 'node-localstorage';
import axios from 'axios';
import {
  trimDate, urls, defaultSetting, getColumn
} from './lib';

const localStorage = new LocalStorage('./scratch');

export const fetchTweets = async (req, res) => {
  try {
    const {
      position, numberOfTweets, date, backgroundColor
    } = defaultSetting;
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


export const showSetting = (req, res) => res.render('layout_setting', { setting: defaultSetting });

export const setSetting = (req, res) => res.render('edit_setting');

export const processForm = async (req, res) => {
  try {
    let {
      columnOrder, numberOfTweets, backgroundColor, date
    } = res.body;

    if (columnOrder === 'choose . . .') {
      columnOrder = 'makeschool newsycombinator ycombinator';
    }
    if (numberOfTweets === 'choose . . .') { numberOfTweets = '30'; }
    if (backgroundColor === 'choose . . .') { backgroundColor = 'Default'; }
    if (date === 'choose . . .') { date = ''; }

    const position = columnOrder.split(' ');
    const left = position[0];
    const center = position[1];
    const right = position[2];

    localStorage.setItem('left_position', left);
    localStorage.setItem('center_position', center);
    localStorage.setItem('right_position', right);
    localStorage.setItem('background_colour', backgroundColor);
    localStorage.setItem('number_of_tweets', numberOfTweets);
    localStorage.setItem('date', date);

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
