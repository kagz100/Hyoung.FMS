/**
 *
 *  [SOW] Form Advanced
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.form_advanced.init();
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
  var scriptInfo              = 'SOW Form Advanced';


  $.SOW.core.form_advanced = {


    /**
     *
     *  @config
     *
     *
     **/
    config: {

      /* 

          1. Bulk
          @form_advanced_bulk

      */
      selector_advanced_bulk:             "a.js-form-advanced-bulk",
      advanced_bulk_selected_require:     false,

      // toast messages
      toast_pos:                          'bottom-center',
      toast_delay:                        2000,
      toast_msg_noitems:                  'No Items Selected!',



      /* 

          2. Form input numeric limit
          @form_advanced_numeric_limit

      */
      selector_advanced_numeric_limit:        "input.js-form-advanced-limit",




      /* 

          3. Form char count
          @form_advanced_char_count_down

      */
      selector_advanced_char_count_down:      "input.js-form-advanced-char-count-down, textarea.js-form-advanced-char-count-down",
      selector_advanced_char_count_up:        "input.js-form-advanced-char-count-up, textarea.js-form-advanced-char-count-up",
      selector_advanced_type_toggle:          ".btn-password-type-toggle",

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


      // 1. Bulk
      $.SOW.core.form_advanced.form_advanced_bulk(this.config.selector_advanced_bulk);
      
      // 2. Form input numeric limit
      $.SOW.core.form_advanced.form_advanced_numeric_limit(this.config.selector_advanced_numeric_limit);

      // 3. Form char count down
      $.SOW.core.form_advanced.form_advanced_char_count_down(this.config.selector_advanced_char_count_down);

      // 4. Form char count up
      $.SOW.core.form_advanced.form_advanced_char_count_up(this.config.selector_advanced_char_count_up);
      
      // 5. Form password toggle
      $.SOW.core.form_advanced.form_advanced_type_toggle(this.config.selector_advanced_type_toggle);

      // 6. Misc
      $.SOW.core.form_advanced.formAdvancedTableVariants(); // keep it first
      $.SOW.core.form_advanced.formatCreditCard();
      $.SOW.core.form_advanced.formAdvancedList();
      $.SOW.core.form_advanced.formAdvancedReset();
      $.SOW.core.form_advanced.formAdvancedRequired();


      // No chaining
      return null;

    },



    /**
     *
     *  @form_advanced_bulk
        Form actions[submit] using a regular link
     *
     *  
     *
     **/
    form_advanced_bulk: function(_this) {

      // -- * --
      if(jQuery(_this).length > 0)
          $.SOW.helper.consoleLog('Init : ' + scriptInfo);
      // -- * --

      jQuery(_this).not('.js-form-advancified').addClass('js-form-advancified').on('click', function(e) {
        e.preventDefault();

        var _t                          = jQuery(this),
            
            _citems                     = _t.data('js-form-advanced-bulk-container-items')                      || 'table tbody',       // from what container to count checked items?
            _reqSelectedItems           = _t.data('js-form-advanced-bulk-required-selected')                    || $.SOW.core.form_advanced.config.advanced_bulk_selected_require,
            _requiredMsg                = _t.data('js-form-advanced-bulk-required-txt-error')                   || $.SOW.core.form_advanced.config.toast_msg_noitems,
            _requiredMsgPos             = _t.data('js-form-advanced-bulk-required-txt-position')                || $.SOW.core.form_advanced.config.toast_pos,       // button icon

            // Modal
            _reqModalCustom             = _t.data('js-form-advanced-bulk-required-custom-modal')                || '', // modal id
            _reqModalCustomAjaxUrl      = _t.data('js-form-advanced-bulk-required-custom-modal-content-ajax')   || '',

            _reqModalType               = _t.data('js-form-advanced-bulk-required-modal-type')                  || 'secondary',         // 'custom' : In case we want an ajax modal, fully customizable (no header/body/footer)
            _reqModalSize               = _t.data('js-form-advanced-bulk-required-modal-size')                  || 'modal-md',
            _reqModalBackdrop           = _t.data('js-form-advanced-bulk-required-modal-backdrop')              || '',          // static
            _reqModalTitle              = _t.data('js-form-advanced-bulk-required-modal-txt-title')             || 'Please Confirm',
            _reqModalTxtSubtitle        = _t.data('js-form-advanced-bulk-required-modal-txt-subtitle')          || '-',
            _reqModalTxtBodyTxt         = _t.data('js-form-advanced-bulk-required-modal-txt-body-txt')          || 'Are you sure?',
            _reqModalTxtBodyInfo        = _t.data('js-form-advanced-bulk-required-modal-txt-body-info')         || '',
            _reqModalBtnTxtYes          = _t.data('js-form-advanced-bulk-required-modal-btn-text-yes')          || 'Submit', 
            _reqModalBtnTxtNo           = _t.data('js-form-advanced-bulk-required-modal-btn-text-no')           || 'Cancel',
            _reqModalBtnIcoYes          = _t.data('js-form-advanced-bulk-required-modal-btn-icon-yes')          || $.SOW.config.sow__icon_check,        // button icon
            _reqModalBtnIcoNo           = _t.data('js-form-advanced-bulk-required-modal-btn-icon-no')           || $.SOW.config.sow__icon_close,        // button icon

            // Form
            _formID                     = _t.attr('data-js-form-advanced-form-id')                              || '', // form#id .attr REQUIRED, or old one used!
            _formSubmitNoConfirm        = _t.data('js-form-advanced-bulk-submit-without-confirmation')          || 'false',

            // Hidden action input
            _formActionID               = _t.data('js-form-advanced-bulk-hidden-action-id')                     || '#action',
            _formActionVal              = _t.data('js-form-advanced-bulk-hidden-action-value')                  || '';

        // count selecteditems & update
        var total_selected_items = jQuery(_citems + " input:checked").length;



        // Check for required selected items
        if(_reqSelectedItems == true && Number(total_selected_items) < 1) {

          // SHOW ERROR
          if(typeof $.SOW.core.toast === 'object') {
              $.SOW.core.toast.destroy();
              $.SOW.core.toast.show('danger', '', _requiredMsg, _requiredMsgPos, $.SOW.core.form_advanced.config.toast_delay, true);
          } else {
              alert(_requiredMsg);
          }

          e.stopPropagation();
          return;

        }






        // Update action hidden input
        if(_formActionVal != '')
          jQuery(_formActionID).val(_formActionVal);


        // Direct submit, no confirmation
        if(_formSubmitNoConfirm != 'false') {
          jQuery(_formID).unbind().submit(); // unbind required
          return;
        }


        // Button Icons
        if(_reqModalBtnIcoYes.length > 1)
          var _reqModalBtnTxtYes = '<i class="' + _reqModalBtnIcoYes + '"></i> ' + _reqModalBtnTxtYes;

        if(_reqModalBtnIcoNo.length > 1)
          var _reqModalBtnTxtNo = '<i class="' + _reqModalBtnIcoNo + '"></i> ' + _reqModalBtnTxtNo;


        // Replacements
        _reqModalTitle          = _reqModalTitle.replace('{{no_selected}}', total_selected_items);
        _reqModalTxtBodyTxt     = _reqModalTxtBodyTxt.replace('{{no_selected}}', total_selected_items);
        _reqModalTxtBodyInfo    = _reqModalTxtBodyInfo.replace('{{no_selected}}', total_selected_items);
        _reqModalTxtSubtitle    = _reqModalTxtSubtitle.replace('{{no_selected}}', total_selected_items);


        // Additional info
        var _reqModalTxtBodyTxt = (_reqModalTxtBodyInfo != '') ? _reqModalTxtBodyTxt + '<span class="d-block d-block small mt-1">' + _reqModalTxtBodyInfo + '</span>' : _reqModalTxtBodyTxt;








        // 1. Inline Modal
        if(_reqModalCustom != '') {

          // Update selected items counter
          if(_reqModalCustom != '')
            $.SOW.core.form_advanced.form_advanced_bulk_counter_update(total_selected_items);


          // SHOW MODAL
          jQuery(_reqModalCustom).modal('show');


          // LOAD FROM AJAX
          if(_reqModalCustomAjaxUrl != '') {
            
            jQuery(_reqModalCustom).find('.modal-content').load(_reqModalCustomAjaxUrl, function() {

              // Update selected items counter
              $.SOW.core.form_advanced.form_advanced_bulk_counter_update(total_selected_items);

            });

          }

          // stop here
          return;
        
        } 



                                

        // 2. Generated modal (regular type)
        var _tpl = '<div class="modal fade" id="js_advanced_form_bulk_modal_confirm" role="dialog" tabindex="-1" aria-labelledby="modal-title-confirm" aria-hidden="true" data-backdrop="'+_reqModalBackdrop+'">'
            + '<div class="modal-dialog '+_reqModalSize+'" role="document">'

                + '<div class="modal-content">'

                    + '<div class="modal-header border-0 bg-'+_reqModalType+'-soft">'
                        
                        + '<h5 id="modal-title-confirm" class="modal-title font-light line-height-1">'
                            + _reqModalTitle
                            + '<small class="d-block mt-1" style="font-size:13px">'+_reqModalTxtSubtitle+'</small>'
                        + '</h5>'

                        + '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'

                    + '</div>'

                    + '<div class="modal-body p-lg-4">'

                            + _reqModalTxtBodyTxt

                    + '</div>'

                    + '<div class="modal-footer border-0">'

                        + '<button type="submit" class="btn btn-js-advanced-form-bulk-confirm-yes btn-'+ _reqModalType +'">'
                            + _reqModalBtnTxtYes
                        + '</button>'

                        + '<a href="#" class="btn btn-js-advanced-form-bulk-confirm-no btn-light" data-bs-dismiss="modal">'
                            + _reqModalBtnTxtNo
                        + '</a>'

                    + '</div>'

                + '</div>'

            + '</div>'
        + '</div>';


        // In case we want an ajax modal, fully customizable (no header/body/footer)
        var _tplCustom = '<div class="modal fade show" id="js_advanced_form_bulk_modal_confirm" role="dialog" tabindex="-1" aria-labelledby="modal-title-confirm" aria-hidden="true" data-backdrop="'+_reqModalBackdrop+'">'
            + '<div class="modal-dialog '+_reqModalSize+'" role="document">'
                + '<div class="modal-content"></div>'
            + '</div>'
        + '</div>';


        // which template we use?
        var _modalBody = '#js_advanced_form_bulk_modal_confirm .modal-body';
        if(_reqModalType == 'custom') {

          var _tpl        = _tplCustom,
              _modalBody  = '#js_advanced_form_bulk_modal_confirm .modal-content';
      
        }



        // Add modal to DOM
        jQuery('#js_advanced_form_bulk_modal_confirm').remove();
        jQuery(_formID).append(_tpl); // REQUIRED INSIDE THE FORM! Because of Submit button!

        // Show Modal
        jQuery('#js_advanced_form_bulk_modal_confirm').modal('handleUpdate').modal('show');

        // Modal Backdrop fix (Smarty v3.0.9)
        if(jQuery('.modal-backdrop').length < 1) {

          $.SOW.globals.elBody.append('<div class="modal-backdrop fade show"></div>');

          jQuery('#js_advanced_form_bulk_modal_confirm').on('hidden.bs.modal', function (e) {
            jQuery('.modal-backdrop').remove();
          });

        } else {

          jQuery('.modal-backdrop').addClass('show');

          jQuery('#js_advanced_form_bulk_modal_confirm').on('hidden.bs.modal', function (e) {
            jQuery('.modal-backdrop').removeClass('show');
          });

        }

        // Custom Ajax Content
        if(_reqModalCustomAjaxUrl != '') {
            
          jQuery(_modalBody).empty().append('<div class="py-4 text-center animate-bouncein"><i class="'+$.SOW.config.sow__icon_loading+' fs-1 text-muted"></i></div>');

          jQuery(_modalBody).load(_reqModalCustomAjaxUrl, function() {

            // Update selected items counter
            $.SOW.core.form_advanced.form_advanced_bulk_counter_update(total_selected_items);

            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
            if(_reqModalType == 'custom') {
                setTimeout(function() {

                    // console log
                    $.SOW.helper.consoleLogReinit(scriptInfo, _modalBody);
                    // reinit inside ajax container
                    $.SOW.reinit(_modalBody);

                }, 200);
            }
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


          });

        }

        return;

      });

    },




    /**
     *
     *  @form_advanced_bulk_counter_update
     *  :: Helper
     *  
     *
     **/
    form_advanced_bulk_counter_update: function(total_selected_items) {

      // Update selected items
      jQuery('.js-form-advanced-selected-items').html(total_selected_items);

    },


    /**
     *
     *  @form_advanced_numeric_limit
        Input min/max limits

            <!-- input limit + hidden message -->
            <div class="position-relative">

                <span class="js-form-advanced-limit-info badge bg-warning hide animate-bouncein position-absolute absolute-top m--2">
                    please, order between 1 and 48.
                </span>

                <input type="number" value="8" min="1" max="48" class="form-control js-form-advanced-limit">
            </div>
            <!-- /input limit + hidden message -->

     *
     *  
     *
     **/
    form_advanced_numeric_limit: function(_this) {

      var __interval__ = null;
      document.querySelectorAll( _this ).forEach(function(el) {

          el.addEventListener('keyup', function(e) {

            var _min = e.target.getAttribute('min') || '',
                _max = e.target.getAttribute('max') || '';

            if( __interval__ )
              clearInterval( __interval__ );

            // wait 5 seconds for empty value
            // then update with minimum
            if( _min != '' && e.target.value == '' ) {

              __interval__ = setInterval(function() {

                if(e.target.value == '')
                  e.target.value = _min;

              }, 5000);

              return;

            }

            // min allowed
            if( _min != '' && Number(e.target.value) < Number(_min) )
              e.target.value = _min;

            // max allowed
            if( _max != '' && Number(e.target.value) > Number(_max) ) {
              e.target.value = _max;

              // Optional simple info message
              $.SOW.core.form_advanced.form_advanced_simple_alert( jQuery( el ) );
            }

          });

      });

    },



    /**
     *
     *  @form_advanced_char_count_down
        Char Count Down

        <!-- input -->
        <div class="position-relative">
            
            <span class="js-form-advanced-limit-info badge bg-warning hide animate-bouncein position-absolute absolute-top m--2">
                100 chars limit
            </span>

            <input type="text" name="-" class="form-control js-form-advanced-char-count-down" data-output-target=".js-form-advanced-char-left" value="" maxlength="100">
            
            <div class="small text-muted text-align--end mt--3">
                characters left: <span class="js-form-advanced-char-left">100</span>
            </div>
        
        </div>
        
        <br>

        <!-- textarea -->
        <div class="position-relative">
            
            <span class="js-form-advanced-limit-info badge bg-warning hide animate-bouncein position-absolute absolute-top m--2">
                100 chars limit
            </span>

            <textarea class="js-form-advanced-char-count-down form-control" data-output-target=".js-form-advanced-char-left2" maxlength="100"></textarea>
            
            <div class="small text-muted text-align--end mt--3">
                characters left: <span class="js-form-advanced-char-left2">100</span>
            </div>

        </div>

     *
     *  
     *
     **/
    form_advanced_char_count_down: function(_this) {


      if(jQuery(_this).length < 1)
          return;

      jQuery(_this).keyup(function(e) {

        var _t      = jQuery(this),
            _val    = _t.val(),
            _length = _val.length,
            _max    = _t.attr('maxlength')      || 0,
            _output = _t.data('output-target')  || '.char-left';

        if(_max < 1 && _output != '')
          return;

        if(_length >= _max) {
         
          _t.val(_val.substring(0, _max - 1)); // limit - remove anything over maximum allowed
          jQuery(_output).html('0');

          // Optional simple info message
          $.SOW.core.form_advanced.form_advanced_simple_alert(_t);

        } else {
          var _left = _max - _length;
          jQuery(_output).html(_left);
        }


      });

    },





    /**
     *
     *  @form_advanced_char_count_up
        Char Count Up


        Remove maxlength for no limit, only to count chars



        <!-- input -->
        <div class="position-relative">
            
            <span class="js-form-advanced-limit-info badge bg-warning hide animate-bouncein position-absolute absolute-top m--2">
                100 chars limit
            </span>

            <input type="text" name="-" class="form-control js-form-advanced-char-count-up" data-output-target=".js-form-advanced-char-total" value="" maxlength="100">
            
            <div class="small text-muted text-align--end mt--3">
                characters: <span class="js-form-advanced-char-total">0</span> / 100
            </div>

        </div>

        <br>

        <!-- textarea -->
        <div class="position-relative">
            
            <span class="js-form-advanced-limit-info badge bg-warning hide animate-bouncein position-absolute absolute-top m--2">
                100 chars limit
            </span>

            <textarea class="js-form-advanced-char-count-up form-control" data-output-target=".js-form-advanced-char-total2" maxlength="100"></textarea>
            
            <div class="small text-muted text-align--end mt--3">
                characters: <span class="js-form-advanced-char-total2">0</span> / 100
            </div>

        </div>

     *
     *  
     *
     **/
    form_advanced_char_count_up: function(_this) {

      if(jQuery(_this).length < 1)
        return;

      jQuery(_this).keyup(function() {

        var _t      = jQuery(this),
            _val    = _t.val(),
            _length = _val.length               || 0,
            _max    = _t.attr('maxlength')      || 0,
            _output = _t.data('output-target')  || '.char-count';

        jQuery(_output).html(_length);

        // limit if specified
        if(_length >= _max && _max > 0) {
          _t.val(_val.substring(0, _max)); // limit - remove anything over maximum allowed

          // Optional simple info message
          $.SOW.core.form_advanced.form_advanced_simple_alert(_t);
        }

      });

    },




    /**
     *
     *  @form_advanced_simple_alert
     *  Optional form alert
     *  
     *
     **/
    form_advanced_simple_alert: function(_this) {

      _this.next('.js-form-advanced-limit-info').removeClass('hide');
      _this.prev('.js-form-advanced-limit-info').removeClass('hide');

      setTimeout(function() {
          _this.next('.js-form-advanced-limit-info').addClass('hide');
          _this.prev('.js-form-advanced-limit-info').addClass('hide');
      }, 3000);

    },




    /**
     *
     *  @form_advanced_type_toggle
     *  
     *
     **/
    form_advanced_type_toggle: function(_this) {

      if(jQuery(_this).length < 1)
        return;

      jQuery(_this).not('.js-form_advanced_type_toggle').addClass('js-form_advanced_type_toggle').on('click', function(e) {
        e.preventDefault();

        var _target = jQuery(this).data('target') || jQuery(this).data('bs-target') || '';
        if(_target == '') return;

        jQuery(this).toggleClass('active');
        if(jQuery(_target).attr('type') == 'password') {
            jQuery(_target).attr('type', 'text');
        } else {
            jQuery(_target).attr('type', 'password');
        }

      });

    },




    /**
     *
     *  @formAdvancedList
     *  on a list, reveal/expand selected (example: payment method - checkout)
     *
     **/
    formAdvancedList: function() {

      jQuery('.form-advanced-list').each(function() {

          var _t                      = jQuery(this),
              _listReavealCount       = jQuery('.form-advanced-list-reveal', _t).length,
              _formValidate           = _t.parents('form.bs-validate'),
              _mainForm               = _formValidate                                             || _t.parents('form'),
              _isFormValidate         = (_formValidate.length > 0) ? true : false,
              _disableRequired        = _t.attr('data-form-advanced-list-hidden-required')        || 'false',
              _disableHidden          = _t.attr('data-form-advanced-list-hidden-disable')         || 'false',
              _disableHiddenByClass   = _t.attr('data-form-advanced-list-hidden-disable-class')   || '';


          // inside validation form
          // "unrequire" all first!
          // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
          // if(_disableRequired == 'true' && _isFormValidate > 0 && _listReavealCount > 0) {
          if(_disableRequired == 'true' && _listReavealCount > 0) {

              if(_disableHidden == 'true') {
                  jQuery('.form-advanced-list-reveal-item [disabled]', _t).not('.js-form-advanced-list-ignore').addClass('js-form-advanced-disabled');
                  jQuery('.form-advanced-list-reveal-item:hidden [disabled]', _t).addClass('js-form-advanced-disabled').not('.js-form-advanced-list-ignore').prop('disabled', false);
              }

              if(_disableHiddenByClass != '') {
                  jQuery('.form-advanced-list-reveal-item '+_disableHiddenByClass, _t).not('.js-form-advanced-list-ignore').addClass('js-form-advanced-disabled-class');
                  jQuery('.form-advanced-list-reveal-item:hidden '+_disableHiddenByClass, _t).addClass('js-form-advanced-disabled-class').not('.js-form-advanced-list-ignore').prop('disabled', false);
              }

              jQuery('.form-advanced-list-reveal-item [required]', _t).addClass('js-form-advanced-required');
              jQuery('.form-advanced-list-reveal-item:hidden [required]', _t).addClass('js-form-advanced-required').prop('required', false);

          }
          // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++





          // Each Option
          jQuery('.form-advanced-list-reveal', _t).on('change', function() {

              var __t         = jQuery(this),
                  __targetEl  = __t.data('form-advanced-target')              || '',
                  __target    = jQuery(__targetEl)                            || '',
                  __ajax      = __t.data('form-advanced-ajax-url')            || '',
                  __ajaxIcon  = __t.attr('data-form-advanced-ajax-icon')      || 'true';

              // hide all first
              jQuery('.form-advanced-list-reveal-item', _t).addClass('hide hide-force');


              // reveal selected
              if(__target != '') {

                  // show content
                  __target.removeClass('hide hide-force');


                  // load ajax content
                  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                  if(__ajax != '' && !__target.hasClass('js-ajaxified')) {


                      // loading icon
                      if(__ajaxIcon == true)
                          __target.empty().append('<div class="py-4 text-center animate-bouncein"><i class="'+$.SOW.config.sow__icon_loading+' fs--40 text-muted"></i></div>');
                      // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


                      // ajax
                      jQuery(__target).load(__ajax, function() {

                          // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
                          setTimeout(function() {

                              // console log
                              var __for = __target.attr('id');
                              $.SOW.helper.consoleLogReinit(scriptInfo, __for);

                              // Initial Set
                              // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                              jQuery('.form-advanced-list-reveal-item [required]', _t).addClass('js-form-advanced-required');
                              jQuery('.form-advanced-list-reveal-item:hidden [required]', _t).addClass('js-form-advanced-required').prop('required', false);
                              // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


                              // Disable hidden elements by class
                              // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                              if(_disableHiddenByClass != '') {
                                  jQuery('.form-advanced-list-reveal-item:visible '+_disableHiddenByClass, _t).not('.js-form-advanced-list-ignore').prop('disabled', false);
                                  jQuery('.js-form-advanced-disabled-class:hidden'+_disableHiddenByClass, __target).not('.js-form-advanced-list-ignore').prop('disabled', true);
                              }
                              // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

                              // Show Elements
                              // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                              jQuery('.form-advanced-list-reveal-item:hidden [required]', _t).prop('required', false);
                              jQuery('.js-form-advanced-required:visible', __target).prop('required', true);
                              // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



                              // reinit plugins
                              $.SOW.reinit(__target.attr('id'));
                              // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


                          }, 400);
                          // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

                      }).addClass('js-ajaxified');

                  } 
                  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

              }







              // inside validation form
              // remove quired when hidden
              // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
              // if(__target != '' && _disableRequired == 'true' && _isFormValidate > 0) {
              if(__target != '' && _disableRequired == 'true') {
                  
                  // Disable hidden elements
                  if(_disableHidden+'' == 'true') {
                      jQuery('.form-advanced-list-reveal-item:hidden [disabled]', _t).not('.js-form-advanced-list-ignore').prop('disabled', false);
                      jQuery('.js-form-advanced-disabled:visible', __target).not('.js-form-advanced-list-ignore').prop('disabled', true);
                  }

                  // Disable hidden elements by class
                  if(_disableHiddenByClass != '') {
                      jQuery('.form-advanced-list-reveal-item:visible '+_disableHiddenByClass, _t).not('.js-form-advanced-list-ignore').prop('disabled', false);
                      jQuery('.js-form-advanced-disabled-class:hidden'+_disableHiddenByClass, __target).not('.js-form-advanced-list-ignore').prop('disabled', true);
                  }

                  // Show Elements
                  jQuery('.form-advanced-list-reveal-item:hidden [required]', _t).prop('required', false);
                  jQuery('.js-form-advanced-required:visible', __target).prop('required', true);

              }
              // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


              // hide validate errors
              // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
              jQuery('.bs-validate-info').addClass('hide hide-force');
              _mainForm.removeClass('was-validated');
              // alert(_mainForm[0].checkValidity());
              // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

          });

      });

    },





    /**
     *
     *  @formAdvancedReset
     *  reset form on button click
     *
     **/
    formAdvancedReset: function() {

      jQuery('a.form-advanced-reset, button.form-advanced-reset').not('.js-advancified').addClass('js-advancified').each(function(e) {

          var _t          = jQuery(this),
              _target     = _t.data('target-reset')           || _t.attr('href'),
              _exclude    = _t.data('exclude-reset')          || '';

          if(_target == '')
              return null;

          jQuery(_target+' input').on('change', function() {
              _t.not(_exclude).removeClass('hide hide-force');
          });

          jQuery(_target+' textarea').on('change', function() {
              _t.not(_exclude).removeClass('hide hide-force');
          });

          // reset button click
          _t.on('click', function(e) {
              e.preventDefault();

              // checkboxes & radios
              // do NOT reset value!
              jQuery(_target+' input').each(function(el) {
                  var thisEl      = jQuery(this),
                      thisType    = thisEl.attr('type').toLowerCase();

                  if( thisType != 'checkbox' && thisType != 'radio' ) {
                      thisEl.not(_exclude).val('');
                  }

              });
              
              jQuery(_target+' textarea').not(_exclude).val('');
              jQuery(_target+' input[type=checkbox]').not(_exclude).prop('checked', false);
              jQuery(_target+' input[type=radio]').not(_exclude).prop('checked', false);

              // hide reset button
              if(!_t.hasClass('js-ignore'))
                  _t.addClass('hide hide-force');

          });


      });

    },




    /**
     *
     *  @formAdvancedRequired
     *  manage required attribute on hidden
     *
     **/
    formAdvancedRequired: function() {

      jQuery('div.js-form-advanced-required').not('.js-advancrequirefied').addClass('js-advancrequirefied').each(function(e) {

        var _t    = jQuery(this),
            _elID = _t.attr('id') || '';
        
        if(_elID == '') return null;

        // 1. add identifier class for each required element
        jQuery('[required]', _t).each(function() {
          jQuery(this).addClass('js-required-hidden');
        });

        // 2. remove required attribute for hidden elements
        if(_t.is(':hidden')) {
          jQuery('.js-required-hidden', _t).prop('required', false);
        }

        // 3. add|remove required attribute 
        jQuery('input[data-target="#'+_elID+'"], a[href="#'+_elID+'"], .js-form-advanced-required-toggler').on('click', function(e) {
          $.SOW.core.form_advanced.__switchFormAdvancedRequired();
        });
        jQuery('select.js-form-advanced-required-toggler').on('change', function(e) {
          $.SOW.core.form_advanced.__switchFormAdvancedRequired();
        });

      });

    },
        __switchFormAdvancedRequired: function() {

          window.setTimeout(function() {

            jQuery('div.js-form-advanced-required').each(function() {

              var _container = jQuery(this);

              if(_container.is(':hidden')) {
                jQuery('.js-required-hidden', _container).prop('required', false);
              } else {
                jQuery('.js-required-hidden', _container).prop('required', true);
              }

            });
          
          }, 450);

        },



    /**
     *
     *  @formAdvancedTableVariants
     *  generate columns
     *
     **/
    formAdvancedTableVariants: function() {

        jQuery('div.js-form-advanced-table').not('.js-advtablified').addClass('js-advtablified').each(function(e) {

            var _t              = jQuery(this),
                _elID           = _t.attr('id') || '',
                _columnBefore   = _t.data('table-column-insert-before')     || 'tr>td:first-child',
                _columnElement  = _t.data('table-column-insert-element')    || '<input type="text" class="form-control form-control-sm" value="">',
                _columnDelBtn   = _t.data('table-column-delete-button')     || '<span class="btn-table-column-delete fi fi-close small cursor-pointer px-1 d-inline-block"></span>',
                _columnLimit    = _t.data('table-column-limit')             || 0,
                _cloneLimit     = _t.data('table-row-limit')                || 0,
                _cloneMethod    = _t.data('table-row-method')               || 'append';    // append|prepend

            // Assign a random id if not exist
            if(_elID == '') {
              var _elID = 'js_' + $.SOW.helper.randomStr(10);
              _t.attr('id', _elID);
            }

            /* Create clone of frist TR on load! */
            var _clone = jQuery('table>tbody>tr:first-child', _t).clone();
                _clone.addClass('js-cloned').removeClass('js-ignore hide hide-force');

            // remove first TR, if is hidden (acting as a template)
            if(jQuery('table>tbody>tr:first-child', _t).hasClass('hide'))
              jQuery('table>tbody>tr:first-child', _t).remove();
                

            // resets
            jQuery('input, textarea', _clone).val('').removeClass('js-tangepickified js-rangepickified js-bselectified js-datepickified js-advancified');
            jQuery('a.btn-table-clone', _clone).removeClass('btn-table-clone btn-primary btn-danger btn-secondary').addClass('btn-table-clone-remove btn-light').attr('aria-expanded','true');
            // reset : file upload, if has items
            if(jQuery('input.custom-file-input', _clone).length > 0) {

              var _fileUploadPrevContainer    = jQuery('input.custom-file-input', _clone).attr('data-file-preview-container'),
                  _fileUploadRemoveButton     = jQuery('input.custom-file-input', _clone).attr('data-file-btn-clear');

              jQuery(_fileUploadPrevContainer, _clone).empty();
              jQuery(_fileUploadRemoveButton, _clone).addClass('hide');
              jQuery('input.custom-file-input', _clone).prop('disabled', false);

            }


            /* CLONE BUTTON */
            jQuery('a.btn-table-clone', _t).on('click', function(e) {
              e.preventDefault();


              // generate id
              var _cloneID = 'clone_' + $.SOW.helper.randomStr(6);
              _clone.attr('id', _cloneID);

              // file upload
              if(jQuery('input.custom-file-input', _clone).length > 0) {
                var _fileUploadPrevContainer    = jQuery('input.custom-file-input', _clone).attr('data-file-preview-container'),
                    _fileUploadPrevContainer    = _fileUploadPrevContainer.replace('.', '');
                var _fileUploadRemoveButton     = jQuery('input.custom-file-input', _clone).attr('data-file-btn-clear'),
                    _fileUploadRemoveButton     = _fileUploadRemoveButton.replace('.', '');

                jQuery('input.custom-file-input', _clone).attr('data-file-preview-container', '.'+_fileUploadPrevContainer+'_'+_cloneID);
                jQuery('input.custom-file-input', _clone).attr('data-file-btn-clear', '.'+_fileUploadRemoveButton+'_'+_cloneID);
                jQuery('.'+_fileUploadPrevContainer, _clone).removeClass(_fileUploadPrevContainer).addClass(_fileUploadPrevContainer+'_'+_cloneID);
                jQuery('.'+_fileUploadRemoveButton, _clone).removeClass(_fileUploadRemoveButton).addClass(_fileUploadRemoveButton+'_'+_cloneID);
              }


              // add clonned
              // jQuery('table>tbody', _t).append(_clone);
              if(_cloneMethod == 'append') {
                _clone.clone().appendTo('#'+_elID+' table>tbody');
              } else {
                _clone.clone().prependTo('#'+_elID+' table>tbody');

              }


              // remove button
              __rowDel();

              // reinits
              _t.removeClass('js-advancrequirefied');
              $.SOW.reinit('#'+_cloneID);



              // limit cloned elements
              if(Number(_cloneLimit) > 0) {
                if(jQuery('table>tbody>tr', _t).length >= Number(_cloneLimit)) {
                  jQuery('.btn-table-clone', _t).addClass('disabled').prop('disabled', true);
                }
              }

            });




            /* COLUMN ADD */
            jQuery('.js-form-advanced-table-column-add button', _t).on('click', function(e) {
                e.preventDefault();

                var _tc         = jQuery(this),
                    _el         = _tc.parents('.js-form-advanced-table-column-add'),
                    
                    _columnName = jQuery('input', _el).val()                || '',
                    _columnName = _columnName.trim(),
                    
                    _optionName = jQuery('input', _el).attr('name')         || '',
                    _optionName = _optionName.trim();

                // check if empty
                jQuery('input', _el).removeClass('is-invalid');
                if(_columnName == '') {
                    jQuery('input', _el).addClass('is-invalid');
                    window.setTimeout(function() {
                        jQuery('input', _el).removeClass('is-invalid');
                    }, 1000);
                    return;
                }

                // create input name
                var _optionName = (_optionName == '') ? _columnName : _optionName+'['+_columnName+']',
                    _optionName = _optionName.toLowerCase();
                var _colID = 'js_' + $.SOW.helper.randomStr(6);
                var _columnNameUcFirst = _columnName.replace(/^./, _columnName[0].toUpperCase()); 


                // check if already exist
                if(jQuery('tbody [name="'+_optionName+'[]"]', _t).length > 0) {
                    jQuery('input', _el).val('');
                    return null;
                }


                // Add new thead
                var _newTH = '<th data-id="'+_colID+'" class="js-table-option">'+_columnDelBtn+_columnNameUcFirst+'</th>';
                jQuery('thead th'+_columnBefore, _t).before(_newTH);

                // Add new body
                var _rowEl = jQuery('<div>' + _columnElement + '</div>');
                    _rowEl.find('*').attr('name', _optionName+'[]'); // shoul be array
                var _newTD = '<td class="js-table-option '+_colID+'">'+_rowEl.html()+'</td>';
                jQuery('tbody tr>td'+_columnBefore, _t).before(_newTD);

                // add column to _colne
                jQuery('td'+_columnBefore, _clone).before(_newTD);

                // remove column button
                jQuery('thead th[data-id='+_colID+'] .btn-table-column-delete', _t).on('click', function(e) {
                    e.preventDefault();

                    var _colIDDel = jQuery(this).parents('th').data('id');

                    // remove column to _colne
                    jQuery('.'+_colIDDel, _clone).remove();

                    // remove from table
                    jQuery('.'+_colIDDel, _t).remove();
                    jQuery('th[data-id='+_colIDDel+']', _t).remove();

                    // limit cloned elements
                    if(Number(_columnLimit) > 0) {
                        if(jQuery('thead th.js-table-option', _t).length < Number(_columnLimit)) {
                            jQuery('.js-form-advanced-table-column-add button', _t).removeClass('disabled').prop('disabled', false);
                            jQuery('.js-form-advanced-table-column-add input', _t).prop('disabled', false);
                        }
                    }

                });

                // reinits
                _t.removeClass('js-advancrequirefied');
                $.SOW.reinit('td.'+_colID);

                // reset field
                jQuery('input', _el).val('');


                // limit cloned elements
                if(Number(_columnLimit) > 0) {
                    if(jQuery('thead th.js-table-option', _t).length >= Number(_columnLimit)) {
                        jQuery('.js-form-advanced-table-column-add button', _t).addClass('disabled').prop('disabled', true);
                        jQuery('.js-form-advanced-table-column-add input', _t).prop('disabled', true);
                    }
                }

            });




            /*

                ON LOAD

            */




            /* ON LOAD : COLUMN REMOVE */
            jQuery('thead th.js-table-option', _t).each(function() {

                var _tcol = jQuery(this);

                // add delete button
                _tcol.prepend(_columnDelBtn);

                // remove column button
                jQuery('.btn-table-column-delete', _tcol).on('click', function(e) {
                    e.preventDefault();

                    var _colIDDel = jQuery(this).parents('th').data('id');

                    // remove column to _colne
                    jQuery('.'+_colIDDel, _clone).remove();

                    // remove from table
                    jQuery('.'+_colIDDel, _t).remove();
                    jQuery('th[data-id='+_colIDDel+']', _t).remove();

                    // limit cloned elements
                    if(Number(_columnLimit) > 0) {
                        if(jQuery('thead th.js-table-option', _t).length < Number(_columnLimit)) {
                            jQuery('.js-form-advanced-table-column-add button', _t).removeClass('disabled').prop('disabled', false);
                            jQuery('.js-form-advanced-table-column-add input', _t).prop('disabled', false);
                        }
                    }

                });

            });


            /* ON LOAD : ROW REMOVE */
            function __rowDel() {

                jQuery('table>tbody>tr>td a.btn-table-clone-remove', _t).off().on('click', function(e) {
                    e.preventDefault();

                    // remove element
                    jQuery(this).parents('tr').remove();

                    // enable clone button
                    if(Number(_cloneLimit) > 0) {
                        if(jQuery('table>tbody>tr', _t).length < Number(_cloneLimit)) {
                            jQuery('.btn-table-clone', _t).removeClass('disabled').prop('disabled', false);
                        }
                    }

                });

                // confirm
                jQuery('table>tbody>tr>td .btn-table-clone-remove-confirm', _t).off().on('click', function(e) {
                    e.preventDefault();

                    jQuery(this).parent().find('div').removeClass('hide hide-force');
                });

                // confirm cancel
                jQuery('table>tbody>tr>td .btn-table-clone-remove-cancel', _t).off().on('click', function(e) {
                    e.preventDefault();

                    jQuery(this).parents('td').find('div').addClass('hide hide-force');
                });

            }   __rowDel();


        });

    },






    /**
     *
     *  @formatCreditCard
     *  
     *
     **/
    formatCreditCard: function() {


        /*

            Credit card number

        */
        jQuery('input.cc-format.cc-number').keyup(function() {

            var _t              = jQuery(this),
                val             = _t.val() || '',
                targetCardType  = _t.data('card-type') || '';

            // format
            var cc_formatted = $.SOW.core.form_advanced.formatCardNumber(val);
            _t.val(cc_formatted);

            // Credit card type
            if(targetCardType != '') {
                var cc_type = $.SOW.core.form_advanced.detectCardType(val);
                var cc_type = (cc_type) ? cc_type.name : '';
                jQuery(targetCardType).val(cc_type);
            }

        });


        /*

            Credit card expire

        */
        jQuery('input.cc-format.cc-expire').keyup(function(e) {

            var _t              = jQuery(this),
                val             = _t.val() || '',
                code            = e.keyCode,
                allowedKeys     = [8];

            if(allowedKeys.indexOf(code) !== -1) {
                return;
            }

            e.target.value = e.target.value.replace(
                /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
                ).replace(
                /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
                ).replace(
                /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
                ).replace(
                /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
                ).replace(
                /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
                ).replace(
                /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
                ).replace(
                /\/\//g, '/' // Prevent entering more than 1 `/`
            );

        });

    },



    /**
     *
     *  @formatCardNumber
     *  https://www.peterbe.com/plog/cc-formatter
     *
     **/
    formatCardNumber: function(value) {

        var v       = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        var matches = v.match(/\d{4,16}/g);
        var match   = matches && matches[0] || '';
        var parts   = [];
        
        for (var i=0, len=match.length; i<len; i+=4) {
            parts.push(match.substring(i, i+4));
        }

        if(parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }

    },




    /**
     *
     *  @detectCardType
     *  https://www.paypalobjects.com/en_GB/vhelp/paypalmanager_help/credit_card_numbers.htm
     *
     **/
    detectCardType: function(number) {

        var card_types = [
          {
            name: 'amex',
            pattern: /^3[47]/,
            valid_length: [15]
          }, {
            // name: 'diners_club_carte_blanche',
            name: 'diners',
            pattern: /^30[0-5]/,
            valid_length: [14]
          }, {
            // name: 'diners_club_international',
            name: 'diners',
            pattern: /^36/,
            valid_length: [14]
          }, {
            name: 'jcb',
            pattern: /^35(2[89]|[3-8][0-9])/,
            valid_length: [16]
          }, {
            name: 'laser',
            pattern: /^(6304|670[69]|6771)/,
            valid_length: [16, 17, 18, 19]
          }, {
            // name: 'visa_electron',
            name: 'visa',
            pattern: /^(4026|417500|4508|4844|491(3|7))/,
            valid_length: [16]
          }, {
            name: 'visa',
            pattern: /^4/,
            valid_length: [16]
          }, {
            name: 'mastercard',
            pattern: /^5[1-5]/,
            valid_length: [16]
          }, {
            name: 'maestro',
            pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
            valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
          }, {
            name: 'discover',
            pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
            valid_length: [16]
          }
        ];


        var _j, _len1, _ref1, card, card_type, options = {};
        var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };


        if (options.accept == null) {
            options.accept = (function() {
            var _i, _len, _results;
                _results = [];

            for (_i = 0, _len = card_types.length; _i < _len; _i++) {
                card = card_types[_i];
                _results.push(card.name);
            }

            return _results;

            })();
        }

        var  _ref = options.accept;
        for (var _i = 0, _len = _ref.length; _i < _len; _i++) {
            card_type = _ref[_i];
            
            if (__indexOf.call((function() {
                var _j, _len1, _results = [];

                for (var _j = 0, _len1 = card_types.length; _j < _len1; _j++) {
                    card = card_types[_j];
                    _results.push(card.name);
                }

                return _results;

            })(), card_type) < 0) {

                // throw "Credit card type '" + card_type + "' is not supported";

            }
        }

        _ref1 = (function() {
            var _k, _len1, _ref1, _results = [];
            
            for (_k = 0, _len1 = card_types.length; _k < _len1; _k++) {
                card = card_types[_k];
                if (_ref1 = card.name, __indexOf.call(options.accept, _ref1) >= 0) {
                    _results.push(card);
                }
            }

            return _results;

        })();

        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            card_type = _ref1[_j];

            if (number.match(card_type.pattern)) {
                return card_type;
            }

        }

        return null;


        /**
        var re = {
            electron:       /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
            maestro:        /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
            dankort:        /^(5019)\d+$/,
            interpayment:   /^(636)\d+$/,
            unionpay:       /^(62|88)\d+$/,
            visa:           /^4[0-9]{12}(?:[0-9]{3})?$/,
            mastercard:     /^5[1-5][0-9]{14}$/,
            amex:           /^3[47][0-9]{13}$/,
            diners:         /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
            discover:       /^6(?:011|5[0-9]{2})[0-9]{12}$/,
            jcb:            /^(?:2131|1800|35\d{3})\d{11}$/
        };

        for(var key in re) {
            if(re[key].test(number)) {
                return key;
            }
        }
        **/

    }

  }

})(jQuery);