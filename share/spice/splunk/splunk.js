function ddg_spice_splunk (api_result) {
    if (api_result.error) return

    Spice.render({
         data              : api_result,
         force_big_header  : true,
         header1           : api_result.name + ' (' + api_result.synopsis + ')',
         source_name       : "docs.splunk.com", // More at ...
         source_url        : 'http://docs.splunk.com/Documentation/Splunk/latest/SearchReference/' + api_result.name,
         template_normal   : 'splunk',
         template_small    : 'splunk'
    });
}
