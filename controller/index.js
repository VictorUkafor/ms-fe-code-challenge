import { LocalStorage } from 'node-localstorage';
import axios from 'axios';
import {
  trimDate, urls, getColumn
} from '../lib';

const localStorage = new LocalStorage('./scratch');


// This method fetches tweets from Twitter API and
// displays them on the page
export const fetchTweets = async (req, res) => {
  try {
    // get settings values from the localStorage
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

    // values for meta tags
    res.locals.metaTags = {
      title: 'Home',
      description: "You're welcome",
      keywords: 'Twitter, API',
    };

    res.render('home', {
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
    res.render('home', { error: 'Server error' });
  }
};

// displays settings page
export const showSetting = (req, res) => {
  // get settings values from the localStorage
  const left = localStorage.getItem('left_position') || 'MakeSchool';
  const center = localStorage.getItem('center_position') || 'newsycombinator';
  const right = localStorage.getItem('right_position') || 'ycombinator';
  const backgroundColour = localStorage.getItem('background_colour') || 'Default';
  const numberOfTweets = localStorage.getItem('number_of_tweets') || 30;
  const date = localStorage.getItem('date') || '';

  // values for meta tags
  res.locals.metaTags = {
    title: 'Settings',
    description: 'Settings Page',
    keywords: 'Twitter, API',
  };

  res.render('layout_setting', {
    left,
    center,
    right,
    numberOfTweets,
    backgroundColour,
    date,
  });
};

// displays the edit settings page
export const setSetting = (req, res) => {
      // values for meta tags
      res.locals.metaTags = {
        title: 'Update Settings',
        description: "Update Settings",
        keywords: 'Twitter, API',
      };
      
      res.render('edit_setting');
}


// processes the edit settings page
export const processForm = (req, res) => {
  // get values from settings form
  let {
    columnOrder, numberOfTweets, backgroundColour, date
  } = req.body;

  // validates form
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

  // saves settings values to localstorage
  localStorage.setItem('left_position', left);
  localStorage.setItem('center_position', center);
  localStorage.setItem('right_position', right);
  localStorage.setItem('background_colour', backgroundColour);
  localStorage.setItem('number_of_tweets', numberOfTweets);
  localStorage.setItem('date', date);

  res.redirect('/');
};
