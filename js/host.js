var velX = 0;
var velY = 0;
var ready = false;
var roomMembers = [];

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
                switch(data.type) {

                    //display the user on the 'getCode' screen
                    case 'user-joined-room':

                        //get user name
                        var username = data.from.name;
                        console.log(roomMembers.length);

                        //add the username to the roomMembers array
                        roomMembers.push(username);
                        console.log(roomMembers);

                        $('<p class="username-list-item">'+username+'</p>').appendTo('#user-list');

                        username = new Cursor(
                            random(sketchWidth), //random x loc
                            random(sketchHeight), //random y loc
                            10, 10, //width, height
                            color(random(255),random(255),random(255)) //random color
                        );
                        username.display();

                        

                        break;

                    case 'user-act':

                        var username = data.from.name;

                        console.log(username + ": action!");
                        /**
                         * Sprite function goes here
                         */
                        
                        console.log(username.cursorX, username.cursorY);
                        //username.paint();

                        // for (var i = 0; i < players.length; i++) {
                        //     if (players[i].name == data.from.name) {
                        //         console.log(players[i].name + " is moving.");
                        //         //move(players[i], newVelX, newVelY);
                        //         speak(players[i]);
                        //     }
                        // }
                        break;

                    case 'user-move':
                        var newVelX;
                        var newVelY;
                        var username = data.from.name;

                        if (data.velX > 20) {
                            newVelX = 1;
                        } else
                        if (data.velX < -20) {
                            newVelX = -1;
                        } else
                        if (data.velX <= 20 || data.velX >= -20) {
                            newVelX = 0;
                        }

                        if (data.velY > 20) {
                            newVelY = 1;
                        } else
                        if (data.velY < -20) {
                            newVelY = -1;
                        } else 
                        if (data.velY >= -20 || data.velY <= 20) {
                            newVelY = 0;
                        }
                        
                        //save old location value for drawing
                        username.cursorX = username.pCursorX;
                        username.cursorY = username.pCursorY;
                        
                        username.move(newVelX, newVelY);


                        for (var i = 0; i < players.length; i++) {
                            if (players[i].name == data.from.name) {
                                console.log(players[i].name + " is moving.");
                                move(players[i], newVelX, newVelY);
                            }
                        }
     

                        break;

                default: 
                    console.log("Invalid Action: ");
                    console.log(data);   
                }
            }   

            /**
             * Game progression
             */

            //room members start at zero, stop adding at 6
            //if room members reach 6, start the game
            if (roomMembers.length === 6) {
                $('#folderImages').hide();
                $('#startGame').show();
            }
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
