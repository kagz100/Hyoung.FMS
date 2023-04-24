/**
 *
 *  [SOW] Lazyload
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.lazyload.init('.lazy');
 * 
 *  Based on Lozad Plugin
 *  https://github.com/ApoorvSaxena/lozad.js
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
    var scriptInfo      = 'SOW Lazyload';
    var __observer      = void 0;

    $.SOW.core.lazyload = {


        /**
         *
         *  @config
         *
         *
         **/
        config: {

            rootMargin:     '0px',      // syntax similar to that of CSS Margin
            threshold:      0.1,        // 0 - 1; 1 = when 100% of the target is visible 
            
            load: function load(element) {

                // <video>
                if (element.nodeName.toLowerCase() === 'video' && !element.getAttribute('data-src')) {
                
                    if (element.children) {

                        var childs      = element.children;
                        var childSrc    = void 0;

                        for (var i = 0; i <= childs.length - 1; i++) {

                            childSrc = childs[i].getAttribute('data-src');

                            if (childSrc)
                                childs[i].src = childSrc;

                        }

                        element.load();
                    }

                }

                if (element.getAttribute('data-src'))
                    element.src = element.getAttribute('data-src');

                if (element.getAttribute('data-srcset'))
                    element.setAttribute('srcset', element.getAttribute('data-srcset'));

                // mobile, if exists
                if ($.SOW.globals.is_mobile === true && element.getAttribute('data-background-image-xs'))
                    element.style.backgroundImage = 'url(\'' + element.getAttribute('data-background-image-xs') + '\')';

                // fallback desktop from mobile
                else if (element.getAttribute('data-background-image'))
                    element.style.backgroundImage = 'url(\'' + element.getAttribute('data-background-image') + '\')';

                /*
                    <div class="lazy" data-toggle-class="active">
                    The active class will be toggled on the element when it enters the browser’s viewport.
                */
                if (element.getAttribute('data-lazy-toggle-class')) {
                    jQuery(element).addClass(element.getAttribute('data-lazy-toggle-class'));
                    // element.classList.toggle(element.getAttribute('data-toggle-class'));
                }

                // clear
                jQuery(element).removeAttr('data-lazy-toggle-class data-background-image data-srcset data-src');

            }

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
            this.selector_orig      = __selector[2];    // $('#selector') // without ajax container prefix
            this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;


            if(jQuery(this.selector).length < 1)
                return;


            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --


            // 1. Has no selector
            if(!this.selector) {
                $.SOW.core.lazyload.process('.lazy').observe();
                return jQuery('.lazy');
            }

            // 2. Has selector
            $.SOW.core.lazyload.process(this.selector).observe();


            return this.collection;
        },



        /**
         *
         *  @process
         *
         *  
         *
         **/
        process: function(selector) {

            var load                    = $.SOW.core.lazyload.config.load;

            if(window.IntersectionObserver) {

                __observer = new IntersectionObserver($.SOW.core.lazyload.onIntersection(load), {
                    rootMargin: $.SOW.core.lazyload.config.rootMargin,
                    threshold:  $.SOW.core.lazyload.config.threshold
                });

            } else {

                // load them all instead of using polyfill!
                // https://www.npmjs.com/package/intersection-observer
                var elements = $.SOW.core.lazyload.getElements(selector);
                for(var i = 0; i < elements.length; i++) {
                    load(elements[i]);
                    $.SOW.core.lazyload.markLoaded(elements[i]);
                }

                // -- * --
                $.SOW.helper.consoleLog('Lazyload: This browser does not support IntersectionObserver()');
                $.SOW.helper.consoleLog('Images loaded without lazyloading!');
                $.SOW.helper.consoleLog('To enable, download this polyfill and include before any other js script: https://www.npmjs.com/package/intersection-observer');
                // -- * --

            }

            return {

                observe: function observe() {

                    var items = $.SOW.core.lazyload.getElements(selector);
                    for(var i=0; i < items.length; ++i) {

                        if($.SOW.core.lazyload.isLoaded(items[i]))
                            continue;

                        if(__observer) {
                            __observer.observe(items[i]);
                            continue;
                        }

                        load(items[i]);
                        $.SOW.core.lazyload.markLoaded(items[i]);

                    }
                },

                __observer: __observer

            };

        },





        /**
         *
         *  @markLoaded
         *
         *  
         *
         **/
        markLoaded: function(element) {
            element.setAttribute('data-loaded', true);
        },




        /**
         *
         *  @isLoaded
         *
         *  
         *
         **/
        isLoaded: function(element) {
            return element.getAttribute('data-loaded') === 'true';
        },




        /**
         *
         *  @onIntersection
         *
         *  
         *
         **/
        onIntersection: function(load) {

            return function(items, __observer) {

                items.forEach(function (item) {

                    if (item.intersectionRatio > 0 || item.isIntersecting) {

                        // call __observer is exists
                        if(__observer)
                            __observer.unobserve(item.target);

                        if (!$.SOW.core.lazyload.isLoaded(item.target)) {
                            $.SOW.core.lazyload.config.load(item.target);
                            $.SOW.core.lazyload.markLoaded(item.target);
                        }
                    }

                });

            }

        },




        /**
         *
         *  @getElements
         *
         *  
         *
         **/
        getElements: function(selector) {

            if (selector instanceof Element)
                return [selector];

            if (selector instanceof NodeList)
                return selector;

            return document.querySelectorAll(selector);

        },

    }

})(jQuery);