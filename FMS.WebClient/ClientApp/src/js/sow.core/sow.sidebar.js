/**
 *
 *  [SOW] Sidebar
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.sidebar.init();
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
    var scriptInfo      = 'SOW Sidebar';


    $.SOW.core.sidebar = {


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

            if(jQuery('aside').length < 1)
                return;

            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --


            $.SOW.core.sidebar.sidebar_toggle();
            $.SOW.core.sidebar.sidebar_minify();
            $.SOW.core.sidebar.sidebar_extended();
            
            return this.collection;

        },



        /**
         *
         *  @sidebar_toggle
         *  Mobile show|hide sidebar
         *
         **/
        sidebar_toggle: function() {


            jQuery('.btn-sidebar-toggle').on('click', function(e) {
                e.preventDefault();

                var _href = jQuery(this).attr('href') || '';

                if(_href == '' || _href == '#')
                    return;

                jQuery(_href).toggleClass('js-aside-show');
                $.SOW.helper.overlay('toggle');

                jQuery(this).toggleClass('active');

                // toggle back on overlay click
                jQuery('#overlay-default').unbind().on('click', function(e) {
                    $.SOW.helper.overlay('hide');
                    jQuery(_href).removeClass('js-aside-show');
                    jQuery('.btn-sidebar-toggle').removeClass('active');
                });

            });


            /** 

                CLOSE SIDEBAR ON ITEM CLICK
                Add to nav: .nav-link-click-close

            **/
            if($.SOW.globals.is_mobile === true) {

                jQuery('nav.nav-link-click-close a.nav-link').on('click', function() {
                    var _href = jQuery(this).attr('href');

                    if(_href != '#' && _href != '#!' && _href != 'javascript:;') {
                        $.SOW.helper.overlay('hide');
                        jQuery('aside').removeClass('js-aside-show');
                        jQuery('.btn-sidebar-toggle').removeClass('active');
                    }

                });

            }

        },




        /**
         *
         *  @sidebar_minify
         *  href used as a target ID
         *
         **/
        sidebar_minify: function() {

            jQuery('.btn-aside-minify').on('click', function(e) {
                e.preventDefault();

                var _href = jQuery(this).attr('href') || '';

                if(_href == '' || _href == '#' || _href == '#!' || _href == 'javascript:;')
                    return;

                $.SOW.globals.elBody.toggleClass('aside-min');
            });

        },




        /**
         *
         *  @sidebar_extended
         *  
         *
         **/
        sidebar_extended: function() {

            jQuery('.btn-aside-item-extended-close').unbind().on('click', function(e) {
                e.preventDefault();

                jQuery(this).parent().closest('.nav-item.active').removeClass('active');

            });

        },




        /**
         *
         *  @sidebar_dispose
         *  
         *
         **/
        sidebar_dispose: function() {

            jQuery('.btn-sidebar-toggle').unbind('click');
            jQuery('.btn-sidebar-toggle-minify').unbind('click');
            jQuery('.btn-aside-item-extended-close').unbind('click');
            jQuery('.nav-deep .nav-link').unbind('click');

        },

    };


})(jQuery);