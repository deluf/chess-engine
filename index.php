<?php 
require_once "php/config.php";
if(session_status() == PHP_SESSION_NONE) {
    session_start();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Codfish 2000</title>

    <link rel="stylesheet" href="css/default.css">
    
    <link rel="stylesheet" media="only screen and (max-width: 999px), only screen and (max-height: 724px)" href="css/mobile.css">
    <link rel="stylesheet" media="only screen and (min-width: 1000px) and (min-height: 725px)" href="css/desktop.css">

    <link rel="icon" href="media/logo.webp">
</head>

<body>

    <div class="main container-column">

        <div class="logo-container show-always">
            <img class="logo" src="media/logo.webp" alt="Codfish 2000 logo">
            <h3 class="logo-text">CODFISH 2000</h3>
        </div>

        <div class="container-column">
    
            <?php

            if (!isset($_SESSION[Config\loggedUsername])) {
                echo "
                    <span class=\"login-message\">
                        Looks like you are not logged in:
                    </span>
                    <div class=\"login-message\">
                        <a href=\"php/login.php\">
                            Login or register here
                        </a>
                    </div>
                ";
            }

            else {
                echo "
                    <span class=\"login-message\">
                        Welcome back: ".$_SESSION[Config\loggedUsername]."
                    </span>
                    <a class=\"login-message\" href=\"php/logout.php\">
                        Not you? Logout
                    </a>
                ";
            }

            ?>

            <div class="container-row">

                <a href="php/play.php" class="main-button container-column">
                    <span class="main-button-text">
                        Play against<br>the CPU
                    </span>
                    <img class="main-button-icon" src="../media/play.svg" alt="CPU icon">
                </a>
        
                <a href="php/analyze.php" class="main-button container-column">
                    <span class="main-button-text">
                        Analyze<br>position
                    </span>
                    <img class="main-button-icon" src="../media/analyze.svg" alt="Search lens icon">
                </a>

            </div>

        </div>
    
        <a class="button navigation-button" href="documentation.html">Documentation</a>
    
    </div>

    <script src="js/remove_annoying_events.js"></script>

</body>
</html>
