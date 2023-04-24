/**
 *
 *  [SOW] GDPR
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.gdpr.init('#gdpr');
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
    var scriptInfo      = 'SOW GDPR';


    $.SOW.core.gdpr = {


        /**
         *
         *  @config
         *
         *
         **/
        config: {

            cookie_name:    '__gdpr',
            cookie_expire:  365,
            cookie_path:    '/', /* Safari Issues */ // $.SOW.globals.cookie_secure, // 'SameSite=None; secure' (Google) 
        
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
            this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;


            if(jQuery(this.selector).length < 1)
                return;


            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --



            // 1. Has no selector
            if(!this.selector) {
                $.SOW.core.gdpr.process('#gdpr');
                return this.collection;
            }

            // 2. Has selector
            $.SOW.core.gdpr.process(this.selector);
            return this.collection;

        },



        /**
         *
         *  @process
         *  

            <!-- 
                GDPR POPUP 

                Reset GDPR:
                    $.SOW.core.gdpr.destroy();
                    OR BY HASH: #del:gdpr

                By hitting 'Accept' Button, cookie is 0 => all cookies accepted.

                ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

                Extend Consent by level:
                        0 = accept all cookies!
                        1 = website only
                        2 = website + advertising
                        ... more if needed

                    JS USAGE:
                        $.SOW.core.gdpr.extend(2); //  // allow website + advertising


                    BACKEND:
                        Backend should use the cookie specified in config (default: cookie_name: '__gdpr')

            -->
            <div id="gdpr" class="hide bg-white rounded-lg shadow-lg w-100 max-w-350 p--30 m--15 position-fixed fixed-bottom right-0 z-index-9999">
                
                <h3 class="fs--18 mb-4">
                    
                    <a href="#" class="close mt--n3">
                        <span class="fi fi-close fs--18" aria-hidden="true"></span>
                    </a>

                    Smarty Cookies

                </h3>

                <hr>

                <p class="lead">
                    We use cookies to improve your experience on our site and to show you personalised ads.
                </p>

                <a href="#" class="btn btn-primary btn-cookie-accept btn-lg btn-block">
                    Accept &amp; Continue
                </a>
                
                <hr class="mt-4 mb-4">
                
                <p class="m--0">

                    <span class="d-block">Need to learn more?</span>

                    <a href="#" class="link-muted">Privacy Policy</a> 
                    
                    &ndash; and &ndash; 
                    
                    <a href="../page/cookie.html" class="link-muted">Cookie Policy</a>

                </p>
            </div>
            <!-- /GDPR POPUP -->

         *
         **/
        process: function(_selector) {

            var __gdpr = Cookies.get($.SOW.core.gdpr.config.cookie_name, { path: $.SOW.core.gdpr.config.cookie_path });

            // --

            // Delete by hash
            if(window.location.hash == '#del:gdpr') {
                $.SOW.helper.consoleLog($.SOW.core.gdpr.config.cookie_name+': Hash Request');
                $.SOW.core.gdpr.destroy();
                var __gdpr = null;
            }

            // --

            if(__gdpr == null) {
                $.SOW.helper.consoleLog($.SOW.core.gdpr.config.cookie_name+': Shown');
                jQuery(_selector).removeClass('hide hide-force');
            } else {
                $.SOW.helper.consoleLog($.SOW.core.gdpr.config.cookie_name+': Refresh');
                Cookies.set($.SOW.core.gdpr.config.cookie_name, __gdpr, { expires: $.SOW.core.gdpr.config.cookie_expire, path: $.SOW.core.gdpr.config.cookie_path }); // refresh
                jQuery(_selector).remove(); // just in case
                return;
            }

            // --

            // Accept Button
            jQuery(' a.btn-cookie-accept:not(.js-gdprified)').addClass('js-gdprified').on('click', function(e) {
                e.preventDefault();

                /* 
                    values:
                        0 = accept all cookies!
                        1 = website only
                        2 = website + advertising
                */
                Cookies.set($.SOW.core.gdpr.config.cookie_name, 0, { expires: $.SOW.core.gdpr.config.cookie_expire, path: $.SOW.core.gdpr.config.cookie_path });
                jQuery(_selector).remove(); // just in case
                $.SOW.helper.consoleLog($.SOW.core.gdpr.config.cookie_name+': Accepted. Delete cookie by hash: #del:gdpr (developing purpose)');

            });

            // --

            // Extend Button
            jQuery('.btn-cookie-extend:not(.js-gdprified)').addClass('js-gdprified').on('click', function(e) {
                e.preventDefault();

                var __gdprLevel = jQuery(this).data('cookie-level') || 0;
                $.SOW.core.gdpr.extend(__gdprLevel);

            });

            // --

            // Close Button
            jQuery(' a.close:not(.js-gdprified)').addClass('js-gdprified').on('click', function(e) {
                e.preventDefault();

                jQuery(_selector).addClass('hide hide-force');

            });

        },




        /*
            Direct Set:

                __gdprLevel
                    0 = accept all cookies!
                    1 = website only
                    2 = website + advertising
                    ... more if needed

            Usage:
                $.SOW.core.gdpr.extend(2); // allow website + advertising
        */
        extend: function(__gdprLevel) {
            $.SOW.core.gdpr.destroy();
            $.SOW.helper.consoleLog($.SOW.core.gdpr.config.cookie_name + ': Level: ' + __gdprLevel);
            Cookies.set($.SOW.core.gdpr.config.cookie_name, __gdprLevel, { expires: $.SOW.core.gdpr.config.cookie_expire, path: $.SOW.core.gdpr.config.cookie_path });
            return true;
        },




        /**
         *
         *  @destroy
         *  $.SOW.core.gdpr.destroy();
         *
         *
         **/
        destroy: function() {

            Cookies.remove($.SOW.core.gdpr.config.cookie_name, { path: '' });
            Cookies.remove($.SOW.core.gdpr.config.cookie_name, { path: '/' });
            Cookies.remove($.SOW.core.gdpr.config.cookie_name, { path: $.SOW.core.gdpr.config.cookie_path });
            $.SOW.helper.consoleLog($.SOW.core.gdpr.config.cookie_name + ' : Cookie Deleted');
            return true;

        }


    };


})(jQuery);