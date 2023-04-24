/**
 *
 *  [SOW] FullCalendar
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependencies   -
 *  @Usage          $.SOW.vendor.fullcalendar.init('.fullcalendar');
 *
 *  @Ajax Support   YES
 *
 *  Vendor:         https://fullcalendar.io/
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
  var scriptInfo                  = 'Vendor FullCalendar';
  window.fullCalendarInstance     = {};

  $.SOW.vendor.fullcalendar = {


    /**
     *
     *  @config
     *
     *
     **/
    config: {

      plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list', 'bootstrap', 'googleCalendar' ],

      /** 

          We rewrite the plugin by injecting the variables
          because, obviously this plugin hardcoded everything!
          node_modules/@fullcalendar/bootstrap/main.js

      **/
      kickBsPlugin: function(theme) {
        var theme = (theme) ? theme : 'primary';

        if(typeof FullCalendarBootstrap !== 'object')
            return;

        FullCalendarBootstrap.BootstrapTheme.prototype.baseIconClass                    = 'm-0 fi';
        FullCalendarBootstrap.BootstrapTheme.prototype.iconOverrideOption               = 'smartyAwesopme';
        FullCalendarBootstrap.BootstrapTheme.prototype.iconOverrideCustomButtonOption   = 'smartyAwesopme';
        FullCalendarBootstrap.BootstrapTheme.prototype.iconOverridePrefix               = 'fi-';
        FullCalendarBootstrap.BootstrapTheme.prototype.iconClasses = {
          close:      'fi-close',
          prev:       'fi-arrow-left',
          next:       'fi-arrow-right',
          prevYear:   'fi-arrow-left',
          nextYear:   'fi-arrow-right'
        };

        FullCalendarBootstrap.BootstrapTheme.prototype.classes.popover      = 'card card-'+theme;
        FullCalendarBootstrap.BootstrapTheme.prototype.classes.button       = 'btn btn-'+theme+' btn-sm';
        FullCalendarBootstrap.BootstrapTheme.prototype.classes.listView     = 'card card-'+theme;

      },


      // ajax params
      headers         : '',
      crossDomain     : '',
      method          : 'GET',
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

      if (typeof FullCalendar !== 'object') {

          var paths = $.SOW.helper.vendorLogicPaths('fullcalendar');
          if(paths['path_js'] == '') {
            $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
            return null;
          }

          $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

            if (typeof FullCalendar !== 'object') {
              $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
              return null;
            }

            // self reinit, external js loaded!
            $.SOW.vendor.fullcalendar.init(selector, config);
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


      if(jQuery(this.selector).length < 1)
          return null;


      // Rewrite default fullcalendar bootstrap plugin
      if(typeof FullCalendarBootstrap === 'object')
        $.SOW.vendor.fullcalendar.config.kickBsPlugin('primary');


      // -- * --
      $.SOW.helper.consoleLog('Init : ' + scriptInfo);
      // -- * --


      // 1. Has no selector
      if(!this.selector) {
        $.SOW.vendor.fullcalendar.process($('.fullcalendar'));
        return $('.fullcalendar');
      }

      // 2. Has selector
      return this.collection.each(function() {
          
        $.SOW.vendor.fullcalendar.process($(this));

      });

    },



    /**
     *
     *  @process
     *
     *
     **/
    process: function(_this) {

      var calendarID              = _this.attr('id')                                              || '',

          plugins                 = _this.data('fullcalendar-plugins')                            || '',
          defaultView             = _this.data('fullcalendar-default-view')                       || 'dayGridMonth', // dayGridMonth,timeGridWeek,timeGridDay,listWeek

          modalSize               = _this.data('fullcalendar-modal-size')                         || 'modal-lg',

          // Create
          createInModal           = _this.attr('data-fullcalendar-event-create-modal')            || true,
          createUrl               = _this.data('fullcalendar-modal-event-create')                 || '',

          // Edit
          editInModal             = _this.attr('data-fullcalendar-event-edit-modal')              || true,
          editURL                 = _this.data('fullcalendar-modal-event-edit')                   || '',

          // Date Click
          dateClickAction         = _this.data('fullcalendar-date-click')                         || '', // 'modal', 'redirect'
          dateClickURL            = _this.data('fullcalendar-modal-date-click-modal')             || '',

          fcCustom                = _this.data('fullcalendar-custom')                             || '',
          fcExtend                = _this.data('fullcalendar-extend')                             || '',
          
          // data sources
          jsonSources             = _this.data('fullcalendar-source-json-url')                    || '',
          inlineSource            = _this.data('fullcalendar-source-json-inline')                 || '',
          objectSource            = _this.data('fullcalendar-source-object')                      || '',
          
          buttonText              = _this.data('fullcalendar-lang-btn')                           || '',
          header                  = _this.data('fullcalendar-header')                             || '',
          editable                = _this.attr('data-fullcalendar-editable')                      || false,
          eventTimeFormat         = _this.data('fullcalendar-time-format')                        || '',
          defaultDate             = _this.data('fullcalendar-default-date')                       || 'now',
          timezone                = _this.data('fullcalendar-timezone')                           || 'local',

          // google calendar
          googleCalApiKey         = _this.data('fullcalendar-google-apikey')                      || '',
          googleCalSources        = _this.data('fullcalendar-google-event-sources')               || '';


      // Add random ID if doesn't one
      if(calendarID == '') {
          calendarID = 'rand_' + $.SOW.helper.randomStr(3, 'N');
          _this.attr('id', calendarID);
      }

      if(typeof jsonSources !== 'object')
          jsonSources = false;

      if(typeof inlineSource !== 'object')
          inlineSource = null;

      if(typeof window[objectSource] === 'object') {
          inlineSource = window[objectSource];
      }
      

      // bool needed for easy use
      var editable = (editable+'' == 'true') ? true : false;

      if(typeof buttonText !== 'object') {
          var buttonText = {
              today   : 'today',
              month   : 'month',
              week    : 'week',
              day     : 'day',
              list    : 'list'
          }
      }

      if(typeof header !== 'object') {
          var header = {
              left    : 'prev,next, today, customAddEventButton',
              center  : 'title',
              right   : 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          };
      }


      if(typeof eventTimeFormat !== 'object') {
          var eventTimeFormat = {
              hour        : 'numeric',
              minute      : '2-digit',
              meridiem    : 'short'
          };
      }

      if(defaultDate == 'today' || defaultDate == 'now') {
          defaultDate = new Date();
      } else {
          defaultDate = new Date(defaultDate);
      }

      var _defaults = {

          plugins         : (typeof plugins === 'object') ? plugins : $.SOW.vendor.fullcalendar.config.plugins, 

          editable        : editable,
          eventLimit      : true, // allow "more" link when too many events
          locale          : 'en', // enable 'locales-all.js' or 'de|fr|etc.js' on config
          themeSystem     : 'bootstrap',
          defaultView     : defaultView || 'dayGridMonth',
          defaultDate     : defaultDate,
          dir             : $.SOW.globals.direction,  // LTR|RTL

          timeZone        : timezone,
          eventTimeFormat : eventTimeFormat,

          // instead of `locale` .js file
          buttonText      : buttonText,

          header          : header,

          customButtons: {

              customAddEventButton: {
                  text: '+',

                  click: function(info) {
                      if(editable === true) {
                      // console.log(info);

                          if(createInModal+'' == 'true') {

                              if(createUrl != '' && typeof $.SOW.core.ajax_modal === 'object') {
                                  $.SOW.helper.consoleLog(createUrl, 'color:#cccccc');

                                  // Programtically Create Modal  :             url , 'modal-md', 'true' (centered)
                                  $.SOW.core.ajax_modal.createFromThinAir(createUrl, modalSize, 'true', 'static', function() {

                                      // CALLBACK
                                      setTimeout(function() {

                                          // item id, if empty
                                          var item_id = jQuery('#event_id').attr('id') || '';
                                          if(item_id == '') {
                                              var item_id = new Date().getTime();
                                              jQuery('#event_id').attr('id', item_id);
                                          }

                                          jQuery('.btn-fullcalendar-add').on('click',function(e) {

                                              $.SOW.vendor.fullcalendar.eventCreate(calendarID, item_id);

                                          });

                                      }, 250);

                                  });

                              }

                          } else {

                          if(createUrl != '')
                              window.location = createUrl;

                          }

                      }
                  } // end click

              }

          },

          // https://fullcalendar.io/docs/google-calendar
          // https://calendar.google.com/calendar/r
          googleCalendarApiKey : (googleCalApiKey) ? googleCalApiKey : null,


          // https://fullcalendar.io/docs/event-parsing
          events: (typeof inlineSource === 'object') ? inlineSource : false,

          // https://fullcalendar.io/docs/events-json-feed
          eventSources: (typeof jsonSources === 'object') ? jsonSources : false,



          // for edit
          eventClick:  function(info) {
              if(editable === true) {

                  // console.log(info);
                  // console.log(info.event.title);
                  // console.log(info.event.id);

                  if(editInModal+'' == 'true') {


                      // Prevent URL redirect
                      info.jsEvent.preventDefault(); // don't let the browser navigate
                      if(info.event.url) {}


                      if(editURL != '' && typeof $.SOW.core.ajax_modal === 'object') {
                          $.SOW.helper.consoleLog(editURL+info.event.id, 'color:#cccccc');

                          // Programtically Create Modal  :             url , 'modal-md', 'true' (centered), 'null|static' (backdrop), callback
                          $.SOW.core.ajax_modal.createFromThinAir(editURL+info.event.id, modalSize, 'true', 'static', function() {

                              // CALLBACK
                              setTimeout(function() {
                                  
                                  // get & assign data
                                  $.SOW.vendor.fullcalendar.eventGet(info, calendarID);

                                  // item id, if empty
                                  var item_id = jQuery('#event_id').attr('id') || '';
                                  if(item_id == '') {
                                      var item_id = new Date().getTime();
                                      jQuery('#event_id').attr('id', item_id);
                                  }

                                  // save
                                  jQuery('.btn-fullcalendar-edit').on('click',function(e) {

                                      $.SOW.vendor.fullcalendar.eventEdit(info, calendarID, item_id);

                                  });


                                  // delete
                                  jQuery('.btn-fullcalendar-remove').on('click',function(e){
                                      info.event.remove();
                                  });


                              }, 450);

                          });



                      }

                  } else {

                      if(editURL != '')
                          window.location = editURL+info.event.id;

                  }


              }
          },



          // https://fullcalendar.io/docs/dateClick
          dateClick: function(info) {
              if(editable === true) {

                  // console.log(info);
                  // console.log(info.allDay);
                  // console.log(info.dateStr);
                  if(dateClickAction == 'modal' && dateClickURL != '') {

                      if(typeof $.SOW.core.ajax_modal === 'object') {
                          $.SOW.helper.consoleLog(dateClickURL+info.dateStr, 'color:#cccccc');

                          // Programtically Create Modal  :             url , 'modal-md', 'true' (centered), 'null|static' (backdrop), callback
                          $.SOW.core.ajax_modal.createFromThinAir(dateClickURL+info.dateStr, modalSize, 'true', 'static', function() {

                              // CALLBACK
                              setTimeout(function() {

                                  var _now        = new Date();
                                  var _hrs        = _now.getHours();
                                  var _mins       = _now.getMinutes();
                                  if(_hrs < 10)   _hrs = '0'+_hrs;
                                  if(_mins < 10)  _mins = '0'+_mins;
                                  var _time       = _hrs + ':' + _mins;

                                  jQuery('#start').val(info.dateStr + ' ' +_time);
                                  jQuery('#start').attr('data-date-start', info.dateStr + ' ' +_time);
                                  // jQuery('#allDay').prop('checked', true);

                                  // item id, if empty
                                  var item_id = jQuery('#event_id').attr('id') || '';
                                  if(item_id == '') {
                                      var item_id = new Date().getTime();
                                      jQuery('#event_id').attr('id', item_id);
                                  }

                                  jQuery('.btn-fullcalendar-add').on('click',function(e) {

                                      $.SOW.vendor.fullcalendar.eventCreate(calendarID, item_id);

                                  });

                              }, 250);

                          });
                          
                      
                      }

                  } 

                  else if(dateClickAction == 'redirect' && dateClickURL != '') {

                      window.location = dateClickURL+info.dateStr;

                  }

              }
          },



          eventRender: function(info) {

              // Yeah! Let's add a rangepicker on title!
              if(jQuery('#'+calendarID + ' .fc-toolbar #fc_smarty_custom_range').length < 1) {
                  
                  jQuery('#'+calendarID + ' .fc-toolbar h2').wrap('<a href="#" class="link-muted" id="fc_smarty_custom_range"></a>');
              
              } else {

                  // range picker
                  if(!jQuery('#'+calendarID + ' #fc_smarty_custom_range').hasClass('js-tangepickified')) {

                      jQuery('#'+calendarID + ' #fc_smarty_custom_range').on('click', function(e) {
                          e.preventDefault();

                      });

                  }
              }

          },



          eventResize: function(info) {
              if(editable === true) {

                  var start   = info.event.start.toISOString();
                  var end     = (info.event.end) ? info.event.end.toISOString() : info.event.start.toISOString();

                  $.SOW.vendor.fullcalendar.ajaxReq(editURL, calendarID, info.event.id, start, end, 'resize');
                  
                  //alert(info.event.title + " end is now " + info.event.end.toISOString());

                  // if (!confirm("is this okay?")) {
                  //  info.revert();
                  // }

              }
          },



          eventDrop: function(info) {
              if(editable === true) {

                  var start   = info.event.start.toISOString();
                  var end     = (info.event.end) ? info.event.end.toISOString() : info.event.start.toISOString();

                  $.SOW.vendor.fullcalendar.ajaxReq(editURL, calendarID, info.event.id, start, end, 'drag');
                  
                  // alert(info.event.title + " was dropped on " + info.event.start.toISOString());

                  // if (!confirm("Are you sure about this change?")) {
                  //  info.revert();
                  // }

              }
          }


      };



      var _defaults   = (typeof window[fcExtend] === 'object') ? $.extend({}, _defaults, window[fcExtend]) : _defaults;
      var calendarEl   = document.getElementById(calendarID);

      // CUSTOM : OVERWRITE EVERYTHING!
      if(typeof window[fcCustom] === 'object') {

          var _defaults = {

              themeSystem     : 'bootstrap',
              defaultView     : defaultView || 'dayGridMonth',
              defaultDate     : new Date(),
              dir             : $.SOW.globals.direction, // LTR|RTL
              header          : {
                                  left    : 'prev,next, today',
                                  center  : 'title',
                                  right   : 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                              }

          };

          var _defaults   = $.extend({}, _defaults, window[fcCustom]);
      }

      window.fullCalendarInstance[calendarID] = new FullCalendar.Calendar(calendarEl, _defaults);
      window.fullCalendarInstance[calendarID].render();

    },




    /**
     *
     *  @ajaxReq
     *  used on update (drag/drop).
     *  create/edit is used by form post
     *
     *
     **/
    ajaxReq: function(_updateUrl, calendarID, event_id, start, end, action) {

      if(_updateUrl == '')
        return;

      var _updateMethod           = jQuery('#' + calendarID).data('ajax-method')          || $.SOW.vendor.fullcalendar.config.method,
          _toastSuccessMsg        = jQuery('#' + calendarID).data('toast-success')        || 'Sucessfully Updated!',
          _toastPosition          = jQuery('#' + calendarID).data('toast-position')       || 'top-center',
          data_params             = $.SOW.vendor.fullcalendar.config.data_params;

      var _url = _updateUrl + event_id+'&start='+start+'&end='+end+'&action='+action+'&ajax=true';

      // UPDATE ORDER VIA AJAX
      jQuery.ajax({
        url:            _url,
        data:           null,
        type:           _updateMethod,
        contentType:    $.SOW.vendor.fullcalendar.config.contentType,
        dataType:       $.SOW.vendor.fullcalendar.config.dataType,
        headers:        $.SOW.vendor.fullcalendar.config.headers,
        crossDomain:    $.SOW.vendor.fullcalendar.config.crossDomain,

        beforeSend: function() {},

        error:  function(XMLHttpRequest, textStatus, errorThrown) {

          if(typeof $.SOW.core.toast === 'object') {
            $.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', _toastPosition, 0, true);
          } else {
            alert("[404] Unexpected internal error!");
          }

        },

        success: function(data) {

          $.SOW.helper.consoleLog(_url);

          setTimeout(function() {

          if(typeof $.SOW.core.toast === 'object')
            $.SOW.core.toast.show('success', '', _toastSuccessMsg, _toastPosition, 1300, true);

          },150);

        }
      });

    },



    /**
     *
     *  @dateFormat
     *
     *
     **/
    dateFormat: function(_d) {

      if(!_d) return null;

      if (typeof moment === 'function')
        return moment(_d, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm');

      var _s          = new Date(_d);
      var _offset     = _s.getTimezoneOffset()  / 60,
          _offset     = (_offset > 0) ? _offset / 60 : 0;
      var _mo         = _s.getMonth() + 1;
      var _day        = _s.getDate();
      var _hrs        = _s.getHours() + _offset;
      var _min        = _s.getMinutes();

      if(_mo < 10)    _mo     = '0'+_mo;
      if(_day < 10)   _day    = '0'+_day;
      if(_hrs < 10)   _hrs    = '0'+_hrs;
      if(_min < 10)   _min    = '0'+_min;

      return _s.getFullYear() + '-' +_mo + '-' + _day + ' ' + _hrs + ':'+_min;

    },



    /**
     *
     *  @eventCreate
     *
     *
     **/
    eventCreate: function(calendarID, item_id) {

      var start               = jQuery('#start').val();
      var end                 = jQuery('#end').val()          || null;
      var startRecur          = jQuery('#startRecur').val()   || null;
      var endRecur            = jQuery('#endRecur').val()     || null;
      var daysOfWeek          = jQuery('#daysOfWeek').val()   || null;
      var recurrent_enable    = jQuery('#recurrent_enable').is(':checked');

      if(!recurrent_enable) {
          var startRecur  = null;
          var endRecur    = null;
          var daysOfWeek  = null;
      }

      var start       = start         ? start.replace(' ', 'T')+':00'         : start;
      var end         = end           ? end.replace(' ', 'T')+':00'           : end;
      var startRecur  = startRecur    ? startRecur.replace(' ', 'T')+':00'    : startRecur;
      var endRecur    = endRecur      ? endRecur.replace(' ', 'T')+':00'      : endRecur;


      window.fullCalendarInstance[calendarID].addEvent({
        id:             item_id,
        title:          jQuery('#title').val(),
        start:          start,
        end:            end,
        allDay:         end ? false : true, //(jQuery('#allDay').is(':checked')) ? true : false,
        description:    jQuery('#description').val(),
        className:      jQuery('#className').val(),
        startRecur:     startRecur,
        endRecur:       endRecur,
        daysOfWeek:     daysOfWeek,
        editable:       true,
        startEditable:  true,
        durationEditable:   true,
        resourceEditable:   true
      });

      $.SOW.vendor.fullcalendar.refetchEvents(calendarID);

    },




    /**
     *
     *  @eventEdit
     *
     *
     **/
    eventEdit: function(info, calendarID, item_id) {

      var start               = jQuery('#start').val();
      var end                 = jQuery('#end').val()                          || null;
      var startRecur          = jQuery('#startRecur').val()                   || null;
      var endRecur            = jQuery('#endRecur').val()                     || null;
      var className           = jQuery('#className').val()                    || '';
      var daysOfWeek          = jQuery('#daysOfWeek').val()                   || null;
      var recurrent_enable    = jQuery('#recurrent_enable').is(':checked');

      if(!recurrent_enable) {
        var startRecur  = null;
        var endRecur    = null;
        var daysOfWeek  = null;
      }

      if(start)   var start = start.replace(' ', 'T')+':00';
      if(end)     var end  = end.replace(' ', 'T')+':00';

      if(startRecur) {
        var startRecur  = startRecur.replace(' ', 'T')+':00';
        info.event.setProp('startRecur',    startRecur);
      }

      if(endRecur) {
        var endRecur    = endRecur.replace(' ', 'T')+':00';
        info.event.setProp('endRecur',      endRecur);
      }

      info.event.setProp('daysOfWeek',        daysOfWeek);


      info.event.setStart(start);
      info.event.setEnd(end);
      info.event.setAllDay(end ? false : true);

      info.event.setProp('title',         jQuery('#title').val());
      info.event.setProp('className',     className.split(' '));
      info.event.setExtendedProp('description',   jQuery('#description').val());

      $.SOW.vendor.fullcalendar.refetchEvents(calendarID);

    },




    /**
     *
     *  @eventGet
     *
     *
     **/
    eventGet: function(info, calendarID) {


      var _start      = info.event.start      || '';
      var _end        = info.event.end        || null;
      var _startRecur = (typeof info.event._def.recurringDef !== 'undefined') ? info.event._def.recurringDef.typeData.startRecur  : null;
      var _endRecur   = (typeof info.event._def.recurringDef !== 'undefined') ? info.event._def.recurringDef.typeData.endRecur    : null;
      var _daysOfWeek = (typeof info.event._def.recurringDef !== 'undefined') ? info.event._def.recurringDef.typeData.daysOfWeek  : null;
      var className   = info.event._def.ui.classNames.join(' ') || null;




      // set selected daysOfWeek
      if(_daysOfWeek) {
        if(_daysOfWeek.length > 0) {
          
          jQuery('#recurrent_enable').trigger('click');

          for(var d = 0; d<_daysOfWeek.length; d++) {
            jQuery('#daysOfWeek option[value='+_daysOfWeek[d]+']').attr('selected','selected');
          }

          // Refresh bootstrap select
          if(typeof $.SOW.vendor.bootstrap_select === 'object')
            $.SOW.vendor.bootstrap_select.refresh('#daysOfWeek');

        }
      }


      // get all in a dynamic way
      var extendedProps = (info.event._def.extendedProps) ? info.event._def.extendedProps : null;
      for(var extEl in extendedProps) {
        jQuery('#'+extEl).val(extendedProps[extEl]);
        jQuery('#info_'+extEl).html(extendedProps[extEl]);
        jQuery('#info_'+extEl+' a').addClass('link-muted').attr('target', 'fullcalendar').attr('rel', 'noopener');
      }
      // --
      var _start      = $.SOW.vendor.fullcalendar.dateFormat(_start);
      var _end        = $.SOW.vendor.fullcalendar.dateFormat(_end);
      var _startRecur = $.SOW.vendor.fullcalendar.dateFormat(_startRecur);
      var _endRecur   = $.SOW.vendor.fullcalendar.dateFormat(_endRecur);

      jQuery('#start').val(_start);
      jQuery('#start').attr('data-date-start', _start);
      
      jQuery('#end').val(_end);
      if(_end) {
          jQuery('#end').attr('data-date-start', _end);
      }

      jQuery('#startRecur').val(_startRecur);
      jQuery('#endRecur').val(_endRecur);

      jQuery('#info_start').text(_start || '–');
      jQuery('#info_end').text(_end || '–');
      jQuery('#info_startRecur').text(_startRecur || '–');
      jQuery('#info_endRecur').text(_endRecur || '–');
      jQuery('#info_title').text(info.event.title || '–');

      if(info.event.url) {
          jQuery('#info_url').html('<a class="link-muted" href="'+info.event.url+'" target="fullcalendar">'+info.event.url+'</a>');
      }

      // --
      jQuery('#title').val(info.event.title || '');
      jQuery('#url').val(info.event.url || '');
      // --
      if(className != '') {

        jQuery('#className').val(className);
        jQuery('#info_className').addClass(className);

        // Refresh bootstrap select
        if(typeof $.SOW.vendor.bootstrap_select === 'object')
          $.SOW.vendor.bootstrap_select.refresh('#className');

      }

    },




    /**
     *
     *  @refetchEvents
     *
     *
     **/
    refetchEvents: function(calendarID) {

      if(typeof window.fullCalendarInstance[calendarID] === 'object') {
        window.fullCalendarInstance[calendarID].refetchEvents();
      }

    }

  };


})(jQuery);