(function (env) {
    "use strict";
    env.ddg_spice_splunk = function(api_result) {

        if (api_result.error) {
            return Spice.failed('splunk');
        }

        Spice.add({
            id: "splunk",
            name: "SPLUNK",
            data: api_result,
            meta: {
                sourceName: "docs.splunk.com",
                sourceUrl: 'http://docs.splunk.com/Documentation/Splunk/latest/SearchReference/' + api_result.name
            },
            templates: {
                group: 'base',
                options:{
                    content: Spice.splunk.splunk,
                    moreAt: true
                }
            }
        });
    };
}(this));
