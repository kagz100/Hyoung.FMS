/**
 *
 *  [SOW] Count Animate
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.count_animate.init()
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
    var scriptInfo              = 'SOW Count Animate';
    window.sowCountInterval     = null;
    window.sowCountBtnList      = {};
    // window.startScrollPos        = 0;


    $.SOW.core.count_animate = {



        /**
         *
         *  @config
         *
         *
         **/
        config: {
            count_duration  : 1500,
            easing          : 'easeInOutExpo', // easeOutExpo, easeInOutExpo, linear, swing
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

            var el_selector         = '[data-toggle=count]';
            var btn_selector        = '[data-count-target]';

            var __config            = $.SOW.helper.check_var(config);
            this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;


            // init button
            $.SOW.core.count_animate.btn_process(el_selector, btn_selector);
            // --


            if($(el_selector).length < 1) {

                // stop everything
                if(window.sowCountInterval !== null) {
                    clearInterval(window.sowCountInterval);
                    window.sowCountInterval = null;
                    $(el_selector).stop(true, true); // stop all animations
                }

                return;
            }


            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --


            // On Load
            // window.startScrollPos = jQuery(window).scrollTop() || 0; // used on scroll up
            $.SOW.core.count_animate.process($(el_selector));



            var scrolling   = false;
            $(window).scroll(function() {
                scrolling = true;
            });

            window.sowCountInterval = setInterval( function() {

                if(scrolling) {
                    scrolling = false;
                    $.SOW.core.count_animate.process($(el_selector));
                }

            }, 250);


            // it's always cool to return something that nobody will ever need :)
            return $(el_selector);

        },





        /**
         *
         *  @process
         *  
         *
         **/
        process: function(_this) {

            // custom easing
            $.SOW.core.count_animate.custom_easing();

            var topPos      = jQuery(window).scrollTop() || 0;
            var scrollPos   = ($.SOW.globals.height || 0) + topPos;

            _this.not('.js-count-completed').each(function(e) {

                var _t              = jQuery(this),
                    _offset         = _t.offset(),
                    elOffsetTop     = _offset.top || 0;


                /**
                    
                    Known issue: refresh when scroll is on middle

                    // on scroll up (from refresh)
                    var elOffsetTop2 = elOffsetTop + $.SOW.globals.height;
                    if(window.startScrollPos > $.SOW.globals.height && scrollPos < elOffsetTop2)
                        $.SOW.core.count_animate.animate(_t);

                    // on scroll down
                    else if (window.startScrollPos < $.SOW.globals.height && scrollPos > elOffsetTop)
                        $.SOW.core.count_animate.animate(_t);

                **/

                /* on scroll down only */
                if (scrollPos > elOffsetTop)
                    $.SOW.core.count_animate.animate(_t);

            });
           
        },




        /**
         *
         *  @animate
         *  
         *
         **/
        animate: function(_t) {

            var count_from      = _t.attr('data-count-from')        || 0,
                count_to        = _t.attr('data-count-to')          || 0,
                count_duration  = _t.attr('data-count-duration')    || $.SOW.core.count_animate.count_duration,
                callback        = _t.data('count-callback')         || '',
                count_decimals  = _t.data('count-decimals')         || '',
                oncomplete      = _t.data('count-oncomplete')       || '';

            if(count_from == count_to)
                return;

            // https://api.jquery.com/animate/
            jQuery({sowCount:count_from}).animate({sowCount:count_to}, {

                duration:   Number(count_duration),
                easing:     $.SOW.core.count_animate.easing, //'linear', 'swing'
                queue:      true,

                step: function(curr) {



                    var numRes  = count_to.substr(0, count_to.indexOf('.')),
                        _val    = (numRes) ? parseFloat(curr).toFixed(2) : Math.floor(curr);

                    if(count_decimals)
                        var _val = parseFloat(_val).toFixed(count_decimals);

                    _t.text(_val);

                },

                start: function() {

                    _t.addClass('js-count-completed');

                },

                complete: function() {

                    if(callback != '' && typeof $.SOW.helper.executeFunctionByName === "function")
                        $.SOW.helper.executeFunctionByName(callback, window, _t);


                    if(typeof oncomplete === 'object') {

                        if(oncomplete.target) {

                            if(oncomplete.action.toLowerCase() == 'show')
                                jQuery(oncomplete.target).removeClass('hide hide-force');

                            else if(oncomplete.action.toLowerCase() == 'hide')
                                jQuery(oncomplete.target).addClass('hide hide-force');

                            if(oncomplete.class)
                                jQuery(oncomplete.target).addClass(oncomplete.class);

                        }
                    }

                },

                done: function(_e) {
                    _e.stop(true, true);
                }

            });

        },





        /**
         *
         *  @btn_process
         *  
         *
         **/
        btn_process: function(el_selector, btn_selector) {

            if(jQuery(btn_selector).length < 1)
                return;

            // custom easing
            $.SOW.core.count_animate.custom_easing();

            // reset for each page (ajax required)
            window.sowCountBtnList = {};

            jQuery(btn_selector).each(function() {

                var _thisBtn    = jQuery(this),
                    _action     = (_thisBtn.is('a') || _thisBtn.is('button')) ? 'click' : 'change';

                _thisBtn.on(_action, function(e) {

                    var _t          = jQuery(this),
                        _href       = _t.attr('href')                   || null,
                        _target     = _t.data('count-target')           || null,
                        _math       = _t.data('count-math')             || null;

                    if(!_target)    return;
                    if(_href)       e.preventDefault(); // links only!
                    jQuery(_target).stop(true, true);   // stop any animation
                    _t.toggleClass('active');           // mark active



                    // :: MATH
                    // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
                    $.SOW.core.count_animate.btn_process_math(_t);
                    // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --



                    // :: TOGGLE
                    // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
                    $.SOW.core.count_animate.btn_process_toggle(_target);
                    // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


                });


            });

        },





        /**
         *
         *  @btn_process_math
         *  
         *
         **/
        btn_process_math: function(_t) {

            var _target     = _t.data('count-target')           || '',
                _tMth       = jQuery(_target),
                _math       = _t.data('count-math')             || '0',
                _math       = Number(_math),
                is_select   = _t.is('select'),
                el_type     = _t.attr('type'); // radio|checkbox


            // Select
            if(is_select) {

                var _val        = _t.find(':selected').data('count-math')   || 0
                    _lastCalc   = _tMth.attr('data-count-to')               || 0,
                    _calculate  = _val;

            // Checkbox, Radio, etc
            } else {

                // if(_math < 1) 
                //  return;

                var _lastCalc   = _tMth.attr('data-count-last-math')    || 0,
                    _lastCalc   = Number(_lastCalc), // last calculation
                    _baseVal    = _tMth.attr('data-count-base-to')      || '',
                    _currVal    = _tMth.attr('data-count-to')           || 0,
                    _currVal    = Number(_currVal);

                if(_baseVal == '') {
                    var _baseVal    = _currVal,
                        _lastCalc   = _currVal;
                        _tMth.attr('data-count-base-to', _currVal);
                }

                if(el_type == 'radio')
                    var _calculate = (_t.hasClass('active') || _t.is(':checked')) ? Number(_baseVal) + _math : Number(_lastCalc) - _math;

                
                else // invert the math because 'active' class is toggled before
                    var _calculate = (_t.hasClass('active') || _t.is(':checked')) ? Number(_lastCalc) + _math : Number(_lastCalc) - _math;

            }

            _tMth.attr('data-toggle', 'count'); // just in case!
            _tMth.attr('data-count-last-math', _calculate);
            _tMth.attr('data-count-from', _lastCalc);
            _tMth.attr('data-count-to', _calculate);
            $.SOW.core.count_animate.animate(_tMth);

        },





        /**
         *
         *  @btn_process_toggle
         *  
         *
         **/
        btn_process_toggle: function(_target) {

            jQuery(_target).each(function(e) {

                var _el         = jQuery(this),
                    _json       = _el.data('count-toggle')  || '',
                    _elID       = _el.attr('id')            || '';

                if(_elID == '') {
                    _elID = 'rand_' + $.SOW.helper.randomStr(3);
                    _el.attr('id', _elID);
                }

                if(typeof _json === 'object') {

                    // in case a button is used to toggle only one value (from-to)
                    if(!_json[1])
                        _json[1] = {"from":_json[0]['to'], "to":_json[0]['from'], "duration":_json[0]['duration']};


                    if(window.sowCountBtnList[_elID] === 1) {

                        _el.attr('data-toggle', 'count');
                        _el.attr('data-count-from', (_json[1]['from'] != '0') ? _json[1]['to'] : _json[0]['from'] );
                        _el.attr('data-count-to', _json[0]['to']);
                        _el.attr('data-count-duration', _json[0]['duration']);

                        window.sowCountBtnList[_elID] = 0;

                    } else {

                        _el.attr('data-toggle', 'count');
                        _el.attr('data-count-from', _json[1]['from']);
                        _el.attr('data-count-to', _json[1]['to']);
                        _el.attr('data-count-duration', _json[1]['duration']);

                        window.sowCountBtnList[_elID] = 1;
                    }

                    $.SOW.core.count_animate.animate(_el);

                }

            });

        },





        /**
         *
         *  @custom_easing
         *  
         *
         **/
        custom_easing: function() {

            $.extend($.easing, {
                easeInOutExpo: function (x, t, b, c, d) {
                    if (t==0) return b;
                    if (t==d) return b+c;
                    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
                },
                easeOutExpo: function (x, t, b, c, d) {
                    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
                },
            });

        }
    };


})(jQuery);