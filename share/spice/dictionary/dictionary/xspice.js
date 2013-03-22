var DDG = window.DDG || {};

DDG.loadJavascript = function(src, callback) {
    var element = document.createElement("script");
    element.async = true;
    element.src = src;
    DDG.attachLoadEvent(element, callback);
    document.body.appendChild(element);
    return element;
};

DDG.attachLoadEvent = function(element, callback) {
    if(element.addEventListener) {
        element.addEventListener("load", callback, false);
    } else {
        element.onreadystatechange = function() {
            if(this.readyState === "complete") {
                callback();
            }
        };
    }
};

var ddg_spice_dictionary_dictionary = function(api_result) {
    "use strict";

    var context = {};
    var part_of_speech = {
        "interjection": "interj.",
        "noun": "n.",
        "verb-intransitive": "v.",
        "verb-transitive": "v.",
        "adjective": "adj.",
        "adverb": "adv.",
        "verb": "v.",
        "pronoun": "pro.",
        "conjunction": "conj.",
        "preposition": "prep."
    };

    if(api_result && api_result.length > 0) {
        // Add word to the context.
        context.word = api_result[0].word;
        // Set the array.
        context.words = [];
        
        // Add the part of speech and the definition to the context.
        for(var i = 0; i < api_result.length; i++) {
            context.words.push({
                part: part_of_speech[api_result[i].partOfSpeech] || api_result[i].partOfSpeech,
                definition: api_result[i].text
            });
        }

        // Copy the things that we need to render the
        ddg_spice_dictionary_dictionary.options = {
            context: context
        };
    }

    loadJavascript("/js/spice/dictionary/dictionary_pronunciation/" + context.word, function() {
        console.log("Loaded Dictionary::Dictionary::Pronunciation.");
    });
};

var ddg_spice_dictionary_dictionary_pronunciation = function(pronounce) {
    "use strict";

    var context = ddg_spice_dictionary_dictionary.options.context;
    if(pronounce && pronounce.length > 0 && pronounce[0].rawType === "ahd-legacy") {
        context.pronunciation = pronounce[0].raw;
    } else {
        context.pronunciation = "";
    }

    // This is when we display the plugin.
    Spice.render({
         data              : context,
         force_big_header  : true,
         header1           : context.word + " (Definition)",
         source_name       : "Wordnik",
         source_url        : "http://www.wordnik.com/words/" + context.word,
         template_normal   : "dictionary",
         template_small    : "dictionary"
    });
};