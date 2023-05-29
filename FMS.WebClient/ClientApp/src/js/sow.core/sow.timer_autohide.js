/**
 *
 *  [SOW] Timer Autohide
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.timer_autohide.init('.timer-autohide');

    <div class="timer-autohide" data-timer-autohide="4000">...</div>

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
    var scriptInfo      = 'SOW Timer Autohide';


    $.SOW.core.timer_autohide = {


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
                $.SOW.core.timer_autohide.process($('.autohide'));
                return this.collection;
            }

            // 2. Has selector
            return this.collection.each(function() {
                
                $.SOW.core.timer_autohide.process($(this));

            });

        },



        /**
         *
         *  @process
         *  

            <div data-autohide="3000">
                ....
            </div>
         *
         **/
        process: function(_this) {


            var _time = _this.data('timer-autohide') || 0;

            if(_time < 1)
                return;


            setTimeout(function() {

                _this.fadeOut(100, function() {
                    // _this.remove();
                });

            }, Number(_time));

        },


    };


})(jQuery);