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
      mediaID: '2'
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
  marker.addListener('click', function() {
    alert("Media: " + this.mediaType + " " + this.mediaID);
  });
  return marker;
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
