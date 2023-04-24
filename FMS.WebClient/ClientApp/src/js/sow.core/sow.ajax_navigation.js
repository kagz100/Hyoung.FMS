/**
 *
 *  [SOW] Ajax Navigation
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.ajax_navigation.init('a.js-ajax');
 *                  -- + --
 *                  From another plugin, for a specific container only:
 *                  Only this plugin is reinitialised, -WITHOUT- $.SOW.reinit() call 
 *                  $.SOW.core.ajax_navigation.__initFor('#container');
 *                  -- + --
 *                  $.SOW.core.ajax_navigation.__selector();
 *                  returns the selector only: .js-ajax
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
  var scriptInfo      = 'SOW Ajax Navigation';

  window.sow_ajax_links_last_href     = null;
  window.sow_ajax_links_curr_href     = null;


  $.SOW.core.ajax_navigation = {


    /**
     *
     *  @config
     *
     *
     **/
    config: {

      /* 

          You can overwrite by adding the needed param to the link.

          These params can be used on any <a class="js-ajax" ...></a> to overwrite thse settings
              data-ajax-method="GET|POST"
              data-ajax-container="#middle"                   container to push data from the server; admin use #middle as main content container
              data-ajax-update-url="true|false"               update history state.
              data-ajax-show-loading-icon="true"              false to disable loading icon on ajax requests
              data-ajax-callback-function=""                  custom callback function
              data-ajax-callback-before-push="false"          do not push data to container, send to the callback only
              data-ajax-reponse-extract-element="#middle"     get a specific element from returned data (not the entire result/page). Example: <div id="something"><div class="else"> <div id="middle">this content</div> </div></div>
              data-ajax-autoscroll-to-content="false"         scroll to top content after loading

              Second container, if needed to add a class: hide, show, animate, etc
              data-ajax-container2-element="img.js-ajax-loaded-animate"   <img class="js-ajaxloaded-animate" ...>
              data-ajax-container2-class="animate-bouncein"

      */
      enable                          : true,
      method                          : 'GET',
      contentType                     : '',
      dataType                        : '',
      headers                         : '',
      crossDomain                     : '',
      data_params                     : {ajax:'true'},

      target_container                : '#middle', // where data is pushed
      update_url                      : true,
      show_loading_icon               : true,

      /* 
          callback_example = function(el, data, target_container) {
              // el               = link clicked              $(this)
              // data             = server response           (html|string)
              // target_container = container to push data    (string:#middle)
          }
      */
      callback_function               : '',

      // content (server response) is sent to your callback function only.
      callback_before_push            : false,

      /*
          #middle         = main content to be extracted
          #page_js_files  = second container containing js files wrapped inside a div
      */
      parser_extract_enable           : true,
      parser_force_push2target        : false,        // in case #middle element not found in request, entire data/page is pushed/shown
      parser_extract_element          : '#middle, #page_js_files',

      autoscroll_to_content           : true,         // scroll up to content after page loaded


      // Optional second container - add a class when page loaded
      container2_element              : '',
      container2_class                : '',

      // 404 error page
      page_404                        : '404.html',


      // Reload page content on back/forward history button instead of loading from history cache
      onpopstate_reload               : true,

      /*
          Different than callback, cannot be overwrited by params
          Will call a custom function after each page load
          Condition: callback_before_push: false (else, call the function from your callback).
          
          Can be used to reinit custom scripts/plugins and/or process special data

          custom_function_example = function(el, target_container) {
              // el           = link clicked                      $(this)
              // container    = container where data is pushed    (string:#middle)
          }
      */
      custom_function_call            : '',




      // Ajax remainings of other plugins that are not self removed
      // .note-popover = summernote (bootstrap4 bug)
      AjaxGarbage                     : '', // reserved to GULP config
      AjaxOtherGarbage                : '.datepicker, .popover, .daterangepicker, .modal, .modal-backdrop, .note-popover, #dropdown_toggle_overlay, .tooltip',
  
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

      /* weberver required */
      if( window.location.origin == 'file://' ) 
        return;

      /* disabled by config */
      if($.SOW.core.ajax_navigation.config.enable !== true) {
        $.SOW.helper.consoleLog('Disabled : ' + scriptInfo, 'color: #ff0000;');
        return;
      }


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


      /*

          History Postate

      */
      $.SOW.core.ajax_navigation.__historyPopState();



      // 1. Has no selector
      if(!this.selector) {
        $.SOW.core.ajax_navigation.ajax_navigation($('a.js-ajax'));
        return this.collection;
      }

      // 2. Has selector
      return this.collection.each(function() {
          
        $.SOW.core.ajax_navigation.ajax_navigation($(this));

      });

    },



    /**
     *
     *  @ajax_navigation
     *
        1. LINKS

            USAGE 1:

                <a href="https://myurl.com/request/" class="js-ajax" data-ajax-container="#my_container">Click</a>
                <div id="my_container"><!-- ajax content is loaded here --></div>

            USAGE 2: (using data-href)

                <a href="#" data-href="https://myurl.com/request/" class="js-ajax" data-ajax-container="#my_container">Click</a>
                <div id="my_container"><!-- ajax content is loaded here --></div>


            OPTIONAL PARAMS:
                data-ajax-method="GET|POST"             default: GET
                data-ajax-update-url="true"     default: false - update history state
                data-ajax-show-loading-icon="false"         do not show loading icon
                data-ajax-callback-function=""          custom callback function
                data-ajax-callback-before-push="false"  do not push data to container, send to the callback only
                data-ajax-reponse-extract-element="#middle"     push only an element returned from ajax (not the entire result/page)
                data-ajax-autoscroll-to-content="false"     scroll to top content after loading
                data-ajax-container="#middle"           container to push data from the server

                Second container, if needed to add a class: hide, show, animate, etc
                data-ajax-container2-element="#myimg"
                data-ajax-container2-class="animate-bouncein"

            &ajax=true - added but NOT to .html files
     *  
     *
     **/
    ajax_navigation: function(_this, ajax_navigation_reinit_skip) { // ajax_navigation_reinit_skip: used by calling from other plugins via __initFor(). DO NOT REMOVE!

      var _selector       = this.selector;
      var _selector_orig  = this.selector_orig;

      if($.SOW.core.ajax_navigation.config.enable !== true) {
        _this.off('click');
        return;
      }

      // !!! do not use off()
      // deep navigation links conflict for ajax
      _this.on('click', function(e) {


        /* 
            Because we want to be sure that we bind only once
            and avoid multiple times! We can't use unbind() because
            some other plugins might bind that link for some reason!
        */
        // if(jQuery(this).hasClass('js-ajaxified'))
        //  return;
        /* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */


        e.preventDefault();

        // Bootstrap error!
        if( !jQuery(this).hasClass('dropdown-item') )
          e.stopPropagation();

        var _t                      = jQuery(this),
            _href                   = _t.attr('href')                               || '#',
            _href_data              = _t.attr('data-href')                          || '',
            _href_title             = _t.attr('title')                              || '',      // used by historyPushState to update the title
            _scrollToContent        = _t.attr('data-ajax-autoscroll-to-content')    || '',
            _callback               = _t.data('ajax-callback-function')             || '',
            _callbackBeforePush     = _t.attr('data-ajax-callback-before-push')     || '',      // pass to calback, do not push content to container
            _method                 = _t.data('ajax-method')                        || '',
            _updateURL              = _t.attr('data-ajax-update-url')               || '',      // istory push state
            _showLoadingIcon        = _t.attr('data-ajax-show-loading-icon')        || '',
            _container2El           = _t.data('ajax-container2-element')            || '',      // add a class to a container, or an animation... anything
            _container2Class        = _t.data('ajax-container2-class')              || '',      // add a class to a container, or an animation... anything
            _contentResponseExtract = _t.data('ajax-parser-extract-element')        || '',      // id|class (document container to get data from)
            _target                 = _t.data('ajax-target-container')              || '';


        // data-href="..."
        // Is +always+ used if exists!
        if(_href_data != '')
          _href = _href_data;


        // Check once, use multiple times!
        var _hrefValid = (_href == '' || _href == '#' || _href == '#!' || _href == 'javascript:;' || _href == 'void(0)') ? false : true;


        // ++ Fullajax Navigation
        //      + We have ajax links inside a dropdown!
        //      + Close/hide the dropdown on click!
        if(_hrefValid === true && $.SOW.globals.is_mobile === false) {

          if(typeof $.SOW.core.dropdown === 'object')
            $.SOW.core.dropdown.forceCloseDropdown(_t);

        }




        // ok, bind identifier for this function so we don't bind again!
        //_t.addClass('js-ajaxified');



        // Check nav-deep for this link, if comes from content!
        // We want it highlighted!
        if(!_t.hasClass('nav-link') && typeof $.SOW.core.nav_deep === 'object') {

          /**
              
              We remove #hash and rewrite the _href
              Actually, the back button on pushState will not contain the #hash anymore
              But when the user click "Back Button", page position is ok
              It's not something critical, we can live with this intentional bug.
              The chance that somebody notice... is very, very, very low :)

          **/
          var _href               = $.SOW.helper.removeUrlHash(_href); // remove hash (helper)
          var __navHasThisLink    = jQuery(_selector_orig+'.nav-link[href="'+_href+'"]');

          if(__navHasThisLink.length > 0) {

            $.SOW.core.nav_deep.nav_deep_open(__navHasThisLink);
            $.SOW.core.nav_deep.nav_deep_close_all(__navHasThisLink);

          }

          // clear/reset
          var __navHasThisLink    = null;

        } 
        // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --



        /**
            CONFIG DEFAULTS
        **/
        if(_scrollToContent == '')
          var _scrollToContent = $.SOW.core.ajax_navigation.config.autoscroll_to_content;

        if(_callback == '')
          var _callback = $.SOW.core.ajax_navigation.config.callback_function;

        if(_callbackBeforePush == '')
          var _callbackBeforePush = $.SOW.core.ajax_navigation.config.callback_before_push;

        if(_method == '')
          var _method = $.SOW.core.ajax_navigation.config.method;

        if(_updateURL == '')
          var _updateURL = $.SOW.core.ajax_navigation.config.update_url;

        if(_showLoadingIcon == '')
          var _showLoadingIcon = $.SOW.core.ajax_navigation.config.show_loading_icon;

        if(_container2El == '')
          var _container2El = $.SOW.core.ajax_navigation.config.container2_element;

        if(_container2Class == '')
          var _container2Class = $.SOW.core.ajax_navigation.config.container2_class;

        // --

        if(_contentResponseExtract == '' && $.SOW.core.ajax_navigation.config.parser_extract_enable === true) /* default self config (se top config) */
          var _contentResponseExtract = $.SOW.core.ajax_navigation.config.parser_extract_element;

        /*
            
            In case there is another ajax request, 
            but for a different specified #destination_container

        */
        if(_target != '' && _target != _contentResponseExtract)
          _contentResponseExtract = '';

        // --

        if(_target == '')
          var _target = $.SOW.core.ajax_navigation.config.target_container;



        if(_target == '') {

          $.SOW.helper.consoleLog('Ajax request: data-ajax-container missing!');
          return;

        }


        else if(_hrefValid !== true) {

          $.SOW.helper.consoleLog('Ajax request: no valid link!');
          return;

        }




        /*
            
            Block "flooding"

        */
        if(window.sow_ajax_links_last_href == _href)
            return;

        window.sow_ajax_links_last_href = _href;
        // --



        // Remove any unwanted stuff - like: if click was from modal
        // jQuery('.modal-backdrop.show').remove();
        // $.SOW.globals.elBody.removeClass('modal-open overflow-hidden');
                    
        // Ajax remainings of other plugins that are not self removed
        $.SOW.core.ajax_navigation.__cleanAjaxGarbage();
        // ----------------------------------------------------------





        /*

            CREATE AN OBJECT WITH ALL PARAMS TO SEND THEM TO AJAX FUNCTION!

            The reason we do this, is because we need the exactly same
            ajax request for historyPushState on "back button" click.
            This object we save it as "html" (json) to historyPushState

            This object will be packed as json by __ajaxLinkProcess() function
             _json = JSON.stringify(_obj);

        */
        var _obj                            = new Object();
            _obj._t                         = _t;
            _obj._href                      = _href;
            _obj._scrollToContent           = _scrollToContent;
            _obj._callback                  = _callback;
            _obj._callbackBeforePush        = _callbackBeforePush;
            _obj._method                    = _method;
            _obj._updateURL                 = _updateURL;
            _obj._showLoadingIcon           = _showLoadingIcon;
            _obj._container2El              = _container2El;
            _obj._container2Class           = _container2Class;
            _obj._contentResponseExtract    = _contentResponseExtract;
            _obj._target                    = _target;


        /**

            HOW IT WORKS?

                1. __ajaxLinkProcess() send an ajax request. If _callbackBeforePush is not set tot true, the page will update.
                2. the object above is packed into a JSON string and passed it to __ajaxLinkProcess() as to keep it in history pushState ;)
                3. user is happy, drinking 10 beers but suddently navigate back using "back button" so the page is the same but the link is changing! 
                4. the history will return the sting from cache (our jsonified object) we just created on step 2
                5. history function will call __ajaxLinkProcess() passing the object but disabling things like _updateURL (because is already on that page)
                6. __ajaxLinkProcess() will try to find the link to get the element because jQuery(this) is needed (I mean: _t)
                7. Because we keep the previous pages in pushHistory, we use them to catch the clicked link.

                Looks complicated but the process is simple.

        **/
        return $.SOW.core.ajax_navigation.__ajaxLinkProcess(_obj, ajax_navigation_reinit_skip);


      });

    },

        /**
         *
         *  Ajax Process
         *  :: Helper
         *
         **/
        __ajaxLinkProcess: function(_obj, ajax_navigation_reinit_skip) {

          if($.SOW.core.ajax_navigation.config.enable !== true)
            return;


          var _t                          = _obj._t,
              _href                       = _obj._href,
              _scrollToContent            = _obj._scrollToContent,
              _callback                   = _obj._callback,
              _callbackBeforePush         = _obj._callbackBeforePush,
              _method                     = _obj._method,
              _updateURL                  = _obj._updateURL,
              _showLoadingIcon            = _obj._showLoadingIcon,
              _container2El               = _obj._container2El,
              _container2Class            = _obj._container2Class,
              _contentResponseExtract     = _obj._contentResponseExtract,
              _target                     = _obj._target,
              _obj                        = null;



          // Yeah, the ugliest bool fix ever.
          var _callbackBeforePush = _callbackBeforePush+'';
          var _callbackBeforePush = _callbackBeforePush.toLowerCase();
          var _updateURL          = _updateURL+'';
          var _updateURL          = _updateURL.toLowerCase();
          var _showLoadingIcon    = _showLoadingIcon+'';
          var _showLoadingIcon    = _showLoadingIcon.toLowerCase();
          var _scrollToContent    = _scrollToContent+'';
          var _scrollToContent    = _scrollToContent.toLowerCase();



          jQuery.ajax({

              url:            _href,
              data:           $.SOW.core.ajax_navigation.config.data_params,
              type:           _method,
              contentType:    $.SOW.core.ajax_navigation.config.contentType,
              dataType:       $.SOW.core.ajax_navigation.config.dataType,
              headers:        $.SOW.core.ajax_navigation.config.headers,
              crossDomain:    $.SOW.core.ajax_navigation.config.crossDomain,

              beforeSend: function() {

                if(_showLoadingIcon == 'true')
                  $.SOW.helper.loadingSpinner('show', _target);
                
                // disable link
                _t.addClass('disabled');


                /*

                    Click from admin : close mobile aside

                */
                if($.SOW.globals.is_mobile === true) {

                  if($.SOW.globals.elBody.hasClass('layout-admin') && jQuery('#aside-main').hasClass('js-aside-show'))
                    jQuery('.btn-sidebar-toggle').trigger('click');

                }

                // Close any open dropdown!
                // BS5 error
                // $('.dropdown-menu.show').dropdown('hide').parent().find('[data-toggle="dropdown"]').attr('aria-expanded', 'false').removeClass('active');

              },

              error:  function(XMLHttpRequest, textStatus, errorThrown) {

                // 404 error page
                var page_404_response = $.SOW.core.ajax_navigation.page_404(_contentResponseExtract, _target); // should return true!

                if(!page_404_response) {

                  $.SOW.helper.loadingSpinner('hide');

                  if(typeof $.SOW.core.toast === 'object') {

                    $.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', 'bottom-center', 0, true);

                  } else {

                    alert("[404] Unexpected internal error!");

                  }

                }

              },

              success: function(data) {


                // Ajax remainings of other plugins that are not self removed
                $.SOW.core.ajax_navigation.__cleanAjaxGarbage();
                // ----------------------------------------------------------


                var __dataHtml = '';

                if(_callbackBeforePush == 'false') {

                    // Push data
                    if(_contentResponseExtract == '' || $.SOW.core.ajax_navigation.config.parser_extract_enable === false) {



                        /*
                            
                            [Deprecation] Synchronous XMLHttpRequest on the main thread is deprecated 
                            because of its detrimental effects to the end user's experience. 
                            For more help, check https://xhr.spec.whatwg.org/

                            Remove any <script> and append them using async:
                                html_parsed__apply_scripts()

                        */
                        var script_src          = new Array,
                            script_inline       = new Array,
                            jQ_source = jQuery('<div>' + data + '</div>');

                        // get scripts with src
                        jQuery('script[src]', jQ_source).each(function() {
                            script_src.push($(this).attr('src'));
                        });
                        jQuery('script[src]', jQ_source).remove();

                        // get scripts without src
                        jQuery('script', jQ_source).each(function() {
                            script_inline.push($(this));
                        });
                        jQuery('script', jQ_source).remove();
                        // --------------------------------------------------------------------------------
                        



                        /* ++ SEO ++
                            
                            Dedicated Tags
                            <meta-title>...</meta-title>
                            <meta-description>...</meta-description>
                            <meta-canonical>...</meta-canonical>
                            <meta-robots>...</meta-robots>

                        */
                        var seo_meta_title          = jQ_source.find('title').html() || jQ_source.find('meta-title').html(),
                            seo_meta_description    = jQ_source.find("meta[name=description]").attr("content") || jQ_source.find('meta-description').html(),
                            seo_meta_canonical      = jQ_source.find("link[rel=canonical]").attr("href") || jQ_source.find('meta-canonical').html(),
                            seo_meta_robots         = jQ_source.find("meta[name=robots]").attr("content") || jQ_source.find('meta-robots').html();

                        // Remove by default
                        jQuery('link[rel=canonical], meta[name=robots]').remove();

                        // Safe mode : update metas
                        if(seo_meta_title)
                            document.title = seo_meta_title;

                        if(seo_meta_description)
                            document.querySelector('meta[name="description"]').setAttribute("content", seo_meta_description);

                        if(seo_meta_canonical)
                            jQuery('head').append('<link rel="canonical" href="'+seo_meta_canonical+'">');

                        if(seo_meta_robots)
                            jQuery('head').append('<meta name="robots" content="'+seo_meta_robots+'">');

                        // Remove dedicated tags
                        jQuery('meta-title, meta-description, meta-canonical, meta-robots', jQ_source).remove();
                        // ++ ++ ++ ++


                        var parsed_data = jQ_source.html();


                        // force push content, as it is because nothing parsed
                        if(parsed_data == '' && $.SOW.core.ajax_navigation.config.parser_force_push2target === true)
                            var parsed_data = data;


                        // Append data
                        jQuery(_target).empty().append(parsed_data);


                        // Apply JS
                        $.SOW.core.ajax_navigation.html_parsed__apply_scripts(script_src, script_inline);
                        var jQ_source = null;


                        if(_updateURL == 'true')
                            var __dataHtml = parsed_data;

                    // Parse content and push
                    } else {

                        // Pase data
                        var _objParsed = $.SOW.core.ajax_navigation.html_parse(_contentResponseExtract, data);

                        if(typeof _objParsed !== 'object') {

                            var __dataHtml  = '';

                        } else {

                            var __dataHtml  = _objParsed.html_content;
                            var _href_title = _objParsed.meta_title;

                        }


                        // force push content, as it is because nothing parsed
                        if(!__dataHtml && $.SOW.core.ajax_navigation.config.parser_force_push2target === true)
                            __dataHtml = data;
                        

                        // Push Content
                        jQuery(_target).empty().append(__dataHtml);

                        // Push Scripts
                        $.SOW.core.ajax_navigation.html_parsed__apply_scripts(_objParsed.scripts_src, _objParsed.scripts_inline);
                        var _objParsed  = null; // clear

                    }
                    // --


                    // We also avoid adding same page to history pushState on multiple clicks on the same link
                    if(_updateURL == 'true' && window.sow_ajax_links_curr_href != _href) {

                        /*
                            
                            We create a new object here, can't use the one passed to the function!
                            Regular js function is working. This is not!
                        */
                        var _obj                        = new Object;
                        _obj._href                      = _href;
                        _obj._callback                  = _callback;
                        _obj._callbackBeforePush        = _callbackBeforePush;
                        _obj._contentResponseExtract    = _contentResponseExtract;
                        _obj._updateURL                 = _updateURL;
                        _obj._container2El              = _container2El;
                        _obj._container2Class           = _container2Class;
                        _obj._scrollToContent           = _scrollToContent;
                        _obj._target                    = _target;
                        _obj._html                      = (__dataHtml != '') ? __dataHtml : '';
                        var _json                       = JSON.stringify(_obj);

                        $.SOW.core.ajax_navigation.__historyPushState(_href, _href_title, _json); 
                    }


                    // scroll to content
                    if(_scrollToContent == 'true') {
                        if(typeof $.SOW.helper.scrollAnimate === "function") {
                            var _contentEl = jQuery(_target);
                            $.SOW.helper.scrollAnimate(_contentEl, 0, false, 200);
                        }
                    }


                    // Second container - remove and|or add class (animation, toggle, hide, etc)
                    if(_container2El != '') {

                        // to animate after scrolling
                        var _container2Delay = (_scrollToContent == true) ? 200 : 60;


                        // Remove first 
                        jQuery(_container2El).removeClass(_container2Class);

                        setTimeout(function() {

                            // Add back (useful for animation)
                            if(_container2Class != '')
                                jQuery(_container2El).addClass(_container2Class);

                        }, _container2Delay);

                    }


                    // custom_function_call()
                    // call this function after each page load
                    if($.SOW.core.ajax_navigation.config.custom_function_call != '') {

                        if(typeof $.SOW.helper.executeFunctionByName === "function")
                            $.SOW.helper.executeFunctionByName($.SOW.core.ajax_navigation.config.custom_function_call, window, _t, _target, this.selector);

                    }


                    // ++ REINIT PLUGINS ++
                    if(ajax_navigation_reinit_skip !== 'true')
                        $.SOW.core.ajax_navigation.reinit_call(_target);
                    // ++ ++ ++ ++ ++ ++ ++


                }



                // notice only
                if(_callbackBeforePush == 'true' && _callback == '')
                  $.SOW.helper.consoleLog('data-ajax-callback-function="" -BUT- data-ajax-callback-before-push="true"');



                // callback function
                if(_callback != '') {

                  if(typeof $.SOW.helper.executeFunctionByName === "function")
                    $.SOW.helper.executeFunctionByName(_callback, window, _t, __dataHtml || data, _target);

                }



                // remove loading icon
                $.SOW.helper.loadingSpinner('hide');



                // enable link
                _t.removeClass('disabled');



                // Add url to container, in case is "ajax content" plugin used
                // so we can have a real "reload btn" with new link
                if(jQuery(_target).hasClass('js-ajax'))
                  jQuery(_target).attr('data-ajax-url', _href);



                // clear/reset
                var data            = null, 
                    _obj            = null,
                    _json           = null,
                    __dataHtml      = null, 
                    __source        = null, 
                    __dataParsed    = null;
                window.sow_ajax_links_last_href     = null;

                // Used to avoid adding same page to history pushState on multiple clicks on the same link
                if(_updateURL == 'true' && window.sow_ajax_links_curr_href != _href)
                  window.sow_ajax_links_curr_href = _href;


                // Needed for links from fullscreen
                $.SOW.globals.elBody.removeClass('overflow-hidden');

              }

          });

          return true;

        },







    /**
     *
     *  @html_parse
     *  Extract content of html. One or more selectors
     *  html_parse('#selector1, #selector2, ...', html);
     *
     *
    **/
    html_parse: function(_selectors, _data) {

      if(!_data) return null;

      else if(!_selectors) {
        var _obj                    = new Object;
            _obj.meta_title         = null;
            _obj.meta_description   = null;
            _obj.html_content       = _data;
      }

      var jQ_source           = jQuery('<div>' + _data + '</div>'),
          html_content        = '',
          meta_title          = jQ_source.find('title').html() || jQ_source.find('meta-title').html(),
          meta_description    = jQ_source.find("meta[name=description]").attr("content") || jQ_source.find('meta-description').html(),
          data_parsed         = jQ_source.find(_selectors),
          script_src          = new Array,
          script_inline       = new Array;

      if(!data_parsed)
        return null;


      // Add each element (if more than one elements passed)
      data_parsed.each(function() {

        /*
            
            [Deprecation] Synchronous XMLHttpRequest on the main thread is deprecated 
            because of its detrimental effects to the end user's experience. 
            For more help, check https://xhr.spec.whatwg.org/

            Remove any <script> and append them using async:
                html_parsed__apply_scripts()

        */
        // get scripts with src
        jQuery('script[src]', this).each(function() {
            script_src.push($(this).attr('src'));
        });
        jQuery('script[src]', this).remove();

        // get scripts without src
        jQuery('script', this).each(function() {
            script_inline.push($(this));
        });
        jQuery('script', this).remove();

        // at this point, we shuld be <script> free
        html_content += $(this).html(); // required for __historyPushState

      });


      var _obj                    = new Object;
          _obj.meta_title         = meta_title;
          _obj.meta_description   = meta_description;
          _obj.html_content       = html_content;
          _obj.scripts_src        = script_src;
          _obj.scripts_inline     = script_inline;


      // Safe mode : update metas
      if(meta_title != '')
        document.title = meta_title;

      if(meta_description != '')
        document.querySelector('meta[name="description"]').setAttribute("content", meta_description);

      return _obj;

    },






    /**
     *
     *  @html_parsed__apply_scripts
     *  Apply parsed scripts
     *
     *
    **/
    html_parsed__apply_scripts: function(scripts_src, scripts_inline) {


      /**

          Reason this function exists:

              [Deprecation] Synchronous XMLHttpRequest on the main thread is deprecated 
              because of its detrimental effects to the end user's experience. 
              For more help, check https://xhr.spec.whatwg.org/

              So we can't just append(html_content) including scripts.
              We cut them out on html_parse() and append them this way!

      **/
      // $.SOW.helper.loadScript(script_arr, async[true|false], cache[true|false])
      $.SOW.helper.loadScript(scripts_src, false, true).done(function() {

        jQuery('#js_ajax_navigation_appended_scripts').remove();

        if(scripts_inline.length > 0) {

          $.SOW.globals.elBody.append('<div id="js_ajax_navigation_appended_scripts"></div>');

          for (var i in scripts_inline) {
            jQuery('#js_ajax_navigation_appended_scripts').append(scripts_inline[i]);
          }

        }

      });

      return true;

    },







    /**
     *
     *  @reinit_call
     *  Call main $.SOW.reinit()
     *
     *
    **/
    reinit_call: function(_target) {

      // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
      // console log
      $.SOW.helper.consoleLogReinit(scriptInfo, _target);
      // reinit inside ajax container
      $.SOW.reinit(_target);
      // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

    },








    /**
     *
     *  @page_404
     *  Get Page 404
     *
     *
    **/
    page_404: function(_contentResponseExtract, _target) {

      if($.SOW.core.ajax_navigation.config.page_404 == '')
        return null;

      // get the page
      jQuery.ajax({
          url:            $.SOW.core.ajax_navigation.config.page_404,
          data:           {ajax:"true"},
          type:           'GET',
          contentType:    '',
          dataType:       '',
          headers:        '',
          crossDomain:    '',

          beforeSend: function() {

            $.SOW.helper.loadingSpinner('show', _target);

          },

          error:  function(XMLHttpRequest, textStatus, errorThrown) {

            $.SOW.helper.loadingSpinner('hide');

          },

          success: function(data) {

            // Pase data
            var _objParsed  = $.SOW.core.ajax_navigation.html_parse(_contentResponseExtract, data),
                data        = null;

            if(typeof _objParsed !== 'object') {

              var __dataHtml = '';

            } else {

              var __dataHtml  = _objParsed.html_content;
              document.title  = _objParsed.meta_title;

              // we need it in case o refresh!
              $.SOW.core.ajax_navigation.__historyPushState($.SOW.core.ajax_navigation.config.page_404, document.title, __dataHtml);

            }


            // force push content, as it is because nothing parsed
            if(!__dataHtml && $.SOW.core.ajax_navigation.config.parser_force_push2target === true)
                __dataHtml = data;


            // Push Content
            jQuery(_target).empty().html(__dataHtml);
            $.SOW.helper.loadingSpinner('hide');

            // Push Scripts
            $.SOW.core.ajax_navigation.html_parsed__apply_scripts(_objParsed.scripts_src, _objParsed.scripts_inline);
            var _objParsed  = null; // clear

            // reinit plugins for 404 page
            $.SOW.core.ajax_navigation.reinit_call(_target);


          }

      });

      return true;

    },









    /*

        Init for specific container
        Used by other plugins

    */
    __initFor: function(_container) {

      if(!_container) return;
      var ajax_navigation_reinit_skip = true; // true, no matter what!
      return $.SOW.core.ajax_navigation.ajax_navigation(jQuery(_container + ' ' + this.selector_orig), ajax_navigation_reinit_skip);

    },







    /*

        Return the selector only
        Example: .js-ajax

    */
    __selector: function() {

      return this.selector_orig;

    },





    /*

        Clean `garbage`
        Ajax remainings that are not self removed

    */
    __cleanAjaxGarbage: function() {

      jQuery($.SOW.core.ajax_navigation.config.AjaxOtherGarbage).remove();
      $.SOW.globals.elBody.removeClass('overflow-hidden modal-open');

      // clean all active toasts
      if(typeof $.SOW.core.toast === 'object')
        $.SOW.core.toast.destroy();

      // clean user garbage
      if($.SOW.core.ajax_navigation.config.AjaxGarbage != '')
        jQuery($.SOW.core.ajax_navigation.config.AjaxGarbage).remove();
  
    },


















    /** HISTORY PUSH STATE
        Change url without refresh & push data
     **************************************************************** **/
    __historyPushState: function(_url, _pageTitle, html) {

      if(_url == '' || _url == '#' || _url == '#!' || _url == 'javascript:;' || _url == 'void(0)')
        return;

      // Non compatible browsers
      if(typeof(history.pushState) == "undefined") {
        window.location = _url;
        return;
      }

      window.history.pushState(
        {
            "html":         html,
            "pageTitle":    _pageTitle,
        },
        "", _url
      );

      $.SOW.helper.consoleLog("SOW Ajax : history.pushState : " + _url);

    },






    /*

        Popstate
        Back Button

    */
    __historyPopState: function() {

      var _selector       = this.selector;
      var _selector_orig  = this.selector_orig; // without ajax container

      if(typeof(window.onpopstate) !== "function") { 

        window.onpopstate = function(e) {

          if( e.state ) {

            if(typeof e.state.pageTitle !== 'undefined')
              document.title = e.state.pageTitle; // update title from history

            // if(typeof e.state.pageTitle !== 'undefined')
            // document.querySelector('meta[name="description"]').setAttribute("content", _objParsed.meta_description);

            var _obj = JSON.parse(e.state.html);

            // Update html (from history version)
            // needed to search the link - see below
            var _target = (_obj._target != '') ? _obj._target : '#middle';
            jQuery(_target).empty().html(_obj._html);

            // No reason to continue, we can't find the element to click or get data
            // We keep the page from history!
            if(_obj._href == '') {
              $.SOW.helper.consoleLog("SOW Ajax : history.pushState : Err : Missing Back Link! Displayed the page from history, no real request to the server reload!");
              return;
            }


            /* --------------------------------------------------------------------------- */

            // Let's get the element! We have only the link to work with!
            var _t = jQuery(_selector_orig+'[href="'+_obj._href+'"]').first();

            if(!_t)
              var _t = jQuery(_selector_orig+'[href="'+_obj._href+'"]').first();


            if(!_t) {

              $.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', 'bottom-center', 0, true);

              // No link found? Reload page if also no history html version.
              if(_obj._html == '') location.reload(true);
              return; // Ok, stop here!

            }

            /* --------------------------------------------------------------------------- */
            if($.SOW.core.ajax_navigation.config.onpopstate_reload === true) {
                
              /*
                  Reload the content!
                  Display the page from the history, which is already doing few lines above!
              */

              _obj._t                 = _t;           // most important (is actually the link clicked - dom element)
              _obj._updateURL         = false;        // do not update, we already are on it
              _obj._scrollToContent   = false;        // annoyng on each back to have a scrolling page
              
              $.SOW.core.ajax_navigation.__ajaxLinkProcess(_obj);                 // ajax call, refresh page|content
              $.SOW.helper.consoleLog("SOW Ajax : onpopstate : Content request sent to the server!");

            }
            /* --------------------------------------------------------------------------- */

            /*
                Deep Navigation Plugin
                Active Current
            */
            if(typeof $.SOW.core.nav_deep === 'object') {
              $.SOW.core.nav_deep.nav_deep_open(_t);
              $.SOW.core.nav_deep.nav_deep_close_all(_t);
            }

            /* --------------------------------------------------------------------------- */


          } else {

            /*
                
                onpopstate is handling hashed as "regular" links, refreshing the page
                So we have to stop this behavior!

            */
            var _href = window.location.href;
            if (_href.indexOf('#') > -1) return;

            // Origin - refresh!
            location.reload(true);

          }


        };

      }

    }


  }

})(jQuery);