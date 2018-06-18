<?php

$app->get('/getReports/:bandId', function($bandId) {
    $db = new DbHandler();
    $response = array();
    $events = array();
    $moneyYear = array();
    $trafficMonth = $db->getAllRecords("select DATE_FORMAT(day, '%d/%m') as day, SUM(visits) as visits from traffic where band_id='$bandId' AND day BETWEEN NOW() - INTERVAL 30 DAY AND NOW() GROUP BY DAY(day)");
    $trafficYear = $db->getAllRecords("select DATE_FORMAT(day, '%M-%y') as month, SUM(visits) as visits from traffic where band_id='$bandId' GROUP BY MONTH(day)");
    $ids = $db->getAllRecords("select conversation_id from conversations where band_id='$bandId'");
    foreach ($ids as $key => $id) {
        $i = $id['conversation_id'];
        array_push($events,$db->getOneRecord("select conversation_id from bookings where conversation_id='$i'")['conversation_id']);
    }
    $eventsArray = implode(',',$events);
    $moneyYear = $db->getAllRecords("select DATE_FORMAT(event_date, '%M-%y') as month, SUM(price) as sum from bookings where event_date < CURRENT_DATE() AND conversation_id IN ('$eventsArray') group by MONTH(event_date)");
    if (count($trafficMonth) > 0 && count($trafficYear)>0) {
        $response['month'] = $trafficMonth;
        $response['year'] = $trafficYear;
        $response['money'] = $moneyYear;
        echoResponse(200, $response);
    }
});
