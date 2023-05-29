/**
 *
 *  [SOW] Toast
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.toast.init('.toast-on-load');
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
  var scriptInfo      = 'SOW Toast';



  $.SOW.core.toast = {


    /**
     *
     *  @config
     *
     *
     **/
    config: {

      animation: 'fade'
    
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
        $.SOW.core.toast.toast_on_load('.toast-on-load');
        return this.collection;
      }

      // 2. Has selector
      return this.collection.each(function() {
          
        $.SOW.core.toast.toast_on_load($(this));

      });

    },



    /**
     *
     *  @show
     *  Direct callable
     *

      $.SOW.core.toast.show(type, title, body, pos, delay, fill);
          type            = '', success, danger, warning, info
          title           = toast title   (optional)
          body            = toast body    (required)
          pos             = top-left|start, top-end|right, bottom-left|start, bottom-end|right, top-center, bottom-center
          delay           = autoclose in ms
          fill            = background color [true|false]



      1. NO AUTOHIDE
          $.SOW.core.toast.show('', 'Default', 'Body Text Here', 'top-end');
          $.SOW.core.toast.show('danger', 'Error', 'Body Text Here', 'top-end');
          $.SOW.core.toast.show('success', 'Success', 'Body Text Here', 'top-end');
          $.SOW.core.toast.show('warning', 'Warning', 'Body Text Here', 'top-end');
          $.SOW.core.toast.show('info', 'Info', 'Body Text Here', 'top-end');

      2. AUTOHIDE
          $.SOW.core.toast.show('', 'Default', 'Body Text Here', 'top-end', 3000);
          $.SOW.core.toast.show('danger', 'Error', 'Body Text Here', 'top-end', 3000);
          $.SOW.core.toast.show('success', 'Success', 'Body Text Here', 'top-end', 3000);
          $.SOW.core.toast.show('warning', 'Warning', 'Body Text Here', 'top-end', 3000);
          $.SOW.core.toast.show('info', 'Info', 'Body Text Here', 'top-end', 3000);

      3. NO TITLE
          $.SOW.core.toast.show('', '', 'Body Text Here', 'top-end');
          $.SOW.core.toast.show('danger', '', 'Body Text Here', 'top-end');
          $.SOW.core.toast.show('success', '', 'Body Text Here', 'top-end');
          $.SOW.core.toast.show('warning', '', 'Body Text Here', 'top-end');
          $.SOW.core.toast.show('info', '', 'Body Text Here', 'top-end');

      1. NO TITLE + BACKGROUND FILL
          $.SOW.core.toast.show('', '', 'Body Text Here', 'top-end', 0, true);
          $.SOW.core.toast.show('danger', '', 'Body Text Here', 'top-end', 0, true);
          $.SOW.core.toast.show('success', '', 'Body Text Here', 'top-end', 0, true);
          $.SOW.core.toast.show('warning', '', 'Body Text Here', 'top-end', 0, true);
          $.SOW.core.toast.show('info', '', 'Body Text Here', 'top-end', 0, true);


      Clear all toasts
          $.SOW.core.toast.destroy();

     *  
     *
     **/
    show: function(t_type, t_title, t_body, t_pos, t_delay, t_bg_fill) {

      var t_type      = typeof t_type     !== 'undefined' ? t_type    : '',       // default|success|danger[error]|warning|info
          t_title     = typeof t_title    !== 'undefined' ? t_title   : '',
          t_body      = typeof t_body     !== 'undefined' ? t_body    : '',
          t_pos       = typeof t_pos      !== 'undefined' ? t_pos     : 'top-left',
          t_delay     = typeof t_delay    !== 'undefined' ? t_delay   : 0,
          t_bg_fill   = typeof t_bg_fill  !== 'undefined' ? t_bg_fill : false;

      if(t_type == 'error')
        var t_type = 'danger';

      else if(t_type == 'default')
        var t_type = '';

      // In case body is empty but we have the title - switch between them!
      if(t_body == '' && t_title != '') {
        var t_body      = t_title;
        var t_title     = '';
      }


      // --


      // top right
      if(t_pos == 'top-right' || t_pos == 'top-end') {
        var _posClass   = 'fixed-top end-0';
        var _wrapperID  = 'wrapper_toast_tr';
        var t_spacing   = 'mt-3 me-4';
      }

      // bottom right
      else if(t_pos == 'bottom-right' || t_pos == 'bottom-end') {
        var _posClass   = 'fixed-bottom end-0';
        var _wrapperID  = 'wrapper_toast_br';
        var t_spacing   = 'mb-3 me-4';
      }

      // top left
      else if(t_pos == 'top-left' || t_pos == 'top-start') {
        var _posClass   = 'fixed-top start-0';
        var _wrapperID  = 'wrapper_toast_tl';
        var t_spacing   = 'mt-3 ms-4';
      }

      // bottom left
      else if(t_pos == 'bottom-left' || t_pos == 'bottom-start') {
        var _posClass   = 'fixed-bottom start-0';
        var _wrapperID  = 'wrapper_toast_bl';
        var t_spacing   = 'mb-3 ms-4';
      }

      // top center
      if(t_pos == 'top-center') {
        var _posClass   = 'fixed-top mx-auto';
        var _wrapperID  = 'wrapper_toast_tc';
        var t_spacing   = 'mt-3';
      }


      // bottom center
      if(t_pos == 'bottom-center') {
        var _posClass   = 'fixed-bottom mx-auto';
        var _wrapperID  = 'wrapper_toast_bc';
        var t_spacing   = 'mb-3';
      }


      // --

      // Toast icon indicator
      var t_icon      = (t_type != '') ? '<i class="float-start rounded-circle bg-' + t_type + '" style="width:15px;height:15px;margin-top:3px"></i>' : '';

      // Autohide in ms
      var t_delay_bs  = (t_delay > 0) ? ' data-delay="' + t_delay + '" data-autohide="true"' : ' data-autohide="false" ';

      // Close Button & Progress
      if(t_delay > 0) {

          var t_close         = '';
          var t_progress      = '<div style="margin-top:-1px"><div class="progress bg-transparent" style="height:1px"><div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 100%; background-color: #121212; opacity:0.2"></div></div></div>';

      } else {

        var _btnCloseStyle  = (t_title == '') ? ' font-size:10px; margin-top:-1px; ' : '';
        var t_close         = '<button type="button" style="' + _btnCloseStyle + '" class="close float-end" data-bs-dismiss="toast" aria-label="Close"><span class="fi fi-close" style="font-size:16px" aria-hidden="true"></span></button>';
        var t_progress      = '';

      }


      // --

      // Create specific main container if not exists (to avoid destroying current toasts)
      if(jQuery('#'+_wrapperID).length < 1)
        $.SOW.globals.elBody.append('<div id="' + _wrapperID + '" style="max-width:330px;max-height:75vh;z-index:9999;" class="w-100 scrollable-vertical rounded ' + _posClass + '"></div>');


      // --


      // BUILD HTML TOAST
      var t_main_class    = (t_bg_fill === true && t_type != '') ? 'border-0 bg-'+t_type : 'bg-white';
      var _toastBody      = '<div class="toast bg-gradient borer-0 js-toast '+$.SOW.core.toast.config.animation+' '+t_main_class+' '+t_spacing+'" role="alert" aria-live="polite" aria-atomic="true" '+t_delay_bs+'>';


      // No title
      if(t_title != '') {

        // remove icon on fill
        t_icon = (t_bg_fill === true) ? '' : t_icon;

        var t_header_class = (t_bg_fill === true && t_type != '') ? ' bg-transparent overlay-dark overlay-opacity-1 text-white' : '';

        var _toastBody = _toastBody + '<div class="toast-header px-3'+t_header_class+'">'

          + '<div class="w-100 text-truncate">'
              + t_icon
              + '<strong>' + t_title + '</strong>'
          + '</div>'

          + '<div class="text-align-end" style="width:180px">'
              //+ '<small class="d-inline-block text-truncate" style="paddint-top:6px;width:80px">11 mins ago</small>'
              + t_close
          + '</div>'

        + '</div>';

      }

      // Add close button to body, because we have no title
      var _closeBtnBody = (t_title == '') ? t_close : '';
      
      // Add Color to body text if no title available
      if(t_title == '') {
          
        if(t_bg_fill === true && (t_type == 'success-soft' || t_type == 'danger-soft' || t_type == 'info-soft' || t_type == 'warning-soft' || t_type == 'primary-soft' || t_type == 'pink-soft' || t_type == 'indigo-soft')) {
            var t_txt_color = '';
        } else  {
            var t_txt_color = (t_bg_fill === true && t_type != '') ? 'text-white' : 'text-'+t_type;
        }

        var t_body = '<div class="'+t_txt_color+'">' + t_body + '</div>';

      } else {

        var t_body = (t_bg_fill === true && t_type != '') ? '<div class="text-white" style="padding-top:5px; padding-bottom:10px;">' + t_body + '</div>' : t_body;
      
      }

      var _toastBody = _toastBody + t_progress 
          + '<div class="toast-body p-3">' + _closeBtnBody + t_body + '</div>'
      + '</div>';

      // Prepend
      jQuery('#'+_wrapperID).prepend(_toastBody);

      // Reinit toast
      jQuery('#'+_wrapperID+' .js-toast:not(.hide)').toast('show');


      // --


      // Animate progress bar
      if(t_delay > 0)
        jQuery('#'+_wrapperID + ' .js-toast:not(.hide):first-child .progress>.progress-bar').filter(':not(:animated)').stop().animate({width:'100%'}, 0).stop().animate({width:'0%'}, t_delay);


      // --


      // Cleanup
      setTimeout(function () {

        jQuery('#'+_wrapperID + ' .js-toast.hide').remove();

      }, t_delay + 1500);

    },





    /**
     *
     *  @toast_template
     *

      Toast on page load, by HTML code

      <!--
          
          Toast On Load
          Add anywhere on your HTML page to show toas on load

              data-type           = '', success, danger, warning, info
              data-title          = toast title   (optional)
              data-body           = toast body    (required)
              data-pos            = top-left, top-right, bottom-left, bottom-right, top-center, bottom-center
              data-delay          = autoclose in ms
              data-fill           = background color fill [true|false]

      -->
      <div class="hide toast-on-load"
          data-type="danger" 
          data-title="" 
          data-body="Welcome to Smarty" 
          data-pos="top-right" 
          data-delay="4000" 
          data-fill="true" 
      ></div>

     *
     **/
    toast_on_load: function(_this) {

      _this.each(function() {

        var _t      = jQuery(this),
            _type   = _t.data('toast-type')         || '',
            _title  = _t.data('toast-title')        || '',
            _body   = _t.data('toast-body')         || '',
            _delay  = _t.data('toast-delay')        || 0,
            _pos    = _t.data('toast-pos')          || 'top-right',
            _fill   = _t.data('toast-fill')         || true;

        // safe correction
        _fill = (_fill != true) ? false : true;

        // show toast
        $.SOW.core.toast.show(_type, _title, _body, _pos, _delay, _fill);

        // not needed
        // remove to avoid triggering again on ajax loads!
        _t.remove();

      });

    },



    /**
     *
     *  @clear
     *  $.SOW.core.toast.destroy();
     **/
    destroy: function() {

      jQuery('#wrapper_toast_tr, #wrapper_toast_br, wrapper_toast_tl, #wrapper_toast_bl, #wrapper_toast_tc, #wrapper_toast_bc').remove();

    }

  }

})(jQuery);