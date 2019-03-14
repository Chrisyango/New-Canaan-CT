/*-----------------------------------------------------------------------------------

	Theme Name: New Canaan, CT
	Front-end Developer: Chris Yang
	Author Design: Kat Wiard
	Author URI: http://www.revize.com/
	Date: March 11, 2019

-----------------------------------------------------------------------------------*/

(function($) {

	'use strict';

	var $window = $(window),
		$body = $('body');

	/*!
	 * IE10 viewport hack for Surface/desktop Windows 8 bug
	 * Copyright 2014-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 */

	// See the Getting Started docs for more information:
	// http://getbootstrap.com/getting-started/#support-ie10-width
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement('style');
		msViewportStyle.appendChild(
			document.createTextNode(
			  '@-ms-viewport{width:auto!important}'
			)
		); document.querySelector('head').appendChild(msViewportStyle);
	}

	/*
	* E-Notify Auto submit
	*/
	$.urlParam=function(n){var e=new RegExp("[?&]"+n+"=([^]*)").exec(window.location.href);return null==e?null:e[1]||0};
	var $enotify = $('iframe[src*="/revize/plugins/notify/notify.jsp"]');
	if( $enotify.length > 0 ){
		var emailStr = $.urlParam("email");
		if( emailStr != null ){
			$enotify.attr("src", $enotify.attr("src") + "&email=" + emailStr);
		}
	}

	// RZ Class
	if(typeof RZ !== "undefined"){
	 if(RZ.login){
	  $body.addClass("user-logged-in");
	 } else{
		 $body.addClass("user-not-logged-in");
	 }
	}

	// Search Toggle
	$('#search-toggle').on('click keypress',function(e){
		$('#search').stop().slideToggle(200);
		$(this).toggleClass('fa-search fa-close');
	});

	// Navigation Toggle
	$("#nav-toggle").on("click keypress", function(){
		$("#nav").stop().slideToggle();
		$(this).toggleClass("active");
	});
	
	// Keyboard Navigation: Nav, flyout
	var isClick = false;
	$("#nav li a, #flyout  li a, a, button, .toggle, .toggle2").on('focusin', function(e) {

		if( isClick === false ) {
			$(".focused").removeClass("focused");
			$(e.currentTarget).parents("#nav li, #flyout li").addClass("focused");
			$(".opened:not(.focused) ul:visible,.opened2:not(.focused) ul:visible").slideUp().parent().removeClass("opened opened2");
		} else {
			$(".focused").removeClass("focused");
			isClick = false;
		}
	});

	// prevent focused class changes on click - This way arrows wont pop when clicking nav links
	$("#nav a,#flyout a").on('mousedown',function(){
		isClick = true;
	});

	// Menu Arrows
	// $("#nav > li:has(ul)").addClass('first-parent').children("a,span").append('<i class="fa fa-angle-down down-arrow">');

	// Menu Toggles
	$("#nav >li>ul,#flyout >li>ul").addClass('first-level');
	$("#nav  li ul ul").addClass('second-level');
	$("#nav >li:has(ul)").find("a:first").append('<i class="fa fa-angle-down toggle" tabindex="0">');
	$("#nav li li:has(ul)").find("a:first").append('<i class="fa fa-angle-down toggle2" tabindex="0">');
	$("#flyout >li:has(ul)").find("a:first").append('<i class="fa fa-angle-down toggle" tabindex="0">');

	function addNavClass() {
		if ($window.width() < 992) {
			$("body").addClass('mobile');
			$("body").removeClass('desktop');

		} else{
			$("body").addClass('mobile');
			$("body").removeClass('desktop');
		}
	}
	addNavClass();
	$window.resize(addNavClass);

	$(".toggle").on("click keypress",function(e) {
			e.preventDefault();
	  var $parent = $(this).parent();
	  var $parentLi = $parent.parent();
	  $parentLi.toggleClass('opened');
	  if($parent.addClass('active').next('.first-level').is(":visible")){
		$parent.next('.first-level').slideUp();
	  } else {
		$(".first-level").slideUp("slow");
		$parent.removeClass('active').next('.first-level').slideToggle();
	  }
	});

	$(".toggle2").on("click keypress",function(e) {
			e.preventDefault();
	  var $parent = $(this).parent();
	  var $parentLi = $parent.parent();
	  $parentLi.toggleClass('opened2');
	  if($parent.next('.second-level').is(":visible")){
		$parent.next('.second-level').slideUp();
	  } else {
		$(".second-level").slideUp("slow");
		$parent.next('.second-level').slideToggle();
	  }
	});

	//colapse nav if left
	$(".desktop *").focus(function(e){
		var $opened = $(".opened");
		var $opened2 = $(".opened2");
		if( $opened.length > 0 || $opened2.length > 0 ) {
			if( $(".opened :focus").length < 1 ){
				$opened.children("ul").slideUp();
				$opened.removeClass("opened");
				$(".opened2").removeClass("opened2");
			}
			if( $(".opened2 :focus").length < 1 ){
				$opened2.children("ul").slideUp();
				$opened2.removeClass("opened2");
			}
		}
	});
	// Flyout
	var flyout = $('#flyout'),
		flyoutwrap = $('#flyout-wrap');

	if (flyout.text().length){
		flyoutwrap.prepend('<div id="flyout-toggle" class="hidden-lg hidden-md"><i class="fa fa-bars"></i> Sub Menu</div>');
	}

	$("#flyout-toggle").on("click", function(){
		flyout.stop().slideToggle();
		$(this).toggleClass("active");
	});

	$("#flyout ul").addClass('flyout-children');

	var flyoutChildren = $('.flyout-children');
	
	// start calendar resize handler
	function resizeIframe(height) {
		var iFrameID = document.getElementById('calendar');
		if(iFrameID) {
				// here you can set the height, I delete it first, then I set it again
				iFrameID.height = "";
				iFrameID.height = height;
		}
		console.log("height to: " + height);
	}
	var eventMethod = window.addEventListener
	? "addEventListener"
	: "attachEvent";
	var eventHandler = window[eventMethod];
	var messageEvent = eventMethod === "attachEvent"
		? "onmessage"
		: "message";
	eventHandler(messageEvent, function (e) {

		if( e.data && e.data[0] === "setCalHeight" )
		{
			if(typeof resizeIframe === 'function'){
				resizeIframe(e.data[1]);
			}

		}

	});
	// end calendar resize handler

	// revizeWeather
	if( typeof $.fn.revizeWeather !== "undefined" ){
		$.fn.revizeWeather({
			zip: '06840',
			city_name: '',
			unit: 'f',
			success: function(weather) {
				var date = new Date();
				date = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
				var html = '<span>Weather:</span> <i class="'+weather.icon+'"></i> <span class="forecast">'+weather.max+'&deg; <span style="color:#000">|</span> <span style="color:#c2c2c2">'+weather.min+'&deg;</span></span>';

				$("#weather").html(html);
			},
			error: function(error) {
				// better to just hide the secion if there is an error
				$('.weather').hide();
				console.log(error);
			}
		});
	}

	// Tabs
	$('#tabs li a').on('click keydown', function(event) {
		if (event.key === 'Enter' || event.type === 'click') {
			event.preventDefault();
			$('#tabs li, #tabs-content>div').removeClass('active');
			$(this).parent().addClass('active');
			$('#tabs-content>div').eq($(this).parent().index()).addClass('active');
		}
	});

	// Twitter Feed
	if(typeof $.fn.tweet !== "undefined"){
		$("#twitter-feed").tweet({
			modpath: '_assets_/plugins/twitter/',
			username: "NCAdvertiser",
			join_text: "auto",
			avatar_size: 30,
			count: 4,
			auto_join_text_default: "",
			auto_join_text_ed: "",
			auto_join_text_ing: "",
			auto_join_text_reply: "",
			auto_join_text_url: "",
			loading_text: "Loading Tweet..."
		});
		if($('#twitter-feed>ul>li')) {
			$('#twitter-feed>ul>li').addClass('col-md-3').matchHeight();
		}
	}

	// bxSlider
	if(typeof $.fn.bxSlider !== "undefined"){
		$('.bxslider').bxSlider({
			mode:'fade',
			auto:($('.bxslider').children().length < 2) ? false : true,
			pager: false
		});
	}

	// Owl Slider
	if(typeof $.fn.owlCarousel !== "undefined"){
		let newsCount = $('.news-link').length;
		const newsItem = function(num) {
			return (newsCount >= num ? num : newsCount);
		}
		$("#news-links").owlCarousel({
			loop: newsCount > 1 ? true : false,
			responsiveClass: true,
			nav: true,
			autoHeight: true,
			navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
			margin: 27,
			responsive: {
				0: {
					items: newsItem(1),
				},
				767: {
					items: newsItem(2)
				}
			}
		});
	}

	$window.ready(function(){
		
		$('#nav').clone().prependTo('#left-links').attr('id','footer-nav');

		$("#skip").click(function(event){
    
				// strip the leading hash and declare
				// the content we're skipping to
				let skipTo="#"+this.href.split('#')[1];

				// Setting 'tabindex' to -1 takes an element out of normal 
				// tab flow but allows it to be focused via javascript
				$(skipTo).attr('tabindex', -1).on('blur focusout', function () {

						// when focus leaves this element, 
						// remove the tabindex attribute
						$(this).removeAttr('tabindex');

				}).focus(); // focus on the content container
		});

		if ($('#side-content').length){
			$('main').css('position','relative');
			$('<div id="side-background" class="hidden-sm hidden-xs"></div>').prependTo('main');
		}

		function sideBackground(){
			$('#side-background').width($('#side-content').outerWidth());
		}
		sideBackground();
		$window.resize(sideBackground);

		// Fill sides script
		function fillSide(){
			var windowWidth = $('body').outerWidth();
			var pixelValue = (windowWidth - $('.container').width()) / 2;
			$('.fillLeft').css({
					'margin-left': -pixelValue
			});
			
			$('.fillRight').css({
					'margin-right': -pixelValue
			});
			$('.fillLeft.withPadding').css({
					'margin-left': -pixelValue,
					'padding-left': pixelValue
			});
			
			$('.fillRight.withPadding').css({
					'margin-right': -pixelValue,
					'padding-right': pixelValue
			});
			
			$('#side-background').width($('#side-content').outerWidth());
		}
		fillSide();
		$window.resize(fillSide);
		
		// matchHeight
		if(typeof $.fn.matchHeight !== "undefined"){
			$('.equal').matchHeight({
				//defaults
				byRow: true,
				property: 'height', // height or min-height
				target: null,
				remove: false
			});
		}

		// Social Feed
		if ( typeof $.fn.socialfeed !== "undefined"){
			$('#social-feed').socialfeed({
					// Facebook
					facebook:{
							accounts: ['@spanishforklibrary'],
							limit: 4,
							access_token: 'EAAMkcCLFBs8BAEnpzLa3fg98gku0FhSwmvKZAujQ5m6RLRlHnIUnPaAexISWwIMA4VEoHuFUEWufVXIsasnQFRaDys2613NJUqt5sE5FqAr1sYrgnLZBPgeDmP8cZAkv7sFZBQOxUdrz2B7udHItF8tNMWiZC5iJfqkmWWK06BQZDZD'
					},
					template: "_assets_/templates/template.html",
					length: 45,
					show_media: true,
					callback:function(){
						$('.text-wrapper').matchHeight();
					}
			});
		}

		// Video Background
		if ( typeof $.fn.YTPlayer !== "undefined"){
			$(function(){
				$("#video-bg").YTPlayer();
			});
		}


		//#Smooth Scrolling
		$('a[href*=#]:not([href=#],[href*="#collapse"])').click(function() {
			if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}
		});

		/*global jQuery */
		/*!
		* FlexVerticalCenter.js 1.0
		*
		* Copyright 2011, Paul Sprangers http://paulsprangers.com
		* Released under the WTFPL license
		* http://sam.zoy.org/wtfpl/
		*
		* Date: Fri Oct 28 19:12:00 2011 +0100
		*/
		$.fn.flexVerticalCenter = function( options ) {
			var settings = $.extend({
				cssAttribute:   'margin-top', // the attribute to apply the calculated value to
				verticalOffset: 0,            // the number of pixels to offset the vertical alignment by
				parentSelector: null,         // a selector representing the parent to vertically center this element within
				debounceTimeout: 25,          // a default debounce timeout in milliseconds
				deferTilWindowLoad: false     // if true, nothing will take effect until the $(window).load event
			}, options || {});

			return this.each(function(){
				var $this   = $(this); // store the object
				var debounce;

				// recalculate the distance to the top of the element to keep it centered
				var resizer = function () {

					var parentHeight = (settings.parentSelector && $this.parents(settings.parentSelector).length) ?
						$this.parents(settings.parentSelector).first().height() : $this.parent().height();

					$this.css(
						settings.cssAttribute, ( ( ( parentHeight - $this.height() ) / 2 ) + parseInt(settings.verticalOffset) )
					);
				};

				// Call on resize. Opera debounces their resize by default.
				$(window).resize(function () {
					clearTimeout(debounce);
					debounce = setTimeout(resizer, settings.debounceTimeout);
				});

				if (!settings.deferTilWindowLoad) {
					// call it once, immediately.
					resizer();
				}

				// Call again to set after window (frames, images, etc) loads.
				$(window).load(function () {
					resizer();
				});

			});

		};
		$('.v-align').flexVerticalCenter();

	}); // Ready

})(jQuery);
