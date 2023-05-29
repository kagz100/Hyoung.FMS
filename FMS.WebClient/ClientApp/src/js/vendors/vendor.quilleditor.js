/**
 *
 *  [SOW] Quill Editor
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.vendor.quilleditor.init('.typed')
 *  @Ajax Support   YES
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
    var scriptInfo      = 'Vendor Quill Editor';
    window.quillEditor = [];

    $.SOW.vendor.quilleditor = {


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

            if (typeof Quill !== "function") {

                var paths = $.SOW.helper.vendorLogicPaths('quilleditor');
                if(paths['path_js'] == '') {
                    $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                    return null;
                }

                $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

                    if (typeof Quill !== "function") {
                        $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                        return null;
                    }

                    // self reinit, external js loaded!
                    $.SOW.vendor.quilleditor.init(selector, config);
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


            return $.SOW.vendor.quilleditor.process('.quill-editor');

        },



        /**
         *
         *  @process
         *
         *
         **/
        process: function( selector ) {

            document.querySelectorAll( selector ).forEach(function(el) {

                // ignore multiple bind -- -- -- -- -- -- -- -- --
                if( el.classList.contains('js-quillified') ) return;
                    el.classList.add('js-quillified');
                // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --



                let ID              = el.getAttribute('id') || '';
                let quillConfig     = el.getAttribute('data-quill-config');
                let textareaName    = el.getAttribute('data-textarea-name');

                if(ID == '') {
                    ID = 'rand_'+$.SOW.helper.randomStr(3);
                    el.setAttribute('id', ID);
                }


                // defaults
                let _defaults = {
                    
                    modules: { 
                        // https://quilljs.com/docs/modules/toolbar/
                        toolbar: [
                                    [{ 'header': [2, 3, 4, 5, 6, false] }],
                                    [ 'bold', 'italic', 'underline', 'strike' ],
                                    [{ 'color': [] }, { 'background': [] }],
                                    [{ 'script': 'super' }, { 'script': 'sub' }],
                                    ['blockquote', 'code-block'],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
                                    [{ 'align': [] }],
                                    ['link', 'image', 'video'],
                                    [ 'clean' ]
                                ], 
                    },

                    placeholder: 'Type here...'

                };


                // default config
                if( quillConfig == '' )
                    quillConfig = _defaults;
                else 
                    quillConfig = $.SOW.helper.jsonParse( quillConfig );


                // add theme
                if( typeof quillConfig.theme === 'undefined' )
                    quillConfig.theme = 'snow';



                // Init Quill Edit
                window.quillEditor[ ID ] = new Quill(el, quillConfig);
                
                // Create a textarea
                // Quill has no textarea element!
                document.getElementById( ID ).insertAdjacentHTML('afterend', '<textarea id="tx_'+textareaName+'" name="'+textareaName+'" class="hide hide-force"></textarea>')
                document.getElementById('tx_'+textareaName).value = document.getElementById(ID).children[0].innerHTML;


                // On Change
                let updateInProgress = false
                window.quillEditor[ ID ].on('editor-change', function(action) { // action: text-change, selection-change
                    
                    // update textarea
                    if( action == 'text-change')
                        document.getElementById('tx_'+textareaName).value = document.getElementById(ID).children[0].innerHTML;

                    // avoid multiple img same post
                    if( updateInProgress ) 
                        return;

                    let el          = document.getElementById(ID);
                    let imgList     = el.querySelectorAll('img');
                    let ajaxURL     = el.getAttribute('data-ajax-url');
                    let ajaxParams  = el.getAttribute('data-ajax-params');
                    
                    // no ajax request
                    if( ajaxURL == '' )
                        return;

                    // Images
                    imgList.forEach(function(e) {
                    
                        // is a base64 image
                        let imageSrc = e.getAttribute('src');

                        if (imageSrc && imageSrc[0] === 'd') {

                            let ajaxURL = '_ajax/demo.summernote.php';
                            let ajaxParams = '';
                            $.SOW.vendor.quilleditor.ajaxUpload( ajaxURL, imageSrc, e, ajaxParams );
                            updateInProgress = true;

                        }
                    
                    });


                });


            });

        },



        /**
         *
         *  @b64toBlob
         *  Convert a base64 string in a Blob according to the data and contentType.
         *  https://ourcodeworld.com/articles/read/322/how-to-convert-a-base64-image-into-a-image-file-and-upload-it-with-an-asynchronous-form-using-jquery
         *
         **/
        b64toBlob: function(b64Data, contentType, sliceSize) {

            contentType = contentType   || '';
            sliceSize   = sliceSize     || 512;

            let byteCharacters  = atob(b64Data);
            let byteArrays      = [];

            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {

                let slice = byteCharacters.slice(offset, offset + sliceSize);
                let byteNumbers = new Array(slice.length);

                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                byteArrays.push( new Uint8Array(byteNumbers) );

            }

            return new Blob(byteArrays, {type: contentType});

        },




        /**
         *
         *  @ajaxUpload
         *
         *
         **/
        ajaxUpload: function(ajaxURL, base64, el, ajaxParams) {

            if(ajaxURL == '') {
                $.SOW.helper.consoleLog("Quill Editor: Upload URL not provided!");
                return;
            }



            // Base64 to Blob (image)
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
            // Split the base64 string in data and contentType
            let block = base64.split(";");
            // Get the content type of the image
            let contentType = block[0].split(":")[1];// In this case "image/gif"
            // get the real base64 content of the file
            let realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."
            // Convert it to a blob to upload
            let blob = $.SOW.vendor.quilleditor.b64toBlob(realData, contentType);
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --



            // Create a FormData and append the file as parameter name
            let formData = new FormData();
                formData.append('file', blob);
                formData.append('ajax', 'true');


            if(ajaxParams && ajaxParams != '') {

                let ajax_params_arr = $.SOW.helper.params_parse(ajaxParams);
                for (let i = 0; i < ajax_params_arr.length; ++i) {
                    formData.append(ajax_params_arr[i][0], ajax_params_arr[i][1]);
                }

            }


            $.ajax({
                url:            ajaxURL,
                cache:          false,
                contentType:    false,
                processData:    false,
                data:           formData,
                type:           'POST',

                beforeSend: function() {},

                error: function (data) {

                    $.SOW.helper.consoleLog(data);

                    if(typeof $.SOW.core.toast === 'object') {
                        $.SOW.core.toast.show('danger', '', '404 Server Error!', "center-top", 4000, true);
                    } else {
                        alert('404 Server Error!');
                    }

                },

                success: function(imgURL) {

                    $.SOW.helper.consoleLog(imgURL);

                    el.setAttribute('src', imgURL);
                    el.setAttribute('alt', "img");
                    el.classList.add('img-fluid');

                }
            });
        }



    };


})(jQuery);