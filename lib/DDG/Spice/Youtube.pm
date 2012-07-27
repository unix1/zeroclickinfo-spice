package DDG::Spice::Youtube;

use DDG::Spice;

attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];

triggers any => "youtube";

spice to => 'https://gdata.youtube.com/feeds/api/videos?alt=json&callback={{callback}}&q=$1';

handle remainder => sub {
    return $_;
};

1;
