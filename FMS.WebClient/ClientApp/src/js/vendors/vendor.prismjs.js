/**
 *
 *  [SOW] Prism [Code Highlighter]
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.vendor.prismjs.init('pre')
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
  var scriptInfo      = 'Vendor Prism [Code Highlighter]';


  $.SOW.vendor.prismjs = {


      /**
       *
       *  @config
       *
       *
       **/
      config: {

          NormalizeWhitespace: {
            'remove-trailing': true,
            'remove-indent': true,
            'left-trim': true,
            'right-trim': true,

            // 'break-lines': 80,
            'indent': 0,
            'remove-initial-line-feed': false,
            'tabs-to-spaces': 2,
            'spaces-to-tabs': 2
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

        if (typeof Prism !== "object") {

          /** ++++++++++++++++++++++++++++++++++++++++++++

              !IMPORTANT!
                  This will stop Prismjs to autoinit!
                  We init manually on each page load!
                  Else, will not work on ajax!

          ++++++++++++++++++++++++++++++++++++++++++++++++ **/
          window.Prism = window.Prism || {};
          window.Prism.manual = true;
          /** ++++++++++++++++++++++++++++++++++++++++++++ **/

          var paths = $.SOW.helper.vendorLogicPaths('prismjs');
          if(paths['path_js'] == '') {
            $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
            return null;
          }

          $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

            if (typeof Prism !== "object") {
              $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
              return null;
            }


            /** ++++++++++++++++++++++++++++++++++++++++++++

                !IMPORTANT!
                    We load plugin settings here!

            ++++++++++++++++++++++++++++++++++++++++++++++++ **/
            // plugin : normalize-whitespace
            Prism.plugins.NormalizeWhitespace.setDefaults($.SOW.vendor.prismjs.config.NormalizeWhitespace);
            /** ++++++++++++++++++++++++++++++++++++++++++++ **/


            // self reinit, external js loaded!
            $.SOW.vendor.prismjs.init(selector, config);
            return null;

          });

          return null;

        }
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


        var __selector          = $.SOW.helper.__selector(selector);
        var __config            = $.SOW.helper.check_var(config);

        this.selector           = __selector[0];    // '#selector'
        this.collection         = __selector[1];    // $('#selector')
        this.selector_orig      = __selector[2];    // $('#selector') // without ajax container prefix
        this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;



        // -- * --
        $.SOW.helper.consoleLog('Init : ' + scriptInfo);
        // -- * --



        // Init
        $.SOW.vendor.prismjs.process();

      },



      /**
       *
       *  @process
       *
       *
       **/
      process: function() {

        // PHP XDebug
        jQuery('pre.xdebug-var-dump').addClass('language-php');

        // Init
        if(typeof Prism === "object") {
          
          setTimeout(function() {
            Prism.highlightAll();
          },50);

        }

      },


  };


})(jQuery);