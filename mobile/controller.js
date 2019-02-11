/**
 * God willing, this is going to be functionality of
 *     the controller for our game
 * 
 *  - will implement touch screen functionality to control the 'host'
 * 
 *  - client will use touch screen controls to move player and
 *      activate function
 *  - controller.js will store the information in packets (JSON files)
 *      and send it to the server
 * 
 *  - in the open socket connection, the client and the server
 *      will be trading packets back and forth in real time
 */

//url and port of our server
var gameUrl = 'ws://greenvilledm.com:8080'; 
//connection variable, allows us to distinguish this user
var conn;

function connectToGame() {
    conn = new WebSocket(gameUrl);

    //as the conn is created, sent a packet to the server for ID
    conn.onopen = function() {

        //builds a packet for us to send to the server
        var params = {
            'roomId': document.getElementsByName("room.name")[0].value,
            'userName': document.getElementsByName("user.name")[0].value,
            'action': 'connect'
        };
        console.log(params);
        //converts into a json file and sends
        conn.send(JSON.stringify(params));
    }

    //as the client receives a message (dataPacket) do this stuff
    conn.onmessage = function(e) {
        console.log(e); //tell the console what the package is

        var data = JSON.parse(e.data); //translate the JSON file

        //identifies the type of packet being received
        //determines what to do with that information
        if (data.hasOwnProperty('user-move')) {
            //move user using these parameters
        } else if (data.hasOwnProperty('user-act')) {
            //activate user action
        }
    }
}

function sendMoveMessage() {
    var d = new Date();

    //packs up move info 
    var params = {
        'velX': document.getElementsByName('')[0].value,
        'velY': document.getElementsByName('')[0].value,
        'action': 'user-move',
        'timestamp': d.getTime()/1000
    };

    //send it to the server
    conn.send(JSON.stringify(params));

    //game container will go here I think?
    document.getElementsByName('message')[0].value = '';
    return false; //not sure why this happens yet
}

function sendActionMessage() {
    var d = new Date();

    //packs up move info 
    var params = {
        'user-act': document.getElementsByName('')[0].value,
        'action': 'user-act',
        'timestamp': d.getTime()/1000
    };

    //send it to the server
    conn.send(JSON.stringify(params));

    //game container will go here I think?
    document.getElementsByName('message')[0].value = '';
    return false; //not sure why this happens yet
}

