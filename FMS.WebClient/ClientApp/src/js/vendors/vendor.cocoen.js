/**
 *
 *  [SOW] Cocoen
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.vendor.cocoen.init('figure.cocoen')
 *  @Ajax Support   YES
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
  var scriptInfo      = 'Vendor Cocoen (Image Comparision)';
  window.cocoenInit = false;


  $.SOW.vendor.cocoen = {


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
            
      if (typeof Cocoen !== 'function') {

        var paths = $.SOW.helper.vendorLogicPaths('cocoen');
        if(paths['path_js'] == '') {
          $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
          return null;
        }

        $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

          if (typeof Cocoen !== 'function') {
            $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
            return null;
          }

          // self reinit, external js loaded!
          $.SOW.vendor.cocoen.init(selector, config);
          return null;
          alert(typeof Cocoen);
        });

        return null;

      } if (typeof Cocoen !== 'function') return;
      // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

      jQuery(selector).each(function() {

        var _t = jQuery(this);

        if(_t.hasClass('js-cocoened'))
            return;

        _t.addClass('js-cocoened');

        // assign random class!
        var _rand = $.SOW.helper.randomStr(3, 'L');
        var _randClass = 'rand_'+_rand;
            _t.addClass(_randClass);

        // Init
        new Cocoen(document.querySelector('.' + _randClass));

      });


      // -- * --
      $.SOW.helper.consoleLog('Init : ' + scriptInfo);
      // -- * --

      // no chaining
      return null;

    },


  };


})(jQuery);