
(function() {
  window.FB = {};

  FB.getCurrentUsername = function(callback) {
    var userId = FBLogin['userId'];
    facebookConnectPlugin.api(userId + "/?fields=first_name,last_name", ["public_profile"],
      function onSuccess(result) {
        console.log("Result: ", result);
        /* logs:
          {
            "id": "000000123456789",
            "email": "myemail@example.com"
          }
        */
        callback(result['first_name'] + ' ' + result['last_name']);
      },
      function onError(error) {
        console.error("Failed: ", error);
      }
    );
  }

}());
