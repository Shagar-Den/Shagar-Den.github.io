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
		
		var progressI = 1;
		var totalDiscover = $('t[data-o]').length + 1;
		
		function update(){
			if(progressI<totalDiscover){
				progressI++;
				var percentI = progressI/totalDiscover;
				move(Math.round(percentI*100));
			}
		}
		function resetProgress(){
			progressI = 0;
			update();
		}
		function cheatOnProgress(){
			progressI = totalDiscover-1;
			update();
		}
	
	
})(jQuery); // End of use strict


//Function to update the progress bar
function move(percent) {
    var elem = document.getElementById("TheBar");
    var width = percent;
    elem.style.width = width + "%";
    elem.innerHTML = width + "%";
}