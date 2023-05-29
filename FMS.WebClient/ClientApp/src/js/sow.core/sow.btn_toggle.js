/**
 *
 *  [SOW] Btn Toggle
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.btn_toggle.init('.btn-toggle');
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
  var scriptInfo      = 'SOW Btn Toggle';


  $.SOW.core.btn_toggle = {


    /**
     *
     *  @config
     *
     *
     **/
    config: {
      method                          : 'GET',
      contentType                     : '',   // jQuery params
      dataType                        : '',   // jQuery params
      headers                         : '',   // jQuery params
      crossDomain                     : '',   // jQuery params
      data_params                     : {ajax:'true'},
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

      var __selector          = $.SOW.helper.__selector(selector);
      var __config            = $.SOW.helper.check_var(config);

      this.selector           = __selector[0];    // '#selector'
      this.collection         = __selector[1];    // $('#selector')
      this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;


      if(jQuery(this.selector).length < 1)
        return;


      // -- * --
      $.SOW.helper.consoleLog('Init : ' + scriptInfo);
      // -- * --


      // 1. Has no selector
      if(!this.selector) {
        $.SOW.core.btn_toggle.process($('.btn-toggle'));
        return this.collection;
      }

      // 2. Has selector
      return this.collection.each(function() {
          
        $.SOW.core.btn_toggle.process($(this));

      });

    },



    /**
     *
     *  @process
     *  

        <!-- toggle -->
        <button class="btn btn-secondary btn-toggle btn-icon btn-circle" data-toggle="popover" data-placement="left" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?">
            <span class="group-icon">
                <i class="mdi mdi-help-circle-outline"></i>
                <i class="mdi mdi-close"></i>
            </span>
        </button>

        <!-- Toggle fullscreen container -->
        <a href="javascript:;" class="btn-toggle" data-toggle-container-class="fullscreen" data-toggle-body-class="overflow-hidden" data-target="#footer">
            <span class="group-icon">
                <i class="fi fi-expand"></i>
                <i class="fi fi-shrink"></i>
            </span>
        </a>

     *
     **/
    process: function(_this) {

                  // bind once
      _this.not(".js-togglified").addClass('js-togglified').on("click", function(e) {


          // BUTTON TRIGGER - LIKE MOBILE MENU
          var _t                  = jQuery(this),
              _target             = _t.data('target') || _t.data('bs-target') || '',
              _targetRw           = _t.data('toggle-target')                  || '',  // because data-target might be used by collapse!
              _target2            = _t.data('target-2') || _t.data('bs-target-2') || '',
              _toastMessage       = _t.data('toast-success-message')          || '',
              _toastSuccessType   = _t.data('toast-success-type')             || 'success', // default|success|danger[error]|warning|info
              _toastPos           = _t.data('toast-success-position')         || 'top-center',
              _temporized         = _t.data('toggle-temporized')              || 0,
              _toggleClass        = _t.data('toggle-container-class')         || '',  // toggle class for a specific container
              _toggleClass2       = _t.data('toggle-container-class-2')       || '',  // toggle class for a specific container
              _requestOn          = _t.data('toggle-ajax-url-on')             || '',  // send request to the server when on
              _requestOff         = _t.data('toggle-ajax-url-off')            || '',  // send request to the server when off
              _requestMethod      = _t.data('toggle-ajax-method')             || $.SOW.core.btn_toggle.config.method, // send request to the server when off
              _bodyToggleClass    = _t.data('toggle-body-class')              || '';  // toggle class for body


          // Stop!
          if(_t.hasClass('disabled'))
              return;

          // example: Like button - stop if off is not set but on is set! 
          // Means only `LIKE` allowed!
          if(_requestOff == '' && _requestOn != '' && _t.hasClass('active'))
              return null;


          // set|uset active class
          _t.toggleClass('active');


          if(_target == '' && _targetRw != '')
            _target = _targetRw;


          if(_target != '' && _toggleClass != '') {

            jQuery(_target).toggleClass(_toggleClass);
            e.preventDefault();

          }

          if(_target2 != '' && _toggleClass != '')
            jQuery(_target2).toggleClass(_toggleClass2);


          if(_bodyToggleClass != '') {

            $.SOW.globals.elBody.toggleClass(_bodyToggleClass);
            e.preventDefault();

          }



          if(_temporized > 0) {

            setTimeout(function() {

              if(_target != '' && _toggleClass != '')
                  jQuery(_target).removeClass(_toggleClass);

              if(_target2 != '' && _toggleClass2 != '')
                  jQuery(_target2).removeClass(_toggleClass2);

              if(_bodyToggleClass != '')
                  $.SOW.globals.elBody.removeClass(_bodyToggleClass);
              
              _t.removeClass('active disabled');

            }, Number(_temporized));


              // NO AJAX REQUESTS IF _temporized SET
              // [WHY?] 11:56 AM Tuesday, November 05, 2019
              // return;
          }







          /**

              Ajax Request
              ---------------------------------------------------------------

          **/
          if(_requestOff == '' && _requestOn == '')
              return null;


          e.preventDefault();
          var _url = _t.hasClass('active') ? _requestOn : _requestOff;


          // Ajax Request
          jQuery.ajax({
              url:            _url,
              type:           _requestMethod,
              data:           $.SOW.core.btn_toggle.config.data_params,
              contentType:    $.SOW.core.btn_toggle.config.contentType,
              dataType:       $.SOW.core.btn_toggle.config.dataType,
              headers:        $.SOW.core.btn_toggle.config.headers,
              crossDomain:    $.SOW.core.btn_toggle.config.crossDomain,

              beforeSend: function() {

                $.SOW.helper.consoleLog('SOW Btn Toggle [Ajax][Request Sent]: ' + _url);

              },

              error:  function(XMLHttpRequest, textStatus, errorThrown) {

                if(typeof $.SOW.core.toast === 'object') {
                  $.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', 'bottom-center', 0, true);
                } else {
                  alert("[404] Unexpected internal error!");
                }

              },

              success: function(data) {

                $.SOW.helper.consoleLog('SOW Btn Toggle [Ajax][Server Response]: ' + data);


                // OPk, disable Like button!
                if(_requestOff == '' && _requestOn != '')
                  _t.addClass('disabled');


                if(_toastMessage != '' && typeof $.SOW.core.toast === 'object')
                    $.SOW.core.toast.show(_toastSuccessType, '', _toastMessage, _toastPos, ( (_temporized > 0) ? 3500 : 1500 ), true);

              }

          });


      });

    },


  };


})(jQuery);