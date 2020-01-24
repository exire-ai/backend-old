/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var idList = [
  "themoma",
  "sakebardecibel",
  "arturos",
  "artechouse",
  "ziamaria",
  "sushidamo",
  "katzdelicatessan",
  "barcade",
  "themet",
  "hudsonyards",
  "minus10icecream",
  "zeroottonove",
  "thewhitney"
]

var hardcoded = [
  {
      "title" : "Recommended for you",
      "data" : [
          {
              "placeID":"themoma",
              "title":"The Museum of Modern Art",
              "imgURL":"https://www.nycgo.com/images/venues/1069/_moma_christopherpostlewaite_img_6440__x_large.jpg",
              "description":"World-class sculpture, art, and design museum",
              "open": 10,
              "closed": 17.5,
              "closed_days":[],
              "latitude": 40.764885,
              "longitude": -73.97784,
              "cost": 25,
              "rank": 4.6,
              "type" : "venue"
          },
          {
              "title":"Central Rock Gym",
              "imgURL":"https://media.timeout.com/images/105178130/750/562/image.jpg",
              "description":"Indoor climbing destination offering climbing instruction and many challenges",
              "region":"Midtown",
              "open": 10,
              "closed": 21,
              "closed_days":[],
              "latitude": 40.772511,
              "longitude": -73.990387,
              "cost": 32,
              "rank": 4.7,
              "placeID": "centralrockgym",
              "type" : "venue"
          },
          {
              "title":"Yoga to the People",
              "imgURL":"https://img.grouponcdn.com/deal/3Nm8wZ5JrwtzyTHpjhvdUCb87XX2/3N-960x576/v1/sc600x600.jpg","description":"No registration necessary. Arrive 15 minutes early. On 4th floor. Class schedule offered here https://yogatothepeople.com/east-village/",
              "open": 8,
              "closed": 20,
              "closed_days":[],
              "region":"East Village",
              "latitude": 40.728993,
              "longitude": -73.989315,
              "cost": 10,
              "rank": 4.9,
              "time": 1.5,
              "placeID":"yogatothepeople",
              "type" : "venue"
          },
          {
              "title":"Ono Bowls",
              "description":"Authentic Hawaiian Acai bowls",
              "imgURL":"https://uploads.thealternativepress.com/uploads/photos/best_ee9d9d956b28cca29aba_DSC_0686.JPG?v=a10bfd774f254df19288",
              "region":"Grrenwich Village",
              "open": 9,
              "closed": 18,
              "closed_days":[],
              "latitude": 40.731535,
              "longitude": -73.994268,
              "cost": 10,
              "rank": 4.5,
              "placeID":"onobowls",
              "type" : "venue"
          },
          {
              "title":"Little Cupcake Bakeshop",
              "description":"Earth-conscious bakery and cafe with posh, retro decor and late hours",
              "imgURL":"https://inhabitat.com/wp-content/blogs.dir/1/files/2010/11/little-cupcake-bakeshop-11.jpg",
              "region":"Soho",
              "open": 7.5,
              "closed": 23,
              "closed_days":["thursday"],
              "latitude": 40.72295,
              "longitude": -73.994853,
              "cost": 9,
              "rank": 4.3,
              "placeID":"littlecupcakebakeshop",
              "type" : "venue"
          },
          {
              "title":"Sake Bar Decibel",
              "description":"Underground sake bar offering a variety of dishes",
              "imgURL":"https://images.squarespace-cdn.com/content/v1/5ae8bf79365f022882affbfa/1526057259689-U5UHAF72ST4FZA0728ER/ke17ZwdGBToddI8pDm48kEpVg-ILAPna1wRh-xAJ9fRZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpwEv36x-EUL2-BSQ5feDhwGCbXuJBFqZ-erYzVouT8yOb9TwqchglLQOCYTRn7ZGxI/jeffrey.b.xu.jpg",
              "open": 18,
              "closed": 24.5,
              "closed_days":[],
              "latitude": 40.729333,
              "longitude": -73.987791,
              "cost": 20,
              "rank": 4.3,
              "placeID":"sakebardecibel",
              "type" : "venue"
          },
          {
              "placeID":"chinatownicecreamfactory",
              "title":"Chinatown Ice Cream Factory",
              "imgURL":"https://www.nycgo.com/images/venues/4182/chinatown-ice-cream-factory-malcolm-brown-27__x_large.jpg",
              "description":"Compact ice cream shop with familiar to exotic flavors",
              "region":"Chinatown",
              "open": 11,
              "closed": 22,
              "closed_days":[],
              "latitude": 40.715353,
              "longitude": -73.998108,
              "cost": 5,
              "tips":"",
              "rank": 4.4,
              "type" : "venue"
          },
          {
              "placeID":"lachurreria",
              "title":"La Churreria",
              "description":"Snug Spanish spot for paella, tapas, churros, and more",
              "imgURL":"https://static1.squarespace.com/static/54f857b5e4b021b24483e024/t/55089c7ee4b054c53450407f/1426627719697/?format=1500w",
              "region":"Soho",
              "open": 10,"closed":18,
              "closed_days":["monday"],
              "latitude": 40.724439,
              "longitude": -73.995008,
              "cost": 10,
              "tips":"",
              "rank": 4.1,
              "type" : "venue"
          }
      ]
  },
  {
      "title" : "Our top picks",
      "data" : [
          {
              "title":"Arturo's",
              "description":"Circa-1957 pizzeria with coal-oven pies and live jazz",
              "imgURL":"https://www.nycgo.com/images/venues/4289/arturos-malcolm-brown-1__x_large.jpg",
              "region":"Midtown",
              "open": 16,
              "closed": 24,
              "closed_days":[],
              "latitude": 40.727394,
              "longitude": -74.000395,
              "cost": 25,
              "placeID":"arturos",
              "rank": 4.9,
              "type" : "venue"
          },
          {
              "placeID" : "artechouse",
              "title" : "ARTECHOUSE",
              "imgURL" : "https://www.washingtonpost.com/resizer/5j66grexWjaa6VN7QoqFmTztJ18=/767x0/smart/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/T62YDLGA7EI6RH2PUG326JK2UU.jpg",
              "region" : "Chelsea",
              "description" : "The intersection of art, science, and technology with interactive and immersive art exhibitions",
              "open" : 10,
              "closed" : 22,
              "closed_days" : [],
              "latitude" : 40.742404,
              "longitude" : -74.006521,
              "cost" : 24,
              "rank": 5,
              "type" : "venue"
          },
          {
              "title": "Zia Maria",
              "description" : "Sophisticated Italian output with Neopolitan-style pies, pastas and other dishes",
              "imgURL" : "https://media-cdn.tripadvisor.com/media/photo-p/0b/a6/b7/75/great-experience.jpg",
              "region" : "Chelsea",
              "open" : 11,
              "closed" : 22,
              "closed_days" : [],
              "latitude" : 40.745404,
              "longitude" : -73.999339,
              "cost" : 13,
              "placeID" : "ziamaria",
              "rank" : 4.9,
              "type" : "venue"
          },
          {
              "title" : "Il Laboratoria del Gelato",
              "description" : "Chic corner gelato counter and cafe offering a rotating selection of gourmet flavors",
              "imgURL" : "https://d253b1eioa5z7b.cloudfront.net/venue_images/medium_fb81aed5-bbcc-4a6b-9473-748fc65478fd.jpg",
              "region" : "East Village",
              "open" : 10,
              "closed" : 22,
              "closed_days" : [],
              "latitude" : 40.722248,
              "longitude" : -73.987079,
              "cost" : 9,
              "rank": 4.6,
              "placeID" : "illaboratoriadelgelato",
              "type" : "venue"
          },
          {
              "title" : "Sushi Damo",
              "description" : "Classic Japanese cuisine in a quiet, minimalist setting",
              "imgURL" : "https://d37219swed47g7.cloudfront.net/media/CACHE/images/images/guides/where-to-eat-near-columbus-circle/Sushi%20Damo/83a7755995ec31eb44ad779ee01f076f.jpg",
              "region" : "Hell's Kitchen",
              "open": 12,
              "closed" : 22.5,
              "closed_days" : [],
              "latitude" : 40.767732,
              "longitude" : -73.983617,
              "cost" : 25,
              "rank" : 5,
              "tips" : "The Rock Shrimp Tempura, Tori Kara-Age, and Stir-Fried Udon are incredible",
              "placeID":"sushidamo",
              "type" : "venue"
          },
          {
              "placeID":"thefrick",
              "title":"Frick Collection",
              "imgURL":"https://d2kmm3vx031a1h.cloudfront.net/3Pp1Vnr3QPiMdh70SrnO_16936117_10210991815645242_154478172_o.jpg",
              "description":"Collection of industrialist Henry Clay Frick",
              "open": 10,
              "closed": 18,
              "closed_days":["monday"],
              "latitude": 40.771469,
              "longitude": -73.967378,
              "cost": 22,
              "rank": 4.9,
              "type" : "venue"
          },
          {
              "title":"East River Park",
              "imgURL":"https://www.nycgovparks.org/photo_gallery/full_size/19480.jpg",
              "description":"57-acre park along the river with incredible views",
              "region":"Lower East Side",
              "open": 6,
              "closed": 25,
              "closed_days":[],
              "latitude": 40.718968,
              "longitude": -73.974347,
              "cost": 0,
              "placeID":"eastriverpark",
              "rank": 4.4,
              "type" : "venue"
          },
          {
              "placeID":"southhighline",
              "title":"The High Line",
              "imgURL":"https://static1.squarespace.com/static/542036ade4b02579387899a0/t/5a5aa374085229afb8101a86/1516301357859/People+walking+on%C2%A0The+High+Line",
              "description":"1.45 mile-long elevated park and greenway",
              "region":"Chelsea",
              "open": 7,
              "closed": 22,
              "closed_days":[],
              "latitude": 40.739427,
              "longitude": -74.008275,
              "cost": 0,
              "rank": "3.5",
              "type" : "venue"
          }
      ]
  },
  {
      "title" : "Community favorites",
      "data" : [
          {
              "title":"Katz Delicatessan",
              "description":"No-frills deli with theatrically cranky service serving mile-high sandwiches since 1888",
              "imgURL":"https://kirbiecravings.com/wp-content/uploads/2016/09/katz-deli-10-700x664.jpg",
              "region":"East Village",
              "open": 12,
              "closed": 22.75,
              "closed_days":[],
              "latitude": 40.72224,
              "longitude": -73.987426,
              "cost": 8,
              "rank": 4.5,
              "placeID" : "katzdelicatessan",
              "type" : "venue"
          },
          {
              "title":"Barcade",
              "placeID":"barcade",
              "description":"Craft beers on tap & classic video games.",
              "imgURL":"https://media.timeout.com/images/104724050/630/472/image.jpg",
              "open":12,
              "closed":26,
              "closed_days":[],
              "latitude":40.744322,
              "longitude":-73.994426,
              "cost":15,
              "rank": 4.4,
              "type" : "venue"
          },
          {
              "placeID":"showfields",
              "title":"SHOWFIELDS",
              "description":"Showcases new brands",
              "imgURL":"https://securecdn.pymnts.com/wp-content/uploads/2019/02/showfields-talzvinathanel-retail-eCommerce.jpg",
              "region":"Soho",
              "open":12,
              "closed":19,
              "closed_days":[],
              "latitude":40.726453,
              "longitude":-73.994511,
              "cost":0,
              "rank":4.3,
              "type" : "venue"
          },
          {
              "placeID":"themet",
              "title":"The Metropolitan Museum of Art",
              "imgURL":"https://www.metmuseum.org/-/media/images/visit/met-fifth-avenue/fifthave_teaser.jpg",
              "description":"Largest art museum in the United States",
              "open": 10,
              "closed": 17.5,
              "closed_days":[],
              "latitude": 40.782299,
              "longitude": -73.962544,
              "cost": 5,
              "rank": 5,
              "time": 2,
              "type" : "venue"
          },
          {
              "title":"Museum of Sex",
              "imgURL":"https://dws2fz4z8ntt9.cloudfront.net/wp-content/uploads/sites/5/2018/01/23114759/Museum-of-Sex-1.png",
              "description":"Intimate museum chronicling the evolution of human sexuality",
              "region":"Flatiron",
              "open": 11,
              "closed": 23,
              "closed_days":[],
              "latitude": 40.744196,
              "longitude": -73.987401,
              "cost": 17,
              "placeID":"museumofsex",
              "rank": 4.7,
              "type" : "venue"
          },
          {
              "title":"Hudson Yards",
              "imgURL":"https://www.hudsonyardsnewyork.com/sites/default/files/styles/experience_details/public/2019-03/Schenck%20Related%20HY%202019_03_15%20DSC_1932.jpg?itok=KiNhBtUE",
              "description":"Walkway over water with art instillations and incredible views",
              "region":"Midtown",
              "open": 6,
              "closed": 24,
              "closed_days":[],
              "latitude": 40.75384,
              "longitude": -74.002262,
              "cost": 0,
              "placeID":"hudsonyards",
              "rank": 5,
              "type" : "venue"
          },
          {
              "placeID":"minus10icecream",
              "title":"Minus10 Ice Cream",
              "imgURL":"https://pbs.twimg.com/media/DNezcy7UEAApXyC.jpg",
              "description":"Thai style ice cream rolls",
              "region":"Chinatown",
              "open": 13,
              "closed": 22,
              "closed_days":[],
              "latitude": 40.714062,
              "longitude": -73.998589,
              "cost": 6,
              "tips":"",
              "rank": 4.5,
              "type" : "venue"
          },
          {
              "title":"Zero Otto Nove",
              "imgURL":"https://static01.nyt.com/images/2014/12/07/nyregion/07DINEWE1/07DINEWE1-articleLarge.jpg",
              "description":"Roomy pizza and pasta joint inspired by cooking from the city of Salerno",
              "region":"Chelsea",
              "open": 16,
              "closed": 22,
              "closed_days":[],
              "latitude": 40.740848,
              "longitude": -73.99157,
              "cost": 17,
              "placeID":"zeroottonove",
              "rank": 4.7,
              "type" : "venue"
          }
      ]
  }
]

var getRecommended = async function (categories, callback) {
  modelDict.venue.find({
    subcategory: { $in: categories }
  }, {
    _id: 0
  }).then(result => {
    callback(result)
  }).catch(err => {
    callback(hardcoded[0]["data"]);
  })
}

var getTopPicks = async function (idList, callback) {
  modelDict.venue.find({
    placeID: { $in: idList }
  }, {
    _id: 0
  }).then(result => {
    callback(result)
  }).catch(err => {
    var result = hardcoded[1]["data"]
    callback(result);
  })
}

var getCommunityFavorites = async function (callback) {
  modelDict.venue.find({}, {
    _id: 0
  }, {
    limit: 24,
    sort: {
      peopleWatching: -1
    }
  }).then(result => {
    callback(result)
  }).catch(err => {
    var result = hardcoded[2]["data"]
    callback(result)
  })
}

var getEvents = async function (callback) {
  modelDict.event.find({}, {
    _id: 0
  }, {
    limit: 15,
    sort: {
      startUNIX: -1
    }
  }).then(result => {
    callback(result)
  }).catch(err => {
    var result = hardcoded[2]["data"]
    callback(result)
  })
}

module.exports = async function (req, res) {
  if(!req.params.userID) {
    return res.status(400).send('Missing userID')
  }
  modelDict.user.findOne({
    "userID" : req.params.userID
  }, {
    _id : 0
  }).then(result => {
    if (result != null) {
      getRecommended(result.categories, function(recommendedForYou) {
        getTopPicks(idList, function(topPicks) {
          getCommunityFavorites(function(communityFavorites) {
            getEvents(function(events) {
              var topAndCommunity = topPicks.concat(communityFavorites)
              for ( var i = recommendedForYou.length - 1; i >= 0; i--) {
                for (var j = 0; j < topAndCommunity.length; j++) {
                  if(recommendedForYou[i] && (recommendedForYou[i].placeID === topAndCommunity[j].placeID)) {
                    recommendedForYou.splice(i, 1);
                  }
                }
              }
              for ( var i = communityFavorites.length - 1; i >= 0; i--) {
                for (var j = 0; j < topPicks.length; j++) {
                  if(communityFavorites[i] && (communityFavorites[i].placeID === topPicks[j].placeID)) {
                    communityFavorites.splice(i, 1);
                  }
                }
              }

              res.json([
                {
                  title: "Recommended for you",
                  data: shuffle(recommendedForYou)
                },
                {
                  title: "Our top picks",
                  data: shuffle(topPicks)
                },
                {
                  title: "Community favorites",
                  data: shuffle(communityFavorites)
                },
                {
                  title: "Events",
                  data: shuffle(events)
                }
              ])
            });
          });
        });
      });
    } else {
      res.json(false);
    }
  }).catch(err => {
    res.status(500).json(err)
  })
}
