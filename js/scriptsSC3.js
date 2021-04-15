var quoteOfTheDay = document.getElementById('quote');
var quoterOfTheDay = document.getElementById('quoter');
var apiAnswer1 = document.getElementById('firstapiAnswr');
var apiAnswer2 = document.getElementById('foodImg');
var allQuotes;


var myHeadersForQuote = new Headers();
//myHeadersForQuote.append("Access-Control-Allow-Origin", "*");
/*myHeadersForQuote.append("content-type",	"application/json; charset=utf-8");*/
var myInit = { method: 'GET',
               headers: myHeadersForQuote,
               mode: 'cors',
               cache: 'default' };




//FORBIDDEN ERROR or CORS ERROR ...
/*
fetch("https://cors-anywhere.herokuapp.com/https://api.fisenko.net/quotes?l=en",myInit)
  .then(response => response.json())
  .then(response => {quoteOfTheDay.textContent = ' ' + response.text + ' - ', quoterOfTheDay.textContent = ' ' + response.author})
  .catch((err) => {
    console.log('Error: ' + err);
  });
*/

/*
fetch('https://zenquotes.io/api/quotes',myInit)
  .then(response => response.json())
  .then(response => {quoteOfTheDay.textContent = ' ' + response.q + ' - ', quoterOfTheDay.textContent = ' ' + response.a});
  */






//WORKS
/*
//fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
fetch('https://api.taylor.rest/',myInit)
  .then(response => response.json())
  .then(response => {quoteOfTheDay.textContent = ' ' + response.quote + ' - ', quoterOfTheDay.textContent = ' ' + response.author});
  */

  fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    allQuotes = data;
    var nb = Math.floor(Math.random() * data.length);
    quoteOfTheDay.textContent = ' ' + data[nb].text, quoterOfTheDay.textContent = data[nb].author;
  });

// Blur event, opposed to focus (stop update when window not focused)
window.addEventListener("blur", function(event)
{ 
  var nb = Math.floor(Math.random() * allQuotes.length);
  quoteOfTheDay.textContent = ' ' + allQuotes[nb].text, quoterOfTheDay.textContent = allQuotes[nb].author;
}, false);


document.getElementById("firstapiBtn").addEventListener("click", function() {
  fetch("https://www.boredapi.com/api/activity/")
  .then(response => response.json())
  .then(response => {apiAnswer1.textContent = response.activity});
  
  
});

fetch("https://foodish-api.herokuapp.com/api/")
  .then(response => response.json())
  .then(response => {apiAnswer2.setAttribute("src", response.image)});

window.addEventListener("focus", function(event)
{
  fetch("https://foodish-api.herokuapp.com/api/")
  .then(response => response.json())
  .then(response => {apiAnswer2.setAttribute("src", response.image)});
}, false);



function search(ele) {
    if(event.keyCode === 13) {
        alert(ele.value);        
    }
}


