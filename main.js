let activityData;

function fetchData() {
  return fetch('./data.json')
    .then((response) => {
      if (!response.ok) throw new Error('Error: Failed to fetch data');
    
      return response.json();
    })
    .catch((error) => {
    console.error('Error fetching data:', error)
    }); 
}

fetchData().then((data) => {
  activityData = data;
  
  console.log(activityData);
});
