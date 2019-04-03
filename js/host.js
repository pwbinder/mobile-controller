var ready = false;
var roomMembers = [];
var username;

lineNo = 0; //used for name of the paintings array
paintings = new Array(); //store lines drawn here

class Host {
    
    

    constructor(gameUrl) {
        
    }
    /** 
     * Opens up the connection with the server
     * Listens for incoming messages from the server
     */
    hostGame(roomId) {
        var conn = new WebSocket(gameUrl);

        conn.onopen = function() {

            //send the host's information  to the server
            var params = {
                'roomId':roomId, //make random roomID string
                'userName': 'host',
                'action': 'connect'
            };
            console.log(params);
            conn.send(JSON.stringify(params));
        };
    
        conn.onmessage = function(messageReceived) {
            //print the packet to the console
            console.log(messageReceived);

            //parse the data so the host can read it
            var data = JSON.parse(messageReceived.data);

            //read the packet types and act accordingly
            if (data.hasOwnProperty('type')) {

                var members = new Array();

                switch(data.type) {

                    //display the user on the 'getCode' screen
                    case 'user-joined-room':

                        //get user name
                        username = data.from.name;
                        var userColor = color(random(255),random(255),random(255));

                        //add the username to the roomMembers array
                        roomMembers.push(username);

                        //add to the user list at the bottom of the screen
                        $('<p class="username-list-item">'+username+'</p>').appendTo('#user-list');

                        //create new cursor on the screen at random location
                        roomMembers[username] = new Cursor(
                            random(sketchWidth), //random x loc
                            random(sketchHeight), //random y loc
                            10, 10, //width, height
                            userColor //random color
                        );
                        
                        //add user to the screen
                        roomMembers[username].display();

                        break;

                    case 'user-act':

                        username = data.from.name;

                        console.log(username + ": action!");
                        
                        //create a new line, increment the lineNo
                        roomMembers[username].paint(lineNo);
                        lineNo++;

                        //display lines
                        for (var i = 0; i < paintings.length; i++) {
                            paintings[i].display();
                        }

                        console.log(roomMembers[username]);
                        break;

                    case 'user-move':
                        username = data.from.name;
                        
                        //map Y Axis controller values
                        if (data.velX > 20) {
                            newVelX = 1;
                            isMovingX = true;
                        } else
                        if (data.velX < -20) {
                            newVelX = -1;
                            isMovingX = true;
                        } else
                        if (data.velX <= 20 || data.velX >= -20) {
                            newVelX = 0;
                            isMovingX = false;
                        }

                        //map Y Axis controller values
                        if (data.velY > 20) {
                            newVelY = 1;
                            isMovingY = true;
                        } else
                        if (data.velY < -20) {
                            newVelY = -1;
                            isMovingY = true;
                        } else 
                        if (data.velY >= -20 || data.velY <= 20) {
                            newVelY = 0;
                            isMovingY = false;
                        }
                        
                        //save old location value for drawing
                        roomMembers[username].pCursorX = roomMembers[username].cursorX;
                        roomMembers[username].pCursorY = roomMembers[username].cursorY;

                        break;

                default: 
                    console.log("Invalid Action: ");
                    console.log(data);   
                }
            }   

            /**
             * Game progression
             */
           $('#startGame').on('click', function() {
                $('#host').hide();
           });

        };
    
        conn.onerror = function(e) {
            console.log(e);
        };


        //when the quit link is clicked, close connection and reset gamecode
        $('#return-to-menu').on('click', function() {
            conn.close();
            $('#code').empty();
        });
    
        return false;
    }
}

//display username to divs on each side of the room code
function displayUserJoinedGame(userName, element) {
    $("<li class='userName'>"+userName+"</li>").appendTo(element);
}
