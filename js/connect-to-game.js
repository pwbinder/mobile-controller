var gameUrl = 'ws://greenvilledm.com:8081'; //TODO: Change to correct url

//device type used for the switch
var userType;

//host variables
var roomMembers = 0;

window.onload = function() {
    detectDevice();
    connectToGame();
  };
  
  //detects what type of device is accessing the page
  //this is genius omg i didnt know it was possible
  function detectDevice() {

      //if one of these mobile devices
    if(  /Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(navigator.userAgent) ){
      $('#player').show(); //show the player div
      $('#connect').show();
      userType = "player"; 
    } else {
      $('#host').show();
      userType = "host";
    }
  }

function connectToGame() {
    
  //player variables
  var playerConnected;

    switch(userType) {

        case "host":
          var host = new Host(gameUrl);
          $('#play').on('click', function() {

            //generate the room number
            var roomId = makeId();
            host.hostGame(roomId);
            $('#menu').hide();
            $('#instructions-wrap').show();
            $('<p>'+roomId+'</p>').appendTo('#code');
            
            //launchFullscreen on the whole page
            //launchFullScreen(document.documentElement);
          });

          $('#return-to-menu').on('click', function() {
            $('#menu').show();
            $('#instructions-wrap').hide();
            $('#game-canvas').hide();
          });
          
          break;

        case "player":
          var player = new Player(gameUrl);
          
          $('#connectForm').on('submit', function(e) {
            e.preventDefault(); //remove this if we wanna test things
            player.joinGame(gameUrl);
            $('#connect').hide();
            $('#controller').show();
          });
          roomMembers++;
          break;
    }
}

function makeId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

//Launches fullscreen in Chrome, Firefox, and other browsers
function launchFullScreen(element) {
  if(element.requestFullScreen) {
    element.requestFullScreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}