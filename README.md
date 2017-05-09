beThere mobile app
==================
A geo-social app for immersive experience at festivals. 

> Tied third place at Facebook Melbourne Hackathon 2017

<img alt="Screen Shot" src="screenshot.png" width="300">

Folder Structure
----------------

This is a web app bundled into apk using [Apache Cordova](http://cordova.apache.org/).

```
└─BeThereMobile
    ├─www
    │  ├─vendor      // external libs
    │  ├─scripts
    │  └─css     
    │     
    └─bin
       └─Android
          └─Debug   // built apk
```

Frameworks used
---------------

-	Framework 7 - [Docs](http://framework7.io/docs/)

How to Build
------------

First of all ensure you have a file called `secure.js` in your scripts folder. There is an example in `www/scripts/secure.js.example`.

-	Windows
	-	Install [Visual Studio 2017](http://visualstudio.com/)
	-	Select the `Mobile development with JavaScript` workload when installing
	-	Open the solution file `BeThereMobile.sln`
	-	Just build

> You can also just go into `BeThereMobile/www` and run `python -m SimpleHTTPServer` to run the web app locally.
