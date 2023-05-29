/**
 *
 *  [SOW] Fancybox
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.vendor.fancybox.init('a.fancybox')
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
    var scriptInfo      = 'Vendor Fancybox';


    $.SOW.vendor.fancybox = {

        /**
         *
         *  @config
         *
         *
         **/
        config: {

            loop                    : true,
            infobar                 : true,
            protect                 : false, // disable right click
            transitionEffect        : "zoom-in-out",
            transitionDuration      : 250,

        },




        /**
         *
         *  @init
         *
         *
         **/
        init: function (selector, config) {

            if(!selector)
                this.selector = 'a.fancybox';

            // Check Vendor ; dymanically load if missing (should be external)
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            if(selector != '') {
                if(jQuery(selector).length < 1)
                    return null;
            }

            if (!jQuery().fancybox) {

                var paths = $.SOW.helper.vendorLogicPaths('fancybox');
                if(paths['path_js'] == '') {
                    $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                    return null;
                }

                $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

                    if (!jQuery().fancybox) {
                        $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                        return null;
                    }

                    // self reinit, external js loaded!
                    $.SOW.vendor.fancybox.init(selector, config);
                    return null;

                });

                return null;
            }
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


            var __selector          = $.SOW.helper.__selector(selector);
            var __config            = $.SOW.helper.check_var(config);

            this.selector           = __selector[0];    // '#selector'
            this.collection         = __selector[1];    // $('#selector')
            this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;


            // http://fancyapps.com/fancybox/3/docs/#setup
            $(this.selector).not('.js-fancyvified').addClass('js-fancyvified').fancybox({

                    beforeShow: function(instance, current) {

                        var _t      = current.opts.$orig;
                        var __class = 'bg-secondary text-white';

                        if(_t.hasClass('fancybox-secondary'))
                            var __class = 'bg-secondary text-white';

                        else if(_t.hasClass('fancybox-dark'))
                            var __class = 'bg-dark text-white';

                        else if(_t.hasClass('fancybox-white'))
                            var __class = 'bg-white text-dark';

                        else if(_t.hasClass('fancybox-dark'))
                            var __class = 'bg-dark text-white';

                        else if(_t.hasClass('fancybox-primary'))
                            var __class = 'bg-primary text-white';

                        else if(_t.hasClass('fancybox-success'))
                            var __class = 'bg-success text-white';

                        else if(_t.hasClass('fancybox-danger'))
                            var __class = 'bg-danger text-white';

                        else if(_t.hasClass('fancybox-warning'))
                            var __class = 'bg-warning text-white';

                        else if(_t.hasClass('fancybox-info'))
                            var __class = 'bg-info text-white';

                        else if(_t.hasClass('fancybox-pink'))
                            var __class = 'bg-pink text-white';

                        else if(_t.hasClass('fancybox-purple'))
                            var __class = 'bg-purple text-white';

                        else if(_t.hasClass('fancybox-indigo'))
                            var __class = 'bg-indigo text-white';

                        jQuery('button.fancybox-button').removeClass('bg-white bg-dark bg-primary bg-secondary bg-success bg-danger bg-warning bg-info bg-pink bg-purple bg-indigo text-dark text-white');
                        jQuery('button.fancybox-button:not(.fancybox-button--close)').addClass(__class);

                    },

                    afterLoad : function(instance, current) {
                        var pixelRatio = window.devicePixelRatio || 1;

                        if ( pixelRatio > 1.5 ) {
                            current.width  = current.width  / pixelRatio;
                            current.height = current.height / pixelRatio;
                        }
                    },

                    loop : $.SOW.vendor.fancybox.config.loop,
                    infobar: $.SOW.vendor.fancybox.config.infobar,

                    buttons: [
                        // "zoom",
                        // "share",
                        // "slideShow",
                        // "fullScreen",
                        // "download",
                        // "thumbs",
                        "close"
                    ],

                    protect: $.SOW.vendor.fancybox.config.protect, // disable right click

                    image: {
                        // Wait for images to load before displaying
                        //   true  - wait for image to load and then display;
                        //   false - display thumbnail and load the full-sized image over top,
                        //           requires predefined image dimensions (`data-width` and `data-height` attributes)
                        preload: false
                    },

                    // Hash value when initializing manually,
                    // set `false` to disable hash change
                    hash: false,


                    // Open/close animation type
                    // Possible values:
                    //   false            - disable
                    //   "zoom"           - zoom images from/to thumbnail
                    //   "fade"
                    //   "zoom-in-out"
                    //
                    animationEffect: "zoom",
                    animationDuration: 366,


                    // Transition effect between slides
                    //
                    // Possible values:
                    //   false            - disable
                    //   "fade'
                    //   "slide'
                    //   "circular'
                    //   "tube'
                    //   "zoom-in-out'
                    //   "rotate'
                    //
                    transitionEffect: $.SOW.vendor.fancybox.config.transitionEffect,
                    transitionDuration: $.SOW.vendor.fancybox.config.transitionDuration,


                    // Loading indicator template
                    // spinnerTpl: '<div class="fancybox-loading"></div>',
                    spinnerTpl: 

                        // == == == same as ajax loader
                        '<div class="position-fixed fixed-bottom w-100 mb-3 z-index-9999 text-center shadow-none">'
                            + '<span class="bg-white d-inline-block px-4 rounded-lg shadow-lg">'
                                + '<i class="'+$.SOW.config.sow__icon_loading+' fs--30 text-muted"></i>'
                            + '</span>'
                        + '</div>',
                        // == == == same as ajax loader


                    btnTpl: {
                        download:
                            '<a download data-fancybox-download class="fancybox-button fancybox-button--download rounded-circle p-0 m-3 fi fi-arrow-download bg-white text-dark shadow-xlg" title="{{DOWNLOAD}}" href="javascript:;">' +
                                // '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg>' +
                            "</a>",

                        zoom:
                            '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom rounded-circle p-0 m-3 fi fi-search bg-white text-dark shadow-xlg" title="{{ZOOM}}">' +
                                // '<svg width="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg>' +
                            "</button>",

                        close:
                            '<button data-fancybox-close class="fancybox-button fancybox-button--close rounded-circle p-0 m-3 '+$.SOW.config.sow__icon_close+' bg-transparent fs--35" title="{{CLOSE}}">' +
                                // '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg>' +
                            "</button>",

                        // Arrows
                        arrowLeft:
                            '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left rounded-circle p-0 m-3 fi fi-arrow-left bg-white text-dark shadow-xlg" title="{{PREV}}">' +
                                // '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div>' +
                            "</button>",

                        arrowRight:
                            '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right rounded-circle p-0 m-3 fi fi-arrow-right bg-white text-dark shadow-xlg" title="{{NEXT}}">' +
                                // '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div>' +
                            "</button>",

                        // This small close button will be appended to your html/inline/ajax content by default,
                        // if "smallBtn" option is not set to false
                        smallBtn:
                            '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small rounded-circle p-0 '+$.SOW.config.sow__icon_close+' bg-white text-dark shadow-xlg" title="{{CLOSE}}">' +
                                // '<svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg>' +
                            "</button>"
                    },
                    smallBtn: false,


            });

            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --


            // no chaining
            return null;
        },

    };


})(jQuery);