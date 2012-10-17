function ddg_spice_google_plus(google) {
	var out = '';
	var query = DDG.get_query(); //"google+ this is a test"; 
	var re = /\s*(google\+|google\splus|g\+|gplus|google\+\suser|g\+\suser|google\splus\suser|google\+\sprofile|g\+\sprofile|gplus\sprofile|gplus\suser|g\splus\sprofile|g\splus\suser)\s*/;
	var query = query.replace(re, "");
    var display = [];
	if(google.kind === "plus#peopleFeed" && google.items.length > 0) {
		var item, limit, image;

		//Sometimes, the API returns a lot of results even if we
		//asked for only five. (e.g. coke)
		if(google['items'].length > 4) {
			limit = 4;
		} else {
			limit = google['items'].length;
		}

		for (var i = 0;i < limit;i++) {
		    item = google.items[i];
            image = item.image.url.replace(/sz=50$/, "sz=100");
            display[i] = {
                title: item.displayName,
                url: item.url,
                image: {
                    url: image,
                    width: 100,
                    height: 100
                }
            };
		}
        out += DDG.tile(display);

		var items = new Array();
		items[0] = new Array();
		items[0]['a'] = out + '<div style="clear:both;"></div>';
		items[0]['h'] = 'Google+ Users (' + query + ')';
		items[0]['s'] = 'Google+';
		items[0]['f'] = 1;
		items[0]['u'] = 'http://plus.google.com/s/' + query;
		nra(items,1,1);
	} else if(google.kind === "plus#person") {
		//Check if the user has a tagline
		//Tagline or the about me page can be displayed here.
		if (google.tagline && google.tagline !== '<br>') {
			out += '<div class="google_profile"><i>Introduction: </i> ' + google.tagline + '</div>';
		} else if(google.aboutMe && google.aboutMe !== '<br>') {
			out += '<div class="google_profile"><i>Introduction: </i> ' + google.aboutMe.substring(0, 200);
			if(google.aboutMe.length > 200) {
				out += '...' + '</div>';
			} else {
				out += '</div>';
			}
		}

		//Check for organizations
		if(google.organizations) {
			var orgs = '', length;
			if(google.organizations.length > 2) {
				length = 2;
			} else {
				length = google.organizations.length;
			}
			for(var i=0;i < length;i++) {
				orgs += google.organizations[i].name + 
					(google.organizations[i].title ? ' (' + google.organizations[i].title + ')' : '');
				if(i !== length-1) {
					orgs += ', ';
				}
			}
			out += '<div class="google_orgs"><i>Organizations: </i>' + orgs + '</div>';
		} 

		//Check if the person has lived in several places.
		if(google.placesLived) {
			var places = '';
			for(var i=0;i < google.placesLived.length;i++) {
				if(google.placesLived[i].primary) {
					places += google.placesLived[i].value;
					out += '<div class="google_places"><i>Lives in: </i>' + places + '</div>';
				}
			}
		}
		//Check if the person has links to show.
		if(google.urls) {
			var links = '', unique = [];
			if(google.urls.length > 2) {
				google.urls.length -= 2;
				for(var i=0;i < google.urls.length;i++) {
					if(unique.indexOf(google.urls[i].value) === -1) {
						unique.push(google.urls[i].value);
						var re = /(?:https?:\/\/)?(?:www\.)?([^\/]+)\/?.*/;
						var string =  google.urls[i].value.toLowerCase();
						string = string.replace(re, "$1");
						re = /\.(?:com|net|org)/;
						string = string.replace(re, "");
						links += '<a href="' + google.urls[i].value + '" title="' + google.urls[i].value + '">' + 
							string + '</a>';
						links += ', ';
					}
				}
				if(links.substring(links.length-2, links.length) === ', ') {
					links = links.substring(0, links.length-3);
				}
				out += '<div class="google_links"><i>Links: </i>' + links + '</div>';
			}
		}
		var items = [[]];
		items[0]['a'] = out;
		items[0]['h'] = google.displayName + ' (Google+)';
		items[0]['s'] = 'Google+';
		items[0]['u'] = google.url;
		items[0]['f'] = 1;
		items[0]['i'] =	google.image.url.substring(0, google.image.url.length-6);
		nra(items);
	}
}
