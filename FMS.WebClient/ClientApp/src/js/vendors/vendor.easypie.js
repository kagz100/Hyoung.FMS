/**
 *
 *  [SOW] Easypie Chart
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependencies   -
 *  @Usage          $.SOW.vendor.easypie.init('.easypie');
 *
 *  @Ajax Support   YES
 *
 *  Vendor:         https://github.com/rendro/easy-pie-chart
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
  var scriptInfo                  = 'Vendor Easypie Chart';

  $.SOW.vendor.easypie = {


    /**
     *
     *  @config
     *
     *
     **/
    config: {},



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

      if (!jQuery().easyPieChart) {

          var paths = $.SOW.helper.vendorLogicPaths('easypie');
          if(paths['path_js'] == '') {
            $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
            return null;
          }

          $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

            if (!jQuery().easyPieChart) {
              $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
              return null;
            }

            // self reinit, external js loaded!
            $.SOW.vendor.easypie.init(selector, config);
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


      // 1. Has no selector
      if(!this.selector) {
        $.SOW.vendor.easypie.process($('.easypie'));
        return $('.easypie');
      }

      // 2. Has selector
      return this.collection.each(function() {
          
        $.SOW.vendor.easypie.process($(this));

      });


    },



    /**
     *
     *  @process
     *
     *
     **/
    process: function(_this) {

      _this.easyPieChart({
        //your options goes here
      });

    },

  };


})(jQuery);