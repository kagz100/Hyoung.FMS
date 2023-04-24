/**
 *
 *  [SOW] Input Suggest
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     $.SOW.core.search_inline (for inline search)
 *  @Usage          $.SOW.core.input_suggest.init('input.input-suggest');
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
  var scriptInfo      = 'SOW Input Suggest';


  $.SOW.core.input_suggest = {


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

      var __selector          = $.SOW.helper.__selector(selector);
      var __config            = $.SOW.helper.check_var(config);

      this.selector           = __selector[0];    // '#selector'
      this.collection         = __selector[1];    // $('#selector')
      this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;


      if(jQuery(this.selector).length < 1)
        return;


      // -- * --
      $.SOW.helper.consoleLog('Init : ' + scriptInfo);
      // -- * --


      // 1. Has no selector
      if(!this.selector) {
        $.SOW.core.input_suggest.process($('input.input-suggest'));
        return this.collection;
      }

      // 2. Has selector
      return this.collection.each(function() {
          
        $.SOW.core.input_suggest.process($(this));

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

      // --
      if(_this.hasClass('is-init'))
        return;
      
      _this.addClass('is-init');
      // --


      var _elID           = _this.attr('id')                                  || '',
          _key            = _this.data('input-suggest-name')                  || _this.attr('name'),
          _maxItems       = _this.data('input-suggest-max-items')             || 0,
          _maxItems       = Number(_maxItems),
          _url            = _this.data('input-suggest-ajax-url')              || '',
          _method         = _this.data('input-suggest-ajax-method')           || 'GET',
          _action         = _this.data('input-suggest-ajax-action')           || '',
          _limit          = _this.data('input-suggest-ajax-limit')            || '10',
          _type           = _this.data('input-suggest-mode')                  || 'text', // text|append
          _delay          = _this.data('input-suggest-typing-delay')          || '100',
          _charMin        = _this.data('input-suggest-typing-min-char')       || '3',
          _container      = _this.data('input-suggest-append-container')      || '',
          _stripTags      = _this.attr('data-input-suggest-append-stip-tags') || 'true';

      if(_url == '') return;

      // Assign a random id if not exist
      if(_elID == '') {
        var _elID = 'js_' + $.SOW.helper.randomStr(5);
        _this.attr('id', _elID);
      }


      // find container - used on clonned
      if(_container == 'parent:group') {
        _this.closest('.input-suggest-group').find('.input-suggest-container').addClass('res_'+_elID);
        var _container = '.res_'+_elID;
      }


      // on search
      if(_type == 'append' || _type == 'self') {

        _this.on('keyup change', function(e) {

          if(window.afterSearchKeyUp)
            clearTimeout(window.afterSearchKeyUp);

          window.afterSearchKeyUp = setTimeout(function() {

            var _key = _this.val(),
                _key = _key.trim();

            if(_action == '')
              _action = 'input_search';

            if(_key.length >= Number(_charMin)) {
              jQuery('#dd_'+_elID+'>div').empty().append('<div class="text-center"><i class="fi fi-circle-spin fi-spin text-muted fs--30"></i></div>');
              $.SOW.core.input_suggest.__suggestAjax(_url,_method,_limit,_action,_key,_elID,_this,_type,_container,_maxItems,_stripTags);
            } else {
              jQuery('#dd_'+_elID+'>div').empty();
            }

          }, Number(_delay));

        });


        // On load : Remove appended
        if(_type == 'append')
          $.SOW.core.input_suggest.__suggestAppendedRemove(_container);


      } else {

        // on input click
        _this.on('click', function(e) {

          var _this = jQuery(this);
          if(_action == '')
            _action = 'input_suggest';

          // Process Ajax
          if(jQuery('#dd_'+_elID).length < 1) {
            $.SOW.core.input_suggest.__suggestAjax(_url,_method,_limit,_action,_key,_elID,_this,_type,_container,_maxItems,_stripTags);
            return;
          }

          if(_this.val() == '')
            jQuery('#dd_'+_elID+' .iqs-item').removeClass('hide hide-force');


        });

      }

    },



    /**
     *
     *  @__suggestAjax
     *
     *
     *
     **/
    __suggestAjax: function(_url,_method,_limit,_action,_key,_elID,_this,_type,_container,_maxItems,_stripTags) {

        var __data = { ajax:"true", action:_action, key:_key, limit:_limit },
            __name = _this.data('name') || _this.attr('name');

        jQuery.ajax({

          url:            _url,
          data:           __data,
          type:           _method,
          cache:          false,
          contentType:    'application/x-www-form-urlencoded; charset=UTF-8',
          dataType:       null,
          headers:        '',
          crossDomain:    '',

          error:  function(XMLHttpRequest, textStatus, errorThrown) {

            $.SOW.helper.consoleLog('Input search suggest Error!');
            $.SOW.helper.consoleLog('URL: '+ _url);
            $.SOW.helper.consoleLog(__data);

          },

          success: function(data) {

              $.SOW.helper.consoleLog('Input search suggest Request!');
              $.SOW.helper.consoleLog('URL: '+ _url);
              $.SOW.helper.consoleLog(__data);

              // Parse JSON
              var _data = $.SOW.core.input_suggest.__suggestJsonParse(data);
              if(_data === null)
                  return;

              // Dropdown TPL
              $.SOW.core.input_suggest.__suggestTPL(_this,_elID);

              // reset
              jQuery('#dd_'+_elID+'>div').empty();
              if(_data.length < 1)  
                  return;

              // Append Data
              for (var i = 0; i < _data.length; i++) {

                  if(_type == 'append' || _type == 'self') {
                      
                      if(_type == 'self') {
                          _data[i].url = '#!';
                          _data[i].id  = '';
                      }

                      if(_data[i].disabled == true)
                          jQuery('#dd_'+_elID+'>div').append('<div class="dropdown-item p-2 text-muted">'+_data[i].label+'</div>');
                      else
                          jQuery('#dd_'+_elID+'>div').append('<a href="'+_data[i].url+'" data-id="'+_data[i].id+'" class="dropdown-item px-2"><span>'+_data[i].label+'</span></a>');
                  }
                  else
                      jQuery('#dd_'+_elID+'>div').append('<a href="#!" class="iqs-item dropdown-item px-2"><span>'+_data[i]+'</span></a>');

              }

              // Activate Bootstrap Dropdown
              if(_this.attr('data-bs-toggle') != 'dropdown') {
                  _this.attr('data-bs-toggle', 'dropdown');
                  _this.dropdown('show');
              }

              // SOW inline search 
              if(_type == 'text' && typeof $.SOW.core.search_inline === 'object') {
                  _this.attr('data-container', '#dd_'+_elID+'>div');
                  _this.addClass('iqs-input');
                  $.SOW.core.search_inline.init('input.iqs-input');
              }

              // Activate click
              jQuery('#dd_'+_elID+' a.dropdown-item').off().on('click', function(e) {
                  e.preventDefault();

                  var _it             = jQuery(this),
                      item_label      = (_stripTags+'' == 'true') ? _it.text() : _it.html(),
                      item_url        = _it.attr('href')      || '#',
                      item_id         = _it.data('id')        || '0',
                      item_disabled   = _it.data('disabled')  || false;

                  if(_type == 'append') {

                      $.SOW.core.input_suggest.__suggestAppend(item_label, item_url, item_id, item_disabled, __name, _container);

                      if(_maxItems > 0) {
                          var _currItems = jQuery('>div', _container).length;
                          if(Number(_currItems) >= _maxItems)
                              _this.prop('disabled', true);
                      }

                  }
                  else
                      _this.val(item_label);

              });

          }

        });

    },




    /**
     *
     *  @__suggestJsonParse
     *
     *
     *
     **/
    __suggestJsonParse: function(data) {

      // check
      if(data == '')
        return data;

      // parse json
      try {

        var _data = JSON.parse(data);

      } catch(err) {

        var _data = data;

      }

      if(typeof _data === 'undefined' || _data.length < 1)
        return null;

      // check
      if(typeof _data[0].label === 'undefined' && typeof _data[0].length === 'undefined')
        return null;

      // return parsed
      return _data;

    },





    /**
     *
     *  @__suggestTPL
     *
     *
     *
     **/
    __suggestTPL: function(_this,_elID) {

      var __el = _this;

      // create dropdown container
      if(jQuery('#dd_'+_elID).length < 1) {

        // If input is inside a <label>
        if(_this.parents('label').length > 0) {
          _this.parents('label').addClass('dropdown');
          __el = _this.parents('label');
        }

        // If input is directly inside a <form>
        else if(_this.parent('form').length > 0) {
          _this.parent('form').addClass('dropdown');
          __el = _this;
        }

        else if(_this.parents('.input-group').length > 0) {
          _this.parents('.input-group').addClass('dropdown');
          __el = _this;
        }
        
        else if(_this.parents('.form-label-group').length > 0) {
          _this.parents('.form-label-group').addClass('dropdown');
          __el = _this.next('label');
        
        } else {
          _this.wrap('<div class="dropdown"></div>');
        }

        // Create Dropdown
        __el.after('<div id="dd_'+_elID+'" class="dropdown-menu p-1 w-100"><div style="max-height:200px" class="scrollable-vertical"></div></div>');

      }

      return __el;

    },


    /**
     *
     *  @__suggestAppend
     *
     *
     **/
    __suggestAppend: function(item_label, item_url, item_id, item_disabled, __name, _container) {

      var __name = (__name == '') ? 'item[]' : __name;

      var _tpl = '<div class="p-1 clearfix">'
                      + '<a href="#!" class="item-suggest-append-remove fi fi-close float-start text-decoration-none" style="font-size:16px"></a>';
                      
                      if(item_url != '' && item_url != '#' && item_url != '#!')
                          _tpl += '<a href="'+item_url+'" target="_blank" class="text-decoration-none">'+item_label+'</a>';
                      else 
                          _tpl += '<span>'+item_label+'</span>';

                      _tpl += '<input type="hidden" name="'+__name+'" value="'+item_id+'">'
               + '</div>';

      // add item
      jQuery(_container).append(_tpl);

      // Remove button
      $.SOW.core.input_suggest.__suggestAppendedRemove(_container);

    },



    /**
     *
     *  @__suggestAppendedRemove
     *
     *
     **/
  __suggestAppendedRemove: function(_container) {

      if(_container == '')
        return;

      // Remove button
      jQuery(_container + ' a.item-suggest-append-remove').off().on('click', function(e) {
        e.preventDefault();

        jQuery(this).parent().remove();

        // re-enable input (if disabled)
        var _suggestEl = jQuery(_container).parent().find('input.is-init');
        if(_suggestEl.length > 0) _suggestEl.prop('disabled', false);
        else jQuery('input.is-init').prop('disabled', false);

      });

    }


  };

})(jQuery);