var tabs = '';
var news = '';
var team = '';
var stats = '';
var videos = '';
var gamelog = '';
var headshot = '';
var playerID = 0;
var teamID = 0;
var teamCity = '';
var teamName = '';
var baseURL = 'http://espn.com';
var carousel = new Object();

var callsMade = 0;
var numberOfCalls = 4;

items = [];
items[0] = [];
items[0]['a'] = '';
items[0]['h'] = '';
items[0]['s'] = 'ESPN';
items[0]['force_big_header'] = 1;
items[0]['f'] = 1;


function ddg_spice_espn(response) {

    var player = response.sports[0].leagues[0].athletes[0];
    var playerTeam = player.competitors[0].team;
    playerID = player.id;
    headshot = player.headshots.gamecast;
    teamID = playerTeam.id;
    teamCity = playerTeam.location;
    teamName = playerTeam.name;

    nrj("/js/spice/espn/basketball/nba/athletes/"
            + player.id + "/news/foo/ddg_spice_espn_news");
    nrj("/js/spice/espn/basketball/nba/teams/"
            + teamID + "/foo/bar/ddg_spice_espn_team");
    nrj("/js/spice/espn/basketball/nba/teams/"
            + teamID + "/events/dates/ddg_spice_espn_events");
    nrj("/js/spice/youtube/" + encodeURIComponent(player.fullName)
            + "/ddg_spice_espn_videos");

    stats = player.stats;
    items[0]['u'] = baseURL + "/nba/player/_/id/" + playerID;
    items[0]['h'] = player.displayName + " - "
                  + playerTeam.location + " "
                  + playerTeam.name
                  + " (ESPN)";

    console.log(player);

    tabs = [ 'news', 'stats', 'team', 'gamelog', 'videos' ];
    tabs = tabs.map(function(s, index, array) {
        return '<span id="espn_zci_' + s + '_link">'
            +  s.charAt(0).toUpperCase() + s.slice(1)
            +  '</span>' + (index == array.length - 1 ? "" : " | ");
    }).join("");

    team = '<div id="espn_zci_team">'
           + 'pretty pictures'
           + '</div>';

    playerStats = [ 'assists',
                    'athleteStatus',
                    'height',
                    'weight',
                    'dateOfBirth',
                    'blocks',
                    'defensiveRebounds',
                    'doubleDouble',
                    'ejections',
                    'fieldGoalsMade',
                    'fieldGoalsAttempted',
                    'fieldGoalPercentage',
                    'fouls',
                    'freeThrowsMade',
                    'freeThrowsAttempted',
                    'freeThrowPercentage',
                    'gamesStarted',
                    'minutes',
                    'offensiveRebounds',
                    'points',
                    'rebounds',
                    'steals',
                    'threePointersMade',
                    'threePointersAttempted',
                    'threePointPercentage',
                    'tripleDouble',
                    'turnovers',
                  ];

    function prepareStat(s, index, array) {
        display = s.replace(/([a-z\d](?=[A-Z])|[a-zA-Z](?=\d))/g, "$1 ");
        display = display.toLowerCase();
        display = '<tr><td>'
                + display.charAt(0).toUpperCase() + display.slice(1)
                + ':</td><td>'
                + (player[s] ? player[s] : stats[s])
                + '</td></tr>';
        return display;
    }

    playerStats = playerStats.map(prepareStat);
    var nestedStats = [ 'Birthplace', 'Position' ];
    [ player.birthPlace.city + ', ' + player.birthPlace.state,
      player.positions[0].name,
    ].map(function(s) {
        playerStats.unshift('<tr><td>' + nestedStats.shift()
                          + ':</td><td>' + s + '</td></tr>');
    });

    stats  = '<table id="espn_zci_stats">'
           + playerStats.join("")
           + '</table>';
}

function ddg_spice_espn_events(response) {
    var events = response.sports[0].leagues[0].events;
    console.log(events[85]);
    gamelog = '<div id="espn_zci_gamelog"><table><tr>'
            + '<th></th><th>Home</th><th></th><th>Away</th>'
            + '<th></th><th></th></tr>';
    for (var i = events.length - 1; i > (events.length - 6); i--) {
        var competitors = events[i].competitions[0].competitors;
        var date = new Date(events[i].date);
        var outcome = '';
        gamelog += '<td>' + date.getMonth() + '/' + date.getDay() + '</td>';
        competitors.map(function(competitor, index, array) {
            teamDisplayName = competitor.team.location
                            + " " + competitor.team.name
            gamelog += '<td><a href="/?q='
                    +  encodeURIComponent(teamDisplayName)
                    +  '">' + teamDisplayName + '</a></td><td>'
                    +  (index == 0 ? ' vs ' : '</td>');
            if (index == 1) {
                outcome = competitor.score > array[0].score;
                var win = '<span style="color:green">W</span> ';
                var loss = '<span style="color:red">L</span> ';
                gamelog += '<td>'
                        +  '<a href="' + events[i].links.web.boxscore.href + '">' 
                        +  (competitor.team.id == teamID ?
                                (outcome ? win : loss)
                                + competitor.score
                                + '-' + array[0].score
                            : (outcome ? loss : win)
                                + array[0].score + '-'
                                + competitor.score)
                        +  '</a></td>';
            }
        });
        gamelog += '</tr>';
    }
    gamelog += '</table></div>';
    ddg_spice_espn_bind();

}

function ddg_spice_espn_news(response) {
    console.log(response);
    headlines = response.headlines;

    news = '<div id="espn_zci_news">'
         + '<img src="/iu/?u=' + headshot.href
         + '" height="' + headshot.height
         + '" width="' + headshot.width
         + '" style="float:right;margin:-20px 0px 10px 0px;"><ul>';

    for (var i = 0; i < 3 && i < headlines.length; i++) {
        var article = headlines[i];
        news += '<li><a href="' + article.links.web.href
             +  '">' + article.headline + '</a>'
             +  ' (' + article.source + ')</li>';
    }
    news += '</ul>'
         +  '</div>';

    ddg_spice_espn_bind();
}

function ddg_spice_espn_team(response) {
    response = response.sports[0].leagues[0].teams[0];
    var record = response.record;
    var stats = response.stats;
    var roster = response.athletes;
    var logo = response.logos.large.href;
    var teamColor = response.color;
    var totalGames = record.wins + record.losses + record.ties;
    var winPercentage = Math.floor(record.wins / totalGames * 100);
    var lossPercentage = Math.floor(record.losses / totalGames * 100);
    var tiePercentage = 100 - winPercentage - lossPercentage;
    var season = record.season.year
               + " (" + record.season.description + " season)";
    console.log(response);
    team = '<div id="espn_zci_team">'
         + '<img style="float:right;" src="' + logo + '">'
         + '<fieldset style="border-top:1px solid #'
         + teamColor + ';padding:10px 10px 20px 10px;width:67%;">'
         + '<legend>&nbsp;' + season + '&nbsp;</legend>'
         + '<div style="background-color:green;width:'
         + winPercentage + '%">&nbsp;' + record.wins + ' wins</div>'
         + '<div style="background-color:red;margin-top:0px;width:'
         + lossPercentage + '%">&nbsp;' + record.losses + ' losses</div>'
         + (record.ties !== 0 ? 
            '<div style="background-color:grey;width:'
            + tiePercentage + '%">&nbsp;' + record.ties + ' ties</div>'
            : "") + '</fieldset>'
         + '<table style="border-spacing:20px;margin-top:10px;">'
         + '<th>Name</th><th>Position</th><th>No.</th>'
         + '<th>Age</th><th>HT</th><th>WT</th>'
         + roster.map(function(player) {
             return '<tr>'
                    + '<td><a href="/?q='
                    + encodeURIComponent(player.displayName)
                    + '">' + player.displayName + '</td>'
                    + '<td>' + player.positions[0].name + '</td>'
                    + '<td>' + player.jersey + '</td>'
                    + '<td>' + player.age + '</td>'
                    + '<td>' + player.height + '</td>'
                    + '<td>' + player.weight + '</td>'
                    + '</tr>';
         }).join("") + '</table>';
    team += '</div>';

    ddg_spice_espn_bind();
}

function Carousel(videos) {

    this.isProp = function (prop) {
      for (var i = 0, len = prop.length; i < len; i++) {
        if ((this[prop[i]]) === undefined)
          return false;
      }
      return true;
    }

    this.width = 148
    
    this.div = d.createElement('div')
    this.div.id = 'espn_zci_videos'

    var emb = d.createElement('div')
    emb.id = 'emb'
    this.div.appendChild(emb)

    var nav = d.createElement('div')
    YAHOO.util.Dom.addClass(nav, 'nav')

    var frame = d.createElement('div')
    frame.id = 'frame'

    var len = videos.length
    var end = this.width * len

    var ul = d.createElement('ul')
    ul.id = 'slides'
    YAHOO.util.Dom.setStyle(ul, 'width', end + 'px')

    function spin(id) {
      return function (e) {
        preventDefault(e)

        var j = 0
        ul.childNodes.map(function(li) {
                YAHOO.util.Dom.removeClass(li, 'sel')
        });
        YAHOO.util.Dom.addClass(this.parentNode, 'sel')

        var ne = d.createElement('iframe')
        ne.src = [
            'https://www.youtube.com/embed/' + id + '?'
          , 'autoplay=1'
          , 'wmode=opaque'
          , 'iv_load_policy=3'
          , 'autohide=1'
          , 'version=3'
          , 'enablejsapi=1'
        ].join('&')

        YAHOO.util.Dom.setAttribute(ne, 'allowFullScreen', true)
        YAHOO.util.Dom.setAttribute(ne, 'webkitAllowFullScreen', true)
        YAHOO.util.Dom.setAttribute(ne, 'mozallowfullscreen', true)
        ne.frameBorder = 0

        emb.innerHTML = ''  // clear
        emb.appendChild(ne)
        YAHOO.util.Dom.setStyle('emb', 'display', 'block')
      }
    }

    var i, li, img, a, id, vid, p, txt
    for (i = 0; i < len; i++) {
      li = d.createElement('li')
      YAHOO.util.Dom.addClass(li, 'item')

      vid = videos[i];
      id = vid.id.$t.split('/').pop()

      a = d.createElement('a')
      a.href = 'http://youtube.com/watch?v=' + id

      YAHOO.util.Event.addListener(a, 'click', spin(id))

      img = d.createElement('img')
      if (!this.isProp(vid, 'media$group.media$thumbnail')) continue
      img.src = vid.media$group.media$thumbnail[0].url

      p = d.createElement('p')
      if (!this.isProp(vid, 'title.$t')) continue
      txt = d.createTextNode(vid.title.$t)
      p.appendChild(txt)

      a.appendChild(img)
      a.appendChild(p)

      li.appendChild(a)
      ul.appendChild(li)
    }

    frame.appendChild(ul)
    nav.appendChild(frame)

    // gradient fades
    var gr = d.createElement('div')
    gr.id = 'gr'
    YAHOO.util.Dom.addClass(gr, 'grad')
    nav.appendChild(gr)

    var gl = d.createElement('div')
    gl.id = 'gl'
    YAHOO.util.Dom.addClass(gl, 'grad')
    nav.appendChild(gl)

    var win, inc, last, off = 0, off2, carouselState = 0

    function pnClasses() {
      if (carouselState > 0) YAHOO.util.Dom.removeClass('preva', 'npah')
      else YAHOO.util.Dom.addClass('preva', 'npah')

      if (carouselState < last) YAHOO.util.Dom.removeClass('nexta', 'npah')
      else YAHOO.util.Dom.addClass('nexta', 'npah')

      YAHOO.util.Dom.setStyle('slides', 'padding-left', off + 'px')
      YAHOO.util.Dom.setStyle('gl', 'width', off + 'px')
      YAHOO.util.Dom.setStyle('gr', 'width', off2 + 'px')

      // 16/9 Aspect Ratio + menu
      var hei = Math.floor(win * 0.5625) + 30
      YAHOO.util.Dom.setStyle('emb', 'height', hei + 'px')
    }

    this.setup = function() {
      //win = YAHOO.util.Dom.getRegion('frame').width;
      win = 168;
      inc = Math.floor(win / this.width);
      last = Math.max(0, len - (len % inc));

      var extra = win - (inc * this.width);
      off = Math.floor(extra / 2);  // will center the vids
      off2 = extra - off;

      var buttons = ['nexta','preva'];
      [ true, false ].map(function(next){
          YAHOO.util.Event.addListener(
              buttons.shift(), 'click', wrapCB(next)
          )
      });
      pnClasses();
      makeDots();
    }

    function preventDefault(e) {
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
    }

    function setSlides(carouselState) {
      //var mar = '-' + (carouselState * this.width) + 'px'
      var mar = '-' + (carouselState * 148) + 'px';
      YAHOO.util.Dom.setStyle('slides', 'margin-left', mar);
    }

    function wrapCB(next) {
      return function (e) {
        preventDefault(e);

        if (carouselState === 0 && !next) return;
        if (carouselState === last && next) return;

        carouselState += (next ? 1 : -1) * inc;

        // edge conditions when resizing
        if (carouselState < 0) carouselState = 0;
        if (carouselState > last) carouselState = last;

        highlightDot(carouselState / inc);
        setSlides(carouselState);
        pnClasses();
      }
    }

    function makeNav(txt, id, next) {
      var na = d.createElement('a')
      na.appendChild(d.createTextNode(txt))
      na.href = '#'
      na.id = id
      YAHOO.util.Dom.addClass(na, 'npa')
      nav.appendChild(na)
    }

    makeNav('>', 'nexta', true)
    makeNav('<', 'preva', false)

    this.div.appendChild(nav)

    function highlightDot(j) {
      var dots = d.getElementById('dots').childNodes
      var len = dots.length
      var k = 0
      for (; k < len; k++) YAHOO.util.Dom.removeClass(dots[k], 'selected')
      YAHOO.util.Dom.addClass(dots[j], 'selected')
    }

    function dotHandler(j) {
      return function (e) {
        preventDefault(e)
        carouselState = j * inc
        highlightDot(j)
        setSlides()
        pnClasses()
      }
    }

    // dots
    function makeDots() {
      var dots = d.getElementById('dots')
      if (dots) dots.parentNode.removeChild(dots)
      //if (win < 500) return
      dots = d.createElement('p')
      dots.id = 'dots'
      var lin, j = 0, n = Math.ceil(len / inc)
      var sel = carouselState / inc
      for (; j < n; j++) {
        lin = d.createElement('a')
        lin.appendChild(d.createTextNode('\u2022'))
        lin.href = '#'
        if (j === sel) YAHOO.util.Dom.addClass(lin, 'selected')
        YAHOO.util.Event.addListener(lin, 'click', dotHandler(j))
        dots.appendChild(lin)
      }
      var div = d.getElementById("espn_zci_videos");
      div.appendChild(dots)
    }

    var resize
    YAHOO.util.Event.addListener(window, 'resize', function () {
      clearTimeout(resize)
      resize = setTimeout(setup, 400)  // tune
    })

    var u = 'http://youtube.com/'
    if (this.isProp(videos, 'feed.title.$t')) {
      var q = res.feed.title.$t.split(': ')[1]
      if (q) u += 'search?page_search_query=' + q.replace(/\s/g, '+')
    }

    YAHOO.util.Event.addListener(emb, 'click', function (e) {
      preventDefault(e)
      this.innerHTML = ''  // clear video
      YAHOO.util.Dom.setStyle('emb', 'display', 'none')
    })
}

function ddg_spice_espn_videos(response) {
    entries = response.feed.entry;
    videos = entries.map(function(v){return v.link[0].href});

    carousel = new Carousel(entries);

    videos = carousel.div.outerHTML;

    ddg_spice_espn_bind();
}

function ddg_spice_espn_bind() {
    if (++callsMade != numberOfCalls) return;

    items[0]['a'] = tabs
                  + news
                  + team
                  + stats
                  + gamelog
                  + videos;

    nra(items, 0, true);

    carousel.setup();

    var table = document.getElementById("espn_zci_stats");
    for (var i = 0; i < table.rows.length; i++) {
        if (i % 2 == 0) table.rows[i].className="tr_odd";
    }

    ids = [ "espn_zci_gamelog_link",
            "espn_zci_stats_link",
            "espn_zci_team_link",
            "espn_zci_news_link",
            "espn_zci_videos_link"
          ];

    var bgtabs = [];
    ids.map( function(id) {
        bgtabs.push(document.getElementById(id.replace("_link","")))
    });

    var current_link = document.getElementById("espn_zci_news_link");
    YAHOO.util.Dom.setStyle(current_link, "text-decoration", "underline");


    YAHOO.util.Event.addListener(ids, "click", function(e) {
        YAHOO.util.Dom.setStyle(current_link, "text-decoration", "none");
        current_link = this;
        YAHOO.util.Dom.setStyle(this, "text-decoration", "underline");
        var current_tab = this.id.replace("_link", "");
        bgtabs.map(function(i){i.style.display="none";});
        current_tab = document.getElementById(current_tab);
        current_tab.style.display = "block";

        moreAtLink = YAHOO.util.Dom.getElementsByClassName(
                        "zero_click_more_at_link", "a",
                        document.getElementById("zero_click_abstract")
                    )[0];

        switch (current_tab.id) {
            case "espn_zci_gamelog":
                moreAtLink.href = baseURL + "/nba/player/gamelog/_/id/"
                                + playerID;
                break;
            case "espn_zci_stats":
                moreAtLink.href = baseURL + "/nba/player/stats/_/id/"
                                + playerID;
                break;
            case "espn_zci_team":
                moreAtLink.href = baseURL + "/nba/team/_/name/"
                                + teamCity.toLowerCase().substr(0,3) + "/"
                                + teamName.toLowerCase().replace(" ", "-");
                break;
            default:
                moreAtLink.href = baseURL + "/nba/player/_/id/"
                                + playerID;
        }

        e.stopImmediatePropagation();
    });

    YAHOO.util.Event.addListener(ids, "mouseenter", function(e) {
        YAHOO.util.Dom.setStyle(this, 'text-decoration', 'underline');
    });

    YAHOO.util.Event.addListener(ids, "mouseleave", function(e) {
        if (this != current_link) {
            YAHOO.util.Dom.setStyle(this, 'text-decoration', 'none');
        }
    });
}
