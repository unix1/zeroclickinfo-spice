function ddg_spice_earthquakes(response) {
    console.log(response);
    var query = DDG.get_query();
    var year = query.search(/\d{4}/);
    query = (year == -1 ? 'Recent Earthquakes'
            : 'Earthquakes in ' + query.substr(year, 4));
    var earthquakes = response.earthquakes;
	var out = '';
	for(var i = 0;i < earthquakes.length;i++) {
        var earthquake = earthquakes[i];
        var region = earthquake.region.charAt(0).toUpperCase()
                   + earthquake.region.slice(1);
        var date = new Date(earthquake.timedate.replace(/-/g, '/'));
        var time = Math.abs(date.getHours() - 12) + ':' + date.getMinutes()
                 + (date.getHours() < 12 ? 'am' : 'pm');
        date.setHours(0,0,0,0);
        var now = new Date().setHours(0,0,0,0);
        var time_difference = now - date.getTime();
        var days_ago = Math.floor(time_difference / (24*60*60*1000));
        var relative_time = (days_ago == 0 ? 'today' :
                                (days_ago == 1 ? 'yesterday' :
                                     days_ago + ' days ago'));
		out += '<fieldset>'
             + '<legend>'
             + '<a href="http://maps.google.com/?ll='
             + earthquake.lat + ',' + earthquake.lon + '">'
             + earthquake.region + '</a> '
             + relative_time + ' at ' + time
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
