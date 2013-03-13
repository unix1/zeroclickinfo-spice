// Reuse the old method and add a seatbelt...
nrj('/js/nrty.js');

function ddg_spice_news_site(stories) {
    window.setTimeout(function () {
	    if (news.nrty)
		news.nrty(stories, 1);
	    else
		console.log("DDG::Spice::News::Site: unable to load legacy news JS fast enough");
	}, 9);
}