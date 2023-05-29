/**
 *
 *  [SOW] Daterangepicker
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependencies   -
 *  @Usage          $.SOW.vendor.daterangepicker.init('.rangepicker');
 *
 *  @Ajax Support   YES
 *
 *  Vendor:         https://github.com/dangrossman/daterangepicker
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
    var scriptInfo              = 'Vendor Daterangepicker';


    $.SOW.vendor.daterangepicker = {


        /**
         *
         *  @config
         *
         *
         **/
        config: {
            // ajax params
            headers         : '',
            crossDomain     : '',
            method          : 'POST',
            contentType     : 'application/x-www-form-urlencoded; charset=UTF-8', // jQuery default
            dataType        : '', // 'json', 'html', 'text'
            headers         : '',
            crossDomain     : '',
            data_params     : {ajax:'true'},
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


            // Check Vendor ; dymanically load if missing (should be external)
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            if(selector != '') {
                if(jQuery(selector).length < 1)
                    return null;
            }

            if (!jQuery().daterangepicker) {

                var paths = $.SOW.helper.vendorLogicPaths('daterangepicker');
                if(paths['path_js'] == '') {
                    $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                    return null;
                }

                $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

                    if (!jQuery().daterangepicker) {
                        $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                        return null;
                    }

                    // self reinit, external js loaded!
                    $.SOW.vendor.daterangepicker.init(selector, config);
                    return null;

                });

                return null;
            }
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


            // Check Dependencies
            if (typeof moment !== 'function') {
                $.SOW.helper.consoleLog('Dependencies Missing : moment.js  [By: '+scriptInfo+']');
                return;
            }


            var __selector          = $.SOW.helper.__selector(selector);
            var __config            = $.SOW.helper.check_var(config);

            this.selector           = __selector[0];    // '#selector'
            this.collection         = __selector[1];    // $('#selector')
            this.selector_orig      = __selector[2];    // $('#selector') // without ajax container prefix
            this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;


            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --


            // 1. Has no selector
            if(!this.selector) {
                $.SOW.vendor.daterangepicker.process($('.rangepicker'));
                return $('.rangepicker');
            }

            // 2. Has selector
            return this.collection.each(function() {
                
                $.SOW.vendor.daterangepicker.process($(this));

            });

        },





        /**
         *
         *  @process
         *
         *
         **/
        process: function(_this) {

            var selector_orig = this.selector_orig;
            if(_this.hasClass('js-tangepickified'))
                return;


            setTimeout(function() {


                // Bind clear button
                jQuery('a.btn-rangepicker-clear').on('click', function(e) {
                    e.preventDefault();

                    jQuery(this).parent().find('input'+selector_orig).val('');
                });


                var _timePicker             = _this.data('timepicker')                          || false,
                    _timePicker24h          = _this.data('timepicker-24h')                      || false,
                    _timePickerSecs         = _this.data('timepicker-show-seconds')             || false,
                    _opens                  = _this.data('placement')                           || '',      // left|right
                    _drops                  = _this.data('drops')                               || 'down',  // down|up
                    _autoUpdateInput        = _this.data('disable-auto-update-input')           || false,
                    _singleDatePicker       = _this.data('single-datepicker')                   || false,
                    _autoApply              = _this.data('click-apply')                         || false,
                    _startDate              = _this.data('date-start')                          || '',
                    _endDate                = _this.data('date-end')                            || moment(),
                    _dropdowns              = _this.data('interval-years')                      || '',
                    _quickLocale            = _this.data('quick-locale')                        || '',
                    _dateFormat             = _this.data('date-format')                         || moment.localeData().longDateFormat('L'), //MM/DD/YYYY
                    _ranges                 = _this.attr('data-ranges')                         || false,
                    _customOBJ              = _this.data('custom-config')                       || '',
                    _roundedLayout          = _this.data('layout-rounded')                      || false,
                    _disablePastDates       = _this.data('disable-past-dates')                  || false,
                    
                    _minYear                = 1982,
                    _maxYear                = 2030,
                    showDropdowns;


                if(_singleDatePicker+'' == 'true') {
                    if(_startDate == '') {
                        _startDate = moment();
                    }
                } else {
                    if(_startDate == '') {
                        _startDate = moment().subtract(29, 'days');
                    }
                }

                if(typeof _customOBJ !== 'object') {
                // ---------------------------------------------------------------------------------------------------

                    var _ranges = (_ranges+'' == 'true') ?
                        {
                            'Today'         : [moment(), moment()],
                            'Yesterday'     : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                            'Last 7 Days'   : [moment().subtract(6, 'days'), moment()],
                            'Last 30 Days'  : [moment().subtract(29, 'days'), moment()],
                            'This Month'    : [moment().startOf('month'), moment().endOf('month')],
                            'Last Month'    : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                        } : false;

                    if(typeof _quickLocale === 'object' && _ranges !== false) {

                        var _ranges = {};

                            if(_quickLocale['lang_today'])
                                _ranges[_quickLocale['lang_today']] = [moment(), moment()];
                            
                            if(_quickLocale['lang_yday'])
                                _ranges[_quickLocale['lang_yday']] = [moment().subtract(1, 'days'), moment().subtract(1, 'days')];
                            
                            if(_quickLocale['lang_7days'])
                                _ranges[_quickLocale['lang_7days']] = [moment().subtract(6, 'days'), moment()];
                            
                            if(_quickLocale['lang_30days'])
                                _ranges[_quickLocale['lang_30days']] = [moment().subtract(29, 'days'), moment()];
                            
                            if(_quickLocale['lang_tmonth'])
                                _ranges[_quickLocale['lang_tmonth']] = [moment().startOf('month'), moment().endOf('month')];
                            
                            if(_quickLocale['lang_lmonth'])
                                _ranges[_quickLocale['lang_lmonth']] = [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')];

                    }


                    // DISABLE PAST DATES
                    var disablePast = false;
                    if(_disablePastDates+'' == 'true') {

                        if(_startDate == '') {
                            
                            var __sd = moment()._d;
                        
                        } else {

                            if(typeof _startDate === 'string') {
                                var __sd = _startDate;
                            } else {
                                var __sd = _startDate._d;
                            }

                        }

                        var disablePast = moment(__sd,_dateFormat).format(_dateFormat);
                    } 




                    if(_timePicker+'' == 'true') {
                        // var _startDate   = moment().startOf('hour');
                        // var _endDate     = moment().startOf('hour').add(32, 'hour');
                    }

                    if(typeof _dropdowns === 'object') {
                        var _showDropdowns  = true,
                            _minYear        = _dropdowns[0] || 1982;
                            _maxYear        = _dropdowns[1] || 2030;
                    }
     


                    // default config
                    var _obj = {
                        
                        direction           : $.SOW.globals.direction,

                        opens               : (_opens != '') ? _opens :   ( ($.SOW.globals.direction == 'rtl') ? 'left' : 'right' ),
                        autoUpdateInput     : (_autoUpdateInput+'' != 'true')       ? true : false,

                        singleDatePicker    : (_singleDatePicker+'' == 'true')      ? true  : false,
                        autoApply           : (_singleDatePicker+'' == 'true' || _autoApply+'' == 'true')       ? true  : false,
                        timePicker          : (_timePicker+'' == 'true')            ? true  : false,
                        timePicker24Hour    : (_timePicker24h+'' == 'true')         ? true  : false,
                        timePickerSeconds   : (_timePickerSecs+'' == 'true')        ? true  : false,
                        startDate           : (_startDate != '')                    ? _startDate    : null,
                        endDate             : (_endDate != '')                      ? _endDate      : null,
                        minDate             : disablePast,

                        showDropdowns       : (_showDropdowns === true)             ? true : false,
                        minYear             : Number(_minYear),
                        maxYear             : Number(_maxYear),

                        ranges              : _ranges,
                        drops               : (_drops == '')                        ? 'down'    : _drops,

                        locale: {
                            customRangeLabel: (typeof _quickLocale === 'object' && _quickLocale['lang_crange']) ? _quickLocale['lang_crange'] : 'Custom Range',
                            applyLabel      : (typeof _quickLocale === 'object' && _quickLocale['lang_apply']) ? _quickLocale['lang_apply'] : 'Apply',
                            cancelLabel     : (typeof _quickLocale === 'object' && _quickLocale['lang_cancel']) ? _quickLocale['lang_cancel'] : 'Cancel',
                            
                            // from core, in case we need them
                            monthNames      : (typeof _quickLocale === 'object' && typeof _quickLocale['lang_months'] === 'object' && _quickLocale['lang_months']) ? _quickLocale['lang_months'] : moment.monthsShort(),
                            daysOfWeek      : (typeof _quickLocale === 'object' && typeof _quickLocale['lang_weekdays'] === 'object' && _quickLocale['lang_weekdays']) ? _quickLocale['lang_weekdays'] : moment.weekdaysMin(),
                            firstDay        : moment.localeData().firstDayOfWeek(),
                            format          : _dateFormat //MM/DD/YYYY
                        }

                    };

                // ---------------------------------------------------------------------------------------------------
                }


            

                var _pick = _this.addClass('js-tangepickified').daterangepicker(  ( (typeof _customOBJ === 'object') ? _customOBJ : _obj ), 
                    function(start, end, label) {

                        var start_format    = start.format(_dateFormat);
                        var end_format      = start.format(_dateFormat);
                        // console.log("A new date selection was made: " + start_format + ' to ' + end_format);

                        return;

                }).data('daterangepicker');


                if(_roundedLayout !== false)
                    _pick.container.addClass('daterangepicker-rounded');
                    jQuery('.btn-default', _pick.container).removeClass('btn-default').addClass('bg-light');


                // Used if autoUpdateInput is false
                _this.on('apply.daterangepicker', function(ev, picker) {

                    // console.log(picker.startDate.format('H:mm:ss'));


                    // update
                    if(_singleDatePicker+'' == 'true') {
                        $(this).val(picker.startDate.format(_dateFormat));
                    } else {
                        $(this).val(picker.startDate.format(_dateFormat) + ' - ' + picker.endDate.format(_dateFormat));
                    }

                    // AJAX
                    var startDate       = picker.startDate._d;
                    var endDate         = picker.endDate._d;
                    var start_format    = picker.startDate.format(_dateFormat);
                    var end_format      = picker.endDate.format(_dateFormat);
                    $.SOW.vendor.daterangepicker.updateAjax(_this, startDate, endDate, start_format, end_format);

                });

                _this.on('cancel.daterangepicker', function(ev, picker) {
                    
                });

                _this.on('change.daterangepicker', function(ev, picker) {
                    // NO! Will trigger ALL rangepickers we have more on the same page
                    // jQuery('button.applyBtn').trigger('click');
                });

            }, _this.data('load-delay') || 0);

        },




        /**
         *
         *  @updateAjax
         *
         *
         **/
        updateAjax: function(_this, start, end, start_format, end_format) {


            var _updateMethod           = _this.data('ajax-method')                     || $.SOW.vendor.daterangepicker.config.method,
                _updateUrl              = _this.data('ajax-url')                        || '',
                _updateParams           = _this.data('ajax-params')                     || '',
                _toastSuccessMsg        = _this.data('toast-success')                   || 'Sucessfully Updated!',
                _toastPosition          = _this.data('toast-position')                  || 'top-center',
                _itemID                 = _this.data('id')                              || '',
                data_params             = $.SOW.vendor.daterangepicker.config.data_params;

            if(_updateUrl == '')
                return;


            if(_updateParams != '') {

                var ajax_params_arr = $.SOW.helper.params_parse(_updateParams);
                for (var i = 0; i < ajax_params_arr.length; ++i) {
                    data_params[ajax_params_arr[i][0]] = ajax_params_arr[i][1];
                }

            }

            // Add item id
            data_params.id                  = _itemID;
            data_params.date_start_full     = start;            // FULL DATE
            data_params.date_end_full       = end;              // FULL DATE
            data_params.date_start_short    = start_format;
            data_params.date_end_short      = end_format;


            // UPDATE ORDER VIA AJAX
            jQuery.ajax({
                url:            _updateUrl,
                data:           data_params,
                type:           _updateMethod,
                contentType:    $.SOW.vendor.daterangepicker.config.contentType,
                dataType:       $.SOW.vendor.daterangepicker.config.dataType,
                headers:        $.SOW.vendor.daterangepicker.config.headers,
                crossDomain:    $.SOW.vendor.daterangepicker.config.crossDomain,

                beforeSend: function() {

                    _this.addClass('disabled').prop('disabled', true).prop('readonly', true);

                },

                error:  function(XMLHttpRequest, textStatus, errorThrown) {

                    if(typeof $.SOW.core.toast === 'object') {
                        $.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', _toastPosition, 0, true);
                    } else {
                        alert("[404] Unexpected internal error!");
                    }

                    _this.removeClass('disabled').prop('disabled', false).prop('readonly', false);

                },

                success: function(data) {

                    _this.removeClass('disabled').prop('disabled', false).prop('readonly', false);
                    $.SOW.helper.consoleLog(data);

                    setTimeout(function() {

                    if(typeof $.SOW.core.toast === 'object')
                        $.SOW.core.toast.show('success', '', _toastSuccessMsg, _toastPosition, 1300, true);

                    },150);

                }
            });


        }

    };


})(jQuery);