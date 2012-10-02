function ddg_spice_reverse_iplookup(response) {
    var query = decodeURIComponent(rq);
    query = query.replace(/ ?(reverse|lookup) ?/gi, "")

	var items = new Array();
	items[0] = new Array();
    items[0]['a'] = "XML";
	items[0]['h'] = query + " (Reverse IP Lookup)";
	items[0]['s'] = 'WhatIsOnIP';
	items[0]['u'] = 'http://whatisonip.com';
    items[0]["force_big_header"] = true;
	
	nra(items);
}
