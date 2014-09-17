/**
* Get posts component
* @authors: ibarbieri
* @description: get all the home news of the boca-app blog
*/
(function (win) {

    'use strict';

    var urlNews = 'http://ibdesigns.com.ar/clients/boca-app-wp/api/get_category_posts/?slug=news',
        responseNews,
        responseNewsLength;


    var getNewsData = function () {
        $.ajax({
            type: 'GET',
            url: urlNews,
            // async: false,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function (json) {
                responseNews = json;
                responseNewsLength = responseNews.posts.length;

                renderNews(responseNewsLength);
            }
        });
    },


    renderNews = function (responseNewsLength) {

        var i,
            datePostFromNow,
            newsHomeContext = $('#news ul');

        // Si no me lee el attachment es porque la imagen tiene que estar recien subida al post y
        // no ser una imagen vieja que no existe mas.
        for (i = 0; i < responseNewsLength; i++) {

            moment.locale('es', {
                relativeTime : {
                    future: "in %s",
                    past:   "%s ago",
                    s:  "s",
                    m:  "m",
                    mm: "%dm",
                    h:  "h",
                    hh: "%dh",
                    d:  "d",
                    dd: "%dd",
                    M:  "m",
                    MM: "%dm",
                    y:  "a",
                    yy: "%da"
                }
            });

            // Este evento lo creo cuando yo termine de hacer algo por ejemplo de cargar algo
            // y luego lo escucho de donde quiero.
            //llamada ajax... finaliza y creo el evento file load.
            //$(document).trigger('fileLoaded', ['file.hmtl']);
            //
            // $(document).on('fileLoaded', function (e, fileName){
            //  alert(fileName);
            // });

            datePostFromNow = moment(responseNews.posts[i].date).fromNow('withoutSuffix', 'key');

            newsHomeContext.append("<li class='news-content-"+i+"'><div class='news-titles-content'><h1 class='news-title'>"+responseNews.posts[i].title+"</h1><h2 class='news-sub-title'>"+responseNews.posts[i].excerpt+"</h2></div><div class='news-time-content'><i class='fa fa-clock-o'></i><span class='news-time'>"+datePostFromNow+"</span></div><div class='slider sliderHome'><ul class='slide-group'><li class='slide'><a class='navigate-right' href='news.html' data-transition='slide-in'><img src="+responseNews.posts[i].attachments[0].url+" class='img-responsive'></a></li><li class='slide'><img src="+responseNews.posts[i].attachments[0].url+" class='img-responsive'></li><li class='slide'><img src="+responseNews.posts[i].attachments[0].url+" class='img-responsive'></li></ul></div><div class='news-heart-content'><i class='fa fa-heart-o'></i><i class='fa fa-heart'></i></div><div class='news-social-content'><i class='fa fa-plus-circle'></i><i class='fa fa-facebook-square'></i><i class='fa fa-twitter-square'></i></div></li>");
        }
    };


    // Expose the component
    win.getNewsData = getNewsData;


}(this));