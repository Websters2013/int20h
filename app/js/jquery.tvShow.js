"use strict";
( function(){

    $(function(){

        $('.tvShow').each( function() {
            new TVShow( $(this) );
        } );

    });

    var TVShow = function(obj) {

        //private properties
        var _obj = obj,
            _btn = _obj.find( '.tvShow__btn' ),
            _langSelect = _obj.find( '.tvShow__lang' ),
            _lang = _langSelect.val(),
            _myVKID = 153318495;

        //private methods
        var _addEvents = function() {

                _btn.on({
                    'click': function() {
                        _sendAjax();
                    }
                });

                _langSelect.on({
                    'change': function() {
                        _lang = $(this).val();
                    }
                });

            },
            _sendAjax = function() {
                var channel = '1plus1',
                    day = '2017-02-21',
                    result = $( '.tvShow__list' );

                $.ajax({
                    url: 'https://api.ovva.tv/v2/' + _lang + '/tvguide/' + channel + '/',
                    data: {

                    },
                    dataType: 'json',
                    type: "get",
                    success: function (msg) {
                        $( '.tvShow__list > *' ).remove();
                        console.log(msg)

                        var lengthTVShow = msg.data.programs.length;

                        for ( var i = 0; i < lengthTVShow; i++ ) {
                            var time = msg.data.programs[i].realtime_begin,
                                subtitle = msg.data.programs[i].subtitle,
                                title = msg.data.programs[i].title,
                                TVdate = new Date(msg.data.date),
                                dateMsec = TVdate.getTime()/1000,
                                hours = Math.floor((time - dateMsec)/2400),
                                minutes = (time - dateMsec - hours*2400)/40;

                            result.append( '<div class="tvShow__item">' +
                                '<strong class="tvShow__item-time">' + hours + ':' + minutes + '</strong>' +
                                '<img class="tvShow__item-thumbnail" src="' + msg.data.programs[i].image.preview + '" alt="">' +
                                '<div class="tvShow__item-description"><span class="tvShow__item-title">' + title + '</span>' +
                                '<span class="tvShow__item-subtitle">' + subtitle + '</span></div>' +
                                '' +
                                '' +
                                '' +
                                '' +
                                '' +
                                '' +
                                '' +
                                '' +
                                '</div>' );
                        }

                        // sendwallpost( ( '.tvShow__list' ) );
                    },
                    error: function (XMLHttpRequest) {
                        if (XMLHttpRequest.statusText != "abort") {
                            //alert("ERROR!!!");
                        }
                    }
                });
            },
            _sendWallPost = function( myPost ) {
                VK.api("wall.post", {
                    owner_id: '',
                    message: myPost
                } );
            },
            _initVK = function() {
                VK.init({
                    apiId: _myVKID
                });
            },
            _init = function() {
                _addEvents();
                _initVK();
            };

        //public properties

        //public methods

        _init();
    };

} )();