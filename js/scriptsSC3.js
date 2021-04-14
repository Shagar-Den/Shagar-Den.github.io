var quoteOfTheDay = document.getElementById('quote');
var quoterOfTheDay = document.getElementById('quoter');

//CORS issue
/*
fetch("https://api.fisenko.net/quotes?l=en")
  .then(response => response.json())
  .then(response => {quoteOfTheDay.textContent = ' ' + response.text + ' - ', quoterOfTheDay.textContent = ' ' + response.author})
  .catch((err) => {
    console.log('Error: ' + err);
  });

*/


//WORKS
fetch('https://api.taylor.rest/')
  .then(response => response.json())
  .then(response => {quoteOfTheDay.textContent = ' ' + response.quote + ' - ', quoterOfTheDay.textContent = ' ' + response.author});
  
