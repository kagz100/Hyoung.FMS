/**
 *
 *  [SOW] Slimscroll
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.vendor.slimscroll.init('.slimscroll')
 *  @Ajax Support   YES
 *
 *  @Issues         Slimscroll uses overflow-hidden so nothing outside is visible!
                    Admin expanded menu will not work!
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
    var scriptInfo      = 'Vendor Slimscroll';


    $.SOW.vendor.slimscroll = {


        /**
         *
         *  @config
         *
         *
         **/
        config: {

            height:             '100%',
            color:              '#444',
            size:               '3px',
            railColor:          '#ccc',
            railOpacity:        0.5,
            alwaysVisible:      false,
            railVisible:        true,
            position:           ($.SOW.globals.direction == 'ltr') ? 'right' : 'left',

            distance:           '0',
            wheelStep:          10,
            allowPageScroll:    false,
            disableFadeOut:     false

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

            if (!jQuery().slimScroll) {

                var paths = $.SOW.helper.vendorLogicPaths('slimscroll');
                if(paths['path_js'] == '') {
                    $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                    return null;
                }

                $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

                    if (!jQuery().slimScroll) {
                        $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                        return null;
                    }

                    // self reinit, external js loaded!
                    $.SOW.vendor.slimscroll.init(selector, config);
                    return null;

                });

                return null;
            }
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


            // Disable on mobile device
            else if($.SOW.globals.is_mobile === true) {
                $.SOW.helper.consoleLog('Mobile disabled : ' + scriptInfo);
                return;
            }


            // Selector
            var __selector          = $.SOW.helper.__selector(selector);
            var __config            = $.SOW.helper.check_var(config);
            this.selector           = __selector[0];    // '#selector'
            this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;


            $(this.selector).slimScroll({

                height:             this.config.height,
                color:              this.config.color,
                size:               this.config.size,
                railColor:          this.config.railColor,
                railOpacity:        this.config.railOpacity,
                alwaysVisible:      this.config.alwaysVisible,
                railVisible:        this.config.railVisible,
                position:           this.config.position,

                distance:           this.config.distance,
                wheelStep:          this.config.wheelStep,
                allowPageScroll:    this.config.allowPageScroll,
                disableFadeOut:     this.config.disableFadeOut

            });

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

            $(selector).slimScroll({
                destroy: true
            });

        }

    };


})(jQuery);