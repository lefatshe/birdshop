require.config({

    baseUrl: baseUrl + '/assets/',
    paths: {
		jquery: '/js/jquery.min',
		bootstrap : '/js/bootstrap.min'
    },
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

require([
	// coverflow - required js files (full featureset)
	'jquery',
	// api page dependencies
	'bootstrap'
],
function( $ ) {

	$(function( ){


	
		$(".se-pre-con").fadeOut("slow");
		

		$(window).on('hashchange', function() {

                  location.reload();

                  $('img[src=""]').hide();
        		  $('img:not([src=""])').show();

                  $(".se-pre-con").fadeIn("slow");
                    	$("html, body").animate({ scrollTop: 0 }, "slow");
                  $(".se-pre-con").fadeOut("slow");;
    	});

	});






