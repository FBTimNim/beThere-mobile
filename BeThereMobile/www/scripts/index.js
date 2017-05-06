// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints,
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";
    console.log('load');
    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        navigator.geolocation.getCurrentPosition(onSuccess, onError);

        //This function is in loadMap.js
        function onSuccess(position) {
            changeMapLocation(position);
        }

        var onError = function(error){
            console.log("panic");
        }
        
        // Initialize your app
        window.myApp = new Framework7({
            material: true
        });

        // Export selectors engine
        window.$$ = Dom7;

        // Add view
        window.mainView = myApp.addView('.view-main', {
            // Because we use fixed-through navbar we can enable dynamic navbar
            dynamicNavbar: true
        });

        myApp.onPageInit('uploadphoto', function (page) {
            $$(page.container).find('#btnUploadCamera').on('click', function (e) {
                //launch device camera
                if (!(navigator && navigator.camera)) {
                    myApp.addNotification({
                        message: 'No Camera Access!'
                    });
                } else {
                    navigator.camera.getPicture(function (data) {
                        console.log(data);
                        myApp.addNotification({
                            message: 'PhotoURI:' + data
                        });
                        var fileURL = data;

                        var ft = new FileTransfer();
                        var options = new FileUploadOptions();
                        options.mimeType = 'image/jpg';
                        options.params = {
                            "user": '23',
                            "time": '',
                            "latitute": '',
                            "longitute": ''
                        };

                        
                        ft.upload(fileURL,
                            encodeURI("http://server/upload"),
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
                            options
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

    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();
