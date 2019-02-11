var velX = 0;
var velY = 0;

var ready = false;

var roomMembers = [];

class Host {
    
    constructor(gameUrl) {
        
    }

    /**
     * 
     * Opens up the connection with the server
     * Listens for incoming messages from the server
     * 
     */
    hostGame(roomId) {
        var conn = new WebSocket(gameUrl);
        //var roomMembers = 0;
        //var roomMembers = []; //experimental
		var newPlayer = document.getElementById("newPlayer");
		var mainTheme = document.getElementById("mainTheme");
		var gameTheme = document.getElementById("gameTheme");

        conn.onopen = function() {

            //send the host's information  to the server
            var params = {
                //temporarily changed from roomId
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
                        var userName = data.from.name;
                        console.log(roomMembers.length);
                        //add the username to the roomMembers array
                        roomMembers.push(userName);
                        console.log(roomMembers);

						newPlayer.play();
                        newPlayer.append();

                        //the first three members are appended to the left
                        if (roomMembers.length <= 3) {
                            console.log("New Player: " +userName);
                            displayUserJoinedGame(userName, "#playerListLeft");
                            //roomMembers++;

                        //the last three are appended to the right
                        } else if (roomMembers.length <= 6) {
                            console.log("New Player: " +userName);
                            displayUserJoinedGame(userName, "#playerListRight");
                            //roomMembers++;
                        }
                        break;

                    case 'user-act':
                        console.log(data.from.name + ": action!");
                        /**
                         * Sprite function goes here
                         */
                        for (var i = 0; i < players.length; i++) {
                            if (players[i].name == data.from.name) {
                                console.log(players[i].name + " is moving.");
                                //move(players[i], newVelX, newVelY);
                                speak(players[i]);
                            }
                        }
                        break;

                    case 'user-move':
                        var newVelX;
                        var newVelY;

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
                mainTheme.pause();
                //document.body.appendChild(dinnerTime.view);
                $('#host').hide();
                //the video should go here
				 $('.video').show();
				mainTheme.pause();

				 var introVideo = document.getElementById("introVideo");
				 introVideo.play();
                
				introVideo.onended = function(){
                		startGame();
					gameTheme.play();
                     gameTheme.append();

				}

                // $('#game').show();
                // $('#game').append(dinnerTime.view);
                //dinnerTime.ticker.add(delta => gameLoop(delta));
                //setupDinnerTime();
                //ready = true;
                // if (ready) {
                //     start();
                //     count = 30;
                // }
           });

        };
    
        conn.onerror = function(e) {
            console.log(e);
        };
    
        return false;
    }

    

    initGame() {
        //this is probably where we will start the game?
        //we'll cross this bridge when we get there
    }

    //use this later
   
}

//display username to divs on each side of the room code
function displayUserJoinedGame(userName, element) {
    $("<li class='userName'>"+userName+"</li>").appendTo(element);
}
