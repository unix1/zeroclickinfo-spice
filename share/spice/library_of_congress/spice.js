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

    xml = parseXML(response).documentElement;
    docs = xml.getElementsByTagName("zs:record");
    console.log(xml);
    console.log(docs);

    var results = '';

    if (docs.length > 1) {
        results += "<ul>";
        for (var i in docs) {
            if (docs.hasOwnProperty(i)) {
                var doc = docs[i].getElementsByTagName("mods");
                var type = docs[i].getElementsByTagName("typeOfResource")[0].textContent;
                type = type.replace(/-.*/, "");
                var title = docs[i].getElementsByTagName("title")[0].textContent;
                var resource = "http://lccn.loc.gov/"
                             + docs[i].getElementsByTagName("identifier")[0].textContent;
                results += "<li>"
                         + "[" + type + "] "
                         + "<a href=\"" + resource + "\">" + title + "</a>"
                         + "</li>";
                console.log(doc);
            }
        }
        results += "</ul>";
    } else if (docs.length == 1) {
        // TODO
    }


	var items = new Array();
	items[0] = new Array();
    items[0]['a'] = results;
	items[0]['h'] = query + " (Library of Congress)";
	items[0]['s'] = 'the Library of Congress';
	items[0]['u'] = 'http://loc.gov';
    items[0]["force_big_header"] = true;
	
	nra(items);
}
