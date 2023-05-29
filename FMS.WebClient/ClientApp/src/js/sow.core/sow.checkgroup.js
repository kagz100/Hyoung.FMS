/**
 *
 *  [SOW] Check Group
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.checkgroup.init('div.checkgroup');
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
  var scriptInfo      = 'SOW Check Group';


  $.SOW.core.checkgroup = {


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
      this.selector           = __selector[0];    // '#selector'
      this.collection         = __selector[1];    // $('#selector')


      if(jQuery(this.selector).length < 1)
          return;

      // -- * --
      $.SOW.helper.consoleLog('Init : ' + scriptInfo);
      // -- * --


      $.SOW.core.checkgroup.process(this.collection);
      return null;

    },



    /**
     *
     *  @process
     *  
     *
     **/
    process: function(_this) {

      _this.not('.js-checkgroup').addClass('js-checkgroup').each(function () {

        var _t              = jQuery(this),
            isUnique        = _t.attr('data-checkgroup-checkbox-unique') || _t.attr('data-checkgroup-checkbox-single') || 'false',
            ajaxURL         = _t.attr('data-checkgroup-ajax-url')               || '',
            ajaxMethod      = _t.attr('data-checkgroup-ajax-method')            || 'GET',
            ajaxParams      = _t.attr('data-checkgroup-ajax-params')            || '',
            toastMsg        = _t.attr('data-checkgroup-ajax-toast-success')     || '',
            toastPosition   = _t.attr('data-checkgroup-ajax-toast-position')    || 'top-center';


        // Custom Params
        var ajaxParamObj = { ajax:'true' };
        if(ajaxParams != '') {

          var ajax_params_arr = $.SOW.helper.params_parse(ajaxParams);
          for (var i = 0; i < ajax_params_arr.length; ++i) {
            ajaxParamObj[ajax_params_arr[i][0]] = ajax_params_arr[i][1];
          }

        }


        // each checkbox/radio click
        jQuery('input[type=checkbox], input[type=radio]', _t).each(function() {

          jQuery(this).on('click', function() {

            // Switch radios
            if(isUnique+'' == 'true')
              jQuery('input[type=checkbox]', _t).not(this).prop('checked', false);


            // Ajax Only!
            if(ajaxURL != '') {

              // get all elements from checkgroup
              var itemList = [], $i = 0;
              jQuery('input[type=checkbox], input[type=radio]', _t).each(function() {

                // Item optional params
                var itemParams      = jQuery(this).attr('data-params') || '';
                var itemParamsObj   = {};
                if(itemParams != '') {

                  var ajax_params_arr = $.SOW.helper.params_parse(itemParams);
                  for (var i = 0; i < ajax_params_arr.length; ++i) {
                    itemParamsObj[ajax_params_arr[i][0]] = ajax_params_arr[i][1];
                  }

                }
                // --

                // create object for each element
                itemList[$i++] = {
                  name:   jQuery(this).attr('name')   || '',
                  value:  jQuery(this).val()          || '',
                  active: jQuery(this).is(':checked') ? 1 : 0,
                  params: itemParamsObj
                };

              });

              // Ajax Values
              ajaxParamObj['items'] = itemList;

              // Debug
              if($.SOW.config.sow__debug_enable === true)
                console.log(ajaxMethod, ajaxParamObj);

              // Ajax Request
              $.SOW.core.checkgroup.ajaxRequest(ajaxURL, ajaxMethod, ajaxParamObj, toastMsg, toastPosition);
          
            }

          });

        });

      });

    },




    /**
     *
     *  @ajaxRequest
     *  
     *
     **/
    ajaxRequest: function(ajaxURL, ajaxMethod, ajaxParamObj, toastMsg, toastPosition) {

      // Ajax
      // JQUERY USED because is able to send data as multidimmensional 
      jQuery.ajax({
        url:            ajaxURL,
        type:           ajaxMethod || 'GET',
        data:           ajaxParamObj,
        debug:          false,
        success:    function(data) { 

          // Debug
          if($.SOW.config.sow__debug_enable === true)
            console.log(data);
                  
          if( toastMsg && typeof $.SOW.core.toast === 'object' ) {
            $.SOW.core.toast.destroy();
            $.SOW.core.toast.show('success', '', toastMsg, toastPosition, 1500, true);
          }

        }
      });

    }

  };


})(jQuery);