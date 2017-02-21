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
            _date = $( '.tvShow-date' ),
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
                    day = _date.val(),
                    result = $( '.tvShow__list' );

                $.ajax({
                    url: 'https://api.ovva.tv/v2/' + _lang + '/tvguide/' + channel + '/' + day,
                    data: {

                    },
                    dataType: 'json',
                    type: "get",
                    success: function (msg) {
                        $( '.tvShow__list > *' ).remove();
                        console.log(msg)

                        var lengthTVShow = msg.data.programs.length;

                        for ( var i = 0; i < lengthTVShow; i++ ) {
                            var timestamp = msg.data.programs[i].realtime_begin*1000,
                                subtitle = msg.data.programs[i].subtitle,
                                title = msg.data.programs[i].title,
                                TVdate = new Date( timestamp ),
                                hours = TVdate.getHours(),
                                minutes = TVdate.getMinutes(),
                                isOnTheAir = '';

                            if ( hours < 10 ) {
                                hours = '0' + hours;
                            }

                            if ( minutes < 10 ) {
                                minutes = '0' + minutes;
                            }

                            if ( msg.data.programs[i].is_on_the_air ) {
                                isOnTheAir = 'active'
                            }

                            result.append( '<div class="tvShow__item ' + isOnTheAir + '">' +
                                '<img class="tvShow__item-thumbnail" src="' + msg.data.programs[i].image.preview + '" alt="">' +
                                '<div class="tvShow__item-description">' +
                                '<strong class="tvShow__item-time">' + hours + ':' + minutes + '</strong>' +
                                '<span class="tvShow__item-title">' + title + '</span>' +
                                '<span class="tvShow__item-subtitle">' + subtitle + '</span>' +
                                '</div>' +
                                '</div>' );

                            isOnTheAir = '';
                        }

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
            _initDatePicker = function() {
                _date.datepicker({ dateFormat: 'yy-mm-dd' });
            },
            _init = function() {
                _addEvents();
                _initDatePicker();
                _initVK();
            };

        //public properties

        //public methods

        _init();
    };

} )();