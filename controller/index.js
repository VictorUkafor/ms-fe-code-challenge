import { LocalStorage } from 'node-localstorage';
import axios from 'axios';
import {
  trimDate, urls, getColumn
} from '../lib';

const localStorage = new LocalStorage('./scratch');

export const fetchTweets = async (req, res) => {
  try {
    const left = localStorage.getItem('left_position') || 'MakeSchool';
    const center = localStorage.getItem('center_position') || 'newsycombinator';
    const right = localStorage.getItem('right_position') || 'ycombinator';
    const backgroundColour = localStorage.getItem('background_colour') || 'Default';
    const numberOfTweets = localStorage.getItem('number_of_tweets') || 30;
    const date = localStorage.getItem('date') || '';

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

    res.locals.metaTags = {
      title: 'Home',
      description: "You're welcome",
      keywords: 'Twitter, API',
    };

    return res.render('home', {
      tweets,
      left,
      center,
      right,
      numberOfTweets,
      backgroundColour,
      date,
      helpers: { trimDate, getColumn }
    });
  } catch (error) {
    return res.render('home', { error: 'Server error' });
  }
};


export const showSetting = (req, res) => {
  const left = localStorage.getItem('left_position') || 'MakeSchool';
  const center = localStorage.getItem('center_position') || 'newsycombinator';
  const right = localStorage.getItem('right_position') || 'ycombinator';
  const backgroundColour = localStorage.getItem('background_colour') || 'Default';
  const numberOfTweets = localStorage.getItem('number_of_tweets') || 30;
  const date = localStorage.getItem('date') || '';

  res.render('layout_setting', {
    left,
    center,
    right,
    numberOfTweets,
    backgroundColour,
    date,
  });
};

export const setSetting = (req, res) => res.render('edit_setting');

export const processForm = (req, res) => {
  let {
    columnOrder, numberOfTweets, backgroundColour, date
  } = req.body;

  if (columnOrder === 'choose . . .') {
    columnOrder = 'makeschool newsycombinator ycombinator';
  }
  if (numberOfTweets === 'choose . . .') { numberOfTweets = '30'; }
  if (backgroundColour === 'choose . . .') { backgroundColour = 'Default'; }
  if (date === 'choose . . .') { date = ''; }

  const position = columnOrder.split(' ');
  const left = position[0];
  const center = position[1];
  const right = position[2];

  localStorage.setItem('left_position', left);
  localStorage.setItem('center_position', center);
  localStorage.setItem('right_position', right);
  localStorage.setItem('background_colour', backgroundColour);
  localStorage.setItem('number_of_tweets', numberOfTweets);
  localStorage.setItem('date', date);

  res.redirect('/');
};
