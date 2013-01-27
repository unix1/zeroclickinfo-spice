function ddg_spice_today_in_history(response) {
    
    var parseXML;

    if (typeof window.DOMParser != "undefined") {
        parseXML = function(response) {
            return ( new window.DOMParser() ).parseFromString(response, "text/xml");
        };
    } else if (typeof window.ActiveXObject != "undefined" &&
           new window.ActiveXObject("Microsoft.XMLDOM")) {
        parseXML = function(response) {
            var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = "false";
            xmlDoc.loadXML(response);
            return xmlDoc;
        };
    } else { return; }

    var xml = parseXML(response).documentElement;
    var article = xml.getElementsByTagName("item")[0];
    var title = article.getElementsByTagName("title")[0].textContent;
    var link = article.getElementsByTagName("link")[0].textContent;
    var description = article.getElementsByTagName("description")[0].textContent;

    title = title.replace(/.*:/, "");

    var results = '';


	var items = new Array();
	items[0] = new Array();
    items[0]['a'] = description;
	items[0]['h'] = title + " (Today in History)";
	items[0]['s'] = 'History.com';
	items[0]['u'] = link;
    items[0]["force_big_header"] = true;
	
	nra(items);
}
