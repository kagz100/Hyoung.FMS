/**
 *
 *  [SOW] Flickity [Ajax Reinit]
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.vendor.flickity.init('div[data-flickity]') (vendor stick with 'div[data-flickity]')
 *  @Ajax Support   YES
 *
 *  @Desc           Controller required if Ajax Navigation used - reinit Flickity
 *                  Without this controller, will not reinit!
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
    var scriptInfo      = 'Vendor Flickity [Ajax Reinit]';


    $.SOW.vendor.flickity = {


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

            if (typeof Flickity !== 'function') {

                var paths = $.SOW.helper.vendorLogicPaths('flickity');
                if(paths['path_js'] == '') {
                    $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                    return null;
                }

                $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

                    if (typeof Flickity !== 'function') {
                        $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                        return null;
                    }

                    // self reinit, external js loaded!
                    $.SOW.vendor.flickity.init(selector, config);
                    return null;

                });

                return null;
            }
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



            jQuery(selector).not('.js-flickity').addClass('js-flickity');
            var nodeList = document.querySelectorAll('.js-flickity');

            for (var i = 0, t = nodeList.length; i < t; i++) {
                var flkty = Flickity.data(nodeList[i]);

                if (!flkty) {

                    // Check if element had flickity options specified in data attribute.
                    var flktyData = nodeList[i].getAttribute('data-flickity');

                    if (flktyData) {

                        var flktyOptions = JSON.parse(flktyData);
                            flktyOptions.rightToLeft = ( $.SOW.globals.direction == 'rtl' ) ? true : false;

                        new Flickity(nodeList[i], flktyOptions);

                    } else {

                        var flktyOptions = { 
                            rightToLeft : ( $.SOW.globals.direction == 'rtl' ) ? true : false 
                        };

                    }

                    // Init ---------------------------------
                    new Flickity(nodeList[i], flktyOptions);
                    // --------------------------------------

                }

            }


            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --

            // no chaining
            return null;

        },


    };


})(jQuery);