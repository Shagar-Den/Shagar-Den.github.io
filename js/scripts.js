/*!
    * Start Bootstrap - Agency v6.0.0 (https://startbootstrap.com/template-overviews/agency)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-agency/blob/master/LICENSE)
    */
    (function ($) {
    "use strict"; // Start of use strict
	

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 72,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });
	
    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 74,
    });
    
    var hasSeenTrick = true;
    var startHint = false;
    var firstTime = true;

	//this is the bit of code that makes the whole opening and closing text thing work.
	  $('t[data-o]').click(function(e) {

		//this line just stops it visiting the href which is always #
        e.preventDefault();
		
		if($(this).attr('class') == "on"){
			var openedby = $(this).attr('data-o');
			var closedby = $(this).attr('data-c');
			
			$(this).removeClass('on').addClass('off');
			
			if($('[data-ob="' + openedby +'"]').length !== 0){
				$('[data-ob="' + openedby +'"]').removeClass('off').addClass('on');
			}
			if($('[data-obu="' + openedby +'"]').length !== 0){
				$('[data-obu="' + openedby +'"]').removeClass('off').addClass('on');
			}
			if($('[data-obi="' + openedby +'"]').length !== 0){
				$('[data-obi="' + openedby +'"]').removeClass('off').addClass('on');
				$("html, body").animate(
					{
						scrollTop: $('[data-obi="' + openedby +'"]').offset().top - 72,
					},
					1000,
					"easeInOutExpo"
				);
            }
            if($('[id="' +openedby +'-hint"]').length !== 0){
                $('[id="' +openedby +'-hint"]').removeClass('on').addClass('off');
                hasSeenTrick = true;
                startHint = false;
                firstTime = false;
			}
			
			
			if($('[data-cb="' + closedby +'"]').length !== 0){
				$('[data-cb="' + closedby +'"]').remove();
			}
			
			update();
		}
		

      });

    setInterval(function () {
        if (hasSeenTrick==true && firstTime)
            hasSeenTrick=false;
        else if(startHint == false && firstTime)
            startHint=true;
    }, 1000);

    var fadin = false;
    setInterval(function () {
        if (startHint){
            if(firstTime){
                $('#first-hint').removeClass('off').addClass('on');
                firstTime = false;
            }
            if(!fadin){
                fadin = true;
                $("#first-hint").removeClass('fadeout').addClass('fadein');
            }
            else{
                fadin = false;
                $("#first-hint").removeClass('fadein').addClass('fadeout');
            }
        }
            
    }, 5000);


	  
	  //Show everything, for people that do not have time
	  $('.show_all').click(function() {
		$('[data-ob]').removeClass('off').addClass('on');
		$('[data-obi]').removeClass('off').addClass('on');
		cheatOnProgress();
	  });
	  
	  //Hide everything, for people that finally realize it is not a matter of time, but to just enjoy the ride
	  $('.hide_all').click(function() {

		$('[data-ob]').removeClass('on').addClass('off');
		$('[data-obi]').removeClass('on').addClass('off');
		$('t[data-o]').removeClass('off').addClass('on');
		resetProgress();
	  });
	  
	  //The following is to make popup windows when click on projects to see details and download
		
		$(".trigger_popup").click(function(e){
			
			//this line just stops it visiting the href which is always #
			e.preventDefault();
			
			var target = $(this.hash);
			target.show();
		});
		$(".trigger_popup_text").click(function(e){
			
			//this line just stops it visiting the href which is always #
			e.preventDefault();
			
			var target = $(this.hash);
			target.show();
		});
		$('.popup').click(function(e){
            var tar = e.target;
            
			if((tar.className == "popup-header")||(tar.className == "popup-body")||($(tar).parent().prop('className') == "popup-header")||($(tar).parent().prop('className') == "popup-body")) return;
			$('.popup').hide();
		});
		$('.popupCloseButton').click(function(){
			$('.popup').hide();
		});
		
		//The following is to apply the dark mode on click
		$( "spec" ).on("click", function() { 
            if( $( "body" ).hasClass( "dark" )) { 
                $( "body" ).removeClass( "dark" ); 
            } else { 
                $( "body" ).addClass( "dark" ); 
            }
			if( $( ".popup > div" ).hasClass( "dark" )) { 
                $( ".popup > div" ).removeClass( "dark" ); 
            } else { 
                $( ".popup > div" ).addClass( "dark" );  
            }
			if($("#UnityImg").attr('src')=="assets/img/logos/unity-mwu-black.png"){
				$("#UnityImg").attr("src", 'assets/img/logos/unity-mwu-white.png');
			} else{
				$("#UnityImg").attr("src", "assets/img/logos/unity-mwu-black.png");
			}
        });
		
		function update(){
            progressI++;
			if(progressI<=totalDiscover){
				var percentI = progressI/totalDiscover;
				move(Math.round(percentI*100));
			}
            /*if(progressI==2 && !state.FirstStepMedal && !fromCheat){
                state.FirstStepMedal = true;
                save();
            }
            if(progressI==totalDiscover && !state.ExplorerMedal && !fromCheat){
                state.ExplorerMedal = true;
                save();
            }*/
            UpdateAchievements();
		}
		function resetProgress(){
			progressI = 0;
            fromCheat = false;
			update();
		}
		function cheatOnProgress(){
			progressI = totalDiscover-1;
            fromCheat = true;
			update();
		}

        //Erase the local storage when necessary. (Only on debug time !!)
        $('.erase_localstorage').click(function() {
            restart();
          });
	
	
})(jQuery); // End of use strict


function Achievement(name, text, checkFunction){
    this.name = name;
    this.text = text;
    this.checkFunction = checkFunction;
}

//Gamification variables
var state = {
   NbfSecrets : 0,
   ExplorerMedal : false,
   FirstStepMedal : false,
   MasterOfLinks : false,
   HiddenPathMedal : false,
   AppUserMed : false,
   BreakoutLevel: 0,
   Socializer : false,
   GameTester : false,
   CodeDigger : false 
}

var previous_state = {
    NbfSecrets : 0,
    ExplorerMedal : false,
    FirstStepMedal : false,
    MasterOfLinks : false,
    HiddenPathMedal : false,
    AppUserMed : false,
    BreakoutLevel: 0,
    Socializer : false,
    GameTester : false,
    CodeDigger : false 
}

var achievements = new Array();;

achievements.push(new Achievement(
    "Explorer", 
    "You are a grown exlorer now!", 
    function() {
        state.ExplorerMedal = (progressI==totalDiscover && !state.ExplorerMedal && !fromCheat && !previous_state.ExplorerMedal);
        return state.ExplorerMedal;
    })
);

achievements.push(new Achievement(
    "Curious", 
    "Your first steps... Everything starts from here.",
    function() {
        state.FirstStepMedal = (progressI==2 && !state.FirstStepMedal && !fromCheat && !previous_state.FirstStepMedal);
        return state.FirstStepMedal;
    })
);

achievements.push(new Achievement(
    "Master of Links", 
    "You really cicked on everything??",  
    function() {
        state.MasterOfLinks = numClicks > 1000;
        return state.MasterOfLinks;
    })
);

achievements.push(new Achievement(
    "Shadow traveler", 
    "Either lucky, crazy or a cheater. But well done anyway!",  
    function() {
        state.HiddenPathMedal = numClicks > 1000;
        return state.HiddenPathMedal;
    })
);

achievements.push(new Achievement(
    "App User", 
    "It is something :D",  
    function() {
        state.AppUserMed = numClicks > 1000;
        return state.AppUserMed;
    })
);

achievements.push(new Achievement(
    "Socializer", 
    "Just send me a messagge if that is not done yet, or you will look like a stalker.",  
    function() {
        state.Socializer = numClicks > 1000;
        return state.Socializer;
    })
);

achievements.push(new Achievement(
    "Game tester", 
    "Well... thank you for caring about my projects. Any review would be awesome!", 
    function() {
        state.GameTester = numClicks > 1000;
        return state.GameTester;
    })
);

achievements.push(new Achievement(
    "Code digger", 
    "Hope you will like what you will see!", 
    function() {
        state.CodeDigger = numClicks > 1000;
        return state.CodeDigger;
    })
);

var icons = ["glass", "music", "search", "heart", "star", "user", "film", "trash", "road", "list-alt", "camera", "screenshot", "plane", "comment"];
var divEl = $('.ach-area');
var numClicks = 0;
var totalDiscover = $('t[data-o]').length + 1;
var progressI = 1;
var SAVE_KEY = 'save';
var fromCheat = false;

//Save funcction. Use localStorage for small project with few variables (can lag if too heavy)
function save() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  //UpdateAchievements();
}
//Load on accessing the page
function load() {
  return JSON.parse(localStorage.getItem(SAVE_KEY));
}

//Function to start again from blank
function restart(){
    eraseLocalStorage();
    window.alert('Back to the beginning!');
    console.log('Back to the beginning!');
    InitValueState(); //Only for debug
    UpdateAchievements();  
}

//Erase save "state" variable (the only one used for this website) from local storage
function eraseLocalStorage(){
    localStorage.removeItem(SAVE_KEY);
}

//Give to "state" variable its default settings
function InitValueState(){
    state.NbfSecrets = 0;
    state.ExplorerMedal = false;
    state.FirstStepMedal = false;
    state.MasterOfLinks = false;
    state.HiddenPathMedal = false;
    state.AppUserMed = false;
    state.BreakoutLevel = 0;
    state.Socializer = false;
    state.GameTester = false;
    state.CodeDigger = false; 
}

function UpdateAchievements(){

    /*
    if(!previous_state.ExplorerMedal && state.ExplorerMedal){
        window.alert('You are a grown exlorer now!');
        console.log('You are a grown exlorer now!');
    }
    if(!previous_state.FirstStepMedal && state.FirstStepMedal){
        console.log('Your first steps... Everything starts from here.');
        window.alert('Your first steps... Everything starts from here.');
    }
    if(!previous_state.MasterOfLinks && state.MasterOfLinks){
        console.log('You really cicked on everything??');
        window.alert('You really cicked on everything??');
    }
    if(!previous_state.HiddenPathMedal && state.HiddenPathMedal){
        console.log('Either lucky, crazy or a cheater. But well done anyway!');
        window.alert('Either lucky, crazy or a cheater. But well done anyway!');
    }
    if(!previous_state.AppUserMed && state.AppUserMed){
        console.log('It is something :D');
        window.alert('It is something :D');
    }
    if(!previous_state.Socializer && state.Socializer){
        console.log('Just send me a messagge if that is not done yet, or you will look like a stalker.');
        window.alert('Just send me a messagge if that is not done yet, or you will look like a stalker.');
    }
    if(!previous_state.GameTester && state.GameTester){
        console.log('Well... thank you for caring about my projects. Any review would be awesome!');
        window.alert('Well... thank you for caring about my projects. Any review would be awesome!');
    }
    if(!previous_state.CodeDigger && state.CodeDigger){
        console.log('Hope you liked what you saw!'); 
        window.alert('Hope you liked what you saw!'); 
    }
    */

    var unlock = false;

    achievements.forEach(function(achievement) {
        if (achievement.checkFunction()) {
              achievement.medal = true;
              window.alert(achievement.name + " \n" + achievement.text);
              console.log(achievement.name + " \n" + achievement.text);
              unlock = true;  
              $('<div id="temp" class="ani_div grad">' +
                '<div class="ani_icon">' +
                '<achiev-span class="glyphicon glyphicon-'+randomIcon()+' glyphicon-size"></achiev-span>' +
                '</div>' +
                '<achiev-span>Achievement Unlocked: ' + achievement.name + '!<br>' +
                '<achiev-span>'+achievement.text+'</achiev-span>' +
                '</achiev-span>' +
                '</div>').appendTo(divEl);
              $(".ani_icon").css("background-color", "#"+randomColor());
              $(".glyphicon-size").css("color", "#"+randomColor());
        }
   });

   if(unlock){
       save();
   }

    Equal(previous_state,state);
}

//Function to update the progress bar
function move(percent) {
    var elem = document.getElementById("TheBar");
    var width = percent;
    elem.style.width = width + "%";
    elem.innerHTML = width + "%";
}

//Load state if exist:
if(localStorage.getItem(SAVE_KEY)){
    state = load();
    Equal(previous_state,state);
    UpdateAchievements();
}

//Make state variables equal
function Equal(to, from){
    to.NbfSecrets = from.NbfSecrets;
    to.ExplorerMedal = from.ExplorerMedal;
    to.FirstStepMedal = from.FirstStepMedal;
    to.MasterOfLinks = from.MasterOfLinks;
    to.HiddenPathMedal = from.HiddenPathMedal;
    to.AppUserMed = from.AppUserMed;
    to.BreakoutLevel = from.BreakoutLevel;
    to.Socializer = from.Socializer;
    to.GameTester = from.GameTester;
    to.CodeDigger = from.CodeDigger;  
}

function randomIcon(){
    var l = Math.floor(Math.random()*icons.length);
    return icons[l];
  }

  function randomColor(){
    return Math.random().toString(16).substr(-6);
  }