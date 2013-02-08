#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::TOS::LookupService )],
    'terms of service duckduckgo' => test_spice(
        '/js/spice/tos/lookup_service/duckduckgo',
        call_type => 'include',
        caller => 'DDG::Spice::TOS::LookupService'
    ),
    'tos facebook' => test_spice(
        '/js/spice/tos/lookup_service/facebook',
        call_type => 'include',
        caller => 'DDG::Spice::TOS::LookupService'
    ),
);

done_testing;
