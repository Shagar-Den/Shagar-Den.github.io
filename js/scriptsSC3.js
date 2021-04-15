var quoteOfTheDay = document.getElementById('quote');
var quoterOfTheDay = document.getElementById('quoter');

fetch("https://api.fisenko.net/quotes?l=en", {
	//method : 'GET',
	headers: {"Referrer Policy": "strict-origin-when-cross-origin"}//"Access-Control-Allow-Origin": "*"}
})
  .then(response => {console.log(response),response.json()})
  .then(response => {quoteOfTheDay.textContent = ' ' + response.text + ' - ', quoterOfTheDay.textContent = ' ' + response.author})
  .catch((err) => {
    console.log('Error: ' + err);
  });

/*
//WORKS
//fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
fetch('https://api.taylor.rest/')
  .then(response => response.json())
  .then(response => {quoteOfTheDay.textContent = ' ' + response.quote + ' - ', quoterOfTheDay.textContent = ' ' + response.author});
  */
