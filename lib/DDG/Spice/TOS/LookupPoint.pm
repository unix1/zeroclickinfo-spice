package DDG::Spice::TOS::LookupPoint;

use DDG::Spice;

name "Terms of Service (point lookup)";
description "lookup individual TOS points by TOS;DR ID";
source "Terms of Service, Didn't Read";
primary_example_queries "terms of service facebook";
secondary_example_queries "tos facebook", "tosdr facebook";
category "reference";
topics "special_interest";
attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/TOS/LookupPoint.pm";
icon_url "/i/tos-dr.info.ico";
status "disabled";

triggers start => "dont-ever-trigger";

spice to => 'http://tos-dr.info/points/$1.json';

spice wrap_jsonp_callback => 1;

spice is_cached => 1;

handle remainder => sub {
    return;
};

1;
