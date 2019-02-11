<?php
namespace Gamespace;

use Gamespace\Interfaces\ConnectedClientInterface;
use Ratchet\ConnectionInterface;

class ConcreteMessenger extends AbstractMessenger
{
    protected function makeUserWelcomeMessage(ConnectedClientInterface $client, $timestamp)
    {
        return vsprintf('Welcome %s!', array($client->getName()));
    }
    protected function makeUserConnectedMessage(ConnectedClientInterface $client, $timestamp)
    {
        return vsprintf('%s has connected', array($client->getName()));
    }
    protected function makeUserDisconnectedMessage(ConnectedClientInterface $client, $timestamp)
    {
        return vsprintf('%s has left', array($client->getName()));
    }
    protected function makeMessageReceivedMessage(ConnectedClientInterface $from, $message, $timestamp)
    {
        return $message;
    }
    protected function logMessageReceived(ConnectedClientInterface $from, $message, $timestamp)
    {
        /** save messages to a database, etc... */
    }
    protected function createClient(ConnectionInterface $conn, $name)
    {
        $client = new ConnectedClient;
        echo "New client joined: " . $name."\n";
        $client->setResourceId($conn->resourceId);
        $client->setConnection($conn);
        $client->setName($name);
        return $client;
    }
}