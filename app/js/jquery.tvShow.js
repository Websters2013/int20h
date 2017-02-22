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
            _langSelect = $( '.tvShow-lang select' ),
            _objDateTitle = _obj.find( '.tvShow__date' ),
            _date = $( '.tvShow-date' ),
            _lang = _langSelect.val(),
            _myVKID = 153318495,
            _sharingImage = 'http://mysite.com/mypic.jpg',
            _siteTitle = $( '.site__title' );

        //private methods
        var _addEvents = function() {

                _date.on({
                    'change': function() {
                        _sendAjax();
                    }
                });

                _langSelect.on({
                    'change': function() {
                        _lang = $( this ).val();

                        $( this ).parent().find( 'span' ).text( _lang );
                        _sendAjax();
                    }
                });

            },
            _sendAjax = function() {
                var channel = '1plus1',
                    day = _date.val(),
                    result = $( '.tvShow__list' );

                $.ajax({
                    url: 'https://api.ovva.tv/v2/' + _lang + '/tvguide/' + channel + '/' + day,
                    dataType: 'json',
                    type: "get",
                    success: function ( msg ) {

                        if ( msg.error ) {
                            alert( msg.error )
                        } else {
                            var dateArray = _date.val().split('-');

                            _objDateTitle.text( dateArray[2] + '.' + dateArray[1] + '.' + dateArray[0] );
                            $( '.tvShow__list > *' ).remove();

                            _siteTitleChange();

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
                        }

                    },
                    error: function ( XMLHttpRequest ) {
                        if ( XMLHttpRequest.statusText != "abort" ) {
                            alert( "ERROR!!!" );
                        }
                    }
                });
            },
            _siteTitleChange = function() {

                switch ( _lang ) {
                    case 'ua':
                        _siteTitle.text( 'TV програма' );
                        break;
                    case 'ru':
                        _siteTitle.text( 'TV программа' );
                        break;
                    default:
                        break;
                }
            },
            _initVK = function() {
                VK.init({
                    apiId: _myVKID
                });
                // VK.api("wall.post", {"message": "Hello!"}, function (data) {
                //     alert("Post ID:" + data.response.post_id);
                // });
            },
            _addSharedButton = function() {
                $( '.site__header-column_buttons' ).append(
                    VK.Share.button(
                        {
                            // url: 'http://mysite.com',
                            title: '1+1 program',
                            description: 'Программа телепередач на сегодня',
                            image: _sharingImage,
                            noparse: true
                        },
                        {
                            type: 'custom',
                            text: '<button class="sharing"></button>'}
                    )
                );
            },
            _initDatePicker = function() {
                _date.datepicker({ dateFormat: 'yy-mm-dd' }).datepicker( "setDate", new Date());
            },
            _init = function() {
                _addEvents();
                _initDatePicker();
                _initVK();
                _addSharedButton();
                _siteTitleChange();
            };

        //public properties

        //public methods

        _init();
    };

} )();