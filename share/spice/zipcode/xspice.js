function ddg_spice_zipcode(response) {
    var snippet = '';
    if (!result.places.place) return
    var places = result.places.place;
    var place = places[0];
    
    //build up a place name from whatever components are available in the result
    var location_types = ['locality2', 'locality1', 'admin2', 'admin1'];
    for (i in location_types) {
    	if (place[location_types[i]]) loc_string += place[location_types[i]] + ', ';
    }
    if (place.country) loc_string += place.country;
    
    var zipcode = [];

    zipcode.approximate_area = place['postal attrs']['type']
                             + place['name'];

    //construct the bounding box for the postal code
	var coords = place['boundingBox'];
	var box = [[coords['southWest']['latitude'], coords['southWest']['longitude']],
	           [coords['northEast']['latitude'], coords['southWest']['longitude']], 
	           [coords['northEast']['latitude'], coords['northEast']['longitude']], 
	           [coords['southWest']['latitude'], coords['northEast']['longitude']], 
	           [coords['southWest']['latitude'], coords['southWest']['longitude']]];
	for(i = 0; i < box.length; i++){box[i] = box[i].join()};
	var coord_string = box.join(','); // change to '|' separator for Google Maps
	var center = [place['centroid']['latitude'], place['centroid']['longitude']].join()

    //bigbox sets a slightly larger frame for MapQuest's 'bestfit' parameter; not needed for Google
	var boxpad = (coords['northEast']['latitude'] - coords['southWest']['latitude']) * .25
	var bigbox = [[coords['northEast']['latitude']+boxpad, coords['southWest']['longitude']],  
		          [coords['southWest']['latitude']-boxpad, coords['northEast']['longitude']]].join();

    Spice.render({
        data             : zipcode,
        header1          : loc_string,
        source_url       : 'http://mapq.st/map?q=' + loc_string,
        source_name      : 'MapQuest',
        template_normal  : 'zipcode',
        force_big_header : true,
        force_no_fold    : true,
    });
}

function format_snippet(place, places){	

    //construct a list of other possible hits if available; generates new DDG inputs with country codes in parentheses to force the right code to the top of the results
    if (places.length > 1) {
    	var similar = '';
        for (i=1;i<places.length;i++){
    		if (places[i]['name'] == place['name']){
            	similar += '<a href = "http://www.duckduckgo.com/?q=postcode+' + encodeURI(places[i]['name']) + '+' + places[i]['country'] + '">' + places[i]['name'] + "</a> (" + places[i]['country'] + ')';	
                if (i+1 < places.length) similar += ', ';
    		}
    	}
        if (similar != ''){
            div.innerHTML += 'Similar postal codes: ';
            div.innerHTML += similar;
        }
    }

    return div;
}
