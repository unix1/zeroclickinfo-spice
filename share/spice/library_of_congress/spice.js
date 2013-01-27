function ddg_spice_library_of_congress(response) {

    var query = decodeURIComponent(rq);
    query = query.replace(/^ ?(library of congress) ?/gi, "")
    
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
    var docs = xml.childNodes[2].children;

    for (var i in docs) {
        if (docs.hasOwnProperty(i)) {
            var data = docs[i].children[2].children[0];
            console.log(data);
        }
    }


	var items = new Array();
	items[0] = new Array();
    items[0]['a'] = 'test';
	items[0]['h'] = query + " (Library of Congress)";
	items[0]['s'] = 'the Library of Congress';
	items[0]['u'] = 'http://loc.gov';
    items[0]["force_big_header"] = true;
	
	nra(items);
}
