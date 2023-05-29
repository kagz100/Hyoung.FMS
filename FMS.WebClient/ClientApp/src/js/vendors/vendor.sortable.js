/**
 *
 *  [SOW] Sortable
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependencies   -
 *  @Usage          $.SOW.vendor.sortable.init('.sortable');
 *                  $.SOW.vendor.sortable.process($('.my_element'));
 *
 *  @Ajax Support   YES
 *
 *  Vendor:         https://github.com/SortableJS/Sortable
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
    var scriptInfo      = 'Vendor Sortable';


    $.SOW.vendor.sortable = {


        /**
         *
         *  @config
         *
         *
         **/
        config: {

            dataIdAttr:         'data-id', // used by ajax (as item/database id)
            handle:             '.sortable-handle',
            animation:          150,
            ghostClass:         'bg-primary-soft',
            chosenClass:        'bg-white-alt',
            swapClass:          'bg-warning-soft',
            filter:             '.js-ignore', // 'filtered' class is not draggable

            headers:            '',
            crossDomain:        '',

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

            if (typeof Sortable !== 'function') {

                var paths = $.SOW.helper.vendorLogicPaths('sortable')

                if(paths['path_js'] == '') {
                    $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                    return null;
                }

                $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

                    if (typeof Sortable !== 'function') {
                        $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                        return null;
                    }

                    // self reinit, external js loaded!
                    $.SOW.vendor.sortable.init(selector, config);
                    return null;

                });

                return null;
            }
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



            var __selector          = $.SOW.helper.__selector(selector);
            var __config            = $.SOW.helper.check_var(config);

            this.selector           = __selector[0];    // '#selector'
            this.collection         = __selector[1];    // $('#selector')
            this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;



            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --


            // 1. Has no selector
            if(!this.selector) {
                $.SOW.vendor.sortable.process($('.sortable'));
                return $('.sortable');
            }

            // 2. Has selector
            return this.collection.each(function() {
                
                $.SOW.vendor.sortable.process($(this));

            });

        },



        /**
         *
         *  @process
         *
         *
         **/
        process: function(_this) {

            if(_this.hasClass('js-sortablified'))
                return;

            var _id             = _this.attr('id')                  || '',
                _sharedGroup    = _this.data('shared-group')        || '',
                _pullMode       = _this.data('pull-mode')           || '', // 'clone'
                _putDenied      = _this.data('put-denied')          || 'false',
                _sortableType   = _this.data('sortable-type')       || '', // 'nested'
                _sortDisable    = _this.data('sort-disable')        || 'false',
                _sortSwap       = _this.data('sort-swap')           || 'false',
                _swapThreshold  = _this.data('swap-treshold')       || '',
                _hasHandle      = jQuery($.SOW.vendor.sortable.config.handle, _this).length || 0;

            _this.addClass('js-sortablified');


            if(_id == '') {
                var _id = 'strand_' + $.SOW.helper.randomStr(3);
                _this.attr('id', _id);
            }

            var _config = {
                dataIdAttr:         $.SOW.vendor.sortable.config.dataIdAttr || 'data-id',
                handle:             (_hasHandle > 0) ? $.SOW.vendor.sortable.config.handle : null,
                animation:          $.SOW.vendor.sortable.config.animation,
                ghostClass:         $.SOW.vendor.sortable.config.ghostClass,
                chosenClass:        $.SOW.vendor.sortable.config.chosenClass,
                swapClass:          $.SOW.vendor.sortable.config.swapClass,
                filter:             $.SOW.vendor.sortable.config.filter, // 'filtered' class is not draggable

                onUpdate: function (evt) {

                    var items = sortable.toArray();
                    $.SOW.vendor.sortable.sortable__update_order(_this, items);

                }

            };

            // shared|cloning lists
            if(_sharedGroup != '') {

                if(_pullMode == '')
                    _config.group = _sharedGroup;

                else if(_pullMode != '') {

                    _config.group = {
                        name: _sharedGroup,
                        pull: _pullMode, // 'clone'
                        put: (_putDenied+'' == 'true') ? false : true,
                    }

                }

            }

            // disable sorting
            if(_sortDisable+'' == 'true')
                _config.sort = false;

            // trshold
            if(_swapThreshold != '')
                _config.swapThreshold = swapThreshold;

            // nested
            if(_sortableType.toLowerCase() == 'nested') {
                _config.group           = 'nested';
                _config.fallbackOnBody  = true;
                _config.swapThreshold   = 0.65;
            }

            if(_sortSwap+'' == 'true') {
                _config.swap = true;
            }

            var el = document.getElementById(_id);
            var sortable = new Sortable(el, _config);

        },



        sortable__update_order: function(_this, items) {

            var _updateParams           = _this.data('ajax-update-params')          || '',
                _updateUrl              = _this.data('ajax-update-url')             || '',
                _updateIdentifier       = _this.data('ajax-update-identifier')      || '',
                _updateToastSuccess     = _this.data('update-toast-success')        || 'Order Saved!',
                _updateToastPosition    = _this.data('update-toast-position')       || 'bottom-center';

            if(_updateUrl == '')
                return;

            var formData = new FormData();
                formData.append('action', 'reorder');
                formData.append('ajax', 'true');
                formData.append('identifier', _updateIdentifier);

            if(_updateParams != '') {

                var ajax_params_arr = $.SOW.helper.params_parse(_updateParams);
                for (var i = 0; i < ajax_params_arr.length; ++i) {
                    formData.append(ajax_params_arr[i][0], ajax_params_arr[i][1]);
                }

            }

            for (var i = 0; i < items.length; ++i) {
                formData.append('items[]', items[i]);
            }



            $.ajax({
                url:            _updateUrl,
                cache:          false,
                contentType:    false,
                processData:    false,
                data:           formData,
                type:           'POST',
                headers:        $.SOW.vendor.sortable.headers,
                crossDomain:    $.SOW.vendor.sortable.crossDomain,

                beforeSend: function() {

                    
                },

                success: function (data) {

                    $.SOW.helper.consoleLog(data);

                    if(typeof $.SOW.core.toast === 'object' && _updateToastSuccess != '')
                        $.SOW.core.toast.show('success', '', _updateToastSuccess, _updateToastPosition, 1800, true);

                },

                error: function (data) {

                    $.SOW.helper.consoleLog(data);

                    if(typeof $.SOW.core.toast === 'object') {
                        $.SOW.core.toast.show('danger', '', '404 Server Error!', _updateToastPosition, 4000, true);
                    } else {
                        alert('404 Server Error!');
                    }

                },

            });

        }

    };


})(jQuery);