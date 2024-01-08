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
			var openedby = $(this).attr('data-o');//.split(',');
			//var closedby = $(this).attr('data-c');//.split(',');
            var openedbyArr = openedby.split(',');
            //var closedbyArr = closedby.split(',');
			
			$(this).removeClass('on').addClass('off');
			/*
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
            */
           //console.log(openedby);
           //console.log(openedbyArr);
           openedbyArr.forEach(function(ob) {
                console.log(ob);
                if($('[data-ob="' + ob +'"]').length !== 0){
                    $('[data-ob="' + ob +'"]').removeClass('off').addClass('on');
                }
                if($('[data-obu="' + ob +'"]').length !== 0){
                    $('[data-obu="' + ob +'"]').removeClass('off').addClass('on');
                }    
                
                if($('[data-obi="' + ob +'"]').length !== 0){
                    $('[data-obi="' + ob +'"]').removeClass('off').addClass('on');
                }
                
        
                if($('[id="' + ob +'-hint"]').length !== 0){
                    $('[id="' + ob +'-hint"]').removeClass('on').addClass('off');
                    hasSeenTrick = true;
                    startHint = false;
                    firstTime = false;
                }

                if($('[data-cb="' + ob +'"]').length !== 0){
                    $('[data-cb="' + ob +'"]').removeClass('on').addClass('off');
                }
            });

            if($('[data-obi="' + openedbyArr[0] +'"]').length !== 0){
                $("html, body").animate(
                    {
                        scrollTop: $('[data-obi="' + openedbyArr[0] +'"]').offset().top - 72,
                    },
                    1000,
                    "easeInOutExpo"
                );
            }
        
            /*
            closedbyArr.forEach(function(cb) {
                if($('[data-cb="' + cb +'"]').length !== 0){
                    $('[data-cb="' + cb +'"]').remove();
                }
            });
			*/
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
        $('[data-obu]').removeClass('off').addClass('on');
        $('[data-cb]').removeClass('on').addClass('off');
		$('t[data-o]').removeClass('on').addClass('off');
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
            if(progressI==1){
                document.getElementById("hideButt").classList.add('btn-off');
                document.getElementById("showButt").classList.remove('btn-off');
            }
            else if(progressI==totalDiscover){
                document.getElementById("showButt").classList.add('btn-off');
                document.getElementById("hideButt").classList.remove('btn-off');
            }
            else{
                document.getElementById("showButt").classList.remove('btn-off');
                document.getElementById("hideButt").classList.remove('btn-off');
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
        var cond = (progressI==totalDiscover && !state.ExplorerMedal && !fromCheat && !previous_state.ExplorerMedal);
        if (cond && !state.ExplorerMedal){
            state.ExplorerMedal = cond;
            return cond;
        }
        return false;
    })
);

achievements.push(new Achievement(
    "Curious", 
    "Your first steps... Everything starts from here.",
    function() {
        var cond = (progressI==2 && !state.FirstStepMedal && !fromCheat && !previous_state.FirstStepMedal);
        if (cond && !state.FirstStepMedal){
            state.FirstStepMedal = cond;
            return cond;
        }
        return false;
    })
);

achievements.push(new Achievement(
    "Master of Links", 
    "You really cicked on everything??",  
    function() {
        var cond = numClicks > 1000;
        if (cond && !state.MasterOfLinks){
            state.MasterOfLinks = cond;
            return cond;
        }
        return false;
    })
);

achievements.push(new Achievement(
    "Shadow traveler", 
    "Either lucky, crazy or a cheater. But well done anyway!",  
    function() {
        var cond = numClicks > 1000;
        if (cond && !state.HiddenPathMedal){
            state.HiddenPathMedal = cond;
            return cond;
        }
        return false;
    })
);

achievements.push(new Achievement(
    "App User", 
    "It is something :D",  
    function() {
        var cond = numClicks > 1000;
        if (cond && !state.AppUserMed){
            state.AppUserMed = cond;
            return cond;
        }
        return false;
    })
);

achievements.push(new Achievement(
    "Socializer", 
    "Just send me a messagge if that is not done yet, or you will look like a stalker.",  
    function() {
        var cond = numClicks > 1000;
        if (cond && !state.Socializer){
            state.Socializer = cond;
            return cond;
        }
        return false;
    })
);

achievements.push(new Achievement(
    "Game tester", 
    "Well... thank you for caring about my projects. Any review would be awesome!", 
    function() {
        var cond = numClicks > 1000;
        if (cond && !state.GameTester){
            state.GameTester = cond;
            return cond;
        }
        return false;
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

    var unlock = false;

    achievements.forEach(function(achievement) {
        if (achievement.checkFunction()) {
              achievement.medal = true;
              //window.alert(achievement.name + " \n" + achievement.text);
              //console.log(achievement.name + " \n" + achievement.text);
              unlock = true;  
              AddToDiv(achievement.name,achievement.text,divEl);
              setTimeout(function () {
                remove()
              }, 2950);
        }
   });

   if(unlock){
       save();
   }

    Equal(previous_state,state);
}

//Manually call an achievement popup
$('.achievementpop').click(function() {
    //AddToDiv('Developper','It works !',divEl);
    var l = Math.floor(Math.random()*achievements.length);
    AddToDiv(achievements[l].name, achievements[l].text,divEl);
    /*setTimeout(function () {
                remove()
    }, 2950);*/
  });


//Function to add element for achievement popup
function AddToDiv(title, text, div){
    $('<div id="temp" class="ani_div grad">' +
                '<div class="ani_icon">' +
                '<span class="glyphicon glyphicon-'+randomIcon()+' glyphicon-size"><img src="assets/img/icons/'+title+'.png" alt="'+title+'"></span>' +
                '</div>' +
                '<span>Achievement Unlocked: ' + title + '<br>' +
                '<span>'+text+'</span>' +
                '</span>' +
                '</div>').appendTo(div);
              //$(".ani_icon").css("background-color", "#"+randomColor());
              //$(".glyphicon-size").css("color", "#"+randomColor());
}

function remove(){
    $(temp).remove();
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
tagLinks();

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

//Function to prepare links related achievements
function tagLinks(){
    if(!state.MasterOfLinks){
        $("a").addClass('unchecked');
    }
}

$(".unchecked").click(function() {
    this.classList.remove('unchecked');
    this.classList.add('checked');
  });

function randomIcon(){
    var l = Math.floor(Math.random()*icons.length);
    return icons[l];
  }

  function randomColor(){
    return Math.random().toString(16).substr(-6);
  }