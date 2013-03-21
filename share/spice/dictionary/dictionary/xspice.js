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

        // Display the plugin.
        Spice.render({
             data              : context,
             force_big_header  : true,
             header1           : context.word + " (Definition)",
             source_name       : "Wordnik",
             source_url        : "http://www.wordnik.com/words/" + context.word,
             template_normal   : 'dictionary',
             template_small    : 'dictionary'
        });
    }
}

