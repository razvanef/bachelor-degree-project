<?php

$app->get('/session', function() {
    $db = new DbHandler();
    $session = $db->getSession();
    $response["uid"] = $session['uid'];
    $response["email"] = $session['email'];
    $response["name"] = $session['name'];
    echoResponse(200, $session);
});

$app->post('/login', function() use ($app) {
    require_once 'passwordHash.php';
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'password', 'type_account'), $r);
    $response = array();
    $db = new DbHandler();
    $password = $r->password;
    $email = $r->email;
    $type_account = $r->type_account;
    $user = $db->getOneRecord("select * from users where email='$email' and type_account='$type_account'");
    if ($user != NULL) {
        if (passwordHash::check_password($user['password'], $password)) {
            if ($user['active'] == 1) {
                $response['status'] = "success";
                $response['message'] = 'Logged in successfully.';
                $response['name'] = $user['name'];
                $response['id'] = $user['id'];
                $response['email'] = $user['email'];
                $response['type_account'] = $user['type_account'];
                $response['createdAt'] = $user['created_date'];
                $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                $charactersLength = strlen($characters);
                $randomString = '';
                for ($i = 0; $i < 9; $i++) {
                    $randomString .= $characters[rand(0, $charactersLength - 1)];
                }
                $response['access_token'] = $randomString;
                if (!isset($_SESSION)) {
                    session_start();
                }
                $_SESSION['id'] = $user['id'];
                $_SESSION['email'] = $email;
                $_SESSION['name'] = $user['name'];
            } else {
                $response['status'] = "error";
                $response['message'] = 'The account is not verified. Please check your email!';
            }
        } else {
            $response['status'] = "error";
            $response['message'] = 'Login failed. Incorrect credentials';
        }
    } else {
        $response['status'] = "error";
        $response['message'] = 'No such user is registered';
    }
    echoResponse(200, $response);
});
$app->post('/signUp', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $response = array();
    $text = array();
    verifyRequiredParams(array('email', 'name', 'password', 'type_account'), $r);
    require_once 'passwordHash.php';
    $db = new DbHandler();
    $name = $r->name;
    $email = $r->email;
    $type_account = $r->type_account;
    $password = $r->password;

    //create a random key
    $active = $name . $email . date('mY');
    $active = md5($active);

    $r->active = $active;

    $isUserExists = $db->getOneRecord("select 1 from users where email='$email'");
    if (!$isUserExists) {
        $r->password = passwordHash::hash($password);
        $tabble_name = "users";
        $column_names = array('name', 'email', 'password', 'type_account', 'active');
        $result = $db->insertIntoTable($r, $column_names, $tabble_name);
        if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "User account created successfully. Please check your email!";
            $response["id"] = $result;
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['id'] = $response["id"];
            //$_SESSION['phone'] = $phone;
            $_SESSION['name'] = $name;
            $_SESSION['email'] = $email;
            $_SESSION['type_account'] = $type_account;

            ///////////////send confirm email////////////////
            //put info into an array to send to the function
            $info = array(
                'name' => $name,
                'email' => $email,
                'type_account' => $type_account,
                'active' => $active
            );

            //send the email
            if (send_email($info)) {

                //email sent
                $action['result'] = 'success';
                array_push($text, 'Thanks for signing up. Please check your email for confirmation!');
            } else {

                $action['result'] = 'error';
                array_push($text, 'Could not send confirm email');
            }
            $response["text"] = $text;
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to create account. Please try again";
            echoResponse(201, $response);
        }
    } else {
        $response["status"] = "error";
        $response["message"] = "An user with the provided email exists!";
        echoResponse(201, $response);
    }
});
$app->get('/logout', function() {
    $db = new DbHandler();
    $session = $db->destroySession();
    $response["status"] = "info";
    $response["message"] = "Logged out successfully";
    echoResponse(200, $response);
});
?>