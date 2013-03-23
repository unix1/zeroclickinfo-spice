function ddg_spice_snow(response) {
    console.log("wtf");
    console.log(response);
    if (!response || !response.answer
          || !response.location || !response.forecast)
        return
    var weather = [];
    weather.snowing = response.answer.replace(/[ ]+/, ' ');
    weather.forecast = response.forecast.replace(/[ ]+/, ' ');
    location = response.location
               .replace(/[ ]+/, ' ')
               .replace(/(?:^|\s)\S/g, function(c) { 
                    return c.toUpperCase(); 
               });

    Spice.render({
        data             : weather,
        header1          : 'Is it snowing yet?',
        source_url       : 'http://isitsnowingyet.org/check?q=' + location,
        source_name      : 'Is It Snowing Yet?',
        template_normal  : 'snow',
        force_big_header : true
    });
}

