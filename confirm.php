<?php

//setup some variables
$action = array();
$action['result'] = null;
$link = mysqli_connect('localhost', 'root', '', 'licenta');

//quick/simple validation
if (empty($_GET['email']) || empty($_GET['key'])) {
    $action['result'] = 'error';
    $action['text'] = 'We are missing variables. Please double check your email.';
}

if ($action['result'] != 'error') {

    //cleanup the variables
    $email = mysqli_real_escape_string($link, $_GET['email']);
    $key = mysqli_real_escape_string($link, $_GET['key']);

    //check if the key is in the database
    $check_key = mysqli_query($link, "SELECT * FROM `users` WHERE `email` = '$email' AND `active` = '$key' LIMIT 1") or die(mysqli_error($link));

    if (mysqli_num_rows($check_key) != 0) {

        //get the confirm info
        $confirm_info = mysqli_fetch_assoc($check_key);

        //confirm the email and update the users database
        $update_users = mysqli_query($link, "UPDATE `users` SET `active` = 1 WHERE `id` = '$confirm_info[id]' LIMIT 1") or die(mysqli_error($link));
        //delete the confirm row
        //$delete = mysql_query("DELETE FROM `confirm` WHERE `id` = '$confirm_info[id]' LIMIT 1") or die(mysql_error());

        if ($update_users) {

            $action['result'] = 'success';
            $action['text'] = 'User has been confirmed. Thank-You!';
            echo '<h1 style="text-align: center; margin-top: 80px;">' . $action['text'] . '</h1>';
            echo '<h2 style="text-align: center;">Redirecting in 5 seconds...<h2>';
            header("Refresh: 5; URL=./#/home");
        } else {

            $action['result'] = 'error';
            $action['text'] = 'The user could not be updated Reason: ' . mysql_error();
            echo '<h1 style="text-align: center; margin-top: 80px;">' . $action['text'] . '</h1>';
            echo '<h2 style="text-align: center;">Redirecting in 5 seconds...<h2>';
            header("Refresh: 5; URL=./#/home");
        }
    } else {

        $action['result'] = 'error';
        $action['text'] = 'The key and email is not in our database.';
        echo '<h1 style="text-align: center; margin-top: 80px;">' . $action['text'] . '</h1>';
        echo '<h2 style="text-align: center;">Redirecting in 5 seconds...<h2>';
        header("Refresh: 5; URL=./#/home");
    }
}