#!/usr/bin/env perl

use strict;
use warnings;

use File::Slurp;
use JSON;

my $json = decode_json read_file 'services.json';

foreach my $service (keys %{$json}) {
    print "points['$service'] = [";
    print join ', ', map { "'$_'" } @{$json->{$service}{points}};
    print "];\n";
}
