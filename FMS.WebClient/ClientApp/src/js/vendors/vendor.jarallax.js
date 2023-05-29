/**
 *
 *  [SOW] Jarallax
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.vendor.jarallax.init('.jarallax')
 *  @Ajax Support   YES
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
    var scriptInfo      = 'Vendor Jaralax';


    $.SOW.vendor.jarallax = {


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
            this.selector_orig      = __selector[2];    // $('#selector') // without ajax container prefix
            this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;


            // Check Vendor ; dymanically load if missing (should be external)
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            if(selector != '') {
                if(jQuery(this.selector).length < 1)
                    return null;
            }

            if (typeof jarallax !== "function") {

                var paths = $.SOW.helper.vendorLogicPaths('jarallax');
                if(paths['path_js'] == '') {
                    $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                    return null;
                }

                $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

                    if (typeof jarallax !== "function") {
                        $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                        return null;
                    }

                    // self reinit, external js loaded!
                    $.SOW.vendor.jarallax.init(selector, config);
                    return null;

                });

                return null;
            }
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


            // Destroy first (ajax purpose)
            $.SOW.vendor.jarallax.destroy(this.selector);


            // Init
            jarallax(document.querySelectorAll(this.selector));


            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --


            return $(this.selector);

        },



        /**
         *
         *  @destroy
         *
         *
         **/
        destroy: function(selector) {

            jarallax(document.querySelectorAll(selector), 'destroy');

        }

    };


})(jQuery);