/**
 *
 *  [SOW] Typed.js
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.vendor.typed.init('.typed')
 *  @Ajax Support   YES
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
    var scriptInfo      = 'Vendor Typed.js';


    $.SOW.vendor.typed = {


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

            // Check Vendor ; dymanically load if missing (should be external)
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            if(selector != '') {
                if(jQuery(selector).length < 1)
                    return null;
            }

            if (typeof Typed !== "function") {

                var paths = $.SOW.helper.vendorLogicPaths('typed');
                if(paths['path_js'] == '') {
                    $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                    return null;
                }

                $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

                    if (typeof Typed !== "function") {
                        $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                        return null;
                    }

                    // self reinit, external js loaded!
                    $.SOW.vendor.typed.init(selector, config);
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
                $.SOW.vendor.typed.process($('.typed'));
                return $('.typed');
            }

            // 2. Has selector
            return this.collection.each(function() {

                $.SOW.vendor.typed.process($(this));

            });

        },



        /**
         *
         *  @process
         *
         *
         **/
        process: function(_this) {

            if(_this.hasClass('js-typified'))
                return;

            var _strings            = _this.data('typed-string')            || '', // format: lorem upsum|dolor sit amet
                _source             = _this.data('typed-source')            || '',
                _speed              = _this.data('typed-speed-forward')     || '',
                _backSpeed          = _this.data('typed-speed-back')        || '',
                _backDelay          = _this.data('typed-back-delay')        || '',
                _loop               = _this.data('typed-loop-times')        || 'infinite',
                _smartBackspace     = _this.data('typed-smart-backspace')   || 'true',
                _shuffle            = _this.data('typed-shuffle')           || 'false',
                _cursorChar         = _this.data('typed-cursor')            || '|',
                _itemID             = _this.attr('id')                      || '';

            _this.addClass('js-typified');

            if(_speed == '') 
                _speed = 80;

            if(_backSpeed == '')
                _backSpeed = _speed / 2;

            if(_strings == '' && _source == '')
                return;

            if(_itemID == '') {
                var _itemID = 'rand_' + $.SOW.helper.randomStr(3);
                _this.attr('id', _itemID);
            }


            var options = {
                typeSpeed:          _speed      || 80,
                backSpeed:          _backSpeed,
                backDelay:          _backDelay  || 700,
                smartBackspace:     (_smartBackspace+'' == 'true')  ? true : false,
                shuffle:            (_shuffle+'' == 'true')         ? true : false,
                loop:               (_loop != '0')                  ? true : false,
                loopCount:          (_loop == 'infinite')           ? 9999 : _loop,
                showCursor:         (_cursorChar != '')             ? true : false,
                cursorChar:         _cursorChar,
            };

            if(_source != '')
                options.stringsElement  = _source;
            else
                options.strings         = _strings.split("|");

            // Inputs / textarea
            var _elType = _this[0].nodeName.toLowerCase();
            if(_elType === 'input' || _elType === 'textarea' || _elType === 'select') {
                options.attr                    = 'placeholder';
                options.bindInputFocusEvents    = true;
                options.showCursor              = false;
            }


            var typed = new Typed('#'+_itemID, options);

        },


    };


})(jQuery);