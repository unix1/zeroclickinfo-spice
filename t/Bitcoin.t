#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Bitcoin )],
    'bitcoin address 1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v' => test_spice(
        '/js/spice/bitcoin/1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin',
        is_cached => 0
    ),
    'btc address 1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v' => test_spice(
        '/js/spice/bitcoin/1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin',
        is_cached => 0
    ),
);

done_testing;

