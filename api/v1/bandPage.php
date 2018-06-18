<?php

$app->post('/createPage', function() use ($app) {

    //echo var_dump($_FILES);
    $r = json_decode($app->request->getBody());
    $response = array();
    $db = new DbHandler();
    //verifyRequiredParams(array('name', 'url', 'pageType'), $r);
    //echo print_r($_POST);
    $time = time();
    $band = new stdClass();
    $band->tags = array();
    $band->members = array();
    $band->name = $_POST['name'];
    $band->tags = explode(",", $_POST['tags']);
    $band->user_id = $_POST['userId'];
    $band->url = $_POST['url'];
    $band->members = $_POST['members'];
//    $band->members = unserialize(base64_decode($b));
    //$band->members = repairSerializedArray($b);
    $target_dir = "images/" . $band->url . "/";
    if (!is_dir($target_dir)) {
//        echo $target_dir;
        mkdir($target_dir, 0777, true);
    }
    if (isset($_FILES["cover"])) {
        $target_file_cover = $target_dir . 'cover_' . $time . '_' . basename($_FILES["cover"]["name"]);
    } else if (isset($_POST['cover'])) {
        $target_file_cover = $target_dir . 'cover_' . $time . '_' . basename($_FILES["cover"]["name"]);
    }
    if (isset($_FILES["logo"])) {
        $target_file_logo = $target_dir . 'logo_' . $time . '_' . basename($_FILES["logo"]["name"]);
    } else if (isset($_POST['logo'])) {
        $target_file_cover = $target_dir . 'logo_' . $time . '_' . basename($_FILES["logo"]["name"]);
    }

    if (isset($_POST['bio'])) {
        $band->bio = $_POST['bio'];
    }
    $band->pageType = $_POST['pageType'];
    if (isset($_POST['price'])) {
        $band->price = $_POST['price'];
    }


    if (isset($_FILES["cover"])) {
        $band->cover = "api/v1/images/" . $band->url . '/cover_' . $time . '_' . basename($_FILES["cover"]["name"]);
        if (move_uploaded_file($_FILES["cover"]["tmp_name"], $target_file_cover)) {
            echo "The file  has been uploaded.";
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    } else {
        //$band->cover = 'cover_' . $time . '_' . $r->cover->fileName;
    }


    if (isset($_FILES["logo"])) {
        $band->logo = "api/v1/images/" . $band->url . '/logo_' . $time . '_' . basename($_FILES["logo"]["name"]);
        if (move_uploaded_file($_FILES["logo"]["tmp_name"], $target_file_logo)) {
            echo "The file  has been uploaded.";
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    } else {
        // $band->logo = 'logo_' . $time . '_' . $r->logo->fileName;
    }


    if (is_array($band->tags) && count($band->tags) > 0) {
        $tag_id = array();
        foreach ($band->tags as $tag) {
            $isTagExists = $db->getOneRecord("Select tag_id from tags where tag_title=LOWER('$tag')");
            if (!$isTagExists) {
                $t = new stdClass();
                $t->tag_title = strtolower($tag);
                $ok = $db->insertIntoTable($t, array('tag_title'), "tags");
            }
            $ok = $db->getOneRecord("select tag_id from tags where tag_title=LOWER('$tag')");
            array_push($tag_id, $ok);
        }
    }

    $isBandExists = $db->getOneRecord("select 1 from bands where url='$band->url'");

    if (!$isBandExists) {
        $tabble_name = "bands";
        $column_names = array('name', 'bio', 'pageType', 'price', 'url', 'cover', 'logo', 'user_id');
        $result = $db->insertIntoTable($band, $column_names, $tabble_name);
        $band_id = implode("", $db->getOneRecord("select id from bands where url='$band->url'"));
        if (is_array($tag_id) && count($tag_id) > 0) {
            $tagObj = new stdClass();
            $tagObj->band_id = implode("", $db->getOneRecord("select id from bands where url='$band->url'"));
            foreach ($tag_id as $id) {
                $tagObj->tag_id = implode($id);
                $ok = $db->insertIntoTable($tagObj, array('band_id', 'tag_id'), 'band_tags');
            }
        }
//        echo 'xxxxxxxxxxxx' . var_dump($band->members);
        if (is_array($band->members) && count($band->members) > 0) {
            foreach ($band->members as $member) {
                //$me = explode(",",$member);
                $m = new stdClass();
                $m = explode(",", $member);
//            echo 'ssssddddddddddddddddddddd' . print_r(get_object_vars($m[0]->name));
                $m->band_id = $band_id;
//            echo var_dump($member);
                $ok = $db->insertIntoTable($member, array('name', 'band_id', 'role'), 'band_members');
            }
        }

        if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "Page was created!";
            $response["id"] = $result;
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to create page. Please try again!";
            echoResponse(201, $response);
        }
    } else {
        $response["status"] = "error";
        $response["message"] = "The band nickname already exists!";
        echoResponse(201, $response);
    }
});


$app->get('/getPage/:bandUrl', function($bandUrl) {
    $db = new DbHandler();
    $response = array();
    $band = new stdClass();
    $band = $db->getOneRecord("select * from bands where url='$bandUrl'");
    $bandId = $band['id'];
    $gallery = array();
    $gallery = $db->getAllRecords("select * from gallery where band_id='$bandId'");
    $videos = array();
    $videos = $db->getAllRecords("select * from videos where band_id='$bandId'");
    $tags = array();
    $tags = $db->getAllRecords("select t.tag_title from tags t, (SELECT tag_id from band_tags where band_id='$bandId') as b where t.tag_id=b.tag_id ");
    $members = array();
    $members = $db->getAllRecords("select * from band_members where band_id='$bandId' ");
    $b = $band['visits'] + 1;
    $r = $db->updateIntoTable(array('visits' => $b, 'id' => $bandId), array('visits'), 'bands', 'id');
    if (is_array($band) && count($band) > 0) {
        $response['name'] = $band['name'];
        $response['url'] = $band['url'];
        $response['bio'] = $band['bio'];
        $response['id'] = $band['id'];
        $response['pageType'] = $band['pageType'];
        $response['price'] = $band['price'];
        $response['cover'] = $band['cover'];
        $response['logo'] = $band['logo'];
        $response['rating'] = $band['rating'];
        $response['tags'] = array();
        $response['tags'] = $tags;
        $response['gallery'] = array();
        $response['gallery'] = $gallery;
        $response['tags'] = $tags;
        $response['videos'] = array();
        $response['videos'] = $videos;
        $response['members'] = array();
        $response['members'] = $members;

        echoResponse(200, $response);
    }
});


$app->post('/addToGallery', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $bandId = $r->id;
    $ok = 1;
    $response = array();
    $db = new DbHandler();
    $column_names = array('band_id', 'url', 'name');
    $tabble_name = "gallery";
    foreach ($r->photos as $photo) {
        $src = 'api/v1/uploads/' . $photo;
        $gallery = array('band_id' => $bandId, 'url' => $src, 'name' => $photo);
        if (!$db->insertIntoTable($gallery, $column_names, $tabble_name)) {
            $ok = 0;
        }
    }
    if ($ok) {
        $response['status'] = 'success';
    } else {
        $response['status'] = 'error';
    }
    echoResponse(200, $response);
});

$app->post('/removeFromGallery', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $bandId = $r->id;
    $name = $r->name;
    $response = array();
    $db = new DbHandler();
    $rez = $db->deleteOneRecord("delete from gallery where band_id='$bandId' and name='$name' LIMIT 1");
    if ($rez) {
        $response['status'] = 'success';
    } else {
        $response['status'] = 'error';
    }
    echoResponse(200, $response);
});

$app->post('/addVideo', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $response = array();
    $db = new DbHandler();
    $column_names = array('band_id', 'url');
    $tabble_name = "videos";
    $video = new stdClass();
    $video->url = $r->url;
    $video->band_id = $r->id;
    $response = $db->insertIntoTable($video, $column_names, $tabble_name);

    echoResponse(200, $response);
});

$app->post('/editPage', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $db = new DbHandler();
    $response = array();
    $column_names = array('name', 'pageType', 'price');
    $table_name = 'bands';
    $pk = 'id';
    $rez = $db->updateIntoTable($r, $column_names, $table_name, $pk);
//        $rez = $db->deleteOneRecord("delete from gallery where band_id='$bandId' and name='$name' LIMIT 1");
    foreach ($r->members as $m) {
        $column_names = array('band_id', 'name', 'role');
        $tabble_name = "band_members";
        $member = new stdClass();
        $member->name = $m->name;
        $member->role = $m->role;
        $member->band_id = $r->id;
        $rez = $db->insertIntoTable($member, $column_names, $tabble_name);
    }
    if ($rez) {
        $response['status'] = 'success';
        echoResponse(200, $response);
    } else {
        $response['status'] = 'error';
        echoResponse(201, $response);
    }
});
