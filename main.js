// 
//  main.js
//  gloryfishfour
//  
//  Created by Jay Roberts on 2010-04-01.
//  Copyright 2010 GloryFish.org. All rights reserved.
// 


$(document).ready(function() {
  if(!navigator.userAgent.match(/iPhone/i) && !navigator.userAgent.match(/iPod/i)) { 
    $('span.more').hide();
  }
  
  $('a.item').hover(
    function() {
      $(this).next('span').show('medium');
    },
    function() {
      // $(this).next('span').hide('medium');
    }
  );
  
  // Get data
  $.getJSON('http://api.twitter.com/1/statuses/user_timeline/gloryfish.json?count=3&callback=?', twitterCallback);
  $.getJSON('http://api.flickr.com/services/feeds/photos_public.gne?id=46298308@N00&lang=en-us&format=json&jsoncallback=?', flickrCallback);
  $.getJSON('http://github.com/api/v2/json/repos/show/gloryfish?callback=?', githubCallback);
  $.getJSON('http://stackoverflow.com/users/flair/3238.json?callback=?', soCallback);

});

function twitterCallback(statuses) {
  $.each(statuses, function(index, status) {
    $('#twitter').append('<li>' + status.text + ' -<a href="http://twitter.com/glorygish/status/' + status.id + '">' + prettyDate(status.created_at) + '</a></li>')
  });
}

function flickrCallback(data) {
  $.each(data.items, function(index, photo) {
    if (index > 2) {
      return;
    }
    $('#photos ul').append('<li><a href="' +  photo.link + '"><img src="' + photo.media.m + '" alt="' + photo.title + '" /></a></li>');
  });
};

function githubCallback(data) {
  $.each(data.repositories, function(index, repo) {
    $('#repos ul').append('<li><a href="http://github.com/gloryfish/' + repo.name + '">' + repo.name + '</a><span class="description">' + repo.description + '</span></li>');
  });
}

function soCallback(data) {
    $("#gravatar").append(data.gravatarHtml);
    $("#reputation").append(data.reputation);
    $("#badges").append(data.badgeHtml);
};

/*
 * JavaScript Pretty Date
 * Copyright (c) 2008 John Resig (jquery.com)
 * Licensed under the MIT license.
 */

// Takes an ISO time and returns a string representing how
// long ago the date represents.
function prettyDate(time) {
	var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
		diff = (((new Date()).getTime() - date.getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);
			
	if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
		return;
			
	return day_diff == 0 && (
			diff < 60 && "just now" ||
			diff < 120 && "1 minute ago" ||
			diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
			diff < 7200 && "1 hour ago" ||
			diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
		day_diff == 1 && "Yesterday" ||
		day_diff < 7 && day_diff + " days ago" ||
		day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
}