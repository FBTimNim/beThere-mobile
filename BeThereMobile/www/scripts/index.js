// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android
// devices/emulators: launch your app, set breakpoints, and then run
// "window.location.reload()" in the JavaScript Console.
(function() {
    "use strict";
    console.log('load');
    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    var API_KEY = "pekdaYjYqAPkAmjT0953s4U2Z3jaW04bz0uAUfdZ36RfMdCnkF0Bf0Odcptx9A3j";

    var welcomescreen_slides = [{
        id: 'slide0',
        picture: '<img src="images/icon.png" alt="" class="circ" style="width: 230px"/>',
        text: '<h1 style="padding-bottom: 5vh">Welcome to beThere, the <b>premiere</b> festival media sharing app!</h1>'
        },
        {
        id: 'slide1',
        picture: '<img src="images/map01.png" alt="" class="circ" style="width: 230px"/>',
        text: "<h1 style='padding-bottom: 5vh'>Just drag around the map to view your Facebook friends' posts.</h1>"
        },
        {
        id: 'slide2',
        picture: '<img src="images/map01.png" alt="" class="circ" style="width: 230px"/>',
        text: '<h1 style="padding-bottom: 8.7vh">You can add your sick gig footage at any time!</h1>'
        },
        {
        id: 'slide3',
        picture: '<img src="images/map01.png" alt="" class="circ" style="width: 230px"/>',
        text: '<h1 style="padding-bottom: 0.5vh">Swipe right to see the ongoing Facebook events near you.*<br/><p style="font-size: 10px">*in the next product iteration, teehee</p></h1>'
        },
        {
        id: 'slide4',
        picture: '<img src="http://cdn.hercampus.com/s3fs-public/styles/full_width_embed/public/2015/04/12/persons-0041_large.png" alt="" class="circ" style="width: 220px; padding-top: 3vh" />',
        text: "<div class='close-welcomescreen' style='margin-bottom: 9.7vh'><h1 style='margin-bottom: 0px'>That's it! Happy festival!</h1><br />Tap to continue.</div>"
        }
    ];

  window.FBLogin = {loggedIn : false};

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // TODO: Cordova has been loaded. Perform any initialization that requires
        // Cordova here.
        navigator.geolocation.getCurrentPosition(onSuccess, onError);

        // Export selectors engine
        window.$$ = Dom7;
        // This function is in loadMap.js
        function onSuccess(position) { changeMapLocation(position); }

        var onError = function(error) { console.log("panic"); }

                      // Initialize your app
        window.myApp = new Framework7({
            'material' : true,
            'init' : false,
            'bgcolor': '#ff9800',
            'fontcolor': '#fff'
        });

        // Add view
        window.mainView = myApp.addView('.view-main', {
            // Because we use fixed-through navbar we can enable dynamic navbar
            dynamicNavbar: true
        });
    
        myApp.onPageInit('index', function (page) {
            console.log('onload');
            $$(page.container).find("#btnfblogin").on("click", function (e) {
                console.log('begin FB login');
                var fbLoginSuccess = function (userData) {
                    window.FBLogin['loggedIn'] = true;
                    window.FBLogin['userId'] = userData['authResponse']['userID'];
                    console.log(userData);
                    console.log(FBLogin);
                    //alert("UserInfo: " + JSON.stringify(userData));
                    alert('Logged in!');
                    facebookConnectPlugin.getAccessToken(function (token) {
                        //alert("Token: " + token);
                        window.FBLogin['accessToken'] = token;
                    }, function (err) {
                        alert("Could not get access token: " + err);
                        console.log(err);
                    });

                    FB.getCurrentUsername(function (name) {
                        $("#btnfblogin").text(name);
                    });
                }

                facebookConnectPlugin.login(["public_profile","user_friends"],
                    fbLoginSuccess,                                   
                    function (error) { alert("error" + error); console.log(error); }
                );
            });

            $$(page.container).find("#btnCloseMedia").on("click", function (e) {
                hideMediaPanel();
            });
        });

        function getLat() {
            return -37.818314 + (Math.random() * 2.0 - 1.0) / 50.0;
        }

        function getLon() {
            return 144.949055 + (Math.random() * 2.0 - 1.0) / 50.0;
        }

        /** Photo Upload Page **/
        myApp.onPageInit('uploadphoto', function (page) {
            $$(page.container).find('#btnUploadCamera').on('click', function (e) {
                //launch device camera
                if (!(navigator && navigator.camera)) {
                    myApp.addNotification({
                        message: 'No Camera Access!'
                    });
                } else {
                    if (!window.FBLogin.loggedIn) {
                        alert("You are not logged in!");
                        return;
                    }
                    navigator.camera.getPicture(function (data) {
                        console.log(data);
                        myApp.addNotification({
                            message: 'PhotoURI:' + data
                        });
                        var fileURL = data;

                        var ft = new FileTransfer();
                        var options = new FileUploadOptions();
                        options.fileKey = 'media';
                        options.mimeType = 'image/jpeg';
                        options.chuckedMode = false;
                        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
                        options.params = {
                            "uid": FBLogin.userId || '-1',
                            "lat": getLat(),//"-37.814",
                            "lon": getLon() ,//"144.9633",
                            "type": "photo",
                            "delay": "0",
                            "duration": "2",
                            "apikey": API_KEY
                        };

                        console.log(options);
                        ft.upload(fileURL,
                            encodeURI(SERVER_URL+"/api/upload"),
                            function (r) {
                                console.log(r);
                                myApp.addNotification({
                                    message: 'Upload Succeeded'
                                });
                                // exit page
                            },
                            function (error) {
                                console.log('upload error:', error);
                                myApp.addNotification({
                                    message: 'Upload Failed: ' + error.exception
                                });
                            },
                            options,true
                        );
                    },
                        function (error) {
                            myApp.addNotification({
                                message: 'Error: ' + error
                            });
                        },
                        {

                        }
                    );
                }

            });
        });


        /** Video Upload Page **/
        myApp.onPageInit('uploadvideo', function (page) {
            $$(page.container).find('#btnUploadCamera').on('click', function (e) {
                if (!window.FBLogin.loggedIn) {
                    alert("You are not logged in!");
                    return;
                }
                //launch device camera
                navigator.device.capture.captureVideo(
                    function (files) {
                        console.log(files);
                        var fileURL = files[0].localURL;

                        var ft = new FileTransfer();
                        var options = new FileUploadOptions();
                        options.fileKey = 'media';
                        options.mimeType = 'image/jpeg';
                        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
                        options.params = {
                            "uid": FBLogin.userId || '-1',
                            "lat": getLat(),//-37.814,
                            "lon": getLon(),//144.9633,
                            "type": "video",
                            "delay": 0,
                            "duration": 2,
                            "apikey": API_KEY
                        };


                        console.log(options);
                        ft.upload(
                            fileURL,
                            encodeURI(SERVER_URL + "/api/upload"),
                            function (r) {
                                console.log(r);
                                myApp.addNotification({
                                    message: 'Upload Succeeded'
                                });
                                // exit page
                            },
                            function (error) {
                                console.log('upload error:', error);
                                myApp.addNotification({
                                    message: 'Upload Failed: ' + error.exception
                                });
                            },
                            options, true
                        );
                    },
                    function (error) {
                        myApp.addNotification(
                            { message: 'Video Capture Error: ' + error });
                    },
                    { limit: 1 }
                );
            });
      });
   

        myApp.init();
        //load welcome screen
        var welcomescreen = myApp.welcomescreen(welcomescreen_slides, options);
  };

  function onPause(){
      // TODO: This application has been suspended. Save application state here.
  };

  function onResume(){
      // TODO: This application has been reactivated. Restore application state
      // here.
  };
})();
