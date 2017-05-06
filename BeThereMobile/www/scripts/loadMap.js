var map;
var markerList = [];
var iconURLs = ['images/listen.png', 'images/view.png', 'images/watch.png'];
var namesList = [];

function initMap() {
  // Melbourne CBD
  var startingLocation = {
    lat: -37.813397,
    lng: 144.965072
  };
  // Th e
  map = new google.maps.Map(document.getElementById('map'), {
    center: startingLocation,
    zoom: 13
  });

  addMapMarkers();
  addEventCircles();

  showWhoIsThere();
}

function addEventCircles() {
  var eventLocations = [{
      center: {
        lat: -37.813628,
        lng: 144.963058
      },
      radius: 3000
    },
    {
      center: {
        lat: -37.864000,
        lng: 144.982000
      },
      radius: 2000
    }
  ];
  for (var event in eventLocations) {
    // Add the circle for this city to the map.
    var eventRadius = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#b5c3fc',
      fillOpacity: 0.35,
      map: map,
      center: eventLocations[event].center,
      radius: eventLocations[event].radius
    });
  }
}

function showWhoIsThere() {
  // http://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
  var uniqueNames = [];
  $.each(namesList, function(i, el) {
    if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
  });
  var printingNamesList = [];
  if (uniqueNames.length > 0){
    var namesSoFar = 0;

    while ((namesSoFar < 5) && (namesSoFar != uniqueNames.length)){
      printingNamesList.push(uniqueNames[namesSoFar]);
      namesSoFar += 1;
    }
  }

  // The above code is so bad. And it's not even that late yet...
  $(".mediaplaceholder-bottomtext").empty();
  $(".mediaplaceholder-bottomtext").append(getNameHtml(printingNamesList));
}

function getNameHtml(names){
  if (names.length === 0){
    return "I'm sure people will be here soon";
  }
  var string = "Have fun with:<br>";
  for (var name in names){
    string = string + names[name] + '<br>';
  }
  string = string + 'And more!';
  return string;
}
function addMapMarkers() {
  // Add Markers
  //
  // Need the media list from the database
  // TODO API CALL!
  var mediaList = [{
      position: {
        lat: -37.806548,
        lng: 144.971080
      },
      mediaType: 'photo',
      mediaID: 'https://farm3.staticflickr.com/2808/34282062515_6192a67cfd.jpg',
      name: 'Fred Smith',
      thumbURL: 'images/listen.png'
    },
    {
      position: {
        lat: -37.810142,
        lng: 144.958377
      },
      mediaType: 'video',
      mediaID: 'YJEjQglAdOk',
      thumbURL: 'images/listen.png',
      name: 'Fred Jones',
    },
    {
      position: {
        lat: -37.816371,
        lng: 144.962647
      },
      mediaType: 'audio',
      mediaID: '3',
      thumbURL: 'images/listen.png',
      name: 'Fred Jenkins',
    }
  ];

  for (var i = 0; i < mediaList.length; i++) {
    markerList.push(createMarker(mediaList[i]));
  }
  var markerCluster = new MarkerClusterer(map, markerList, {
    imagePath: 'images/m'
  });
}

function createMarker(mediaItem) {
  namesList.push(mediaItem.name);
  var iconURL = mediaItem.thumbURL;

  var marker = new google.maps.Marker({
    title: mediaItem.name,
    position: mediaItem.position,
    map: map,
    icon: iconURL,
  });
  marker.name = mediaItem.name;
  marker.mediaType = mediaItem.mediaType;
  marker.mediaID = mediaItem.mediaID;

  // Add on click event to marker
  marker.addListener('click', getFunctionForMediaType(mediaItem.mediaType));
  return marker;
}

function showVideo() {
  var mediaType = this.mediaType;
  var mediaID = this.mediaID; // In this case youtube id
  emptyMediaDev();
  $(".media").append('<div class = "videoContainer"> <iframe src="http://www.youtube.com/embed/' + mediaID +
    '" width="560" height="315" frameborder="0" ></iframe> </div>');
}

function showImage() {
  var mediaType = this.mediaType;
  var mediaID = this.mediaID; // In this case image url
  emptyMediaDev();
  $(".media").append('<div class="content-block-title">Media</div>' +
    '<div class="col-100" id="imgViewer"> <img id="img-media" src="' + mediaID + '" /></div>');
}


function getFunctionForMediaType(mediaType) {
  if (mediaType == 'video') {
    return showVideo;
  } else {
    return showImage;
  }
}

function emptyMediaDev() {
  $(".media").empty();
}

function getIconURL(mediaType) {
  if (mediaType == 'photo') {
    return iconURLs[1];
  } else if (mediaType == 'video') {
    return iconURLs[2];
  } else {
    // It's audio
    return iconURLs[0];
  }
}



function displayImage(mediaObject) {
  $('img-media').src('https://farm3.staticflickr.com/2808/34282062515_6192a67cfd.jpg');

  $('img-viewer').show();
}
