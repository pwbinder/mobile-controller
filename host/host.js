// Change localhost to the name or ip address of the host running the chat server
var chatUrl = 'ws://greenvilledm.com:8080';

function displayChatMessage(from, message) {
    var node = document.createElement("LI");

    if (from) {
        var nameNode = document.createElement("STRONG");
        var nameTextNode = document.createTextNode(from);
        nameNode.appendChild(nameTextNode);
        node.appendChild(nameNode);
    }

    var messageTextNode = document.createTextNode(message);
    node.appendChild(messageTextNode);

    document.getElementById("messageList").appendChild(node);
}

function displayUserTypingMessage(from) {
    var nodeId = 'userTyping'+from.name.replace(' ','');
    var node = document.getElementById(nodeId);
    if (!node) {
        node = document.createElement("LI");
        node.id = nodeId;

        var messageTextNode = document.createTextNode(from.name + ' is typing...');
        node.appendChild(messageTextNode);

        document.getElementById("messageList").appendChild(node);
    }
}

function removeUserTypingMessage(from) {
    var nodeId = 'userTyping' + from.name.replace(' ', '');
    var node = document.getElementById(nodeId);
    if (node) {
        node.parentNode.removeChild(node);
    }
}

var conn;

function connectToChat() {
    conn = new WebSocket(chatUrl);

    conn.onopen = function() {
        // document.getElementById('connectFormDialog').style.display = 'none';
        // document.getElementById('messageDialog').style.display = 'block';

        var params = {
            'roomId': 'poop', //make random roomID string
            'userName': 'host',
            'action': 'connect'
        };
        console.log(params);
        conn.send(JSON.stringify(params));
    };

    conn.onmessage = function(e) {
        console.log(e);
        var data = JSON.parse(e.data);

        if (data.hasOwnProperty('message') && data.hasOwnProperty('from')) {
            displayChatMessage(data.from.name, data.message);
        }
        else if (data.hasOwnProperty('message')) {
            displayChatMessage(null, data.message);
        }
        else if (data.hasOwnProperty('type')) {
            if (data.type == 'list-users' && data.hasOwnProperty('clients')) {
                displayChatMessage(null, 'There are ' + data.clients.length + ' users connected');
            }
            else if (data.type == 'user-started-typing') {
                displayUserTypingMessage(data.from)
            }
            else if (data.type == 'user-stopped-typing') {
                removeUserTypingMessage(data.from);
            }
        }
    };

    conn.onerror = function(e) {
        console.log(e);
    };

    return false;
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

//console.log(conn['roomId']);