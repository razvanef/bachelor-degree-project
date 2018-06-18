<?php

    function format_email($info, $format) {

        //set the root
        $root = $_SERVER['DOCUMENT_ROOT'].'/licenta/email_signup'; //.'/dev/tutorials/email_signup';
        //grab the template content
        $template = file_get_contents($root . '/signup_template.' . $format);

        //replace all the tags
        $template = preg_replace('{NAME}', $info['name'], $template);
        $template = preg_replace('{EMAIL}', $info['email'], $template);
        $template = preg_replace('{ACTIVE}', $info['active'], $template);
        //if($info['type_account'] == 'artist') {
            $template = preg_replace('{SITEPATH}','http://localhost/licenta', $template);
        //}

        //return the html of the template
        return $template;
    }

    function send_email($info) {

        //format each email
        $body = format_email($info, 'html');
        $body_plain_txt = format_email($info, 'txt');

        //setup the mailer
        $transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, 'ssl')->setUsername('razvan.florescu93@gmail.com')->setPassword('fan steaua');
        $mailer = Swift_Mailer::newInstance($transport);
        $message = Swift_Message::newInstance();
        $message->setSubject('Welcome to Site Name');
        $message->setFrom(array('razvan.florescu93@gmail.com' => 'Site Name'));
        $message->setTo(array($info['email'] => $info['name']));

        $message->setBody($body_plain_txt);
        $message->addPart($body, 'text/html');

        $result = $mailer->send($message);

        return $result;
    }
