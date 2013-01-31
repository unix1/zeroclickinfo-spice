function ddg_spice_earthquakes(response) {
    var query = DDG.get_query();
    var year = query.search(/\d{4}/);
    query = (year == -1 ? 'Recent Earthquakes'
            : 'Earthquakes in ' + query.substr(year, 4));
    var earthquakes = response.earthquakes;
	var out = '';
	for(var i = 0;i < earthquakes.length;i++) {
        var earthquake = earthquakes[i];
		out += '<fieldset>'
             + '<legend>'
             + '<a href="http://maps.google.com/?ll='
             + earthquake.lat + ',' + earthquake.lon + '">'
             + earthquake.region + '</a>'
             + ' at ' + earthquake.timedate.replace(/-/g,'/')
             + '</legend>'
             + + earthquake.magnitude + ' magnitude at '
             + earthquake.depth + 'km depth '
             + '</fieldset>';
	}

	var items = new Array();
	items[0] = new Array();
    items[0]['a'] = out;
	items[0]['h'] = query;
	items[0]['s'] = 'SEISMI';
	items[0]['u'] = 'http://www.seismi.org/';
    items[0]["force_big_header"] = true;
	
	nra(items);
}
