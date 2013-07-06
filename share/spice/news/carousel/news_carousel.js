function ddg_spice_news (api_result) {
    "use strict";

    // check for response
    if (!api_result.response.status === "ok") return;

    Spice.render({
        data             : api_result,
        source_name      : 'Guardian News',
        source_url       : 'http://www.guardian.co.uk',
        header1          : 'News',
        template_frame   : "carousel",
        template_normal  : "news_carousel",
        carousel_css_id  : "news",
        carousel_items   : api_result.response.results,
        force_big_header : 1,
        template_options : {
            li_width   : 400,
            li_padding : 4*2,
        }
    });

    var len    = api_result.response.results.length;
    var height = 2;
    var num    = Math.ceil(len/height) + 1;

    $("li.ddgc_item:nth-child(" + num + ")").css("clear", "left");
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