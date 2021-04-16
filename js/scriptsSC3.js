

//-----------------------API used for the footer:-----------------------
var quoteOfTheDay = document.getElementById('quote');
var quoterOfTheDay = document.getElementById('quoter');
var allQuotes;
var myHeadersForQuote = new Headers();
var myInit = { method: 'GET',
               headers: myHeadersForQuote,
               mode: 'cors',
               cache: 'default' };




  fetch("https://type.fit/api/quotes",myInit)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    allQuotes = data;
    var nb = Math.floor(Math.random() * data.length);
    quoteOfTheDay.textContent = ' ' + data[nb].text, quoterOfTheDay.textContent = data[nb].author;
  });

// Add an update of the quote when losing focus of the page
window.addEventListener("blur", function(event)
{ 
  var nb = Math.floor(Math.random() * allQuotes.length);
  quoteOfTheDay.textContent = ' ' + allQuotes[nb].text, quoterOfTheDay.textContent = allQuotes[nb].author;
}, false);

//----------------------------------------------------------------------

//-----------------------API used for the footer:-----------------------
var apiAnswer1 = document.getElementById('firstapiAnswr');
document.getElementById("firstapiBtn").addEventListener("click", function() {
  fetch("https://www.boredapi.com/api/activity/")
  .then(response => response.json())
  .then(response => {apiAnswer1.textContent = response.activity});
  
  
});
//----------------------------------------------------------------------

//-----------------------API used for the footer:-----------------------
var apiAnswer2 = document.getElementById('foodImg');
fetch("https://foodish-api.herokuapp.com/api/")
  .then(response => response.json())
  .then(response => {apiAnswer2.setAttribute("src", response.image)});

//----------------------------------------------------------------------





  //-----------------------API used for the footer:-----------------------
  
var nameInput = document.querySelector('input');
var form = document.querySelector('form')[0];
var btnNameAPI = document.getElementById('nameAPIBtn');
nameInput.addEventListener('input', () => {
  nameInput.setCustomValidity('');
  nameInput.checkValidity();
});

nameInput.addEventListener('invalid', () => {
  if(nameInput.value === '') {
    nameInput.setCustomValidity("Please write a name !");
  } else {
    nameInput.setCustomValidity("A name can only contain lowercases and uppercases, please try again");
  }
});

function actionFromForm(){
  var link = "https://api.agify.io?name=" + nameInput.value;
  document.getElementById('nameAPIAnswr').classList.remove('off');
  btnNameAPI.classList.remove('off');
  nameInput.classList.add('off');
  fetch(link)
  .then(response => response.json())
  .then(response => {
    if(response.age == null){
      document.getElementById('nameAPIAnswr').textContent = response.name + " does not seem to have an age... yet ?";
    }
    else{
      document.getElementById('nameAPIAnswr').textContent = "The average age of " + response.name + " is " + response.age + " years old."
    }
  })
  .catch((err) => {
    document.getElementById('nameAPIAnswr').textContent = "Sorry, an error occured !";
    console.log('Error: ' + err);
  });
}


document.getElementById("nameAPIBtn").addEventListener("click", function() {
  document.getElementById('nameAPIAnswr').classList.add('off');
  btnNameAPI.classList.add('off');
  nameInput.classList.remove('off');
});

//----------------------------------------------------------------------
