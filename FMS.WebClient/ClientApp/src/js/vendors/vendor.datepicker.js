/**
 *
 *  [SOW] Datepicker
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependencies   -
 *  @Usage          $.SOW.vendor.datepicker.init('.datepicker');
 *
 *  @Ajax Support   YES
 *
 *  Vendor:         https://github.com/uxsolutions/bootstrap-datepicker
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
    var scriptInfo              = 'Vendor Datepicker';


    $.SOW.vendor.datepicker = {


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

            if (!jQuery().datepicker) {

                var paths = $.SOW.helper.vendorLogicPaths('datepicker');
                if(paths['path_js'] == '') {
                    $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                    return null;
                }

                $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

                    if (!jQuery().datepicker) {
                        $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                        return null;
                    }

                    // self reinit, external js loaded!
                    $.SOW.vendor.datepicker.init(selector, config);
                    return null;

                });

                return null;
            }
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


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
                $.SOW.vendor.datepicker.process($('.datepicker'));
                return $('.datepicker');
            }

            // 2. Has selector
            return this.collection.each(function() {
                
                $.SOW.vendor.datepicker.process($(this));

            });

        },



        /**
         *
         *  @process
         *
         *
         **/
        process: function(_this) {

            if(_this.hasClass('js-datepickified'))
                return;

            // Links
            if(_this.attr('href') != '') {
                _this.on('click', function(e) {
                    e.preventDefault();
                });
            }

            var itemID                  = _this.data('id')                          || '',
                language                = _this.data('lang')                        || 'en',
                format                  = _this.data('format')                      || 'mm/dd/yyyy',
                format                  = format.toLowerCase(),
                startDate               = _this.data('date-start')                  || -Infinity,
                endDate                 = _this.data('date-end')                    || Infinity,
                changeMonth             = _this.attr('data-changeMonth')            || true,
                todayBtn                = _this.attr('data-today-btn')              || true,
                calendarWeeks           = _this.attr('data-show-weeks')             || true,
                autoclose               = _this.attr('data-autoclose')              || true,
                todayHighlight          = _this.attr('data-today-highlight')        || true,
                clearBtn                = _this.attr('data-clear-btn')              || false,
                showWeekDays            = _this.attr('data-showWeekDays')           || true,
                enableOnReadonly        = _this.attr('data-enableOnReadonly')       || false,
                daysOfWeekDisabled      = _this.attr('data-daysOfWeekDisabled')     || '',
                daysOfWeekHighlighted   = _this.attr('data-daysOfWeekHighlighted')  || '',
                datesDisabled           = _this.attr('data-datesDisabled')          || '',
                zIndexOffset            = _this.attr('data-zIndexOffset')                || 10,
                showOnFocus             = _this.attr('data-showOnFocus')            || true,
                title                   = _this.attr('data-title')                       || '',
                locales                 = _this.attr('data-quick-locale')                || '',
                layoutRounded           = _this.attr('data-layout-rounded')         || false;




            /* 

                :: DATE FIXES ::
                03:57 PM Friday, May 01, 2020

            */
            if(startDate == 'today' || startDate == 'now') {
                
                startDate = new Date();
            
            } else {

                // Start Date is real date
                if(startDate != -Infinity && startDate.trim() != '')
                    startDate = new Date(startDate);

            }

            // End Date is real date
            if(endDate == 'today' || endDate == 'now')
                startDate = new Date();
            /* 
                :: END DATE FIXES :: 
            */





            if(itemID == '') {
                var itemID = 'rand_'+$.SOW.helper.randomStr(3);
                _this.attr('id', itemID);
            }


            // Link
            if(_this.attr('href') != '') {

                var __startDate = startDate;
                if(__startDate == -Infinity) {
                    __startDate = new Date(startDate);
                }

                var __d         = {};
                    __d['dd']   = __startDate.getDate();
                    __d['mm']   = __startDate.getMonth()+1;
                    __d['yyyy'] = __startDate.getFullYear();


                if(format.indexOf('/') !== -1) {
                    var __dateSplit = format.split('/');
                    var __sepy = '/';
                }

                else if(format.indexOf('-') !== -1) {
                    var __dateSplit = format.split('-');
                    var __sepy = '-';
                }

                else if(format.indexOf('.') !== -1) {
                    var __dateSplit = format.split('.');
                    var __sepy = '.';
                }

                else if(format.indexOf(',') !== -1) {
                    var __dateSplit = format.split(',');
                    var __sepy = ',';
                }
        
                else if(format.indexOf(' ') !== -1) {
                    var __dateSplit = format.split(' ');
                    var __sepy = ' ';
                }

                var dateShort = __d[__dateSplit[0]] + __sepy + __d[__dateSplit[1]] + __sepy + __d[__dateSplit[2]];
                _this.text(dateShort);

            }



            // $.fn.datepicker.dates.en = {
            //  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            //  daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            //  daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            //  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            //  monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            //  today: "Today",
            //  clear: "Clear",
            //  titleFormat: "MM yyyy"
            // };
            if(typeof locales === 'object')
                $.fn.datepicker.dates.en = locales;

            if( typeof daysOfWeekDisabled === 'object' )
                daysOfWeekDisabled = daysOfWeekDisabled.toString();

            if( typeof daysOfWeekHighlighted === 'object' )
                daysOfWeekHighlighted = daysOfWeekHighlighted.toString();

            if( typeof datesDisabled === 'object' )
                datesDisabled = datesDisabled.toString();

            _this.addClass('js-datepickified').datepicker({
                language                : language,
                format                  : format, 
                rtl                     : ($.SOW.globals.direction == 'rtl') ? true  : false,
                startDate               : startDate,
                endDate                 : endDate,
                changeMonth             : changeMonth+''        != 'true'   ? false : true,
                todayBtn                : todayBtn+'' == 'true' ? 'linked' : null,
                calendarWeeks           : calendarWeeks+''      != 'true'   ? false : true,
                autoclose               : autoclose+''          != 'true'   ? false : true,
                todayHighlight          : todayHighlight+''     != 'true'   ? false : true,
                clearBtn                : clearBtn+''           != 'true'   ? false  : true,
                enableOnReadonly        : enableOnReadonly+''   != 'true'   ? false  : true,

                daysOfWeekDisabled      : daysOfWeekDisabled,
                daysOfWeekHighlighted   : daysOfWeekHighlighted,
                datesDisabled           : datesDisabled,

                title                   : title,
                showOnFocus             : changeMonth+''        != 'true'  ? false  : true,
                zIndexOffset            : Number(zIndexOffset) || 10,
                showWeekDays            : showWeekDays+''       != 'true'  ? false : true,
                templates               : {
                                            leftArrow:  ($.SOW.globals.direction == 'rtl') ? '<i class="fi fi-arrow-right"></i>'    :  '<i class="fi fi-arrow-left"></i>',
                                            rightArrow: ($.SOW.globals.direction == 'rtl') ? '<i class="fi fi-arrow-left"></i>'     :  '<i class="fi fi-arrow-right"></i>'
                                        },

                dates                   : {
                    en: {
                        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        today: "Today",
                        clear: "Clear",
                        titleFormat: "MM yyyy"
                    }
                }

            }).click( function(e) {

                // on input click (not datepicker)
                setTimeout(function() { // disable "blink" on click
                    $('.datepicker-dropdown').addClass('animate-none');

                    if(layoutRounded+'' == 'true') {
                        $('.datepicker-dropdown').addClass('datepicker-rounded');
                    }

                },200);
                


            }).on('changeDate', function(e) {

                // AJAX POST - OPTIONAL
                var dateFull = e.date;

                $.SOW.vendor.datepicker.updateAjax(_this, dateFull, format);

            }).data('datepicker'); 


        },







        /**
         *
         *  @updateAjax
         *
         *
         **/
        updateAjax: function(_this, dateFull, format) {

            var _updateMethod           = _this.data('ajax-method')                     || $.SOW.vendor.datepicker.config.method,
                _updateUrl              = _this.data('ajax-url')                        || '',
                _updateParams           = _this.data('ajax-params')                     || '',
                _toastSuccessMsg        = _this.data('toast-success')                   || 'Sucessfully Updated!',
                _toastPosition          = _this.data('toast-position')                  || 'top-center',
                _itemID                 = _this.data('id')                              || '',
                data_params             = $.SOW.vendor.datepicker.config.data_params;

            if(_updateUrl == '')
                return;




            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
            // Yes, we can get with val() but
            // will not work if span/div used instead of input
            var _date       = new Date(dateFull);
            var __d         = {};
                __d['dd']   = _date.getDate();
                __d['mm']   = _date.getMonth()+1;
                __d['yyyy'] = _date.getFullYear();

            if(__d['dd']<10){ __d['dd']='0'+__d['dd'] } 
            if(__d['mm']<10){ __d['mm']='0'+__d['mm'] } 

            if(format.indexOf('/') !== -1) {
                var __dateSplit = format.split('/');
                var __sepy = '/';
            }

            else if(format.indexOf('-') !== -1) {
                var __dateSplit = format.split('-');
                var __sepy = '-';
            }

            else if(format.indexOf('.') !== -1) {
                var __dateSplit = format.split('.');
                var __sepy = '.';
            }

            else if(format.indexOf(',') !== -1) {
                var __dateSplit = format.split(',');
                var __sepy = ',';
            }

            else if(format.indexOf(' ') !== -1) {
                var __dateSplit = format.split(' ');
                var __sepy = ' ';
            }

            var dateShort = __d[__dateSplit[0]] + __sepy + __d[__dateSplit[1]] + __sepy + __d[__dateSplit[2]];
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --




            if(_updateParams != '') {

                var ajax_params_arr = $.SOW.helper.params_parse(_updateParams);
                for (var i = 0; i < ajax_params_arr.length; ++i) {
                    data_params[ajax_params_arr[i][0]] = ajax_params_arr[i][1];
                }

            }



            // Add item id
            data_params.id                  = _itemID;
            data_params.date_full           = dateFull;
            data_params.date_short          = dateShort;


            // UPDATE ORDER VIA AJAX
            jQuery.ajax({
                url:            _updateUrl,
                data:           data_params,
                type:           _updateMethod,
                contentType:    $.SOW.vendor.datepicker.config.contentType,
                dataType:       $.SOW.vendor.datepicker.config.dataType,
                headers:        $.SOW.vendor.datepicker.config.headers,
                crossDomain:    $.SOW.vendor.datepicker.config.crossDomain,

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


                    // Is a link, update
                    if(_this.attr('href') != '') {
                        _this.text(dateShort);
                    }

                }
            });


        }


    };


})(jQuery);