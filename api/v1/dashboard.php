<?php

$app->get('/getAllPages/:userId', function($userId) {
    $db = new DbHandler();
    $response = array();
    $reason = array();
    $bands = $db->getAllRecords("select * from bands where user_id='$userId'");
    if (is_array($bands) && count($bands) > 0) {
        $response['status'] = 'success';
        $response['bands'] = $bands;
        echoResponse(200, $response);
    } else {
        $reason['status'] = 'error';
        $reason['message'] = 'No page found';
        echoResponse(201, $reason);
    }
});

$app->get('/getConversationsBand/:userId', function($userId) {
    $db = new DbHandler();
    $response = array();
    $reason = array();
    $band = $db->getAllRecords("select * from bands where user_id='$userId'");
    $bandId = $band[0]['id'];
    $conversatons = $db->getAllRecords("select * from conversations where band_id='$bandId'");
    if (is_array($conversatons) && count($conversatons) > 0) {
        foreach ($conversatons as $key => $value) {
            $id = $value['conversation_id'];
            $band_id = $value['band_id'];
//            $band[$key] = $db->getOneRecord("select * from bands where id='$band_id'");
            $bookings[$key] = $db->getOneRecord("select * from bookings where conversation_id = '$id'");

            $lines[$key] = $db->getAllRecords("select * from conversation_lines where conversation_id = '$id'");

//            $conv[$key]["band"] = $band[$key]['name'];
            $conv[$key]["booking"] = $bookings[$key];
            $conv[$key]["lines"] = $lines[$key];
            $conv[$key]["id"] = $id;
        }
        $response['conv'] = $conv;
        echoResponse(200, $response);
    } else {
        $reason['status'] = 'error';
        $reason['message'] = 'no conversation found';
        echoResponse(201, $reason);
    }
});

$app->post('/sendLineBand', function() use ($app) {
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

$app->get('/getOneConversation/:conversationId', function($conversationId) {
    $db = new DbHandler();
    $response = array();
    $reason = array();
    $conversation = $db->getOneRecord("select * from conversations where conversation_id='$conversationId'");
    if (isset($conversation)) {
        $bookings = $db->getOneRecord("select * from bookings where conversation_id = '$conversationId'");

        $lines = $db->getAllRecords("select * from conversation_lines where conversation_id = '$conversationId'");

        $response['status'] = 'success';
        $response['user'] = $bookings['user_name'];
        $response['booking'] = $bookings;
        $response['lines'] = $lines;
        echoResponse(200, $response);
    } else {
        $reason['status'] = 'error';
        $reason['message'] = 'no conversation found';
        echoResponse(201, $reason);
    }
});

$app->get('/getAllEvents/:bandId', function($bandId) {
    $db = new DbHandler();
    $response = array();
    $reason = array();
    $events = array();
    $ids = $db->getAllRecords("select conversation_id from conversations where band_id='$bandId'");
    if (is_array($ids) && count($ids) > 0) {
        foreach ($ids as $key => $id) {
            $i = $id['conversation_id'];
            $events[$key] = $db->getOneRecord("select * from bookings where conversation_id='$i'");
        }
    }
    if (is_array($events) && count($events) > 0) {
        $response = $events;
        echoResponse(200, $response);
    } else {
        $reason['status'] = 'error';
        $reason['message'] = 'no event available';
        echoResponse(201, $reason);
    }
});
//FOR ANDROID
$app->get('/getEvents/:userId', function($userId) {
    $db = new DbHandler();
    $response = array();
    $reason = array();
    $events = array();
    $bandId = $db->getOneRecord("select id from bands where user_id='$userId'")['id'];
    $ids = $db->getAllRecords("select conversation_id from conversations where band_id='$bandId'");
    foreach ($ids as $key => $id) {
        $i = $id['conversation_id'];
        $events[$key] = $db->getOneRecord("select * from bookings where conversation_id='$i'");
    }
    if (is_array($events) && count($events) > 0) {
        $response['events'] = $events;
        echoResponse(200, $response);
    } else {
        $reason['status'] = 'error';
        $reason['message'] = 'no event available';
        echoResponse(201, $reason);
    }
});

$app->get('/getOneEvents/:eventId', function($eventId) {
    $db = new DbHandler();
    $response = array();
    $reason = array();
    $event = array();
//    $events = array();
    $event = $db->getOneRecord("select * from bookings where id='$eventId'");
    $event['going'] = $db->getAllRecords("select COUNT(id) from event_guests where event_id='$eventId'");
    if (isset($event)) {
        $response = $event;
        echoResponse(200, $response);
    } else {
        $reason['status'] = 'error';
        $reason['message'] = 'no event available';
        echoResponse(201, $reason);
    }
});

$app->post('/editEvent', function() use ($app) {
    $event = json_decode($app->request->getBody());
    $response = array();
    $db = new DbHandler();
    $column_names = array('email', 'event_date', 'event_type', 'latitude', 'longitude', 'phone', 'price', 'user_name');
    $table_name = 'bookings';
    $pk = 'id';
    $r = $db->updateIntoTable($event, $column_names, $table_name, $pk);
    if ($r) {
        $response['status'] = 'success';
        echoResponse(200, $response);
    } else {
        $response['status'] = 'error';
        echoResponse(201, $response);
    }
});

$app->get('/acceptBooking/:eventId', function($eventId) {
    $db = new DbHandler();
    $response = array();
    $b = array('status' => 1, 'id' => $eventId);
    $column_names = array('status');
    $r = $db->updateIntoTable($b, $column_names, 'bookings', 'id');
    if ($r) {
        $response['status'] = 'success';
        echoResponse(200, $response);
    } else {
        $response['status'] = 'error';
        echoResponse(200, $response);
    }
});
