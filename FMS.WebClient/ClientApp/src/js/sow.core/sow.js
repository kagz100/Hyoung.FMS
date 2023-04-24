/**
 *
 *  [SOW] Stepofweb Controller
 *
 *  @author Dorin Grigoras
 *          www.stepofweb.com
 *
 *  @version 1.1.0


    @globals

        $.SOW.globals.direction                         'ltr|rtl'
        $.SOW.globals.width                             actual width    (updated on resize)
        $.SOW.globals.height                            actual height   (updated on resize)
        $.SOW.globals.is_mobile                         true|false
        $.SOW.globals.is_modern_browser                 true if modern
        $.SOW.globals.is_admin                          true|false      (admin layout)
        $.SOW.globals.breakpoints.[sm|ms|lg|xl]         bootstrap default breakpoints
        $.SOW.globals.elBody                            body element
        $.SOW.globals.elHeader                          header element
        $.SOW.globals.elAside                           main sidebar element

    @functions  
        $.SOW.reinit('#container')                      reinit plugins for a specific ajax container; see also:

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
   var _v = '1.1.0';


  $.SOW = {


    /**
     *
     *  @init
     *
     *
     **/
    init: function () {

      // <script async> NOT working. Keep jQuery!
      // document.addEventListener('DOMContentLoaded', function() {

      $(document).ready(function() { 

        /* 

            Check if debug is enabled
            Should be disabled on production!

        */
        if($.SOW.config.sow__debug_enable === true) {

          $.SOW.helper.consoleLog('++++++++++++++++++++++++++++++');
          $.SOW.helper.consoleLog('+ SOW Controller : ' + _v, 'color: #ff0000; font-size: 13px;');
          $.SOW.helper.consoleLog('++++++++++++++++++++++++++++++');

        }

        // on load
        $.SOW.globals.js_location   = $.SOW.helper.jsLocation();
        $.SOW.globals.css_location  = $.SOW.helper.cssLocation();
        $.SOW.onresize();



        /*
        
            1.  Check for bootstrap
                ::  Part of bundle file! 
                    vendor_bundle.min.js

        */
        // if( typeof $().emulateTransitionEnd === 'function' ) { // bs4
        if( $.fn.modal ) {
          $.SOW.reinit(); /* first init ; ajax callable */
          return;
        }



        /*
        
            1.  Bundle not loaded
                ::  Load it! And init!
                    vendor_bundle.min.js

        */
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        $.SOW.helper.loadScript([$.SOW.globals.js_location + 'vendor_bundle.min.js'], false, true).done(function() {
          $.SOW.helper.consoleLog('Vendor Bunde: Dynamically loaded!');
          $.SOW.reinit(); /* first init ; ajax callable */
        });
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

      });

    },



    /**
     *
     *  @globals
     *  SOW Config
     *
     **/
    globals: {

      direction           : $('body').css('direction'),   /* rtl | ltr */
      width               : $(window).width(),            /* window width, updated on resize */
      height              : $(window).height(),           /* window height, updated on resize */
      is_modern_browser   : ('querySelector' in document && 'localStorage' in window && 'addEventListener' in window),    /* `true` if modern */
      is_mobile           : ($(window).width() < 993)             ? true : false,
      is_admin            : $('body').hasClass('layout-admin')    ? true : false,
      ajax_container      : 'body',                       /* DO NOT USE THIS IN YOUR SCRIPT, IS EXCLUSIVELY USED BY REINIT() FUNCTION */
      page_first_load     : true,                         /* set by reinit() to false after first load - used by ajax */
      js_location         : '',                           /* javascripts location, used to dinamicaly load js scripts */
      css_location        : '',                           /* javascripts location, used to dinamicaly load css */
      cookie_secure       : 'SameSite=None; secure',      /* New Google Secure Cookie */

      /* bootstrap breakpoints */
      breakpoints     : {
          'sm': 576,
          'md': 768,
          'lg': 992,
          'xl': 1200
      },

      /* 
          Most used only!
          Cache once : Use everywhere 
      */
      elBody          : $('body'),
      elHeader        : ($('#header').length > 0)     ? $('#header')      : null,
      elAside         : ($('#aside-main').length > 0) ? $('#aside-main')  : null,

    },



    /**
     *
     *  @core
     *  SOW Core Plugins
     *
     **/
    core: {},



    /**
     *
     *  @vendor
     *  Vendor Plugins [separated by SOW]
     *
     **/
    vendor: {},



    /**
     *
     *  @helper
     *  SOW Helpers
     *
     **/
    helper: {},



    /**
     *
     *  @custom
     *  My Custom [optional]
     *
     **/
    custom: {},



    /**
     *
     *  @resize
     *  Window Resize
     *
     **/
    onresize: function() {

      // On Resize
      jQuery(window).resize(function() {

          if(window.afterResizeApp)
              clearTimeout(window.afterResizeApp);

          window.afterResizeApp = setTimeout(function() {

            /** Window Width **/
            $.SOW.globals.width     = jQuery(window).width();

            /** Window Height **/
            $.SOW.globals.height    = jQuery(window).height();

            /** Is Mobile **/
            $.SOW.globals.is_mobile = ($(window).width() < 993) ? true : false;


          }, 150);

      });

    },



    /**
     *
     *  @reinit
     *  Ajax Callable
     *
     **/
    reinit: function(ajax_container) {

      /*
          For each Ajax call, we temporarily set the ajax container as global
          After reinit, we reset back the ajax container as 'body'
      */
      $.SOW.globals.ajax_container = $.SOW.helper.check_var(ajax_container) || 'body';


      /** Bootstrap Toasts **/ 
      $($.SOW.globals.ajax_container + ' .toast').toast('show');


      /** Bootstrap Tooltip **/ 
      $($.SOW.globals.ajax_container + " [data-bs-toggle=tooltip]," + $.SOW.globals.ajax_container + " [data-tooltip]").tooltip('dispose').tooltip({
        container: ($.SOW.globals.ajax_container == 'body') ? 'html' : $.SOW.globals.ajax_container /* fixing wired positioning! */
      }).on('focus', function () {  $(this).blur() });


      /** Bootstrap Popover **/
      let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
      let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
      });


      /** Bootstrap Carousel **/
      $($.SOW.globals.ajax_container + ' .carousel').carousel('dispose').carousel({
        direction:  ($.SOW.globals.direction == 'ltr') ? 'right' : 'left'
      });

      /** Bootstrap Scrollspy **/
      // $('[data-bs-spy="scroll"]').each(function () {
      //   $(this).scrollspy('refresh');
      // });

      // let dataSpyList = [].slice.call(document.querySelectorAll('[data-bs-spy="scroll"]'));
      // dataSpyList.forEach(function (dataSpyEl) {
      //   bootstrap.ScrollSpy.getInstance(dataSpyEl).refresh()
      // });


      /*

          Autoinit plugins
          Specified in Config

      */
      // for (var index = 0; index < $.SOW.config.autoinit.length; ++index) {
      for (var index in $.SOW.config.autoinit) {

        // Not first page load, skip if plugin do not allow reinit by ajax
        if($.SOW.globals.page_first_load === false && $.SOW.config.autoinit[index][3] === false)
          continue;

        $.SOW.helper.executeFunctionByName(
            $.SOW.config.autoinit[index][0],    // script
            window, 
            $.SOW.config.autoinit[index][1],    // selector
            $.SOW.config.autoinit[index][2]     // config
        );   

      }


      /*
          
          Reserved for emergencies!
          Called for each ajax container!

          global_callback = function(ajax_container) {
              ...
          }

      */
      if(typeof global_callback === 'function')
        $.SOW.helper.executeFunctionByName('global_callback', window, $.SOW.globals.ajax_container);


      /*
          Page classic preloader : first load only!
      */
      if($.SOW.globals.page_first_load === true) {

        jQuery('#page_preload').fadeOut(1000, function() {
          jQuery(this).remove();
        });

      }

      // First page load finished!
      // Any future reinit() calls are Ajax!
      $.SOW.globals.page_first_load   = false;
      $.SOW.globals.ajax_container    = 'body'; // reset

    },


  };



  /**
   *
   *  Init this
   *
   *
   **/
  $.SOW.init();

})(jQuery);