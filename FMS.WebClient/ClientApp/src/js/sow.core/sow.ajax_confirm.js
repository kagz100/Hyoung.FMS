/**
 *
 *  [SOW] Ajax Confirm
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.ajax_confirm.init('.js-ajax-confirm');
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
  var scriptInfo      = 'SOW Ajax Confirm';



  $.SOW.core.ajax_confirm = {


    /**
     *
     *  @config
     *
     *
     **/
    config: {

      method                          : 'GET',    // (ajax mode only)
      contentType                     : '',       // jQuery params (ajax mode only)
      dataType                        : '',       // jQuery params (ajax mode only)
      headers                         : '',       // jQuery params (ajax mode only)
      crossDomain                     : '',       // jQuery params (ajax mode only)
      data_params                     : {ajax:'true'},// jQuery params (ajax mode only)

      confirm_container               : '#sow_ajax_confirm',
      confirm_size                    : '',
      confirm_centered                : false,

      confirm_type                    : '',           // primary|secondary|success|warning|danger|info; empty = regular/clean
      confirm_mode                    : 'regular',    // ajax|regular
      confirm_title                   : 'Please Confirm',
      confirm_body                    : 'Are you sure?',

      btn_class_yes                   : 'btn-sm btn-primary',
      btn_class_no                    : 'btn-sm btn-light',
      btn_text_yes                    : 'Confirm',
      btn_text_no                     : 'Cancel',
      btn_icon_yes                    : 'fi fi-check',
      btn_icon_no                     : 'fi fi-close',

      /* 
          callback_example = function(el, data) {
              // el               = link clicked              $(this)
              // data             = server response           (html|string)
          }
      */
      callback_function               : ''

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
      this.selector_orig      = __selector[2];    // $('#selector') // without ajax container prefix
      this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;


      if(jQuery(this.selector).length < 1)
        return;


      // -- * --
      $.SOW.helper.consoleLog('Init : ' + scriptInfo);
      // -- * --


      // Create modal container
      $.SOW.core.ajax_confirm.ajax_confirm_template();


      // 1. Has no selector
      if(!this.selector) {
        $.SOW.core.ajax_confirm.ajax_confirm($('a.js-ajax-confirm'));
        return this.collection;
      }

      // 2. Has selector
      return this.collection.each(function() {
          
        $.SOW.core.ajax_confirm.ajax_confirm($(this));

      });

    },



    /**
     *
     *  @ajax_confirm
     *

    <a href="URL-HERE" 
        class="js-ajax-confirm"

        data-ajax-confirm-size="modal-md" 
        data-ajax-confirm-centered="false" 

        data-ajax-confirm-callback-function=""
        data-ajax-confirm-type="ajax" 
        data-ajax-confirm-method="GET" 

        data-ajax-confirm-title="Please Confirm" 
        data-ajax-confirm-body="Are you sure? Delete this item?" 

        data-ajax-confirm-btn-yes-text="Confirm" 
        data-ajax-confirm-btn-yes-class="btn-sm btn-primary" 
        data-ajax-confirm-btn-yes-icon="fi fi-check" 

        data-ajax-confirm-btn-no-text="Cancel" 
        data-ajax-confirm-btn-no-class="btn-sm btn-light" 
        data-ajax-confirm-btn-no-icon="fi fi-close"

        rel="nofollow">
        Confirm
    </a>
        
        data-ajax-confirm-size="modal-sm|modal-md|modal-lg|modal-full"

        data-ajax-confirm-callback-function="_myCustomFunc"     (optional - your custom function called on load)
        Example: 
            var _myCustomFunc = function(el, data) {
                el = button element
                data = ajax result from server
                alert('My Function Called! Do something like... reinit some plugins');
            }

     *  
     *
     **/
    ajax_confirm: function(_this) {

      var _selector           = this.selector,
          _selector_orig      = this.selector_orig,
          _confirm_container  = this.config.confirm_container,
          _confirm_size       = this.config.confirm_size,
          _confirm_centered   = this.config.confirm_centered,
          _confirm_callback   = this.config.callback_function,

          confirm_method      = this.config.method,
          confirm_mode        = this.config.confirm_mode,
          confirm_type        = this.config.confirm_type,
          confirm_title       = this.config.confirm_title,
          confirm_body        = this.config.confirm_body,

          btn_class_yes       = this.config.btn_class_yes,
          btn_class_no        = this.config.btn_class_no,
          btn_text_yes        = this.config.btn_text_yes,
          btn_text_no         = this.config.btn_text_no,
          btn_icon_yes        = this.config.btn_icon_yes,
          btn_icon_no         = this.config.btn_icon_no;


      var _href       = _this.attr('href') || '',
          _href_data  = _this.data('href') || '';

      if(_href_data != '') _href = _href_data;
      if(_href == '') return;

      _this.attr('data-href', _href);
      _this.attr('href', '#');

      _this.not('.js-ajaxconfirmified').addClass('js-ajaxconfirmified').on('click', function(e) {
          e.preventDefault();

          var _t                  = jQuery(this),
              _href               = _t.data('href')                           || '#',

              _target             = _t.data('ajax-confirm-container')         || _confirm_container,  // modal (id or class)
              _modal_confirm_size = _t.data('ajax-confirm-size')              || _confirm_size,       // modal-sm, modal-md, modal-lg , modal-full
              _modal_centered     = _t.data('ajax-confirm-centered')          || _confirm_centered,   // true|false
              _confirmCallback    = _t.data('ajax-confirm-callback-function') || _confirm_callback,   // custom function
              _confirmType        = _t.data('ajax-confirm-type')              || confirm_type,        // confirmation type: danger|warning|etc. empty for normal/clean
              _confirmMode        = _t.data('ajax-confirm-mode')              || confirm_mode,        // confirmation type: regular|ajax
              _confirmMethod      = _t.data('ajax-confirm-method')            || confirm_method,      // confirmation method: GET|POST
              
              _confirmSuccessEl       = _t.data('ajax-confirm-success-target')        || '',                  // element
              _confirmSuccessElAction = _t.data('ajax-confirm-success-target-action') || '',                  // action: remove|addClass|removeClass|toggleClass
              _confirmSuccessElClass  = _t.data('ajax-confirm-success-target-class')  || '',                  // class to remove or add

              _confirmTitle       = _t.data('ajax-confirm-title')             || confirm_title,       // modal title
              _confirmBody        = _t.data('ajax-confirm-body')              || confirm_body,        // message | question
              
              _confirmBtnYesTxt   = _t.data('ajax-confirm-btn-yes-text')      || btn_text_yes,        // button text
              _confirmBtnYesClass = _t.data('ajax-confirm-btn-yes-class')     || btn_class_yes,       // button class
              _confirmBtnYesIcon  = _t.data('ajax-confirm-btn-yes-icon')      || btn_icon_yes,        // button icon. eg: fi fi-check

              _confirmBtnNoTxt    = _t.data('ajax-confirm-btn-no-text')       || btn_text_no,         // button text
              _confirmBtnNoClass  = _t.data('ajax-confirm-btn-no-class')      || btn_class_no,        // button class
              _confirmBtnNoIcon   = _t.data('ajax-confirm-btn-no-icon')       || btn_icon_no;         // button icon. eg: fi fi-check
              


          // Ignore by request!
          if(_t.hasClass('js-ignore'))
              return;


          // Always create new modal
          $.SOW.core.ajax_confirm.ajax_confirm_template();

          // Close any open dropdown
          jQuery('.dropdown-menu:not(.dropdown-menu-hover)').parent().find('a[data-bs-toggle="dropdown"][aria-expanded="true"]').attr('aria-expanded', 'false').dropdown('hide');


          // Add size class by request
          jQuery('.modal-dialog', _target).removeClass('modal-sm, modal-md, modal-lg, modal-xlg, modal-full bg-primary-soft bg-secondary-soft bg-success-soft bg-warning-soft bg-danger-soft bg-pink-soft bg-indigo-soft bg-purple-soft').addClass(_modal_confirm_size);


          // Header Bg Color
          jQuery('.modal-header', _target).removeClass('bg-primary-soft bg-secondary-soft bg-success-soft bg-warning-soft bg-danger-soft bg-info-soft bg-pink-soft bg-indigo-soft bg-purple-soft');
          if(_confirmType != '')
              jQuery('.modal-header', _target).addClass('bg-'+_confirmType+'-soft');


          // centered
          (_modal_centered+'' == 'true') ? jQuery('.modal-dialog', _target).addClass('modal-dialog-centered') : jQuery('.modal-dialog', _target).removeClass('modal-dialog-centered');


          // Reset
          jQuery('.btn-confirm-yes', _target).attr('class', '').attr('class', 'btn btn-confirm-yes');
          jQuery('.btn-confirm-no', _target).attr('class', '').attr('class', 'btn btn-confirm-no');
          jQuery('.btn-confirm-yes>i', _target).remove();
          jQuery('.btn-confirm-no>i', _target).remove();
          jQuery(_target + ' .modal-footer').removeClass('hide');


          // Add Icons
          if(_confirmBtnYesIcon.length > 1)
              var _confirmBtnYesTxt = '<i class="' + _confirmBtnYesIcon + '"></i> ' + _confirmBtnYesTxt;

          if(_confirmBtnNoIcon.length > 1)
              var _confirmBtnNoTxt = '<i class="' + _confirmBtnNoIcon + '"></i> ' + _confirmBtnNoTxt;

          jQuery('.btn-confirm-yes', _target).attr('href', _href).html(_confirmBtnYesTxt).addClass(_confirmBtnYesClass);
          jQuery('.btn-confirm-no', _target).html(_confirmBtnNoTxt).addClass(_confirmBtnNoClass);

          jQuery('.modal-title', _target).html(_confirmTitle);
          jQuery('.modal-body', _target).html(_confirmBody);

          jQuery(_target).modal('show');

          // CONFIRMATION AJAX REQUEST
          if(_confirmMode == 'ajax') {

              jQuery('.btn-confirm-yes', _target).unbind('click').on("click", function(e) {
                  e.preventDefault();

                  jQuery.ajax({
                      url:            _href,
                      type:           _confirmMethod,
                      data:           $.SOW.core.ajax_confirm.config.data_params,
                      contentType:    $.SOW.core.ajax_confirm.config.contentType,
                      dataType:       $.SOW.core.ajax_confirm.config.dataType,
                      headers:        $.SOW.core.ajax_confirm.config.headers,
                      crossDomain:    $.SOW.core.ajax_confirm.config.crossDomain,

                      beforeSend: function() {

                          $.SOW.helper.loadingSpinner('show', _target + ' .modal-content');
                          jQuery('.btn-confirm-yes', _target).addClass('disabled').prop('disabled', true);

                      },

                      error:  function(XMLHttpRequest, textStatus, errorThrown) {

                          $.SOW.helper.loadingSpinner('hide');
                          jQuery('.btn-confirm-yes', _target).removeClass('disabled').prop('disabled', false);

                          if(typeof $.SOW.core.toast === 'object') {

                              $.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!',  'top-center', 0, true);
                              jQuery(_target).modal('hide');

                          } else {
                              alert("[404] Unexpected internal error!");
                          }

                      },

                      success: function(data) {

                          $.SOW.helper.loadingSpinner('hide');

                          jQuery(_target + ' .modal-footer').addClass('hide');
                          jQuery(_target + ' .modal-content .modal-body').html('<div class="js-modal-confirm-ok py-5 fs-1 text-center animate-bouncein"><i class="'+$.SOW.config.sow__icon_check+' text-muted"></i></div>');
                          jQuery('.btn-confirm-yes', _target).removeClass('disabled').prop('disabled', false);

                          setTimeout(function(){

                              jQuery(_target).modal('hide');

                          },500);
                          

                          if(_confirmCallback != '' && typeof $.SOW.helper.executeFunctionByName === 'function')
                              $.SOW.helper.executeFunctionByName(_confirmCallback, window, _t, data);


                          // Success: actions
                          if(_confirmSuccessEl != '') {

                              if(_confirmSuccessElAction == 'remove')
                                  jQuery(_confirmSuccessEl).remove();

                              else if(_confirmSuccessElAction == 'addClass')
                                  jQuery(_confirmSuccessEl).addClass(_confirmSuccessElClass);

                              else if(_confirmSuccessElAction == 'removeClass')
                                  jQuery(_confirmSuccessEl).removeClass(_confirmSuccessElClass);

                              else if(_confirmSuccessElAction == 'toggleClass')
                                  jQuery(_confirmSuccessEl).toggleClass(_confirmSuccessElClass);

                          }


                      }
                  });

              });

          } else {

              // Callback Function
              if(_confirmCallback != '' && typeof $.SOW.helper.executeFunctionByName === 'function') {
                  jQuery('.btn-confirm-yes', _target).unbind('click').on('click', function(e) {
                      e.preventDefault();
                      $.SOW.helper.executeFunctionByName(_confirmCallback, window, _t); 
                  });
              }


              jQuery('.btn-confirm-yes', _target).unbind('click').on("click", function(e) {
                  jQuery(_target).modal('hide');
              });

          }


      });

      return true;

    },





    /**
     *
     *  @ajax_confirm_template
     *
     *
     **/
    ajax_confirm_template: function() {

      // remove last
      jQuery(this.config.confirm_container).remove();
      jQuery('.modal-backdrop').remove(); // (because of vendors like nestable)

      var confirm_container = this.config.confirm_container.replace('#', ''),
          _tpl = '<div class="modal fade" id="' + confirm_container + '" role="dialog" tabindex="-1" aria-labelledby="modal-title-confirm" aria-hidden="true">'
                  + '<div class="modal-dialog '+ this.config.confirm_size +'" role="document">'

                      + '<div class="modal-content">'

                          + '<div class="modal-header border-0">'
                              
                              + '<h5 id="modal-title-confirm" class="modal-title" style="font-size:18px">'
                                  + this.config.confirm_title
                              + '</h5>'

                              + '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'

                          + '</div>'

                          + '<div class="modal-body p-3">'
                              
                              + this.config.confirm_body

                          + '</div>'

                          + '<div class="modal-footer border-top-0">'

                              + '<a href="#" class="btn py-3 btn-confirm-yes '+ this.config.btn_class_yes +'">'
                                  + this.config.btn_text_yes
                              + '</a>'

                              + '<a href="#" class="btn py-3 btn-confirm-no '+ this.config.btn_class_no +'" data-bs-dismiss="modal">'
                                  + this.config.btn_text_no
                              + '</a>'

                          + '</div>'

                      + '</div>'

                  + '</div>'
              + '</div>';


      $.SOW.globals.elBody.append(_tpl);
      $(this.config.confirm_container).modal('handleUpdate');

      // clear
      _tpl = null;

    },




    /**
     *
     *  @Return Selector
     *
     *
     **/
    __selector: function() {
      return this.selector_orig;
    }


  }

})(jQuery);