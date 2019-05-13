var gameUrl = 'ws://localhost:8081';

var testPlayers = [];
var conn = [];

function testPeteSketch(testState) {
    

    amountOfPlayers = document.getElementById('players').value;

    

    switch(testState) {


        case 'connect' :
            console.log('commence the test!');
            console.log('There will be ' + amountOfPlayers + ' players being tested.');
            //log all the players in
            for(var i = 0; i < amountOfPlayers; i++) {
                conn[i] = new WebSocket(gameUrl);
                testPlayers[i] = new Player();
                testPlayers[i].joinGame('testPlayer[' + i + ']', conn[i]);
                console.log('testPlayer[' + i + '] created.');
            }
            break;


        case 'move' :
            console.log('Testing movement...');
            var testMovement = 50;
            var xModifier = 1;
            var yModifier = 1;

            for(var i = 0; i < amountOfPlayers; i++) {

                for(var j = 0; j < 50; j++) {

                    //after 5-10 loops, change direction
                    if (j % 5 === 0) {
                        xModifier = xModifier*-1;
                    }
                    if (j % 10 === 0) {
                        yModifier = yModifier*-1;
                    }
                    sendVelocityMessage('testPlayer[' + i + ']',testMovement*xModifier,testMovement*yModifier,conn[i]);
                }

                //stop the cursor
                sendVelocityMessage('testPlayer[' + i + ']',0,0,conn[i]);
                
            }
            console.log('Movement Successful');
            testPeteSketch('draw');
            break;


        case 'draw' :
            console.log('Testing drawing...');
            var testMovement = 50;
            var xModifier = 1;
            var yModifier = 1;

            for(var i = 0; i < amountOfPlayers; i++) {

                sendButtonMessage('testPlayer[' + i + ']',"true", conn[i]);
                for(var j = 0; j < 50; j++) {

                    //after 5-10 loops, change direction
                    if (j % 5 === 0) {
                        xModifier = xModifier*-1;
                    }
                    if (j % 10 === 0) {
                        yModifier = yModifier*-1;
                    }
                    sendVelocityMessage('testPlayer[' + i + ']',testMovement*xModifier,testMovement*yModifier,conn[i]);
                }

                //stop the cursor
                sendVelocityMessage('testPlayer[' + i + ']',0,0,conn[i]);
                sendButtonMessage('testPlayer[' + i + ']',"false", conn[i]);
            }
            console.log('Drawing Successful');
            break;

    }
}

$('#test-form-submit').click(function() {
    testPeteSketch('connect');   
});