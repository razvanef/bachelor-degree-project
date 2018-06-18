<?php

$app->get('/getAllBands/', function() use ($app) {
    $db = new DbHandler();
    $response = array();
    $keyWord = $app->request()->get('key');
    $type = $app->request()->get('bandType');
    $priceMin = $app->request()->get('minPrice');
    $priceMax = $app->request()->get('maxPrice');
    $area = $app->request()->get('area');
    $r = array($type, $priceMax, $priceMin, $area);
    $params = '';
    $id = array();
    if(isset($keyWord)) {
        //echo "select band_id from band_tags where tag_id IN (select tag_id from tags where tag_title LIKE '$keyWord')";
        $ids = $db->getAllRecords("select band_id from band_tags where tag_id IN (select tag_id from tags where tag_title LIKE $keyWord)");
        
        $params = $params . ' id IN (select band_id from band_tags where tag_id IN (select tag_id from tags where tag_title LIKE ' . $keyWord . ')) OR name LIKE ' . $keyWord . ' OR bio LIKE ' . $keyWord . ' OR pageType LIKE ' . $keyWord . ' OR url LIKE ' . $keyWord;
    }
    if(isset($type)) {
        $params = $params . ' pageType="' . $type . '" AND';
    }
    if(isset($priceMax) && isset($priceMin)) {
        $params = $params . ' price BETWEEN ' . $priceMin . ' AND ' . $priceMax . 'AND';
    } else if(isset($priceMin)) {
        $params = $params . ' price>=' . $priceMin . ' AND';
    } else if(isset($priceMax)) {
        $params = $params . ' price<=' . $priceMax . ' AND';
    }
//    if(isset($area)) {
//        $params = $params . '$area=' . $area;
//    }
    if(substr($params, -3) == 'AND') {
        $params = substr($params, 0, -3);
    }
    $query = "select * from bands where " . $params;
    if($params=='') {
        $query = substr($query, 0, -7);
    }
    //echo $query;
    $r = $db->getAllRecords($query);
    foreach ($r as $key=>$value) {
        $bId = $value['id'];
            $tags = $db->getAllRecords("select t.tag_title from tags t, (SELECT tag_id from band_tags where band_id='$bId') as b where t.tag_id=b.tag_id ");
            $r[$key]['tags'] = $tags;
    }
    if(is_array($r) && count($r)>0) {
        $response = $r;
            echoResponse(200, $r);
    } else {
        $response['status'] = 'error';
    }

});

