function get_params(flag) {

    var re = /translate (\w+) from ([a-z]+) to ([a-z]+)/,
        // re2 = /translate (\w+) to ([a-z]+)/,
        match = DDG.get_query().match(re);

    if (match.length) {

        if (flag === undefined)
            return [match[2], match[3]];
        else if (flag == "phrase")
            return [match[1], match[2]];
        else
            return [match[1], match[2]];
    }

    return undefined;
}

function ddg_spice_translate_from_to (api_result) {
    var params = get_params(),
        dict   = params[0],
        phrase = params[1],
        to     = dict.slice(-2),
        endpoint;


    //translate a sentence
    if (phrase.split('%20').length > 1) {
        endpoint = '/js/spice/translate/phrase/';
        nrj(endpoint + from + '/' + to + '/' + phrase);
    }

    // translate a single word
    if ((phrase === '') || (dict === '')) {
        return;
    }

    dict = convert[dict.slice(0, 2)] + to;
    items[0] = {
        h: langs[to] + ' translations for ' + phrase,
        s: 'from_to.com',
        u: 'http://from_to.com/' + dict + '/' + phrase,
        force_big_header: true
    };

    if (api_result.Error) {
        return;
    }

    text = '<ul>';
    text += format_term_from_to(api_result.term0, phrase);

    if (api_result.term1 !== undefined) {
        text += format_term_from_to(api_result.term1, phrase);
    }

    text += '</ul>';

    if(text === '<ul></ul>') {
        return;
    }

    items[0].a = text;

    Spice.render({
        data:               api_result,
        header1 :           ' ',
        source_name :       ' ',
        source_url :        'https://source.website.com',
        template_normal :   ' ',
        force_big_header :  true
    });
};

function ddg_spice_translate_detect (api_result) {
    var params = get_params(),
        phrase  = params[0],
        from   = api_result.data.detections[0].language,
        to     = params[1],
        endpoint;

    if (phrase.split('%20').length > 1) {
        endpoint = '/js/spice/translate/phrase/';

        nrj(endpoint + from + '/' + to + '/' + phrase);
    }
    else {
        endpoint = '/js/spice/translate/from_to/';

        nrj(endpoint + convert[from] + to + '/' + phrase);
    }
};

/* MyMemory */
function ddg_spice_translate_phrase (api_result) {
    var items = [[]],
        params = get_params(2),
        dict   = params[0],
        phrase   = decodeURIComponent(params[1]),
        from   = dict.slice(0, 2),
        to     = dict.slice(-2),
        text;

    if ((word === '') || (dict === '')) {
        return;
    }

    Spice.render({
        data:               api_result,
        header1 :           langs[to] + ' translations for ' + phrase,
        source_name :       'MyMemory',
        source_url :        'http://mymemory.translated.net/s.php?q=' + phrase +
                            '&sl=' + from + '&tl=' + to ,
        force_big_header :  true
    });
};

/*******************************
  Private Variables
  *******************************/

    var langs = {
        'ar': 'Arabic', 'zh': 'Chinese', 'cz': 'Czech', 'en': 'English', 'fr': 'French', 'gr': 'Greek', 'it': 'Italian', 'ja': 'Japanese', 'ko': 'Korean', 'pl': 'Polish', 'pt': 'Portuguese', 'ro': 'Romanian', 'es': 'Spanish', 'tr': 'Turkish'
    };

    var convert = {
        "cs": "cz", "ar": "ar", "zh": "zh", "en": "en", "fr": "fr", "el": "gr", "it": "it", "ja": "ja", "ko": "ko", "pl": "pl", "pt": "pt", "ro": "ro", "es": "es", "tr": "tr"
    };

    var translations = [];


/*******************************
  Private helpers
  *******************************/

var hasOwn = ({}).hasOwnProperty;

function format_translations_phrase(ts) {
    var text = '', origi, first;

    for (var i in ts) {
        if(hasOwn.call(ts, i)) {
            origi = ts[i].segment;
            first = ts[i].translation;

            if (origi !== first) {
                text += format_translation_phrase(first);
            }
        }
    }

    return text;
}


function format_translation_phrase(t) {
    var text;

    if (t === undefined) {
        return '';
    }
    if (translations.indexOf(t) !== -1) {
        return '';
    }
    else {
        translations.push(t);
    }

    text = '<li>' + t + '</li>';
    return text;
}



function format_term_from_to(term, word) {
    if(term.PrincipalTranslations || term.Entries) {
        var text = format_translations_from_to((term.PrincipalTranslations || term.Entries), word, false);
    } else if(term.OtherSideEntries) {
        var text = format_translations_from_to(term.OtherSideEntries, word, true);
    }

    if (term.AdditionalTranslations) {
        text += format_translations_from_to(term.AdditionalTranslations, word, true);
    }

    return text;
}

function format_translations_from_to(ts, word, swap) {
    var text = '';
    var origi, first, secnd;
    var limit = 0;

    for (var i in ts) {
        if(hasOwn.call(ts, i) && limit < 3) {
            origi = ts[i].OriginalTerm;
            first = ts[i].FirstTranslation;
            secnd = ts[i].SecondTranslation;

            if(swap) {
                origi = ts[i].FirstTranslation;
                first = ts[i].OriginalTerm;
            }

            if (origi.term !== first.term) {
                text += format_translation_from_to(first);
            }

            if ((secnd !== undefined) && (origi.term !== secnd.term) && !swap) {
                text += format_translation_from_to(secnd);
            }
            limit += 1;
        }
    }

    return text;
}

function format_translation_from_to(t) {
    var text;

    if (t === undefined || t === null) {
        return '';
    }
    if (translations.indexOf(t.term) !== -1) {
        return '';
    } else {
        translations.push(t.term);
    }

    text = '<li>' + t.term + '</li>';
    return text;
}


/*******************************
  Handlebars helpers
  *******************************/

Handlebars.registerHelper('name', funcion(){

});