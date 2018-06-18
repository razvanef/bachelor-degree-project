<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "licenta";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, visits FROM bands";
$bands = $conn->query($sql);
if ($bands->num_rows > 0) {
    $sql = "INSERT INTO traffic (band_id, visits) VALUES ";
    while ($row = $bands->fetch_assoc()) {
        $sql .= '(' . $row['id'] . ', ' . $row['visits'] . ')';
        $conn->query($sql);
        $sql = "INSERT INTO traffic (band_id, visits) VALUES ";
    }
}
if ($conn->query($sql) === TRUE) {
    $sql = "UPDATE bands SET visits=0";
    $conn->query($sql);
}

$conn->close();
