/**
 *
 *  [SOW] Dropdown Ajax
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     $.SOW.core.dropdown_click_ignore
 *                  $.SOW.core.dropdown
 *  @Usage          $.SOW.core.dropdown_ajax.init('a[data-bs-toggle="dropdown"]');
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
  var scriptInfo      = 'SOW Dropdown Ajax';
  var ddTimeKepper    = {};
  window.ddimgCache   = '';


  $.SOW.core.dropdown_ajax = {


    /**
     *
     *  @config
     *
     *
     **/
    config: {

      // general
      loading_icon:           'fi fi-circle-spin fi-spin',
      clearCacheInterval:     1000 * 60,  // 1 min


      // json only : dropdown strating|ending tags
      tpl_start:              '<ul class="list-unstyled m-0 p-0">',
      tpl_end:                '</ul>',

      tpl_ItemStart:          '<li class="dropdown-item">',
      tpl_ItemStartWChilds:   '<li class="dropdown-item dropdown">',
      tpl_ItemEnd:            '</li>',

      tpl_Child_Start:        '<ul class="dropdown-menu dropdown-menu-hover dropdown-menu-block-md shadow-lg b-0 m-0">',
      tpl_Divider:            '<li class="dropdown-divider"></li>',

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


      // Image Switcher (no selector)
      $.SOW.core.dropdown_ajax.ddImageSwitcher();
      // -- --

      if(jQuery(this.selector).length < 1)
          return;


      // -- * --
      $.SOW.helper.consoleLog('Init : ' + scriptInfo);
      // -- * --


      $.SOW.core.dropdown_ajax.process(this.collection);
      return this.collection;

    },



    /**
     *
     *  @process
     *
     **/
    process: function(_this) {

      // Required
      if(_this.data('dropdown-ajax-source') == '')
        return;


      // Initial Setup
      if($.SOW.globals.is_mobile === true) {

        var jQ_actions = 'click';

      } else {

        var jQ_actions = 'click mouseover';

        // Hover only, remove click
        if(_this.next().closest('.dropdown-menu').hasClass('dropdown-menu-hover'))
          var jQ_actions = 'mouseover';

      }


      // Repopulate dropdowns from cache, if exists
      $.SOW.core.dropdown_ajax.repopulateFromCache();


      // mouse over|click
      _this.on(jQ_actions, function(e) {

          var _t                  = jQuery(this),
              _source             = _t.data('dropdown-ajax-source')           || '',
              _mode               = _t.data('dropdown-ajax-mode')             || 'html',  // html|json
              _clearCacheInterval = _t.data('dropdown-ajax-refresh-interval') || $.SOW.core.dropdown_ajax.config.clearCacheInterval,
              _reloadAlways       = _t.data('dropdown-ajax-reload-always')    || false,
              _loadIcon           = _t.data('dropdown-ajax-loadicon')         || $.SOW.core.dropdown_ajax.config.loading_icon,
              _container          = _t.next().closest('.dropdown-menu')       || '',
              _useCache           = _t.attr('data-dropdown-ajax-cache')       || 'false',
              _containerID        = _container.attr('id')                     || '',
              _method             = _t.data('dropdown-ajax-method')           || 'GET',
              _contentType        = _t.data('dropdown-ajax-contentType')      || '',
              _dataType           = _t.data('dropdown-ajax-dataType')         || '';


          if(_source == '' || _container == '')
              return;


          // Add an ID to dropdown container if empty
          if(_containerID == '') {
              var _containerID = 'rand_' + $.SOW.helper.randomStr(8);
              _container.attr('id', _containerID);
          }


          // Cached? Check expired
          if(_useCache+'' == 'true' && _t.hasClass('js-cached')) {
              var $continue = $.SOW.core.dropdown_ajax.validateCache(_source);
              if($continue === false)
                  return;
          }


          /*
              force : overwrite
              do not reload data on mouse over
          */
          if(jQ_actions == 'mouseover' && $.SOW.globals.is_mobile === false)
              _reloadAlways = false;


          // Refresh Interval!
          if(_reloadAlways == false && _clearCacheInterval > 0)
              $.SOW.core.dropdown_ajax.process_clearCacheInterval(_t, _containerID, _clearCacheInterval);


          // Content already successfully loaded and reload on each click|show is disabled
          if(_reloadAlways == false && _t.hasClass('js-dropdownified'))
              return;


          // set initialized
          _container.addClass('js-dropdownified');


          // Ajax
          jQuery.ajax({
              url:            _source,
              data:           (_mode === 'json') ? {} : {ajax:"true"},
              type:           _method,
              contentType:    _contentType    || 'application/x-www-form-urlencoded; charset=UTF-8',
              dataType:       _dataType       || null,
              headers:        '',
              crossDomain:    '',

              beforeSend: function() {

                  _container.html('<div class="js-dd-ajax-loader text-center rounded p-3"><i class="' + _loadIcon + ' h5 text-gray-400"></i></div>');

              },

              error:  function(XMLHttpRequest, textStatus, errorThrown) {

                  if(typeof $.SOW.core.toast === 'object') {

                      $.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', 'bottom-center', 0, true);

                  } else {

                      // alert("[404] Unexpected internal error!");

                  }

              },

              success: function(data) {

                  _t.addClass('js-dropdownified');

                  /* json */
                  if(_mode === 'json')
                      var data = $.SOW.core.dropdown_ajax.process_json(data);

                  // push data
                  _container.html(data);


                  // Add to cache
                  if(_useCache+'' == 'true')
                      $.SOW.core.dropdown_ajax.addToCache(_source, data);


                  /*
                      Reinits [mobile required]
                  */
                  // SOW :: Dropdown
                  if(typeof $.SOW.core.dropdown === 'object')
                      $.SOW.core.dropdown.process(_container);

                  // SOW :: Dropdown Click Ignore
                  if(typeof $.SOW.core.dropdown_click_ignore === 'object') {
                      var _containerLinks = $('a', _container);
                      $.SOW.core.dropdown_click_ignore.stop_dd_empty_link(_containerLinks);
                  }

                  // SOW :: Ajax Navigation
                  if(typeof $.SOW.core.ajax_navigation === 'object')
                      $.SOW.core.ajax_navigation.__initFor('#' + _containerID);


                  // -- * --
                  $.SOW.helper.consoleLog('[#'+_containerID+'] Dropdown Ajax Content Loaded! ' + _source, 'color: #999999;');
                  // -- * --


                  // Reinit Plugins : HTML only
                  if(_mode == 'html') {
                      var _target = '#'+_containerID;

                      // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
                      // console log
                      $.SOW.helper.consoleLogReinit(scriptInfo, _target);
                      // reinit inside ajax container
                      $.SOW.reinit(_target);
                      // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

                  }

              }

          });

      });

    },




    /**
     *
     *  @process_json
     *
     *  
     *
     **/
    process_json: function(data) {

        try {

            var _data = JSON.parse(data);

        } catch(err) {

            var _data = data;

        }

        /* --------------------------------- */
        var _tpl  = ''; 
            _tpl += $.SOW.core.dropdown_ajax.config.tpl_start;
            _tpl += $.SOW.core.dropdown_ajax.process_json_build_tree(_data);
            _tpl += $.SOW.core.dropdown_ajax.config.tpl_end;
        /* --------------------------------- */


        return _tpl;

    },




    /**
     *
     *  @process_json_build_tree
     *  Recursive
     *  
     *
     **/
    process_json_build_tree: function(data) {
        
        var _tpl = '';

        if(typeof data === 'undefined') 
            return _tpl;

        for (var i = 0; i < data.length; i++) {

            /* 0. Divider -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
            if(typeof data[i].divider !== 'undefined' && data[i].divider === true) {
                _tpl += $.SOW.core.dropdown_ajax.config.tpl_Divider;
                continue;
            }
            /* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */


            /* 1. Text -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
            else if(typeof data[i].text !== 'undefined' && data[i].text.length > 0) {
                _tpl += $.SOW.core.dropdown_ajax.config.tpl_ItemStart + data[i].text + $.SOW.core.dropdown_ajax.config.tpl_ItemEnd;
                continue;
            }
            /* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */



            var has_childs      = (typeof data[i].childs !== 'undefined' && data[i].childs.length > 0) ? true : false;


            /* 2. tpl start <li> -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
            _tpl                += (has_childs === true) ? $.SOW.core.dropdown_ajax.config.tpl_ItemStartWChilds :  $.SOW.core.dropdown_ajax.config.tpl_ItemStart;
            /* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */



            /* 3. add link -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
            var _childsTag       = (has_childs === true) ?  ' data-bs-toggle="dropdown"' : '';

            var _class           = (typeof data[i].class    !== 'undefined' && data[i].class != '')         ? ' ' + data[i].class   : '';
                _class          += (typeof data[i].active   !== 'undefined' && data[i].active == true)      ? ' active'             : '';
                _class          += (typeof data[i].disabled !== 'undefined' && data[i].disabled == true)    ? ' disabled'           : '';

            var _icon            = (typeof data[i].icon     !== 'undefined' && data[i].icon != '')          ? '<i class="'+data[i].icon+'"></i>' : '';
            var _target          = (typeof data[i].target   !== 'undefined' && data[i].target != '')        ? ' target="'+data[i].target+'"' : '';

            _tpl                += '<a href="'+data[i].url+'" class="dropdown-link' + _class + '"' + _childsTag + _target+'>' + _icon + data[i].label + '</a>';
            /* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */



            /* 4. recursive childs  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
            if(has_childs === true) {
                _tpl            += $.SOW.core.dropdown_ajax.config.tpl_Child_Start;
                _tpl            += $.SOW.core.dropdown_ajax.process_json_build_tree(data[i].childs);
                _tpl            += $.SOW.core.dropdown_ajax.config.tpl_end;
            }
            /* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */



            /* 5. tpl end </li>  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
            _tpl                += $.SOW.core.dropdown_ajax.config.tpl_ItemEnd;
            /* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

        }


        /* return final tpl */
        return _tpl;
    },




    /**
     *
     *  @process_clearCacheInterval
     *  
     *  
     *
     **/
    process_clearCacheInterval: function(_t, _containerID, _clearCacheInterval) {

        var timestampNow = new Date().getTime();

        // First click/hover
        // Refresh : Cache Added!
        if(typeof ddTimeKepper[_containerID] === 'undefined')
            ddTimeKepper[_containerID] = timestampNow;

        // Cache Refreshed & Content Reloaded
        else if((timestampNow - ddTimeKepper[_containerID]) > _clearCacheInterval) {
            ddTimeKepper[_containerID] = timestampNow;
            _t.removeClass('js-dropdownified');
        }

    },







    /**
     *
     *  @addToCache
     *
     **/
    addToCache: function(_URL, data) {

        // Skip
        if(jQuery('body[data-dropdown-ajax-cache-ignore="true"]').length > 0) {
            localStorage.removeItem('cachedDropdowns');
            return;
        }

        // Get from cache!
        var cachedDropdowns     = localStorage.getItem("cachedDropdowns");
        var cachedDropdownsArr  = (cachedDropdowns) ? JSON.parse(cachedDropdowns) : {};

        // create a hash from URL
        var hash = $.SOW.helper.strhash(_URL);
        var timestampNow = new Date().getTime();

        cachedDropdownsArr[hash] = { url:_URL, html:data, timestamp:timestampNow }
        localStorage.setItem("cachedDropdowns", JSON.stringify(cachedDropdownsArr));

        return true;

    },



    /**
     *
     *  @repopulateFromCache
     *
     **/
    repopulateFromCache: function() {

        // Skip
        if(jQuery('body[data-dropdown-ajax-cache-ignore="true"]').length > 0)
            return;

        // Get from cache!
        var cachedDropdowns = localStorage.getItem("cachedDropdowns");
        if(!cachedDropdowns)
            return false;

        // Array conversion
        var cachedDropdownsArr = JSON.parse(cachedDropdowns);
        for(var key in cachedDropdownsArr) {
            jQuery('[data-dropdown-ajax-source="'+cachedDropdownsArr[key]['url']+'"]').addClass('js-cached').next().closest('.dropdown-menu').html(cachedDropdownsArr[key]['html']);
        }

        return true;
    },






    /**
     *
     *  @validateCache
     *
     **/
    validateCache: function(_URL) {

        // Get from cache!
        var cachedDropdowns     = localStorage.getItem("cachedDropdowns");
        if(!cachedDropdowns)
            return true; // true = continue

        // Parse cache & create hash from url
        var cachedDropdownsArr  = JSON.parse(cachedDropdowns);
        var hash                = $.SOW.helper.strhash(_URL);

        // Cache Refreshed & Content Reloaded
        var timestampNow = new Date().getTime();
        if((timestampNow - cachedDropdownsArr[hash]['timestamp']) > 60*30) {
                    cachedDropdownsArr[hash] = {};
            delete  cachedDropdownsArr[hash];

            // reset
            localStorage.setItem("cachedDropdowns", JSON.stringify(cachedDropdownsArr));
            return true; // true = continue

        }

        return false; // false = stop, cache is valid!

    },




    /**
     *
     *  @VanillaJS
     *  @Image Switcher
     *  :: Minified: 2,7K
     *
     **/
    ddImageSwitcher: function() {

        // cache
        var _tpl                = '';
            window.ddimgCache   = '';

        // click
        document.querySelectorAll(".dropdown-image-list").forEach(function(el) {

            /* Bind once! Ajax reinits */
            if(el.classList.contains("js-ddimg"))
                return null;


            el.addEventListener('click', function(e) {
                e.preventDefault();

                var _t                      = e.currentTarget;

                // --
                /* Bind once! Ajax Click! */
                if(_t.classList.contains('js-ddimg'))
                    return;
                
                _t.classList.add('js-ddimg');
                // --

                var _imageContainer         = _t.querySelector('.dropdown-image-container')                 || '',

                    /* dropdown container */
                    ddContainer             = _t.nextElementSibling                                         || '', 
                    ddAjaxContainer         = ddContainer.querySelector('.dropdown-ajax-container')         || '', 
                    
                    /* ajax : populate : get images */
                    _ajaxPopulateUrl        = ddContainer.getAttribute('data-ddimg-ajax-populate-url')      || '',
                    _ajaxPopulateParams     = ddContainer.getAttribute('data-ddimg-ajax-populate-params')   || '',
                    _ajaxPopulateMethod     = ddContainer.getAttribute('data-ddimg-ajax-populate-method')   || 'GET',
                    _ajaxPopulateClass      = ddContainer.getAttribute('data-ddimg-ajax-populate-class')    || 'float-start w--80 h--80 m-1 p-0 rounded overflow-hidden overlay-dark-hover overlay-opacity-3',

                    /* ajax : update : selected image */
                    _ajaxUpdateUrl          = ddContainer.getAttribute('data-ddimg-ajax-update-url')        || '',
                    _ajaxUpdateParams       = ddContainer.getAttribute('data-ddimg-ajax-update-params')     || '',
                    _ajaxUpdateMethod       = ddContainer.getAttribute('data-ddimg-ajax-update-method')     || _ajaxPopulateMethod,

                    /* toast message */
                    toastMsg                = ddContainer.getAttribute('data-ddimg-toast-success')          || 'Successfully Updated!',
                    toastPosition           = ddContainer.getAttribute('data-ddimg-toast-position')         || 'top-center',
                    
                    useCache                = ddContainer.getAttribute('data-ddimg-cache')                  || 'true',
                    noImgText               = ddContainer.getAttribute('data-ddimg-noimg-text')             || 'No Images!',

                    /* loading classes */
                    clsContainer            = ['fi','fi-circle-spin','fi-spin','fs--30','text-muted','h--80','d-middle'],
                    clsItem                 = ['fs--25','transition-none','fi','fi-orbit','fi-spin','overlay-light','overlay-opacity-4','text-white'];



                // Custom Params : Populate
                var populateParams  = { ajax:'true' };
                var _cacheKey       = _ajaxPopulateUrl + _ajaxPopulateMethod;
                if(_ajaxPopulateParams != '') {

                    var ajax_params_arr = $.SOW.helper.params_parse(_ajaxPopulateParams);
                    for (var i = 0; i < ajax_params_arr.length; ++i) {
                        populateParams[ajax_params_arr[i][0]] = ajax_params_arr[i][1];
                        _cacheKey += ajax_params_arr[i][1];
                    }

                }



                // Cache : avoid multiple requests on the same url
                if(useCache+'' == 'true' && _cacheKey == window.ddimgCache) {

                    // console.log('Loaded from cache!');
                    ddAjaxContainer.innerHTML = _tpl;
                    _updateBind();


                }   else {

                    // add cache
                    window.ddimgCache = _cacheKey;

                    // Ajax : Populate
                    /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
                    jQuery.ajax({
                        url:            _ajaxPopulateUrl,
                        type:           _ajaxPopulateMethod,
                        data:           populateParams,
                        // dataType:        'application/json',

                        beforeSend: function() { 

                            // loading : add
                            clsContainer.forEach(function(c) {
                                ddAjaxContainer.classList.add(c);
                                ddAjaxContainer.style.height = '80px';
                                ddAjaxContainer.style.fontSize = '30px';
                            });

                        },
                        error:      function(XMLHttpRequest, textStatus, errorThrown) {},
                        success:    function(data) { 

                            var data = $.SOW.helper.jsonParse(data);

                            // loading : remove
                            clsContainer.forEach(function(c) {
                                ddAjaxContainer.classList.remove(c);
                            });

                            _tpl = ''; // reset

                            if(data.length < 1) {
                                window.ddimgCache   = ''; // reset cache
                                ddAjaxContainer.innerHTML   = '<span class="p-2 text-muted">'+noImgText+'</span>';
                                return;
                            }


                            for (var i = 0; i < data.length; i++) {

                                _tpl += '<a href="#!" class="dropdown-image-item d-block bg-cover '+_ajaxPopulateClass+'" style="width:80px;height:80px;background-image:url('+data[i].img_src+')" '
                                            + 'data-img-src="'+data[i].img_src+'" '
                                            + 'data-img-id="'+(data[i].img_id || 0)+'">'
                                        + '</a>';

                            }

                            // push data
                            ddAjaxContainer.innerHTML = _tpl;

                            // bind
                            _updateBind();

                        }
                    });
                    /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

                }



                // Update : Item Click/Change
                function _updateBind() {

                    ddContainer.querySelectorAll(".dropdown-image-item").forEach(function(item) {

                        item.addEventListener('click', function(i) {
                            i.preventDefault();

                            var _t          = i.currentTarget,
                                img_src     = _t.getAttribute('data-img-src')   || '',
                                img_id      = _t.getAttribute('data-img-id')    || 0;

                            // set image as background
                            _imageContainer.style.backgroundImage = "url('"+img_src+"')";

                            // update
                            __itemUpdate(img_src, img_id);
                            return null;

                        });
                    });

                }



                // Reset : Item Click/Change
                ddContainer.querySelectorAll(".dropdown-image-reset").forEach(function(item) {

                  item.style.width = '80px';
                  item.style.height = '80px';

                  item.addEventListener('click', function(i) {
                    i.preventDefault();

                    var _t          = i.currentTarget,
                        img_src     = '',
                        img_id      = _t.getAttribute('data-img-id')    || 0;

                    // set no image as background
                    _imageContainer.style.backgroundImage = "";

                    // update
                    __itemUpdate(img_src, img_id);

                  });

                });




                // Ajax : Update
                /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
                function __itemUpdate(img_src, img_id) {
                    

                    // Update Inputs 
                    // if exist!
                    if(_t.querySelector('.dropdown-ddimg-img-id'))
                        _t.querySelector('.dropdown-ddimg-img-id').setAttribute('value', img_id)

                    if(_t.querySelector('.dropdown-ddimg-img-src'))
                        _t.querySelector('.dropdown-ddimg-img-src').setAttribute('value', img_src);


                    // No URL to update
                    // Stop here, skip ajax udate
                    if(_ajaxUpdateUrl == '')
                        return null;



                    // Custom Params : Update
                    var updateParams    = { ajax:'true', img_src:img_src, img_id:img_id };
                    if(_ajaxUpdateParams != '') {

                        var ajax_params_arr = $.SOW.helper.params_parse(_ajaxUpdateParams);
                        for (var i = 0; i < ajax_params_arr.length; ++i) {
                            updateParams[ajax_params_arr[i][0]] = ajax_params_arr[i][1];
                        }

                    }


                    // Ajax
                    jQuery.ajax({
                        url:            _ajaxUpdateUrl,
                        type:           _ajaxUpdateMethod,
                        data:           updateParams,

                        beforeSend: function() { 

                            // loading : add
                            clsItem.forEach(function(c) {
                                _imageContainer.classList.add(c);
                            });

                        },

                        error:      function(XMLHttpRequest, textStatus, errorThrown) { },
                        
                        success:    function(data) { 

                            // loading : remove
                            clsItem.forEach(function(c) {
                                _imageContainer.classList.remove(c);
                            });

                            if(typeof $.SOW.core.toast === 'object')
                                $.SOW.core.toast.show('success', '', toastMsg, toastPosition, 1500, true);

                        }
                    });
                }
                /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


            });
        });

    }

  };


})(jQuery);