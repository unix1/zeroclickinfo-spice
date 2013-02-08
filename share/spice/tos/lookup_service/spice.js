var items = [];
items[0] = [];
items[0]['a'] = '';
items[0]['h'] = " (Terms of Service)";
items[0]['s'] = 'tos-dr.com';
items[0]['u'] = 'http://tos-dr.info';
items[0]["force_big_header"] = true;

var nrj_calls = 0;
var points = [];

function ddg_spice_tos_lookup_service(response) {

    var points = [];
    points['instagram'] = ['wy9QcF5zQII'];
    points['informe'] = ['any-time-without-notice'];
    points['google'] = ['lU-QhFXMOcU', 'lU-QhFXMOcU2', 'JcGg9TPZ7V0', 'eff-back-tell-user-50', 'HUL_4wIbNGY', 'eff-back-transparency-data-50', 'damOWTFaho0-1'];
    points['ebuddy'] = ['T98obrJsjJA-2'];
    points['500px'] = ['X99SUnV7RUs', 'uPk0rmk6_1w', 'wYFqcvOn7XY', 'y7polYRKTN0', 'pseudos-allowed', 'wYFqcvOn7XY2', '3uiIrLyj8Hw', 'ozS1etNH7ZA', 'wYFqcvOn7XY3'];
    points['delicious'] = ['0oKZG_o_Zu0', 'LbwpukmRtgg', 't-INoE6fH98', 'Rn8M-KQOcNU', 'aXOIDbzevYE', 'lJGsikCSEJ8'];
    points['owncube'] = ['QzpPtRmNxks', 'naPvRf-l3VM', 'any-time-without-notice'];
    points['identi-ca'] = ['kizrN7qb1Ck3'];
    points['world-of-warcraft'] = ['T98obrJsjJA-2'];
    points['gravatar'] = ['Kj5tyqxJkz4', 'T98obrJsjJA'];
    points['evernote'] = ['T98obrJsjJA-2'];
    points['facebook'] = ['eff-back-tell-user-no', 'VTlWfubfib4', 's98UR0Jx6Z4', 'no-pseudos-allowed', 'kizrN7qb1Ck', 'eff-back-transparency-data-50'];
    points['yahoo'] = ['eff-back-tell-user-no', 'legal-name-registration', 'q782XE2RUss', 'WEwv5V2M9zw2', 'any-time-without-notice', 'eff-back-transparency-data-no', 'WEwv5V2M9zw'];
    points['amazon'] = ['eff-back-tell-user-no', 'eff-back-transparency-data-no'];
    points['wordpress-com'] = ['any-time-without-notice', 'T98obrJsjJA-2', 'kizrN7qb1Ck5'];
    points['bit-ly'] = ['T98obrJsjJA-2'];
    points['xing'] = ['no-pseudos-allowed'];
    points['minecraft'] = ['T98obrJsjJA-2'];
    points['vbulletin'] = ['T98obrJsjJA-2'];
    points['steam'] = ['rhykox7XUfs10', 'rhykox7XUfs15', 'rhykox7XUfs8', 'rhykox7XUfs11', 'rhykox7XUfs16', 'rhykox7XUfs2', 'rhykox7XUfs9', 'rhykox7XUfs4', 'pseudos-allowed', 'eff-back-transparency-data-no', 'rhykox7XUfs6', 'rhykox7XUfs12'];
    points['couchsurfing'] = ['e8kGDv4CIrQ', 'wOhc-Lscy_0', 'rfLB9eDVNtk', 'UMyT4RKXjv0', 'oZ1VvxnWoeM', 'BmzBPGyHGW0', 'any-time-without-notice', 'YkJpj170Qts', 'izRoNcoGOww', 'bYGefBK3R_I', 'dQV8notmhfI', 'x9BDfg-SFqY', '5StVgew5VbE', 'J3kmwLbA0rE', '1wWcVuiCJ2Y', 'ShwCMjNBd2o'];
    points['videobb'] = ['T98obrJsjJA-2'];
    points['app-net'] = ['OqIkAS2uwmE-9', 'OqIkAS2uwmE-1', 'OqIkAS2uwmE-4', 'OqIkAS2uwmE-2', 'OqIkAS2uwmE-11', 'pseudos-allowed', 'OqIkAS2uwmE-8', 'zqgg8oLZ_no', 'OqIkAS2uwmE-6', '6HDli9X01C8', 'I7i-2EM0GVY'];
    points['skype'] = ['eff-back-tell-user-no', 'any-time-without-notice', 'T98obrJsjJA-2', 'eff-back-transparency-data-no'];
    points['myspace'] = ['eff-back-tell-user-no', 'eff-back-transparency-data-no'];
    points['github'] = ['9epXl7ZDb7c', 'ymh8uR_j51A', 'gyMiAkV5ZG0', 'EpPNnYXBW_w', 'legal-name-registration', 'lXPKuQU0mPI', 'hI5Too_uDVk', 'lOG7XeUi-3E', '8LDE2ZPXRW4', '2vIh4l7sTnk'];
    points['flickr'] = ['K1M7Vj1W1VM', 'U11qApwNL2M', 'Yz8_15F1kfY', 'sZ6MVIwA-tE', 'WEwv5V2M9zw'];
    points['wikipedia'] = ['8muChbk0S-A', 'qui-0ATIaX4', 'NA_buKmTvoE'];
    points['at-t'] = ['eff-back-tell-user-no', 'eff-back-transparency-data-no'];
    points['foursquare'] = ['eff-back-tell-user-no', 'eff-back-transparency-data-no'];
    points['verizon'] = ['eff-back-tell-user-no', 'eff-back-transparency-data-no'];
    points['linkedin'] = ['eff-back-transparency-data', 'eff-back-tell-user'];
    points['twitter'] = ['e0F4cavaJ4Q', 'damOWTFaho0', 'eff-back-tell-user', 'aXOIDbzevYE-1', 'X6_GxyBSVnE', 'OR7vkW34mm4', 'tmXfQIGPTvs', 'eff-back-transparency-data-50', '-B4iO-9xHvg'];
    points['spideroak'] = ['eff-back-tell-user', 'eff-back-transparency-data-50'];
    points['zoosk'] = ['T98obrJsjJA-2'];
    points['olx'] = ['T98obrJsjJA-2'];
    points['microsoft'] = ['eff-back-tell-user-no', '6Rb57dXnJVQ', 'eff-back-transparency-data-no'];
    points['xfire'] = ['T98obrJsjJA-2'];
    points['habbo'] = ['T98obrJsjJA-2'];
    points['bearshare'] = ['T98obrJsjJA-2'];
    points['phpbb'] = ['T98obrJsjJA-2'];
    points['hypster'] = ['T98obrJsjJA-2'];
    points['duckduckgo'] = ['g4RWiArs104'];
    points['soundcloud'] = ['-tqWw03UPoc', 'gq1LW7l28qI', '_gI8wQ3PZ2M', 'fmlKouXKUcc', 'w8RMtGdRvdM', 'n_DCnOwcIo0', '3f3dVPCa1GU', '3f3dVPCa1GU2', 'pseudos-allowed', 'ps1ZppOOWmM'];
    points['apple'] = ['eff-back-tell-user-no', 'eff-back-transparency-data-no'];
    points['wordfeud'] = ['T98obrJsjJA-2'];
    points['dropbox'] = ['eff-back-transparency-data', 'eff-back-tell-user'];
    points['loopt'] = ['eff-back-tell-user-no', 'eff-back-transparency-data-no'];
    points['twitpic'] = ['dCfx1aMH1Tw', 'Rt4zuPdx3qs', 'b6ryqY9NdMw', 'V_RVXG7TKEA', 'jF1B4WY0x7k', '4Zh8gx9IyDc'];
    points['seenthis'] = ['IPta_G2GTJk', 'kizrN7qb1Ck4', 'IPta_G2GTJk2'];
    points['freeforums'] = ['any-time-without-notice'];
    points['runescape'] = ['T98obrJsjJA-2'];
    points['rapidshare'] = ['CYxkhPROM0U', 'hlI-572bFho', 'DWrWnxYqe48', 'T98obrJsjJA-2', '-BdGb47IMyM', 'Ytlp8YaeBr4'];
    points['sonic-net'] = ['eff-back-transparency-data', 'eff-back-tell-user', 'nuaSVr9YlaA'];
    points['netflix'] = ['L5pl0Vn9lKY-4', 'L5pl0Vn9lKY-2', 'L5pl0Vn9lKY-3', 'L5pl0Vn9lKY-9', 'L5pl0Vn9lKY-1', 'L5pl0Vn9lKY-6', 'L5pl0Vn9lKY', 'any-time-without-notice', 'L5pl0Vn9lKY-11', 'L5pl0Vn9lKY-10', 'L5pl0Vn9lKY-7', 'L5pl0Vn9lKY-5'];
    points['nabble'] = ['any-time-without-notice'];
    points['comcast'] = ['eff-back-tell-user-no', 'eff-back-transparency-data-no'];
    points['flattr'] = ['_ZNQ9J07ntI'];

    var answer = '';

    for (var docname in response.tosback2) {
        if (docname === "sitename") continue;
        answer += '<a href="' + response.tosback2[docname].url + '">'
                + response.tosback2[docname].name + '</a>, ';
    }

    items[0]['a'] += answer.replace(/, $/, '') + '<br>';
    items[0]['h'] = response.name + items[0]['h'];

    if (points[response.id]) {
        for (var i in points[response.id]) {
            nrj_calls++;
            nrj('/js/spice/tos/lookup_point/' + points[response.id][i]);
        }
    }
	
}

function ddg_spice_tos_lookup_point(point) {
    console.log(point);
    points.push(point);
	if (--nrj_calls === 0) {
        items[0]['a'] += '<ul>';
        points.sort(function(a,b) {
            if (a.tosdr.point == 'alert' || a.tosdr.point == 'mediocre') return -1;
            if (a.tosdr.point == 'good') return 1;
            if (b.tosdr.point == 'alert' || b.tosdr.point == 'mediocre') return 1;
            return 0;
        }).map(function(point) {
            items[0]['a'] += '<li>'
                          + ( point.tosdr.point == 'good' ?
                                  '<span style="color:green">' + point.name + '</span>' :
                                  ( point.tosdr.point == 'alert' || point.tosdr.point == 'mediocre' ?
                                      '<span style="color:red">' + point.name + '</span>' :
                                      point.name ))
                          + '</li>';
        });
        items[0]['a'] += '</ul>';
        nra(items);
    }
}
