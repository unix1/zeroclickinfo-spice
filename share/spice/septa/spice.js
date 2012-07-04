var septa = {};

septa.TRAINS_TO_SHOW = -1;
if (iom || iph || ia || iam)
    septa.TRAINS_TO_SHOW = 3;
else if (ipa)
    septa.TRAINS_TO_SHOW = 4;
else
    septa.TRAINS_TO_SHOW = 4;

septa.makeAdjustTime = function(origDepart, origArrive, delay) {
    
    if (delay.match(/\d\smins?$/))
        return '';
    
    var re = new RegExp(/(\d)\smins?$/);

    delTime = delay.match(re);
    
    console.log("mins: " + delTime);

    return '';

}

/**
  * 234 - On time
  * Departs: 2:00PM
  * Arrives: 2:04PM
  */
septa.makeTrainDiv = function(train, i) {
    
    var trainNum = train.orig_train;
    var trainLine = train.orig_line;
    var departureTime = train.orig_departure_time;
    var arrivalTime = train.orig_arrival_time;
    var trainStatus = train.orig_delay;
    var isDirect = train.isdirect;
       
    var trainDiv = d.createElement('div');

    var statusLine = '';
    
    if (trainStatus === 'On time') {
        statusLine += trainStatus;
    } else {
        statusLine += '<b>' + trainStatus + ' late</b>';
    }
    
    var snippet = '';
    snippet += trainLine + '<br>';
    snippet += departureTime + '<br>';
    snippet += arrivalTime + ' <br>';
    snippet += statusLine;
    trainDiv.innerHTML = snippet;

    return trainDiv;
}

function ddg_spice_septa(trains) {
    
    var from_station = "Paoli";
    var to_station = "Radnor";

    var holder = d.createElement('div');
    YAHOO.util.Dom.addClass(holder, 'nrst-holder');

    var firstDiv = d.createElement('div');
    YAHOO.util.Dom.addClass(firstDiv, 'nrst');
    YAHOO.util.Dom.addClass(firstDiv, 'nrst-firstDiv');
    
    var tmpHtml = '';
    tmpHtml += '<i>Line:</i><br>';
    tmpHtml += '<i>Departs:</i><br>';
    tmpHtml += '<i>Arrives:</i><br>';
    tmpHtml += '<i>Status:</i>';
    
    firstDiv.innerHTML = tmpHtml;

    holder.appendChild(firstDiv);

    for (i in trains) {

        if (i >= septa.TRAINS_TO_SHOW) break;

        var trainDiv = septa.makeTrainDiv(trains[i], i);
        
        YAHOO.util.Dom.addClass(trainDiv, 'nrst');

        holder.appendChild(trainDiv);

    }

    var snippet = d.createElement('div');
    
    var clearDiv = d.createElement('div');
    YAHOO.util.Dom.addClass(clearDiv, 'clear');

    var astLine = d.createElement('div');
    YAHOO.util.Dom.addClass(astLine, 'nrst-asterisk');
    astLine.innerHTML = '<b>*</b> Departure / Arrival times not adjusted for delay';

    snippet.appendChild(holder);
    snippet.appendChild(clearDiv);
    snippet.appendChild(astLine);

    var header = from_station + " to " + to_station + " (SEPTA)";
    var source = "SEPTA";
    var source_url = "http://app.septa.org/nta/";

    items = [[]];
    items[0]["a"] = snippet;
    items[0]["h"] = header;
    items[0]["s"] = source;
    items[0]["u"] = source_url;
    // items[0]["force_big_header"] = true;
    items[0]["force_space_after"] = true;

    nra(items);
};
