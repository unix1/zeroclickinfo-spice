#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Earthquakes )],
    'earthquakes' => test_spice(
        '/js/spice/earthquakes/eqs',
        call_type => 'include',
        caller => 'DDG::Spice::Earthquakes',
        is_cached => 1
    ),
    'recent earthquakes' => test_spice(
        '/js/spice/earthquakes/eqs',
        call_type => 'include',
        caller => 'DDG::Spice::Earthquakes',
        is_cached => 1
    ),
);

done_testing;

