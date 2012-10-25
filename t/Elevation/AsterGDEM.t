#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use utf8;

ddg_spice_test(
    [qw( DDG::Spice::Elevation::AsterGDEM )],
    'elevation at 50.01° 10.2°' => test_spice(
        '/js/spice/elevation/aster_gdem/50.01/10.2',
        call_type => 'include',
        caller => 'DDG::Spice::Elevation::AsterGDEM',
        is_cached => 1
    ),
);

done_testing;

