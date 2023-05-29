/**
 *
 *  [SOW] Form Validate
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.form_validate.init('form.bs-validate');
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
  var scriptInfo      = 'SOW Form Validate';




  $.SOW.core.form_validate = {


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


      // -- * --
      $.SOW.helper.consoleLog('Init : ' + scriptInfo);
      // -- * --


      // 1. Has no selector
      if(!this.selector) {
        $.SOW.core.form_validate.form_validate($('form.bs-validate'));
        return this.collection;
      }

      // 2. Has selector
      return this.collection.each(function() {
          
        $.SOW.core.form_validate.form_validate($(this));

      });

    },



    /**
     *
     *  @form_validate
     *
     *  
     *
     **/
    form_validate: function(_this) {

      var _selector       = this.selector;

      // Stop if ajax form already in action!
      if(jQuery(_selector).hasClass('.js-ajax') && typeof $.SOW.core.ajax_form === 'object') {
          $.SOW.helper.consoleLog('Ajax Form Detected! ' + scriptInfo + ' Skipped!');
          return;
      }


      _this.submit(function(e) {

        var _t                  = jQuery(this),
            _formID             = _t.attr('id')                         || '',
            _scrollErrUp        = _t.attr('data-error-scroll-up')       || 'false',
            _toast_text         = _t.data('error-toast-text')           || '',          // toast alert for .bs-validate
            _toast_delay        = _t.data('error-toast-delay')          || 0,           // toast alert for .bs-validate
            _toast_pos          = _t.data('error-toast-position')       || "top-right"; // toast alert for .bs-validate

        // Assign a random id if not exist
        if(_formID == '') {
          var _formID = 'js_' + $.SOW.helper.randomStr(10);
          _t.attr('id', _formID);
        }

        // Check if form already handled by ajax
        if(typeof $.SOW.core.ajax_form === 'object' && _t.hasClass('js-ajax'))
          return;

        var _form = document.getElementById(_formID);

        // hide all errors info
        jQuery('.bs-validate-info', _t).addClass('hide hide-force');

        if(typeof $.SOW.core.toast === 'object')
          $.SOW.core.toast.destroy();


        if(!_form.checkValidity()) {


          // -- message|toast ---
          if(_toast_text != '') {

            if(typeof $.SOW.core.toast === 'object') {
                
              if(Number(_toast_delay) < 1) var _toast_delay = 4000;
              $.SOW.core.toast.show('danger', '', _toast_text, _toast_pos, Number(_toast_delay), true);

            } else {

              alert(_toast_text);

            }

          } else {

            // show error info
            jQuery('.bs-validate-info', _t).removeClass('hide hide-force'); // show error info
            
            // error info delay timeout
            var _delay = jQuery('.bs-validate-info', _t).data('error-alert-delay') || 3000;

            // hide error info in X seconds
            setTimeout(function() {
              jQuery('.bs-validate-info', _t).addClass('hide hide-force'); 
            }, Number(_delay));

          }
          // -- -- -- --

          // Focus invalid element and scroll
          jQuery('.form-control:invalid', _t).first().focus();

          // Do not animate inside modal!
          if(typeof $.SOW.helper.scrollAnimate === "function" && (_scrollErrUp+'' == 'true') && !jQuery('.modal').hasClass('show')) {
            var _formEl = jQuery('input:invalid, select:invalid, textarea:invalid', _t);
            $.SOW.helper.scrollAnimate(_formEl, 0, false, 200);
          }
          // -- -- -- --

          e.preventDefault();
          e.stopPropagation();

        }  else {

          // disable on submit to avoid multiple click
          jQuery('.btn-bs-validate').attr('disabled', true);

          if(typeof $.SOW.core.toast === 'object')
            $.SOW.core.toast.destroy();

        }

        _t.addClass('was-validated');


      });


    },

  }

})(jQuery);