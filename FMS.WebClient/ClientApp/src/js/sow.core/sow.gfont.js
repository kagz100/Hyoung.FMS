/**
 *
 *  [SOW] Google Font
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.gfont.init('[data-gfont]');
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
    var scriptInfo      = 'SOW Google Font';


    $.SOW.core.gfont = {


        /**
         *
         *  @init
         *
         **/
        init: function (selector, config) {

            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
            if( !selector ) return;
            var nodeList = document.querySelectorAll( selector );
            if( !nodeList ) return;
            $.SOW.core.gfont.process( nodeList );
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --

        },



        /**
         *
         *  @process
         *
         **/
        process: function( nodeList ) {


            /* 
                Check
            */
            if( typeof nodeList !== 'object' ) 
                return;

            nodeList.forEach(function(el) {

                // ignore multiple bind -- -- -- -- -- -- -- -- --
                if( el.classList.contains('js-init-gfont') ) return;
                    el.classList.add('js-init-gfont');
                // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


                /* 
                    Attributes
                */
                let _font     = el.getAttribute('data-gfont');
                let _wght     = el.getAttribute('data-wght')        || '300;400;500';
                let _dspl     = el.getAttribute('data-display')     || 'swap';
                // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
                if( !_font ) return;
                // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


                /* 
                    Parse Data
                */
                let _gfont    = _font.replace(/ /g, '+');
                let _cssID    = _font.replace(/ /g, '_').toLowerCase();
                let _rand     = Math.random().toString(36).substring(7);
                let _lnk      = 'https://fonts.googleapis.com/css2?family='+_gfont+':wght@'+_wght+'&display='+_dspl;
                let _fEl      = document.getElementById( _cssID );


                /* 
                    Font Already Exists
                */
                if( _fEl ) {
                    let _class = _fEl.getAttribute('data-class');
                    el.classList.add( _class );
                    return;
                }


                /* 
                    Push font
                */
                let tagHead = document.getElementsByTagName('head')[0];
                tagHead.insertAdjacentHTML( 'beforeend', '<link id="'+_cssID+'" data-class="gfont_'+_rand+'" href="'+_lnk+'" rel="stylesheet">' );
                tagHead.insertAdjacentHTML( 'beforeend', '<style type="text/css">' + ".gfont_"+_rand+"{font-family: '"+_font+"',sans-serif!important;}" + '</style>' );
                el.classList.add( "gfont_"+_rand );

            });

        }

    };

})(jQuery);