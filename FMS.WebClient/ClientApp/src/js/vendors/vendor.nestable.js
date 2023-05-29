/**
 *
 *  [SOW] Nestable
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependencies   -
 *  @Usage          $.SOW.vendor.nestable.init('.nestable');
 *
 *  @Ajax Support   YES
 *
 *  Vendor:         https://github.com/nolimits4web/swiper
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
    var scriptInfo              = 'Vendor Nestable';
    window.nestableLastUpdate   = {};


    $.SOW.vendor.nestable = {


        /**
         *
         *  @config
         *
         *
         **/
        config: {

            group           : 0,
            maxDepth        : 6,
            listNodeName    : 'ol',
            itemNodeName    : 'li',
            rootClass       : 'dd',
            listClass       : 'dd-list',
            itemClass       : 'dd-item',
            dragClass       : 'dd-dragel',
            handleClass     : 'dd-handle',
            collapsedClass  : 'dd-collapsed',
            placeClass      : 'dd-placeholder',
            noDragClass     : 'dd-nodrag',
            emptyClass      : 'dd-empty',
            expandBtnHTML   : '<button data-action="expand" type="button" aria-label="expand"></button>',
            collapseBtnHTML : '<button data-action="collapse" type="button" aria-label="collapse"></button>',
            maxDepth        : 5,
            threshold       : 0,

            // ajax params
            headers         : '',
            crossDomain     : '',
            method          : 'POST',
            contentType     : 'application/x-www-form-urlencoded; charset=UTF-8', // jQuery default
            dataType        : '', // 'json', 'html', 'text'
            headers         : '',
            crossDomain     : '',
            data_params     : {ajax:'true'},
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

            // Check Vendor ; dymanically load if missing (should be external)
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            if(selector != '') {
                if(jQuery(selector).length < 1)
                    return null;
            }

            if (!jQuery().nestable) {

                var paths = $.SOW.helper.vendorLogicPaths('nestable');
                if(paths['path_js'] == '') {
                    $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                    return null;
                }

                $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

                    if (!jQuery().nestable) {
                        $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                        return null;
                    }

                    // self reinit, external js loaded!
                    $.SOW.vendor.nestable.init(selector, config);
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


            // reset (ajax needed)
            window.nestableLastUpdate = {};

            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --


            // 1. Has no selector
            if(!this.selector) {
                $.SOW.vendor.nestable.process($('.nestable'));
                return $('.nestable');
            }

            // 2. Has selector
            return this.collection.each(function() {
                
                $.SOW.vendor.nestable.process($(this));

            });

        },



        /**
         *
         *  @process
         *
         *
         **/
        process: function(_this) {

            if(_this.hasClass('js-nestablified'))
                return;

            var nestableID              = _this.attr('id')                                  || '',
                _delWithChilds          = _this.data('nestable-delete-with-childs')         || "false",
                _maxDepth               = _this.data('nestable-max-depth')                  || 6,
                _rand                   = $.SOW.helper.randomStr(3, 'N'),
                nestableGroup           = _this.data('nestable-group')                      || _rand,
                config                  = $.SOW.vendor.nestable.config;


            _this.addClass('js-nestablified');


            // overwrite defaults
            config.group    = nestableGroup;
            config.maxDepth = Number(_maxDepth) || 6;



            // Add random ID if doesn't one
            if(nestableID == '') {
                nestableID = 'rand_' +_rand;
                _this.attr('id', nestableID);
            }


            // Init Nestable
            $('#'+nestableID).nestable(config).on('change', function(e) {

                // Update Output
                var _json = window.JSON.stringify(_this.nestable('serialize'));
                jQuery('textarea', _this).val(_json);

                // Ajax Update [avoid updating exactly the same]
                if(window.nestableLastUpdate[nestableID] != _json)
                    $.SOW.vendor.nestable.updateOrder(_this, e);

                // save last change
                window.nestableLastUpdate[nestableID] = _json;
            });



            // Update Output on load
            var _json = window.JSON.stringify(_this.nestable('serialize'));
            jQuery('textarea', _this).val(_json);
            window.nestableLastUpdate[nestableID] = _json;


            // Bind remove item
            $.SOW.vendor.nestable.removeItem(_this);

        },




        /**
         *
         *  @updateOrder
         *
         *
         **/
        updateOrder: function(_this, e) {

            var _updateParams           = _this.data('ajax-update-params')          || '',
                _updateUrl              = _this.data('ajax-update-url')             || '',
                _updateMethod           = _this.data('ajax-update-method')          || $.SOW.vendor.nestable.config.method,
                _updateToastSuccess     = _this.data('update-toast-success')        || 'Order Saved!',
                _updateToastPosition    = _this.data('update-toast-position')       || 'bottom-center',
                data_params             = $.SOW.vendor.nestable.config.data_params;

            if(_updateUrl == '')
                return;

            var list            = e.length ? e : $(e.target);
            var _serialized     = (window.JSON.stringify(list.nestable('serialize')));
            var _array          = JSON.parse(_serialized);

            if(_updateParams != '') {

                var ajax_params_arr = $.SOW.helper.params_parse(_updateParams);
                for (var i = 0; i < ajax_params_arr.length; ++i) {
                    data_params[ajax_params_arr[i][0]] = ajax_params_arr[i][1];
                }

            }


            // add data
            data_params.array       = _array;
            data_params.serialized  = _serialized;


            // UPDATE ORDER VIA AJAX
            jQuery.ajax({
                url:            _updateUrl,
                data:           data_params,
                type:           _updateMethod,
                contentType:    $.SOW.vendor.nestable.config.contentType,
                dataType:       $.SOW.vendor.nestable.config.dataType,
                headers:        $.SOW.vendor.nestable.config.headers,
                crossDomain:    $.SOW.vendor.nestable.config.crossDomain,

                beforeSend: function() {

                    // Add Ajax Loading Block
                    _this.prepend('<div class="nestableOverlayLoading d-middle overlay-light overlay-opacity-5 absolute-full z-index-1"><i class="'+$.SOW.config.sow__icon_loading+' fs--30 text-muted"></i></div>');

                },

                error:  function(XMLHttpRequest, textStatus, errorThrown) {

                    if(typeof $.SOW.core.toast === 'object') {
                        $.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', _updateToastPosition, 0, true);
                    } else {
                        alert("[404] Unexpected internal error!");
                    }

                    jQuery('.nestableOverlayLoading', _this).remove();

                },

                success: function(data) {
                    
                    $.SOW.helper.consoleLog(data);

                    jQuery('.nestableOverlayLoading', _this).remove();
                    if(typeof $.SOW.core.toast === 'object')
                        $.SOW.core.toast.show('success', '', _updateToastSuccess, _updateToastPosition, 1500, true);

                    // required
                    $.SOW.vendor.nestable.removeItem(_this);

                }
            });


        },



        removeItem: function(_this) {


            var _delWithChilds          = _this.data('update-delete-with-childs')           || 'false',
                _delWithChildsError     = _this.data('update-delete-with-childs-error')     || 'Move or delete childs first!',
                _toastPos               = _this.data('update-toast-position')               || 'bottom-center',
                _deleteParams           = _this.data('update-delete-params')                || '',
                _updateMethod           = _this.data('ajax-update-method')                  || $.SOW.vendor.nestable.config.method,
                _updateUrl              = _this.data('ajax-update-url')                     || '',
                _confirmBeforeDelete    = _this.data('update-delete-confirm-first')         || 'false',
                _confirmSelector        = (typeof $.SOW.core.ajax_confirm === 'object') ? $.SOW.core.ajax_confirm.__selector() : '',
                _confirmSelectorClass   = _confirmSelector.replace('.',''),
                data_params             = $.SOW.vendor.nestable.config.data_params;

            var _modal_confirm_size = _this.data('ajax-confirm-size')               || '',      // modal-sm, modal-md, modal-lg , modal-full
                _modal_centered     = _this.data('ajax-confirm-centered')           || '',      // true|false
                _confirmCallback    = _this.data('ajax-confirm-callback-function')  || '',      // custom function
                _confirmType        = _this.data('ajax-confirm-type')               || '',      // confirmation type: danger|warning|etc. empty for normal/clean
                _confirmMode        = _this.data('ajax-confirm-mode')               || '',      // confirmation type: regular|ajax
                _confirmMethod      = _this.data('ajax-confirm-method')             || '',      // confirmation method: GET|POST

                _confirmTitle       = _this.data('ajax-confirm-title')              || '',      // modal title
                _confirmBody        = _this.data('ajax-confirm-body')               || '',      // message | question
                
                _confirmBtnYesTxt   = _this.data('ajax-confirm-btn-yes-text')       || '',      // button text
                _confirmBtnYesClass = _this.data('ajax-confirm-btn-yes-class')      || '',      // button class
                _confirmBtnYesIcon  = _this.data('ajax-confirm-btn-yes-icon')       || '',      // button icon. eg: fi fi-check

                _confirmBtnNoTxt    = _this.data('ajax-confirm-btn-no-text')        || '',      // button text
                _confirmBtnNoClass  = _this.data('ajax-confirm-btn-no-class')       || '',      // button class
                _confirmBtnNoIcon   = _this.data('ajax-confirm-btn-no-icon')        || '';      // button icon. eg: fi fi-check


            jQuery('a.nestable-del', _this).off().on('click', function(e) {
                e.preventDefault();

                var _t                  = jQuery(this),
                    _li                 = _t.closest('li'),
                    _id                 = _li.attr('data-id'),              // item id (should be the database item id)
                    _href               = _t.attr('href')       || '#',
                    _href_data          = _t.data('href')       || '',
                    _href_data2         = _t.data('href2')      || '',
                    _childs             = [],
                    _stopScript         = false;


                // because of confirm plugin!
                if(_href == '#' && _href == '' && _href == 'javascript:;') {
                    _t.attr('href', '#');
                    _t.attr('data-href2', _href);
                }

                if(_href_data != '') {
                    var _href = _href_data;

                    // because of confirm plugin!
                    _t.removeAttr('data-href');
                    _t.attr('data-href2', _href);
                }

                if(_href_data2 != '')
                    var _href = _href_data2;



                // We use href. If href is empty (#), the we use _updateUrl
                // the same with reorder!
                if(_href == '#' || _href == '' || _href == 'javascript:;') {
                    var _orig_href = _href; // to print info on success
                    var _href = _updateUrl;
                }



                // Check delete
                if(_delWithChilds+'' == 'false') {

                    if(jQuery('ol.dd-list', _li).length > 0) {
                        // e.stopPropagation();

                        if(typeof $.SOW.core.toast === 'object') {
                            $.SOW.core.toast.destroy();
                            $.SOW.core.toast.show('danger', '', _delWithChildsError, _toastPos, 4000, true);
                        } else {
                            alert(_delWithChildsError);
                        }

                        _t.removeClass('js-ajax-modal js-modalified');
                        return;
                    }

                }


                

                




                // Ajax Modal/Confirm -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
                if(_t.hasClass('nestable-ajax-modal')) {

                    if(typeof $.SOW.core.ajax_modal === 'object')
                        $.SOW.core.ajax_modal.attach(_t, 0);
                    else alert('[SOW : Ajax Modal] plugin not found!');

                } else {

                    if(typeof $.SOW.core.ajax_confirm === 'object') {

                        if(_confirmBeforeDelete+'' == 'true' && !_t.hasClass(_confirmSelectorClass) && !_t.hasClass('js-confirmed')) {

                            _t.attr('data-ajax-confirm-size', _modal_confirm_size);
                            _t.attr('data-ajax-confirm-centered', _modal_centered);
                            _t.attr('data-ajax-confirm-callback-function', _confirmCallback);
                            _t.attr('data-ajax-confirm-type', _confirmType);
                            _t.attr('data-ajax-confirm-mode', _confirmMode);
                            _t.attr('data-ajax-confirm-method', _confirmMethod);
                            _t.attr('data-ajax-confirm-title', _confirmTitle);
                            _t.attr('data-ajax-confirm-body', _confirmBody);
                            _t.attr('data-ajax-confirm-btn-yes-text', _confirmBtnYesTxt);
                            _t.attr('data-ajax-confirm-btn-yes-class', _confirmBtnYesClass);
                            _t.attr('data-ajax-confirm-btn-yes-icon', _confirmBtnYesIcon);
                            _t.attr('data-ajax-confirm-btn-no-text', _confirmBtnNoTxt);
                            _t.attr('data-ajax-confirm-btn-no-class', _confirmBtnNoClass);
                            _t.attr('data-ajax-confirm-btn-no-icon', _confirmBtnNoIcon);

                            _t.addClass(_confirmSelectorClass+' js-nestable-confirmation-pending');
                            $.SOW.core.ajax_confirm.init(_confirmSelector);
                            $.SOW.core.ajax_confirm.ajax_confirm(_t);
                            _t.trigger('click'); // submit

                            setTimeout(function() {
                                _t.removeClass(_confirmSelectorClass);

                                jQuery('#sow_ajax_confirm .btn-confirm-yes').not('js-nestablified').addClass('js-nestablified').on('click', function(e) {
                                    e.preventDefault();

                                    _t.addClass('js-confirmed');
                                    _t.removeClass('js-nestable-confirmation-pending');     // 1. remove pending class
                                    _t.removeClass(_confirmSelectorClass);                  // 2. remove confirm class
                                    _t.trigger('click');                                    // 3. submit again
                                });

                            },100);

                            return;
                        } 

                    } else {

                        if(confirm(_confirmBody) === false) {
                            return;
                        } else {
                            _t.addClass('js-confirmed');
                        }

                    } 

                } // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
                if(_t.hasClass('js-nestable-confirmation-pending')) 
                    return;

                if(_confirmBeforeDelete+'' == 'true' && !_t.hasClass('js-confirmed'))
                    return;



                if(_deleteParams != '') {

                    var ajax_params_arr = $.SOW.helper.params_parse(_deleteParams);
                    for (var i = 0; i < ajax_params_arr.length; ++i) {
                        data_params[ajax_params_arr[i][0]] = ajax_params_arr[i][1];
                    }

                }

                // Get all childs
                jQuery('li', _li).each(function() {
                    _childs.push(jQuery(this).data('id') || 0);
                });

                // Add item id
                data_params.id      = _id;
                data_params.childs  = _childs;
                data_params.info    = 'Info: `id` = the id to delete! `childs` = childs of this id! (if data-update-delete-with-childs="true")';

                // UPDATE ORDER VIA AJAX
                jQuery.ajax({
                    url:            _href,
                    data:           data_params,
                    type:           _updateMethod,
                    contentType:    $.SOW.vendor.nestable.config.contentType,
                    dataType:       $.SOW.vendor.nestable.config.dataType,
                    headers:        $.SOW.vendor.nestable.config.headers,
                    crossDomain:    $.SOW.vendor.nestable.config.crossDomain,

                    beforeSend: function() {

                        // Add Ajax Loading Block
                        _this.prepend('<div class="nestableOverlayLoading d-middle overlay-light overlay-opacity-5 absolute-full z-index-1"><i class="'+$.SOW.config.sow__icon_loading+' fs--30 text-muted"></i></div>');

                    },

                    error:  function(XMLHttpRequest, textStatus, errorThrown) {

                        if(typeof $.SOW.core.toast === 'object') {
                            $.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', 'bottom-center', 0, true);
                        } else {
                            alert("[404] Unexpected internal error!");
                        }

                        jQuery('.nestableOverlayLoading', _this).remove();

                    },

                    success: function(data) {
                        
                        $.SOW.helper.consoleLog(data);

                        jQuery('.nestableOverlayLoading', _this).remove();

                        // Remove node, with style :)
                        _li.addClass('bg-danger-soft transition-all-ease-150');
                        setTimeout(function() {

                            // get remaining items
                            var _thisNode   = _t.closest('ol.dd-list');
                            var _parentNode = _thisNode.closest('li.dd-item');

                            _li.fadeOut(150, function() {
                                _li.remove();

                                // check for remaining childs, else remove main node
                                if(jQuery('.dd-item', _thisNode).length < 1) {
                                    jQuery('button', _parentNode).remove();
                                    _thisNode.remove();
                                }

                            });

                        },150);

                        // Info only!
                        if(_orig_href == '#' || _orig_href == '' || _orig_href == 'javascript:;')
                            $.SOW.helper.consoleLog('[Nestable Delete Item] : [ajax-update-method] used to POST data because href="'+_href+'"');


                    }
                });


            });

        }


    };


})(jQuery);