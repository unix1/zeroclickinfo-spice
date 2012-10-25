package DDG::Spice::Elevation::GTOPO30;

use DDG::Spice;
use utf8;

attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];

triggers startend => "elevation";

spice to => 'http://api.geonames.org/gtopo30JSON?lat=$1&lng=$2&username=duckduckgo';
spice from => '([^/]+)/([^/]+)';

spice wrap_jsonp_callback => 1;

handle remainder => sub {
    /(?: at)? ?(\d+(?:\.\d+))°?(?: ?latitude)?,? (\d+(?:\.\d+))°?(?: ?longitude)?/;
    return unless $1 and $2;
    return $1, $2;
};

1;
