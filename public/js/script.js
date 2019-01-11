const defaultSetting = {
    position: {
      left: localStorage.getItem('left_position'),
      center: localStorage.getItem('center_position'),
      right: localStorage.getItem('right_position')
    },
    backgroundColor: localStorage.getItem('background_colour'),
    numberOfTweets: localStorage.getItem('number_of_tweets'),
    date: localStorage.getItem('date')
  };

const addSetting = () => {
    let position = document.getElementById('columnOrder').value;
    let numberOfTweets = document.getElementById('numberOfTweets').value;
    let backgroundColor = document.getElementById('backgroundColour').value;
    let date = document.getElementById('date').value;
    
    if(position === 'choose . . .'){ 
        position = 'makeschool newsycombinator ycombinator'
    }
    if(numberOfTweets === 'choose . . .'){ numberOfTweets = '30'}
    if(backgroundColor === 'choose . . .'){ backgroundColor = 'Default'}
    if(date === 'choose . . .'){ date = ''}

    const splitPosition = position.split(" ");
    const left = splitPosition[0]
    const center = splitPosition[1]
    const right = splitPosition[2]

    localStorage.setItem('left_position', left)
    localStorage.setItem('center_position', center)
    localStorage.setItem('right_position', right)
    localStorage.setItem('background_colour', backgroundColor)
    localStorage.setItem('number_of_tweets', numberOfTweets);
    localStorage.setItem('date', date)

    console.log(defaultSetting);

}

console.log(defaultSetting);