package DDG::Spice::TOS;

use DDG::Spice;

name "Terms of Service";
description "find the terms of service for some well known companies";
source "Terms of Service, Didn't Read";
primary_example_queries "terms of service facebook";
secondary_example_queries "tos facebook", "tosdr facebook";
category "reference";
topics "special_interest";
attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/TOS.pm";
icon_url "/i/tos-dr.info.ico";
status "enabled";

triggers any => "term", "terms", "service", "tos", "tosdr";

spice to => 'http://tos-dr.info/services/$1.json';

spice wrap_jsonp_callback => 1;

handle remainder => sub {
    s/\./-/g;
    return $_ if $_ ne '';
    return;
};

1;
