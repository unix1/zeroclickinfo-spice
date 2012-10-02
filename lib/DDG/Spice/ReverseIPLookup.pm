package DDG::Spice::ReverseIPLookup;

use DDG::Spice;

attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];

triggers query_raw => qr/[12]?\d{1,2}\.[12]?\d{1,2}\.[12]?\d{1,2}\.[12]?\d{1,2}/;

spice to => 'http://whatisonip.com/api-ip-address/$1';
spice wrap_string_callback => 1;

handle query_lc => sub {
    return unless s/ ?reverse lookup ?//;
    return $_;
};

1;
