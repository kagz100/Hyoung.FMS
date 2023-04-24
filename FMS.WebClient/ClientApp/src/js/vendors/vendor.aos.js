/**
 *
 *  [SOW] AOS
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.vendor.aos.init()
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
    var scriptInfo      = 'Vendor AOS';


    $.SOW.vendor.aos = {



        /**
         *
         *  @config
         *
         *
         **/
        config: {
            duration    : 700,                  // 700
            easing      : 'ease-in-out-sine',   // 'ease-out-quad',
            once        : true,
            // startEvent   : 'load'            // DO NOT USE! NOT WORKING IN OPERA!
        },





        /**
         *
         *  @init
         *
         *
         **/
        init: function (selector, config) {


            // Check Vendor ; dymanically load if missing (should be external)
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            if (typeof AOS === "undefined") {

                var paths = $.SOW.helper.vendorLogicPaths('aos');
                if(paths['path_js'] == '') {
                    $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                    return null;
                }

                $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

                    if (typeof AOS === "undefined") {
                        $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                        return null;
                    }

                    // self reinit, external js loaded!
                    $.SOW.vendor.aos.init(selector, config);
                    return null;

                });

                return null;
            }
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



            var __config            = $.SOW.helper.check_var(config);
            this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;


            /**
                jQuery('[data-aos]').each(function() {
                    var _once = jQuery(this).data('[data-aos-once]') || '';
                    if(_once == '')
                        jQuery(this).attr('data-aos-once', 'true');
                });
            **/


            AOS.init($.SOW.vendor.aos.config);

            if(!window["MutationObserver"])
                AOS.refreshHard();


        },

    };


})(jQuery);