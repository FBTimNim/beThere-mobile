var map;
var markerList = [];
var iconURLs = ['images/listen.png', 'images/view.png', 'images/watch.png'];

function initMap() {
  // Melbourne CBD
  var startingLocation = {
    lat: -37.813397,
    lng: 144.965072
  };
  map = new google.maps.Map(document.getElementById('map'), {
    center: startingLocation,
    zoom: 13
  });

  // Add Markers
  var mediaList = [{
      position: {
        lat: -37.806548,
        lng: 144.971080
      },
      mediaType: 'photo',
      mediaID: '1'
    },
    {
      position: {
        lat: -37.810142,
        lng: 144.958377
      },
      mediaType: 'video',
      mediaID: 'YJEjQglAdOk'
    },
    {
      position: {
        lat: -37.816371,
        lng: 144.962647
      },
      mediaType: 'audio',
      mediaID: '3'
    }
  ];

  for (var i = 0; i < mediaList.length; i++) {
    markerList.push(createMarker(mediaList[i]));
  }
  var markerCluster = new MarkerClusterer(map, markerList,
            {imagePath: 'images/m'});

}

function createMarker(mediaItem) {
  var iconURL = getIconURL(mediaItem.mediaType);

  var marker = new google.maps.Marker({
    position: mediaItem.position,
    map: map,
    icon: iconURL
  });
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
  $( ".media" ).append('<div class = "videoContainer"> <iframe src="http://www.youtube.com/embed/' + mediaID +
    '" width="560" height="315" frameborder="0" ></iframe> </div>');
}
function showImage(){
  alert("Media: " + this.mediaType + " " + this.mediaID);
}
function showAudio(){
  alert("Media: " + this.mediaType + " " + this.mediaID);
}

function getFunctionForMediaType(mediaType){
  if (mediaType == 'video'){
    return showVideo;
  }
  if (mediaType == 'audio'){
    return showAudio;
  }
  if (mediaType == 'photo'){
    return showImage;
  }
}

function emptyMediaDev() {
  $( ".media" ).empty();
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
