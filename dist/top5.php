<?php
require_once "connect.php";

$req = $db->query("SELECT `time` FROM `records` ORDER BY `time`  ASC LIMIT 5");

echo json_encode($req->fetchAll(PDO::FETCH_ASSOC));
