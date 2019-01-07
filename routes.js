import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', (req, res) => {
    const processtest = () => {
        const url = 'http://localhost:7890/1.1/statuses/user_timeline.json?count=1&screen_name=makeschool';
    
        axios.get(url)
          .then((response) => {
            console.log(response.data);
              return 'response'      
          })
          .catch((error) => {
            return error.response;
          });
            }; 

 res.render('test', { tweet: processtest() });   
});


module.exports = router;