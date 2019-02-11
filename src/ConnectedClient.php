<?php
namespace Gamespace;

use Gamespace\Interfaces\ConnectedClientInterface;
use Ratchet\ConnectionInterface;

class ConnectedClient implements ConnectedClientInterface {

    protected $resourceId;

    protected $connection;

    protected $name;

    public function getResourceId() {
        return $this->resourceId;
    }

    public function setResourceId($resourceId) {
        $this->resourceId = $resourceId;
    }

    public function getConnection() {
        return $this->connection;
    }

    public function setConnection($connection) {
        $this->connection = $connection;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function asArray() {
        return array(
            'name'=>$this->name
        );
    }
}


?>