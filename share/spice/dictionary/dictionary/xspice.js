var ddg_spice_dictionary_dictionary = function(api_result) {
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

        // Copy the context.
        ddg_spice_dictionary_dictionary.context = context;
        ddg_spice_dictionary_dictionary.render = function(context) {
            Spice.render({
                 data              : context,
                 force_big_header  : true,
                 header1           : context.word + " (Definition)",
                 source_name       : "Wordnik",
                 source_url        : "http://www.wordnik.com/words/" + context.word,
                 template_normal   : 'dictionary',
                 template_small    : 'dictionary'
            });
        };
    }

    var loadJavascript = function(src, callback) {
        var element = document.createElement("script");
        element.async = true;
        element.src = src;
        attachLoadEvent(element, callback);
        document.body.appendChild(element);
        return element;
    };

    var attachLoadEvent = function(element, callback) {
        if(element.addEventListener) {
            element.addEventListener("load", callback, false);
        } else {
            element.onreadystatechange = function() {
                if(this.readyState === "complete") {
                    callback();
                }
            }
        }
    };

    loadJavascript("/js/spice/dictionary/dictionary_pronunciation/" + context.word, function() {
        console.log("Loaded Dictionary::Dictionary::Pronunciation.");
    })
}

function ddg_spice_dictionary_dictionary_pronunciation(pronounce) {
    "use strict";
    var context = ddg_spice_dictionary_dictionary.context;
    if(pronounce.length > 0 && pronounce[0].raw && pronounce[0].rawType === "ahd-legacy") {
        context.pronunciation = pronounce[0].raw;
    } else {
        context.pronunciation = "";
    }

    // Display the plugin!
    ddg_spice_dictionary_dictionary.render(context);
}

