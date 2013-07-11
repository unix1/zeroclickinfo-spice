package DDG::Spice::Splunk;
# ABSTRACT: Return Splunk search reference documentation

use DDG::Spice;

#spice to => 'http://docs.splunk.com/Documentation/Splunk/latest/SearchReference/$1';
spice to => 'http://localhost/~zurab/test-docs.php?name=$1';
spice wrap_jsonp_callback => 1;
spice is_cached => 0;

triggers startend => 'splunk';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
