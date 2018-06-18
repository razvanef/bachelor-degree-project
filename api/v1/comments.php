<?php

$app->post('/postComment', function() use ($app) {
    $r = json_decode($app->request->getBody());
//    if ($_SESSION['id'] === $r->userId) {
    $response = array();
    $db = new DbHandler();
    $comment = new stdClass();
    $comment->user_id = $r->userId;
    $comment->comment = $r->content;
    $comment->band_id = $db->getOneRecord("select id from bands where url='$r->bandUrl'")['id'];
    $comment->rating = $r->rating;
    echo var_dump($comment);
    $column_names = array('user_id', 'rating', 'comment', 'band_id');
    $tabble_name = "comments";
    $result = $db->insertIntoTable($comment, $column_names, $tabble_name);
    if ($result != NULL) {
        $response["status"] = "success";
        $response["message"] = "Comment posted!";
        $response["id"] = $result;
        $response["date"] = $db->getOneRecord("select date from comments where id='$result'");
        echoResponse(200, $response);
    } else {
        $response["status"] = "error";
        $response["message"] = "Failed to pist comment!";
        echoResponse(201, $response);
    }
//    }
});

$app->get('/getComments/:bandUrl', function($bandUrl) {
    $db = new DbHandler();
    $response = array();
    $bandId = array();
    $comments = new stdClass();
    $bandId = $db->getOneRecord("select id from bands where url='$bandUrl'");
    $response = $db->getAllRecords("select * from comments where band_id='$bandId[id]'");
    if (is_array($response) && count($response) > 0) {
        foreach ($response as $key => $value) {
            $valueid = $value["user_id"];
            $user = (array) $db->getOneRecord("select name, email, image from users where id='$valueid'");
//            echo var_dump($response[$key]);
            $response[$key]['author'] = $user;
//            echo var_dump($response[$key]);
        }
//        $response['status'] = "success";
//        $response['comments'] = $comments;
//
        echoResponse(200, $response);
    }
});

