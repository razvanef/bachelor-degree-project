<?php

$app->get('/getUser/:userId', function($userId) {
    $db = new DbHandler();
    $response = array();
    $user = new stdClass();
    $user = $db->getOneRecord("select * from users where id='$userId'");
    if (is_array($user) && count($user) > 0) {
        $response['status'] = "success";
        $response['name'] = $user['name'];
        $response['phone'] = $user['phone'];
        $response['email'] = $user['email'];
        $response['city'] = $user['city'];
        $response['bornDate'] = $user['born_date'];
        $response['sex'] = $user['sex'];
        echoResponse(200, $response);
    }
});

$app->post('/postUser', function() use ($app) {
    $db = new DbHandler();
    $response = array();
    $r = json_decode($app->request->getBody());
    $user = new stdClass();
    $user->id = $r->id;
    if (isset($r->name)) {
        $user->name = $r->name;
    }
    if (isset($r->phone)) {
        $user->phone = $r->phone;
    }
    if (isset($r->email)) {
        $user->email = $r->email;
    }
    if (isset($r->city)) {
        $user->city = $r->city;
    }
    if (isset($r->bornDate)) {
        $user->born_date = $r->bornDate;
    }
    if (isset($r->sex)) {
        $user->sex = $r->sex;
    }
//    if(isset($r->image)) {
//        $user->image = $r->image;
//    };
    $column_names = array_keys((array) $user);
//    $column_names = array('name', 'phone', 'email', 'city', 'born_date', 'sex');
    $tabble_name = "users";
    $pk = "id";
    $result = $db->updateIntoTable($user, $column_names, $tabble_name, $pk);
    if ($result != NULL) {
        $response["status"] = "success";
        $response["message"] = "User updated!";
        $response["id"] = $result;
    } else {
        $response["status"] = "error";
        $response["message"] = "Failed to update user!";
        echoResponse(201, $response);
    }
});
