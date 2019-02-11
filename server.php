<?php

    use Ratchet\Server\IoServer;
    //use Ratchet\Http\HttpServer;
    //use Ratchet\WebSocket\WsServer; 
    //use Ratchet\MessageComponentInterface;
    //use Gamespace\Messenger;
    //include('src/AbstractMessenger.php');
    require __DIR__ . '/vendor/autoload.php';

    //var_dump(file_exists("Gamespace\Messenger"));

    $port = 8081;
    $server = new Gamespace\ConcreteMessenger;
    //$server = IoServer::factory (new HttpServer(new WsServer(new Messenger())), $port);
    Gamespace\ConcreteMessenger::run($server, $port);

?>