/**
 *
 *  [SOW] Ajax Modal
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.ajax_modal.init('.js-ajax-modal');
 * 
    // Programtically Create Modal  :             url , 'modal-md', 'true' (centered), 'backdrop' (optional), callback (optional)
    $.SOW.core.ajax_modal.createFromThinAir(modalUrl, 'modal-lg', 'true', 'static', callback);

    // Programtically Attach Element/Link ( $('.selector') or '.selector' )
    $.SOW.core.ajax_modal.attach(selector);

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
  var scriptInfo      = 'SOW Ajax Modal';



  $.SOW.core.ajax_modal = {


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

      modal_container                 : '#sow_ajax_modal',
      modal_size                      : 'modal-md',
      modal_centered                  : 'false',

      /* 
          callback_example = function(el, data, modal_container) {
              // el               = element               $(this)
              // data             = server response           (html|string)
              // modal_container = container to push data     (string:#middle)
          }
      */
      callback_function   : ''
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
      $.SOW.core.ajax_modal.ajax_modal_template();



      // 1. Has no selector
      if(!this.selector) {
        $.SOW.core.ajax_modal.ajax_modal($('.js-ajax-modal'));
        return $('.js-ajax-modal');
      }

      // 2. Has selector
      return this.collection.each(function() {
          
        $.SOW.core.ajax_modal.ajax_modal($(this));

      });

    },



    /**
     *
     *  @ajax_modal
     *
     *  
     *
     **/
    ajax_modal: function(_this) {

      var _selector           = this.selector,
          _selector_orig      = this.selector_orig,
          _modal_container    = this.config.modal_container,
          _modal_size         = this.config.modal_size,
          _callback           = this.config.callback_function,
          _method             = this.config.method,
          _modal_centered     = this.config.modal_centered;

      // precech to avoid useless bind. checked again on click!
      var _href               = _this.attr('href')    || '',
          _href_data          = _this.data('href')    || '';

      if(_href_data != '') _href = _href_data;
      if(_href == '') return;


      _this.not('.js-modalified').addClass('js-modalified').on('click', function(e) {
          e.preventDefault();

          var _t                  = jQuery(this),
              _href               = _t.attr('href')                           || '',
              _href_data          = _t.data('href')                           || '',
              _modalType          = _t.attr('data-ajax-modal-type')           || '',              // video (or more in the future)
              _target             = _t.data('ajax-modal-container')           || _modal_container,
              _modal_callback     = _t.data('ajax-modal-callback-function')   || _callback,       // callback function to call, on modal load
              _modal_size         = _t.data('ajax-modal-size')                || _modal_size,     // modal-sm, modal-md, modal-lg , modal-full
              _modal_backgdrop    = _t.data('ajax-modal-backdrop')            || '',              // data-backdrop="static"   -  do not close on click
              _modal_centered     = _t.data('ajax-modal-centered')            || _modal_centered, // true|false
              _method             = _t.data('ajax-modal-method')              || _method;         // true|false

          if(_href_data != '') _href = _href_data;
          if(_href == '' || _href == '#' || _href == 'javascript:;') return;
          if(_t.hasClass('js-ignore')) return; // Ignore by request!


          /* 
              Empty ajax modal on close
              else, plugins like selectpicker will not refresh 
          */  jQuery(_target + ' .modal-content').empty();


          // Close any open dropdown
          jQuery('.dropdown-menu:not(.dropdown-menu-hover)').parent().find('a[data-bs-toggle="dropdown"][aria-expanded="true"]').attr('aria-expanded', 'false').dropdown('hide');

          // Call the trigger
          $.SOW.core.ajax_modal.modalAjaxShow(_href, _target, _modal_size, _modal_centered, _modal_backgdrop, _modal_callback, _method, _modalType);

      }); 


      // Modals on load
      $.SOW.core.ajax_modal.ajax_modal_onLoad();

    },

      /**
       *
       *  Ajax Process
       *  :: Helper
       *
       **/
      modalAjaxShow: function(_href, _target, _modal_size, _modal_centered, _modal_backgdrop, _modal_callback, _method, _modalType) {

        var _modal_size         = typeof _modal_size        !== 'undefined' ? _modal_size       : this.config.modal_size;
        var _modal_centered     = typeof _modal_centered    !== 'undefined' ? _modal_centered   : this.config.modal_centered;
        var _modal_backgdrop    = typeof _modal_backgdrop   !== 'undefined' ? _modal_backgdrop  : '';
        var _modal_callback     = typeof _modal_callback    !== 'undefined' ? _modal_callback   : '';


        // Create modal container (if not exists)
        $.SOW.core.ajax_modal.ajax_modal_template();


        if(_href == '#' || _href == '') return;
        if(_target == '')               var _target = this.config.modal_container;
        if(_modal_size == '')           var _modal_size = this.config.modal_size;  // modal-lg , modal-full

        // --

        // Remove any known size class
        jQuery('.modal-dialog', _target).removeClass('modal-dialog-centered modal-sm modal-lg modal-xl modal-full');

        // Add size class by request
        if(_modal_size != '')
          jQuery('.modal-dialog', _target).addClass(_modal_size);

        // centered
        if(_modal_centered == true)
          jQuery('.modal-dialog', _target).addClass('modal-dialog-centered');

        // static, do not close on click
        if(_modal_backgdrop != '') {
          var _backdrop = 'static';   
          var _keyboard = false;
        } else {
          var _backdrop = 'dynamic';  
          var _keyboard = true;
        }

        // RESET - needed to load a modal from another modal
        jQuery('.modal-backdrop').remove();


        // ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++
        // is video modal! stop here! process video!
        if(_modalType.toLowerCase() +'' == 'video') {

          var _backdrop = 'dynamic';  // forced
          var embedData = $.SOW.helper.videoEmbedFromUrl(_href, 1); // 1 = autoplay

          if(embedData === null) {

            if(typeof $.SOW.core.toast === 'object') {
                $.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', 'bottom-center', 0, true);
            } else {
                alert("[404] Unexpected internal error!");
            }

            return false;

          }




          // load modal
          var _loader = '<div class="text-center p-6 fs-1 text-muted '+$.SOW.config.sow__icon_loading+'"></div>';
          

          // BS4
          // -- -- --
          // jQuery(_target).modal('dispose').modal({backdrop: _backdrop, keyboard:_keyboard}).find('.modal-content').html(_loader);
          // -- -- --


          // BS5
          // -- -- --
          var ajxModal = document.querySelector(_target);
              ajxModal.querySelector('.modal-content').innerHTML = _loader; // reset & show loading spinner

          var myModal = new bootstrap.Modal(ajxModal, {
            backdrop: _backdrop, 
            keyboard:_keyboard
          }); myModal.show();
          // -- -- --


          setTimeout(function () {

            jQuery(_target).find('.modal-content')
                            .html(embedData)
                            .addClass('rounded-xl bg-dark shadow-primary-xs border border-dark border-3')
                            .prepend('<button type="button" style="margin-top:-18px;margin-right:-15px;width:34px;height:34px;" class="border-0 d-flex align-items-center justify-content-center pointer position-absolute top-0 end-0 text-white bg-dark rounded-circle z-index-100" data-bs-dismiss="modal" aria-label="Close"><span class="fi fi-close fs-6" aria-hidden="true"></span></button>');


            // try another way to start the video! AdBlock is problematic!
            jQuery('iframe', _target).attr('src', jQuery('iframe', _target).data('autoplay-src')).addClass('rounded-xl');

          }, 450);


          // Destroy on close! Too much customization!
          // And anyway, else, video remain to play on background!
          jQuery(_target).on('hidden.bs.modal', function (e) {
            jQuery(_target).remove();
            document.body.removeAttribute('data-bs-overflow');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
          });
          // document.body.removeAttribute('data-bs-overflow');
          // ajxModal.addEventListener('hidden.bs.modal', function (event) {
          //   setTimeout(function() {
          //     if( ajxModal ) ajxModal.parentElement.removeChild( ajxModal );
          //   }, 50);
          // })



          return false;

        }
        // ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++



        // Ajax Request
        jQuery.ajax({
          url:            _href,
          type:           _method,
          data:           $.SOW.core.ajax_modal.config.data_params,
          contentType:    $.SOW.core.ajax_modal.config.contentType,
          dataType:       $.SOW.core.ajax_modal.config.dataType,
          headers:        $.SOW.core.ajax_modal.config.headers,
          crossDomain:    $.SOW.core.ajax_modal.config.crossDomain,

          beforeSend: function() {

            var _loader = '<div class="text-center p-6 fs--30 text-muted '+$.SOW.config.sow__icon_loading+'"></div>';


            // BS4
            // -- -- --
            // jQuery(_target).modal('dispose').modal({backdrop: _backdrop, keyboard:_keyboard}).find('.modal-content').html(_loader);
            // -- -- --


            // BS5
            // -- -- --
            var ajxModal = document.querySelector(_target);
                ajxModal.querySelector('.modal-content').innerHTML = _loader; // reset & show loading spinner

            var myModal = new bootstrap.Modal(ajxModal, {
              backdrop: _backdrop, 
              keyboard:_keyboard
            }); myModal.show();
            // -- -- --


          },

          error:  function(XMLHttpRequest, textStatus, errorThrown) {

            if(typeof $.SOW.core.toast === 'object') {
              $.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', 'bottom-center', 0, true);
            } else {
              alert("[404] Unexpected internal error!");
            }

          },

          success: function(data) {

            jQuery(_target).find('.modal-content').html(data);

            setTimeout(function () {

              // Optional callback function
              if(_modal_callback != '' && typeof $.SOW.helper.executeFunctionByName === 'function')
                $.SOW.helper.executeFunctionByName(_modal_callback, window, _target);

              // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
              // console log
              $.SOW.helper.consoleLogReinit(scriptInfo, _target);
              // reinit inside ajax container
              $.SOW.reinit(_target);
              // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
                  
              // focus first input element
              jQuery('input:visible:enabled:first', _target).focus();


            }, 450);

          }
        });


      },





    /**
     *
     *  @ajax_modal_template
     *
     *
     **/
    ajax_modal_template: function() {

      if(jQuery(this.config.modal_container).length > 0)
        return;

      var modal_container = this.config.modal_container.replace('#', ''),
          _tpl = '<div class="modal fade" id="' + modal_container + '" role="dialog" tabindex="-1" aria-hidden="true">'
                + '<div class="modal-dialog '+ this.config.modal_size +'" role="document">'

                  + '<div class="modal-content"><!-- content added by ajax --></div>'

                + '</div>'
              + '</div>';

      $.SOW.globals.elBody.append(_tpl);
      $(this.config.modal_container).modal('handleUpdate');

    },





    /**
     *
     *  @createFromThinAir
     * Programtically Create Modal  :             url , 'modal-md', 'true' (centered), 'backdrop' (optional), callback (optional)
     * $.SOW.core.ajax_modal.createFromThinAir(modalUrl, 'modal-lg', 'true', 'static', callback);
     *
     **/
    createFromThinAir: function(url, modal_size, modal_centered, modal_backdrop, modal_callback) {

      if(!url) $.SOW.helper.consoleLog('SOW Ajax Modal : [createFromThinAir()] : No url provided!');

      if(!this.selector_orig) this.selector_orig = '.js-ajax-modal';
      if(!modal_size)         modal_size = 'modal-md';
      if(!modal_centered)     modal_centered = 'false';
      if(!modal_backdrop)     modal_backdrop = '';
      if(!modal_callback)     modal_callback = '';

      // Create DOM
      var selectorClass = this.selector_orig.replace('.', '');
      $.SOW.globals.elBody.append('<a id="ajax_modal_create_tmp" href="'+url+'" class="hide '+selectorClass+'"></a>');

      // Add Attributes
      jQuery('#ajax_modal_create_tmp')
        .attr('data-ajax-modal-size',           modal_size)
        .attr('data-ajax-modal-centered',       modal_centered)
        .attr('data-ajax-modal-backdrop',       modal_backdrop)
        .attr('data-ajax-callback-function',    modal_callback);

      // Init this plugin
      $.SOW.core.ajax_modal.init(this.selector_orig);
      jQuery('#ajax_modal_create_tmp').trigger('click');

      // Delete, not needed anymore!
      setTimeout(function() {
        jQuery('#ajax_modal_create_tmp').off().remove();
      },350);

      return true;

    },






    /**
     *
     *  @ajax_modal_onLoad
     *
     **/
    ajax_modal_onLoad: function() {

      jQuery('.js-ajax-modal.js-onload'+this.selector).not('.js-loadmodalified').addClass('js-loadmodalified').each(function() {

        var _t          = jQuery(this),
            _delay      = jQuery(this).attr('data-ajax-modal-delay') || 3000,
            _ID         = _t.attr('id') || '';

        if(_ID != '') {
          var modalCookie = Cookies.get(_ID, { path: '/' });
          if(modalCookie == '1') return;
        }

        setTimeout(function() {
          _t.trigger('click');
        }, Number(_delay));

      });

    },





    /**
     *
     *  @attach
     *  Programtically Init For Element
     *  $.SOW.core.ajax_modal.attach(bg_element|string_id_class);
     *
     **/
    attach: function(href, delay) {

      // obj required
      var el = (typeof href === 'string')     ? jquery(href)  : href;
      var dl = (typeof delay === 'number')    ? delay         : 200;

      // unbind
      if(el.hasClass('js-modalified'))
        el.off().removeClass('js-modalified');

      // add required
      el.addClass('js-ajax-modal');

      // init
      $.SOW.core.ajax_modal.ajax_modal(el);
      setTimeout(function() {
        el.trigger('click');
      },dl);

      return true;

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