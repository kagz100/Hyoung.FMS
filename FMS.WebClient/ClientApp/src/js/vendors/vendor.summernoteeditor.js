/**
 *
 *  [SOW] Summernote Editor
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependencies   -
 *  @Usage          $.SOW.vendor.summernoteeditor.init('.summernote-editor');
 *
 *  @Ajax Support   YES
 *
 *  Vendor:         https://github.com/summernote/summernote
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
  var scriptInfo                  = 'Vendor Summernote Editor';
  var summernoteEditor            = [];

  $.SOW.vendor.summernoteeditor = {


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


    // Check Vendor ; dymanically load if missing (should be external)
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if(selector != '') {
        if(jQuery(selector).length < 1)
            return null;
    }

    if (!jQuery().summernote) {

      var paths = $.SOW.helper.vendorLogicPaths('summernoteeditor');
      if(paths['path_js'] == '') {
        $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
        return null;
      }

      $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

        if (!jQuery().summernote) {
          $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
          return null;
        }

        // self reinit, external js loaded!
        $.SOW.vendor.summernoteeditor.init(selector, config);
        return null;

      });

      return null;

    }
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



    var __selector          = $.SOW.helper.__selector(selector);
    var __config            = $.SOW.helper.check_var(config);

    this.selector           = __selector[0];    // '#selector'
    this.collection         = __selector[1];    // $('#selector')
    this.selector_orig      = __selector[2];    // $('#selector') // without ajax container prefix
    this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;


    // -- * --
    $.SOW.helper.consoleLog('Init : ' + scriptInfo);
    // -- * --


    // 1. Has no selector
    if(!this.selector) {
      $.SOW.vendor.summernoteeditor.process($('.summernote-editor'));
      return $('.summernote-editor');
    }

    // 2. Has selector
    return this.collection.each(function() {
        
      $.SOW.vendor.summernoteeditor.process($(this));

    });

    },



    /**
     *
     *  @process
     *

        <textarea name="post_body" class="summernote-editor summernote-fix w-100 h--350" 

            data-ajax-url="upload.php" 
            data-ajax-params="['option1','value1'],['option2','value2']" 

            data-summernote-config='{

                "placeholder":  "Page body...",
                "focus":        true,
                "lang":         "en-US",
                "minHeight":    350,
                "maxHeight":    2800,
                
                "styleTags": ["h2","h3","h4","h5","h6"
                    
                    ,{
                        "title"     :"Paragraph",
                        "tag"       :"p",
                        "value"     :"p",
                        "style"     :"",
                        "className" :""
                    }

                    ,{
                        "title"     :"Paragraph Lead",
                        "tag"       :"p",
                        "value"     :"p",
                        "style"     :"",
                        "className" :"lead"
                    }

                ],

                "toolbar": [
                    ["style", ["style"]],
                    ["font", ["bold", "italic", "underline", "clear"]],
                    ["fontname", ["fontname"]],
                    ["color", ["color"]],
                    ["para", ["ul", "ol", "paragraph"]],
                    ["height", ["height"]],
                    ["table", ["table"]],
                    ["insert", ["link", "picture", "video", "hr"]],
                    ["view", ["fullscreen", "codeview"]]
                ],

                "shortcuts":             false,
                "disableDragAndDrop":    false,
                "codeviewFilter":        false,
                "codeviewIframeFilter":  true
            }'></textarea>
        <small class="text-gray-400">* shift + enter = new line</small>

     *
     **/
    process: function(_this) {

      if(_this.hasClass('js-summernotefied'))
        return;



      /** +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

          We can't delete them! Some projects might use them!
          `summernoteConfig` is used from now and will overwrite these below!

      +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ **/
      /** +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ **/
      var placeholder         = _this.data('placeholder')                         || 'Type here...',
          minHeight           = _this.data('min-height')                          || 300,
          maxHeight           = _this.data('max-height')                          || 1500,
          focus               = _this.attr('data-focus')                          || 'false',
          lang                = _this.data('lang')                                || 'en-US',
          ajaxURL             = _this.data('ajax-url')                            || '',
          ajaxParams          = _this.data('ajax-params')                         || '',
          toolbar             = _this.data('toolbar')                             || '';
      /** +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ **/
      /** +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ **/





      var ID                      = _this.attr('id')                                  || '',

          // https://summernote.org/deep-dive/#disable-drag-and-drop
          summernoteConfig        = _this.data('summernote-config')                   || '',

          // Same as summernoteConfig, used as a separation
          // But for comlpicated javascript (plugins, functions, etc)
          customExtend            = _this.data('extend')                              || '';




      if(ID == '') {
        var ID = 'rand_'+$.SOW.helper.randomStr(3);
        _this.attr('id', ID);
      }





      // Default Config
      var _defaults = {

          placeholder:    placeholder,
          // height:      500,
          minHeight:      minHeight,                              // set minimum height of editor
          maxHeight:      maxHeight,                              // set maximum height of editor
          focus:          (focus+'' == 'true') ? true : false,    // set focus to editable area after initializin
          lang:           (lang != '') ? lang : 'en-US',          // default: 'en-US'



          // bootstrap 4 popover fix
          popover: {

            // image: [], link: [], air: []

            image: [
              ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
              ['float', ['floatLeft', 'floatRight', 'floatNone']],
              ['remove', ['removeMedia']]
            ],
            link: [
              ['link', ['linkDialogShow', 'unlink']]
            ],
            table: [
              ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
              ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
            ],
            air: [
              ['color', ['color']],
              ['font', ['bold', 'underline', 'clear']],
              ['para', ['ul', 'paragraph']],
              ['table', ['table']],
              ['insert', ['link', 'picture']]
            ]

          },



          callbacks: {

            onImageUpload: (ajaxURL != '') ? function(files, editor, welEditable) {

              for(var i = files.length - 1; i >= 0; i--) {
                $.SOW.vendor.summernoteeditor.ajaxUpload(ajaxURL, files[i], this, ajaxParams);
              }

            } : null

          },

      };







      // Toolbar
      if( typeof toolbar === 'object' && toolbar.length )
        _defaults.toolbar = toolbar;

      // Style Tags
      if( typeof toolbarStyleTags === 'object' && toolbarStyleTags.length )
        _defaults.styleTags = toolbarStyleTags;


      // -- -- --


      // Extend : HTML Config
      if( typeof summernoteConfig === 'object' )
        var _defaults = (typeof summernoteConfig === 'object') ? $.extend({}, _defaults, summernoteConfig) : _defaults;

      // Extend : Custom JS
      if( typeof window[ customExtend ] === 'object' )
        var _defaults = (typeof window[ customExtend ] === 'object') ? $.extend({}, _defaults, window[ customExtend ]) : _defaults;





      // Init!
              summernoteEditor[ID];
      return  summernoteEditor[ID] = _this.addClass('js-summernotefied').summernote( _defaults );


    },




    /**
     *
     *  @ajaxUpload
     *
     *
     **/
    ajaxUpload: function(ajaxURL, file, el, ajaxParams) {

      if(ajaxURL == '') {
        $.SOW.helper.consoleLog("Summernote: Upload URL not provided!");
        return;
      }

      var formData = new FormData();
          formData.append('file', file);
          formData.append('ajax', 'true');


      if(ajaxParams && ajaxParams != '') {

        var ajax_params_arr = $.SOW.helper.params_parse(ajaxParams);
        for (var i = 0; i < ajax_params_arr.length; ++i) {
          formData.append(ajax_params_arr[i][0], ajax_params_arr[i][1]);
        }

      }


      $.ajax({
        url:            ajaxURL,
        cache:          false,
        contentType:    false,
        processData:    false,
        data:           formData,
        type:           'POST',

        beforeSend: function() {},

        error: function (data) {

          $.SOW.helper.consoleLog(data);

          if(typeof $.SOW.core.toast === 'object') {
            $.SOW.core.toast.show('danger', '', '404 Server Error!', "center-top", 4000, true);
          } else {
            alert('404 Server Error!');
          }

        },

        success: function(imgURL) {

          $.SOW.helper.consoleLog(imgURL);
          $(el).summernote('editor.insertImage', imgURL);

        }
      });

    }

  };


})(jQuery);