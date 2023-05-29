/**
 *
 *  [SOW] Sparkline Chart.js
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependencies   -
 *  @Usage          $.SOW.vendor.chartjs.init('.chartjs');
 *
 *  @Ajax Support   YES
 *
 *  Vendor:         https://github.com/chartjs/Chart.js
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
    var scriptInfo                  = 'Vendor Chart.js';



    $.SOW.vendor.chartjs = {


        /**
         *
         *  @config
         *
         *
         **/
        config: {

            data: {

                datasets: [
                    // 2.9.1 update
                    // moved from [x/y]Axes
                    // {
                    //     categoryPercentage: 0.35,
                    //     barPercentage: 0.70,
                    // }
                ],

            },


            // Default options
            // used by Quick chartjs
            options: {
                // backgroundColor: "transparent",
                responsive: true,
                maintainAspectRatio: false,
                hover: {
                    mode: 'index'
                },
                legend: {
                    display: true,
                    position: 'top',
                    rtl: $.SOW.globals.direction == 'rtl' ? true : false,
                },

                elements: {
                    point:{
                        radius: 3
                    }
                },

                scales: {

                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: false,
                            labelString: '', // Month
                            fontSize: 14,
                        },
                        ticks: {
                            display: true,
                            beginAtZero: true,
                            fontColor: '#999999',
                            fontSize: 13,
                            padding: 10
                        },

                        gridLines: true,

                    }],

                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: false,
                            labelString: '', // Value
                            fontSize: 14,
                        },

                        gridLines: {
                            color:              '#dddddd',
                            borderDash:         [2, 3],
                            zeroLineBorderDash: [2, 3],
                            zeroLineWidth: 1,
                        },

                        ticks: {
                            max:            50,                            
                            stepSize:       10,
                            display:        true,
                            beginAtZero:    true,
                            fontColor:      '#999999',
                            fontSize:       13,
                            padding:        10
                        }

                    }]
                },

                title: {
                    display: false,
                    text: '', // Lorem Ipsum
                    fontSize: 16,
                },


                tooltips: {
                    enabled: true,
                    intersect: false,
                    mode: 'nearest',
                    bodySpacing: 5,
                    yPadding: 10,
                    xPadding: 15, 
                    caretPadding: 0,
                    displayColors: false,
                    backgroundColor: '#121212',
                    titleFontColor: '#ffffff', 
                    cornerRadius: 4,
                    footerSpacing: 0,
                    titleSpacing: 0,
                    rtl: $.SOW.globals.direction == 'rtl' ? true : false
                },

                layout: {
                    padding: {
                        left:   0,
                        right:  0,
                        top:    0,
                        bottom: 0
                    }
                }

            },

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
            if(this.selector != '') {
                if(jQuery(this.selector).length < 1)
                    return null;
            }

            if (typeof Chart !== 'function') {

                var paths = $.SOW.helper.vendorLogicPaths('chartjs');
                if(paths['path_js'] == '') {
                    $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                    return null;
                }

                $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

                    if (typeof Chart !== 'function') {
                        $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                        return null;
                    }

                    // self reinit, external js loaded!
                    $.SOW.vendor.chartjs.init(selector, config);
                    return null;

                });

                return null;
            }
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                


            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --


            $.SOW.vendor.chartjs.btnSave_bind();


            // 1. Has no selector
            if(!this.selector) {
                $.SOW.vendor.chartjs.process($('.chartjs'));
                return $('.chartjs');
            }

            // 2. Has selector
            return this.collection.each(function() {
                
                $.SOW.vendor.chartjs.process($(this));

            });

        },





        /**
         *
         *  @process
         *
         *
         **/
        process: function(_this) {


            if(_this.hasClass('js-chartjsified'))
                return;

            _this.addClass('js-chartjsified');
            var ID                      = _this.attr('id')                          || '',
                dataQuick               = _this.data('quick')                       || '',
                dataChart               = _this.data('chartjs')                     || '',
                cjsCustom               = _this.data('custom')                      || '',

                // smarty quick
                quickChartType          = _this.data('chartjs-type')                || 'line', // line/bar/pie
                quickChartLabels        = _this.data('chartjs-labels')              || '',
                quickChartGrid          = _this.attr('data-chartjs-grid')           || 'true',
                quickChartDots          = _this.attr('data-chartjs-dots')           || 'true',
                quickChartTooltip       = _this.attr('data-chartjs-tooltip')        || 'true',
                quickChartTitle         = _this.data('chartjs-title')               || '',
                quickChartxAxesLabel    = _this.data('chartjs-xaxes-label')         || '',
                quickChartxborderWidth  = _this.data('chartjs-line-width')          || '',
                quickChartyAxesLabel    = _this.data('chartjs-yaxes-label')         || '',
                quickChartLegend        = _this.attr('data-chartjs-legend')         || 'true',
                quickChartDatasets      = _this.data('chartjs-datasets')            || '';


            // Autoassign ID
            if(ID == '') {
                var ID = 'rand_'+$.SOW.helper.randomStr(4, 'N');
                    _this.attr('id', ID);
            }


            // 1. from attributes
            // 2. from object
            var __obj   = (typeof window[cjsCustom] === 'object')   ? window[cjsCustom]     : {};
            var OBJ     = (typeof dataChart === 'object')           ? dataChart             : __obj;


            // used by image save!
            // var backgroundColor = 'white';
            // Chart.plugins.register({
            //     beforeDraw: function(c) {
            //         var ctx = c.chart.ctx;
            //         ctx.fillStyle = backgroundColor;
            //         ctx.fillRect(0, 0, c.chart.width, c.chart.height);
            //     }
            // });


            // Legend Spacing
            Chart.Legend.prototype.afterFit = function() {
                this.height = this.height + 30;
            };



            // QUICK
            if(typeof quickChartDatasets === 'object') {

                var __OBJ__                 = {};
                    __OBJ__.type            = quickChartType;



                // BAR & LINE
                if(__OBJ__.type != 'pie' && __OBJ__.type != 'doughnut') {


                    __OBJ__.data            = {};
                    __OBJ__.options         = $.SOW.vendor.chartjs.config.options;
                    
                    __OBJ__.data.labels     = (typeof quickChartLabels === 'object') ? quickChartLabels : null;
                    __OBJ__.data.datasets   = quickChartDatasets;
                    __OBJ__.options.scales.yAxes[0].ticks.max = 0; // 0 default


                    // legend
                    __OBJ__.options.legend.display = true;  // default required
                    if(quickChartLegend+'' == 'false')
                        __OBJ__.options.legend.display = false;
                    else if(quickChartLegend+'' != 'false') {

                        // if only "true" used!
                        if(quickChartLegend+'' == 'true') 
                            quickChartLegend = 'top';
                        
                        __OBJ__.options.legend.position = quickChartLegend;
                    }


                    // Title
                    __OBJ__.options.title.display   = false;    // default required
                    if(quickChartTitle != '') {
                        __OBJ__.options.title.display   = true;
                        __OBJ__.options.title.text      = quickChartTitle;
                    }


                    // Tooltip
                    __OBJ__.options.tooltips.enabled = true;    // default required
                    if(quickChartTooltip+'' == 'false')
                        __OBJ__.options.tooltips.enabled = false;


                    // Labels
                    __OBJ__.options.scales.xAxes[0].scaleLabel.display = false;
                    if(quickChartxAxesLabel != '') {
                        __OBJ__.options.scales.xAxes[0].scaleLabel.display      = true;
                        __OBJ__.options.scales.xAxes[0].scaleLabel.labelString  = quickChartxAxesLabel;
                    }
                    __OBJ__.options.scales.yAxes[0].scaleLabel.display = false;
                    if(quickChartyAxesLabel != '') {
                        __OBJ__.options.scales.yAxes[0].scaleLabel.display      = true;
                        __OBJ__.options.scales.yAxes[0].scaleLabel.labelString  = quickChartyAxesLabel;
                    }

                        
                    // Bar - set width
                    // __OBJ__.options.scales.xAxes[0].categoryPercentage       = 0.35;     // 2.9.1 update
                    // __OBJ__.options.scales.xAxes[0].barPercentage            = 0.70;     // 2.9.1 update
                    __OBJ__.data.datasets[0].categoryPercentage                 = 0.35;
                    __OBJ__.data.datasets[0].barPercentage                      = 0.70;
                    if(__OBJ__.type == 'bar') {
                        // __OBJ__.options.scales.xAxes[0].categoryPercentage   = 0.65; // 2.9.1 update
                        // __OBJ__.options.scales.xAxes[0].barPercentage        = 1;    // 2.9.1 update
                        __OBJ__.data.datasets[0].categoryPercentage             = 0.65;
                        __OBJ__.data.datasets[0].barPercentage                  = 1;
                    }


                    // Grid
                    __OBJ__.options.scales.xAxes[0].display = true;
                    __OBJ__.options.scales.xAxes[0].gridLines = true;
                    __OBJ__.options.scales.yAxes[0].display = true;
                    if(quickChartGrid+'' == 'false') {
                        __OBJ__.options.scales.xAxes[0].display = false;
                        __OBJ__.options.scales.xAxes[0].gridLines = false;
                        __OBJ__.options.scales.yAxes[0].display = false;
                    }
                    else if(quickChartGrid+'' == 'xAxes') {
                        __OBJ__.options.scales.xAxes[0].display = true;
                        __OBJ__.options.scales.xAxes[0].gridLines = true;
                        __OBJ__.options.scales.yAxes[0].display = false;
                    }
                    else if(quickChartGrid+'' == 'yAxes') {
                        __OBJ__.options.scales.xAxes[0].display = false;
                        __OBJ__.options.scales.xAxes[0].gridLines = false;
                        __OBJ__.options.scales.yAxes[0].display = true;
                    }


                    // Walk through dataset
                    for(var i=0;i<__OBJ__.data.datasets.length; i++) {

                        // Set MAX - chartjs is not settings by itself corectly!
                        for(var j=0;j<__OBJ__.data.datasets[i].data.length; j++) {

                            if(__OBJ__.data.datasets[i].data[j] > __OBJ__.options.scales.yAxes[0].ticks.max)
                                __OBJ__.options.scales.yAxes[0].ticks.max = __OBJ__.data.datasets[i].data[j] + 10; // Y scale + 10

                        } // -- -- --


                        // Defaults
                        __OBJ__.data.datasets[i].borderColor            = __OBJ__.data.datasets[i].backgroundColor;
                        __OBJ__.data.datasets[i].pointHoverRadius       = 4;
                        __OBJ__.data.datasets[i].pointHoverBorderWidth  = 12;
                        __OBJ__.data.datasets[i].borderWidth            = 1;
                        __OBJ__.data.datasets[i].pointBackgroundColor   = __OBJ__.data.datasets[i].backgroundColor;
                        __OBJ__.data.datasets[i].pointBorderColor       = __OBJ__.data.datasets[i].backgroundColor;
                        __OBJ__.data.datasets[i].pointHoverBorderColor  = __OBJ__.data.datasets[i].backgroundColor;


                        // no line & dots
                        if(quickChartDots+'' == 'false' && __OBJ__.data.datasets[i].fill === true) {

                            __OBJ__.data.datasets[i].pointBackgroundColor       = 'rgba(133, 133, 145, 0)';
                            __OBJ__.data.datasets[i].pointBorderColor           = 'rgba(133, 133, 145, 0)';
                            __OBJ__.data.datasets[i].pointHoverBackgroundColor  = 'rgba(133, 133, 145, 0)';
                            __OBJ__.data.datasets[i].pointHoverBorderColor      = 'rgba(133, 133, 145, 0)';
                            __OBJ__.data.datasets[i].borderWidth                = 0;
                            __OBJ__.data.datasets[i].borderColor                = 'rgba(133, 133, 145, 0)';
                            __OBJ__.options.elements.point.radius               = 0;

                        }

                        // no dots, in case line used
                        if(quickChartDots+'' == 'false')
                            __OBJ__.options.elements.point.radius = 0;


                        // line width
                        if(__OBJ__.data.datasets[i].fill === false)
                            __OBJ__.data.datasets[i].borderWidth = (quickChartxborderWidth != '') ? Number(quickChartxborderWidth) : 3;


                    }



                    // Final object
                    var OBJ = __OBJ__;

                }



                // PIE CHART
                else if(__OBJ__.type == 'pie' || __OBJ__.type == 'doughnut') {

                    var pieData             = [];
                    var piebackgroundColor  = [];
                    var pieLabels           = [];

                    for(var i=0;i<quickChartDatasets.length; i++) {

                        pieData.push(quickChartDatasets[i][1]);
                        piebackgroundColor.push(quickChartDatasets[i][2]);
                        pieLabels.push(quickChartDatasets[i][0]);

                    }

                    // Final object
                    var OBJ = {
                                type: __OBJ__.type,
                                legend: {
                                    display: false,
                                    position: 'top',
                                },
                                data: {
                                    datasets: [{
                                        data:               pieData,
                                        backgroundColor:    piebackgroundColor,
                                        label:              'Dataset 1'
                                    }],
                                    labels: pieLabels
                                },
                                options: {
                                    responsive: true,
                                    maintainAspectRatio: true,
                                    legend: {
                                        display:    (quickChartLegend+'' == 'false') ? false : true,
                                        position:   (quickChartLegend+'' != 'false') ? quickChartLegend : 'top',
                                    },
                                    tooltips: {
                                        enabled:    (quickChartTooltip+'' == 'false') ? false : true,
                                        intersect: false,
                                        mode: 'nearest',
                                        bodySpacing: 5,
                                        yPadding: 10,
                                        xPadding: 15, 
                                        caretPadding: 0,
                                        displayColors: false,
                                        backgroundColor: '#121212',
                                        titleFontColor: '#ffffff', 
                                        cornerRadius: 4,
                                        footerSpacing: 0,
                                        titleSpacing: 0
                                    },
                                    title: {
                                        display: (quickChartTitle != '') ? true : false,
                                        text: quickChartTitle, // Lorem Ipsum
                                        fontSize: 16,
                                    },
                                }

                            };


                }

                
            }



            // Render
            var ctx     = document.getElementById(ID).getContext('2d');
            window[ID]  = new Chart(ctx, OBJ);

            /**
                Use this to destroy any chart instances that are created. 
                This will clean up any references stored to the chart object within Chart.js, 
                along with any associated event listeners attached by Chart.js. 
                This must be called before the canvas is reused for a new chart.
            **/

        },






        /**
         *
         *  @btnSave_bind
         *
         *
         **/
        btnSave_bind: function() {

            /* FLOT SAVE AS IMAGE */
            jQuery('a.chartjs-save:not(.js-chartjsified)').addClass('js-chartjsified').on("click", function(e) {
                e.preventDefault();

                var _t          = jQuery(this),
                    ID          = _t.attr('data-chartjs-id')    || 'null',
                    file_name   = _t.attr('data-file-name')     || 'graph';

                // // we use filesaver to be able to save a custom file name
                var canvas = document.getElementById(ID);

                // set white background
                $.SOW.vendor.chartjs.fillCanvasBackgroundWithColor(canvas, 'white');

                canvas.toBlob(function(blob) {
                    saveAs(blob, file_name + ".png");
                });


            });
            /* -- */

        },



        /**
         *
         *  @fillCanvasBackgroundWithColor
         *  white bg on canvas save
         *  https://stackoverflow.com/questions/50104437/set-background-color-to-save-canvas-chart
         *
         *
         **/
        fillCanvasBackgroundWithColor: function(canvas, color) {
            // Get the 2D drawing context from the provided canvas.
            const context = canvas.getContext('2d');

            // We're going to modify the context state, so it's
            // good practice to save the current state first.
            context.save();

            // Normally when you draw on a canvas, the new drawing
            // covers up any previous drawing it overlaps. This is
            // because the default `globalCompositeOperation` is
            // 'source-over'. By changing this to 'destination-over',
            // our new drawing goes behind the existing drawing. This
            // is desirable so we can fill the background, while leaving
            // the chart and any other existing drawing intact.
            // Learn more about `globalCompositeOperation` here:
            // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
            context.globalCompositeOperation = 'destination-over';

            // Fill in the background. We do this by drawing a rectangle
            // filling the entire canvas, using the provided color.
            context.fillStyle = color;
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Restore the original context state from `context.save()`
            context.restore();
        },



    };


})(jQuery);