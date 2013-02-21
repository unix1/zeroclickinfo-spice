var movie_prometheus_json = {
   "total":7,
   "movies":[
      {
         "id":"771228969",
         "title":"Prometheus",
         "year":2012,
         "mpaa_rating":"R",
         "runtime":123,
         "critics_consensus":"Ridley Scott's ambitious quasi-prequel to Alien may not answer all of its big questions, but it's redeemed by its haunting visual grandeur and compelling performances -- particularly Michael Fassbender as a fastidious android.",
         "release_dates":{
            "theater":"2012-06-08",
            "dvd":"2012-10-09"
         },
         "ratings":{
            "critics_rating":"Certified Fresh",
            "critics_score":74,
            "audience_rating":"Upright",
            "audience_score":72
         },
         "synopsis":"Ridley Scott, director of Alien and Blade Runner, returns to the genre he helped define. With Prometheus, he creates a groundbreaking mythology, in which a team of explorers discover a clue to the origins of mankind on Earth, leading them on a thrilling journey to the darkest corners of the universe. There, they must fight a terrifying battle to save the future of the human race. -- (C) Official Site",
         "posters":{
            "thumbnail":"http://content8.flixster.com/movie/11/16/67/11166738_mob.jpg",
            "profile":"http://content8.flixster.com/movie/11/16/67/11166738_pro.jpg",
            "detailed":"http://content8.flixster.com/movie/11/16/67/11166738_det.jpg",
            "original":"http://content8.flixster.com/movie/11/16/67/11166738_ori.jpg"
         },
         "abridged_cast":[
            {
               "name":"Noomi Rapace",
               "id":"770821073",
               "characters":[
                  "Elizabeth Shaw"
               ]
            },
            {
               "name":"Michael Fassbender",
               "id":"364641814",
               "characters":[
                  "David"
               ]
            },
            {
               "name":"Charlize Theron",
               "id":"162654733",
               "characters":[
                  "Meredith Vickers"
               ]
            },
            {
               "name":"Idris Elba",
               "id":"162654425",
               "characters":[
                  "Janek"
               ]
            },
            {
               "name":"Guy Pearce",
               "id":"162660324",
               "characters":[
                  "Peter Weyland"
               ]
            }
         ],
         "alternate_ids":{
            "imdb":"1446714"
         },
         "links":{
            "self":"http://api.rottentomatoes.com/api/public/v1.0/movies/771228969.json",
            "alternate":"http://www.rottentomatoes.com/m/prometheus_2012/",
            "cast":"http://api.rottentomatoes.com/api/public/v1.0/movies/771228969/cast.json",
            "clips":"http://api.rottentomatoes.com/api/public/v1.0/movies/771228969/clips.json",
            "reviews":"http://api.rottentomatoes.com/api/public/v1.0/movies/771228969/reviews.json",
            "similar":"http://api.rottentomatoes.com/api/public/v1.0/movies/771228969/similar.json"
         }
      }
   ],
   "links":{
      "self":"http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=prometheus&page_limit=1&page=1",
      "next":"http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=prometheus&page_limit=1&page=2"
   },
   "link_template":"http://api.rottentomatoes.com/api/public/v1.0/movies.json?q={search-term}&page_limit={results-per-page}&page={page-number}"
};

describe("The movies plugin (Rotten Tomatoes)", function() {
   it("extracts the synopsis", function() {
      var synopsis = ddg_spice_movie.getSynopsis(movie_prometheus_json.movies[0]);
      expect(synopsis).toEqual("Ridley Scott, director of Alien and Blade Runner, returns to the genre he helped define. With Prometheus, he creates a groundbreaking m...");
   });
});