package DDG::Spice::Earthquakes;

use DDG::Spice;

attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];

triggers any => "earthquake", "earthquakes";

spice to => 'http://www.seismi.org/api/$1?limit=50';

spice wrap_jsonp_callback => 1;

handle query_lc => sub {
    return 'eqs';
};

1;
