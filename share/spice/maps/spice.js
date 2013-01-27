function ddg_spice_maps(response) {
    
    console.log('test');

    console.log(response);

	var items = new Array();
	items[0] = new Array();
    items[0]['a'] = 'test';
	items[0]['h'] = " (Maps)";
	items[0]['s'] = 'Maps';
	items[0]['u'] = 'http://here.com';
    items[0]["force_big_header"] = true;
	
	nra(items);
}
