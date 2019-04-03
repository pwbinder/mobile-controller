var roomId;

//put this here because the move packets are sending before the websocket
//connection has been made
var movable = false;

class Player {

    

    constructor() {
    }

    //append each user name to the 'waiting for players' page
    


    /**
     * Websocket functions
     * 
     * - opens connection
     * - begins listening for packets from the messenger
     */
    joinGame(userName, conn) {

        console.log('kablam!'); 

        conn.onopen = function() {
            //userName = document.getElementsByName("userName")[0].value;
            roomId = document.getElementsByName("roomId")[0].value;

            var params = {
                'roomId': roomId,
                'userName': userName,
                'action': 'connect'
            };


            console.log(conn);
            console.log(params);
            conn.send(JSON.stringify(params));
        };

        conn.onmessage = function(messageReceived) {
            console.log(messageReceived);
            var data = JSON.parse(messageReceived.data);

            //if the last packet of users comes in, switch to move packets
            if (data.type === 'user-joined-room' && 
                data.from.name === 'testPlayer[' + (testPlayers.length - 1) + ']' ) {
                console.log('switching modes...')
                testState = 'move';
                testPeteSketch();
            }
        };
        conn.onclose = function(e) {
            console.log('connection closed');
        }
        conn.onerror = function(e) {
            console.log(e);
        };
    
        return false;
    }
}

function sendButtonMessage(userName, buttonPressed, conn) {

    roomId = document.getElementsByName("roomId")[0].value;

    var params = {
        'roomId': roomId,
        'userName': userName,
        'action': 'user-act',
        'userAct': buttonPressed
    };
    console.log(params);
    conn.send(JSON.stringify(params));
}
function sendVelocityMessage(userName, velX, velY, conn) {

    roomId = document.getElementsByName("roomId")[0].value;

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