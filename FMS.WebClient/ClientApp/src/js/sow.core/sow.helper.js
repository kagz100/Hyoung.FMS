/**
 *
 *  [SOW] Helper
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *
 *  @Dependency     -
 *

    *   @check_var
        $.SOW.helper.check_var(variable);
    *
        @check_var
        $.SOW.helper.is_numeric(str);
    *
        @loadScript
        $.SOW.helper.loadScript(script_arr, async[true|false], cache[true|false]).done(function() {
            // all scripts loaded... do something
            // * async = false by default (scripts are loaded in order)
            // * cache = true by default
        });


     *
        @loadCSS
        $.SOW.helper.loadCSS("/path/to/file.css", "append|prepend|remove");  "append" is default, if no option passed
     *
        @loadingSpinner
        $.SOW.helper.loadingSpinner('show|hide', "#mycontainer", 'overlay|icon');
     *
        @executeFunctionByName
        $.SOW.helper.executeFunctionByName("FunctionName", window, arguments);
     *
        @overlay
        $.SOW.helper.overlay('show|hide|toggle');
     *
        @randomStr
        $.SOW.helper.randomStr(8, ''|L|N);
     *
        @byte2size
        $.SOW.helper.byte2size(bytes, precision=2, int_only=false);
        $.SOW.helper.byte2kb(bytes);
     *
        @scrollAnimate
        $.SOW.helper.scrollAnimate(_el, _offset, _hash_change, _speed);
            _el             = element to scroll to. #top = page top
            _offset         = top offset (0 default)
            _hash_change    = update url hash on click
            _speed          = scroll speed (400 default)

        $.SOW.helper.scrollAnimate('#top', 0, false, 400);
     *
        @removeUrlHash
        $.SOW.helper.removeUrlHash('https://domain.com/url#hash');
     *
        @playSound
        $.SOW.helper.playSound('path/to/audio.mp3');
     *
        @time_from_ms
        $.SOW.helper.time_from_ms(miliseconds, 's|m|h|d|empty for all');
     *  
        @get_browser (unfinished, need improvement, do not use)
        $.SOW.helper.get_browser();
     *
        @params_parse
        var params = $.SOW.helper.params_parse('['param','value']['param2','value2']); // return: array
            
            var ajax_params_arr = $.SOW.helper.params_parse(ajax_params);
            for (var i = 0; i < ajax_params_arr.length; ++i) {
                formDataDel.append(ajax_params_arr[i][0], ajax_params_arr[i][1]);
            }
     *
        @currencyFormat
        $.SOW.helper.currencyFormat(1000000); // output: 1,234,567.89

        // 1,234,567.89
        $.SOW.helper.currencyFormat(1000000, [
               2, ',', '.' // en
            // 2, '.', ',' // de
            // 2, ' ', ',' // fr
        ]);
     *
        @strhash    
        $.SOW.helper.strhash('string here'); // create a hash, md5 alternative
     *
        @jsonParse
        $.SOW.helper.jsonParse('object/string here');
     *
        @serializeArray
        $.SOW.helper.serializeArray(form);
     *
        @compareArray 
        Return: true|false
        $.SOW.helper.compareArray(array1, array2);
        $.SOW.helper.compareArray([2,3,1,4], [1,2,3,4]);
     *
         @videoEmbedFromUrl
         $.SOW.helper.videoEmbedFromUrl('https://www.youtube.com?v=jh8Hgd466', autoplay=1);
     *
        @consoleLog (output - only if debug is enabled!)
        $.SOW.helper.consoleLog('Lorem Ipsum', 'color: #ff0000;');
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
  var obj             = {};               // used by loadScript


  $.SOW.helper = {


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
    init: function (selector, config) {/** no init required **/},




    /**
     *
     *  @__selector
     *  DO NOT! DO NOT CHANGE!
     *  $.SOW.helper.__selector(selector);
     *
     **/
    __selector: function(selector) {

      var selector        = $.SOW.helper.check_var(selector) || ''; /* '' is required if null */
      var selector_orig   = selector;
      var element         = (selector && $(selector).length > 0) ? $(selector) : $();

      /* add ajax container - required for binds */
      if($.SOW.globals.ajax_container != 'html' && $.SOW.globals.ajax_container != 'body' && $.SOW.globals.ajax_container != '') {

        if (selector.indexOf(',') > -1)
          var selector = selector.split(',').join(', ' + $.SOW.globals.ajax_container + ' ');

        selector = $.SOW.globals.ajax_container + ' ' + selector;

      }

      return [selector, element, selector_orig]; // selector_orig = without ajax container, in case is needed

    },






    /**
     *
     *  @check_var
     *
        $.SOW.helper.check_var(variable);
     *
     **/
    check_var: function(_var) {

      return  (typeof _var !== "undefined") ? _var : null;

    },







    /**
     *
     *  @is_numeric
     *
     *  Welcome to Javascript!
     *  Please, stay! Is nice in here!
     *
        $.SOW.helper.is_numeric(_var);
     *  1.2 = true  ;   1,2 = false
     **/
    is_numeric: function(_var) {

      if(typeof _var === 'number') return true;

      // at this point, we might have bool/object/function/etc
      else if(typeof _var !== 'string') return false;

      // -- --

      var _var = ''+_var.replace(/\s/g, '');
      if(_var === '') return false;

      // something like '1.'
      else if(_var.slice(-1) === '.') return false;  

      // -- --

      return !isNaN(parseFloat(_var)) && isFinite(_var);

    },







    /**
     *
     *  @loadScript
     *
        
        async false:
            loads scripts one-by-one using recursion (ordered)
            returns jQuery.Deferred

        async true:
            loads scripts asynchronized, if order is not needed!
            returns jQuery.when



            var script_arr = [
                'myscript1.js', 
                'myscript2.js', 
                'myscript3.js'
            ];

            $.SOW.helper.loadScript(script_arr, async[true|false], cache[true|false]).done(function() {
                // all scripts loaded... do something
                // * async = false by default (scripts are loaded in order)
                // * cache = true by default
            });

     *
     **/
    loadScript: function(script_arr, async, cache) {

      return (async === true) ? $.SOW.helper.__loadScriptAsync(script_arr, cache) : $.SOW.helper.__loadScriptOrdered(script_arr, cache);

    },

        /*

            Credits (Salman A : stackovweflow user)
                https://stackoverflow.com/a/33312665

        */
        __loadScriptOrdered: function(script_arr, cache) {

          var deferred = jQuery.Deferred();

          function __loadScript(i) {

              if (i < script_arr.length) {

                  jQuery.ajax({

                    url:        script_arr[i],
                    dataType:   "script",
                    cache:      (cache !== false) ? true : false,

                    success:    function() {

                      __loadScript(i + 1);

                    }

                  });

              } else {

                deferred.resolve();

              }

          }

          __loadScript(0);
          return deferred;

        },

        /*

            Credits (adeneo stackovweflow user)
                https://stackoverflow.com/a/11803418

        */
        __loadScriptAsync: function(script_arr, cache) {

          var _arr = $.map(script_arr, function(scr) {
            return (cache !== false) ? $.SOW.helper.getScriptCached( scr ) : $.getScript( scr );
          });

          _arr.push($.Deferred(function( deferred ) {
            $( deferred.resolve );
          }));

          return $.when.apply($, _arr);

        },
            getScriptCached: function(url, options) {

              // Allow user to set any option except for dataType, cache, and url
              options = $.extend( options || {}, {
                dataType: "script",
                cache: true,
                url: url
              });

              // Use $.ajax() since it is more flexible than $.getScript
              // Return the jqXHR object so we can chain callbacks
              return jQuery.ajax( options );

            },




    /**
     *
     *  @loadCSS
     *
        $.SOW.helper.loadCSS("/path/to/file.css", "append|prepend|remove");  
        "append" is default, if no option passed
     *
     **/
    loadCSS: function(cssFile, option) {

      /* 1. remove */
      if(option === 'remove')
        jQuery('head link[href="'+cssFile+'"]').remove();


      /* 2. prepend */
      else if(option === 'prepend') {
        if(jQuery('head link[href="'+cssFile+'"]').length > 0) return;
        jQuery('head').prepend('<link rel="stylesheet" href="'+cssFile+'">');
      }


      /* 3. append : default */
      else  {
        if(jQuery('head link[href="'+cssFile+'"]').length > 0) return;
        jQuery('head').append('<link rel="stylesheet" href="'+cssFile+'">');
      }


    },




    /**
     *
     *  @loadingSpinner
     *
        $.SOW.helper.loadingSpinner('show|hide', "#mycontainer", 'overlay|icon', 'overlay BG|icon text-*');

        [ Simple ]
        $.SOW.helper.loadingSpinner('show', "#mycontainer", 'icon');
        $.SOW.helper.loadingSpinner('show', "#mycontainer", 'overlay');

        [ Overlay ]
        $.SOW.helper.loadingSpinner('show', "#mycontainer", 'overlay', 'light');
        $.SOW.helper.loadingSpinner('show', "#mycontainer", 'overlay', 'dark');

        [ Overlay + Icon color ]
        $.SOW.helper.loadingSpinner('show', "#mycontainer", 'overlay', 'light:text-danger');
        $.SOW.helper.loadingSpinner('show', "#mycontainer", 'overlay', 'dark:text-danger');
        
        [ Icon color ]
        $.SOW.helper.loadingSpinner('show', "#mycontainer", 'icon', 'text-danger');

     *
     **/
    loadingSpinner: function(option, _container, _layout, _color) {

      var option          = (typeof option !== 'undefined')   ? option        : 'show';
      var _container      = (_container === null) ? $.SOW.globals.elBody      : _container;
      var _layout         = (typeof _layout !== 'undefined')  ? _layout       : 'icon';
      var _color          = (typeof _color !== 'undefined')   ? _color        : null;
      var _colorOverlay   = 'overlay-dark overlay-opacity-2';
      var _colorIcon      = 'text-muted';


      // Icon Color
      if( _layout == 'icon' && _color != '' )
        _colorIcon = _color;


      // Overlay Color + Icon Color
      if( _layout == 'overlay' && _color != '' ) {
        var s = _color.split(':');

        // Overlay
        if( typeof s[0] !== 'undefined' ) {
                 if( s[0] == 'dark' )   _colorOverlay = 'overlay-dark overlay-opacity-2';
            else if( s[0] == 'light' )  _colorOverlay = 'overlay-light overlay-opacity-7';
        }

        // Icon Color
        _colorIcon = ( typeof s[1] !== 'undefined' ) ? s[1] : _colorIcon;

      }


      if(option === 'show') {

        // remove existing and stop
        if(jQuery('#js_loading_icon').length > 0) {
          jQuery('#js_loading_icon').remove();
          return;
        }

        // 1. overlay, absolute positioning inside container
        var tplOverlay = '<div id="js_loading_icon" class="position-absolute absolute-full ' + _colorOverlay + ' z-index-9999 text-center">' 
                            + '<i class="' + $.SOW.config.sow__icon_loading + ' fs-3 '+_colorIcon+' valign-middle"></i>'
                       + '</div>';

        // 2. fixed - bottom of the screen, no overlay
        var tplIcon = '<div id="js_loading_icon" class="position-fixed fixed-bottom w-100 mb-3 z-index-9999 text-center shadow-none">'
                          + '<span class="bg-white d-inline-block px-4 py-1 rounded shadow-lg">'
                              + '<i class="' + $.SOW.config.sow__icon_loading + ' fs-3 '+_colorIcon+'"></i>'
                          + '</span>'
                    + '</div>';


        var _tpl        = (_layout == 'overlay') ? tplOverlay : tplIcon;
        var _container  = (_layout == 'overlay') ? _container : 'body'; // it's fixed, add to body!


        // show
        _container = (typeof _container === 'object') ? _container : jQuery(_container);
        _container.prepend(_tpl);


      } else {

        jQuery('#js_loading_icon').remove();

      }

    },




    /**
     *
     *  @executeFunctionByName
     *
        $.SOW.helper.executeFunctionByName("FunctionName", window);
        $.SOW.helper.executeFunctionByName("My.Namespace.functionName", window, arguments);
        $.SOW.helper.executeFunctionByName("Namespace.functionName", My, arguments);


        !WARNING! !NOTE!

        Most js code obfuscators might wreck the code as they will change the function names, making the string invalid.
        Anyway, all obfuscators will double the size of your code and, of course, will be much slower!

        This function is used in two places:
            1. init|reinit scripts
            2. ajax callbacks

        Please do not overuse it!

     *
     **/
    executeFunctionByName: function(functionName, context /*, args */) {

        // return new Promise(resolve => {

            if(typeof(window) !== 'undefined') {

                // Use the window (from browser) as context if none providen.
                context = context || window;
            
            } else {

                // If using Node.js, the context will be an empty object
                context = context || global;

            }


            var args        = Array.prototype.slice.call(arguments, 2);
            var namespaces  = functionName.split(".");
            var func        = namespaces.pop();

            for(var i = 0; i < namespaces.length; i++) {
                context = context[namespaces[i]];
            }


            return context[func].apply(context, args);

        // });

    },




    /**
     *
     *  @overlay
     *
        $.SOW.helper.overlay('show|hide|toggle');
     *
     **/
    overlay: function(option) {

        if(option === 'show') {

            jQuery('body').append('<div id="overlay-default"></div>');
            jQuery('body').addClass('overflow-hidden');

        }

        else if(option === 'hide') {

            jQuery('#overlay-default').unbind().remove();
            jQuery('body').removeClass('overflow-hidden');
    
        }

        else {

            if(jQuery('#overlay-default').length > 0) {
                $.SOW.helper.__overlay_hide();
            } else {
                $.SOW.helper.__overlay_show();
            }

        }

    },
        __overlay_show: function() {
            jQuery('body').append('<div id="overlay-default"></div>');
            jQuery('body').addClass('overflow-hidden');
        },
        __overlay_hide: function() {
            jQuery('#overlay-default').unbind().remove();
            jQuery('body').removeClass('overflow-hidden');
        },




    /**
     *
     *  @randomStr
     *
        $.SOW.helper.randomStr(8, ''|L|N);
     *
     **/
    randomStr: function(length, type) {

        switch(type) {

            case 'L':
                var characters   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                break;

            case 'N': 
                var characters   = '0123456789';
                break;

            default:
                var characters   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        }

        var result           = '';
        var charactersLength = characters.length;

        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;

    },


    /**
     *
     *  @byte2size
     *
     *  $.SOW.helper.byte2size(bytes, precision=2, int_only=false);
     *
     **/
    byte2size: function(bytes, precision, int_only) {

      var precision   = typeof precision  !== 'undefined' ? precision : 2;
      var int_only    = typeof int_only   !== 'undefined' ? int_only  : false;

      if(bytes < 1) 
              return 0 + (int_only === false) ? 'B' : '';


      var k           = 1024;
      var precision   = precision < 0 ? 0 : precision;
      var unit        = ['B', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];

      var i           = Math.floor(Math.log(bytes) / Math.log(k));
      var unit_txt    = (int_only === false) ? ' ' + unit[i] : 0;
      return parseFloat((bytes / Math.pow(k, i)).toFixed(precision)) + unit_txt;

    },




    /**
     *
     *  @byte2kb
     *
     *  $.SOW.helper.byte2kb(bytes);
     *
     **/
    byte2kb: function(bytes) {

      if(bytes < 1) return bytes;

      var bytes = bytes / 1024;
      return (Math.round(bytes * 100) / 100);

    },





    /**
     *
     *  @scrollAnimate
     *
        $.SOW.helper.scrollAnimate(_el, _offset, _hash_change, _speed);
            _el             = element to scroll to. #top = page top
            _offset         = top offset (0 default)
            _hash_change    = update url hash on click
            _speed          = scroll speed (400 default)

        $.SOW.helper.scrollAnimate('#top', 0, false, 400);
     *
     **/
    scrollAnimate: function(_el, _offset, _hash_change, _speed) {

      _el                 = typeof _el            !== 'undefined'     ? _el           : '';
      _hash_change        = typeof _hash_change   !== 'undefined'     ? _hash_change  : 'false';
      _offset             = typeof _offset        !== 'undefined'     ? _offset       : 0;
      _speed              = typeof _speed         !== 'undefined'     ? _speed        : 400;

      // Calculate offset if not given!
      if(_offset < 1) {

        if($.SOW.globals.elBody.hasClass('header-hide'))
            _offset = 15;

        // .header-fixed is added by js header plugin for all: .header-sticky, .header-scroll-reveal
        else if($.SOW.globals.elBody.hasClass('header-fixed') || $.SOW.globals.elBody.hasClass('header-sticky'))
            _offset = $.SOW.globals.elHeader.outerHeight() + 15;

      }


      // Scroll
      if(_el != '#' && _el != '#!' && _el != 'javascript:;') {

          if(_el == '#top') {

              jQuery('html, body').animate({scrollTop: $.SOW.globals.elBody.offset().top}, _speed, function() {

                  if(_hash_change == 'true') {
                      window.location.hash = _el;
                  }

              });

          } else {

              // unexpected error (should never happen - invalid element)!
              if(!jQuery(_el).offset()) return;

              jQuery('html, body').animate({scrollTop: jQuery(_el).offset().top - parseInt(_offset)}, _speed, function() {

                  if(_hash_change == 'true') {
                      window.location.hash = _el;
                  }

              });

          }

      }

    },



    /**
     *
     *  @removeUrlHash
     *
        $.SOW.helper.removeUrlHash('https://domain.com/url#hash');
     *
     **/
    removeUrlHash: function(_url){

      if (_url.indexOf('#') > -1)
        return _url.replace(/#.*$/, '');

      return _url;

    },



    /**
     *
     *  @playSound
     *
        $.SOW.helper.playSound('path/to/audio.mp3');
     *
     **/
    playSound: function(_soundFile) {

      var audioElement = document.createElement('audio');

      audioElement.setAttribute('src', _soundFile);
      audioElement.setAttribute('autoplay', 'autoplay');

      audioElement.addEventListener("load", function() {
        audioElement.play();
      }, true);

    },





    /**
     *
     *  @time_from_ms
     *  
        $.SOW.helper.time_from_ms(miliseconds, 's|m|h|d|empty for all');
     *
     **/
    time_from_ms: function(miliseconds, format) {
      var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

      total_seconds   = parseInt(Math.floor(miliseconds / 1000));
      total_minutes   = parseInt(Math.floor(total_seconds / 60));
      total_hours     = parseInt(Math.floor(total_minutes / 60));
      days            = parseInt(Math.floor(total_hours / 24));

      seconds         = parseInt(total_seconds % 60);
      minutes         = parseInt(total_minutes % 60);
      hours           = parseInt(total_hours % 24);

      switch(format) {
        case 's': return total_seconds;
        case 'm': return total_minutes;
        case 'h': return total_hours;
        case 'd': return days;
        default:  return { d: days, h: hours, m: minutes, s: seconds };
      }
    },



    /**
     *
     *  @get_browser
     *
        $.SOW.helper.get_browser();
     *
     **/
    get_browser: function() {

      var ua = navigator.userAgent.toLowerCase(); 

           if (ua.indexOf('chrome') > -1)   return 'chrome';
      else if (ua.indexOf('safari') > -1)   return 'safari';
      else if (ua.indexOf('mozilla') > -1)  return 'mozilla';
      else if (ua.indexOf('edge') > -1)     return 'edge';
      else return 'n/a'; // ie, etc

    },




    /**
     *
     *  @params_parse
     *
        var params = $.SOW.helper.params_parse('['param','value']['param2','value2']); // return: array
     *
     **/
    params_parse: function(string) {

      if(string != '' && string.length > 2) {

        // creating a valid json
        var string = '[' + string + ']';                // add [] brackets
        var string = string.replace(/'/g, '"');         // replace ' with "
        var string = string.replace(/ /g, '');          // remove spaces
        var string = string.replace(/]\[/g, '],[');     // replace: '][' with '],['

        // parse 
        var string = JSON.parse(string);

      }

      return string;

    },




    /**
     *
     *  @currencyFormat
     *
        $.SOW.helper.currencyFormat(1000000); // output: 1,234,567.89

        // 1,234,567.89
        $.SOW.helper.currencyFormat(1000000, [
               2, ',', '.' // en
            // 2, '.', ',' // de
            // 2, ' ', ',' // fr
        ]);

     *
     **/
    currencyFormat: function(amount, custom) {

      if(typeof custom !== 'object')
        var custom = [
               2, ',', '.' // en
            // 2, '.', ',' // de
            // 2, ' ', ',' // fr
        ];

      return (  amount.toFixed(custom[0])
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1:repl:')
                  .replace('.', custom[2])
                  .replace(/:repl:/g, custom[1])
      );

    },




    /** 

      Get JS/CSS Location
      
      $.SOW.helper.scriptLocation( 'css' );
      $.SOW.helper.scriptLocation( 'js' );

        [Aliases]
        $.SOW.helper.jsLocation(); // output: javascript location
        $.SOW.helper.cssLocation(); // output: css location

    **/
    jsLocation: function()  { return $.SOW.helper.scriptLocation( 'js' ); },
    cssLocation: function() { return $.SOW.helper.scriptLocation( 'css' ); },
    scriptLocation: function( sriptType ) {

      let curScript;
      let selector = (sriptType == 'js') ? 'script[src]' : 'link[rel="stylesheet"]';
      let scripts  =  document.querySelectorAll( selector );

      for(let i = 0; i < scripts.length; i++) {

        // set as default
        curScript = (sriptType == 'js') ? scripts[i].src : scripts[i].href ;

             if(curScript.indexOf('core') !== -1)      break;
        else if(curScript.indexOf('vendor') !== -1)    break;
        else if(curScript.indexOf('bundle') !== -1)    break;
        else if(curScript.indexOf('theme') !== -1)     break;

        // nothing found, reset back
        curScript = null;

      }

      // nothing we want found! get the last script!
      if(!curScript)
        curScript = (sriptType == 'js') ? scripts[scripts.length-1].src : scripts[scripts.length-1].href;

      if(!curScript)
        curScript = (sriptType == 'js') ? 'assets/js/' : 'assets/css/';

      let curScriptChunks = curScript.split('/');
      let curScriptFile   = curScriptChunks[curScriptChunks.length - 1];
      let scriptPath      = curScript.replace(curScriptFile, '');

      return scriptPath;

  },



    /**
     *
     *  @vendorLogic
     *
        $.SOW.helper.vendorLogicPaths('fullcalendar'); // output:array 

        Get vendor logics: js & css paths
        FOR EXTERNAL SCRIPTS LOAD!
     *
     **/
    vendorLogicPaths: function(vendor) {

      if(!vendor) return arr;

      var js_location     = ($.SOW.globals.js_location != '') ? $.SOW.globals.js_location : $.SOW.helper.jsLocation();
      var css_location    = ($.SOW.globals.js_location != '') ? $.SOW.globals.css_location : $.SOW.helper.cssLocation();
      var arr             = [];
          arr['path_js']  = '';
          arr['path_css'] = '';




      /* CSS FILE */
      if($.SOW.config["vendor:external_css"]) {

        for (var module in $.SOW.config["vendor:external_css"]) {

          for(var v = 0; v < $.SOW.config["vendor:external_css"][module].length; v++) {

            if($.SOW.config["vendor:external_css"][module].includes(vendor) === true) {
                
              arr['path_css']     = css_location+module+'.'+vendor+'.min.css';
              
              // apply here, else swiper and other plugins has issues : is css loaded after js
              $.SOW.helper.loadCSS(arr['path_css']);
              break;

            }
          
          }

        }

      }



      /* JS FILE */
      if($.SOW.config["vendor:external_js"]) {

        for (var module in $.SOW.config["vendor:external_js"]) {

          for(var v = 0; v < $.SOW.config["vendor:external_js"][module].length; v++) {

            if($.SOW.config["vendor:external_js"][module].includes(vendor) === true) {
              arr['path_js']  = js_location+module+'.'+vendor+'.min.js';
              break;
            }
          
          }

        }

      }

      return arr;

    },





    /**
     *
     *  @videoEmbedFromUrl
        $.SOW.helper.videoEmbedFromUrl('https://www.youtube.com?v=jh8Hgd466', autoplay=1);
     *
     **/
    videoEmbedFromUrl: function(href, autoplay) {


      // Localvideo first!
      if( href.match(/(.mp4)/) || href.match(/(.webm)/) ) {

        var mp4     = href.replace('.webm', '.mp4');
        var webm    = href.replace('.mp4', '.webm');
        var jpg     = href.replace('.mp4', '.jpg').replace('.webm', '.jpg');
        var auto    = (!autoplay) ? null : 'autoplay';

        // Local Video
        return '<div class="embed-responsive embed-responsive-16by9">'
            + '<video preload="auto" '+auto+' controls="controls" poster="'+jpg+'">'
                + '<source src="'+webm+'" type="video/webm;">'
                + '<source src="'+webm+'" type="video/mp4;">'
            + '</video>'
        + '</div>';

      };

      // :: default
      var videoEmbedLink = null;


      // :: youtube
      if(videoEmbedLink === null) {
        var youtubeMatch    = href.match(/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i);
        var videoEmbedLink  = (youtubeMatch) ? "https://www.youtube.com/embed/"+youtubeMatch[4]+"?autoplay=" + autoplay || 1 + '' : null;
      }

      // :: vimeo
      if(videoEmbedLink === null) {
        var vimeoMatch      = href.match(/^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/);
        var videoEmbedLink  = (vimeoMatch) ? "https://player.vimeo.com/video/"+vimeoMatch[2]+"?autoplay=" + autoplay || 1 + '' : null;
      }


      // Err!
      if(!videoEmbedLink)
        return null;

      // -- --

      // Construct Embed!
      return '<div class="embed-responsive embed-responsive-16by9">'
                  + '<iframe class="embed-responsive-item" src="' + videoEmbedLink + '" allow="autoplay; encrypted-media" width="560" height="315"></iframe>'
              + '</div>';

    },




    /**
     *
     *  @strhash
     *  author: Sergey.Shuchkin
     *  https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
     *
        $.SOW.helper.strhash('string here');
     *
     **/
    strhash: function( str ) {
      if (str.length % 32 > 0) str += Array(33 - str.length % 32).join("z");
      
      var hash = '', bytes = [];
      var i, j, k, a; i = j = k = a = 0;
      var dict = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','1','2','3','4','5','6','7','8','9'];
      
      for (i = 0; i < str.length; i++ ) {
        var ch = str.charCodeAt(i);
        bytes[j++] = (ch < 127) ? ch & 0xFF : 127;
      }

      var chunk_len = Math.ceil(bytes.length / 32);   
     
      for (i=0; i<bytes.length; i++) {
        j += bytes[i]; k++;
       
        if ((k == chunk_len) || (i == bytes.length-1)) {
          var a = Math.floor( j / k );

          if (a < 32)             hash += '0';
          else if (a > 126)       hash += 'z';
          else                    hash += dict[  Math.floor( (a-32) / 2.76) ];

          var j = k = 0;
        }
      }

      return hash;

    },




    /**
     *
     *  @jsonParse
     *
     *
        $.SOW.helper.jsonParse('object/string here');
     *
     **/
    jsonParse: function( data ) {

      // check
      if( data == '' || typeof data === 'object' )
        return data;

      // parse json
      try {

        var _data = JSON.parse( data );

      } catch(err) {

        var _data = data;

      }

      // return
      return (typeof _data === 'undefined' || _data.length < 1) ? null : _data;

    },




    /**
     *
     *  @serializeArray
     *
     *
        $.SOW.helper.serializeArray(form);
     *
     **/
    serializeArray: function( form ) {

      if( jQuery() )
        return jQuery( form ).serializeArray();


      // --


      var form    = (typeof form === 'object') ? form : document.querySelector( form ),
          arr     = [];

      Array.prototype.slice.call(form.elements).forEach(function (field) {

        if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) 
          return;

        if (field.type === 'select-multiple') {

          Array.prototype.slice.call(field.options).forEach(function (option) {
              
            if (!option.selected) 
              return;
            
            arr.push({
              name: field.name,
              value: option.value
            });

          });

          return;
        }

        if (['checkbox', 'radio'].indexOf(field.type) >-1 && !field.checked) 
            return;

        arr.push({

          name:   field.name,
          value:  field.value

        });

      });

      return arr;

    },




    /**
     *
     *  @compareArray
     *  Return: true|false
     *
        $.SOW.helper.compareArray(array1, array2);
        $.SOW.helper.compareArray([2,3,1,4], [1,2,3,4]);
     *
     **/
    compareArray: function( array1, array2 ) {

      const array2Sorted = array2.slice().sort();

      return array1.length === array2.length && array1.slice().sort().every(function(value, index) {
        return value === array2Sorted[index];
      });

    },




    /**
     *
     *  @consoleLogReinit
     *
        $.SOW.helper.consoleLogReinit(scriptInfo, selector);
     *
     **/
    consoleLogReinit: function(scriptInfo, selector) {

      $.SOW.helper.consoleLog('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
      $.SOW.helper.consoleLog(scriptInfo, 'color: #6dbb30; font-weight: bold; font-size:14px;');
      $.SOW.helper.consoleLog('Ajax Reinit For: ' + selector);
      $.SOW.helper.consoleLog(window.location.href);
      $.SOW.helper.consoleLog('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');

    },



    /**
     *
     *  @consoleLog
     *
        $.SOW.helper.consoleLog('%cLorem Ipsum', 'color: #ff0000;');
     *
     **/
    consoleLog: function(data, css) {

      if($.SOW.config.sow__debug_enable !== true)
        return;

      // Console css
      if(typeof css !== "undefined" && typeof css !== 'object') {
        var data    = '%c' + data;
        console.log(data, css);
        return;
      }

      else if(typeof css === 'object') {
        console.log(data, css);
        return;
      }

      console.log(data);

    }

  };
})(jQuery);