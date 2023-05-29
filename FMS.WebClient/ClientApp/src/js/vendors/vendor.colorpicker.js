/**
 *
 *  [SOW] Color Picker
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependencies   -
 *  @Usage          $.SOW.vendor.colorpicker.init('.colorpicker');
 *
 *  @Ajax Support   YES
 *
 *  Vendor:         https://github.com/Simonwep/pickr
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
    var scriptInfo              = 'Vendor Color Picker';
    var pickrInstance           = [];

    $.SOW.vendor.colorpicker = {


        /**
         *
         *  @config
         *
         *
         **/
        config: {

            classic: {

                swatches: [
                    'rgba(244, 67, 54, 1)',
                    'rgba(233, 30, 99, 0.95)',
                    'rgba(156, 39, 176, 0.9)',
                    'rgba(103, 58, 183, 0.85)',
                    'rgba(63, 81, 181, 0.8)',
                    'rgba(33, 150, 243, 0.75)',
                    'rgba(3, 169, 244, 0.7)',
                    'rgba(0, 188, 212, 0.7)',
                    'rgba(0, 150, 136, 0.75)',
                    'rgba(76, 175, 80, 0.8)',
                    'rgba(139, 195, 74, 0.85)',
                    'rgba(205, 220, 57, 0.9)',
                    'rgba(255, 235, 59, 0.95)',
                    'rgba(255, 193, 7, 1)'
                ],

            },

            monolith: {

                swatches: [
                    'rgba(244, 67, 54, 1)',
                    'rgba(233, 30, 99, 0.95)',
                    'rgba(156, 39, 176, 0.9)',
                    'rgba(103, 58, 183, 0.85)',
                    'rgba(63, 81, 181, 0.8)',
                    'rgba(33, 150, 243, 0.75)',
                    'rgba(3, 169, 244, 0.7)'
                ],

            },


            nano: {

                swatches: [
                    'rgba(244, 67, 54, 1)',
                    'rgba(233, 30, 99, 0.95)',
                    'rgba(156, 39, 176, 0.9)',
                    'rgba(103, 58, 183, 0.85)',
                    'rgba(63, 81, 181, 0.8)',
                    'rgba(33, 150, 243, 0.75)',
                    'rgba(3, 169, 244, 0.7)'
                ],

            },

            // overwritten via attributes (ex: data-hex="false")
            interaction: {
                hex: true,
                rgba: true,
                hsla: false,
                hsva: false,
                cmyk: false,
                input: true,
                clear: true,
                save: true
            },


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

            var __selector          = $.SOW.helper.__selector(selector);
            var __config            = $.SOW.helper.check_var(config);

            this.selector           = __selector[0];    // '#selector'
            this.collection         = __selector[1];    // $('#selector')
            this.selector_orig      = __selector[2];    // $('#selector') // without ajax container prefix
            this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;


            // Check Vendor ; dymanically load if missing (should be external)
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            if(selector != '') {
                if(jQuery(selector).length < 1)
                    return null;
            }

            if (typeof Pickr !== 'function') {

                var paths = $.SOW.helper.vendorLogicPaths('colorpicker');
                if(paths['path_js'] == '') {
                    $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                    return null;
                }

                $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

                    if (typeof Pickr !== 'function') {
                        $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                        return null;
                    }

                    // self reinit, external js loaded!
                    $.SOW.vendor.colorpicker.init(selector, config);
                    return null;

                });

                return null;
            }
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --


            // 1. Has no selector
            if(!this.selector) {
                $.SOW.vendor.colorpicker.process($('.colorpicker'));
                return $('.colorpicker');
            }

            // 2. Has selector
            return this.collection.each(function() {
                
                $.SOW.vendor.colorpicker.process($(this));

            });

        },





        /**
         *
         *  @process
         *
         *
         **/
        process: function(_this) {

            if(_this.hasClass('js-colorpickified'))
                return;

            var target                  = _this.data('target') || _this.data('bs-target') || '',
                theme                   = _this.data('theme')                       || 'classic',
                liveUpdate              = _this.data('live-update')                 || false,
                position                = _this.data('position')                    || 'bottom-middle',
                showAlways              = _this.attr('data-show-always')            || false,
                inline                  = _this.attr('data-inline')                 || false,
                appClass                = _this.data('app-class')                   || 'rounded',
                useAsButton             = _this.attr('data-use-as-button')          || false,
                defaultRepresentation   = _this.data('default')                     || 'HEXA',
                defaultColor            = _this.data('color')                       || '#42445a',
                lngSave                 = _this.data('lng-save')                    || 'Save',
                lngClear                = _this.data('lng-clear')                   || 'Clear',
                lngCancel               = _this.data('lng-cancel')                  || 'Cancel',

                __hex                   = _this.attr('data-hex')                    || $.SOW.vendor.colorpicker.config.interaction.hex,
                __rgba                  = _this.attr('data-rgba')                   || $.SOW.vendor.colorpicker.config.interaction.rgba,
                __hsla                  = _this.attr('data-hsla')                   || $.SOW.vendor.colorpicker.config.interaction.hsla,
                __hsva                  = _this.attr('data-hsva')                   || $.SOW.vendor.colorpicker.config.interaction.hsva,
                __cmyk                  = _this.attr('data-cmyk')                   || $.SOW.vendor.colorpicker.config.interaction.cmyk,
                
                __input                 = _this.attr('data-input')                  || $.SOW.vendor.colorpicker.config.interaction.input,
                __clear                 = _this.attr('data-clear')                  || $.SOW.vendor.colorpicker.config.interaction.clear,
                __save                  = _this.attr('data-save')                   || $.SOW.vendor.colorpicker.config.interaction.save;

            _this.addClass('js-colorpickified');

            var _rand = $.SOW.helper.randomStr(3, 'L');
            var _randClass = 'rand_'+_rand;
                _this.addClass(_randClass);

            if(target == '')
                var target = '.'+_randClass;

            if(jQuery('input.pcr-result-final').length < 1)
                jQuery('body').append('<input type="hidden" class="pcr-result-final" val="">');

            // Delete previous instance
            // if(pickr) {
            //     pickr.destroyAndRemove();
            // }


            // fix last update
            if(inline+'' == 'true') 
                showAlways = 'true';




            // Simple example, see optional options for more configuration.
            pickrInstance[_rand] = Pickr.create({
            
                el:     '.'+_randClass,
                theme:  theme,

                // Default color
                default: defaultColor,

                // Defines the position of the color-picker.
                // Any combinations of top, left, bottom or right with one of these optional modifiers: start, middle, end
                // Examples: top-start / right-end
                // If clipping occurs, the color picker will automatically choose its position.
                position: position,

                // Option to keep the color picker always visible.
                // You can still hide / show it via 'pickr.hide()' and 'pickr.show()'.
                // The save button keeps its functionality, so still fires the onSave event when clicked.
                showAlways: (showAlways+'' == 'true') ? true : false,

                // If true pickr won't be floating, and instead will append after the in el resolved element.
                // Setting this to true will also set showAlways to true. It's possible to hide it via .hide() anyway.
                inline: (inline+'' == 'true') ? true : false,

                // Custom class which gets added to the pcr-app. Can be used to apply custom styles.
                appClass: appClass,

                // Don't replace 'el' Element with the pickr-button, instead use 'el' as a button.
                // If true, appendToBody will also be automatically true.
                useAsButton: (useAsButton+'' == 'true') ? true : false,

                defaultRepresentation:  defaultRepresentation,
                swatches:               $.SOW.vendor.colorpicker.config['classic']['swatches'],
                components:             {

                                        // Main components
                                        preview: true,
                                        opacity: true,
                                        hue: true,

                                        // Input / output Options
                                        interaction: {
                                            hex:    (__hex+'' == 'false')   ? false : true,
                                            rgba:   (__rgba+'' == 'false')  ? false : true,
                                            hsla:   (__hsla+'' == 'false')  ? false : true,
                                            hsva:   (__hsva+'' == 'false')  ? false : true,
                                            cmyk:   (__cmyk+'' == 'false')  ? false : true,

                                            input:  (__input+'' == 'false') ? false : true,
                                            clear:  (__clear+'' == 'false') ? false : true,
                                            save:   (__save+'' == 'false')  ? false : true
                                        }
                },

                strings: {
                    save:       lngSave,        // Default for save button
                    clear:      lngClear,       // Default for clear button
                    cancel:     lngCancel       // Default for cancel button
                }

            }).on('init', function(instance) {
                // console.log('init', instance);

                // Simple Styling
                jQuery('.pcr-result, .pcr-type, .pcr-save, .pcr-clear').addClass('rounded');
                

                // SAVE - because of multiple pickers bug!!!
                jQuery('.pcr-save').on('click', function() {
                    var _container = jQuery(this).parents('.pcr-interaction');
                    var _exactOutput = jQuery('.pcr-result', _container).val();
                    jQuery('.pcr-result-final').val(_exactOutput);
                });

            }).on('hide', function(instance) {
                // console.log('hide', instance);

                if(__save+'' == 'false') {

                    var _exactOutput =  jQuery('.pcr-result').val();
                    $.SOW.vendor.colorpicker.updateAjax(_this, _exactOutput);
                    
                    if(target) {
                        jQuery('input' + target).val(_exactOutput);
                        jQuery('div' + target + ', span' + target).text(_exactOutput);
                    }

                }

            }).on('show', function(color, instance) {
                // console.log('show', color, instance);

                if(liveUpdate+'' == 'true') {

                    var _exactOutput = jQuery('.pcr-result').val();
                    if(target) {
                        jQuery('input' + target).val(_exactOutput);
                        jQuery('div' + target + ', span' + target).text(_exactOutput);
                    }

                }

            }).on('save', function(color, instance) {
                // console.log('save', color, instance);

                /**
                    var _hexa   = pickr.getColor().toHEXA();
                    var _rgb    = _hexa.join(',');
                    var _hex    = pickr.getColor().toHEXA().toString();
                **/

                setTimeout(function() {

                    var _exactOutput = jQuery('.pcr-result-final').val();
                    $.SOW.vendor.colorpicker.updateAjax(_this, _exactOutput);

                    if(target) {
                        jQuery('input' + target).val(_exactOutput);
                        jQuery('div' + target + ', span' + target).text(_exactOutput);
                    }

                    jQuery('.pcr-result-final').val('');
                    
                },200);

            }).on('clear', function(instance) {
                // console.log('clear', instance);

                if(target) {
                    jQuery('input' + target).val('');
                    jQuery('div' + target + ', span' + target).text('');
                }

            }).on('change', function(color, instance) {
                // console.log('change', color, instance);
                
                if(liveUpdate+'' == 'true') {

                    var _exactOutput = jQuery('.pcr-result').val();

                    if(window.afterPickChange)
                        clearTimeout(window.afterPickChange);

                    window.afterPickChange = setTimeout(function() {

                        $.SOW.vendor.colorpicker.updateAjax(_this, _exactOutput);

                    }, 1500);


                    if(target) {
                        jQuery('input' + target).val(_exactOutput);
                        jQuery('div' + target + ', span' + target).text(_exactOutput);
                    }

                }

            }).on('changestop', function(instance) {
                // console.log('changestop', instance);
            }).on('cancel', function(instance) {
                // console.log('cancel', instance);
            }).on('swatchselect', function(color, instance) {
                // console.log('swatchselect', color, instance);
            });


            return pickrInstance[_rand];
        },






        /**
         *
         *  @updateAjax
         *
         *
         **/
        updateAjax: function(_this, _exactOutput) {

            var _updateMethod           = _this.data('ajax-method')                     || $.SOW.vendor.colorpicker.config.method,
                _updateUrl              = _this.data('ajax-url')                        || '',
                _updateParams           = _this.data('ajax-params')                     || '',
                _toastSuccessMsg        = _this.data('toast-success')                   || 'Sucessfully Updated!',
                _toastPosition          = _this.data('toast-position')                  || 'top-center',
                _itemID                 = _this.data('id')                              || '',
                data_params             = $.SOW.vendor.colorpicker.config.data_params;


            if(_updateUrl == '')
                return;


            if(_updateParams != '') {

                var ajax_params_arr = $.SOW.helper.params_parse(_updateParams);
                for (var i = 0; i < ajax_params_arr.length; ++i) {
                    data_params[ajax_params_arr[i][0]] = ajax_params_arr[i][1];
                }

            }

            // Add item id
            data_params.id                  = _itemID;
            data_params.color               = _exactOutput;


            // UPDATE ORDER VIA AJAX
            jQuery.ajax({
                url:            _updateUrl,
                data:           data_params,
                type:           _updateMethod,
                contentType:    $.SOW.vendor.colorpicker.config.contentType,
                dataType:       $.SOW.vendor.colorpicker.config.dataType,
                headers:        $.SOW.vendor.colorpicker.config.headers,
                crossDomain:    $.SOW.vendor.colorpicker.config.crossDomain,

                beforeSend: function() {},

                error:  function(XMLHttpRequest, textStatus, errorThrown) {

                    if(typeof $.SOW.core.toast === 'object') {
                        $.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', _toastPosition, 0, true);
                    } else {
                        alert("[404] Unexpected internal error!");
                    }

                },

                success: function(data) {

                    $.SOW.helper.consoleLog(data);

                    setTimeout(function() {

                    if(typeof $.SOW.core.toast === 'object')
                        $.SOW.core.toast.show('success', '', _toastSuccessMsg, _toastPosition, 1300, true);

                    },150);

                }
            });



            return;

        },




        /**
         *
         *  @forceInit
         *
         *
         **/
        forceInit: function() {

            var pickSelector = this.selector_orig.replace('.','');

            if(jQuery('#forceColorPickrInit').length > 0)
                return pickSelector;

            jQuery('body').append('<div id="forceColorPickrInit" class="hide-force"><div class=""></div></div>');
            jQuery('#forceColorPickrInit>div').addClass(pickSelector);
            $.SOW.vendor.colorpicker.init(this.selector_orig);

            return pickSelector;
        },




        /**
         *
         *  @Return Selector
         *
         *
         **/
        __selector: function() {
            return this.selector_orig;
        }

    };


})(jQuery);