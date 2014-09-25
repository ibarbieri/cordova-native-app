/**
* Get posts component
* @authors: ibarbieri
* @description: get all the home news of the boca-app blog
*/
(function (win) {

    'use strict';

    var urlNews = 'http://ibdesigns.com.ar/clients/boca-app-wp/api/get_category_posts/?slug=news',
        responseNews,
        responseNewsLength,
        lastResponseCount = 0,
        newResponseDifference = 0,
        newsContext = $('#newsList');


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

                responseNews = json;
                responseNewsLength = responseNews.posts.length;

                newResponseDifference = responseNewsLength - lastResponseCount;

                if (lastResponseCount === 0) {
                    renderNews(responseNewsLength);
                } else if (newResponseDifference >= 1) {
                    updateNews(newResponseDifference);
                }
            }
        });
    },


    renderNews = function (responseNewsLength) {

        console.log('responseNewsLength', responseNewsLength);

        var i,
            datePostFromNow;

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

            datePostFromNow = moment(responseNews.posts[i].date).fromNow('withoutSuffix', 'key');

            newsContext.append("<li class='news-content-"+i+"'><div class='news-titles-content'><h1 class='news-title'>"+responseNews.posts[i].title+"</h1><h2 class='news-sub-title'>"+responseNews.posts[i].excerpt+"</h2></div><div class='news-time-content'><i class='fa fa-clock-o'></i><span class='news-time'>"+datePostFromNow+"</span></div><div class='slider sliderHome'><ul class='slide-group'><li class='slide'><a class='navigate-right' href='news.html' data-transition='slide-in'><img src="+responseNews.posts[i].attachments[0].url+" class='img-responsive'></a></li><li class='slide'><img src="+responseNews.posts[i].attachments[0].url+" class='img-responsive'></li><li class='slide'><img src="+responseNews.posts[i].attachments[0].url+" class='img-responsive'></li></ul></div><div class='news-heart-content'><i class='fa fa-heart-o'></i><i class='fa fa-heart'></i></div><div class='news-social-content'><i class='fa fa-plus-circle'></i><i class='fa fa-facebook-square'></i><i class='fa fa-twitter-square'></i></div></li>");
        }
    },

    updateNews = function (newResponseDifference) {

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

            datePostFromNow = moment(responseNews.posts[j].date).fromNow('withoutSuffix', 'key');

            newsContext.prepend("<li class='news-content-"+i+"'><div class='news-titles-content'><h1 class='news-title'>"+responseNews.posts[i].title+"</h1><h2 class='news-sub-title'>"+responseNews.posts[i].excerpt+"</h2></div><div class='news-time-content'><i class='fa fa-clock-o'></i><span class='news-time'>"+datePostFromNow+"</span></div><div class='slider sliderHome'><ul class='slide-group'><li class='slide'><a class='navigate-right' href='news.html' data-transition='slide-in'><img src="+responseNews.posts[i].attachments[0].url+" class='img-responsive'></a></li><li class='slide'><img src="+responseNews.posts[i].attachments[0].url+" class='img-responsive'></li><li class='slide'><img src="+responseNews.posts[i].attachments[0].url+" class='img-responsive'></li></ul></div><div class='news-heart-content'><i class='fa fa-heart-o'></i><i class='fa fa-heart'></i></div><div class='news-social-content'><i class='fa fa-plus-circle'></i><i class='fa fa-facebook-square'></i><i class='fa fa-twitter-square'></i></div></li>");
        }

        lastResponseCount = responseNewsLength;

    };


    // Expose the component
    win.getNewsData = getNewsData;


}(this));