/**
 *
 *  [SOW] photoswipe
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.vendor.photoswipe.init()
 *  @Ajax Support   YES
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *  @vars
	 *
	 *
	 **/
	var scriptInfo      = 'Vendor Photoswipe';


	$.SOW.vendor.photoswipe = {

		/**
		 *
		 *  @config
		 *
		 *
		 **/
		config: {

			defaults:   {

				galleryOpen:                function (gallery) {},
				showHideOpacity:            false,
				history:                    false,
				captionEl:                  false,
				shareEl:                    false,
				tapToClose:                 false,
				tapToToggleControls:        false,
				escKey:                     true,
				barsSize:                   { top:0, bottom:0 },

			}

		},




		/**
		 *
		 *  @init
		 *
		 *
		 **/
		init: function (selector, config) {


			var __selector          = $.SOW.helper.__selector(selector);
			var __config            = $.SOW.helper.check_var(config);

			this.selector           = __selector[0];    // '#selector'
			this.collection         = __selector[1];    // $('#selector')
			this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;


			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(this.selector).length < 1)
					return null;
			}

			if (typeof PhotoSwipe !== 'function') {

				var paths = $.SOW.helper.vendorLogicPaths('photoswipe');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (typeof PhotoSwipe !== 'function') {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.photoswipe.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


			// Append PSW Template
			$.SOW.vendor.photoswipe.photoswipe_tpl();



			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


			// Process
			return $.SOW.vendor.photoswipe.process(this.selector);

		},





		/**
		 *
		 *  @process
		 *  
		 *
		 **/
		process: function(_this) {

			var TPL             = jQuery(".pswp[role='dialog']")[0];
			var phswCollection  = {};
			var arr             = "abcdefghijklmnopqrstuvwxyz".split("");
			var instance        = [];
			var instanceCount   = [];

			// Create array by group
			$(_this).not('.js-photoswapified').addClass('js-photoswapified').each( function() {

				var _t                = $(this),
					src                 = _t.attr('href'),
					caption             = _t.attr('title'),
					phswGroup           = _t.data('photoswipe') || _t.data('group'),
					groupId             = (!phswGroup) ? $.SOW.helper.randomStr(3, 'N') : phswGroup.replace(/[a-z]/ig, function(m){ return arr.indexOf(m.toLowerCase()) + 1 });

				if(!src) return;
				_t.attr('data-group-id', groupId);


				// add index for groups
				if(phswGroup) {
					if(typeof instanceCount[groupId] === 'undefined')
						instanceCount[groupId] = 0;

					_t.attr('data-index', instanceCount[groupId]++);
				}


				if(typeof phswCollection[groupId] === 'undefined')
					phswCollection[groupId] = [];


				phswCollection[groupId].push({
					src:    src,
					title:  caption,
					w:      0,
					h:      0
				});

			});




			$(_this).off().on('click', function(e) {
				e.preventDefault();

				var _t                      = $(this),
					href                    = _t.attr('href')                           || '',
					groupId                 = _t.data('group-id')                       || 0,
					index                   = _t.data('index')                          || 0,
					history                 = _t.attr('data-history')                   || 'false',
					shareEl                 = _t.attr('data-shareEl')                   || 'false',
					captionEl               = _t.attr('data-captionEl')                 || 'false',
					tapToClose              = _t.attr('data-tapToClose')                || 'false',
					tapToToggleControls     = _t.attr('data-tapToToggleControls')       || 'false',
					showHideOpacity         = _t.attr('data-showHideOpacity')           || 'true',
					mainClass               = _t.attr('data-mainClass')                 || '',
					isVideo                 = false;


				// Video Detect!
				if(href.match(/(youtube.com)/))                 isVideo = true;
				else if(href.match(/(youtu.be)/))               isVideo = true;
				else if(href.match(/(vimeo.com)/))              isVideo = true;
				else if(href.match(/(.mp4)/))                   isVideo = true;
				else if(href.match(/(.ogv)/))                   isVideo = true;


				// Stop here, link is video
				// Call ajax modal to laounch video!
				if(isVideo === true) {

					if(typeof $.SOW.core.ajax_modal === 'object') {

						_t.off().removeClass('photoswipe js-photoswapified')
							.addClass('js-onload')
							.attr('data-ajax-modal-delay', '0')
							.attr('data-ajax-modal-type', 'video')
							.attr('data-ajax-modal-size', 'modal-xl')
							.attr('data-ajax-modal-centered', 'true');

						$.SOW.core.ajax_modal.attach(_t);

					}
					

					return false;

				}



				// Show Preloader (margin issues)
				// jQuery('.pswp__preloader').addClass('pswp__preloader--active');



				// Get defaults
				var options             = $.SOW.vendor.photoswipe.config.defaults;
					options.mainClass   = mainClass;
					options.index       = index;


				// User overwrite defaults
				// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
				if(showHideOpacity != '')           options.showHideOpacity         = (showHideOpacity+'' == 'true') ? true : false;
				if(history != '')                   options.history                 = (history+'' == 'true') ? true : false;
				if(captionEl != '')                 options.captionEl               = (captionEl+'' == 'true') ? true : false;
				if(shareEl != '')                   options.shareEl                 = (shareEl+'' == 'true') ? true : false;
				if(tapToClose != '')                options.tapToClose              = (tapToClose+'' == 'true') ? true : false;
				if(tapToToggleControls != '')       options.tapToToggleControls     = (tapToToggleControls+'' == 'true') ? true : false;
				if(typeof barsSize === 'object')    options.barsSize                = barsSize;
				// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


				instance[groupId] = new PhotoSwipe(TPL, PhotoSwipeUI_Default, phswCollection[groupId], options);
				instance[groupId].init();


				instance[groupId].listen('initialZoomInEnd', function() {
					options.galleryOpen(instance[groupId]);
				});

				instance[groupId].listen('imageLoadComplete', function(index, item) {
					loadImg(index, item);
				});

				instance[groupId].listen('gettingData', function(index, item) {
					loadImg(index, item);
				});

				instance[groupId].listen('resize', function(index, item) {
					resizeItem(item);
				});

				function loadImg(index, item) {

					if (item.w == 0 && item.h == 0) {
						var imgpreload = new Image(); 

						imgpreload.onload = function() {

							item.w              = this.width;
							item.h              = this.height;
							item.needsUpdate    = true;
							instance[groupId].updateSize(true);

						};

						imgpreload.src = item.src;
					}

				}



				function resizeItem(item) {

					/* ununsed */

				}



				// Style
				$.SOW.vendor.photoswipe.photoswipe_style(_t);

			});


		},





		/**
		 *
		 *  @photoswipe_tpl
		 *  Should be the same with fancybox!
		 *
		 **/
		photoswipe_style: function(_t) {

			// rounded-circle p-0 h--60 w--60 m--15 fs--20 fi fi-arrow-left shadow-xlg bg-secondary text-white
			var __class = 'bg-secondary text-white';

			if(_t.hasClass('photoswipe-secondary'))
				var __class = 'bg-secondary text-white';

			else if(_t.hasClass('photoswipe-dark'))
				var __class = 'bg-dark text-white';

			else if(_t.hasClass('photoswipe-white'))
				var __class = 'bg-white text-dark';

			else if(_t.hasClass('photoswipe-dark'))
				var __class = 'bg-dark text-white';

			else if(_t.hasClass('photoswipe-primary'))
				var __class = 'bg-primary text-white';

			else if(_t.hasClass('photoswipe-success'))
				var __class = 'bg-success text-white';

			else if(_t.hasClass('photoswipe-danger'))
				var __class = 'bg-danger text-white';

			else if(_t.hasClass('photoswipe-warning'))
				var __class = 'bg-warning text-white';

			else if(_t.hasClass('photoswipe-info'))
				var __class = 'bg-info text-white';

			else if(_t.hasClass('photoswipe-pink'))
				var __class = 'bg-pink text-white';

			else if(_t.hasClass('photoswipe-purple'))
				var __class = 'bg-purple text-white';

			else if(_t.hasClass('photoswipe-indigo'))
				var __class = 'bg-indigo text-white';

			jQuery('.pswp__button--custom').removeClass('bg-white bg-dark bg-primary bg-secondary bg-success bg-danger bg-warning bg-info bg-pink bg-purple bg-indigo text-dark text-white');
			jQuery('.pswp__button--custom').addClass(__class);

		},






		/**
		 *
		 *  @photoswipe_tpl
		 *
		 *
		 **/
		photoswipe_tpl: function() {

			/**
				
				https://photoswipe.com/documentation/getting-started.html

				Order of pswp__bg, pswp__scroll-wrap, pswp__container 
				and pswp__item elements should not be changed.

			**/
			var tpl = '<!-- Root element of PhotoSwipe. Must have class pswp. -->'
					+ '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">'

					   // + ' <!-- Background of PhotoSwipe. It`s a separate element as animating opacity is faster than rgba(). -->'
						+ '<div class="pswp__bg"></div>'

						// + '<!-- Slides wrapper with overflow:hidden. -->'
						+ '<div class="pswp__scroll-wrap">'

							// + '<!-- Container that holds slides. PhotoSwipe keeps only 3 of them in the DOM to save memory. Don`t modify these 3 pswp__item elements, data is added later on. -->'
							+ '<div class="pswp__container">'
							   + ' <div class="pswp__item"></div>'
								+ '<div class="pswp__item"></div>'
								+ '<div class="pswp__item"></div>'
							+ '</div>'

						   // + ' <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->'
						   + ' <div class="pswp__ui pswp__ui--hidden">'

								+ '<div class="pswp__top-bar">'

									+ '<div class="pswp__counter"><!-- image container --></div>'

									// + '<button class="pswp__button pswp__button--close fi fi-close rounded m-3" aria-label="Close (Esc)" style="width:50px;height:50px;font-size:20px"></button>'
							   	// + ' <button class="pswp__button pswp__button--share fi fi-share rounded mt-3" aria-label="Share" style="width:50px;height:50px;font-size:20px"></button>'

									// + '<button class="pswp__button pswp__button--fs fs--20 mt-3" aria-label="Toggle fullscreen"></button>'
									// + '<button class="pswp__button pswp__button--zoom fs--20 mt-3" aria-label="Zoom in/out"></button>'

									// + '<!-- element will get class pswp__preloader--active when preloader is running -->'
								   + ' <div class="pswp__preloader pswp__preloader--active">'
										+ '<div class="pswp__preloader__icn">'
										  + '<div class="pswp__preloader__cut">'
											+ '<div class="pswp__preloader__donut">'

												// == == == same as ajax loader
												+ '<div class="position-fixed fixed-bottom w-100 mb-3 z-index-9999 text-center shadow-none">'
													+ '<span class="bg-white d-inline-block px-4 rounded-lg shadow-lg">'
														+ '<i class="'+$.SOW.config.sow__icon_loading+' fs-1 text-muted"></i>'
													+ '</span>'
											  + '</div>'
												// == == == same as ajax loader

											+ '</div>'
										  + '</div>'
										+ '</div>'
									+ '</div>'
								+ '</div>'




								+ '<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">'
									+ '<div class="pswp__share-tooltip"></div> '
								+ '</div>'

								// + '<button class="pswp__button--custom pswp__button pswp__button--arrow--left rounded-circle p-0 m-3 fi fi-arrow-left shadow-xlg" aria-label="Previous (arrow left)" style="width:60px;height:60px;font-size:20px"></button>'
								// + '<button class="pswp__button--custom pswp__button pswp__button--arrow--right rounded-circle p-0 m-3 fi fi-arrow-right shadow-xlg" aria-label="Next (arrow right)" style="width:60px;height:60px;font-size:20px"></button>'

								+ '<div class="pswp__caption">'
									+ '<div class="pswp__caption__center"></div>'
								+ '</div>'

							+ '</div>'

					   + ' </div>'

					+ '</div>';


			// Append Template!
			$.SOW.globals.elBody.append(tpl);

		}

	};


})(jQuery);