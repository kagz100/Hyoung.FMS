/**
 *
 *  [SOW] Sticky Kit
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.vendor.sticky_kit.init('.sticky-kit')
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
    var scriptInfo      = 'Vendor Sticky Kit';


    $.SOW.vendor.sticky_kit = {


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
            this.selector_orig      = __selector[2];    // $('#selector') // without ajax container prefix
            this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;


            // Check Vendor ; dymanically load if missing (should be external)
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            if(selector != '') {
                if(jQuery(this.selector).length < 1)
                    return null;
            }

            if (!jQuery().stick_in_parent) {

                var paths = $.SOW.helper.vendorLogicPaths('sticky_kit');
                if(paths['path_js'] == '') {
                    $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                    return null;
                }

                $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

                    if (!jQuery().stick_in_parent) {
                        $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                        return null;
                    }

                    // self reinit, external js loaded!
                    $.SOW.vendor.sticky_kit.init(selector, config);
                    return null;

                });

                return null;
            }
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --


            jQuery(window).resize(function() {
                setTimeout(function() {

                    if($.SOW.globals.is_mobile === true) {

                        jQuery(this.selector).each(function() {
                            $(this).removeClass('js-stickified').trigger("sticky_kit:detach");
                        });

                    } else {

                        $.SOW.vendor.sticky_kit.process(this.selector);

                    }

                }, 450);
            });


            // on load
            $.SOW.vendor.sticky_kit.process(this.selector);


            return $(this.selector);
        },



        /**
         *
         *  @process
         *
         *
         **/
        process: function(_this) {
            
            if($.SOW.globals.is_mobile === true)
                return;

            jQuery(_this).not('.js-stickified').addClass('js-stickified').each(function() {

                    
                var _t          = jQuery(this),
                    _offset     = _t.data('sticky-kit-offset') || 0; // in pixels

                // Auto offset, according to header settings
                if(_offset < 1) {

                    // default
                    _offset     = 15;

                    if($.SOW.globals.elBody.hasClass('header-sticky') || $.SOW.globals.elBody.hasClass('header-scroll-reveal') || $.SOW.globals.elBody.hasClass('header-over'))
                        _offset = ($.SOW.globals.elHeader.outerHeight() || 0) + _offset;

                }


                _t.stick_in_parent({
                    offset_top: Number(_offset)
                });

            });

        }

    };


})(jQuery);