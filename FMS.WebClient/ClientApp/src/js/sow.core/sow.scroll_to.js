/**
 *
 *  [SOW] Scroll To
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.scroll_to.init('a.scroll-to', {speed:400});
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
    var scriptInfo      = 'SOW Scroll To';


    $.SOW.core.scroll_to = {


        /**
         *
         *  @config
         *
         *
         **/
        config: {

            // button scroll to speed
            speed:               400,

            // scroll 2 top
            s2t_enable:         true,
            s2t_class:          'btn-secondary',
            s2t_position:       'end',   // start = left, end = right (inverted for RTL)
            s2t_mob_minH:       1200,   // min. content height to show on mobile
            s2t_dsk_minH:       2300,   // min. content to show on desktop
            // when scrolling, button is shown if currentScroll > minH / 2

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



            // Scroll to top when user scroll %
            if($.SOW.core.scroll_to.config.s2t_enable === true)
                $.SOW.core.scroll_to.scrollToTop();



            if(jQuery(this.selector).length < 1)
                return;


            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --


            // 1. Has no selector
            if(!this.selector) {
                $.SOW.core.scroll_to.process($('.scroll-to'));
                return this.collection;
            }

            // 2. Has selector
            return this.collection.each(function() {
                
                $.SOW.core.scroll_to.process($(this));

            });

        },



        /**
         *
         *  @process
         *  

            <a href="#top" class="scroll-animate">Go to top</a>
            <a href="#div_id" class="scroll-animate">Go to a section</a>

         *
         **/
        process: function(_this) {

            var config_speed = this.config.speed;

            // SCROLL TO [LINK]
            _this.not('.js-scrolltoified').addClass('js-scrolltoified').on("click", function(e) {
                e.preventDefault();

                var _t              = jQuery(this),
                    _href           = _t.attr('href')               || '',
                    _offset         = _t.data('offset')             || 0,
                    _toggle         = _t.data('toggle')             || '',
                    _expanded       = _t.attr('aria-expanded')      || '',
                    _hash           = _t.data('update-hash')        || 'false',
                    _speed          = _t.data('speed')              || config_speed,
                    _delay          = _t.data('delay')              || 0;


                // add a delay if this has also a collapse option
                if(_toggle == 'collapse')
                    _delay = (_delay > 0) ? _delay : 300; // bootstrap default is 400 

                // Scroll (helper.js)
                if(typeof $.SOW.helper.scrollAnimate === "function") {

                    setTimeout(function() {

                        // stop on collapse back
                        // if(_toggle == 'collapse' && _expanded != '')
                        if(_t.hasClass('collapsed'))
                            return;

                        $.SOW.helper.scrollAnimate(_href, _offset, _hash, _speed);

                    }, Number(_delay) );

                }

            });

        },



        /**
         *
         *  @scroll to top
         *  
         *
         **/
        scrollToTop: function() {


            // reset always on load
            if(window.sowScrollToInterval !== null) {
                clearInterval(window.sowScrollToInterval);
                window.sowScrollToInterval = null;

                jQuery('#btnScrollTo').remove();
            }



            // Different for mobile/desktop
            var minInitHeight = $.SOW.globals.is_mobile === true ? $.SOW.core.scroll_to.config.s2t_mob_minH : $.SOW.core.scroll_to.config.s2t_dsk_minH;


            // do not init on short content
            if($(document).height() < minInitHeight)
                return;


            var _pos        = $.SOW.globals.elBody.data('s2t-position')     || $.SOW.core.scroll_to.config.s2t_position;
            var _cls        = $.SOW.globals.elBody.data('s2t-class')        || $.SOW.core.scroll_to.config.s2t_class;
            var _dis        = $.SOW.globals.elBody.data('s2t-disable')      || 'false';

            if(_dis+'' == 'true')
                return;


            // Disable on admin ; Enable only if specified:
            // data-s2t-disable="false"
            if($.SOW.globals.elBody.hasClass('layout-admin') && _dis+'' != 'false')
                return;


            // Is admin and has Footer
            var takeCareOfAdminFooter   = false;
            if($.SOW.globals.elBody.hasClass('layout-admin') && jQuery('#footer').length > 0) {

                var footerPos               = 0;
                var tookCare                = false;
                var btnScrollToMargins      = 0;
                var footerHeight            = jQuery('#footer').outerHeight();

                if(footerHeight < 200) {
                    var takeCareOfAdminFooter = true;
                    var footerPos = $('#footer').offset().top;
                    var btnScrollToMargins = footerHeight + 15 + Number($.SOW.globals.elBody.css('padding').replace("px", "") || 0) + Number($.SOW.globals.elBody.css('margin').replace("px", "") || 0);
                }

            }


            // Create Element
            $.SOW.globals.elBody.append('<a aria-label="Scroll page to top" href="#" id="btnScrollTo" class="btn ' + _cls + ' position-fixed z-index-99 ' + _pos + '-0 bottom-0 m-2" style="display:none"><i class="m-0 fi fi-arrow-up"></i></a>');


            // bind click
            jQuery('#btnScrollTo').off().on('click', function(e) {
                e.preventDefault();
                $.SOW.helper.scrollAnimate('body', 0, false, 500);
            });


            var appearAtMin                     = minInitHeight / 2;
                window.isVisibleBtnScrollTo     = false;
            var scrolling                       = false;
            var currScrollPos                   = 0;

            $(window).scroll(function() {
                scrolling       = true;
                currScrollPos   = $(this).scrollTop();
            });

            window.sowScrollToInterval = setInterval( function() {

                if(scrolling) {
                    scrolling = false;


                    if (currScrollPos > appearAtMin) {
                    
                        if(window.isVisibleBtnScrollTo === false) {
                            window.isVisibleBtnScrollTo = true;
                            jQuery('#btnScrollTo').fadeIn(400);
                        }

                    } else {

                        if(window.isVisibleBtnScrollTo === true) {
                            window.isVisibleBtnScrollTo = false;
                            jQuery('#btnScrollTo').fadeOut(200);
                        }

                    }


                    // Admin footer : fix
                    if(takeCareOfAdminFooter === true) {
                        if(currScrollPos + $.SOW.globals.height > footerPos) {
                            if(tookCare === false) {
                                jQuery('#btnScrollTo').addClass('transition-all-ease-250').attr('style', "margin-bottom: "+ btnScrollToMargins +"px !important");
                                tookCare = true;
                            }
                        } else {
                            if(tookCare === true) {
                                jQuery('#btnScrollTo').css({"margin-bottom":""});
                                tookCare = false;
                            }
                        }
                    }

                }

            }, 500);


        }

    };


})(jQuery);