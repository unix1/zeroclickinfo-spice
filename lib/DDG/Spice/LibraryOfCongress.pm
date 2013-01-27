package DDG::Spice::LibraryOfCongress;

use DDG::Spice;

name "LibraryOfCongress";
description "Look up documents in the Library of Congress";
source "Library of Congress";
primary_example_queries "";
secondary_example_queries "";
category "reference";
topics "special_interest";
attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/LibraryOfCongress.pm";

triggers start => "library";

spice to => 'http://lx2.loc.gov:210/LCDB?version=1.2&operation=searchRetrieve&query=$1&maximumRecords=1&recordSchema=dc&maximumRecords=20';

spice wrap_string_callback => 1;

handle remainder => sub {
    s/ *of congress *//i;
    return $_;
};

1;
