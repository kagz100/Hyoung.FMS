/**
 *
 *  [SOW] Ajax Form
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.ajax_form.init('form.js-ajax');
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
  var scriptInfo      = 'SOW Ajax Form';




  $.SOW.core.ajax_form = {


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
            $.SOW.core.ajax_form.process($('form.js-ajax'));
            return this.collection;
        }

        // 2. Has selector
        return this.collection.each(function() {
            
            $.SOW.core.ajax_form.process($(this));

        });

    },



    /**
     *
     *  @ajax_form
     *
        3. FORMS


            EXAMPLE USAGE.  (form.js-ajax  - REQUIRED)

                <form class="js-ajax bs-validate" novalidate action="YOUR_URL" data-ajax-container="#ajax_container" data-ajax-update-url="true">

                    <input required type="text" name="first_name" value="" placeholder="first name" class="form-control mb-4">
                    <input type="text" name="birthdate" value="" placeholder="birthdate" class="form-control mb-4">

                    <!-- 
                        Error Notice - more visible

                        Instead of this alert, you can use a toast alert instead by adding to form:
                            data-error-toast-text="<i class='fi fi-circle-spin fi-spin float-start'></i> Please, complete all required fields!" 
                            data-error-toast-delay="3000" 
                            data-error-toast-position="top-right"

                    -->
                    <div class="bs-validate-info hide alert alert-danger" data-error-alert-delay="4000">
                        <i class="fi fi-circle-spin fi-spin float-start"></i> 
                        Please, complete all required fields!
                    </div>

                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                

                <!-- position relative|fixed|absolute is required for loading icon -->
                <div id="ajax_container" class="position-relative w--500 pl--30 pr--30 pt--80 pb--80">
                    <!-- RESPONSE ADDED HERE, IF NEEDED -->
                </div>


            ajax-callback-function=""   - used to handle the response, instead of appending the response to a container
     *  
     *
     **/
    process: function(_this) {

        var _selector       = this.selector;
        var _selector_orig  = this.selector_orig;

        _this.submit(function(e) {

            var _t                  = _this,
                _formID             = _t.attr('id')                             || '',
                _action             = _t.attr('action')                         || '',
                _callback           = _t.attr('data-ajax-callback-function')    || '',
                _method             = _t.attr('method')                         || $.SOW.core.ajax_form.config.method,
                _updateURL          = _t.attr('data-ajax-update-url')           || 'false',

                appendData          = _t.attr('data-ajax-append-response')      || '',

                _scrollErrUp        = _t.attr('data-error-scroll-up')           || 'false',
                _showLoadingIcon    = _t.attr('data-ajax-show-loading-icon')    || 'true',
                _contentType        = _t.data('ajax-contentType')               || '',
                _dataType           = _t.data('ajax-dataType')                  || '',
                _target             = _t.data('ajax-container')                 || '',
                _toast_text         = _t.data('error-toast-text')               || '',          // toast alert for .bs-validate
                _toast_delay        = _t.data('error-toast-delay')              || 0,           // toast alert for .bs-validate
                _toast_pos          = _t.data('error-toast-position')           || "top-right", // toast alert for .bs-validate
                _toast_success      = _t.data('success-toast-text')             || "",
                
                _controlAlerts      = _t.attr('data-ajax-control-alerts')               || "false",
                _controlSuccess     = _t.attr('data-ajax-control-alert-succes')         || "",
                _controlUnexpected  = _t.attr('data-ajax-control-alert-unexpected')     || "",
                _controlMandatory   = _t.attr('data-ajax-control-alert-mandaroty')      || "",
                
                // show|hide container for error|success
                _onSucessShow       = _t.data('ajax-inline-alert-succes')       || '',
                _onErrorShow        = _t.data('ajax-inline-alert-error')        || '',

                // autoclose modal on success
                _modalCloseOnSuccess        = _t.data('modal-autoclose-on-success')         || 'false',
                _modalCloseOnSuccessDelay   = _t.data('modal-autoclose-on-success-delay')   || 0;

            if(_onSucessShow != '' || _onErrorShow != '') {
                if(_target == '#middle')
                    _target = '';
            }

            // the most uglies bool hack
            var _scrollErrUp        = _scrollErrUp+'';
            var _updateURL          = _updateURL+'';

            // Assign a random id if not exist
            if(_formID == '') {
                var _formID = 'js_' + $.SOW.helper.randomStr(10);
                _t.attr('id', _formID);
            }

            // Bootstrap Validation +++++++++++++++++++++++++++++++++++++++++++++++++++
            // This part already exists in _formvalidate.js
            // We use it again here in case the file is not loaded!

            // default reset
            window.ajax_form_stop = false;

            // Form Element
            var _form = document.getElementById(_formID);

            if(_t.hasClass('bs-validate')) {

                // hide all errors info
                jQuery('.bs-validate-info').addClass('hide hide-force');

                if(typeof $.SOW.core.toast === 'object')
                    $.SOW.core.toast.destroy();

                if(_form.checkValidity() === false) {


                    // -- message|toast ---
                    if(_toast_text != '') {

                        if(typeof $.SOW.core.toast === 'object') {
                            
                            if(Number(_toast_delay) < 1)
                                var _toast_delay = 4000;

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

                    // show|hide custom containers
                    if(_onErrorShow != '') {
                        jQuery(_onSucessShow).addClass('hide hide-force');
                        jQuery(_onErrorShow).removeClass('hide hide-force');
                    }
                    
                    // Focus invalid element and scroll
                    jQuery('.form-control:invalid', _t).first().focus();

                    // Do not animate inside modal!
                    if(typeof $.SOW.helper.scrollAnimate === "function" && _scrollErrUp == 'true' && !jQuery('.modal').hasClass('show')) {
                        var _formEl = jQuery('input:invalid, select:invalid, textarea:invalid', _t);
                        $.SOW.helper.scrollAnimate(_formEl, 0, false, 200);
                    }
                    // -- -- -- --

                    e.preventDefault();
                    e.stopPropagation();
                    window.ajax_form_stop = true;
                } 


                _t.addClass('was-validated');


                // Stop here!
                if(window.ajax_form_stop === true)
                    return;

            } else {

                if(_form.checkValidity() === false) {

                    e.preventDefault();
                    e.stopPropagation();
                    window.ajax_form_stop = true;
                } 

            }

            // Stop here!
            if(window.ajax_form_stop === true)
                return;

            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


            // Start the show
            e.preventDefault();

            if(_action == '') {

                $.SOW.helper.consoleLog('Ajax request: form action missing!');

                if(typeof $.SOW.core.toast === 'object') {

                    $.SOW.core.toast.show('danger', 'Error', 'Unexpected Internal error!', 'bottom-center', 0, true);

                } else {

                    alert("[404] Unexpected internal error!");

                }

                return;
            }


            if(_method.toLowerCase() == 'post') {

                var formData        = new FormData(this);
                var __processData   = false;
                var __contentType   = false;

            } else {

                var __processData   = true;
                var __contentType   = _contentType || $.SOW.core.ajax_form.config.contentType;
                var formData        = _t.serializeArray();

            }


            jQuery.ajax({
                url:            _action,
                data:           formData,
                type:           _method,
                dataType:       _dataType || $.SOW.core.ajax_form.config.dataType,
                headers:        $.SOW.core.ajax_form.config.headers,
                crossDomain:    $.SOW.core.ajax_form.config.crossDomain,
                contentType:    __contentType,
                processData:    __processData,
                cache:          false,

                beforeSend: function() {

                    // icon over form
                    if(_showLoadingIcon == 'true')
                        $.SOW.helper.loadingSpinner('show', _t);

                    // Disable submit button
                    jQuery(this).attr('disabled', true).addClass('disabled');

                },

                error:  function(XMLHttpRequest, textStatus, errorThrown) {

                    $.SOW.helper.loadingSpinner('hide');

                    if(typeof $.SOW.core.toast === 'object') {

                        $.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', _toast_pos, 0, true);

                    } else {

                        alert("[404] Unexpected internal error!");

                    }

                    // show|hide custom containers
                    if(_onErrorShow != '') {
                        jQuery(_onSucessShow).addClass('hide hide-force');
                        jQuery(_onErrorShow).removeClass('hide hide-force');
                    }

                    // Enable submit button
                    jQuery(this).attr('disabled', false).removeClass('disabled');
                },

                success: function(data) {

                    $.SOW.helper.loadingSpinner('hide');
                    $.SOW.helper.consoleLog(data);

                    // Enable submit button
                    jQuery(this).attr('disabled', false).removeClass('disabled');
                    var hasErrors = false;

                    // Control alerts
                    if(_controlAlerts+'' == 'true') {

                        // reset first
                        var hasErrors = true;
                        jQuery(_controlSuccess).addClass('hide hide-force');
                        jQuery(_controlUnexpected).addClass('hide hide-force');
                        jQuery(_controlMandatory).addClass('hide hide-force');

                        if(data == '{:success:}') {
                            jQuery(_controlSuccess).removeClass('hide hide-force');
                            var hasErrors = false;
                            var data = '';
                        }

                        else if(data == '{:err:required:}')
                            jQuery(_controlMandatory).removeClass('hide hide-force');

                        else if(data == '{:err:unexpected:}')
                            jQuery(_controlUnexpected).removeClass('hide hide-force');


                        if(hasErrors === true) {
                            
                            // this is a server message - debug only!
                            if($.SOW.config.sow__debug_enable === true) 
                                jQuery(_target).empty().html(data);
                            else
                                jQuery(_target).empty().html('Server Error!');
                                

                            _t.removeClass('was-validated');
                            return;
                        }
                        
                    }



                    // Callbat and/or Reset
                    if(_callback == '') {

                        // Reset Form
                        jQuery('input:not([type=hidden])', _t).val('');
                        jQuery('textarea:not(.hide)', _t).val('');

                        if(_target != '')
                            jQuery(_target).empty().html(data);

                        // reset form validation
                        _t.removeClass('was-validated');

                    } else {

                        if(typeof $.SOW.helper.executeFunctionByName === "function")
                            $.SOW.helper.executeFunctionByName(_callback, window, _t, data);

                    }



                    // Update URL
                    if(_updateURL == 'true' && $.SOW.core.ajax_navigation === 'object')
                        $.SOW.core.ajax_navigation.__historyPushState(_action, '', data);


                    if(_target != '' && typeof $.SOW.helper.scrollAnimate === "function" && _scrollErrUp == 'true') {
                        var _elResponse = jQuery(_target || _onSucessShow);
                        if(_elResponse.length)
                            $.SOW.helper.scrollAnimate(_elResponse, 0, false, 200);
                    }


                    // show|hide custom containers
                    if(_onSucessShow != '') {
                        jQuery(_onSucessShow).removeClass('hide hide-force');
                        jQuery(_onErrorShow).addClass('hide hide-force');
                    }



                    // if form is on modal
                    if(_modalCloseOnSuccess+'' == 'true') {

                        setTimeout(function() {
                            jQuery('#sow_ajax_modal').modal('hide');
                        }, Number(_modalCloseOnSuccessDelay));
                        
                    }


                    // success tost, if text provided
                    if(typeof $.SOW.core.toast === 'object' && _toast_success != '')
                        $.SOW.core.toast.show('success', '', _toast_success, _toast_pos, 1500, true);


                    // Reload Container via Ajax
                    if(appendData != '') {
                        
                        setTimeout(function() {

                            jQuery(appendData).empty().append(data);

                            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
                            // console log
                            $.SOW.helper.consoleLogReinit(scriptInfo, appendData);
                            // reinit inside ajax container
                            $.SOW.reinit(appendData);
                            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

                        }, (Number(_modalCloseOnSuccessDelay) + 100 ) );

                    }

                }

            });


        });


    }

  }

})(jQuery);