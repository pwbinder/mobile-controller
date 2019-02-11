/**
 * Accounts for all controller functionality.
 * Function is called in player.js after the user joins the room
 */

function activateController(conn, roomId, userName) {
  console.log('Controller Ready...');

  $("<p>" + userName + "</p>").appendTo("#controllerName");

  var controller = document.getElementById("controller"); //whole page
  var button = document.getElementById("button1"); //right side
  var joystick = document.getElementById("joystick"); //left side

  //appears where the user touches the joystick
  var userTouchCircle = document.querySelector("#userTouch");
  var circleX;
  var circleY;

  //Calculating the center of the joystick
  var offset = $('#joystick').offset();
  var joystickWidth = $('#joystick').width();
  var joystickHeight = $('#joystick').height();
  var centerX = offset.left + joystickWidth/2;
  var centerY = offset.top + joystickHeight/2;
  
  //displacement of the touch and the center of the joystick
  var velX;
  var velY;

  //prevent the user from scrolling
  controller.addEventListener("touchstart", preventScroll, false);
  controller.addEventListener("touchmove", preventScroll, false);
  controller.addEventListener("touchend", preventScroll, false);
  
  //button's functionality
  button.addEventListener("touchstart", buttonPressed, false);
  button.addEventListener("touchmove", preventScroll, false);
  button.addEventListener("touchend", buttonRelease, false);

  //joystick's functionality
  joystick.addEventListener("touchstart", joystickPress, false); 
  joystick.addEventListener("touchmove", joystickMove, false);
  joystick.addEventListener("touchend", joystickRelease, false)


  /**
   * Button functions
   */
  function buttonPressed(e) {
      $('#buttonPressed').show();
      $('#buttonReady').hide(); 

      sendButtonMessage("true", conn);

      e.preventDefault();
  }

  function preventScroll(e) {
      e.preventDefault();
  }

  function buttonRelease(e) {
      $('#buttonPressed').hide();
      $('#buttonReady').show();
      sendButtonMessage("false", conn);
      e.preventDefault();
  }

  /**
   * Joystick Functions
   */
  function joystickPress(e) {
    
    //calculate the location of the user touch
    //circle appears here
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;

    circleX = touchX - 55; //offset to appear on finger
    circleY = touchY - 55;

    velX = touchX - centerX;
    velY = touchY - centerY;

    sendVelocityMessage();

    $('#userTouch').show();
    $('#userTouch').css({"top": circleY, "left": circleX}).fadeIn('fast');
    e.preventDefault()
  }

  function joystickMove(e) {
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;

    circleX = touchX - 55; //offset to appear on finger
    circleY = touchY - 55;

    velX = touchX - centerX;
    velY = touchY - centerY;

    sendVelocityMessage();
    
    $('#userTouch').css({"top": circleY, "left": circleX});
    e.preventDefault();
  }

  function joystickRelease(e) {
    velX = 0;
    velY = 0;

    sendVelocityMessage();

    $('#userTouch').hide();
    e.preventDefault();
  }
  
  function sendVelocityMessage() {
    var params = {
        'roomId': roomId,
        'userName': userName,
        'action': 'user-move',
        'velX': velX,
        'velY': velY
    };
    console.log(params);
    conn.send(JSON.stringify(params));
  }

  function sendButtonMessage(buttonPressed) {
    var params = {
        'roomId': roomId,
        'userName': userName,
        'action': 'user-act',
        'userAct': buttonPressed
    };
    console.log(params);
    conn.send(JSON.stringify(params));
  }

      return false;
  
}