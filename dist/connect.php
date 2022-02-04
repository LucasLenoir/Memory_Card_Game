<?php

try {
    $db = new PDO(
        'mysql:host=localhost;dbname=card_game;charset=utf8', 'root'
    );
} catch (Exception $e) {
    echo 'erreur: ' . $e->getMessage();
}
