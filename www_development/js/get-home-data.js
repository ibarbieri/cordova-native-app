/**
* Get posts component
* @authors: ibarbieri
* @description: get all the home news of the boca-app blog
*/
(function (win) {

    'use strict';

    var urlHomeNews,
        responseHomeNews,
        responseHomeNewsLength,
        lastResponseCount = 0,
        newResponseDifference = 0,
        newsHomeContext = $('#homeNewsList');


    var getHomeData = function () {

        urlHomeNews = 'http://ibdesigns.com.ar/clients/boca-app-wp/api/get_category_posts/?slug=home-news';

        $.ajax({
            type: 'GET',
            url: urlHomeNews,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function (json) {
                responseHomeNews = json;
                responseHomeNewsLength = responseHomeNews.posts.length;

                newResponseDifference = responseHomeNewsLength - lastResponseCount;

                if (lastResponseCount === 0) {
                    renderHomeNews(responseHomeNewsLength);

                } else if (newResponseDifference >= 1) {
                    updateHomeNews(newResponseDifference);
                }
            }
        });
    },


    renderHomeNews = function (responseHomeNewsLength) {

        var i,
            datePostFromNow;

        for (i = lastResponseCount; i < responseHomeNewsLength; i++) {

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

            datePostFromNow = moment(responseHomeNews.posts[i].date).fromNow('withoutSuffix', 'key');

            newsHomeContext.append("<li class='news-content-"+i+"'><div class='news-titles-content'><h1 class='news-title'>"+responseHomeNews.posts[i].title+"</h1><h2 class='news-sub-title'>"+responseHomeNews.posts[i].excerpt+"</h2></div><div class='news-time-content'><i class='fa fa-clock-o'></i><span class='news-time'>"+datePostFromNow+"</span></div><div class='slider sliderHome'><ul class='slide-group'><li class='slide'><a class='navigate-right' href='news.html' data-transition='slide-in'><img src="+responseHomeNews.posts[i].attachments[0].url+" class='img-responsive'></a></li><li class='slide'><img src="+responseHomeNews.posts[i].attachments[0].url+" class='img-responsive'></li><li class='slide'><img src="+responseHomeNews.posts[i].attachments[0].url+" class='img-responsive'></li></ul></div><div class='news-heart-content'><i class='fa fa-heart-o'></i><i class='fa fa-heart'></i></div><div class='news-social-content'><i class='fa fa-plus-circle'></i><i class='fa fa-facebook-square'></i><i class='fa fa-twitter-square'></i></div></li>");
        }

        lastResponseCount = responseHomeNewsLength;

    },

    updateHomeNews = function (newResponseDifference) {

        var j,
            datePostFromNow;

        if (newResponseDifference >= 1) {
            // This is for the prepend don't render the old last notice tha the user jave yet
            newResponseDifference = newResponseDifference - 1;
        }

        for (j = newResponseDifference; j >= 0; j--) {
            console.log('update noticias', j);

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

            datePostFromNow = moment(responseHomeNews.posts[j].date).fromNow('withoutSuffix', 'key');

            newsHomeContext.prepend("<li class='news-content-"+j+"'><div class='news-titles-content'><h1 class='news-title'>"+responseHomeNews.posts[j].title+"</h1><h2 class='news-sub-title'>"+responseHomeNews.posts[j].excerpt+"</h2></div><div class='news-time-content'><i class='fa fa-clock-o'></i><span class='news-time'>"+datePostFromNow+"</span></div><div class='slider sliderHome'><ul class='slide-group'><li class='slide'><a class='navigate-right' href='news.html' data-transition='slide-in'><img src="+responseHomeNews.posts[j].attachments[0].url+" class='img-responsive'></a></li><li class='slide'><img src="+responseHomeNews.posts[j].attachments[0].url+" class='img-responsive'></li><li class='slide'><img src="+responseHomeNews.posts[j].attachments[0].url+" class='img-responsive'></li></ul></div><div class='news-heart-content'><i class='fa fa-heart-o'></i><i class='fa fa-heart'></i></div><div class='news-social-content'><i class='fa fa-plus-circle'></i><i class='fa fa-facebook-square'></i><i class='fa fa-twitter-square'></i></div></li>");
        }

        lastResponseCount = responseHomeNewsLength;

    };


    // Expose the component
    win.getHomeData = getHomeData;


}(this));