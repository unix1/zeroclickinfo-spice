package DDG::Spice::Septa;

# ABSTRACT: Display the next SEPTA train on the given route.

use DDG::Spice;

triggers startend => "septa";

spice to => 'http://www3.septa.org/hackathon/NextToArrive/?req1=$1&req2=$2&req3=10&callback=ddg_spice_septa';
spice from => '^(.*)\/(.*)';
spice wrap_jsonp_callback => 1;

my @stops = ("Trenton", "Levittown-Tullytown", "Bristol", "Croydon", "Eddington", "Cornwells Heights", "Torresdale", "Holmesburg Jct", "Tacony", "Bridesburg", "West Trenton", "Yardley", "Woodbourne", "Langhorne", "Trevose", "Somerton", "Forest Hills", "Philmont", "Bethayres", "Meadowbrook", "Rydal", "Noble", "Doylestown", "Delaware Valley College", "New Britain", "Link Belt", "Fortuna", "Lansdale", "Chalfont", "Colmar", "Pennbrook", "North Wales", "Penllyn", "Ambler", "Fort Washington", "Oreland", "North Hills", "Warminster", "Hatboro", "Crestmont", "Roslyn", "Ardsley", "Elkins Park", "Melrose Park", "Fern Rock T C", "Wayne Junction", "Fox Chase", "Ryers", "Cheltenham", "Lawndale", "Olney", "Chestnut Hill East", "Gravers", "Wyndmoor", "Mount Airy", "Sedgwick", "Stenton", "Washington Lane", "Germantown", "Wister", "Chestnut Hill West", "Highland", "St. Martins", "Allen Lane", "Carpenter", "Upsal", "Tulpehocken", "Chelten Avenue", "Queen Lane", "Norristown", "Main Street", "Norristown T.C.", "Conshohocken", "Spring Mill", "Miquon", "Ivy Ridge", "Manayunk", "Wissahickon", "East Falls", "Allegheny", "Downingtown", "Whitford", "Exton", "Malvern", "Paoli", "Daylesford", "Berwyn", "Devon", "Strafford", "Wayne", "St. Davids", "Radnor", "Villanova", "Rosemont", "Bryn Mawr", "Haverford", "Ardmore", "Wynnewood", "Narberth", "Merion", "Overbrook", "30th Street Station", "Suburban Station", "Market East", "Temple University", "North Broad", "Cynwyd", "Bala", "Wynnefield Avenue", "University City", "49th Street", "Angora", "Fernwood-Yeadon", "Lansdowne", "Gladstone", "Clifton-Aldan", "Primos", "Secane", "Morton-Rutledge", "Swarthmore", "Wallingford", "Moylan-Rose Valley", "Media", "Elwyn", "Darby", "Curtis Park", "Sharon Hill", "Folcroft", "Glenolden", "Norwood", "Prospect Park - Moore", "Ridley Park", "Crum Lynne", "Eddystone", "Chester", "Highland Avenue", "Marcus Hook", "Claymont", "Wilmington", "Newark", "Eastwick", "Airport Terminal A", "Airport Terminal B", "Airport Terminal C D", "Airport Terminal E F", "Glenside", "Churchman's Crossing", "Neshaminy Falls", "Willow Grove", "Gwynedd Valley", "North Philadelphia", "North Philadelphia Amtrak", "Thorndale", "Jenkintown Wyncote");

my %sub_stop_names = (
    'St. Davids' => 'Ste. Davids',
);

handle remainder => sub {

    my $rem = lc $_;
    $rem =~ s/\b(\w+)/\u$1/g;

    my @words = split(' ',$rem);
    my @returns = ();    
    return if @words < 2;
    
    my $from_stop = '';
    my $to_stop = '';

    # If they use the words "to" or "from" we know what the stations are.
    ($from_stop, $to_stop) =  ($1, $2) if $rem =~ /(.*)\s(?:to)\s(.*)/i;
    ($to_stop, $from_stop) = ($1, $2) if $rem =~ /(.*)\s(?:from)\s(.*)/i;
    
    unless ($from_stop && $to_stop) {
        for (my $i=0; $i < @words; $i++) {
        
            my $check_string = '';

            # Get all of the words before the current word
            $check_string .= "$words[$_] " for (0..$i);
            $check_string =~ s/\s$//;
        
            # Check if the current check string is a station
            next unless grep {$check_string eq $_} @stops;

            $from_stop = $check_string;
        }
    }
    
    return unless $from_stop;

    join(' ', @words) =~ /$from_stop\s(.*)/i;

    $to_stop = $1 unless $to_stop;

    return unless $to_stop;

    return unless grep{$to_stop eq $_} @stops;

    $from_stop = $sub_stop_names{$from_stop} if exists $sub_stop_names{$from_stop};
    $to_stop = $sub_stop_names{$to_stop} if exists $sub_stop_names{$to_stop};

    return $from_stop, $to_stop if $from_stop && $to_stop;
};

1;
