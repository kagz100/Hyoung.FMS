/**
 *
 *  [SOW] Check All
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.core.checkall.init('input[data-checkall-container]');
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
  var scriptInfo      = 'SOW Check All';
  var checkList = [];

  $.SOW.core.checkall = {


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
      this.selector           = __selector[0];    // '#selector'
      this.collection         = __selector[1];    // $('#selector')


      if(jQuery(this.selector).length < 1)
        return;

      // -- * --
      $.SOW.helper.consoleLog('Init : ' + scriptInfo);
      // -- * --


      $.SOW.core.checkall.process(this.selector);
      return null;

    },



    /**
     *
     *  @process
     *  
     *
     **/
    process: function(selector) {


      document.querySelectorAll( selector ).forEach( function( el ) {

        // ignore multiple bind -- -- -- -- -- -- -- -- --
        if( el.classList.contains('js-init-checkall') ) return;
          el.classList.add('js-init-checkall');
        // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

        let target = el.getAttribute('data-checkall-container');
        if( !target || !document.querySelector( target ) ) return;

        if( checkList.indexOf(target) === -1 )
          checkList.push( target );

      });


      for( let i in checkList ) {

        /** 
          Variables
        **/
        let checkallList = document.querySelector( checkList[i] );
        if( !checkallList ) continue;
        let sAll  = document.querySelectorAll('[data-checkall-container="'+checkList[i]+'"]');
        let items = checkallList.querySelectorAll('[type="checkbox"]:not(.js-ignore):not(:disabled)');


        /** 
          Item click
        **/
        items.forEach(function( item ) {
          item.addEventListener('click', function(e) {
            checkallStates();
          });
        });


        /** 
          Checkall click 
        **/
        sAll.forEach( function( sItem ) {

          sItem.addEventListener('click', function(c) {

            /* select all */
            if( c.target.checked ) { 
              items.forEach(function( item ) { 
                if( !item.disabled ) item.checked = true;
              });
            } else { /* deselect all */
              items.forEach(function( item ) { 
                if( !item.disabled ) item.checked = false;
              });
            }

            checkallStates();

          });

        });



        /** 
          Checkall states 
        **/
        function checkallStates() {

          let checkedItems = checkallList.querySelectorAll('[type="checkbox"]:checked:not(.js-ignore):not(:disabled)').length;
          sAll.forEach( function( t ) {

            if( checkedItems < 1 ) {
             
              /* none checked */
              t.indeterminate = false;
              t.checked = false;
              // console.log('checked : none', checkedItems+'/'+items.length);
            
            } else {

              /* partially checked */
              if( checkedItems < items.length ) {
                t.checked = false;
                t.indeterminate = true;
                // console.log('checked : partial', checkedItems+'/'+items.length);
              }

              /* all checked */
              else  { 
                t.checked = true;
                t.indeterminate = false;
                // console.log('checked : all', checkedItems+'/'+items.length);
              }

            }

          });

        }



        /**
          On Load
        **/ checkallStates();

      };


    },


  };


})(jQuery);