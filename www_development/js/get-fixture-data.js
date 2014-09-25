/**
* Get posts component
* @authors: ibarbieri
* @description: get all the home news of the boca-app blog
*/
(function (win) {

    'use strict';

    var urlFixture = 'http://ibdesigns.com.ar/clients/boca-app-wp/api/get_category_posts/?slug=fixture',
        responseFixture,
        responseFixtureLength,
        lastResponseCount = 0,
        newResponseDifference = 0,
        fixtureContext = $('#fixtureList');


    var getFixtureData = function () {
        $.ajax({
            type: 'GET',
            url: urlFixture,
            // async: false,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function (json) {
                responseFixture = json;
                responseFixtureLength = responseFixture.posts.length;

                renderFixture(responseFixtureLength);

                newResponseDifference = responseFixtureLength - lastResponseCount;

                if (lastResponseCount === 0) {
                    renderFixture(responseFixtureLength);

                } else if (newResponseDifference >= 1) {
                    updateFixture(newResponseDifference);
                }

            }
        });
    },


    renderFixture = function (responseFixtureLength) {

        var i,
            datePostFromNow;

        // Si no me lee el attachment es porque la imagen tiene que estar recien subida al post y
        // no ser una imagen vieja que no existe mas.
        for (i = 0; i < responseFixtureLength; i++) {

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

            datePostFromNow = moment(responseFixture.posts[i].date).fromNow('withoutSuffix', 'key');

            fixtureContext.append("<li class='news-content-"+i+"'><div class='news-titles-content'><h1 class='news-title'>"+responseFixture.posts[i].title+"</h1><h2 class='news-sub-title'>"+responseFixture.posts[i].excerpt+"</h2></div><div class='news-time-content'><i class='fa fa-clock-o'></i><span class='news-time'>"+datePostFromNow+"</span></div><div class='slider sliderHome'><ul class='slide-group'><li class='slide'><div class='fixture-local-team'><span>"+responseFixture.posts[i].custom_fields.localTeam+"</span><img src="+responseFixture.posts[i].attachments[0].url+" class='img-responsive'></div><div class='fixture-visitor-team'><span>"+responseFixture.posts[i].custom_fields.visitorTeam+"</span><img src="+responseFixture.posts[i].attachments[1].url+" class='img-responsive'></div><div class='fixture-info'><span>"+responseFixture.posts[i].custom_fields.matchNumber+"</span><span>"+responseFixture.posts[i].custom_fields.matchDay+"</span></div></li></ul></div><div class='news-heart-content'><i class='fa fa-heart-o'></i><i class='fa fa-heart'></i></div><div class='news-social-content'><i class='fa fa-plus-circle'></i><i class='fa fa-facebook-square'></i><i class='fa fa-twitter-square'></i></div></li>");
        }
    },


    updateFixture = function (newResponseDifference) {

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

            datePostFromNow = moment(responseFixture.posts[j].date).fromNow('withoutSuffix', 'key');

            fixtureContext.prepend("<li class='news-content-"+i+"'><div class='news-titles-content'><h1 class='news-title'>"+responseFixture.posts[i].title+"</h1><h2 class='news-sub-title'>"+responseFixture.posts[i].excerpt+"</h2></div><div class='news-time-content'><i class='fa fa-clock-o'></i><span class='news-time'>"+datePostFromNow+"</span></div><div class='slider sliderHome'><ul class='slide-group'><li class='slide'><div class='fixture-local-team'><span>"+responseFixture.posts[i].custom_fields.localTeam+"</span><img src="+responseFixture.posts[i].attachments[0].url+" class='img-responsive'></div><div class='fixture-visitor-team'><span>"+responseFixture.posts[i].custom_fields.visitorTeam+"</span><img src="+responseFixture.posts[i].attachments[1].url+" class='img-responsive'></div><div class='fixture-info'><span>"+responseFixture.posts[i].custom_fields.matchNumber+"</span><span>"+responseFixture.posts[i].custom_fields.matchDay+"</span></div></li></ul></div><div class='news-heart-content'><i class='fa fa-heart-o'></i><i class='fa fa-heart'></i></div><div class='news-social-content'><i class='fa fa-plus-circle'></i><i class='fa fa-facebook-square'></i><i class='fa fa-twitter-square'></i></div></li>");
        }

        lastResponseCount = responseFixtureLength;

    };


    // Expose the component
    win.getFixtureData = getFixtureData;


}(this));