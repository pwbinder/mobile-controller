var gameUrl = 'ws://localhost:8081';

var testPlayers = [];
var conn = [];

var testState = 'connect';

function testPeteSketch() {
    

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
            console.log(amountOfPlayers);

            var xModifier = 1;
            var yModifier = 1;

            for(var i = 0; i < amountOfPlayers; i++) {

                for(var j = 0; j < 50; j++) {

                    if (j % 5 === 0) {
                        xModifier = xModifier*-1;
                    }
                    if (j % 10 === 0) {
                        yModifier = yModifier*-1;
                    }

                    // sendVelocityMessage('testPlayer[' + i + ']',testMovement,0,conn[i]);
                    sendVelocityMessage('testPlayer[' + i + ']',testMovement*xModifier,testMovement*yModifier,conn[i]);
                    // sendVelocityMessage('testPlayer[' + i + ']',0,testMovement,conn[i]);
                    // sendVelocityMessage('testPlayer[' + i + ']',-testMovement,testMovement,conn[i]);
                    // sendVelocityMessage('testPlayer[' + i + ']',-testMovement,0,conn[i]);
                    // sendVelocityMessage('testPlayer[' + i + ']',-testMovement,-testMovement,conn[i]);
                    // sendVelocityMessage('testPlayer[' + i + ']',0,-testMovement,conn[i]);
                }
                sendVelocityMessage('testPlayer[' + i + ']',0,0,conn[i]);
                
            }
            console.log('Movement Successful');
            break;


        case 'draw' :
            console.log('Testing drawing...');
            //test drawing with movement
            for(var i = 0; i < amountOfPlayers; i++) {

            }
            console.log('Drawing Successful');
            break;

    }
}

$('#test-form-submit').click(function() {
    testPeteSketch();   
});