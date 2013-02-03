function ddg_spice_bitcoin(response) {
    console.log(response);
    res = response;

    var query = decodeURIComponent(rq);
    query = query.replace(/(btc|bitcoins?)( address( of)?)?/gi, "")

    function format_bitcoin_from_satoshi(balance) {
        var balance = '' + balance/1000;
        balance = balance.replace(/(\d{3})/g, '$1,').replace(/,?\.\d*|,$/g, '');
        return balance + '฿';
    }

    var balance = format_bitcoin_from_satoshi(response.final_balance);
    var total_received = format_bitcoin_from_satoshi(response.total_received);

    var address_tag = '';
    response.txs.map(
        function (tx) {
            if (tx.out[0].addr_tag != undefined)
                address_tag = tx.out[0].addr_tag;
        }
    );

    var answer = (address_tag != '' ? '<h1>' + address_tag + '</h1><br>' : '')
               + 'Total transactions: ' + response.n_tx + '<br>'
               + 'Total recieved: ' + total_received + '<br>'
               + 'Total balance: ' + balance + '<br>';

	var items = new Array();
	items[0] = new Array();
    items[0]['a'] = answer;
	items[0]['h'] = query + " (Bitcoin Address)";
	items[0]['s'] = 'blockchain.info';
	items[0]['u'] = 'http://blockchain.info/address/' + query;
    items[0]["force_big_header"] = true;
	
	nra(items);
}
