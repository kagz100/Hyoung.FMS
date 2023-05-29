/**
 *
 *  [SOW] Flot Chart
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependencies   -
 *  @Usage          $.SOW.vendor.flot.init('.flot');
 *
 *  @Ajax Support   YES
 *
 *  Vendor:         https://github.com/flot/flot
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
    var scriptInfo                  = 'Vendor Flot Chart';

    $.SOW.vendor.flot = {


        /**
         *
         *  @config
         *
         *
         **/
        config: {
            // ajax params
            headers         : '',
            crossDomain     : '',
            method          : 'GET',
            dataType        : 'json', // 'json', 'html', 'text'
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

            if (!jQuery().plot) {

                var paths = $.SOW.helper.vendorLogicPaths('flot');
                if(paths['path_js'] == '') {
                    $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                    return null;
                }

                $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

                    if (!jQuery().plot) {
                        $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                        return null;
                    }

                    // self reinit, external js loaded!
                    $.SOW.vendor.flot.init(selector, config);
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



            $.SOW.vendor.flot.btnSave_bind();



            // 1. Has no selector
            if(!this.selector) {
                $.SOW.vendor.flot.process($('.flot'));
                return $('.flot');
            }

            // 2. Has selector
            return this.collection.each(function() {
                
                $.SOW.vendor.flot.process($(this));

            });

        },



        /**
         *
         *  @process
         *
         *
         **/
        process: function(_this) {

            if(_this.hasClass('js-plotified'))
                return;

            _this.addClass('js-plotified');


            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
            var CUSTOM_DATA             = _this.data('flot-custom-data')            || '',
                CUSTOM_OPTIONS          = _this.data('flot-custom-options')         || '',
                flot_id                 = _this.attr('data-flot-id')                || '';

            // Add random ID if doesn't have one
            if(flot_id == '') {
                flot_id = 'rand_' + $.SOW.helper.randomStr(3, 'N');
                _this.attr('id', flot_id);
                _this.attr('data-flot-id', flot_id);
            }
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

        

            // SMARTY CUSTOM
            var flot_label_1        = _this.data('flot-label-1')        || 'Plot 1',
                flot_label_2        = _this.data('flot-label-2')        || 'Plot 2',
                flot_label_3        = _this.data('flot-label-3')        || 'Plot 3',
                flot_color_1        = _this.data('flot-color-1')        || '#6595b4',
                flot_color_2        = _this.data('flot-color-2')        || '#FF0000',
                flot_color_3        = _this.data('flot-color-3')        || '#FF0000',
                flot_border_color   = _this.data('flot-border-color')   || '#eaeaea',
                flot_type           = _this.data('flot-type')           || 'fill',

                ajax_url            = _this.data('ajax-url')            || '',
                
                flot_click          = _this.data('flot-click')          || '', // modal|url
                click_url           = _this.data('flot-click-url')      || '',

                modal_size          = _this.data('flot-modal-size')     || 'modal-md',
                modal_backdrop      = _this.data('flot-modal-backdrop') || '',
                modal_centered      = _this.data('flot-modal-centered') || 'false',

                flot_data_1         = _this.attr('data-flot-data-1'),
                flot_data_1         = flot_data_1 ? JSON.parse(flot_data_1) : null,

                flot_data_2         = _this.attr('data-flot-data-2'),
                flot_data_2         = flot_data_2 ? JSON.parse(flot_data_2) : null,

                flot_data_3         = _this.attr('data-flot-data-3'),
                flot_data_3         = flot_data_3 ? JSON.parse(flot_data_3) : null,

                flot_fill_2         = _this.data('flot-fill-2')             || 'false',
                flot_fill_3         = _this.data('flot-fill-3')             || 'false',

                flot_pie_data       = _this.data('flot-pie-data')           || '',
                flot_legend_show    = _this.attr('data-flot-legend-show')   || 'true',

                flot_ticks          = _this.attr('data-flot-ticks'),
                flot_ticks          = flot_ticks ? JSON.parse(flot_ticks)   : null;






            // CLICK!
            if(flot_click != '') {

                _this.bind("plotclick", function (event, pos, item) {

                    if (item) {

                        click_url += '&val_x='+item.datapoint[0]+'&val_y='+item.datapoint[1]+'&pos_x='+pos.x+'&pos_y='+pos.y;
                        $.SOW.helper.consoleLog(click_url);


                        // 1. URL
                        if(flot_click == 'url') {
                            window.location = click_url;
                            return;
                        }

                        // 2. CALLBACK
                        if(flot_click == 'callback' && typeof flot_callback === 'function') {
                            flot_callback(event, pos, item);
                        }

                        // 3. MODAL
                        else if(typeof $.SOW.core.ajax_modal === 'object' && flot_click == 'modal') {
                            

                            // Programtically Create Modal  :             url , 'modal-md', 'true' (centered)
                            $.SOW.core.ajax_modal.createFromThinAir(click_url, modal_size, modal_centered, modal_backdrop, function() {

                                // CALLBACK
                                setTimeout(function() {

                                    jQuery('#val_x').val(item.datapoint[0]);
                                    jQuery('#val_y').val(item.datapoint[1]);
                                    jQuery('.val_x').text(item.datapoint[0]);
                                    jQuery('.val_y').text(item.datapoint[1]);

                                    jQuery('#pos_x').val(pos.x);
                                    jQuery('#pos_y').val(pos.y);
                                    jQuery('.pos_x').text(pos.x);
                                    jQuery('.pos_y').text(pos.y);

                                    if(typeof flot_callback === 'function') {
                                        flot_callback(event, pos, item);
                                    }

                                }, 450);

                            });

                        }

                    }
                });

            }



            // CUSTOM! STOP HERE!
            if(CUSTOM_DATA != '' && CUSTOM_OPTIONS != '') {
                window[flot_id] = jQuery.plot(_this, flot_custom[CUSTOM_DATA], flot_custom[CUSTOM_OPTIONS]);
                return;
            }
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --




            // PIE CHART
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
            if(typeof flot_pie_data === 'object') {

                window[flot_id] = jQuery.plot(_this, flot_pie_data,
                    {
                        grid: {
                            hoverable           : true,
                            clickable           : true,
                        },

                        series: {

                            /* pie */
                            pie: {
                                show: true,
                            },

                            /* lines : used by legend */
                            lines : {
                                show : true,
                            },

                            shadowSize : 0,
                            highlightColor: 0.5 // or color
                        },

                        legend: {
                            show: (flot_legend_show+'' == 'false') ? false : true,
                            noColumns: 1,
                            labelFormatter: null
                        },

                        tooltip : true,
                        tooltipOpts : {
                            content : function(label, xval, yval, flotItem) {
                                return label+": <b>"+yval+"</b>";
                            },

                            dateFormat : "%y-%0m-%0d",
                            defaultTheme : true
                        },

                    });
                return;

            }
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --



            // REGULAR CHART
            if(flot_data_1) {

                var flotData = [{ /* graph #1 */
                                    data:       flot_data_1,
                                    label:      flot_label_1,
                                    lines:      { show: (flot_type == 'bar') ? false : true },
                                    points:     { show: (flot_type == 'bar') ? false : true },
                                    color:      flot_color_1
                                }];

            }

            if(flot_data_2) {

                var flotData = [{ /* graph #1 */
                                    data:       flot_data_1,
                                    label:      flot_label_1,
                                    lines:      { show: (flot_type == 'bar') ? false : true },
                                    points:     { show: (flot_type == 'bar') ? false : true },
                                    color:      flot_color_1
                                }, { /* graph #2 */

                                    data:       flot_data_2,
                                    label:      flot_label_2,
                                    lines:      { show: (flot_type == 'bar') ? false : true, fill: (flot_fill_2+'' == 'true') ? true : false },
                                    points:     { show: (flot_type == 'bar') ? false : true },
                                    color:      flot_color_2
                                }];

            }

            if(flot_data_3) {

                var flotData = [{ /* graph #1 */
                                    data:       flot_data_1,
                                    label:      flot_label_1,
                                    lines:      { show: (flot_type == 'bar') ? false : true },
                                    points:     { show: (flot_type == 'bar') ? false : true },
                                    color:      flot_color_1
                                }, { /* graph #2 */

                                    data:       flot_data_2,
                                    label:      flot_label_2,
                                    lines:      { show: (flot_type == 'bar') ? false : true, fill: (flot_fill_2+'' == 'true') ? true : false },
                                    points:     { show: (flot_type == 'bar') ? false : true },
                                    color:      flot_color_2
                                }, { /* graph #3 */

                                    data:       flot_data_3,
                                    label:      flot_label_3,
                                    lines:      { show: (flot_type == 'bar') ? false : true, fill: (flot_fill_3+'' == 'true') ? true : false },
                                    points:     { show: (flot_type == 'bar') ? false : true },
                                    color:      flot_color_3
                                }];

            }


            /* flot settings */
            var flotSettings = {  

                grid: {
                    mouseActiveRadius   : (flot_type == 'pie') ? 0 : 30,
                    hoverable           : true,
                    clickable           : true,
                    borderWidth         : 0,
                    tickColor           : (flot_type == 'pie') ? null : flot_border_color,
                    borderColor         : (flot_type == 'pie') ? null : flot_border_color,
                    // backgroundColor  : '#ffffff',
                },

                tooltip : true,
                tooltipOpts : {
                    content : function(label, xval, yval, flotItem) {
                        return label+": <b>"+yval+"</b>";
                    },

                    dateFormat : "%y-%0m-%0d",
                    defaultTheme : true
                },

                // https://github.com/flot/flot/blob/master/API.md#customizing-the-axes
                xaxis:{
                    // show: false,
                    ticks: flot_ticks,
                    tickLength : 5,
                    mode: "time"
                },
                legend: {
                    show: (flot_legend_show+'' == 'true') ? true : false,
                    noColumns: 1,
                    labelFormatter: null
                },
                series : {

                    /* pie */
                    pie: {
                        show: (flot_type == 'pie') ? true : false, 
                    },

                    /* bars */
                    bars: {
                        show: (flot_type == 'bar') ? true : false, 
                        lineWidth:0,
                        align: "center",
                        barWidth: 0.5
                    },

                    /* lines */
                    lines : {
                        show : (flot_type == 'bar') ? false : true,
                        lineWidth : 1,
                        fill : true,
                        fillColor : {
                            colors : [{
                                opacity : 0.1
                            }, {
                                opacity : 0.15
                            }]
                        }
                    },

                   //points: { show: true },
                    shadowSize : 0,
                    highlightColor: 0.5 // or color
                },

                selection : {
                    mode : "x"
                },

                /*
                margin: {
                    top: 30,
                    left: 30,
                    bottom: 30,
                    right: 30,
                }
                */

            };

           



            // AJAX
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
            if(ajax_url) {
                $.SOW.vendor.flot.flotAjax(_this, flot_id, flotSettings);
                return;
            }
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

             window[flot_id] = jQuery.plot(_this, flotData, flotSettings);

        },




        /**
         *
         *  @flotRender
         *
         *
         **/
        flotAjax: function(_this, flot_id, flotSettings) {


            var _updateMethod           = _this.data('ajax-method')                     || $.SOW.vendor.flot.config.method,
                _updateType             = _this.data('ajax-dataType')                   || $.SOW.vendor.flot.config.dataType,
                _updateUrl              = _this.data('ajax-url')                        || '',
                _updateParams           = _this.data('ajax-params')                     || '',
                _itemID                 = _this.data('id')                              || '',
                _updateInterval         = _this.data('ajax-update-interval')            || 0,
                data_params             = $.SOW.vendor.flot.config.data_params;


            if(_updateUrl == '')
                return;



            if(_updateParams != '') {

                var ajax_params_arr = $.SOW.helper.params_parse(_updateParams);
                for (var i = 0; i < ajax_params_arr.length; ++i) {
                    data_params[ajax_params_arr[i][0]] = ajax_params_arr[i][1];
                }

            }

            // Add item id
            data_params.id = _itemID;

            // UPDATE ORDER VIA AJAX
            jQuery.ajax({
                url:            _updateUrl,
                data:           data_params,
                type:           _updateMethod,
                contentType:    $.SOW.vendor.flot.config.contentType,
                dataType:       _updateType,
                headers:        $.SOW.vendor.flot.config.headers,
                crossDomain:    $.SOW.vendor.flot.config.crossDomain,
                cache:          false,

                beforeSend: function() {
                    $.SOW.helper.consoleLog(_updateUrl);
                },

                error:  function(XMLHttpRequest, textStatus, errorThrown) {

                    if(typeof $.SOW.core.toast === 'object') {
                        $.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', "top-center", 0, true);
                    } else {
                        alert("[404] Unexpected internal error!");
                    }


                },

                success: function(data) {

                    var flotData = [];
                    for(var i=0; i < data.length; i++) {
                        flotData.push(data[i]);
                    }

                    window[flot_id] = jQuery.plot(_this, flotData, flotSettings);



                    if(Number(_updateInterval) < 1)
                        return;

                    setTimeout(function() {

                        $.SOW.vendor.flot.flotAjax(_this, flot_id, flotSettings);

                    }, Number(_updateInterval));


                }
            });

        },






        /**
         *
         *  @btnSave_bind
         *
         *
         **/
        btnSave_bind: function(_this) {


            /* FLOT SAVE AS IMAGE */
            jQuery('a.flot-save:not(.js-plotified)').addClass('js-plotified').on("click", function(e) {
                e.preventDefault();

                var _t          = jQuery(this),
                    flot_id     = _t.attr('data-flot-id')   || 'null',
                    file_name   = _t.attr('data-file-name') || 'graph';

                var myCanvas    = window[flot_id].getCanvas();

                // we use filesaver to be able to save a custom file name
                myCanvas.toBlob(function(blob) {
                    saveAs(blob, file_name + ".png");
                });

            });
            /* -- */

        }


    };


})(jQuery);