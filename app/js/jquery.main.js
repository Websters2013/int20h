"use strict";
( function(){

    VK.init({
        apiId: 153318495
    });

    $( '.sendAPI' ).on( {
        'click': function () {
            var lang = 'ua',
                channel = '1plus1',
                day = '2017-02-21',
                result = $( '.tvShow' );

            $.ajax({
                url: 'https://api.ovva.tv/v2/' + lang + '/tvguide/' + channel + '/',
                data: {

                },
                dataType: 'json',
                type: "get",
                success: function (msg) {

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
                            '<strong class="tvShow__time">' + hours + ':' + minutes + '</strong>' +
                            '<img src="' + msg.data.programs[i].image.preview + '" alt="">' +
                            '<div class="tvShow__description"><span class="tvShow__subtitle">' + subtitle + '</span>' +
                            '<span class="tvShow__title">' + title + '</span></div>' +
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

                    // sendwallpost( result );
                },
                error: function (XMLHttpRequest) {
                    if (XMLHttpRequest.statusText != "abort") {
                        //alert("ERROR!!!");
                    }
                }
            });
        }
    } );

    function sendwallpost( mypost ) {
        VK.api("wall.post", {
            owner_id: '',
            message: mypost
        } );
    }

} )();