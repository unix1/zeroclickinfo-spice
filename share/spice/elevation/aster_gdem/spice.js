function ddg_spice_elevation_aster_gdem(r) {
    // Ocean areas have been masked as "no data"
    // and have been assigned a value of -9999 
    if (r.astergdem == -9999) return;
    var answer = 'Elevation at ' + r.lat + '° latitude, '
               + r.lng + '° longitude is ' + r.astergdem + 'm.'
               + ' Measured by the <a href="https://en.wikipedia.org/wiki/'
               + 'ASTER_GDEM#ASTER_Global_Digital_Elevation_Model">'
               + 'ASTER Global Digital Elevation Model</a>.';
	var items = new Array();
	items[0] = new Array();
    items[0]['a'] = answer;
	items[0]['s'] = 'GeoNames';
	items[0]['u'] = 'http://www.geonames.org/';
	nra(items);
}
