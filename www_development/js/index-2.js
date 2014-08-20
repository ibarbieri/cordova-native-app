var urlRecentPosts = 'http://ibdesigns.com.ar/clients/boca-app-wp/api/get_recent_posts/',
    responseRecentPosts;
$.ajax({
   type: 'GET',
    url: urlRecentPosts,
    async: false,
    contentType: "application/json",
    dataType: 'jsonp',
    success: function (json) {
        responseRecentPosts = json;
        var title = responseRecentPosts.posts[0].title;
        $('#title').text(title);
    }
});
