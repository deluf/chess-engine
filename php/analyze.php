<?php 
require_once "config.php";
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

    <link rel="stylesheet" href="../css/default.css">
    <link rel="stylesheet" href="../css/game.css">
    <link rel="stylesheet" href="../css/analyze.css">

    <link rel="stylesheet" media="only screen and (max-width: 999px), only screen and (max-height: 724px)" href="../css/mobile.css">
    <link rel="stylesheet" media="only screen and (min-width: 1000px) and (min-height: 725px)" href="../css/desktop.css">

    <link rel="icon" href="../media/logo.webp">
</head>

<body>

    <div class="main container-column">
    
        <div class="logo-container">
            <img class="bubbles" src="../media/bubbles.gif" alt="Bubbles animation">
            <img class="logo" src="../media/logo.webp" alt="Codfish 2000 logo">
            <h3 class="logo-text">CODFISH 2000</h3>
        </div>
    
        <div class="analysis-screen-desktop container-row">
    
            <div class="game container-row">
    
                <div class="chessboard">
    
                    <div class="container-column popup-container">

                        <div class="container-column popup download-opening-book">
                            <span class="download-opening-book-text">Downloading opening book...</span>
                        </div>
    
                    </div>

                    <div class="anti-click-overlay"></div>
    
                    <div class="white-promotion-popup">
                        <div class="promotion-piece wQ"></div>
                        <div class="promotion-piece wN"></div>
                        <div class="promotion-piece wR"></div>
                        <div class="promotion-piece wB"></div>
                    </div>
    
                    <div class="black-promotion-popup">
                        <div class="promotion-piece bB"></div>
                        <div class="promotion-piece bR"></div>
                        <div class="promotion-piece bN"></div>
                        <div class="promotion-piece bQ"></div>
                    </div>
                
                    <svg viewBox="0 0 100 100" class="coordinates">
                        <text x="0.75" y="3.5" class="coordinate-bright">8</text>
                        <text x="0.75" y="15.75" class="coordinate-dark">7</text>
                        <text x="0.75" y="28.25" class="coordinate-bright">6</text>
                        <text x="0.75" y="40.75" class="coordinate-dark">5</text>
                        <text x="0.75" y="53.25" class="coordinate-bright">4</text>
                        <text x="0.75" y="65.75" class="coordinate-dark">3</text>
                        <text x="0.75" y="78.25" class="coordinate-bright">2</text>
                        <text x="0.75" y="90.75" class="coordinate-dark">1</text>
                        <text x="10" y="99" class="coordinate-dark">a</text>
                        <text x="22.5" y="99" class="coordinate-bright">b</text>
                        <text x="35" y="99" class="coordinate-dark">c</text>
                        <text x="47.5" y="99" class="coordinate-bright">d</text>
                        <text x="60" y="99" class="coordinate-dark">e</text>
                        <text x="72.5" y="99" class="coordinate-bright">f</text>
                        <text x="85" y="99" class="coordinate-dark">g</text>
                        <text x="97.5" y="99" class="coordinate-bright">h</text>
                    </svg>
    
                </div>
    
            </div>
    
            <div class="load-analysis-container container-column main">
                
                <div class="database-output-container container-column"></div>
                <button class="analysis-button button close-analyses-button">Close</button>

            </div>

            <div class="analysis-settings-container container-column main">
                
                <div class="container-column fen-container">
                    FEN
                    <textarea class="fen" spellcheck="false" rows="2"></textarea>
                </div>
                
                <div class="container-column">
                    <span class="maximum-depth">Maximum think time: ~15s</span>
                    <input class="slider" type="range" value="10" min="2" max="10" step="1">
                </div>
    
                <span class="container-row">
                    Use opening book
                    <input class="opening-book-checkbox" type="checkbox" checked>
                </span>
    
                <table>
                    <tr>
                        <td>Depth</td>
                        <td class="engine-output depth">-</td>
                    </tr>
                    <tr>
                        <td>Best move</td>
                        <td class="engine-output best-move">-</td>
                    </tr>
                    <tr>
                        <td>Evaluation</td>
                        <td class="engine-output evaluation">-</td>
                    </tr>
                </table>
    
                <div class="container-column">

                    <button class="button start-engine-button">Start engine</button>
                    <button class="button play-best-move-button" disabled>Play best move</button>
                    <button class="button watch-engine-button">Watch engine</button>
                    
                    <?php  
                    if (isset($_SESSION[Config\loggedUsername])) {
                        echo "
                            <br>
                            <button class=\"analysis-button button load-analysis-button\">Load analysis</button>
                            <button class=\"analysis-button button save-analysis-button\">Save analysis</button>
                        ";
                    }
                    ?>
                    
                </div>
    
            </div>
    
        </div>

        <div class="analysis-screen-mobile">
            This feature requires
            <br>a bigger screen 
        </div>
    
        <a class="button navigation-button" href="../index.php">Home page</a>

    </div>

    <script src="../js/_debug.js"></script>

    <script src="../js/remove_annoying_events.js"></script>
    <script src="../js/game.js"></script>
    <script src="../js/move_generation.js"></script>
    <script src="../js/engine.js"></script>
    <script src="../js/gui.js"></script>
    <script src="../js/analyze.js"></script>

</body>
</html>
