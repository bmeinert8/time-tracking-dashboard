let activityData;

function fetchData() {
  return fetch('./data.json')
    .then((response) => {
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    
      return response.json();
    })
    .catch((error) => {
    console.error('Error fetching data:', error)
    }); 
}

fetchData().then((data) => {
  activityData = data;
  console.log(activityData);
  updateCards('weekly');
});

function updateCards(timeframe) {
  if (!activityData) {
    console.error('No activity data available');
    return;
  }
  
  //Mapping for previous timefram prefixes
  const timeFrameMap = {
    daily: 'Yesterday',
    weekly: 'Last Week',
    monthly: 'Last Month'
  };

  activityData.forEach((activity) => {
    //get the title from the data
    const activityTitle = activity.title;

    //normalize the title to match data-activity attribute
    const normalizedTitle = activityTitle.toLowerCase().replace(/\s+/g, '-');

    //find the matching card using data-activity
    const card = document.querySelector(`[data-activity="${normalizedTitle}"`);

    if (!card) {
      console.error(`Card not found for activity: ${activityTitle}`);
      return;
    }

    //select the current and previous elements
    const currentElement = card.querySelector('.js-current');
    const previousElement = card.querySelector('.js-previous');

    //Get the current and previous values for the timeframe
    const currentHours = activity.timeframes[timeframe].current;
    const previousHours = activity.timeframes[timeframe].previous;

    //gereate the time on cards
    currentElement.textContent = `${currentHours}hrs`;
    previousElement.textContent = `${timeFrameMap[timeframe]} – ${previousHours}hrs`;
  })
}


