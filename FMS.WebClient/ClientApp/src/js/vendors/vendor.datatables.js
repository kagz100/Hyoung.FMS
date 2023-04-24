/**
 *
 *  [SOW] Datatables
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependencies   -
 *  @Usage          $.SOW.vendor.datatables.init('.table-datatable');
 *
 *  @Ajax Support   YES
 *
 *  Vendor:         https://datatables.net/
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
  var scriptInfo                  = 'Vendor Datatables';
  var DTable                      = [];

  $.SOW.vendor.datatables = {


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

      var __selector          = $.SOW.helper.__selector(selector);
      var __config            = $.SOW.helper.check_var(config);

      this.selector           = __selector[0];    // '#selector'
      this.collection         = __selector[1];    // $('#selector')
      this.selector_orig      = __selector[2];    // $('#selector') // without ajax container prefix
      this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;


      // Check Vendor ; dymanically load if missing (should be external)
      // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      if(selector != '') {
          if(jQuery(this.selector).length < 1)
              return null;
      }

      if (!jQuery().DataTable) {

        var paths = $.SOW.helper.vendorLogicPaths('datatables');
        if(paths['path_js'] == '') {
          $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
          return null;
        }

        $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

          if (!jQuery().DataTable) {
            $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
            return null;
          }

          // self reinit, external js loaded!
          $.SOW.vendor.datatables.init(selector, config);
          return null;

        });

        return null;

      }
      // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++





      // -- * --
      $.SOW.helper.consoleLog('Init : ' + scriptInfo);
      // -- * --


      // Fixes
      $.SOW.vendor.datatables.miscOptions();


      // 1. Has no selector
      if(!this.selector) {
        $.SOW.vendor.datatables.process($('.table-datatable'));
        return $('.table-datatable');
      }

      // 2. Has selector
      return this.collection.each(function() {
          
        $.SOW.vendor.datatables.process($(this));

      });

    },



    /**
     *
     *  @process
     *
     *
     **/
    process: function(_this) {

      if(_this.hasClass('js-datatableified'))
        return;


      var ID                              = _this.attr('id')                                  || '',
          lngEmpty                        = _this.data('lng-empty')                           || 'No data available in table',
          lngPageInfo                     = _this.data('lng-page-info')                       || 'Showing _START_ to _END_ of _TOTAL_ entries',
          lngfiltered                     = _this.data('lng-filtered')                        || '(filtered from _MAX_ total entries)',
          lngLoading                      = _this.data('lng-loading')                         || 'Loading...',
          lngProcessing                   = _this.data('lng-processing')                      || 'Processing...',
          lngSearch                       = _this.data('lng-search')                          || 'Search...',
          lngNoRecords                    = _this.data('lng-norecords')                       || 'No matching records found',
          lngsortAscending                = _this.data('lng-sort-ascending')                  || ': activate to sort column ascending',
          lngsortDescending               = _this.data('lng-sort-descending')                 || ': activate to sort column descending',

          lngColumnVisibility             = _this.data('lng-column-visibility')               || 'Column Visibility',
          lngExport                       = _this.data('lng-export')                          || '<i class="fi fi-squared-dots fs-5 line-height-1"></i>',
          lngCSV                          = _this.data('lng-csv')                             || 'CSV',
          lngPDF                          = _this.data('lng-pdf')                             || 'PDF',
          lngXLS                          = _this.data('lng-xls')                             || 'XLS',
          lngCopy                         = _this.data('lng-copy')                            || 'Copy',
          lngPrint                        = _this.data('lng-print')                           || 'Print',
          lngAll                          = _this.data('lng-all')                             || 'All',

          columnSearch                    = _this.attr('data-column-search')                  || 'false',
          rowReorder                      = _this.attr('data-row-reorder')                    || 'false',
          colReorder                      = _this.attr('data-col-reorder')                    || 'false',
          isResponsive                    = _this.attr('data-responsive')                     || 'true',
          fixedHeader                     = _this.attr('data-header-fixed')                   || 'false',
          selectOnClick                   = _this.attr('data-select-onclick')                 || 'false',
          enableSearch                    = _this.attr('data-main-search')                    || 'true',
          enablePaging                    = _this.attr('data-enable-paging')                  || 'true',
          enableColumnSort                = _this.attr('data-enable-col-sorting')             || 'true',
          autoFill                        = _this.attr('data-autofill')                       || 'false',
          dataGroup                       = _this.attr('data-group')                          || 'false',
          isCustom                        = _this.attr('data-custom')                         || 'false',
          customConfig                    = _this.attr('data-custom-config')                  || null,
          itemsPerPage                    = _this.attr('data-items-per-page')                 || 15,
          buttonColumnVisibility          = _this.attr('data-enable-column-visibility')       || 'true',
          buttonExport                    = _this.attr('data-enable-export')                  || 'true';

      _this.addClass('js-datatableified');

      if(ID == '') {
        var ID = 'rand_'+$.SOW.helper.randomStr(3);
        _this.attr('id', ID);
      }   



      DTable[ID];



      // Custom request! Stop here!
      // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
      if(isCustom+'' == 'true') return;
      // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --



      // Column Search
      // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
      if(columnSearch+'' == 'true' && $.SOW.globals.is_mobile === false) {

        jQuery('#'+ID+' thead tr').clone(true).appendTo('#'+ID+' thead');
        jQuery('#'+ID+' thead tr:eq(1) th').each(function(i) {
          var title = jQuery(this).text();
          jQuery(this).html('<input type="text" class="form-control form-control-sm" placeholder="' + lngSearch + '" />');
          // jQuery(this).html('<input type="text" class="form-control form-control-sm" placeholder="Search ' + title + '" />');

          jQuery('input', this).on('keyup change', function() {
              
            if(DTable[ID].column(i).search() !== this.value) {
              DTable[ID].column(i).search(this.value).draw();
            }

          });
        });

      }
      // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --








      /**

          OPTIONS

      **/
      var __dtOptions =   {

              // Keytable
              // blurable:    false,
              // keys:        true,
              // stateSave:   true,



              // REORDER (sortable like)
              rowReorder: (rowReorder+'' == 'true') ? {
                  selector: 'tr td:not(:first-child)'
              } : false,
              colReorder:     (colReorder+'' == 'true') ? true : false,

              // SCROLLER
              /*
              pageLength:     false,
              scrollY:        300,
              scrollCollapse: true,
              scroller:       true,
              */

              
              fixedHeader:    (fixedHeader+'' == 'true') ? true : false,


              // Select on click (also print/export selected)
              select:         (selectOnClick+'' == 'true') ? true : false,

              // needed by column search
              orderCellsTop:  true,

              ordering:       (enableColumnSort+'' == 'true') ? true : false,             // column ordering (sorting)
              paging:         (enablePaging+'' == 'true') ? true : false,
              searching:      (enableSearch+'' == 'true') ? true : false,                 // searching

              // per page
              pageLength: Number(itemsPerPage),
              lengthMenu: [[10, 15, 30, 50, 100, -1], [10, 15, 30, 50, 100, lngAll]],


              // select & fill
              autoFill: (autoFill+'' != 'false') ? {
                  focus: autoFill // 'hover', 'click'
              } : false,


              // Langs
              oLanguage: {
                  oAria: {
                      sSortAscending:     lngsortAscending    || "",
                      sSortDescending:    lngsortDescending   || ""
                  },
                  oPaginate: {
                      sFirst:         '<i class="fi fi-arrow-start-full small"></i>',
                      sLast:          '<i class="fi fi-arrow-end-full small"></i>',
                      sNext:          '<i class="fi fi-arrow-end small"></i>',
                      sPrevious:      '<i class="fi fi-arrow-start small"></i>'
                  },
                  sEmptyTable:        lngEmpty        || "",
                  sInfo:              lngPageInfo     || "",
                  sInfoEmpty:         "",
                  sInfoFiltered:      "",
                  sInfoPostFix:       "",
                  sDecimal:           "",
                  sThousands:         ",",
                  // sLengthMenu:     "Show _MENU_ entries",
                  sLengthMenu:        "_MENU_",                   // per page - without text
                  sLoadingRecords:    lngLoading      || "",
                  sProcessing:        lngProcessing   || "",
                  // sSearch:         "Search:",
                  sSearch:            "",
                  sSearchPlaceholder: lngSearch       || "",
                  sUrl:               "",
                  sZeroRecords:       lngNoRecords    || ""
              },





              // -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
              // processing:  false,
              // serverSide:  false,

              // ajax:            "_ajax/datatables.json",
              // columns: [
              //  { data: "first_name" },
              //  { data: "last_name" },
              //  { data: "position" },
              //  { data: "office" },
              //  { data: "start_date" },
              //  { data: "salary" }
              // ],
              // -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


              dom:
                  /*  
                      :: Datatables layout help
                      https://datatables.net/reference/option/dom

                          l   =   length changing input control
                          f   =   filtering input
                          t   =   The table!
                          i   =   Table information summary
                          p   =   pagination control
                          r   =   processing display element
                          B   =   buttons
                          R   =   ColReorder
                          S   =   Select

                      :: Markup

                          < and >             = div element
                          <"class" and >      = div with a class
                          <"#id" and >        = div with an ID
                          <"#id.class" and >  = div with an ID and a class

                  */
                  "<'row mb-3'"
                      +"<'col-sm-12 col-md-6 d-flex align-items-center justify-content-start'f l>"    // filtering input + per page
                      +"<'col-sm-12 col-md-6 d-flex align-items-center justify-content-end'B>"        // buttons
                  +">"
                  
                  + "<'row'"
                      +"<'col-sm-12'tr>"          // The table + processing display element
                  +">"

                  +"<'row'"
                      +"<'col-sm-12 col-md-5'i>"  // Table information summary
                      +"<'col-sm-12 col-md-7'p>"  // pagination control
                  +">",

              buttons: []

      };


      // BUTTONS : COLUMN VISIBILITY
      // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
      if( buttonColumnVisibility+'' == 'true' ) {
          __dtOptions.buttons.push({
              extend:     'colvis',
              text:       lngColumnVisibility,
              titleAttr:  lngColumnVisibility,
              className:  'btn-sm btn-light'
          });
      }


      // BUTTONS : EXPORT
      // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
      if( buttonExport+'' == 'true' ) {
        __dtOptions.buttons.push({
            extend:     'collection',
            text:       lngExport,
            className:  'btn-sm btn-light py-2',
            buttons:    [  

              {
                extend: 'csvHtml5',
                text: lngCSV,
              },
              {
                extend: 'pdfHtml5',
                text: lngPDF,
              },
              {
                extend: 'excelHtml5',
                text: lngXLS,
              },
              {
                extend: 'copyHtml5',
                text: lngCopy,
              },
              {
                extend: 'print',
                text: lngPrint,
              }

            ]
        });
      }


      // GROUPPED
      // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
      if(dataGroup+'' == 'true') {
        __dtOptions.pageLength  = 15;
        __dtOptions.order       = [[2, 'desc']];
        __dtOptions.rowGroup    = {dataSrc: 2};
      }
      // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
      


      // Responsive
      // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
      if(isResponsive+'' == 'true') {
        __dtOptions.responsive = true;
      }

      else if(isResponsive+'' == 'extended') {

        __dtOptions.responsive = {
          details: {
            display: $.fn.dataTable.Responsive.display.modal({
              header: function(row) {
                var data = row.data();
                return 'Details for ' + data[0] + ' ' + data[1];
              }
            }),

            renderer: $.fn.dataTable.Responsive.renderer.tableAll({
              tableClass: 'table table-responsive'
            })
          }
        };

      }
      // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --



      // Extend
      var customConfig = $.SOW.helper.jsonParse( customConfig );
      if( typeof customConfig === 'object' )
        __dtOptions =  $.extend({}, __dtOptions, customConfig);

      // using var dataTableExtend = {};
      if( typeof dataTableExtend === 'object' )
        __dtOptions =  $.extend({}, __dtOptions, dataTableExtend);



      // PDFMAKE : 2Mb
      var paths = $.SOW.helper.vendorLogicPaths('datatables');
      if(paths['path_js'] != '') {
        paths['path_js'] = paths['path_js'].replace('datatables.min', 'pdfmake.min');
        $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

          DTable[ID] = _this.DataTable(__dtOptions);


          /**

              click events

          **/ $.SOW.vendor.datatables.clickEvents(DTable[ID]);

        });
      }
      // -- --



    },



    /**
     *
     *  @clickEvents
     *
     *
     **/
    clickEvents: function(_el) {

        if(!events) {

            var events = jQuery('#event_log');
            var clearlogText = function() {
                events.empty();
            }

        }


        _el.on('key', function(e, datatable, key, cell, originalEvent) {
        
            events.prepend('<div class="clearfix"><span class="badge bg-warning">Key press</span>&nbsp; ' + key + ' &bull; ' + cell.data() + '</div>');

        }) .on('key-focus', function(e, datatable, cell) {

            events.prepend('<div class="clearfix"><span class="badge bg-primary">Item click</span>&nbsp; ' + cell.data() + '</div>');

        }).on('key-blur', function(e, datatable, cell) {

            events.prepend('<div class="clearfix"><span class="badge bg-light">Item blur</span>&nbsp; ' + cell.data() + '</div>');

        });

    },



    /**
     *
     *  @miscOptions
     *
     *
     **/
    miscOptions: function() {

        /**

            Needed for fixed table header

        **/
        var headerHeight = $.SOW.globals.elHeader.outerHeight();
        $('head').append('<style type="text/css">body.header-fixed table.dataTable.fixedHeader-floating { top: '+headerHeight+'px !important; }</style>');

    }

  };


})(jQuery);