<?php

$app->post('/sendRequest', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $response = array();
    $booking = new stdClass();
    $db = new DbHandler();
    $band_id = $db->getOneRecord("select id from bands where url='$r->bandUrl'")['id'];
    $idConversation = $db->getOneRecord("select conversation_id from conversations where user_id='$r->userId' and band_id='$band_id'");
    if (!$idConversation) {
        $conversation = new stdClass();
        $conversation->user_id = $r->userId;
        $conversation->band_id = $band_id;
        $column_names = array('user_id', 'band_id');
        $tabble_name = "conversations";
        $conv1 = $db->insertIntoTable($conversation, $column_names, $tabble_name);
        $idConversation = $db->getOneRecord("select conversation_id from conversations where user_id='$conversation->user_id' and band_id='$conversation->band_id'")['conversation_id'];
    }
    $booking->conversation_id = $idConversation;
    $booking->user_name = $r->name;
    $booking->email = $r->email;
    $booking->phone = $r->phone;
    $booking->event_date = $r->eventDate;
    $booking->event_type = $r->eventType;
    $booking->latitude = $r->location->latitude;
    $booking->longitude = $r->location->longitude;
    $column_names = array('conversation_id', 'user_name', 'email', 'phone', 'event_date', 'event_type', 'latitude', 'longitude');
    $tabble_name = "bookings";
    $conv2 = $db->insertIntoTable($booking, $column_names, $tabble_name);
    if ($conv1 && $conv2) {
        $response['status'] = 'success';
        $response['message'] = 'Request sended';
        echoResponse(200, $response);
    } else {
        $reason = array();
        $reason['status'] = 'error';
        $reason['message'] = 'Request failed! Try again!';
        echoResponse(201, $reason);
    }
});

$app->get('/getConversations/:userId', function($userId) {
    $db = new DbHandler();
    $response = array();
    $conversatons = $db->getAllRecords("select * from conversations where user_id='$userId'");
    if (is_array($conversatons) && count($conversatons) > 0) {
        foreach ($conversatons as $key => $value) {
            $id = $value['conversation_id'];
            $band_id = $value['band_id'];
            $band[$key] = $db->getOneRecord("select * from bands where id='$band_id'");
            $bookings[$key] = $db->getOneRecord("select * from bookings where conversation_id = '$id'");

            $lines[$key] = $db->getAllRecords("select * from conversation_lines where conversation_id = '$id'");

            $conv[$key]["band"] = $band[$key]['name'];
            $conv[$key]["booking"] = $bookings[$key];
            $conv[$key]["lines"] = $lines[$key];
        }
        //print_r(var_dump($bookings));
        $response['conv'] = $conv;
        echoResponse(200, $response);
    }
});

$app->post('/sendLine', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $response = array();
    $db = new DbHandler();
    $column_names = array('conversation_id', 'sender', 'text');
    $tabble_name = 'conversation_lines';
    if ($db->insertIntoTable($r, $column_names, $tabble_name)) {
        $response['status'] = 'success';
        $response['message'] = 'Line sended';
        echoResponse(200, $response);
    } else {
        $reason = array();
        $reason['status'] = 'error';
        $reason['message'] = 'Error sending line! Try again!';
        echoResponse(201, $reason);
    }
});

$app->post('/goToEvent', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $response = array();
    $db = new DbHandler();
    $column_names = array('event_id', 'user_id', 'user_name');
    $tabble_name = 'event_guests';
    if ($r->isGoing) {
        $rez = $db->insertIntoTable($r, $column_names, $tabble_name);
    } else {
        $eventId = $r->event_id;
        $userId = $r->user_id;
        $rez = $db->deleteOneRecord("delete from event_guests where event_id='$eventId' and user_id='$userId' LIMIT 1");
    }
    if ($rez) {
        $response['status'] = 'success';
        $response['message'] = 'Guest added';
        echoResponse(200, $response);
    } else {
        $reason = array();
        $reason['status'] = 'error';
        $reason['message'] = 'Error adding guest! Try again!';
        echoResponse(201, $reason);
    }
});

$app->post('/userGoing', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $db = new DbHandler();
    $eventId = $r->event_id;
    $userId = $r->user_id;
    $response = $db->getOneRecord("select * from event_guests where event_id='$eventId' and user_id='$userId'");
    echoResponse(200, $response);
});
