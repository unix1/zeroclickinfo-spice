package DDG::Spice::Earthquakes;

use DDG::Spice;

attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];

triggers any => "earthquake", "earthquakes";

spice to => 'http://www.seismi.org/api/$1/$2?limit=50';
spice from => '([^/]+)/([^/]+)';

spice proxy_cache_valid => "200 1hr";

spice wrap_jsonp_callback => 1;

handle query_lc => sub {
    s/ ?(?:earthquakes?(?: in (\d{4}))?) ?//;
    if ($1) { return 'eqs', $1 }
    return 'eqs';
};

1;
