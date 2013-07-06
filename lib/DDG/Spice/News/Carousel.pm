package DDG::Spice::News::Carousel;

use DDG::Spice;

primary_example_queries "";
description "Read recent news stories";
name "News";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/News.pm";
attribution github => ['https://github.com/duckduckgo','DuckDuckGo'];

spice to => 'http://content.guardianapis.com/world?format=json&show-fields=all&order-by=newest&callback={{callback}}';

triggers start => "news1";

handle query_lc => sub {
    return $_ if $_ eq "news1";
    return;
};

1;