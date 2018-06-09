$(document).ready(function () {
    $("body").on("click", "#submit-button", function () {
        var keyword = $("#keyword").val();
        var articleNumber = $("#article-number").val();
        var startYear = $("#start-year").val();
        var endYear = $("#end-year").val();

		if (articleNumber <= 0 || !articleNumber) {
			articleNumber = 10;
		}

		if (!startYear && !endYear) {
			var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword +"&api-key=5f22c86521c340aaad440dea7cbb612f";
			console.log(queryUrl);
		} else if (!startYear) {
			var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword +"&end_date=" + endYear + "1231&api-key=5f22c86521c340aaad440dea7cbb612f";
			console.log(queryUrl);
		} else if (!endYear) {
			var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword +"&begin_date=" + startYear + "0101&api-key=5f22c86521c340aaad440dea7cbb612f";
			console.log(queryUrl);
		} else {
			var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword + "&begin_date=" + startYear + "0101&end_date=" + endYear + "1231&api-key=5f22c86521c340aaad440dea7cbb612f";
			console.log(queryUrl);
		}
		
		$.ajax({
            url: queryUrl,
            method: 'GET',
        }).then(function (response) {
			for (var i = 0; i < articleNumber; i++) {
				var newcard = $("<div>");
				var cardhead = $("<div>");
				var cardbody = $("<div>");
				var snippet = $("<p>");
				var link = $("<a>");

				$(newcard).addClass("card border-primary mb-3")
				$(newcard).attr("id", "return");
				$(cardhead).addClass("card header primary");
				$(cardhead).attr("id", "articletitle");
				$(cardbody).addClass("card-body text-primary");
				$(snippet).addClass("card-text");
				$(snippet).attr("id", "articlesnippet");
				$(link).addClass("card-link");
				$(link).attr("id", "articlelink");

				var headline = response.response.docs[i].headline.main;
				var snippettext = response.response.docs[i].snippet;
				var articlelinktext = response.response.docs[i].web_url;

				$(cardhead).append(headline);
				$(snippet).append(snippettext);
				$(link).append(articlelinktext);

				$(cardbody).append(snippet, link);
				$(newcard).append(cardhead, cardbody);
				$("#card-returns").append(newcard);
			}
    	});
    });
});