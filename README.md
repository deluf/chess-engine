<div align="center">
  <h1>CODFISH 2000</h1>
  <img src="media/logo.webp">
</div>

## About

This is a project for the class of web design of the professor Alessio Vecchio at the University of Pisa (Italy) and, most likely, won't receive any updates in the future.

---

<p>
  <strong>Codfish 2000</strong> is a javascript chess engine:
</p>

<ul>
  <li>
  The name <em>'Codfish'</em> is inspired by the famous chess engine <a target="_blank" href="https://stockfishchess.org/">stockfish</a>.
  </li>
  <li>
  The <em>'2000'</em> is the approximate rating of the engine at its maximum level (calculated by playing against <a target="_blank" href="https://www.chess.com/play/computer">various engines</a>), which, according to <a target="_blank" href="https://chessgrandmonkey.com/chess-rating-percentile-calculator-graph/">this website</a>, is better than 98% of online players and 90% of <a target="_blank" href="https://www.fide.com/">FIDE</a> over the board players.
  </li>
</ul>

<p>
  For the first few moves, the engine will randomly choose one of the 3 most popular lines played by grandmasters in over the board games. If the user plays an unknown opening move or the opening book ends, then the engine will start playing moves by itself, using a basic <a target="_blank" href="https://simple.wikipedia.org/wiki/Minimax">minimax algorithm</a> with <a target="_blank" href="https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning">alpha-beta pruning</a> optimization.   
</p>

<p>
  Depending on the hardware and on the browser, in about 15 seconds the engine will evaluate approximately 1 to 10 million positions, reaching a depth of about 6 in most opening and middle game scenarios and about 9 in endgame positions.    
</p>
            
<p>
  All the <a target="_blank" href="https://en.wikipedia.org/wiki/Rules_of_chess">rules of chess</a> are imlpemented except for the repetition rule (if the same board appears three times then the game ends in a draw), the <a target="_blank" href="https://en.wikipedia.org/wiki/Algebraic_notation_(chess)">algebraic notation</a> used (the standard method for describing moves) is also simplified and does not consider checks (+) and checkmates (#).
</p>

<p>
  The website offers the possitiblity to use Codfish 2000 to analyze any chess position, specified via the standard <a target="_blank" href="https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation">FEN</a> notation, and also offers the possitiblity to watch the engine play against itself.
</p>

<p>
  Registered users can save the result of each analysis to a database and can also, during a match against the engine, create a bookmark of a particular position to analyze later.
</p>



## Setup

<ol>
  <li>
    First of all you will need any HTTP web server with PHP support and a MySQL server. 
    <br>In particular, the website has been tested on:
    <ul>
      <li>XAMPP 8.0.10 (Apache 2.4.48 - PHP 8.0.10 - MySQL 5.7.28)</li>
      <li>Chrome 94.0.4606.61</li>
      <li>Firefox 92.0.1</li>
    </ul>
  </li>
  <li>
    Build the database using <a href="build_database.sql">build_database.sql</a>
  </li>
  <li>
    Edit the database configuration <a href="php/config.php">php/config.php</a>
  </li>
</ol>



## Gallery

<img src="screenshots/index.png" width="800">
<img src="screenshots/login.png" width="800">
<img src="screenshots/play.png" width="800">
<img src="screenshots/play_white_wins.png" width="800">
<img src="screenshots/load_analysis.png" width="800">
<img src="screenshots/analyze.png" width="800">
