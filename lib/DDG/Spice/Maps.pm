package DDG::Spice::Maps;

use DDG::Spice;

name "Maps";
description "Look up maps with GPS coordinates";
source "Nokia Maps";
primary_example_queries "";
secondary_example_queries "";
category "geography";
topics "everyday";
attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Maps.pm";

triggers start => "map";

spice to => 'http://m.nok.it/?app_id={{ENV{DDG_SPICE_MAPS_APPID}}}&app_code={{ENV{DDG_SPICE_MAPS_APPTOKEN}}}'
          . '&c=$1,$2';

spice from => '(.*)/(.*)';

spice wrap_string_callback => 1;

handle remainder => sub {
    return split ' ', $_;
};

1;
