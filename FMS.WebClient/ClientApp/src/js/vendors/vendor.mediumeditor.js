/**
 *
 *  [SOW] Medium Editor
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependencies   -
 *  @Usage          $.SOW.vendor.mediumeditor.init('.medium-editor');
 *
 *  @Ajax Support   YES
 *
 *  Vendor:         https://github.com/yabwe/medium-editor
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
    var scriptInfo                  = 'Vendor Medium Editor';
    var mediumEditor                = [];

    $.SOW.vendor.mediumeditor = {


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

            if (typeof MediumEditor !== 'function') {

                var paths = $.SOW.helper.vendorLogicPaths('mediumeditor');
                if(paths['path_js'] == '') {
                    $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                    return null;
                }

                $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

                    if (typeof MediumEditor !== 'function') {
                        $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                        return null;
                    }

                    // self reinit, external js loaded!
                    $.SOW.vendor.mediumeditor.init(selector, config);
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
                $.SOW.vendor.mediumeditor.process($('.medium-editor'));
                return $('.medium-editor');
            }

            // 2. Has selector
            return this.collection.each(function() {
                
                $.SOW.vendor.mediumeditor.process($(this));

            });

        },



        /**
         *
         *  @process
         *
         *
         **/
        process: function(_this) {

            if(_this.hasClass('js-mediumified'))
                return;


            // VALIDATE
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
            if(_this.attr('required')) {

                var _form = _this.parents('form.bs-validate');
                if(_form.length > 0) {
                    _form.submit(function() {

                        if(_this.val() == '') {
                            _this.parent().find('div.medium-editor').addClass('is-invalid');
                        } else {
                            _this.parent().find('div.medium-editor').removeClass('is-invalid').addClass('is-valid');
                        }

                    });
                }

            }
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --




            var ID                      = _this.attr('id')                          || '',
                lngSave                 = _this.data('lng-save')                    || 'Save',
                lngClear                = _this.data('lng-clear')                   || 'Clear',
                lngCancel               = _this.data('lng-cancel')                  || 'Cancel',
                lngLink                 = _this.data('lng-link')                    || 'Paste or type a link',

                btnPicker               = _this.attr('data-btn-picker')             || 'true',
                btnBold                 = _this.attr('data-btn-bold')               || 'true',
                btnItalic               = _this.attr('data-btn-italic')             || 'true',
                btnUnderline            = _this.attr('data-btn-underline')          || 'true',
                btnLink                 = _this.attr('data-btn-link')               || 'true',
                btnH1                   = _this.attr('data-btn-h1')                 || 'true',
                btnH2                   = _this.attr('data-btn-h2')                 || 'true',
                btnH3                   = _this.attr('data-btn-h3')                 || 'true',
                btnH4                   = _this.attr('data-btn-h4')                 || 'true',
                btnH5                   = _this.attr('data-btn-h5')                 || 'true',
                btnH6                   = _this.attr('data-btn-h6')                 || 'true',
                btnUnordered            = _this.attr('data-btn-unordered')          || 'true',
                btnOrdered              = _this.attr('data-btn-ordered')            || 'true';

            if(ID == '') {
                var ID = 'rand_'+$.SOW.helper.randomStr(3);
                    _this.attr('id', ID);
            }

            _this.addClass('js-mediumified');
            mediumEditor[ID];


            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
            if(typeof $.SOW.vendor.colorpicker !== 'object')
                var btnPicker = 'false';
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

            /** ********************************** MEDIUM COLOR PICKER ********************************* **/
            if(btnPicker+'' == 'true') {

                var currentTextSelection;

                // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
                if(typeof Pickr !== 'function')
                    var __selector = $.SOW.vendor.colorpicker.forceInit();


                /**
                * Gets the color of the current text selection
                */
                function getCurrentTextColor(){
                    return jQuery(mediumEditor[ID].getSelectedParentElement()).css('color');
                }

                /**
                 * Custom `color picker` extension
                 */
                var ColorPickerExtension = MediumEditor.extensions.button.extend({
                    name:   "colorPicker",
                    action: "applyForeColor",
                    aria:   "color picker",
                    contentDefault: '<i class="fi mdi-format_color_fill"></i>',

                    init: function() {

                        this.button = this.document.createElement('button');
                        this.button.classList.add('medium-editor-action');
                        this.button.innerHTML = '<i class="fi mdi-format_color_fill"></i>';
                        
                        //init spectrum color picker for this button
                        initPicker(this.button);
                        
                        //use our own handleClick instead of the default one
                        this.on(this.button, 'click', this.handleClick.bind(this));
                    },

                    handleClick: function (event) {

                        //keeping record of the current text selection
                        currentTextSelection = mediumEditor[ID].exportSelection();

                        //sets the color of the current selection on the color picker
                        // jQuery(this.button).pickr("set", getCurrentTextColor());
                        // jQuery(this.button).addClass(__selector).on('click', function(e) {
        
                        //  $.SOW.vendor.colorpicker.process(jQuery(this));

                        // });


                        jQuery(this.button).prepend('<span class="'+__selector+'"></span>');
                        setTimeout(function() {
                        
                            // $.SOW.vendor.colorpicker.init(__selector);
                            // jQuery(this.button).addClass(__selector);
                            // jQuery(this.button).remove();

                            window[ID] = Pickr.create({

                                el:             '.'+__selector,
                                theme:          'nano',
                                default:        (typeof window[ID].lastColor !== 'undefined') ? window[ID].lastColor : '#121212',
                                showAlways:     true,
                                inline:         false,
                                position:       'bottom-middle',
                                useAsButton:    true,
                                defaultRepresentation: 'HEXA',
                                closeWithKey:   'Escape',
                                autoReposition: true,
                                swatches:       [
                                    'rgba(244, 67, 54, 1)',
                                    'rgba(233, 30, 99, 1)',
                                    'rgba(156, 39, 176, 1)',
                                    'rgba(103, 58, 183, 1)',
                                    'rgba(63, 81, 181, 1)',
                                    'rgba(33, 150, 243, 1)',
                                    'rgba(3, 169, 244, 1)',
                                    'rgba(0, 188, 212, 1)',
                                    'rgba(0, 150, 136, 1)',
                                    'rgba(76, 175, 80, 1)',
                                    'rgba(139, 195, 74, 1)',
                                    'rgba(205, 220, 57, 1)',
                                    'rgba(255, 235, 59, 1)',
                                    'rgba(255, 193, 7, 1)'
                                                ],
                                components : {
                                    // Main components
                                    palette: true,
                                    preview: true,
                                    opacity: true,
                                    hue: true,
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

                                },

                                strings: {
                                    save:       lngSave,        // Default for save button
                                    clear:      lngClear,       // Default for clear button
                                    cancel:     lngCancel       // Default for cancel button
                                }


                            // }).on('init', instance => {
                            }).on('init', function(instance) {
                                // console.log('init', instance);

                                // Simple Styling
                                jQuery('.pcr-result, .pcr-type, .pcr-save, .pcr-clear').addClass('rounded');
                                

                            // }).on('hide', instance => {
                            }).on('hide', function(instance) {
                            
                                // console.log('hide', instance);
                            
                            // }).on('show', (color, instance) => {
                            }).on('show', function(color, instance) {
                                // console.log('show', color, instance);

                                jQuery('.pcr-app:not(.pcr-save):not(.pcr-cancel):not(.pcr-clear)').on('click', function(e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                });

                                jQuery(document).on('click', function() {
                                    window[ID].hide();
                                });

                            // }).on('save', (color, instance) => {
                            }).on('save', function(color, instance) {
                                // console.log('save', color, instance);
                               
                                var _hexa   = window[ID].getColor().toHEXA();
                                var _rgb    = _hexa.join(',');
                                var _hex    = window[ID].getColor().toHEXA().toString();
                                setColor(_hex);

                                window[ID].lastColor = _hex;
                                window[ID].hide();

                            // }).on('clear', instance => {
                            }).on('clear', function(instance) {
                                // console.log('clear', instance);
                                setColor('');
                            }).on('change', function(color, instance) {
                                // console.log('change', color, instance);
                            }).on('changestop', function(instance) {
                                // console.log('changestop', instance);
                            }).on('cancel', function(instance) {
                                // console.log('cancel', instance);
                            }).on('swatchselect', function(color, instance) {
                                // console.log('swatchselect', color, instance);
                            });

                        },100);



                        //from here on, it was taken form the default handleClick
                        event.preventDefault();
                        event.stopPropagation();

                        var action = this.getAction();

                        if (action) {
                            this.execAction(action);
                        }
                    }

                });

                var pickerExtension = new ColorPickerExtension();

                function setColor(color) {
                    var finalColor = color;

                    pickerExtension.base.importSelection(currentTextSelection);
                    pickerExtension.document.execCommand("styleWithCSS", false, true);

                    if(color == '') {
                        pickerExtension.document.execCommand("RemoveFormat");
                    } else {
                        pickerExtension.document.execCommand("foreColor", false, finalColor);
                    }
                }

                function initPicker(element) {




                }

            }
            /** ******************************** END MEDIUM COLOR PICKER ******************************* **/

            var __buttons = [{
                            name: 'colorPicker'
                            /* 
                                contentDefault is not available for color picker
                                see above if you want to change the icon
                             */
                    } /*{
                            name: 'quote',
                            contentDefault: '<i class="mdi mdi-format-quote-close"></i>', 
                        },*/ 

                    ];


            if(btnBold+'' == 'true') {
                __buttons.push({
                    name: 'bold',
                    contentDefault: '<b>B</b>'
                });
            }

            if(btnItalic+'' == 'true') {
                __buttons.push({ 
                    name: 'italic',
                    contentDefault: '<i>I</i>'
                });
            }

            if(btnUnderline+'' == 'true') {
                __buttons.push({ 
                    name: 'underline',
                    contentDefault: '<u>U</u>'
                });
            }

            if(btnLink+'' == 'true') {
                __buttons.push({
                    name: 'anchor',
                    contentDefault: '<i class="fi fi-link"></i>'
                });
            }

            if(btnH1+'' == 'true') __buttons.push('h1');
            if(btnH2+'' == 'true') __buttons.push('h2');
            if(btnH3+'' == 'true') __buttons.push('h3');
            if(btnH4+'' == 'true') __buttons.push('h4');
            if(btnH5+'' == 'true') __buttons.push('h5');
            if(btnH6+'' == 'true') __buttons.push('h6');

            if(btnUnordered+'' == 'true') {
                __buttons.push({
                    name: 'unorderedlist',
                    contentDefault: '<i class="fi mdi-format_list_bulleted"></i>'
                });
            }

            if(btnOrdered+'' == 'true') {
                __buttons.push({
                    name: 'orderedlist',
                    contentDefault: '<i class="fi mdi-format_list_numbered"></i>'
                });
            }



            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
            var __mediumObj = {

                autoLink:           true,
                imageDragging:      false,
                targetBlank:        false,
                placeholder:        false,


                anchor: {
                    linkValidation:     false,
                    targetCheckbox:     false,
                    placeholderText:    lngLink,
                    targetCheckboxText: 'Open in new window',
                },

                anchorPreview: {
                    hideDelay: 300
                },

                toolbar: {
                    buttons: __buttons
                },

                extensions: {
                    'colorPicker': (btnPicker+'' == 'true') ? pickerExtension : null
                }

            };
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --




            // Fix medium editor inside modal!
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
            if(jQuery('.modal.show').length > 0) {
                var modalID = jQuery('.modal.show').attr('id') || '';

                if(modalID == '') {
                    var modalID = 'rand_'+$.SOW.helper.randomStr(3);
                        jQuery('.modal.show').attr('id', modalID);
                }

                __mediumObj.elementsContainer = document.getElementById(modalID);
            }
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --



            // TO DESTROY:  window.mediumEditor.destroy();
            mediumEditor[ID] = new MediumEditor(this.selector_orig, __mediumObj);


        },

    };


})(jQuery);