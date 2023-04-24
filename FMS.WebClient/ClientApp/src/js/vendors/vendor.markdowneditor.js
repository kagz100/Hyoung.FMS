/**
 *
 *  [SOW] Markdown Editor
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependencies   -
 *  @Usage          $.SOW.vendor.markdowneditor.init('.markdown-editor');
 *
 *  @Ajax Support   YES
 *
 *  Vendor:         https://github.com/Ionaru/easy-markdown-editor
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
  var scriptInfo                  = 'Vendor Markdown Editor';
  var makrdownEditor              = [];

  $.SOW.vendor.markdowneditor = {


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

      if (typeof EasyMDE !== 'function') {

        var paths = $.SOW.helper.vendorLogicPaths('markdowneditor');
        if(paths['path_js'] == '') {
          $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
          return null;
        }

        $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

          if (typeof EasyMDE !== 'function') {
            $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
            return null;
          }

          // self reinit, external js loaded!
          $.SOW.vendor.markdowneditor.init(selector, config);
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
        $.SOW.vendor.markdowneditor.process($('.markdown-editor'));
        return $('.markdown-editor');
      }

      // 2. Has selector
      return this.collection.each(function() {
          
        $.SOW.vendor.markdowneditor.process($(this));

      });

    },



    /**
     *
     *  @process
     *
     *
     **/
    process: function(_this) {

      if(_this.hasClass('js-markdownified'))
        return;

      var ID                      = _this.attr('id')                                  || '',
          toolbar                 = _this.data('toolbar')                             || '',
          statuses                = _this.data('status')                              || '',
          ignoreSavedIfContent    = _this.data('autosaved-ignore-if-content-present') || 'false',
          lngPlaceholder          = _this.data('lng-placeholder')                     || '',
          lngPrompt               = _this.data('lng-prompt-url')                      || 'Type your URL:',
          minHeight               = _this.attr('data-min-height')                     || '500px',
          autofocus               = _this.attr('data-autofocus')                      || 'false',
          spellcheck              = _this.attr('data-spellcheck')                     || 'false',
          autosave                = _this.attr('data-autosave')                       || 'false',
          autosaveDelay           = _this.attr('data-autosave-delay')                 || 1000,
          prompt                  = _this.attr('data-prompt-urls')                    || 'true',
          contentOrig             = _this.val()                                       || '';



      if(ID == '') {
        var ID = 'rand_'+$.SOW.helper.randomStr(3);
        _this.attr('id', ID);
      }


      _this.addClass('js-markdownified');
      makrdownEditor[ID];

      makrdownEditor[ID] = new EasyMDE({
        element: document.getElementById(ID),

        // too tricky to change the icons
        // let it download - this really suck but well...
        autoDownloadFontAwesome: true,

        forceSync: true,
        autofocus: (autofocus+'' == 'true') ? true : false,
        autosave: {
          enabled:    (autosave+'' == 'true') ? true : false,
          uniqueId:   'MESaved_'+ID,
          delay:      Number(autosaveDelay),
        },
        minHeight:      minHeight,
        spellChecker:   (spellcheck+'' == 'true') ? true : false,
        showIcons:      false,
        status:         (typeof statuses === 'object') ? statuses : false, // Optional usage
        placeholder:    lngPlaceholder,
        toolbar:        (typeof toolbar === 'object') ? toolbar : ["bold", "italic", "strikethrough", "|", "heading-1", "heading-2", "heading-3", "|", "image", "link", "|", "unordered-list", "ordered-list", "quote", "|", "preview"],

        promptURLs:     (prompt+'' == 'true') ? true : false,
        promptTexts: {
          image:  lngPrompt,
          link:   lngPrompt,
        },

      });


      /*

        // working, not implemented!
        // if saved replaced with the existing content,
        // show button "load from last saved"
        var contentSaved = _this.val();
        if(contentSaved != '') {

          jQuery('.restoreSaved').on('click', function() {
            makrdownEditor[ID].value(contentSaved);
            _this.val(contentSaved);
          });

        }

      */

      // content not empty, do not use saved content!
      if(contentOrig.length > 0 && ignoreSavedIfContent+'' == 'true') {
        makrdownEditor[ID].value(contentOrig);
        _this.val(contentOrig);
      }

    },

  };


})(jQuery);