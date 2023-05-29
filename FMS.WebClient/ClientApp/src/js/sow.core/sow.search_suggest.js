/**
 *
 *  [SOW] Search Suggest
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.search_suggest.init('form.js-ajax-search');
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
  var scriptInfo              = 'SOW Search Suggest';

  window._relatedFirstLoad    = '';



  $.SOW.core.search_suggest = {


    /**
     *
     *  @config
     *
     *
     **/
    config: {

      enable                      : true,
      method                      : '',       // [GET|POST] WARNING! THIS IS PRIMARY! Leave empty to use the form method (usualy is GET)
      container                   : '#sow-search-container',
      input_min_length            : 2,
      input_delay                 : 100,      // ms
      related_kw                  : '',       // default keywords on load (leave empty to control from your backend)
      related_url                 : '',
      related_action              : 'related_get',
      suggest_url                 : '',
      suggest_action              : 'suggest_get',
      // --
      contentType                 : '',       // example: 'application/json; charset=utf-8'
      dataType                    : '',       // example: json
      forceStringify              : false,    // stringify requests - data sent as JSON;  data: JSON.stringify(...)

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


      // Toggler
      $.SOW.core.search_suggest.sow_suggest_toggler();

      // 1. Has no selector
      if(!this.selector) {
          $.SOW.core.search_suggest.process($('form.js-ajax-search'));
          return this.collection;
      }

      // 2. Has selector
      return this.collection.each(function() {
          
          $.SOW.core.search_suggest.process($(this));

      });

    },



    /**
     *
     *  @process
     *
     *  
     *
     **/
    process: function(_this) {

      _this.each(function() {

          var _t                  = jQuery(this),
              _method             = _t.attr('method')                 || '',          // got from form [GET|POST]
              search_enable       = _t.data('autosuggest')            || '',
              // --
              search_mode         = _t.data('mode')                   || 'html',                  // html|json
              json_max_results    = _t.data('json-max-results')       || 10,                      // JSON ONLY
              json_title_realted  = _t.data('json-related-title')     || 'Popular',               // JSON ONLY
              json_icon_related   = _t.data('json-related-item-icon') || 'fi fi-star-empty',      // JSON ONLY
              json_title_suggest  = _t.data('json-suggest-title')     || 'Search Suggestion',     // JSON ONLY
              json_noresult_txt   = _t.data('json-suggest-noresult')  || 'No results for',        // JSON ONLY
              json_icon_suggest   = _t.data('json-suggest-item-icon') || 'fi fi-search',          // JSON ONLY
              json_min_score      = _t.data('json-suggest-min-score') || 0,                       // JSON ONLY
              json_highlight_term = _t.data('json-highlight-term')    || 'true',                  // JSON ONLY
              // --
              _container          = _t.data('container')              || '',
              related_kw          = _t.data('related-keywords')       || '',
              related_url         = _t.data('related-url')            || '',
              suggest_url         = _t.data('suggest-url')            || '',
              suggest_action      = _t.data('suggest-action')         || '',          // action type
              related_action      = _t.data('related-action')         || '',          // action type
              _contentType        = _t.data('contentType')            || '',
              themeClass          = _t.data('theme-class')            || 'primary',   // only the name *-primary; used by json only
              _dataType           = _t.data('dataType')               || '',
              min_length          = _t.data('input-min-length')       || 0,
              input_delay         = _t.data('input-delay')            || 0; // ms


          // --

          if(search_enable == '' && $.SOW.core.search_suggest.config.enable === false)
              return;

          else if(search_enable != 'on')
              return;

          // --


          if(_container == '')
              var _container = $.SOW.core.search_suggest.config.container;

          if(min_length < 1)
              var min_length = $.SOW.core.search_suggest.config.input_min_length;

          if(input_delay < 50)
              var input_delay = $.SOW.core.search_suggest.config.input_delay;

          if(related_kw == '')
              var related_kw = $.SOW.core.search_suggest.config.related_kw;

          if(related_url == '')
              var related_url = $.SOW.core.search_suggest.config.related_url;

          if(related_action == '')
              var related_action = $.SOW.core.search_suggest.config.related_action;

          if(suggest_url == '')
              var suggest_url = $.SOW.core.search_suggest.config.suggest_url;

          if(suggest_action == '')
              var suggest_action = $.SOW.core.search_suggest.config.suggest_action;

          // --

          // Override the original form method!
          if($.SOW.core.search_suggest.config.method != '')
              var _method = $.SOW.core.search_suggest.config.method;



          // Needed to avoid multiple same request
          window._lastSearch = null;

          // Check required
          if(related_url == '' && suggest_url == '') {
              $.SOW.helper.consoleLog('Search Suggest Error: No related and/or suggest url provided!');
              return;
          }


          // --


          // Close/hide autosuggest on backdrop click
          window.suggestionIsAlreadyFocused = false;
          jQuery('.sow-search-backdrop', _t).addClass('hide').on('click', function(e) {
              $.SOW.core.search_suggest.__suggest_hide(_t);
          });

          // Close/hide autosuggest for `esc` key
          jQuery(document).keyup(function(e) {
              
              if(e.keyCode === 27) { // 27 = ESC key
                  $.SOW.core.search_suggest.__suggest_hide(_t, _container);
              }

          });



          // --



          // :: FOCUS : RELATED
          jQuery('input.form-control-sow-search', _t).focus(function(e) {

              var _autosuggestContent = jQuery(_container + ' .sow-search-content').html();


              // SUGGEST BY RELATED (home, category, product, etc)
              if(_autosuggestContent.length < 3) {
                  jQuery('.sow-search-loader').removeClass('hide');

                  if(window.afterSearchKeyUp)
                      clearTimeout(window.afterSearchKeyUp);

                  window.afterSearchKeyUp = setTimeout(function() {

                      var _formData = {ajax:"true", action:related_action, related_keywords:related_kw};

                      // console log
                      if($.SOW.core.search_suggest.config.forceStringify === true)
                          $.SOW.helper.consoleLog("JSON Related Sent: " + JSON.stringify(_formData));
                      else
                          $.SOW.helper.consoleLog("Related Sent: " + JSON.stringify(_formData));

                      $.SOW.helper.consoleLog('Url Request: ' + related_url, 'color: #cccccc;');
                      $.SOW.helper.consoleLog('Mode: ' + search_mode, 'color: #cccccc;');
                      $.SOW.helper.consoleLog('------------------------------------------------------------', 'color: #cccccc;');

                      jQuery.ajax({

                          url:            related_url,
                          data:           ($.SOW.core.search_suggest.config.forceStringify === true) ? JSON.stringify(_formData) : _formData,
                          type:           _method,
                          cache:          (search_mode == 'json') ? false : true,
                          contentType:    _contentType    || 'application/x-www-form-urlencoded; charset=UTF-8',
                          dataType:       _dataType       || null,
                          headers:        '',
                          crossDomain:    '',

                          error:  function(XMLHttpRequest, textStatus, errorThrown) {

                              if(typeof $.SOW.core.toast === 'object') {

                                  $.SOW.core.toast.show('danger', 'Error', 'Unexpected Internal error!', 'bottom-center', 0, true);
                                  
                              } else {

                                  alert("[404] Unexpected internal error!");

                              }
                              
                              jQuery('.sow-search-loader').addClass('hide');

                          },

                          success: function(data) {

                              if(search_mode === 'json')
                                  var data = $.SOW.core.search_suggest.process_json(data, related_kw, json_max_results, json_title_realted, json_noresult_txt, json_highlight_term, json_icon_related, json_min_score, themeClass);

                              // Push data 
                              jQuery(_container + ' .sow-search-content').html(data);

                              // keep as a 'cache'
                              window._relatedFirstLoad = data;

                              // hide loader
                              jQuery('.sow-search-loader').addClass('hide');

                          }

                      });

                  }, 50);

              }

              $.SOW.core.search_suggest.__suggest_show(_t, _container);

          });



          // --



          // USER KEY UP : SEARCH
          jQuery('input.form-control-sow-search', _t).on('keyup change',function(e) {

              var _keyInput   = jQuery(this).val() || '';

              $.SOW.core.search_suggest.__suggest_show(_t, _container);

              if(_keyInput.length >= Number(min_length) && window._lastSearch != _keyInput) {
                  

                  // START AJAX SEARCH
                  jQuery('.sow-search-loader').removeClass('hide');


                  // SUGGEST BY USER INPUT
                  if(window.afterSearchKeyUp)
                      clearTimeout(window.afterSearchKeyUp);

                  window.afterSearchKeyUp = setTimeout(function() {

                      window._lastSearch = _keyInput;

                      var _formData = {ajax:"true", action:suggest_action, user_keywords:_keyInput };

                      // console log
                      if($.SOW.core.search_suggest.config.forceStringify === true)
                          $.SOW.helper.consoleLog("JSON Suggest Sent: " + JSON.stringify(_formData));
                      else
                          $.SOW.helper.consoleLog("Related Suggest: " +  JSON.stringify(_formData));

                      $.SOW.helper.consoleLog('Url Request: ' + related_url, 'color: #cccccc;');
                      $.SOW.helper.consoleLog('Mode: ' + search_mode, 'color: #cccccc;');
                      $.SOW.helper.consoleLog('------------------------------------------------------------', 'color: #cccccc;');

                      jQuery.ajax({
                          url:            suggest_url,
                          data:           ($.SOW.core.search_suggest.config.forceStringify === true) ? JSON.stringify(_formData) : _formData,
                          type:           _method,
                          cache:          (search_mode == 'json') ? false : true,
                          contentType:    _contentType    || 'application/x-www-form-urlencoded; charset=UTF-8',
                          dataType:       _dataType       || null,
                          headers:        '',
                          crossDomain:    '',
                          
                          error:  function(XMLHttpRequest, textStatus, errorThrown) {

                              if(typeof $.SOW.core.toast === 'object') {

                                  $.SOW.core.toast.show('danger', 'Error', 'Unexpected Internal error!', 'bottom-center', 0, true);
                                  
                              } else {

                                  alert("[404] Unexpected internal error!");

                              }

                              jQuery('.sow-search-loader').addClass('hide');

                          },

                          success: function(data) {

                              if(search_mode === 'json')
                                  var data = $.SOW.core.search_suggest.process_json(data, _keyInput, json_max_results, json_title_suggest, json_noresult_txt, json_highlight_term, json_icon_suggest, json_min_score, themeClass);

                              // Push data
                              jQuery(_container + ' .sow-search-content').html(data);

                              // hide loader
                              jQuery('.sow-search-loader').addClass('hide');

                          }

                      });

                  }, Number(input_delay));



              } else {

                  // BACK TO RELATED
                  if(window._relatedFirstLoad != '' && _keyInput == '') {
                      jQuery(_container + ' .sow-search-content').html(window._relatedFirstLoad);
                  }

              }

          });



      });

    },

        /**
         *
         *  @__suggest_show
         *  :: Helper
         *  
         *
         **/
        __suggest_show: function(_t, _container) {

          // Begin autosuggest
          if(window.suggestionIsAlreadyFocused === false) {

              _t.removeClass('hide');
              jQuery('.sow-search-backdrop', _t).removeClass('hide');
              jQuery(_container).removeClass('hide');
              window.suggestionIsAlreadyFocused = true;

          }

        },

        /**
         *
         *  @__suggest_hide
         *  :: Helper
         *  
         *
         **/
        __suggest_hide: function(_t, _container) {

          if(window.suggestionIsAlreadyFocused === true) {

              $.SOW.globals.elBody.removeClass('overflow-hidden');

              jQuery('.sow-search-backdrop', _t).addClass('hide');
              jQuery('.sow-search-container', _t).addClass('hide');
              jQuery('.sow-search-over', _t).addClass('hide');

              jQuery('input.form-control-sow-search', _t).blur();
              _t.removeClass('sow-search-mobile');
              jQuery('.sow-search-over').addClass('hide'); // all of them, if many available

              window.suggestionIsAlreadyFocused = false;

          }

        },



    /**
     *
     *  @sow_suggest_toggler
     *
     *  
     *
     **/
    sow_suggest_toggler: function() {

      var _selector = this.selector_orig;

      jQuery('.btn-sow-search-toggler:not(.btn-sow-search-togglified)').addClass('btn-sow-search-togglified').on('click', function(e) {
          e.preventDefault();

          var _target = jQuery(this).data('target') || _selector;

          jQuery(_target).toggleClass('sow-search-mobile');
          jQuery(_target+'.sow-search-over').toggleClass('hide');

          if(jQuery(_target).hasClass('sow-search-mobile')) {

              jQuery(_target+' input.form-control-sow-search').focus();
              $.SOW.globals.elBody.addClass('overflow-hidden');
              jQuery(_target+'.sow-search-over').removeClass('hide');

          } else {

              jQuery(_target+' input.form-control-sow-search').blur();
              $.SOW.globals.elBody.removeClass('overflow-hidden');
              jQuery(_target+'.sow-search-over').addClass('hide').removeClass('sow-search-mobile');
              
          }

      });

    },


    /**
     *
     *  @process_json
     *
     *  
     *
     **/
    process_json: function(data, keyword, json_max_results, json_title, json_noresult_txt, highlight_term, icon, json_min_score, themeClass) {

      /*
          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
          https://github.com/bripkens/fuzzy.js/blob/gh-pages/fuzzy.js
          Check for fuzzy.js vendor

      */
      if(typeof fuzzy !== 'function') {

          // -- * --
          $.SOW.helper.consoleLog(' ERROR : ' + scriptInfo + ' : Require fuzzy.js Vendor for JSON search mode!', 'color: #ff0000; font-weight: bold;');
          // -- * --

          return '<h3 class="fs-5 p-4 pb--3 m-0 text-danger">' + scriptInfo + ' Error</h3>'
                  + '<hr><p class="px-3">data-mode="json" <br> You enabled JSON search mode but fuzzy.js Vendor could not be found!</p>'
                  + '<hr><p class="px-3"> Add fuzzy.js Vendor or switch to data-mode="html"</p>';

      }
      // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --





      try {

          var _data = JSON.parse(data);

      } catch(err) {

          var _data = data;

      }   var data = null; // clear/reset


      /*

          TEST ONLY!
          fuzzy.js used instead!

          var results = _data.filter(function(result) {
            return result.label.indexOf(keyword) > -1;
          });
          console.log(results);

      */


      // TPL START : Common for related & suggest
      var _tpl = '<h3 class="fs-5 p-4 m-0 text-'+ themeClass +'">' + json_title + '</h3>'
                  + '<ul class="list-unstyled list-suggestion">';





      // 1. FUZZY SEARCH : BY USER INPUT
      if(keyword != '') {

          var filterResult    = [],
              filterIndex     = [],
              _found          = 0;

          // fuzzy setup
          fuzzy.analyzeSubTerms = true;

          // Walk through json data
          for (var i = 0; i < _data.length; i++) {
              filterResult[i]         = fuzzy(_data[i].label, keyword);   // label filter
              filterResult[i].url     = _data[i].url;                     // url required!
          }


          // sorting
          filterResult.sort(fuzzy.matchComparator);


          // Walk through results
          for (var i = 0; i < filterResult.length && i < json_max_results; i++) {
              var option              = filterResult[i],
                  term                = option.term,
                  score               = option.score,
                  termHighlighted     = option.highlightedTerm,
                  _term = (highlight_term == true)  ? termHighlighted : term;



              // Append each result
              if(score >= json_min_score) {
                  _found++;
                  _tpl += '<li class="list-item" data-score="'+score+'">'
                          + '<a href="'+option.url+'">'
                              //+ '<span class="text-muted fs-3 float-end p-1">0 results</span>'
                              + '<i class="'+icon+'"></i> ' + _term
                          + '</a>'
                      + '</li>';
              }

          }

          if(_found < 1) {
              _tpl += '<li class="list-item text-muted px-4 pb-4">'
                      + json_noresult_txt + ' <i>"' + keyword + '"</i>'
                  + '</li>';
          }

      // RELATED!
      } else {

          var filterResult    = [];

          // Walk through json data
          for (var i = 0; i < _data.length; i++) {
              filterResult[i] = _data[i].label;
          }


          for (var i = 0; i < filterResult.length && i < json_max_results; i++) {

              // Append each result
              _tpl += '<li class="list-item">'
                      + '<a href="'+_data[i].url+'">'
                          + '<i class="'+icon+'"></i> ' + _data[i].label
                      + '</a>'
                  + '</li>';

          }

      }




      // TPL END : Common for related & suggest
      _tpl += '</ul>';


      return _tpl;


    }

  }

})(jQuery);
