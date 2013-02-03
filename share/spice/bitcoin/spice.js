function ddg_spice_bitcoin(response) {
    console.log(response);
    var query = decodeURIComponent(rq);
    query = query.replace(/(btc|bitcoins?)( address( of)?)?/gi, "")

	var items = new Array();
	items[0] = new Array();
    items[0]['a'] = 'test';
	items[0]['h'] = query + " (Bitcoin Address)";
	items[0]['s'] = 'BitCoin.info';
	items[0]['u'] = 'http://bitcoin.info/address/' + query;
    items[0]["force_big_header"] = true;
	
	nra(items);
}
