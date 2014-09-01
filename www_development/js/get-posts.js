/**
* Get posts component
* @authors: ibarbieri
* @description: get all the post of the boca-app blog
*/
(function (win) {

    'use strict';

    var urlRecentPosts = 'http://ibdesigns.com.ar/clients/boca-app-wp/api/get_recent_posts/',
        responseRecentPosts;

    $.ajax({
        type: 'GET',
        url: urlRecentPosts,
        // async: false,
        contentType: "application/json",
        dataType: 'jsonp',
        success: function (json) {
            responseRecentPosts = json;

            console.log(responseRecentPosts.posts.length);

            var newsTitle = responseRecentPosts.posts[0].title,
                newsImagesUrl = responseRecentPosts.posts[0].attachments[1].url;
            // console.log(responseRecentPosts.posts[0].attachments[0].url);
            // console.log(responseRecentPosts.posts[0].attachments[1].url);
            $('.news-title').text(newsTitle);
        }
    });



}(this));