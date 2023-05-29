/**
 *
 *  [SOW] Nav Deep
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.nav_deep.init('.nav-deep', {speed:200});
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
    var scriptInfo      = 'SOW Nav Deep';
    window.firstLoad    = true;

    $.SOW.core.nav_deep = {


        /**
         *
         *  @config
         *
         *
         **/
        config: {
            speed: 200
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

            var __selector          = $.SOW.helper.__selector(selector);
            var __config            = $.SOW.helper.check_var(config);

            this.selector           = __selector[0];    // '#selector'
            this.collection         = __selector[1];    // $('#selector')
            this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;


            // Nav Tabs
            $.SOW.core.nav_deep.process_tabs();


            if(jQuery(this.selector).length < 1)
                return;


            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --


            // on page refresh, scroll sidebar to active link/item
            // in case there are many links!
            if(window.firstLoad) {
                window.firstLoad = false;
                $.SOW.core.nav_deep.asideScrollToActiveLink(this.selector);
            }
            

            // 1. Has no selector
            if(!this.selector) {
                $.SOW.core.nav_deep.process($('.nav-deep'));
                return this.collection;
            }

            // 2. Has selector
            return this.collection.each(function() {

                $.SOW.core.nav_deep.process($(this));

            });

        },



        /**
         *
         *  @process
         *
         *
         **/
        process: function(_this) {

            _this.not('.js-ajaxified').addClass('js-ajaxified').each(function() {

                var _tnd        = jQuery(this),
                    js_ignore   = _tnd.hasClass('js-ignore');

                $('.nav-link', jQuery(this)).on('click', function(e) {

                    var _t                          = jQuery(this),
                        _href                       = _t.attr('href')   || '#',
                        _target                     = _t.attr('target') || '';


                    // Ignore on target _blank, _self...
                    if(_target != '')
                        return;



                    if(!_t.parent('.nav-item').hasClass('active')) {

                        // 1. Open
                        $.SOW.core.nav_deep.nav_deep_open(_t);
                    
                    } else { 

                        // 2. Close
                        $.SOW.core.nav_deep.nav_deep_close(_t);

                    }



                    // 3. Close all other open navs only if .js-ignore is not present!
                    if(!js_ignore)
                        $.SOW.core.nav_deep.nav_deep_close_all(_t);



                    // --
                    if(_href == '#' || _href == '#!') 
                        e.preventDefault();

                });

            });

        },






        /**

            :: Single Item
            Navigation Links : Open

        **/
        nav_deep_open: function(_t) {

            _t.next('ul').slideDown(this.config.speed, function(e) {
                _t.parent('.nav-item').addClass('active');
                jQuery(this).css({"display":""}); // remove display: block
            });

        },



        /**

            :: Single Item
            Navigation Links : Close
            

        **/
        nav_deep_close: function(_t) {

            _t.next('ul').slideUp(this.config.speed, function(e) {
                _t.parent('.nav-item').removeClass('active');
                jQuery(this).css({"display":""}); // remove display: block
            });

        },




        /**

            :: Multiple Items
            Navigation Links : Close Active 
            

        **/
        nav_deep_close_all: function(_t) {

            // Close all open parents
            _t.parent('.nav-item').parent().find('.nav-item.active').not(_t.parent('.nav-item')).find('ul.nav').slideUp(this.config.speed, function(e) {

                jQuery(this).parent('.nav-item.active').removeClass('active').next().find('ul.nav').css({"display":""}); // remove display: block added by slideUp()

            });

        
            // Single link (no childs) - add .active. Ajax Purpose!
            if(_t.next().find('ul.nav').length < 1)
                _t.parent('.nav-item').addClass('active');


            // Remove .active from singles (without childs) - ajax purpose only
            setTimeout(function() { // do not interfere with the one above!
                _t.parent('.nav-item').parent().find('.nav-item.active').not(_t.parent('.nav-item')).removeClass('active');
            }, this.config.speed + 30);

        },





        /**
         *
         *  @asideScrollToActiveLink
         *  
            on page refresh, scroll sidebar to active link/item
            needed when there are many links!

            Do not move this function to sow.sidebar.js
            this selector is needed!
         *
         **/
        asideScrollToActiveLink: function(selector) {

            if(jQuery('aside '+selector+' .nav-item.active').length < 1)
                return;

            var activeLinkOffset        = jQuery('aside '+selector+' .nav-item.active').offset();
            var scrollableDivOffset     = jQuery('aside .scrollable-vertical').offset();

            // issue when window height is smaller and element is fixed/absolute outside of viewport
            if(!scrollableDivOffset || !activeLinkOffset) return;

            var scrollDivTo             =  (activeLinkOffset.top - scrollableDivOffset.top) - Math.round($.SOW.globals.height / 8);

            if(activeLinkOffset.top < $.SOW.globals.height)
                return;

            jQuery('aside .scrollable-vertical:not(.js-ignore)').animate({
                scrollTop: scrollDivTo
            }, 0);

        },





        /**
         *
         *  @process_tabs
         *  @add to any tab link: .nav-link-remember
         *
         **/
        process_tabs: function() {

            // add to localStorage
            jQuery('a.nav-link-remember').on('click', function(e) {
                localStorage.setItem('activeNavTab', jQuery(e.target).attr('href'));
            });

            // get from localStorage
            var activeNavTab = localStorage.getItem('activeNavTab');
            if(activeNavTab) {
                jQuery('a.nav-link-remember[href="' + activeNavTab + '"]').tab('show');
            }

        }


    };


})(jQuery);