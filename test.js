const processtest= () => {
    const url = 'http://localhost:7890/1.1/statuses/user_timeline.json?count=1&screen_name=makeschool';
  
    const dataForFetch = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
    fetch(url, dataForFetch)
      .then(res => res.json())
      .then((data) => {
          console.log(data)
      })
      .catch((error) => {
        console.log(error);
      });
  
    return false;
  };

  processtest();