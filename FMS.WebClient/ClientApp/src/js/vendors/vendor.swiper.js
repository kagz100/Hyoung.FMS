/**
 *
 *  [SOW] Swiper
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependencies   -
 *  @Usage          $.SOW.vendor.swiper.init('.swiper-container');
 *
 *  @Ajax Support   YES
 *
 *  Vendor:         https://github.com/nolimits4web/swiper
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
  var scriptInfo      = 'Vendor Swiper';
  window.swiperInst   = [];


  $.SOW.vendor.swiper = {


    /**
     *
     *  @config
     *
     *
     **/
    config: {

        init                : true,
        direction           : 'horizontal', // horizontal, vertical
        spaceBetween        : 15,
        slidesPerView       : 1, // number, 'auto'
        slidesPerGroup      : 1,
        slidesPerColumn     : 1,
        centeredSlides      : false,
        effect              : 'slide', // slide, fade, flip, cubeEffect, coverflowEffect
        grabCursor          : false,
        freeMode            : false, // scroll free, don't stop to next one
        loop                : false,
        autoHeight          : false,
        mousewheel          : false,
        speed               : 600,
        parallax            : true,
        lazy                : false, // enable lazy loading
        zoom                : false,

        keyboard            : {
                        enabled: true,
        },

        autoplay            : {
                        delay                   : 4500,
                        disableOnInteraction    : false,
        },

        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true,
        },

        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        },

        pagination: {
            el              : '.swiper-pagination',
            type            : 'bullets', // bullets, progressbar, fraction, custom
            dynamicBullets  : true,
            clickable       : true
        },

        scrollbar: {
            el: '.swiper-scrollbar',
            hide: true,
        },

        navigation: {
            nextEl          : '.swiper-button-next',
            prevEl          : '.swiper-button-prev',
        }

    },



    /**
     *
     *  @collection
     *
     *
     **/
    collection: $(),



    /**
     *
     *  @init
     *
     *
     **/
    init: function (selector, config) {


        // Check Vendor ; dymanically load if missing (should be external)
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        if(selector != '') {
          if(jQuery(selector).length < 1)
            return null;
        }

        if (typeof Swiper !== 'function') {

          var paths = $.SOW.helper.vendorLogicPaths('swiper');
          if(paths['path_js'] == '') {
            $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
            return null;
          }

          $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

            if (typeof Swiper !== 'function') {
              $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
              return null;
            }

            // self reinit, external js loaded!
            $.SOW.vendor.swiper.init(selector, config);
            return null;

          });

          return null;
        }
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


        var __selector          = $.SOW.helper.__selector(selector);
        var __config            = $.SOW.helper.check_var(config);

        this.selector           = __selector[0];    // '#selector'
        this.collection         = __selector[1];    // $('#selector')
        this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;



        // Add RTL
        if($.SOW.globals.direction == 'rtl')
            jQuery(this.selector).attr('dir', 'rtl');


        // -- * --
        $.SOW.helper.consoleLog('Init : ' + scriptInfo);
        // -- * --


        // 1. Has no selector
        if(!this.selector) {
          $.SOW.vendor.swiper.process($('.swiper-container'));
          return $('.swiper-container');
        }

        // 2. Has selector
        return this.collection.each(function() {
            
          $.SOW.vendor.swiper.process($(this));

        });

    },



    /**
     *
     *  @process
     *
     *
     **/
    process: function(_this) {

      if(_this.hasClass('js-swiperified'))
        return;

      var swiperID            = _this.attr('id')              || '',
          custom_config       = _this.data('swiper')          || '',
          linkWith            = _this.data('swiper-link')     || '',
          config              = $.SOW.vendor.swiper.config;

      if(typeof custom_config === 'object') {

        // fixes : deep objects not supported by jQuery
        if(typeof custom_config.pagination === 'object')
            custom_config.pagination = $.extend({}, config.pagination, custom_config.pagination);

        if(config.pagination != 'bullets')
            config.pagination.dynamicBullets = false;

        // extend
        $.extend(config, custom_config);

      }

      if(swiperID == '') {
        swiperID = 'rand_' + $.SOW.helper.randomStr(3);
        _this.attr('id', swiperID);
      }

      // Rename elements, to support multiple swipes in the same page!
      jQuery('.swiper-button-next', '#'+swiperID).addClass('swiper-button-next-'+swiperID);
      jQuery('.swiper-button-prev', '#'+swiperID).addClass('swiper-button-prev-'+swiperID);
      jQuery('.swiper-pagination', '#'+swiperID).addClass('swiper-pagination-'+swiperID);
      config.navigation.nextEl    = '.swiper-button-next-'+swiperID;
      config.navigation.prevEl    = '.swiper-button-prev-'+swiperID;
      config.pagination.el        = '.swiper-pagination-'+swiperID;
      // -- -- --


      // fix on multiple sliders - prevent using last effect set!
      if(config.slidesPerView > '1')
        config.effect = "slide";


      /**

          By default, Smarty controller will reconfigure swiper if -only- one image detected:
              - remove arrows
              - remove progress/bullets
              - disable loop
          Add .js-ignore class to skip, if for some reason is needed!

      **/
      if( !jQuery('#'+swiperID).hasClass('.js-ignore') && jQuery('.swiper-slide', '#'+swiperID).length < 2 ) {
        config.pagination   = {};
        config.navigation   = {};
        config.loop         = false;

        jQuery('.swiper-button-next', '#'+swiperID).remove();
        jQuery('.swiper-button-prev', '#'+swiperID).remove();
        jQuery('.swiper-pagination', '#'+swiperID).remove();
      }

      // linked with another swiper
      if(linkWith != '') {

        if(typeof config.thumbs !== 'object')
          config.thumbs = {};

        config.thumbs.swiper = window.swiperInst[linkWith];

      }



      // Preload - as grid
      // page jump fix
      jQuery('.swiper-wrapper', '#'+swiperID).removeClass('no-gutters gutters-xs gutters-sm gutters-md gutters-xs row');
      jQuery('.swiper-slide', '#'+swiperID).removeClass('hide hide-force col col-3 col-4 col-6 col-md-3 col-md-4 col-md-6 col-lg-3 col-lg-4 col-lg-6 col-xl-3 col-xl-4 col-xl-6 col-5th col-md-5th col-lg-5th col-xl-5th');



      /**

          ! INIT SWIPER !
          ------------------------------------------------------
      */
      window.swiperInst[swiperID] = new Swiper('#'+swiperID, config);
      _this.addClass('js-swiperified');
      /** ------------------------------------------------------ **/
      // Preloader - using bootstrap grid




      // refresh linked (with thumbnails)
      if(linkWith != '') {

        setTimeout(function() {
            window.swiperInst[linkWith].update();
            window.swiperInst[swiperID].update();
        }, 700);

      }

    },


  };


})(jQuery);