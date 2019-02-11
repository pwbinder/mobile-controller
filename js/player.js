var userName;
var roomId;

class Player {

    constructor(gameUrl) {
        
    }

    //append each user name to the 'waiting for players' page
    


    /**
     * Websocket functions
     * 
     * - opens connection
     * - begins listening for packets from the messenger
     */
    joinGame() {

        var conn = new WebSocket(gameUrl);

        console.log('kablam!'); 

        conn.onopen = function() {
            userName = document.getElementsByName("userName")[0].value;
            roomId = document.getElementsByName("roomId")[0].value;

            activateController(conn, roomId, userName);

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



