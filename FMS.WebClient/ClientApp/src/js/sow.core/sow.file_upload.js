/**
 *
 *  [SOW] Form Advanced
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.file_upload.init('input[type="file"].custom-file-input, input[type="file"].form-control');
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
  var scriptInfo              = 'SOW File Upload';
  window.fileInventory        = {};
  window.filesLastBulk        = [];
  window.filesSizeBulk        = 0;
  window.browser_hasIssues    = false;        // example: safari do not allow input file cloning. So we mark it as having issues


  $.SOW.core.file_upload = {


    /**
     *
     *  @config
     *
     *
     **/
    config: {

      // toast messages
      toast_pos:                              'bottom-center',
      toast_delay:                            2000,

      browsers_with_issues:                   ['safari'],     // browsers with issues (are treated different by file input)

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


      // Mark browser with issues (eample: safari do not allow cloning input file)
      var browser_vendor  = $.SOW.helper.get_browser();
      if(this.config.browsers_with_issues.indexOf(browser_vendor) !== -1)
        window.browser_hasIssues = true;


      // 1. Has no selector
      if(!this.selector) {
        $.SOW.core.file_upload.file_upload__init('input[type="file"].custom-file-input, input[type="file"].form-control');
        return this.collection;
      }

      // 2. Has selector
      $.SOW.core.file_upload.file_upload__init(this.selector);


      // No chaining!
      return null;

    },




    /**
     *
     *  @file_upload__init
     *  File Input|Upload
     *
     *
     **/
    file_upload__init: function(_this) {

      /*

          First setup
              : unique identifier
              : empty inventory array
              : correcting human errors (like array name missing on multiple files)

      */
      jQuery(_this).each(function() {

        var _t                  = jQuery(this),
            is_multiple         = _t.attr('multiple')                       || false,
            input_name          = _t.attr('name')                           || '',
            preview_delete      = _t.data('file-ajax-delete-enable')        || false,
            preview_reorder     = _t.data('file-ajax-reorder-enable')       || false,
            fileInputIdentifier = $.SOW.helper.randomStr(4, 'N');


        // add unique identifier for each file input
        _t.attr('data-js-advanced-identifier', fileInputIdentifier);

        // create empty array
        window.fileInventory[fileInputIdentifier] = [];

        // name array missing on multiple input upload
        if(is_multiple !== false && input_name.indexOf('[]') === -1)
          _t.attr('name', input_name+'[]');


        // Used by preadded files
        if(preview_delete != false) {

          if(is_multiple != false)
            $.SOW.core.file_upload.file_upload__preview_delbtn_bind_multiple(_t, true);

          if(is_multiple == false)
            $.SOW.core.file_upload.file_upload__preview_delbtn_bind_single(_t, true);

        }

        if(preview_reorder != false)
          $.SOW.core.file_upload.file_upload__preview__reorder_bind(_t, true);


      });


      jQuery(_this).not('.js-advancified').addClass('js-advancified').on('change',function(e) {

          var _t                      = jQuery(this),
              fileInputIdentifier     = _t.data('js-advanced-identifier')                 || '', // static, real identifier for each file input
              is_multiple             = _t.attr('multiple')                               || false,
              file_name               = (is_multiple === false) ? _t.get(0).files[0].name.replace('C:\\fakepath\\', " ") : '',
              label_orig              = _t.next('.custom-file-label').attr('data-orig')   || '',
              exts_allowed            = _t.data('file-ext')                               || '',
              exist_error_txt         = _t.data('file-exist-err-msg')                     || 'File already exist: ',
              exts_error_txt          = _t.data('file-ext-err-msg')                       || 'Allowed: ',
              size_error_txt          = _t.data('file-size-err-item-msg')                 || 'File too large! ',
              size_error_txt_total    = _t.data('file-size-err-total-msg')                || 'Total size exceeded!',
              selected_txt            = _t.data('file-size-err-total-msg')                || 'selected', // in case preview is not used
              max_error_txt_total     = _t.data('file-size-err-max-msg')                  || 'Maximum allowed files:',
              toast_position          = _t.data('file-toast-position')                    || 'bottom-center',
              max_size_per_file       = _t.data('file-max-size-kb-per-file')              || 0,
              max_size_total          = _t.data('file-max-size-kb-total')                 || 0,
              max_files               = _t.data('file-max-total-files')                   || 0,
              btn_clear_files         = _t.data('file-btn-clear')                         || 'a.js-advanced-form-input-clone-clear',
              btn_submit_files        = _t.data('file-btn-submit')                        || 'button.js-advanced-form-input-clone-submit',
              preview_container       = _t.data('file-preview-container')                 || '',
              preview_height          = _t.data('file-preview-img-height')                || 120,
              preview_info            = _t.data('file-preview-show-info')                 || false,
              preview_info            = _t.data('file-preview-show-info')                 || false,
              preview_list_type       = _t.data('file-preview-list-type')                 || 'box',
              preview_class           = _t.data('file-preview-class')                     || '',
              preview_as_cover        = _t.data('file-preview-img-cover')                 || false,
              preview_reorder         = _t.data('file-ajax-reorder-enable')               || false,
              preview_delete          = _t.data('file-ajax-delete-enable')                || false,

              // @Ajax
              ajax_process_enable     = _t.data('file-ajax-upload-enable')                || false;   // false by default!




          // Force preview as cover for lists
          if(preview_list_type == 'list')
              preview_as_cover = true;


          // Some settings
          _t.attr('data-orig-name', jQuery(this).attr('name'));


          if(label_orig == '') {
              label_orig = _t.next('.custom-file-label').html() || 'Choose file';
              _t.next('.custom-file-label').attr('data-orig', label_orig);
          }


          if( exts_allowed ) {
              exts_allowed = exts_allowed.toLowerCase();
              exts_allowed = exts_allowed.split(",").map(function(ext) {
                  return ext.trim();
              });
          }


          // Always reset on safari and single file
          // SAFARI ISSUE: Cloning input file is not supported!
          if(window.browser_hasIssues === true || is_multiple === false) {

              window.fileInventory[fileInputIdentifier] = [];

              if(ajax_process_enable != true) {
                  jQuery('.js-file-input-item', preview_container).remove();
                  jQuery(btn_clear_files).addClass('hide');
              }

          }



          /*

              Single File : add file name

          */
          if(is_multiple === false)
              _t.next('.custom-file-label').text(file_name);
          else
              _t.next('.custom-file-label').text(_t.get(0).files.length + ' ' + selected_txt); // in case preview is not used





          /*

              2. Preview & Logics

          */
          var input_name          = _t.attr('name') || _t.data('orig-name'),
              _clone              = _t.clone(true).off(), // turn off binds from clone
              _bulkNo             = 'bulkNo_' + $.SOW.helper.randomStr(8),
              total_files         = _t.get(0).files.length,
              file_size_kb_bulk   = 0;


          // set back "Choose file" label
          if(is_multiple !== false)
              _t.next('.custom-file-label').html(label_orig);



          for (var i = 0; i < total_files; ++i) {

              var file            = _t.get(0).files[i],
                  file_ext        = file.name.substring(file.name.lastIndexOf('.')+1, file.name.length) || null,
                  file_size_kb    = $.SOW.helper.byte2kb(file.size),
                  _rand           = 'rand_' + $.SOW.helper.randomStr(3),
                  file_img        = '<div class="js-advanced-form-default-preview absolute-full d-table w-100" style="height:120px;"><div class="d-table-cell align-middle text-center"><span class="text-gray-500" style="font-size:30px">?</span></div></div>',
                  _concat         = file.name+':'+file.size+':'+fileInputIdentifier;
                  window.filesLastBulk.push(_rand); // because are already in the dom!

              if( file_ext ) file_ext = file_ext.toLowerCase();

              /*

                  Maximum files

              */
              if(max_files > 0) {

                  var total_files_current = jQuery('.js-file-input-item', preview_container).length;

                  if(parseInt(total_files_current) >= max_files) {

                      var _msg = max_error_txt_total + ' ' + max_files;

                      if(typeof $.SOW.core.toast === 'object') {
                          $.SOW.core.toast.show('danger', '', _msg, toast_position, 6000, true);
                      } else {
                          alert(_msg);
                      }

                      // delete input & images of this input
                      $.SOW.core.file_upload.file_upload__del_bulk(_t, _bulkNo, btn_clear_files, btn_submit_files, preview_container, input_name, fileInputIdentifier);
                      return;

                  }

              }



              /*

                  Maximum total upload

              */
              if(max_size_total > 0) {

                  // because window.filesSizeBulk is calculated at the end
                  var filesSizeBulk_current = file_size_kb_bulk + window.filesSizeBulk ;

                  if(parseInt(filesSizeBulk_current) > parseInt(max_size_total)) {

                      var _msg = size_error_txt_total + ' <hr>(' + max_size_total+'kb)';

                      if(typeof $.SOW.core.toast === 'object')
                          $.SOW.core.toast.show('danger', '', _msg, toast_position, 6000, true);

                      // delete input & images of this input
                      $.SOW.core.file_upload.file_upload__del_bulk(_t, _bulkNo, btn_clear_files, btn_submit_files, preview_container, input_name, fileInputIdentifier);

                      return;

                  }
              }




              // Check file size
              if(max_size_per_file > 0) {

                  if(parseInt(file_size_kb) > parseInt(max_size_per_file)) {

                      var _msg = size_error_txt + ' <hr>' + file.name +'<br>(' + file_size_kb+'kb / '+max_size_per_file+'Kb)';

                      if(typeof $.SOW.core.toast === 'object')
                          $.SOW.core.toast.show('danger', '', _msg, toast_position, 6000, true);

                      // delete input & images of this input
                      $.SOW.core.file_upload.file_upload__del_bulk(_t, _bulkNo, btn_clear_files, btn_submit_files, preview_container, input_name, fileInputIdentifier);

                      return;

                  }

              }


              // Sum the size of all files in this bulk
              // if everything is ok, will add to window.filesSizeBulk
              file_size_kb_bulk += file_size_kb;


              // check allowed extension
              if(exts_allowed != '' && exts_allowed.indexOf(file_ext) === -1) {

                  var _msg = exts_error_txt + ' ' + exts_allowed.join(', ');

                  if(typeof $.SOW.core.toast === 'object') {
                      $.SOW.core.toast.show('danger', '', _msg, toast_position, 4500, true);
                  } else {
                      alert(_msg);
                  }


                  // delete input & images of this input
                  $.SOW.core.file_upload.file_upload__del_bulk(_t, _bulkNo, btn_clear_files, btn_submit_files, preview_container, input_name, fileInputIdentifier);

                  return;

              }


              /*

                  File already exists

              */
              if(window.fileInventory[fileInputIdentifier].indexOf(_concat) !== -1) {

                  if(typeof $.SOW.core.toast === 'object')
                      $.SOW.core.toast.show('danger', '', exist_error_txt + '<br> '+file.name, toast_position, 4500, true);


                  // delete input & images of this input
                  $.SOW.core.file_upload.file_upload__del_bulk(_t, _bulkNo, btn_clear_files, btn_submit_files, preview_container, input_name, fileInputIdentifier);

                  return;

              }


              // add file to inventory
              window.fileInventory[fileInputIdentifier].push(_concat);


              // preview image
              if(preview_container != '') {

                  var _tpl = $.SOW.core.file_upload.file_upload__preview_tpl(file, file_ext, _rand, _bulkNo, preview_height, preview_info, preview_class, ajax_process_enable, preview_delete, preview_as_cover, preview_list_type, is_multiple);
                  jQuery(preview_container).append(_tpl);

                  // bind delete button
                  if(ajax_process_enable === true) {

                      if(preview_delete != false) {

                          if(is_multiple != false)
                              $.SOW.core.file_upload.file_upload__preview_delbtn_bind_multiple(_t, false);

                          if(is_multiple == false)
                              $.SOW.core.file_upload.file_upload__preview_delbtn_bind_single(_t, false);

                      }

                      if(preview_reorder === true)
                          $.SOW.core.file_upload.file_upload__preview__reorder_bind(_t, false);

                  }

                  // image preview ---------------------------------------
                  if (file_ext == "gif" || file_ext == "png" || file_ext == "jpg" || file_ext == "jpeg")
                      $.SOW.core.file_upload.file_upload__preview_img_render('#'+_rand, file, preview_as_cover, preview_list_type);

              }


          }


          // show `remove all files` button
          $.SOW.core.file_upload.file_upload__btn_clear_bind(btn_clear_files, btn_submit_files, _t, preview_container, input_name, fileInputIdentifier);



          // 1. append cloned element
          // safari DO NOT support file input cloning!
          // also not allowing hidden file inputs - so we use .viewport-out class, just in case, for future chrome/etc updates
          if(window.browser_hasIssues !== true) {

              // hard to debug with all variables. We remove them, never used as a clone!
              _clone.removeAttr('class name data-orig-name aria-describedby data-file-ajax-upload-url data-file-ajax-upload-params data-file-ajax-delete-params data-file-ajax-callback-function data-file-ajax-toast-success-txt data-file-ajax-toast-error-txt data-file-ajax-upload-enable data-file-ajax-reorder-enable data-file-ajax-reorder-url data-js-advanced-identifier data-js-file-input-clone js-advanced-identifier data-file-ext data-file-max-size-kb-per-file data-file-max-size-kb-total data-file-max-total-files data-file-ext-err-msg data-file-exist-err-msg data-file-size-err-item-msg data-file-size-err-total-msg data-file-size-err-max-msg data-file-toast-position data-file-preview-container data-file-preview-img-height data-file-preview-show-info data-file-btn-clear data-file-preview-class data-file-preview-img-cover file-preview-list-type data-file-ajax-progressbar-custom data-file-ajax-progressbar-disable');
              _clone.attr('id', _bulkNo).attr('name', input_name);

              /*

                  is_multiple !== false
                  Used with "required" attribute (single file)

              */
              if( is_multiple !== false )
                  _t.val('').removeAttr('name').attr('data-orig-name', input_name);
              // -- --

              // This container holds all clonned inputs
              if(jQuery('#js_advanced_form_identifier_'+fileInputIdentifier).length < 1) {
                  var __el = _t.next();

                  // If input is inside a <label>
                  if(_t.parents('label').length > 0)
                      __el = _t.parents('label');

                  // bootstrap custom file
                  else if(_t.parents('div.custom-file').length > 0) {
                      __el = _t.parents('div.custom-file');

                      if(_t.parents('div.input-group').length > 0)
                          __el = _t.parents('div.input-group');

                  }

                  // If input is directly inside a <form>
                  if(_t.parent('form').length > 0)
                      __el = _t;

                  __el.after('<div id="js_advanced_form_identifier_'+fileInputIdentifier+'" class="viewport-out opacity-0" style="width:50px;height:50px;"></div>');
              }

              jQuery('#js_advanced_form_identifier_'+fileInputIdentifier).append(_clone);

              window.filesLastBulk = [];
              window.filesSizeBulk += file_size_kb_bulk;

          }




          /**

              AJAX : UPLOAD

          **/
          if(ajax_process_enable === true) {

              // Block input
              _t.addClass('disabled').prop('disabled', true);
              _t.parents('.btn').addClass('disabled active');

              // Wait a little bit for the previews to show up!
              setTimeout(function() {

                  // are added back by ajax if no error
                  _t.removeClass('disabled').prop('disabled', false);
                  _t.parents('.btn').removeClass('disabled active');
                  $.SOW.core.file_upload.file_upload__ajax_upload(fileInputIdentifier, _bulkNo);

              }, 350);
          }

          // console.log(window.fileInventory);

      });

    },

        // reset to intial state
        file_upload__reset: function(_t, btn_clear_files, btn_submit_files, preview_container, input_name, fileInputIdentifier) {

            jQuery('.js-file-input-item', preview_container).remove();
            jQuery(btn_clear_files).addClass('hide');
            jQuery(btn_submit_files).addClass('hide');

            // restoring back to original
            _t.val('').attr('name', input_name).removeAttr('data-orig-name').prop('disabled', false);

            // remove the entire container holding cloned/inputs
            jQuery('#js_advanced_form_identifier_'+fileInputIdentifier).remove();

            // set back "Choose file" label
            var label_orig = _t.next('.custom-file-label').attr('data-orig') || 'Choose file';
                _t.next('.custom-file-label').html(label_orig);

            window.fileInventory[fileInputIdentifier] = [];
            window.filesLastBulk = [];

        },

        // clear input values
        file_upload__clear: function(fileInputIdentifier) {

            jQuery('input[type="file"][data-js-advanced-identifier="'+fileInputIdentifier+'"]').val('').prop('disabled', false);

        },

        file_upload__preview_tpl: function(file, file_ext, item_unique_id, _bulkNo, h, preview_info, preview_class, ajax_process_enable, preview_delete, preview_as_cover, preview_list_type, is_multiple) {



            var default_preview_height  = (h == 'auto' || h == '100%') ? h : 120,
                img_fluid               = '';


            if(typeof h !== 'number') {

                switch(preview_list_type) {

                    case 'list':        var h = 50;
                                        break;

                    // 'box'
                    default:            var h = default_preview_height;
                                        var img_fluid = 'img-fluid';

                }

            }

            // 50px min. height for `list` type
            if(preview_list_type == 'list' && h < 50)
                var h = 50;

            var __h = (typeof h !== 'number') ? '100%' : h + 'px';


            switch(preview_as_cover) {

                case true:          var item_style = 'width: '+__h+'; height: '+__h+';';
                                    break;

                // false
                default:            var item_style = 'min-width: '+__h+'; min-height: '+__h+'; width: auto; height: auto;';

            }


            var _loadingIcon        = '<i class="' + $.SOW.config.sow__icon_loading + ' fs--30"></i>';
            var _loadingIconSize    = (preview_list_type == 'list') ? 'fs--20' : 'fs--30';

            // default preview class
            if(preview_class == '')
                var preview_class = (preview_list_type == 'list') ? 'show-hover-container shadow-md mb-2 rounded' : 'show-hover-container shadow-md m-2 rounded';

            // Default : Show Loading
            var file_img = '<span class="js-advanced-form-default-preview absolute-full d-flex align-items-center justify-content-center opacity-6 '+_loadingIconSize+' '+$.SOW.config.sow__icon_loading+'"></span>';

            // bytes to size
            var human_size = $.SOW.helper.byte2size(file.size);

            // Image -or- extension
            // Default append. src = transaprent png base64
            var file_is_image = false;
            if (file_ext == "gif" || file_ext == "png" || file_ext == "jpg" || file_ext == "jpeg" || file_ext == "jpeg") {
                var file_is_image = true;
                file_img += '<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" class="hide animate-bouncein js-file-input-preview mw-100 '+img_fluid+'" height="'+h+'">';
            }

            else if (file_ext != '') {
                var file_ext_font_size = (h < 80) ? 'fs--20' : 'fs--30';
                var file_ext_font_size = (preview_list_type == 'list') ? 'fs--18' : file_ext_font_size;
                var file_img = '<span class="absolute-full d-flex align-items-center justify-content-center '+file_ext_font_size+' opacity-6 text-uppercase text-truncate">'+file_ext+'</span>';
            }

            var pos_start   = ($.SOW.globals.direction == 'ltr') ? 'left-0' : 'right-0';
            var pos_end     = ($.SOW.globals.direction == 'ltr') ? 'right-0' : 'left-0';






            // 1. LIST : START TEMPLATE
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
            if(preview_list_type == 'list') {

                var _tpl = '<div data-id="0" data-file-name="'+file.name+'" data-file-size="'+file.size+'" id="'+item_unique_id+'" class="js-file-input-item '+_bulkNo+' d-flex clearfix position-relative '+preview_class+'">';

                    // delete button
                    if(preview_delete != false) {

                        _tpl += '<a href="#" data-item-id="'+item_unique_id+'" data-id="0" data-file-name="'+file.name+'" class="js-file-item-del position-absolute absolute-top show-hover-item '+pos_end+' z-index-2">'
                                    + '<span class="d-inline-block btn btn-sm bg-danger text-white" style="padding:4px 10px;margin:1px;">'
                                        + '<i class="'+$.SOW.config.sow__icon_close+' m-0"></i>'
                                    + '</span>'
                                + '</a>';

                    }

                        // image | file                                                         required min-* because of flex...
                        _tpl += '<div class="position-relative d-inline-block bg-cover" style="width:'+h+'px; min-width:'+h+'px; height:'+h+'px">' + file_img + '</div>';

                        _tpl += '<div class="flex-fill d-flex min-w-0 align-items-center" style="padding-left:15px;padding-right:15px;">';

                            // file name
                            _tpl += '<span class="text-truncate d-block line-height-1">' + file.name;

                                // file size
                                if(preview_info != false)
                                    _tpl += '<br><span style="font-size:12px;" class="d-block pt-1">'+human_size+'</span>';

                            _tpl += '</span>';

                        _tpl += '</div>';

                    // ajax loading
                    if(ajax_process_enable === true) {
                        _tpl += '<span class="hide hide-force js-file-input-preview-ajax-uploading absolute-full d-flex align-items-center justify-content-center overlay-light overlay-opacity-8 z-index-2" style="padding-left:15px;padding-right:15px;">'
                                + _loadingIcon
                             + '</span>';
                    }


                _tpl += '</div>';

                return _tpl;

            }
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --







            // 2. BOX : START TEMPLATE
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
            var _tpl = '<span data-id="0" data-file-name="'+file.name+'" data-file-size="'+file.size+'" id="'+item_unique_id+'" class="js-file-input-item '+_bulkNo+' d-inline-block position-relative overflow-hidden text-center '+preview_class+'" style="'+item_style+'">';

            _tpl += (preview_as_cover !== false) ? '' : file_img;
            // _tpl += '<span class="overlay-dark overlay-opacity-1 absolute-full"></span>'


            // header (file name) to non-image files!
            if(file_is_image === false || preview_info != false) {

                _tpl += '<span class="js-file-input-preview-header text-white position-absolute w-100 top-0 left-0 right-0 clearfix overlay-dark overlay-opacity-2">'
                        + '<span class="text-truncate d-block" style="font-size:12px;padding-left:5px;padding-right:5px;">' + file.name + '</span>'
                     + '</span>';
            }

            // footer
            if(preview_info != false) {

                // file will be populated (or not) by reader (reason: async)
                _tpl += '<span class="js-file-input-preview-footer text-white position-absolute w-100 bottom-0 left-0 right-0 clearfix overlay-dark overlay-opacity-2">'
                            + '<span class="js-file-input-file-info-size text-truncate d-block" style="font-size:12px;padding-left:5px;padding-right:5px;">'+human_size+'</span>'
                      + '</span>';

            }

            // ajax only
            if(ajax_process_enable === true) {

                // delete button
                if(preview_delete != false && is_multiple != false) {

                    _tpl += '<a href="#" data-item-id="'+item_unique_id+'" data-id="0" data-file-name="'+file.name+'" class="js-file-item-del position-absolute absolute-top show-hover-item '+pos_start+' z-index-2">'
                                + '<span class="d-inline-block btn btn-sm bg-danger text-white" style="font-size:12px;padding:4px 8px;margin:1px;">'
                                    + '<i class="'+$.SOW.config.sow__icon_close+' m-0"></i>'
                                + '</span>'
                            + '</a>';
                }

                // ajax loading
                _tpl += '<span class="hide hide-force js-file-input-preview-ajax-uploading absolute-full d-flex align-items-center justify-content-center overlay-light overlay-opacity-8 z-index-3">'
                        +_loadingIcon
                     + '</span>';

            }


            _tpl += '</span>';

            return _tpl;
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


        },

        file_upload__preview_img_render: function(id, file, preview_as_cover, preview_list_type) {

            var reader = new FileReader();
            reader.onload = function(s) {

                jQuery(id + ' .js-advanced-form-default-preview').remove();

                if(preview_as_cover !== false) {

                    var __id = (preview_list_type == 'list') ? id + '>.bg-cover' : id;
                    jQuery(__id).css("background-image", "url(" + s.target.result + ")").addClass('bg-cover').removeClass('hide');

                } else {

                    jQuery(id + ' img.js-file-input-preview').attr('src', s.target.result).removeClass('hide');

                }

            }

            reader.readAsDataURL(file);

        },

        // delete last bulk added (multiple file only)
        file_upload__del_bulk: function(_t, _bulkNo, btn_clear_files, btn_submit_files, preview_container, input_name, fileInputIdentifier) {

            // clear last added!
            for (var b = 0; b < window.filesLastBulk.length; ++b) {

                // remove last bulk added only
                jQuery('#'+_bulkNo).remove(); // file input
                jQuery('.'+_bulkNo).remove(); // images

                // check if other files are there. if not, reset
                var _remains = jQuery('.js-file-input-item', preview_container).length;
                if(_remains < 1)
                    $.SOW.core.file_upload.file_upload__reset(_t, btn_clear_files, btn_submit_files, preview_container, input_name, fileInputIdentifier);

            }

            // reset
            $.SOW.core.file_upload.file_upload__clear(fileInputIdentifier);
            window.fileInventory[fileInputIdentifier] = [];

        },

        file_upload__preview_delbtn_bind_multiple: function(_t, request_from_preadded) {

            var fileInputIdentifier = _t.attr('data-js-advanced-identifier')    || '',
                preview_container   = _t.attr('data-file-preview-container')    || '',
                preview_delete      = _t.attr('data-file-ajax-delete-enable')   || false,
                ajax_url            = _t.attr('data-file-ajax-delete-url')      || _t.attr('data-file-ajax-upload-url'),
                ajax_params         = _t.attr('data-file-ajax-delete-params')   || '',
                delToastTxt         = _t.attr('data-file-ajax-delete-toast-txt')        || 'Successfully Deleted!',
                delToastPos         = _t.attr('data-file-ajax-delete-toast-position')   || $.SOW.core.file_upload.config.toast_pos,
                is_multiple         = _t.attr('multiple')                       || false,
                preview_height      = _t.attr('data-file-preview-img-height')   || '120';

            if(preview_container == '' || is_multiple == false)
                return;

            else if(ajax_url == '' || preview_delete == false) {

                // remove delete button
                jQuery(preview_container + ' a.js-file-item-del').remove();

                return;
            }

            // --


            // Setting up preadded files
            if(request_from_preadded === true) {
                jQuery(preview_container + ' .js-file-input-item').each(function() {

                    var elItemPreadded      = jQuery(this),
                        _preaddedItemId     = 'rand_' + $.SOW.helper.randomStr(3);

                    elItemPreadded.attr('id', _preaddedItemId);

                    jQuery('img', elItemPreadded).attr('height', preview_height);
                    jQuery('a.js-file-item-del', elItemPreadded).attr('data-item-id', _preaddedItemId);         // DOM item id

                });
            }

            var btn_file_del = preview_container + ' a.js-file-item-del';
            $.SOW.core.file_upload.file_upload__preview_item_del_ajax(fileInputIdentifier, btn_file_del, ajax_params, ajax_url, delToastTxt, delToastPos);

        },

        file_upload__preview_delbtn_bind_single: function(_t, request_from_preadded) {

            var fileInputIdentifier = _t.attr('data-js-advanced-identifier')    || '',
                preview_container   = _t.attr('data-file-preview-container')    || '',
                preview_delete      = _t.attr('data-file-ajax-delete-enable')   || false,
                ajax_url            = _t.attr('data-file-ajax-delete-url')      || _t.attr('data-file-ajax-upload-url'),
                ajax_params         = _t.attr('data-file-ajax-delete-params')   || '',
                delToastTxt         = _t.attr('data-file-ajax-delete-toast-txt')        || 'Successfully Deleted!',
                delToastPos         = _t.attr('data-file-ajax-delete-toast-position')   || $.SOW.core.file_upload.config.toast_pos,
                btn_clear           = _t.attr('data-file-btn-clear')            || '',
                btn_submit          = _t.attr('data-file-btn-submit')           || '',
                is_multiple         = _t.attr('multiple')                       || false;

            if(is_multiple != false || btn_clear == '' || ajax_url == '' || preview_delete == false)
                return;

            // We use the same button as "delete" button normally added by the template
            jQuery(btn_clear).addClass('js-file-item-del');

            // Setting up
            var elItemPreadded      = jQuery(preview_container + ' .js-file-input-item'),
                _preaddedFileName   = elItemPreadded.attr('data-file-name')     || '',
                _preaddedItemId     = elItemPreadded.attr('id')                 || '';

            if(elItemPreadded.length < 1)
                return;

            // Disable input
            _t.prop('disabled', true);

            if(_preaddedItemId == '') {
                _preaddedItemId = 'rand_' + $.SOW.helper.randomStr(3);
                elItemPreadded.attr('id', _preaddedItemId);
            }

            jQuery(btn_clear).attr('data-item-id', _preaddedItemId);        // DOM item id

            $.SOW.core.file_upload.file_upload__preview_item_del_ajax(fileInputIdentifier, btn_clear, ajax_params, ajax_url, delToastTxt, delToastPos);

            // REQUIRED: AFTER file_upload__preview_item_del_ajax()
            if(request_from_preadded === true) {
                var input_name  = _t.attr('name') || _t.data('orig-name');
                $.SOW.core.file_upload.file_upload__btn_clear_bind(btn_clear, btn_submit, _t, preview_container, input_name, fileInputIdentifier);
            }

        },

        file_upload__preview_item_del_ajax: function(fileInputIdentifier, btn_file_del, ajax_params, ajax_url, delToastTxt, delToastPos) {

            jQuery(btn_file_del).not('.js-advancified').addClass('js-advancified').on('click', function(e) {
                e.preventDefault();

                var elBtn       = jQuery(this),
                    item_id     = elBtn.attr('data-item-id')                    || '';

                if(item_id == '') // required
                    return;

                var elItem      = $('#'+item_id),
                    fileName    = elItem.attr('data-file-name')                 || '',
                    fileSize    = elItem.attr('data-file-size')                 || 0,
                    fileID      = elItem.attr('data-id')                        || 0;

                if(fileName == '' && item_id == '') {
                    $.SOW.helper.consoleLog('Delete request not sent!');
                    $.SOW.helper.consoleLog('Please provide: data-id  -OR-  data-file-name ');
                    return;
                }


                /*

                    Form & custom params

                */
                var formDataDel = new FormData();
                formDataDel.append('action', 'delete_file');
                formDataDel.append('ajax', 'true');

                var ajax_params_arr = $.SOW.helper.params_parse(ajax_params);
                for (var i = 0; i < ajax_params_arr.length; ++i) {
                    formDataDel.append(ajax_params_arr[i][0], ajax_params_arr[i][1]);
                }

                // Add required params to form
                formDataDel.append('file_name', fileName);
                formDataDel.append('file_id', fileID);
                formDataDel.append('__info', '`file_id` = internal/database file id. 0 = not provided!');

                // --

                $.ajax({
                    url:            ajax_url,
                    cache:          false,
                    contentType:    false,
                    processData:    false,
                    data:           formDataDel,
                    type:           'POST',
                    headers:        '',
                    crossDomain:    '',

                    beforeSend: function() {


                    },

                    success: function (data) {

                        window.ddimgCache = ''; // dropdown ajax image
                        $.SOW.helper.consoleLog(data);

                        // remove file from the list
                        if(item_id != '')
                            jQuery('#'+item_id).remove();



                        // remove from inventory, or the file could not be added again
                        if(fileSize != '') {

                            var _concat = fileName+':'+fileSize+':'+fileInputIdentifier;
                            for (var inventoryIndex in window.fileInventory[fileInputIdentifier]) {
                                if(window.fileInventory[fileInputIdentifier][inventoryIndex] == _concat) {
                                    window.fileInventory[fileInputIdentifier].splice(inventoryIndex,1);
                                    break;
                                }
                            } // --

                        }

                        // delete success toast
                        if(typeof $.SOW.core.toast === 'object' && delToastTxt != '')
                            $.SOW.core.toast.show('success', '', delToastTxt, delToastPos, $.SOW.core.file_upload.config.toast_delay, true);

                    },

                    error: function (data) {

                        $.SOW.helper.consoleLog(data);

                        if(typeof $.SOW.core.toast === 'object') {
                            $.SOW.core.toast.show('danger', '', '404 Server Error!', $.SOW.core.file_upload.config.toast_pos, $.SOW.core.file_upload.config.toast_delay, true);
                        } else {
                            alert('404 Server Error!');
                        }

                    },

                });

            });

        },

        file_upload__preview__reorder_bind: function(_t, request_from_preadded) {

            var sortableProcessDelay = 0;

            if(typeof $.SOW.vendor.sortable !== 'object') {

                $.SOW.helper.consoleLog('Ajax Image Reorder : Require Sortablejs Vendor!');
                return;

            } else {

                // sortable is external?
                if (typeof Sortable !== 'function') {

                    var sortableProcessDelay = 1300;

                    if($.SOW.config.autoinit['sortable']) {
                        var _selector   = $.SOW.config.autoinit['sortable'][1];
                        var _config     = $.SOW.config.autoinit['sortable'][2];
                        var _class      = _selector.replace('.', '');
                        jQuery('#middle').append('<span class="hide '+_class+'"></span>');
                        $.SOW.vendor.sortable.init(_selector, _config);
                    } else { return false; }
                }

            }


            var fileInputIdentifier     = _t.attr('data-js-advanced-identifier')            || '',
                fileInputName           = _t.attr('name')                                   || _t.attr('data-orig-name'),
                preview_container       = _t.attr('data-file-preview-container')            || '',
                ajax_url                = _t.attr('data-file-ajax-reorder-url')             || _t.attr('data-file-ajax-upload-url'),
                ajax_params             = _t.attr('data-file-ajax-reorder-params')          || '',
                reorder_toast_success   = _t.attr('data-file-ajax-reorder-toast-success')   || '',
                reorder_toast_position  = _t.attr('data-file-ajax-reorder-toast-position')  || '',
                preview_reorder         = _t.attr('data-file-ajax-reorder-enable')          || false;

            if(preview_container == '')
                return;

            else if(ajax_url == '' || preview_reorder == false) {

                // remove draggable attribute
                jQuery(preview_container + ' .js-file-input-item').removeAttr('draggable');

                return;

            }

            // --

            // add .js-ignore filter for all other items that are not files (texts, titles, etc)
            jQuery('>:not(.js-file-input-item)', preview_container).addClass('js-ignore');

            // Add Sortable required params
            jQuery(preview_container).attr('data-ajax-update-url', ajax_url);
            jQuery(preview_container).attr('data-ajax-update-params', ajax_params);
            jQuery(preview_container).attr('data-ajax-update-identifier', fileInputName.replace('[]', ''));

            if(reorder_toast_success != '')
                jQuery(preview_container).attr('data-update-toast-success', reorder_toast_success);

            if(reorder_toast_position != '')
                jQuery(preview_container).attr('data-update-toast-position', reorder_toast_position);

            setTimeout(function() {
                $.SOW.vendor.sortable.process($(preview_container));
            }, sortableProcessDelay);

        },

        file_upload__btn_clear_bind: function(btn_clear_files, btn_submit_files, _t, preview_container, input_name, fileInputIdentifier) {

            // show `remove all files` button
            jQuery(btn_clear_files).removeClass('hide').on('click', function(e) {
                e.preventDefault();

                // added by file_upload__preview_delbtn_bind_single()
                jQuery(this).removeAttr('data-item-id data-id data-file-name');

                $.SOW.core.file_upload.file_upload__reset(_t, btn_clear_files, btn_submit_files, preview_container, input_name, fileInputIdentifier);
            });

            // submit button
            jQuery(btn_submit_files).removeClass('hide');

        },

        file_upload__ajax_upload: function(fileInputIdentifier, _bulkNo) {


            if(_bulkNo == '' && fileInputIdentifier == '') {
                $.SOW.helper.consoleLog('Ajax Image Upload Status : Identifiers missing!');
                return;
            }


            // Getting Data
            var fileInventory       = [],
                elFileInput         = jQuery('input[type="file"][data-js-advanced-identifier="'+fileInputIdentifier+'"]'),
                ajax_url            = elFileInput.data('file-ajax-upload-url')              || '',
                ajax_params         = elFileInput.data('file-ajax-upload-params')           || '',
                msg_success         = elFileInput.data('file-ajax-toast-success-txt')       || '',
                msg_error           = elFileInput.data('file-ajax-toast-error-txt')         || '',
                btn_remove          = elFileInput.data('file-btn-clear')                    || '',
                form_name           = elFileInput.attr('name')                              || elFileInput.data('orig-name'),
                ajax_callback       = elFileInput.data('file-ajax-callback-function')       || '',
                is_multiple         = elFileInput.attr('multiple')                          || false,
                preview_container   = elFileInput.data('file-preview-container')            || '',
                preview_reorder     = elFileInput.data('file-ajax-reorder-enable')          || false,
                progressDisabled    = elFileInput.data('file-ajax-progressbar-disable')     || false,
                toast_position      = elFileInput.data('file-toast-position')               || $.SOW.core.file_upload.config.toast_pos;


            // search for from as parent, if exists
            if(ajax_url == '') {

                if(elFileInput.parents('form').length > 0)
                    ajax_url = elFileInput.parents('form').attr('action');

            }

            // still empty?
            if(ajax_url == '') {
                $.SOW.helper.consoleLog('Ajax Image Upload Status : [data-file-ajax-upload-url] : Missing -or- Empty!');
                return;
            }











            /*

                1. Bulk only

            */
            if(_bulkNo != '') {

                if(window.browser_hasIssues === true) {
                    var _t = jQuery('input[type="file"][data-js-advanced-identifier="'+fileInputIdentifier+'"]');
                } else {
                    var _t = jQuery('input[type="file"]#'+_bulkNo);
                }


                for (var i = 0; i < _t.get(0).files.length; ++i) {
                    fileInventory.push(_t.get(0).files[i]);
                }


            /*

                2. All bulks at once (for safari or other browsers with issue)

            */
            } else {

                if(window.browser_hasIssues === true) {
                    var _t = jQuery('input[type="file"][data-js-advanced-identifier="'+fileInputIdentifier+'"]');
                } else {
                    var _t = jQuery('#js_advanced_form_identifier_'+fileInputIdentifier+'>input[type="file"]');
                }


                _t.each(function() {

                    var files   = jQuery(this).get(0).files;

                    for (var i = 0; i < files.length; ++i) {
                        fileInventory.push(files[i]);
                    }

                });

            }







            // Safe Check
            if(fileInventory.length < 1) {
                $.SOW.helper.consoleLog('Ajax Image Upload Status : No file found to upload!');
                return;
            }




            // Create form
            var formData = new FormData();
            // -- -- -- --





            // Add custom params to post +++++++++++++++++++++++++++++++++++++++
            var ajax_params_arr = $.SOW.helper.params_parse(ajax_params);
            for (var i = 0; i < ajax_params_arr.length; ++i) {
                formData.append(ajax_params_arr[i][0], ajax_params_arr[i][1]);
            }

            // Of course, our eternal param :)
            formData.append('ajax', 'true');
            // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++





            // add files to form +++++++++++++++++++++++++++++++++++++++++++++++
            for (var i = 0; i < fileInventory.length; ++i) {
                formData.append(form_name, fileInventory[i]);
            }
            // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++





            $.ajax({
                url:            ajax_url,
                cache:          false,
                contentType:    false,
                processData:    false,
                data:           formData,
                type:           'POST',
                enctype:        'multipart/form-data',
                headers:        '',
                crossDomain:    '',

                beforeSend: function() {

                    jQuery('.js-file-input-item.'+_bulkNo+' .js-file-input-preview-ajax-uploading').removeClass('hide hide-force');
                    // jQuery(btn_remove).addClass('hide hide-force'); // button "remove files"

                    elFileInput.addClass('disabled').prop('disabled', true);
                    elFileInput.parents('.btn').addClass('disabled active');
                    elFileInput.parent().find('.js-file-input-ajax-loader').removeClass('hide hide-force');

                    // Create progress bar
                    $.SOW.core.file_upload.file_upload__ajax_upload_progressbar_init(elFileInput);

                },

                success: function (data) {

                    window.ddimgCache = ''; // dropdown ajax image

                    $.SOW.helper.consoleLog(data);
                    elFileInput.removeClass('disabled').prop('disabled', false);
                    elFileInput.parents('.btn').removeClass('disabled active');
                    elFileInput.parent().find('.js-file-input-ajax-loader').addClass('hide hide-force');

                    jQuery('.js-file-input-item.'+_bulkNo+' .js-file-input-preview-ajax-uploading i').replaceWith('<i class="'+$.SOW.config.sow__icon_check+' text-success d-inline-block text-center bg-success-soft rounded-circle opacity-8 animate-bouncein" style="font-size:20px;padding-top:5px;width:40px;height:40px;"></i>');
                    setTimeout(function() {

                        jQuery('.js-file-input-item.'+_bulkNo+' .js-file-input-preview-ajax-uploading').fadeOut(200, function() {
                            jQuery(this).remove();
                        });

                    }, $.SOW.core.file_upload.config.toast_delay);


                    if(typeof $.SOW.core.toast === 'object' && msg_success != '')
                        $.SOW.core.toast.show('success', '', msg_success, toast_position, $.SOW.core.file_upload.config.toast_delay, true);


                    // callback function
                    if(ajax_callback != '' && typeof $.SOW.helper.executeFunctionByName === "function")
                        $.SOW.helper.executeFunctionByName(ajax_callback, window, data, elFileInput); // input element is returned because of safari issues (bulk is empty)

                    // Destroy progress bar
                    $.SOW.core.file_upload.file_upload__ajax_upload_progressbar_destroy(elFileInput, false);


                    // Disable input
                    if(is_multiple === false)
                        elFileInput.prop('disabled', true);

                    /**

                        UPDATE FOR REORDER
                        If backend provided required data (internal id)

                        data-id="0"
                        data-file-name="file.jpg"


                        PHP Example
                        Server response format:

                            $response = array(
                                'file_list' => array(

                                    // original file name       internal id
                                    'orig_file_name_1.jpg'      => 1,
                                    'orig_file_name_2.jpg'      => 345,

                                    // ...

                                ),

                                // more stuff for callback (if used)
                                'something_else'    => array(),
                            );

                            echo json_encode($response);
                            exit;

                    **/
                    // if(preview_reorder != false) {

                        /* test */ // var data = {"file_list":{"orig_file_name_1.jpg":1,"orig_file_name_2.jpg":345},"something_else":[]}
                        try {

                            var _json = JSON.parse(data);

                        } catch(err) {

                            // No json, we do nothing!
                            var _json = '';

                        }

                        if(_json != '') {

                            if(typeof _json['file_list'] !== 'undefined') {

                                for (var fileName in _json['file_list']) {

                                    jQuery(preview_container + ' .js-file-input-item[data-file-name="'+fileName+'"]').attr('data-id', _json['file_list'][fileName]);

                                }

                            }

                            // Bind reorder
                            $.SOW.core.file_upload.file_upload__preview__reorder_bind(jQuery(preview_container), true);

                        }

                    // } // end preview reorder

                },

                error: function (data) {

                    $.SOW.helper.consoleLog(data);

                    elFileInput.removeClass('disabled').prop('disabled', false);
                    elFileInput.parents('.btn').removeClass('disabled active');
                    elFileInput.parent().find('.js-file-input-ajax-loader').addClass('hide hide-force');

                    jQuery('.js-file-input-item.'+_bulkNo+' .js-file-input-preview-ajax-uploading i').replaceWith('<i title="Ajax upload error!" class="'+$.SOW.config.sow__icon_close+' text-success d-inline-block text-center bg-danger-soft rounded-circle opacity-8 animate-bouncein" style="font-size:20px;padding-top:5px;width:40px;height:40px;"></i>');
                    if(typeof $.SOW.core.toast === 'object' && msg_error != '')
                        $.SOW.core.toast.show('danger', '', msg_error, toast_position, $.SOW.core.file_upload.config.toast_delay, true);

                    // Destroy progress bar
                    $.SOW.core.file_upload.file_upload__ajax_upload_progressbar_destroy(elFileInput, false);

                },

                // progress bar
                xhr: function() {

                    var __xhr = new XMLHttpRequest();

                    __xhr.upload.addEventListener("progress", function(e) {

                        if(e.lengthComputable && progressDisabled == false) {

                            var ___percent  = e.loaded / e.total,
                                ___percent  = Math.round(___percent * 100);     // (___percent * 100);  -or-  Math.round(___percent * 100);

                            $('.js_file_input_progress__'+fileInputIdentifier + ' .js-file-input-upload-percent').text(___percent+'%');
                            $('.js_file_input_progress__'+fileInputIdentifier + ' .progress-bar').css('width', ___percent+'%');
                            $('.js_file_input_progress__'+fileInputIdentifier + ' .progress-bar').attr('aria-valuenow', ___percent);

                            if(___percent >= 100) {

                                // we add "ok" icon only to the dynamic progress created by this script, not to custom
                                $('.js_file_input_progress__'+fileInputIdentifier + ' .js-file-input-upload-percent.js-file-input-upload-percent-dynamic').prepend('<i class="'+$.SOW.config.sow__icon_check+' animate-bouncein" style="font-size:10px"></i> &nbsp; ');

                                // we add some common classes as helpers to custom progress, in case needed as extra!
                                $('.js_file_input_progress__'+fileInputIdentifier + ', .js_file_input_progress__'+fileInputIdentifier + ' .js-file-input-upload-percent:not(.js-file-input-upload-percent-dynamic) .group-icon').addClass('active');

                            }

                        }

                    }, false);

                    return __xhr;

                }


            });

        },

        file_upload__ajax_upload_progressbar_init: function(elFileInput) {

            if(elFileInput.length < 1)
                return;

            var fileInputIdentifier = elFileInput.data('js-advanced-identifier')            || '',
                customProgress      = elFileInput.data('file-ajax-progressbar-custom')      || '',
                progressDisabled    = elFileInput.data('file-ajax-progressbar-disable')     || false,
                __next              = elFileInput.next();

            if(fileInputIdentifier == '' || progressDisabled != false)
                return;







            // ++ ++ ++ ++ ++ ++ ++ Check custom progress ++ ++ ++ ++ ++ ++
            if(jQuery(customProgress).length > 0) {

                var elCustomProgress = jQuery(customProgress);

                // usually first init, should have the class in place each call (new upload)
                if(!elCustomProgress.hasClass('js_file_input_progress__' + fileInputIdentifier))
                    elCustomProgress.addClass('js_file_input_progress__' + fileInputIdentifier);


                // Reset progress. If previously used should be at 100% now
                jQuery('.progress-bar', elCustomProgress).css('width', '0%');
                jQuery('.progress-bar', elCustomProgress).css('width', '0%');
                jQuery('.js-file-input-upload-percent', elCustomProgress).text('0%');
                elCustomProgress.removeClass('hide hide-force');


                // Done! Ajax function will do the update!
                return;

            }
            // ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++







            // ++ ++ ++ ++ ++ Finding a place for progress bar ++ ++ ++ ++ ++
            // If input is inside a <label>
            if(elFileInput.parents('label').length > 0)
                __next = elFileInput.parents('label');

            // bootstrap custom file
            else if(elFileInput.parents('div.custom-file').length > 0)
                __next = elFileInput.parents('div.custom-file');
            // ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++



            // Remove first, in case already exists!
            jQuery('.js_file_input_progress__'+fileInputIdentifier).remove();



            // PROGRESS TEMPLATE ++++++++++++
            var _tpl = '<span class="js_file_input_progress__'+fileInputIdentifier+' animate-bouncein transition-all-ease-500 position-absolute w-100 bottom-0 left-0 right-0" style="margin-bottom:-5px;heitgh:3px;">'
                            + '<span class="progress rounded" style="height:3px">'
                                + '<span class="progress-bar bg-success" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></span>'
                            + '</span>'
                            + '<i class="js-file-input-upload-percent js-file-input-upload-percent-dynamic float-start z-index-2 text-dark" style="font-size:11px; margin-bottom:-20px;">0%</i>'
                        + '</span>';
            // ++++++++++++++++++++++++++++++
            __next.append(_tpl);    // Append inside, absolute position used!
            // ++++++++++++++++++++++++++++++


            // Done! Ajax function will do the update!

        },

        file_upload__ajax_upload_progressbar_destroy: function(elFileInput, elDestroyForReal) {


            if(elFileInput.length < 1)
                return;

            var fileInputIdentifier = elFileInput.data('js-advanced-identifier') || '';

            if(fileInputIdentifier == '')
                return;



            // Wait a little bit, sometimes the upload is too fast for small files
            // and we want to impress the visitor with our shiny progress bar pointing to 100% DONE!
            // Whooo!
            setTimeout(function() {

                jQuery('.js_file_input_progress__'+fileInputIdentifier).not('.js-ignore').fadeOut(800, function() {


                    /*

                        Should be removed only dynamic progress bars
                        Custom ones should only be hidden, if .js-ignore not present, of course!

                    */
                    if(elDestroyForReal === true)
                        jQuery(this).remove();

                });

            }, 1000);

        },

        file_upload__destroy: function(container) {
            var container = (typeof container === 'undefined') ? '' : container;

            jQuery(container + ' ' + $.SOW.core.file_upload.config.selector_advanced_file).each(function() {

                var _t          = jQuery(this),
                    input_name  = _t.attr('name') || _t.data('orig-name');

                // remove class
                _t.removeClass('js-advancified');

                // destroy any progress bar
                $.SOW.core.file_upload.file_upload__ajax_upload_progressbar_destroy(_t, true);

                // restoring back to original
                _t.val('').attr('name', input_name).removeAttr('data-orig-name');

                // set back "Choose file" label
                var label_orig = _t.next('.custom-file-label').attr('data-orig') || 'Choose file';
                _t.next('.custom-file-label').html(label_orig);

                // replace with a clone!
                var _cl = _t.clone().off('change');
                _t.replaceWith(_cl);

                jQuery('div>.js-file-input-item:first-child').parent().empty();

            });

            window.fileInventory        = {};
            window.filesLastBulk        = [];
            window.filesSizeBulk        = 0;

        }

  }

})(jQuery);
