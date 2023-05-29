/**
 *
 *  [SOW] Ajax Select
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.ajax_select.init('select.js-ajax');
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
  var scriptInfo      = 'SOW Ajax Select';
  window.ajax_select_chain_process = null;



  $.SOW.core.ajax_select = {


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
          callback_example = function(el, data, modal_container) {
              // el               = element               $(this)
              // data             = server response           (html|string)
              // modal_container = container to push data     (string)
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
      this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;



      if(jQuery(this.selector).length < 1)
        return;


      // -- * --
      $.SOW.helper.consoleLog('Init : ' + scriptInfo);
      // -- * --


      // 1. Has no selector
      if(!this.selector) {
        $.SOW.core.ajax_select.process($('select.js-ajax'));
        return this.collection;
      }

      // 2. Has selector
      return this.collection.each(function() {
          
        $.SOW.core.ajax_select.process($(this));

      });

    },



    /**
     *
     *  @process
     *
     *
     **/
    process: function(_this) {


      /** 

          Form Populate

      **/
      var populate_form = _this.data('form-target') || '';
      if(populate_form != '') {

        _this.not('.js-ajaxified').addClass('js-ajaxified').on('change', function() {

          var _method                 = _this.data('ajax-method')             || $.SOW.core.ajax_select.config.method,
              _url                    = _this.data('ajax-url')                || '',
              _params                 = _this.data('ajax-params')             || '',
              _thisVal                = _this.val()                           || '',
              data_params             = $.SOW.core.ajax_select.config.data_params;
              data_params['value']    = _thisVal;

          if(_url == '') return;


          // reset
          if(_thisVal == '') {

            jQuery('input[type=text], input[type=number], input[type=tel], textarea', populate_form).val('');
            jQuery('input[type=checkbox]', populate_form).prop('checked', false);

            jQuery('select', populate_form).val(0);

            // Refresh bootstrap select
            if(typeof $.SOW.vendor.bootstrap_select === 'object' && _this.hasClass('bs-select'))
                $.SOW.vendor.bootstrap_select.refresh(_this);

            return;

          }



          if(_params != '') {

            var ajax_params_arr = $.SOW.helper.params_parse(_params);
            for (var i = 0; i < ajax_params_arr.length; ++i) {
              data_params[ajax_params_arr[i][0]] = ajax_params_arr[i][1];
            }

          }


          jQuery.ajax({
              url:            _url,
              type:           _method,
              data:           data_params,
              contentType:    $.SOW.core.ajax_select.config.contentType,
              dataType:       $.SOW.core.ajax_select.config.dataType,
              headers:        $.SOW.core.ajax_select.config.headers,
              crossDomain:    $.SOW.core.ajax_select.config.crossDomain,

              beforeSend: function() {

                  $.SOW.helper.consoleLog(_url);
                  $.SOW.helper.consoleLog(_method, data_params);
                  $.SOW.helper.consoleLog('----------------------------');

              },

              error:  function(XMLHttpRequest, textStatus, errorThrown) {

                  if(typeof $.SOW.core.toast === 'object') {
                      $.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', 'bottom-center', 0, true);
                  } else {
                      alert("[404] Unexpected internal error!");
                  }

              },

              success: function(data) {

                  try {

                      var data = JSON.parse(data);

                  } catch(err) {}

                  if(typeof data !== 'object') {
                      $.SOW.helper.consoleLog('----------------------------');
                      $.SOW.helper.consoleLog('Select Form Populate : Not JSON! Aborting...');
                      $.SOW.helper.consoleLog('----------------------------');
                      return;
                  }

                  for(var i = 0; i < data.length; i++) {

                      for(var key in data[i]) {
                          
                          var _el = $(populate_form + ' #' + key);
                          if(_el.length < 1)
                              var _el = $(populate_form + ' .' + key);
                          if(_el.length < 1)
                              continue;


                          // file : skip
                          if(_el.attr('type') == 'file')
                              continue;

                          // checkbox & radio
                          if(_el.attr('type') == 'checkbox' || _el.attr('type') == 'radio')
                              if(data[i][key] > 0 || data[i][key] == true) { _el.prop('checked', true); } else { _el.prop('checked', false); }

                          // input
                          else if(_el.is('input'))
                              _el.val(data[i][key]);

                          // textarea
                          else if(_el.is('textarea'))
                              _el.val(data[i][key]);

                          // select
                          else if(_el.is('select')) {

                              _el.val(data[i][key]);

                              // Refresh bootstrap select
                              if(typeof $.SOW.vendor.bootstrap_select === 'object')
                                  $.SOW.vendor.bootstrap_select.refresh(_el);

                          }

                      }


                  }


              }

          });

        });

        return;

      }






      /** 

          Self Populate

      **/
      var self_populate_url = _this.data('ajax-url-self-populate') || '';

      if(self_populate_url != '') {

          var _method         = _this.data('ajax-method')             || $.SOW.core.ajax_select.config.method,
              _params         = _this.data('ajax-params')             || '',
              _callback       = _this.data('ajax-callback-function')  || $.SOW.core.ajax_select.config.callback_function,
              data_params     = $.SOW.core.ajax_select.config.data_params,

              _val            = '',
              _label          = ':on_load:';

          if(_params != '') {

              var ajax_params_arr = $.SOW.helper.params_parse(_params);
              for (var i = 0; i < ajax_params_arr.length; ++i) {
                  data_params[ajax_params_arr[i][0]] = ajax_params_arr[i][1];
              }

          }


          $.SOW.core.ajax_select.ajax_process(self_populate_url, _method, data_params, _this, _val, _label, _this, _callback, 'self');

      }






    /** 

        Populate on change

    **/
    _this.not('.js-ajaxified').addClass('js-ajaxified').on('change', function() {

        var _t              = jQuery(this),
            _val            = _t.val()                              || '',
            _label          = jQuery('option:selected', _t).text()  || '',
            _callback       = _t.data('ajax-callback-function')     || $.SOW.core.ajax_select.config.callback_function,
            _target         = _t.data('ajax-target')                || '';

        if(_target != '') {

          // Get url from #target
          var el_target       = jQuery(_target),
              _url            = el_target.data('ajax-url')                || '',
              _method         = el_target.data('ajax-method')             || $.SOW.core.ajax_select.config.method,
              _params         = el_target.data('ajax-params')             || '',
              data_params     = $.SOW.core.ajax_select.config.data_params;


          if(_url != '') {

            if(_params != '') {

              var ajax_params_arr = $.SOW.helper.params_parse(_params);
              for (var i = 0; i < ajax_params_arr.length; ++i) {
                data_params[ajax_params_arr[i][0]] = ajax_params_arr[i][1];
              }

            }

            data_params['value'] = _val;

            $.SOW.core.ajax_select.ajax_process(_url, _method, data_params, el_target, _val, _label, _t, _callback, 'target');

          }

        }




            




        /**

            Show container

        **/
        // hide all first
        _t.children('option').each(function() {

          var __t = jQuery(this).data('show-container') || '';
          if(__t != '') jQuery(__t).addClass('d-none hide hide-force');

        });

        // show selected
        var _container = _t.find(':selected').data('show-container') || '';
        if(_container != '')  jQuery(_container).removeClass('d-none hide hide-force');

    });


    },





    /**
     *
     *  @ajax_process
     *
     *
     **/
    ajax_process: function(_url, _method, data_params, el_target, _val, _label, _t, _callback, process_type) {

      jQuery.ajax({
          url:            _url,
          type:           _method,
          data:           data_params,
          contentType:    $.SOW.core.ajax_select.config.contentType,
          dataType:       $.SOW.core.ajax_select.config.dataType,
          headers:        $.SOW.core.ajax_select.config.headers,
          crossDomain:    $.SOW.core.ajax_select.config.crossDomain,

          beforeSend: function() {

            $.SOW.helper.consoleLog(_url);
            $.SOW.helper.consoleLog(_method, data_params);
            $.SOW.helper.consoleLog('----------------------------');

          },

          error:  function(XMLHttpRequest, textStatus, errorThrown) {

            if(typeof $.SOW.core.toast === 'object') {
                $.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', 'bottom-center', 0, true);
            } else {
                alert("[404] Unexpected internal error!");
            }

          },

          success: function(data) {

              var selected_val                = _val;
              var selected_label              = _label;
              var process_recursive           = null;
              var process_recursive_selected  = '';


              // remove disabled
              el_target.removeAttr('disabled');


              try {

                  var _data = JSON.parse(data);

              } catch(err) {

                  var _data = data;
                  $.SOW.helper.consoleLog(data);

              }   var data = null; // clear/reset


              // Clear select
              el_target.find('option').remove();

              if(_data.length > 0) {

                  // Walk through json data
                  for (var i = 0; i < _data.length; i++) {

                      if(typeof _data[i]['label'] === 'undefined')
                          continue;

                      if(typeof _data[i]['value'] === 'undefined')
                          _data[i]['value'] = '';

                      if(_data[i]['label'] == '' && _data[i]['value'] == '')
                          continue;

                      // -- -- --
                      var o = new Option(_data[i]['label'], _data[i]['value']);
                      jQuery(o).html(_data[i]['label']);

                      // selected
                      if(typeof _data[i]['selected'] !== 'undefined' && _data[i]['selected'] == true) {
                          jQuery(o).attr('selected', 'selected');
                          var process_recursive_selected = _data[i]['value'];
                      }

                      // show container
                      if(typeof _data[i]['show_container'] !== 'undefined') {
                          jQuery(o).attr('data-show-container', _data[i]['show_container']);

                          if(process_recursive_selected == _data[i]['value'])
                              jQuery(_data[i]['show_container']).removeClass('d-none hide hide-force');
                      }


                      el_target.append(o);
                      // -- -- --


                      if(_data[i]['selected'] && _data[i]['selected'] === true) {
                          // var selected_val     = _data[i]['value'],
                          //  selected_label      = _data[i]['label'];

                          if(process_type === 'self')
                              var process_recursive = true;

                      }


                  }

              } else {

                  // set disabled
                  el_target.prop('disabled', true).attr('disabled', '');

              }


              // Refresh bootstrap select
              if(typeof $.SOW.vendor.bootstrap_select === 'object')
                  $.SOW.vendor.bootstrap_select.refresh(el_target);


              setTimeout(function () {

                  // Callback
                  if(_callback != '' && typeof _callback !== 'undefined')
                      $.SOW.core.ajax_select.ajax_callback(_callback, _t, selected_val, selected_label);



                  /** 

                      Callback on change

                  **/
                  if(el_target !== null) {

                      el_target.not('.js-callbackified').addClass('js-callbackified').on('change', function() {

                          var _t              = jQuery(this),
                              _val            = _t.val()                              || '',
                              _label          = _t.find('option:selected').text()     || '',
                              _callback       = _t.data('ajax-callback-function')     || $.SOW.core.ajax_select.config.callback_function;


                          // Callback
                          if(_callback != '' && typeof _callback !== 'undefined')
                              $.SOW.core.ajax_select.ajax_callback(_callback, _t, _val, _label);

                      });

                  }



                  /**
                  
                      Recursive
                      Used by select on load
                      data-ajax-url-self-populate

                  **/
                  if(process_recursive === true && el_target.data('ajax-target')) {

                      // Get url from #target
                      var _selector       = el_target.data('ajax-target')             || '',
                          el_target2      = jQuery(_selector),
                          _url            = el_target2.data('ajax-url')               || '',
                          _method         = el_target2.data('ajax-method')            || $.SOW.core.ajax_select.config.method,
                          _params         = el_target2.data('ajax-params')            || '',
                          data_params     = $.SOW.core.ajax_select.config.data_params;

                      if(_url == '')
                          return;

                      if(_params != '') {

                          var ajax_params_arr = $.SOW.helper.params_parse(_params);
                          for (var i = 0; i < ajax_params_arr.length; ++i) {
                              data_params[ajax_params_arr[i][0]] = ajax_params_arr[i][1];
                          }

                      }

                      data_params['value'] = process_recursive_selected;


                      $.SOW.core.ajax_select.ajax_process(_url, _method, data_params, el_target2, '', '', el_target, _callback, 'target');

                  }

              }, 100);


          }

      });

    },




    /**
     *
     *  @ajax_callback
     *
     *
     **/
    ajax_callback: function(_callback, _t, value, label) {

      if(_callback != '' && typeof $.SOW.helper.executeFunctionByName === 'function') 
        $.SOW.helper.executeFunctionByName(_callback, window, _t, value, label);

    }

  }

})(jQuery);