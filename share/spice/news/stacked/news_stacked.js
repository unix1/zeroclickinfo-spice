function ddg_spice_news_stacked (api_result) {
    "use strict";

    // check for response
    if (!api_result.response.status === "ok") return;

    Spice.render({
        data             : api_result.response,
        source_name      : 'Guardian News',
        source_url       : 'http://www.guardian.co.uk',
        //force_big_header : 1,
        //header1          : 'News',
        template_frame   : "normal",
        template_normal  : "news_stacked",
        carousel_css_id  : "news",
    });
}

Handlebars.registerHelper("elapsedTime", function(){
    var time = this.webPublicationDate;
    var diff = new Date( Date.now() - Date.parse(time) );
    var out  = "";

    var hrs  = diff.getHours();
    var mins = diff.getMinutes();

    if (hrs > 24) {
        var days = Math.floor(hrs/24);
        var hrs2 = hrs % 24;

        out += days + "day, " + hrs + "hr.";
    } else {
        out += hrs > 0 ? hrs + "hr, " : "";
        out += mins + "min ago."
    }

    return out;
})