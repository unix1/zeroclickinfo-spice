package DDG::Spice::News::Site;

use DDG::Spice;

use constant {
    COM => '.com',
    SOURCE => 'site',
    OUTPUT => 'json',
};

# 20130311 (caine): switch to hash where we normalize
# international sources.  E.G. wired.co.uk -> wired.com
my @sites = ('lifehacker',
	     'guardian',
	     'theatlantic',
	     'latimes',
	     'nytimes',
	     'wsj',
	     'cbsnews',
	     'huffingtonpost',
	     'examiner',
	     'cnn',
	     'foxnews',
	     'abcnews',
	     'msnbc',
	     'washingtonpost'
	     'cbs',
	     'telegraph',
	     'nypost',
	     'nydailynews',
	     'wired'
);

SITE: foreach my $site ( @sites ) {
    push(@sites, $site.COM);
}

triggers any => @sites;


spice to => 'https://caine.duckduckgo.com/news.js?s='.SOURCE.'&o='.OUTPUT.'&q=$1';
spice wrap_jsonp_callback => 1;


primary_example_queries 'wired', 'cnn', 'nytimes';
secondary_example_queries 'wired.com', 'cnn.com', 'nytimes.com';
description 'Add news to navigational and news site queries.';
name 'News sites';
source 'DuckDuckGo';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/News/Site.pm';
topics 'news';
category 'news';
attribution github => ['https://github.com/duckduckgo', 'DuckDuckGo'];


handle query_lc => sub {
    my $ret = $_;

    # Do that lookup from above here...
    if ($ret !~ /.com/) {
	$ret .= COM;
    }

    return $ret;
};

1;
