/**
 *
 *  [SOW] Leaflet [Map]
 *
 *  @author         Dorin Grigoras
 *                  www.stepofweb.com
 *
 *  @Dependency     -
 *  @Usage          $.SOW.vendor.leaflet.init('.map-leaflet')
 *  @Ajax Support   YES
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
    var scriptInfo      = 'Vendor Leaflet [Map]';


    $.SOW.vendor.leaflet = {


        /* 
            access from outside:
            $.SOW.vendor.leaflet.maps['mapID']
        */  maps: [],




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

            if (typeof L === 'undefined') {

                var paths = $.SOW.helper.vendorLogicPaths('leaflet');
                if(paths['path_js'] == '') {
                    $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                    return null;
                }

                $.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

                    if (typeof L === 'undefined') {
                        $.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
                        return null;
                    }

                    // self reinit, external js loaded!
                    $.SOW.vendor.leaflet.init(selector, config);
                    return null;

                });

                return null;
            }
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


            // Selector
            var __selector          = $.SOW.helper.__selector(selector);
            this.selector           = __selector[0] || '.map-leaflet';  // '#selector'



            jQuery(this.selector).each(function() {
                $.SOW.vendor.leaflet.map_openstreet($(this));
            });


            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --


            return $(this.selector);

        },




        /**
         *
         *  @map_openstreet
         *
         *
         **/
        map_openstreet: function(_this) {

            // avoid loop issue, if happen
            if(_this.hasClass('js-leafletified'))
                return;


            var _mapID              = _this.attr('id')                  || '',
                map_json            = _this.data('map-json')            || '',
                map_tile            = _this.data('map-tile')            || '',
                map_tile_custom     = _this.data('map-tile-custom')     || '',
                __zoom__            = _this.data('map-zoom')            || 9,
                map                 = [];


            // -- --
            _this.addClass('js-leafletified')
            // -- --


            // Check for a valid json
            if(typeof map_json !== 'object') {

                if(typeof $.SOW.core.toast === 'object') {
                    $.SOW.core.toast.show('danger', '', 'Map Error: Invalid Json!', 'top-center', 0, true);
                } else {
                    alert("[404] Unexpected internal error!");
                }

                return;
            }


            // Map id - create one if no id provided
            if(_mapID == '') {
                var _mapID = 'map_' + $.SOW.helper.randomStr(3);
                _this.attr('id', _mapID);
            }




            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
            var ajaxRequest;
            var plotlist;
            var plotlayers=[];


            /* custom icon */
            var customIcon = L.icon({
                iconUrl:    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAMAAAD3TXL8AAAB5lBMVEVHcEwtbZk5hLcubZgubZkyeak4fq8zbaEwcqEtcqQubZsvbpoyaZYua5cubJcubJcubJgtbZk+h7ovbp01eqwtbJovbpo3gbc0d6gydKZHjsEubJk2gLIwb58tbJk2frQua5dIkcREjL43g7RGkMIvb5wubJctbJktbJkzd6o0eKc/hrU4grgzd6gxdKMzdqcxdKQ1dqY2frA2frA4gbQ4gbU2frA3gbQ3grc2fbA2fbA1e6s9grQ1fKw+hbw5g7g5g7c2g7YwdJ88grX///8uhctHmNEhesk/ks8rgssshMtElc8ogMoxh8wpgcpFl9A2jM0whswlfsoeeMkmf8o2ic4jfMpClM9Bk88ziM05jc5Dk9E0isxJltJZotU6js5AkNBEjMBKmNIzhM1Un9U8kc47f687i89XoNROm9Madcj8/f5JmdE2gb5SntM/isVQmcxLlc8rgMwwerdLlMpDjMQ5eKU3dqNCib0+jtAwcZ5cpNROlspQndNHldJfptdHkctHi7tChbNFlNGPtc5ek7igwNZDh7i2zt7e6fE8h8Q6hcJWntEvg8wyfbtTnM8xhM44i81Lm9E4grZKkcVJgqo1e6zB1eJunb2FrcnR3+qrxdeBrMqXudFQirRYoNAwgMg+hbuAcFJ8AAAARHRSTlMA7/hT+BP2AfYIzEsNh2Zyeen09/YY/i729v/0+PbkHlv6+Cf5g0Ld1jxx9oyvwOfx9EfwzNJRgni0vlv6Zf7o5EKA+QUIjyQAAAJISURBVBgZdcCFQuIAGADgnxxht2d313XnHHjKOeWmbpONGp1hBnZnXFe86W1MDjA+SFGUvipVwBUNnS/PpQXS8xedpZAOeShtDDHLy8sLx3XSBwgkITV3Cw4Y+9KZ72zJzvwuuNcAF25XNi4EsKTAQl3lfUhQ3AkxvuEUHxNS1oDgUb1rUIQNilz1j4H3ROnCxnk+O+Ni7L5xHuZSPgNQFy26J3jug1XHJ8fq8dIEz71YpIY2pV3Ps4YcP3a9uxuORaueZ1e2QXuHm+O4icDaFirYcQTGOY5zd7RDlwXjOG74wy8vmrB5C+M4DrN0QU+MZlnWNPsVFf3ctrIsS8d6oDempyjKtL2BirbWrBRF6WO90G2hcRynLZuo6MvsOo7jtKUbmp7GcRxnw9OfUcG3mTCH43j8zWvQ9lknebRl5rsX9e5Mz65P8qx9WiguCZ+SJEnEp6bnP87PTJkIkiRPwyXFAJq/ZoNgzrQytWIyGwTm5xoAkKnihpEEwkkYRgSGuEoGAGpJkOrPRAXzEeBlF9FvM/TTZbkgKJYHiYF0RFCugITsMvO7NAPm8mwQKeR75FAKsVeRBReayueG3icNzanyICmrYt82mkTuS7LgvzyVc3RMNOpU5UKKWuI/0Ylsfoka0uSqnGM6wZhTlQPp1Pn+Q6Pg0J+vhgw5VYTOaDTqiKocyIRUH0U8Hk/kqBqBS2oLbUaP0VZYC5chLdGIJxJtQeAKWaFNZ5PL4CqkNXoSbYXraOV/5Fq4lmZeA9drLmmGG+RBmn9TM85gFMKHmQAAAABJRU5ErkJggg==',
                shadowUrl:  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC',

                iconSize:     [25, 41], /* size of the icon */
                shadowSize:   [41, 41], /* size of the shadow */
                iconAnchor:   [10, 40], /* iconSize - 15 , iconSize - 1 */
                shadowAnchor: [10, 39], /* shadowSize - 32 , shadowSize - 2 */
                popupAnchor:  [3, -26]  /* well, calibrate until you get the correct position */
            });

            switch(map_tile) {

                case 'gray':    var _tile = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';
                                break;

                case 'carto':   var _tile = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
                                break;

                case 'voyager': var _tile = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
                                break;

                case 'hot':     var _tile = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
                                break;

                default:        var _tile = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
                                break;

            };


            // Custom tile : overwrite
            if(map_tile_custom != '')
                var _tile = map_tile_custom;


            /* create the tile layer with correct attribution */
            var osmAttrib   = '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
            var leafletUrl  = '<a href="https://leafletjs.com/">Leaflet</a>';
            var osm         = new L.TileLayer(_tile, {minZoom: 3, maxZoom: 18, attribution: osmAttrib});        
            var __map       = [];
            var _rand       = $.SOW.helper.randomStr(3, 'L');

            /* set up the map */
            map[_mapID]     = new L.Map(_mapID);
            map[_mapID].addLayer(osm);
            map[_mapID].attributionControl.setPrefix(leafletUrl);   // Leaflet copyright with target="_blank"


            for(var i=0; i < map_json.length; ++i) {

                var __lat__     = Number(map_json[i]['map_lat'])    || 0;
                var __lng__     = Number(map_json[i]['map_long'])   || 0;
                var __popup__   = map_json[i]['map_popup']          || '';
                var __popup__   = __popup__.replace(/`/g, '"');

                /* add marker */
                __map[_rand] = L.marker([__lat__, __lng__], {icon: customIcon}).addTo(map[_mapID]);

                /* center map to first marker */
                if(i == 0)
                    map[_mapID].setView(new L.LatLng(__lat__, __lng__), Number(__zoom__));

                /* add popup */
                if(__popup__ != '')
                    __map[_rand].bindPopup(L.popup({maxWidth:300, autoClose:false, autoPan:false}).setContent("<div class='small'>"+__popup__+"</div>")).openPopup();

            }


            /* 
                access from outside:
                $.SOW.vendor.leaflet.maps['mapID']
            */  $.SOW.vendor.leaflet.maps[_mapID] = map[_mapID];

        }

    };


})(jQuery);