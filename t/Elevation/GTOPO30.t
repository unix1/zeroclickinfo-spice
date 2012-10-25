#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use utf8;

ddg_spice_test(
    [qw( DDG::Spice::Elevation::GTOPO30 )],
    'elevation at 50.01° 10.2°' => test_spice(
        '/js/spice/elevation/gtopo30/50.01/10.2',
        call_type => 'include',
        caller => 'DDG::Spice::Elevation::GTOPO30',
        is_cached => 1
    ),
);

done_testing;

