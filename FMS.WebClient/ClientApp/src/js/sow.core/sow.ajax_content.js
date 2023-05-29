/**
 *
 *  [SOW] Ajax Content
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.ajax_content.init('div.js-ajax');
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
  var scriptInfo  = 'SOW Ajax Content';


  $.SOW.core.ajax_content = {


    /**
     *
     *  @config
     *
     *
     **/
    config: {

      method                          : 'GET',
      contentType                     : '',
      dataType                        : '',
      headers                         : '',
      crossDomain                     : '',
      data_params                     : {ajax:'true'},

      /* 
          callback_example = function(el, data, target_container) {
              // el               = link clicked              $(this)
              // data             = server response           (html|string)
              // target_container = container to push data    (string:#middle)
          }
      */
      callback_function               : '',

      // content (server response) is sent to your callback function only.
      callback_before_push            : false,

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


      /* 
          
          Because this script is needed on body only and not inside itself,
          we block this script loading by another plugins reinit
          Easier and better than creating another rule in Controller for all plugins!


          Note: we use .last() instead of .first() because we might have
          one content in a static area (main navigation as an eample) 
          and another one inside ajax (loaded by ajax navigation)

      */
      if(jQuery(this.selector_orig).last().hasClass('js-ajaxified'))
        return;
      // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


      // -- * --
      $.SOW.helper.consoleLog('Init : ' + scriptInfo);
      // -- * --


      // 1. Has no selector
      if(!this.selector) {
        $.SOW.core.ajax_content.ajax_content($('.js-ajax'));
        return this.collection;
      }

      // 2. Has selector
      return this.collection.each(function() {

        $.SOW.core.ajax_content.ajax_content($(this));

      });

    },



    /**
     *
     *  @ajax_content
     *
        2. DIVS (and sections)

            USAGE:

            <section id="section_1" class="js-ajax" data-ajax-url="_ajax/dummy_text.html" data-ajax-container="#section_1 .section-body" data-ajax-method="GET">

                <div class="section-body">
                    Lorem Ipsum
                </div>

                <a href="#" class="btn-js-ajax-reload" data-ajax-container="#section_1">Reload Content</a>

            </section>

            &ajax=true - added but NOT to .html files
     *  
     *
     **/
    ajax_content: function(_this) {

      if(_this.hasClass('.js-ajaxified') || _this.length < 1)
        return;

      _this.addClass('js-ajaxified');


      var _id                         = _this.attr('id')                          || '',
          _url                        = _this.data('ajax-url')                    || '',
          _callback                   = _this.data('ajax-callback-function')      || $.SOW.core.ajax_content.config.callback_function,
          _callbackBeforePush         = _this.data('ajax-callback-before-push')   || $.SOW.core.ajax_content.config.callback_before_push,
          _method                     = _this.data('ajax-method')                 || $.SOW.core.ajax_content.config.method,
          _btn_reload                 = _this.data('ajax-btn-reload')             || '',
          _target                     = _this.data('ajax-target-container')       || '';


      /* 
          
          Container has no ID
          We generate one

      */
      if(_id == '') {
        _id = 'rand_' + $.SOW.helper.randomStr(8);
        _this.attr('id', _id);
      }


      // Add a generated id to reload button, if has no id.
      // do not rewrite if exists
      if(jQuery(_btn_reload).length > 0) {

        var _btnReloadTarget = jQuery(_btn_reload).attr('data-ajax-container') || '';

        if(_btnReloadTarget == '')
          jQuery(_btn_reload).attr('data-ajax-container', '#'+_id).addClass('btn-js-ajax-content-reloader');

      }





      /* 

          No target specified
          We use self container

      */
      if(_target == '' || _target == 'self' || _target == '_self')
        var _target = '#' + _id;



      // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      // FUTURE UPDATE
      // PROECESS ONLY WHEN ELEMENT IS VISIBLE!
      // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


      // Process!
      $.SOW.core.ajax_content.__ajaxDivProcess(_id, _url, _target, _method, null, _callback, _callbackBeforePush);
      // -- -- --


      // Bind reload button[s]
      $.SOW.core.ajax_content.btn_reload_bind();

    },






    /**
     *
     *  @btn_reload_bind
     *
     *  
     *
     **/
    btn_reload_bind: function() {

      jQuery('.btn-js-ajax-content-reloader:not(.btn-js-ajaxified)').addClass('btn-js-ajaxified').on('click', function(e) {
        e.preventDefault();

        var __btnEl         = jQuery(this),
        __containerID       = jQuery(this).data('ajax-container') || '';

        if(__containerID != '') {

          var __t                     = jQuery(__containerID),
              __id                    = __t.attr('id')                                || '',
              __url                   = __t.attr('data-ajax-url')                     || '', // .attr, ELSE WILL NOT UPDATE!
              __callback              = __t.data('ajax-callback-function')            || $.SOW.core.ajax_content.config.callback_function,
              __callbackBeforePush    = __t.data('ajax-callback-before-push')         || $.SOW.core.ajax_content.config.callback_before_push,
              __method                = __t.data('ajax-method')                       || $.SOW.core.ajax_content.config.method,
              __target                = __t.data('ajax-target-container')             || __containerID;

          // Process!
          $.SOW.core.ajax_content.__ajaxDivProcess(__id, __url, __target, __method, __btnEl, __callback, __callbackBeforePush);
          // -- -- --

        }

      });

    },







    /* 

        Function also called on reload ajax content!

        _btnEl - is reload button element
        Used only on reload content to disable|enable on ajax process

    */
    __ajaxDivProcess: function(_id, _url, _target, _method, _btnEl, _callback, _callbackBeforePush) {

      var _selector = this.selector;


      // Yeah, the ugliest bool fix ever.
      var _callbackBeforePush = _callbackBeforePush+'';
      var _callbackBeforePush = _callbackBeforePush.toLowerCase();


      jQuery.ajax({
          url:            _url,
          type:           _method,
          data:           $.SOW.core.ajax_content.config.data_params,
          contentType:    $.SOW.core.ajax_content.config.contentType,
          dataType:       $.SOW.core.ajax_content.config.dataType,
          headers:        $.SOW.core.ajax_content.config.headers,
          crossDomain:    $.SOW.core.ajax_content.config.crossDomain,

          beforeSend: function() {

            // We don't show loading icon on load!
            // Let user show it's own loading message
            // Show loading only for "reload button"
            if(_btnEl) {

              jQuery(_target).addClass('overlay-light overlay-opacity-6 overlay-over');
              $.SOW.helper.loadingSpinner('show', _target);
              _btnEl.addClass('disabled active').prop('disabled', true);

            }

          },

          error:  function(XMLHttpRequest, textStatus, errorThrown) {

            $.SOW.helper.loadingSpinner('hide');

            if(typeof $.SOW.core.toast === 'object') {
              $.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', 'bottom-center', 0, true);
            } else {
              alert("[404] Unexpected internal error!");
            }

            // if debug enabled, see config
            $.SOW.helper.consoleLog('----------------------------');
            $.SOW.helper.consoleLog('--- AJAX  REQUEST ERROR ----');
            $.SOW.helper.consoleLog('DIV|section ID: ' + _id);
            $.SOW.helper.consoleLog('1. XMLHttpRequest:');
            $.SOW.helper.consoleLog(XMLHttpRequest);
            $.SOW.helper.consoleLog('2. textStatus:');
            $.SOW.helper.consoleLog(textStatus);
            $.SOW.helper.consoleLog('3. errorThrown:');
            $.SOW.helper.consoleLog(errorThrown);
            $.SOW.helper.consoleLog('----------------------------');

          },

          success: function(data) {

            // Push data
            if(_callbackBeforePush == 'false')
              jQuery(_target).empty().html(data);


            // callback function
            if(_callback != '' && typeof $.SOW.helper.executeFunctionByName === "function")
              $.SOW.helper.executeFunctionByName(_callback, window, _id, _target, data);


            // notice
            if(_callbackBeforePush == 'true' && _callback == '')
              $.SOW.helper.consoleLog('data-ajax-callback-function="" -BUT- data-ajax-callback-before-push="true"');


            // enable reload button
            // if(_btnEl) {

              // Set a delay, so user know content loaded, if was too fast
              setTimeout(function() {

                $.SOW.helper.loadingSpinner('hide');
                jQuery(_target).removeClass('overlay-light overlay-opacity-6 overlay-over');

                if(_btnEl)
                  _btnEl.removeClass('disabled active').prop('disabled', false);


                // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
                if(_callbackBeforePush == 'false') {
                  // console log
                  $.SOW.helper.consoleLogReinit(scriptInfo, _target);
                  // reinit inside ajax container
                  $.SOW.reinit(_target);
                }
                // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

              }, 300);


            // }


          }

      });

      return true;

    },

  }

})(jQuery);