/**
* Get posts component
* @authors: ibarbieri
* @description: get all the home news of the boca-app blog
*/
(function (win) {

    'use strict';

    var urlVideos = 'http://ibdesigns.com.ar/clients/boca-app-wp/api/get_category_posts/?slug=videos',
        responseVideos,
        responseVideosLength,
        lastResponseCount = 0,
        newResponseDifference = 0,
        videosContext = $('#videosList');


    var getVideosData = function () {
        $.ajax({
            type: 'GET',
            url: urlVideos,
            // async: false,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function (json) {
                responseVideos = json;
                responseVideosLength = responseVideos.posts.length;

                renderVideos(responseVideosLength);



                newResponseDifference = responseVideosLength - lastResponseCount;

                if (lastResponseCount === 0) {
                    renderVideos(responseVideosLength);

                } else if (newResponseDifference >= 1) {
                    updateVideos(newResponseDifference);
                }


            }
        });
    },


    renderVideos = function (responseVideosLength) {

        var i,
            datePostFromNow;

        for (i = 0; i < responseVideosLength; i++) {

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

            datePostFromNow = moment(responseVideos.posts[i].date).fromNow('withoutSuffix', 'key');

            videosContext.append("<li class='video-content-"+i+"'><div class='video-titles-content'><h1 class='video-title'>"+responseVideos.posts[i].title+"</h1><h2 class='video-sub-title'>"+responseVideos.posts[i].excerpt+"</h2></div><div class='video-time-content'><i class='fa fa-clock-o'></i><span class='video-time'>"+datePostFromNow+"</span></div><div class='video-iframe'><iframe width='560' height='315' src="+responseVideos.posts[i].custom_fields.urlYoutubeVideo+" frameborder='0' allowfullscreen></iframe></div><div class='video-heart-content'><i class='fa fa-heart-o'></i><i class='fa fa-heart'></i></div><div class='video-social-content'><i class='fa fa-plus-circle'></i><i class='fa fa-facebook-square'></i><i class='fa fa-twitter-square'></i></div></li>");

        }
    },

    updateVideos = function (newResponseDifference) {

        var j,
            datePostFromNow;

        if (newResponseDifference >= 1) {
            newResponseDifference = newResponseDifference - 1;
        }

        for (j = newResponseDifference; j >= 0; j--) {
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

            datePostFromNow = moment(responseVideos.posts[j].date).fromNow('withoutSuffix', 'key');

            videosContext.prepend("<li class='video-content-"+i+"'><div class='video-titles-content'><h1 class='video-title'>"+responseVideos.posts[i].title+"</h1><h2 class='video-sub-title'>"+responseVideos.posts[i].excerpt+"</h2></div><div class='video-time-content'><i class='fa fa-clock-o'></i><span class='video-time'>"+datePostFromNow+"</span></div><div class='video-iframe'><iframe width='560' height='315' src="+responseVideos.posts[i].custom_fields.urlYoutubeVideo+" frameborder='0' allowfullscreen></iframe></div><div class='video-heart-content'><i class='fa fa-heart-o'></i><i class='fa fa-heart'></i></div><div class='video-social-content'><i class='fa fa-plus-circle'></i><i class='fa fa-facebook-square'></i><i class='fa fa-twitter-square'></i></div></li>");
        }

        lastResponseCount = responseVideosLength;

    };


    // Expose the component
    win.getVideosData = getVideosData;


}(this));