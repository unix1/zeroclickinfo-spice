function ddg_spice_library_of_congress(response) {
    
    console.log(response);

	var items = new Array();
	items[0] = new Array();
    items[0]['a'] = 'test';
	items[0]['h'] = " (Library of Congress)";
	items[0]['s'] = 'Maps';
	items[0]['u'] = 'http://loc.gov';
    items[0]["force_big_header"] = true;
	
	nra(items);
}
