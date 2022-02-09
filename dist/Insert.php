<?php
require_once "./connect.php";

if (isset($_POST["time"])) {

    $req = $db->prepare("INSERT INTO records (time, date) values (:time, NOW()) ");
    $sucess = $req->execute(["time" => $_POST["time"]]);
    echo json_encode($sucess);

} else {echo "pasOKchépas";
    var_dump($_POST);}
;
