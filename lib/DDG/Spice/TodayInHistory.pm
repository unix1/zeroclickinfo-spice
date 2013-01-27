package DDG::Spice::TodayInHistory;

use DDG::Spice;

name "TodayInHistory";
description "Today in History";
source "History.com";
primary_example_queries "today in history";
category "reference";
topics "everyday";
attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/TodayInHistory.pm";

triggers start => "today";

spice to => 'http://www.history.com/this-day-in-history/rss';

spice wrap_string_callback => 1;

handle query_lc => sub {
    return 1 if /today in history/;
    return;
};

1;
