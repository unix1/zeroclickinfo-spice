#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Bitcoin::Address )],
    'bitcoin address 1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v' => test_spice(
        '/js/spice/bitcoin/address/1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin::Address',
        is_cached => 0
    ),
    'btc address 1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v' => test_spice(
        '/js/spice/bitcoin/address/1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin::Address',
        is_cached => 0
    ),
);

ddg_spice_test(
    [qw( DDG::Spice::Bitcoin::Rates )],
    '10 usd to btc' => test_spice(
        '/js/spice/bitcoin/rates/10-usd-to-btc',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin::Rates',
        is_cached => 1
    ),
    '1 btc to sek' => test_spice(
        '/js/spice/bitcoin/rates/1-btc-to-sek',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin::Rates',
        is_cached => 1
    ),
);

done_testing;

