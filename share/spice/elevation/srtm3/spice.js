function ddg_spice_elevation_srtm3(r) {
    // Ocean areas have been masked as "no data"
    // and have been assigned a value of -32768 
    if (r.srtm3 == -32768) return;
    var answer = 'Elevation at ' + r.lat + '° latitude, '
               + r.lng + '° longitude is ' + r.srtm3 + 'm.'
               + ' Measured by the <a href="https://en.wikipedia.org/wiki/SRTM">'
               + 'SRTM</a>.';
	var items = new Array();
	items[0] = new Array();
    items[0]['a'] = answer;
	items[0]['s'] = 'GeoNames';
	items[0]['u'] = 'http://www.geonames.org/';
	nra(items);
}
