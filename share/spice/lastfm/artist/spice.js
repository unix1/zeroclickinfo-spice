function ddg_spice_lastfm_artist_all(lastfm) {
    // console.log(lastfm);
    if(lastfm.artist && lastfm.artist.similar.artist) {
        var small = 0;
        var abstract = d.getElementById('zero_click_abstract');
        if (YAHOO.util.Dom.getStyle(abstract,"display")=='none') {
            small = 1;
        }

        similar = '<i>Similar to: </i>';
        for(var i = 0;i < lastfm.artist.similar.artist.length;i++) {
            var artist = lastfm.artist.similar.artist[i];
            similar += '<a onclick="fl=1" href="/?q=artist+' + encodeURIComponent(artist.name) + '">' + artist.name + '</a>';
            if(i !== lastfm.artist.similar.artist.length-1) {
                similar += ', ';
            }
        }

        var items = [];
        items[0] = [];
        var rest = true;

        var albums = '<a onclick="fl=1" href="/?q=albums+from+' + encodeURIComponent(lastfm.artist.name) + '">' + 
                    'albums</a> and ';  
        var songs = '<a onclick="fl=1" href="/?q=tracks+from+' + encodeURIComponent(lastfm.artist.name) + '">' +
                    'tracks</a> from ' + lastfm.artist.name + '.';            
        if(lastfm.artist.bio.summary) {
            items[1] = [];
            var summary = lastfm.artist.bio.summary;
            //Remove all the links
            summary = summary.replace(/<.+?>/g, "");
            //Trim
            if(summary.length > 200) {
                summary = '<span id="first" style="display: inline;">' + summary.slice(0, 200) + '</span> ' + 
                '<a style="display: inline;" id="expand" href="javascript:;" onclick="DDG.toggle(\'ellipsis\', 1); DDG.toggle(\'first\', -1); DDG.toggle(\'expand\', -1);"><span style="color: rgb(119, 119, 119); font-size: 11px; ">More...<span></a>' + 
                '<span id="ellipsis" style="display: none;">' + summary + '</span>';
            }
            items[0]['a'] = summary + '<div style="clear:both;"></div>' + '<div style="similar">' + similar + '.</div>' + '<i>See also:</i> ' + 
            albums + songs + '<div style="clear:both;"></div>';
        } else {
            rest = false;
            items[0]['a'] =  '<div style="similar">' + similar + '.</div>' + '<i>See also:</i> ' + albums + songs + '<div style="clear:both;"></div>';
        }
        
        console.log(small);
        if(!small) {
            abstract.innerHTML += '<div style="padding-top:5px;"></div>' + similar + '. <i>See also:</i> ' + 
                    albums + songs + ' <a href="' + lastfm.artist.url + '">More at Last.fm</a>' + '<div style="clear:both;"></div>';
            
        } else {
            items[0]['h'] = lastfm.artist.name;
            items[0]['s'] = 'Last.fm';
            items[0]['force_big_header'] = true;
            items[0]['force_space_after'] = true;
            items[0]['f'] = 1;
            items[0]['u'] = lastfm.artist.url;
            nra(items,1,1);
        }
    }
}

function ddg_spice_lastfm_artist_similar(lastfm) {
    // console.log(lastfm);
    if(lastfm.artist && lastfm.artist.similar.artist) {
        var similar = '<div style="similar">';
        for(var i = 0;i < lastfm.artist.similar.artist.length;i++) {
            var artist = lastfm.artist.similar.artist[i];
            similar += '<a href="/?q=artist+' + encodeURIComponent(artist.name) + '">' + artist.name + '</a>';
            if(i !== lastfm.artist.similar.artist.length-1) {
                if(i === lastfm.artist.similar.artist.length - 2) {
                    similar += ', and '
                } else {
                    similar += ', ';
                }
            }
        }
        
        if(lastfm.artist.similar.artist.length > 1) {
            similar += ' are similar to <a href="/?q=artist ' + lastfm.artist.name + '">' + lastfm.artist.name + '</a>.';
        } else {
            similar += ' is similar to <a href="/?q=artist ' + lastfm.artist.name + '">' + lastfm.artist.name + '</a>.';
        }

        similar += '</div>';        
        var items = new Array();
        items[0] = new Array();     
        items[0]['a'] = similar + '<div style="clear:both;"></div>';
        items[0]['h'] = 'Similar to ' + lastfm.artist.name + ' (Artist)';
        items[0]['s'] = 'Last.fm';
        items[0]['f'] = 1;
        items[0]['force_big_header'] = true;
        items[0]['force_space_after'] = true;
        items[0]['u'] = lastfm.artist.url;
        //items[0]['i'] = lastfm.artist.image[2]["#text"];
        nra(items, 1, 1);
    }   
}
