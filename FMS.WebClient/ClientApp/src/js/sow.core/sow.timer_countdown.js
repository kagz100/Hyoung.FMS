/**
 *
 *  [SOW] Timer Countdown
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.timer_countdown.init('.timer-countdown');
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
    var scriptInfo          = 'SOW Timer Countdown';
    window.timeleft         = [];
    window._timerInterval   = [];


    $.SOW.core.timer_countdown = {


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
                $.SOW.core.timer_countdown.process($('.timer-countdown'));
                return this.collection;
            }

            // 2. Has selector
            return this.collection.each(function() {
                
                $.SOW.core.timer_countdown.process($(this));

            });

        },



        /**
         *
         *  @process
         *  
         *
         **/
        process: function(_this) {

            var _time       = _this.data('timer-countdown-from')                || '',
                _inline     = _this.hasClass('timer-countdown-inline') ? true : false,
                _elID       = _this.attr('id')                                  || '';

            if(_time == '')
                return;


            // Remove hide class if exist
            _this.removeClass('hide hide-force');

            var _rand = 'rand_' + $.SOW.helper.randomStr(8);

            // if element has no id, add one
            if(_elID == '') {
                var _elID = _rand;
                _this.attr('id', _rand);
            }


            // Numeric - milisseconds|seconds passed
            if(typeof _time === 'number') {

                // Calculate in seconds and set initial time left
                window.timeleft[_elID] = (_time > 1000) ? Math.round(_time / 1000) : Math.round(_time);

            } else {

                var _time           = _time.trim(),
                    __dateNow       = new Date(),
                    __dateFuture    = new Date(_time),
                    offset          = __dateFuture.getTimezoneOffset() * 60 * 1000,

                    withOffset      = __dateFuture.getTime(),
                    withoutOffset   = withOffset - offset,
                    _msRemains      = withOffset - __dateNow;


                    window.timeleft[_elID] = Math.round(_msRemains / 1000);

            }


            /*
                Date is in the past, no time left!
                Stop here, to avoid callback
            */
            if(window.timeleft[_elID] < 1)
                return;


            // Show time before starting 
            $.SOW.core.timer_countdown.timer_compute(_this, _elID, _inline, false);

            // Start loop, each second
            window._timerInterval[_elID] = setInterval(function() {

                $.SOW.core.timer_countdown.timer_compute(_this, _elID, _inline, true);

            }, 1000);


        },




        /**
         *
         *  @timer_compute
         *  
         *
         **/
        timer_compute: function(_this, _elID, _inline, _calledByInterval) {

            // If page switched by ajax or element removed,
            // the loop goes on and callback is fired
            // we avoid this by checking the element
            var __elID = _this.attr('id');
            if(jQuery('#'+__elID).length < 1) {
                $.SOW.core.timer_countdown.timer_compute_stop(_elID);
                return;
            }



            // Time end! 00:00:00
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
            if(window.timeleft[_elID] < 0) {

                // Stop loop!
                $.SOW.core.timer_countdown.timer_compute_stop(_elID);

                var _callback       = _this.data('timer-countdown-callback-function')   || '',
                    _endSelfHide    = _this.data('timer-countdown-end-hide-self')       || false,
                    _endTargetHide  = _this.data('timer-countdown-end-hide-target')     || '';


                // Self hide
                if(_endSelfHide == true)
                    _this.addClass('hide hide-force');
                
                // Another container (or more separated by space) hide
                if(_endTargetHide != '')
                    jQuery(_endTargetHide).addClass('hide hide-force');



                // custom callback function
                if(_callback != '' && _calledByInterval === true) {

                    // get element id or assign a random one
                    var _elID = _this.attr('id') || '';
                    $.SOW.helper.executeFunctionByName(_callback, window, _elID);
                                
                }

                return false;
            }
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --



            // Compute output format time like 00:00:50
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
            var __date      = new Date(null);
                            __date.setSeconds(window.timeleft[_elID]);

            var timeString  = __date.toISOString().substr(11, 8);
            var daysleft    = $.SOW.helper.time_from_ms(window.timeleft[_elID] * 1000, 'd');

            if(daysleft > 0) {
                var _cutHours       = timeString.substr(0, 2);
                var _addedDaysHours = Number(_cutHours) + daysleft * 24;
                var timeString      = _addedDaysHours + timeString.substr(2, 8);
            }


            // update timeleft
            window.timeleft[_elID] = Math.round(window.timeleft[_elID] - 1);
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


            if(_inline === true)
                $.SOW.core.timer_countdown.timer2html(_this, timeString);
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


            // update element
            else _this.html(timeString);

        },




        /**
         *
         *  @timer_compute_stop
         *  
         *
         **/
        timer_compute_stop: function(_elID) {

            // Stop loop!
            if(_elID)
                clearInterval(window._timerInterval[_elID]);

            return true;
        },




        /**
         *
         *  @timer2html
         *  
         *
         **/
        timer2html: function(_this, timeString) {
            // return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0); // working: return true if bisect year!

            if(timeString == '00:00:00')
                return;


            var _timeSplit      = timeString.split(':'),
                _hours          = 0,
                _days           = 0,
                _years          = 0;


            // calc no of days
            if(_timeSplit[0] >= 24) {
                _days   = Math.floor(_timeSplit[0] / 24);   // round always down
                _hours  = Math.floor(_timeSplit[0] % 24);   // round always down
            } else {
                _hours  = Math.floor(_timeSplit[0] % 24);   // round always down            
            }

            // calc no of years
            if(_days >= 365)
                _years = Math.floor(_days / 365);           // round always down



            // update dom
            jQuery('.s', _this).text(_timeSplit[2]);        // seconds
            jQuery('.m', _this).text(_timeSplit[1]);        // minutes
            jQuery('.h', _this).text(_hours);               // hours
            jQuery('.d', _this).text(_days);                // days
            jQuery('.y', _this).text(_years);               // years


        }


    };


})(jQuery);