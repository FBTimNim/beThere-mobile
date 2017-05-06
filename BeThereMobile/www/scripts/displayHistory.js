var map;
var markerList = [];
var iconURLs = ['images/listen.png', 'images/view.png', 'images/watch.png'];

function initMap() {
  // Melbourne CBD
  var startingLocation = {
    lat: -37.813397,
    lng: 144.965072
  };
  // Th e
  map = new google.maps.Map(document.getElementById('map'), {
    center: startingLocation,
    zoom: 13,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  addMapMarkers(24);
}



function addMapMarkers(hours) {
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
