var gameUrl = 'ws://localhost:8081';

var testPlayers = [];

function testPeteSketch() {
    console.log('commence the test!');

    amountOfPlayers = document.getElementById('players').value;

    console.log('There will be ' + amountOfPlayers + ' players being tested.');

    for(var i = 0; i < amountOfPlayers; i++) {
        testPlayers[i] = new Player(gameUrl);
        testPlayers[i].joinGame(gameUrl);
        console.log('testPlayer[' + i + '] created.');
    }
}

$('#test-form-submit').click(function() {
    testPeteSketch();   
});