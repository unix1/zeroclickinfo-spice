package DDG::Spice::KhanAcademy;

use DDG::Spice;

primary_example_queries "khan academy videos";
secondary_example_queries "khan trigonometry";
description "Shows Khan Academy videos";
name "KhanAcademy";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/KhanAcademy.pm";
icon_url "/i/khanacademy.org.ico";
topics "math";
category "reference";
attribution github => ['https://github.com/arlolra','arlolra'];
status "enabled";

spice to => 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC4a-Gbdw7vOaccHmFo40b9g&fields=items&key={{ENV{DDG_SPICE_KHAN_ACADEMY_APIKEY}}}&maxResults=50&callback={{callback}}&q=$1';

triggers any => "khan", "khan academy";

attribution web => ['http://thoughtherder.org','Arlo Breault'],
            email => ['arlolra@gmail.com','Arlo Breault'];

handle remainder => sub {
    return $_ if $_;
    return;   
};

1;