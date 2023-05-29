/**
 *
 *  [SOW] Bootstrap Select
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.vendor.bootstrap_select.init('select.bs-select');
 *                  $.SOW.vendor.bootstrap_select.refresh();
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
  var scriptInfo      = 'Vendor Bootstrap Select';


  $.SOW.vendor.bootstrap_select = {


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

      if (!jQuery().selectpicker) {

        var paths = $.SOW.helper.vendorLogicPaths('bootstrap_select');
        if(paths['path_js'] == '') {
          $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
          return null;
        }

        $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

          if (!jQuery().selectpicker) {
            $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
            return null;
          }

          // self reinit, external js loaded!
          $.SOW.vendor.bootstrap_select.init(selector, config);
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
        $.SOW.vendor.bootstrap_select.process($('select.bs-select'));
        return $('select.bs-select');
      }

      // 2. Has selector
      return this.collection.each(function() {
          
          $.SOW.vendor.bootstrap_select.process($(this));

      });

    },



    /**
     *
     *  @process
     *
     *
     **/
    process: function(_this) {

      // avoid multiple 'binds', on mistake ajax reinits (just for safe)
      if(_this.hasClass('js-bselectified'))
          return;

      // Make it looks the same as a regullar select
      if(!_this.data('style')) {
        var _style = 'select-form-control border';

        if(_this.hasClass('form-control-clean'))
          _style += ' form-control-clean';

        if(_this.hasClass('form-control-pill'))
          _style += ' form-control-pill';

        _this.attr('data-style', _style);
      }


      _this.selectpicker();
      _this.addClass('js-bselectified');

    },




    /**
     *
     *  @process
     *
     *
     **/
    refresh: function(_selector) {

      if (!jQuery().selectpicker)
        return;

      if(typeof _selector === 'undefined')
        var _selector = this.selector;

      var _this = (typeof _selector !== 'object') ? jQuery(_selector) : _selector;

      if(_this.hasClass('js-bselectified'))
        _this.selectpicker('refresh');

    }

  };


})(jQuery);