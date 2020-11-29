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

    var boxIsSticky = false;
    var stickyBox = function () {
        var $socialBox = $("#socialBox");
        var scrollTop = $("html, body").scrollTop();

        var targetBottomPos = $(window).height() - $socialBox.height() - 50;
        var targetTopPos = $('.masthead').outerHeight() - $socialBox.outerHeight() - 20;

        if (boxIsSticky === false && scrollTop > 100) {
            boxIsSticky = true;
            $socialBox.stop().animate(
                {
                    top: targetBottomPos,
                },
                1000,
                "easeOutExpo"
            );
        } else if (boxIsSticky === true && scrollTop < 100) {
            boxIsSticky = false;
            $socialBox.stop().animate(
                {
                    top: targetTopPos
                },
                1000,
                "easeOutExpo"
            );
        }
    }

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    stickyBox();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
    $(window).scroll(stickyBox);
    window.onresize = function() {
        var scrollTop = $("html, body").scrollTop();
        if (scrollTop < 100) {
            var $socialBox = $("#socialBox");
            var targetTopPos = $('.masthead').outerHeight() - $socialBox.outerHeight() - 20;
            $socialBox.stop().animate(
                {
                    top: targetTopPos
                },
                1000,
                "easeOutExpo"
            );
        }
    }
	
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
			
			
			if($('[data-cb="' + closedby +'"]').length !== 0){
				$('[data-cb="' + closedby +'"]').remove();
			}
			
			update();
		}
		

	  });
	  
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
		
		$(".trigger_popup_fricc").click(function(){
			var target = $(this.hash);
			target.show();
		});
		$(".trigger_popup_text").click(function(){
			var target = $(this.hash);
			target.show();
		});
		$('.hover_bkgr_fricc').click(function(){
			$('.hover_bkgr_fricc').hide();
		});
		$('.popupCloseButton').click(function(){
			$('.hover_bkgr_fricc').hide();
		});
		
		//The following is to apply the dark mode on click
		$( "spec" ).on("click", function() { 
            if( $( "body" ).hasClass( "dark" )) { 
                $( "body" ).removeClass( "dark" ); 
            } else { 
                $( "body" ).addClass( "dark" ); 
            }
			if( $( ".hover_bkgr_fricc > div" ).hasClass( "dark" )) { 
                $( ".hover_bkgr_fricc > div" ).removeClass( "dark" ); 
            } else { 
                $( ".hover_bkgr_fricc > div" ).addClass( "dark" );  
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




