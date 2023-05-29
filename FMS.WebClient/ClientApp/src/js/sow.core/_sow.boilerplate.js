/**
 *
 *  [SOW] Plugin Bilerplate : STARTUP|EXAMPLE
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
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
    var scriptName      = 'boilerplate';    // CHANGE THIS
    var scriptInfo      = 'SOW Boilerplace';


    $.SOW.core[scriptName] = {


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
         *  $.SOW.core.scriptName.init('#selector', config);
         *
         **/
        init: function (selector, config) {

            var __selector          = $.SOW.helper.__selector(selector);
            var __config            = $.SOW.helper.check_var(config);

            this.selector           = __selector[0];    // '#selector'
            this.collection         = __selector[1];    // $('#selector')
            this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;


            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --


            // 1. Has no selector
            if(!this.selector) {
                $.SOW.core[scriptName].process(this.collection);
                return this.collection;
            }

            // 2. Has selector
            return this.collection.each(function() {
                
                $.SOW.core[scriptName].process($(this));

            });

        },



        /**
         *
         *  @process
         *
         *
         **/
        process: function(_this) {

            // ...

        },

    };


})(jQuery);