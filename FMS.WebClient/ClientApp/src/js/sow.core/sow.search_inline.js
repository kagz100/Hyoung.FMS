/**
 *
 *  [SOW] Inline Search
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.search_inline.init('input.iqs-input');
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
  var scriptInfo      = 'SOW Inline Search';


  $.SOW.core.search_inline = {


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

      var __selector          = $.SOW.helper.__selector(selector);
      var __config            = $.SOW.helper.check_var(config);

      this.selector           = __selector[0];    // '#selector'
      this.collection         = __selector[1];    // $('#selector')
      this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;


      if(jQuery(this.selector).length < 1)
        return;


      /* Case Sensitive :contains */
      jQuery.extend(jQuery.expr[":"], {
        "containsIN": function(elem, i, match, array) {
          return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }
      });



        // -- * --
        $.SOW.helper.consoleLog('Init : ' + scriptInfo);
        // -- * --


        // 1. Has no selector
        if(!this.selector) {
          $.SOW.core.search_inline.process($('input.iqs-input'));
          return this.collection;
        }

        // 2. Has selector
        return this.collection.each(function() {
            
          $.SOW.core.search_inline.process($(this));

        });

    },



    /**
     *
     *  @process
     *

        <input type="text" class="form-control iqs-input" data-container=".iqs-container" name="quick-filter" value="" placeholder="quick filter">

        <div class="iqs-container">

          <div class="iqs-item">
            <span>Something Here</span>
          </div>

          <div class="iqs-item">
            <span>Another Here</span>
          </div>
          
          ...

        </div>

     *
     *
     **/
    process: function(_this) {

      // --
      if(_this.hasClass('iqs-init'))
        return;
      
      _this.addClass('iqs-init');
      // --


      var _container = _this.data('container') || '.iqs-container';

      _this.keyup(function() {

        var keywords = jQuery.trim(this.value);

        if (keywords == "") {

          jQuery(_container+" .iqs-item").removeClass('hide hide-force');
        
        } else {

          jQuery(_container+" .iqs-item").addClass('hide hide-force'); 
          jQuery(_container+' .iqs-item :containsIN('+keywords+')').closest(".iqs-item").removeClass('hide hide-force');

        }

      });

    },

  };


})(jQuery);