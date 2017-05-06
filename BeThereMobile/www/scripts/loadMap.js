var map;
var markerList = [];
var iconURLs = [ 'images/listen.png', 'images/view.png', 'images/watch.png' ];

function initMap() {
  // Melbourne CBD
  var startingLocation = {lat : -37.813397, lng : 144.965072};
  map = new google.maps.Map(document.getElementById('map'), {
    center : startingLocation,
    zoom : 13,
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
    ]
  });

  // Add Markers
  var mediaList = [
    {
      position : {lat : -37.806548, lng : 144.971080},
      mediaType : 'photo',
      mediaID : 'https://farm3.staticflickr.com/2808/34282062515_6192a67cfd.jpg'
    },
    {
      position : {lat : -37.810142, lng : 144.958377},
      mediaType : 'video',
      mediaID : 'YJEjQglAdOk'
    },
    {
      position : {lat : -37.816371, lng : 144.962647},
      mediaType : 'audio',
      mediaID : '3'
    }
  ];

  for (var i = 0; i < mediaList.length; i++) {
    markerList.push(createMarker(mediaList[i]));
  }
  var markerCluster =
      new MarkerClusterer(map, markerList, {imagePath : 'images/m'});
}

function createMarker(mediaItem) {
  var iconURL = getIconURL(mediaItem.mediaType);

  var marker = new google.maps.Marker(
      {position : mediaItem.position, map : map, icon : iconURL});
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
  }
  if (mediaType == 'audio') {
    return showAudio;
  }
  if (mediaType == 'photo') {
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
