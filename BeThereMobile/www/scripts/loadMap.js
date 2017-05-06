var map;
var markerList = [];

var iconURLs = [ 'images/listen.png', 'images/view.png', 'images/watch.png' ];
var namesList = [];

function initMap() {
  // Melbourne CBD
  var startingLocation = {lat : -37.813397, lng : 144.965072};
  map = new google.maps.Map(document.getElementById('map'), {
    center : startingLocation,
    zoom : 13,
    streetViewControl : false,
    disableDefaultUI : true,
    styles : [
      {"elementType" : "geometry", "stylers" : [ {"color" : "#ebe3cd"} ]},
      {
        "elementType" : "labels.text.fill",
        "stylers" : [ {"color" : "#523735"} ]
      },
      {
        "elementType" : "labels.text.stroke",
        "stylers" : [ {"color" : "#f5f1e6"} ]
      },
      {
        "featureType" : "administrative",
        "elementType" : "geometry",
        "stylers" : [ {"visibility" : "off"} ]
      },
      {
        "featureType" : "administrative",
        "elementType" : "geometry.stroke",
        "stylers" : [ {"color" : "#c9b2a6"} ]
      },
      {
        "featureType" : "administrative.land_parcel",
        "elementType" : "geometry.stroke",
        "stylers" : [ {"color" : "#dcd2be"} ]
      },
      {
        "featureType" : "administrative.land_parcel",
        "elementType" : "labels.text.fill",
        "stylers" : [ {"color" : "#ae9e90"} ]
      },
      {
        "featureType" : "landscape.natural",
        "elementType" : "geometry",
        "stylers" : [ {"color" : "#dfd2ae"} ]
      },
      {
        "featureType" : "poi",
        "elementType" : "geometry",
        "stylers" : [ {"color" : "#dfd2ae"} ]
      },
      {
        "featureType" : "poi",
        "elementType" : "labels",
        "stylers" : [ {"visibility" : "off"} ]
      },
      {
        "featureType" : "poi",
        "elementType" : "labels.icon",
        "stylers" : [ {"visibility" : "off"} ]
      },
      {
        "featureType" : "poi",
        "elementType" : "labels.text.fill",
        "stylers" : [ {"color" : "#93817c"} ]
      },
      {
        "featureType" : "poi.park",
        "elementType" : "geometry.fill",
        "stylers" : [ {"color" : "#a5b076"} ]
      },
      {
        "featureType" : "poi.park",
        "elementType" : "labels.text.fill",
        "stylers" : [ {"color" : "#447530"} ]
      },
      {
        "featureType" : "road",
        "elementType" : "geometry",
        "stylers" : [ {"color" : "#f5f1e6"} ]
      },
      {
        "featureType" : "road",
        "elementType" : "labels.icon",
        "stylers" : [ {"visibility" : "off"} ]
      },
      {
        "featureType" : "road.arterial",
        "elementType" : "geometry",
        "stylers" : [ {"color" : "#fdfcf8"} ]
      },
      {
        "featureType" : "road.highway",
        "elementType" : "geometry",
        "stylers" : [ {"color" : "#f8c967"} ]
      },
      {
        "featureType" : "road.highway",
        "elementType" : "geometry.stroke",
        "stylers" : [ {"color" : "#e9bc62"} ]
      },
      {
        "featureType" : "road.highway.controlled_access",
        "elementType" : "geometry",
        "stylers" : [ {"color" : "#e98d58"} ]
      },
      {
        "featureType" : "road.highway.controlled_access",
        "elementType" : "geometry.stroke",
        "stylers" : [ {"color" : "#db8555"} ]
      },
      {
        "featureType" : "road.local",
        "elementType" : "labels.text.fill",
        "stylers" : [ {"color" : "#806b63"} ]
      },
      {"featureType" : "transit", "stylers" : [ {"visibility" : "off"} ]},
      {
        "featureType" : "transit.line",
        "elementType" : "geometry",
        "stylers" : [ {"color" : "#dfd2ae"} ]
      },
      {
        "featureType" : "transit.line",
        "elementType" : "labels.text.fill",
        "stylers" : [ {"color" : "#8f7d77"} ]
      },
      {
        "featureType" : "transit.line",
        "elementType" : "labels.text.stroke",
        "stylers" : [ {"color" : "#ebe3cd"} ]
      },
      {
        "featureType" : "transit.station",
        "elementType" : "geometry",
        "stylers" : [ {"color" : "#dfd2ae"} ]
      },
      {
        "featureType" : "water",
        "elementType" : "geometry.fill",
        "stylers" : [ {"color" : "#b9d3c2"} ]
      },
      {
        "featureType" : "water",
        "elementType" : "labels.text.fill",
        "stylers" : [ {"color" : "#92998d"} ]
      }
    ],
    mapTypeId : google.maps.MapTypeId.ROADMAP
  });

  addMapMarkers();
  addEventCircles();

  showWhoIsThere();
}

function changeMapLocation(newLoc) {
  map.center = {lat : newLoc.coords.latitude, lng : newLoc.coords.longitude};
}

function addEventCircles() {
  var eventLocations = [
    {center : {lat : -37.813628, lng : 144.963058}, radius : 3000},
    {center : {lat : -37.864000, lng : 144.982000}, radius : 2000}
  ];
  for (var event in eventLocations) {
    // Add the circle for this city to the map.
    var eventRadius = new google.maps.Circle({
      strokeColor : '#FF0000',
      strokeOpacity : 0,
      strokeWeight : 1,
      fillColor : '#b5c3fc',
      fillOpacity : 0.1,
      map : map,
      center : eventLocations[event].center,
      radius : eventLocations[event].radius
    });
  }
}

function showWhoIsThere() {
  // http://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
  var uniqueNames = [];
  $.each(namesList, function(i, el) {
    if ($.inArray(el, uniqueNames) === -1)
      uniqueNames.push(el);
  });
  var printingNamesList = [];
  if (uniqueNames.length > 0) {
    var namesSoFar = 0;

    while ((namesSoFar < 5) && (namesSoFar != uniqueNames.length)) {
      printingNamesList.push(uniqueNames[namesSoFar]);
      namesSoFar += 1;
    }
  }

  // The above code is so bad. And it's not even that late yet...
  $(".mediaplaceholder-bottomtext").empty();
  $(".mediaplaceholder-bottomtext").append(getNameHtml(printingNamesList));
}

function getNameHtml(names) {
  if (names.length === 0) {
    return "I'm sure people will be here soon";
  }
  var string = "Have fun with:<br>";
  for (var name in names) {
    string = string + names[name] + '<br>';
  }
  string = string + 'And more!';
  return string;
}

function post(path, params, method) {
  method = method || "post"; // Set method to post by default if not specified.

  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}

function addMapMarkers() {
  // Add Markers

  var jsonBody = $.post("http://108.61.194.210:7981/api/getRelevant", {
    "apikey" :
        "pekdaYjYqAPkAmjT0953s4U2Z3jaW04bz0uAUfdZ36RfMdCnkF0Bf0Odcptx9A3j",
    "withinTime" : 1,
  });

  console.log(jsonBody)

      // Need the media list from the database
      // TODO API CALL!
      var mediaList = [
    {
      position : {lat : -37.806548, lng : 144.971080},
      mediaType : 'photo',
      mediaID :
          'https://farm3.staticflickr.com/2808/34282062515_6192a67cfd.jpg',
      name : 'Fred Smith',
      thumbURL : 'images/listen.png'
    },
    {
      position : {lat : -37.810142, lng : 144.958377},
      mediaType : 'video',
      mediaID : 'YJEjQglAdOk',
      thumbURL : 'images/listen.png',
      name : 'Fred Jones',
    },
    {
      position : {lat : -37.816371, lng : 144.962647},
      mediaType : 'audio',
      mediaID : '3',
      thumbURL : 'images/listen.png',
      name : 'Fred Jenkins',
    }
  ];

  for (var i = 0; i < mediaList.length; i++) {
    markerList.push(createMarker(mediaList[i]));
  }

  var markerCluster =
      new MarkerClusterer(map, markerList, {imagePath : 'images/m'});
}

function createMarker(mediaItem) {
  namesList.push(mediaItem.name);
  var iconURL = mediaItem.thumbURL;

  var marker = new google.maps.Marker({
    title : mediaItem.name,
    position : mediaItem.position,
    map : map,
    icon : iconURL,
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

  $(".media").append(
      '<div class = "videoContainer"> <iframe src="http://www.youtube.com/embed/' +
      mediaID + '" width="560" height="315" frameborder="0" ></iframe> </div>');
}
function showImage() {
  var mediaType = this.mediaType;
  var mediaID = this.mediaID; // In this case image url
  emptyMediaDev();

  $(".media").append(
      '<div class="content-block-title">Media</div>' +
      '<div class="col-100" id="imgViewer"> <img id="img-media" src="' +
      mediaID + '" /></div>');
}
function showAudio() { alert("Media: " + this.mediaType + " " + this.mediaID); }

function getFunctionForMediaType(mediaType) {
  if (mediaType == 'video') {
    return showVideo;
  } else {
    return showImage;
  }
}

function emptyMediaDev() { $(".media").empty(); }
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
  $('img-media')
      .src('https://farm3.staticflickr.com/2808/34282062515_6192a67cfd.jpg');

  $('img-viewer').show();
}
