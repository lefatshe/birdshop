// file: main.js
//
// Declare this variable before loading RequireJS JavaScript library
// To config RequireJS after it’s loaded, pass the below object into require.config();


require.config({
	// file location
    baseUrl: 'lib',
	// jquery and bootstrap paths are created. These act as references for the libraries in RequireJS.
    paths: {
		jquery: 'js/jquery.min',
		bootstrap : 'js/bootstrap.min'
    },
	// We use a shim to load the bootstrap library. A shim automatically adds a wrapper around a JavaScript library that makes it AMD-compatible / RequireJS-friendly.
    shim: {
		jqm : {
			deps: [ 'jquery' ] ,
			exports: '$'
		},
		bootstrap : {
			deps: [ 'jquery' ] ,
			exports: '$'
		}
	}
});

require.onError =  function( error ) {
	if( ! 'console' in window ) {
		return;
	}
	console.log( error.requireType, error.requireModules );

	if( error.stack ) {
		console.log( error.stack );
	}
};

require([ 'jquery','bootstrap'], function( $ ) {

	console.log("app scripts running");
	$('[data-toggle="tooltip"]').tooltip()
	
	// header function
	$(window).on("scroll", function() {
		if($(window).scrollTop() > 50) {
			$(".header").addClass("active");
		} else {
			//remove the background property so it comes transparent again (defined in your css)
		$(".header").removeClass("active");
		}
	});
	//  Menu Toggle Script
	$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

	// Search box 
	$('.icon-magnifier').on('click', function (e) {
           $('.search-bar').toggleClass("search-bar-open");
           $('.search-icon').toggleClass("search-icon-open");
           e.preventDefault();
    });

	// Init- Pre-loader
	$(".se-pre-con").fadeOut("slow");

	// Pre-loader
	$(window).on('hashchange', function() {

                  location.reload();

                  $('img[src=""]').hide();
        		  $('img:not([src=""])').show();

                  $(".se-pre-con").fadeIn("slow");
                    	$("html, body").animate({ scrollTop: 0 }, "slow");
                  $(".se-pre-con").fadeOut("slow");;
    });

	// Expand button
	$(".expand-panel-header").click(function () {
		$header = $(this);
		//getting the next element
		$content = $header.next();
		$content.slideToggle(500, function () {
			$header.text(function () {
				//change text based on condition
				return $content.is(":visible") ? "Collapse" : "Expand";
			});
		});
	});
	

})






