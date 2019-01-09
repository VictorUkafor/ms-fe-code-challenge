import axios from 'axios';

const trimDate = (date) => {
  const formatedDate = date.substring(0, 11);
  return formatedDate;
};

const trimText = (text) => {
  let formatedText = text.substring(0, 110);
  formatedText += ' . . .';
  return formatedText;
};

const fetchTweets = async (urls, res) => {
  try {
    const tweets = {};
    const responses = await Promise.all(urls.map(async (url) => {
      const data = await axios.get(url);
      return data;
    }));

    responses.map((response) => {
      tweets[response.data[0].user.screen_name] = response.data;
      return tweets;
    });

    return res.render('home', {
      tweets,
      helpers: { trimDate, trimText }
    });
  } catch (error) {
    return res.render('home', { error: 'Server error' });
  }
};

export default fetchTweets;
