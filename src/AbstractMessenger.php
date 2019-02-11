<?php
    namespace Gamespace;

    use Gamespace\Exception\ConnectedClientNotFoundException;
    use Gamespace\Exception\InvalidActionException;
    use Gamespace\Exception\MissingActionException;
    use Gamespace\Interfaces\ConnectedClientInterface;
    use Ratchet\ConnectionInterface;
    use Ratchet\Http\HttpServer;
    use Ratchet\MessageComponentInterface;
    use Ratchet\Server\IoServer;
    use Ratchet\WebSocket\WsServer;
    use ReflectionClass;

/**
 * Messenger Class
 * 
 * Communicates with the clients and the server
 */
abstract class AbstractMessenger implements MessageComponentInterface {
  
    //Packets are sent to the clients
    const PACKET_TYPE_USER_CONNECTED = 'user-connected';
    const PACKET_TYPE_USER_DISCONNECTED = 'user-disconnected';
    
    //controller packets
    const PACKET_TYPE_USER_MOVE = 'user-move';
    const PACKET_TYPE_USER_ACT = 'user-act';
    const PACKET_TYPE_USER_JOINED_ROOM = 'user-joined-room';

    //actions from clients
    const ACTION_USER_CONNECTED = 'connect';
    const ACTION_USER_MOVE = 'user-move';
    const ACTION_USER_ACT = 'user-act';

    /**
     * @param AbstractMessenger $server
     * @param int $port
     * @param string $ip
     * @return IoServer
     */
    public static function run(AbstractMessenger $server, $port, $ip='0.0.0.0')
    {
        $wsServer = new WsServer($server);
        $http = new HttpServer($wsServer);
        $server = IoServer::factory($http, $port, $ip);
        $server->run();
        return $server;
    }
  
    protected $rooms;
  
    protected $clients;
   
    protected $validActions;
    
    
    abstract protected function makeUserDisconnectedMessage(ConnectedClientInterface $client, $timestamp);

    abstract protected function makeMessageReceivedMessage(ConnectedClientInterface $from, $message, $timestamp);
    
    abstract protected function logMessageReceived(ConnectedClientInterface $from, $message, $timestamp);
    
    abstract protected function createClient(ConnectionInterface $conn, $name);

    //Abstract Construct
    public function __construct()
    {
        $this->rooms = array();
        $this->clients = array();
        $refl = new ReflectionClass(get_class());
        $this->validActions = array();
        foreach ($refl->getConstants() AS $key=>$value) {
            if (substr($key, 0, 6) === 'ACTION') {
                $this->validActions[$key] = $value;
            }
        }
    }
    
    /**
     * Websocket Functions
     * 
     * - onOpen
     * - onMessage
     * - onClose
     * - onError
     */
    public function onOpen(ConnectionInterface $conn)
    {
    }

    public function onMessage(ConnectionInterface $conn, $msg)
    {
        echo "Packet received: ".$msg.PHP_EOL;
        $msg = json_decode($msg, true);

        if (!isset($msg['action'])) {
            throw new MissingActionException('No action specified');
        }
        //make sure the type of packet received exists
        $this->checkActionExists($msg['action']);

        //find the client and the room if they exist
        if ($msg['action'] != self::ACTION_USER_CONNECTED) {
            // var_dump($conn);
            $client = $this->findClient($conn);
            $roomId = $this->findClientRoom($client);
        }

        //determine what type of packet is received
        switch ($msg['action']) {

            //if the action is user-connect
            case self::ACTION_USER_CONNECTED:
                
                //create a new host
                if ($msg['userName'] === 'host') {
                    $roomId = $this->makeRoom($msg['roomId']);
                    $client = $this->createClient($conn, $msg['userName']);
                    echo "host created\n";
                    $this->connectUserToRoom($client, $roomId);
                   
                //create a new client and connect to the host
                } else {
                    $roomId = $this->makeRoom($msg['roomId']);
                    $client = $this->createClient($conn, $msg['userName']);
                    //echo sprintf($client);
                    $this->connectUserToRoom($client, $roomId);
                    $this->sendHostUserJoined($client, $roomId); //PKM Here
                }
                break;

            //send the velocity data to other clients
            case self::ACTION_USER_MOVE:
                $velX = $msg['velX'];
                $velY = $msg['velY'];
                $this->sendUserMoveMessage($client, $roomId, $velX, $velY);
                break;

            //send the action data to other clients
            case self::ACTION_USER_ACT:
                $userAct = $msg['userAct'];
                $this->sendUserActMessage($client,$roomId, $userAct);
                break;

            default: throw new InvalidActionException('Invalid action: '.$msg['action']);
        }
    }
    //close the connection with the server
    public function onClose(ConnectionInterface $conn)
    {
        $this->closeClientConnection($conn);
    }
    //close the connection if an error happens
    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        $this->closeClientConnection($conn);
       
        $conn->close();
    }

    /**
     * Client/Room initiation
     */

    public function getRooms()
    {
        return $this->rooms;
    }

    public function setRooms($rooms)
    {
        $this->rooms = $rooms;
    }

    public function getClients()
    {
        return $this->clients;
    }

    public function setClients($clients)
    {
        $this->clients = $clients;
    }

    /**
     * 
     */

    protected function closeClientConnection(ConnectionInterface $conn)
    {
        $client = $this->findClient($conn);
        unset($this->clients[$client->getResourceId()]);
        foreach ($this->rooms AS $roomId=>$connectedClients) {
            if (isset($connectedClients[$client->getResourceId()])) {
                $clientRoomId = $roomId;
                unset($this->rooms[$roomId][$client->getResourceId()]);
            }
        }
        if (isset($clientRoomId)) {
            $this->sendUserDisconnectedMessage($client, $clientRoomId);
        }
    }

    protected function findClient(ConnectionInterface $conn)
    {
        if (isset($this->clients[$conn->resourceId])) {
            return $this->clients[$conn->resourceId];
        }
        throw new ConnectedClientNotFoundException($conn->resourceId);
    }

    /**
     * Client to Host Messages
     * 
     * - sendHostUserJoined
     * - sendUserActMessage
     * - sendUserMoveMessage
     * 
     */

    protected function sendHostUserJoined(ConnectedClientInterface $client, $roomId) {
            $dataPacket = array(
                'type'=>self::PACKET_TYPE_USER_JOINED_ROOM,
                'from'=>$client->asArray()
                //'timestamp'=>$timestamp
            );

            $clients = $this->findRoomClients($roomId);
            $this->sendDataToClients($clients, $dataPacket);
    }
    

    protected function sendUserActMessage(
        ConnectedClientInterface $client, $roomId, $userAct) {

        $dataPacket = array(
            'type'=>self::PACKET_TYPE_USER_ACT,
            'from'=>$client->asArray(),
            'userAct'=>$userAct,
        );

        $clients = $this->findRoomClients($roomId);
        $this->sendDataToClients($clients, $dataPacket);
    }

    protected function sendUserMoveMessage(
        ConnectedClientInterface $client, $roomId, $velX, $velY) {

            $dataPacket = array(
                'type'=>self::PACKET_TYPE_USER_MOVE,
                'from'=>$client->asArray(),
                'velX'=>$velX,
                'velY'=>$velY
            );
        $clients = $this->findRoomClients($roomId);
        $this->sendDataToClients($clients, $dataPacket);
        
    }


    /**
     * Server Functions
     * 
     */
    protected function sendUserDisconnectedMessage(ConnectedClientInterface $client, $roomId)
    {
        $dataPacket = array(
            'type'=>self::PACKET_TYPE_USER_DISCONNECTED,
            'timestamp'=>time(),
            'message'=>$this->makeUserDisconnectedMessage($client, time()),
        );
        $clients = $this->findRoomClients($roomId);
        
        $this->sendDataToClients($clients, $dataPacket);
    }
    
  
    protected function checkActionExists($action)
    {
        if (!in_array($action, $this->validActions)) {
            throw new InvalidActionException('Invalid action: '.$action);
        }
    }
   
    protected function connectUserToRoom(ConnectedClientInterface $client, $roomId)
    {
        $this->rooms[$roomId][$client->getResourceId()] = $client;
        $this->clients[$client->getResourceId()] = $client;
    }

    protected function findRoomClients($roomId)
    {
        return $this->rooms[$roomId];
    }
 
    protected function findClientRoom(ConnectedClientInterface $client)
    {
        foreach ($this->rooms AS $roomId=>$roomClients) {
            if (isset($roomClients[$client->getResourceId()])) {
                return $roomId;
            }
        }
        throw new ConnectedClientNotFoundException($client->getResourceId());
    }

    protected function sendData(ConnectedClientInterface $client, array $packet)
    {
        $client->getConnection()->send(json_encode($packet));
    }
  
    protected function sendDataToClients(array $clients, array $packet)
    {
        foreach ($clients AS $client) {
            $this->sendData($client, $packet);
        }
    }
    
    protected function makeRoom($roomId)
    {
        if (!isset($this->rooms[$roomId])) {
            $this->rooms[$roomId] = array();
        }
        return $roomId;
    }
}

?>