// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints,
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";
    console.log('load');
    document.addEventListener('deviceready', onDeviceReady.bind(this), false);


    var API_KEY = "pekdaYjYqAPkAmjT0953s4U2Z3jaW04bz0uAUfdZ36RfMdCnkF0Bf0Odcptx9A3j";

    window.FBLogin = {
        loggedIn : false
    };

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        navigator.geolocation.getCurrentPosition(onSuccess, onError);


        // Export selectors engine
        window.$$ = Dom7;
        //This function is in loadMap.js
        function onSuccess(position) {
            changeMapLocation(position);
        }


        var onError = function(error){
            console.log("panic");
        }
        
        // Initialize your app
        window.myApp = new Framework7({
            material: true,
            init: false
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
        });


        // Add view
        window.mainView = myApp.addView('.view-main', {
            // Because we use fixed-through navbar we can enable dynamic navbar
            dynamicNavbar: true
        });



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
                        options.params = {
                            "uid": FBLogin.userId || '-1',
                            "lat": "-37.814",
                            "lon": "144.9633",
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
                        options.params = {
                            "uid": FBLogin.userId || '-1',
                            "lat": -37.814,
                            "lon": 144.9633,
                            "type": "video",
                            "delay": 0,
                            "duration": 2,
                            "apikey": API_KEY
                        };


                        console.log(options);
                        ft.upload(fileURL,
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
                            myApp.addNotification({
                                message: 'Video Capture Error: ' + error
                            });
                        },
                        {
                            limit:1
                        }
                    );
               

            });
        });

        myApp.init();
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();
