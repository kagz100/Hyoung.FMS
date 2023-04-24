/**
 *
 *  [SOW] Vendor Bilerplate : STARTUP|EXAMPLE
 *
 *  @author         My Name
 *                  www.mysite.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.vendor.boilerplate.init('#selector', config)
 *  @Ajax Support   [YES|NO]

    ***********************************************************************************************************
    ALREADY BINDED AND READY TO USE
        $.SOW.globals.direction                             'ltr|rtl'
        $.SOW.globals.width                                 actual width        (updated on resize)
        $.SOW.globals.is_mobile                             true|false
        $.SOW.globals.is_admin                              true|false          (admin layout if body.layout-admin)
        $.SOW.globals.elBody                                body element        $('body')
        $.SOW.globals.elHeader                              header element      $('#header')
        $.SOW.globals.elAside                               main sidebar element        $('#aside-main')
        $.SOW.globals.breakpoints.[sm|md|lg|xl]             sm = 576
                                                            md = 768
                                                            lg = 992
                                                            xl = 1200
    
    HELPERS
        $.SOW.helper.consoleLog('...message');              debugging purpose only - debug must be enabled in config
        $.SOW.helper.check_var(variable);                   check variable (return null if undefined)
        $.SOW.helper.randomStr(8);                          generate random string
            * see sow.helper.js for more

    AJAX REINIT
        $.SOW.reinit('#container')                          reinit plugins for a specific ajax container; see also:
                                                            config: sow__plugins_autoinit
    ***********************************************************************************************************

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
    var scriptInfo      = 'Vendor Boilerplace';


    $.SOW.vendor[scriptName] = {


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

            if (!jQuery().somevendor) {

                var paths = $.SOW.helper.vendorLogicPaths(scriptName);
                if(paths['path_js'] == '') {
                    $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                    return null;
                }

                $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

                    if (!jQuery().somevendor) {
                        $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                        return null;
                    }

                    // self reinit, external js loaded!
                    $.SOW.vendor.[scriptName].init(selector, config);
                    return null;

                });

                return null;
            }
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


            // Check vendor
            if (!jQuery().somevendor) {
                $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                return;
            }


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
                $.SOW.vendor[scriptName].process(null);
                return null; // on chaining
            }

            // 2. Has selector
            return this.collection.each(function() {
                
                $.SOW.vendor[scriptName].process($(this));

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