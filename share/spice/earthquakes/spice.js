function ddg_spice_earthquakes(response) {
    console.log(response);
    var earthquakes = response.earthquakes;
	var out = '<ul>';
	for(var i = 0;i < earthquakes.length;i++) {
        var earthquake = earthquakes[i];
		out += '<li>' + earthquake.magnitude + ' magnitude at '
             + earthquake.depth + 'km depth, ' + earthquake.region
             + ' [<a href="http://maps.google.com/?ll=' + earthquake.lat
             + ',' + earthquake.lon + '">' + earthquake.lat + ', '
             + earthquake.lon + '</a>],' + ' ' + earthquake.timedate.replace(/-/g,'/');
	}
	out += '</ul>';

	var items = new Array();
	items[0] = new Array();
    items[0]['a'] = out;
	items[0]['h'] = "Most recent earthquakes";
	items[0]['s'] = 'SEISMI';
	items[0]['u'] = 'http://www.seismi.org/';
    items[0]["force_big_header"] = true;
	
	nra(items);
}
