<?php

require_once "./connect.php";?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Memory Card Game</title>

  <link rel="stylesheet" href="./style.css">

</head>

<body>

  <section class="section" id="showcase">
    <div class="wrapper">
      <div class="m-grid"></div>
      <div class="m-logo">
        <div class="m-logo__wrap">
          <h1>Memory Card<br />Game</h1>
          <div class="subtitle">Lucas Lenoir</div>
          <div class="btn" id="btnEnter">Enter</div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="showcase1">
    <div class="m-logo-setup">
      <h1>Memory Card game</h1>
    </div>
    <div class="m-grid-fixed"></div>



    </div>
    <div class="btn activeContainer" id="start">New game</div>

  </section>

  <section class="section" id="showcase2">
    <div class="m-grid-fixed"></div>
    <div class="gameInfo activeContainer">
      <!-- <h3 class="btn" id="time">00 : 00<span id="time"></span></h3> -->
      <h3 class="btn" id="scores">0/18<span id="score"></span></h3>
    </div>
    <div id="grid">
    </div>
  </section>


  <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js'></script>
  <script src="./script.js"></script>

</body>

</html>
