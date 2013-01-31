var items = new Array();
items[0] = new Array();
items[0]['a'] = '';
items[0]['s'] = 'GeoNames';
items[0]['u'] = 'http://www.geonames.org/';
nra(items);

// Ocean areas have been masked as "no data"
// and have been assigned a value of -9999 

function ddg_spice_elevation_aster_gdem(r) {
    if (r.astergdem == -9999) return;
    var answer = 'Elevation at ' + r.lat + '° latitude, '
               + r.lng + '° longitude is:'
               + '<ul>'
               + '<li>' + r.astergdem + 'm'
               + ' by the <a href="https://en.wikipedia.org/wiki/'
               + 'ASTER_GDEM#ASTER_Global_Digital_Elevation_Model">'
               + 'ASTER Global Digital Elevation Model</a>'
               + '</li>';
    items[0]['a'] = answer;

    nrj('/js/spice/elevation/srtm3/' + r.lat + '/' + r.lng);
}
function ddg_spice_elevation_srtm3(r) {
    if (r.srtm3 == -32768) return;
    var answer = '<li>'
               + r.srtm3 + 'm'
               + ' by the <a href="https://en.wikipedia.org/wiki/SRTM">'
               + 'Shuttle Radar Topography Mission</a>'
               + '</li>';
    items[0]['a'] += answer;

    nrj('/js/spice/elevation/gtopo30/' + r.lat + '/' + r.lng);
}
function ddg_spice_elevation_gtopo30(r) {
    if (r.gtopo30 == -32768) return;
    var answer = '<li>'
               + r.gtopo30 + 'm'
               + ' by the <a href="https://en.wikipedia.org/wiki/GTOPO30">'
               + 'GTOPO30 Digital Elevation Model</a>'
               + '</li>'
               + '</ul>';
    items[0]['a'] += answer;
	nra(items);
}
