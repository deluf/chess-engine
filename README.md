# CODFISH 2000

## About

This is an project for the class of web design of the professor Alessio Vecchio at the University of Pisa, Italy.

---

**Codfish 2000** is a javascript chess engine:

*   The name _'Codfish'_ is inspired by the famous chess engine [stockfish](https://stockfishchess.org/).
*   The _'2000'_ is the approximate rating of the engine at its maximum level (calculated by playing against [various engines](https://www.chess.com/play/computer)), which, according to [this website](https://chessgrandmonkey.com/chess-rating-percentile-calculator-graph/), is better than 98% of online players and 90% of [FIDE](https://www.fide.com/) over the board players.

For the first few moves, the engine will randomly choose one of the 3 most popular lines played by grandmasters in over the board games. If the user plays an unknown opening move or the opening book ends, then the engine will start playing moves by itself, using a basic [minimax algorithm](https://simple.wikipedia.org/wiki/Minimax) with [alpha-beta pruning](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning) optimization.

Depending on the hardware and on the browser, in about 15 seconds the engine will evaluate approximately 1 to 10 million positions, reaching a depth of about 6 in most opening and middle game scenarios and about 9 in endgame positions.

All the [rules of chess](https://en.wikipedia.org/wiki/Rules_of_chess) are imlpemented except for the repetition rule (if the same board appears three times then the game ends in a draw), the [algebraic notation](https://en.wikipedia.org/wiki/Algebraic_notation_(chess)) used (the standard method for describing moves) is also simplified and does not consider checks (+) and checkmates (#).

The website offers the possitiblity to use Codfish 2000 to analyze any chess position, specified via the standard [FEN](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation) notation, and also offers the possitiblity to watch the engine play against itself.

Registered users can save the result of each analysis to a database and can also, during a match against the engine, create a bookmark of a particular position to analyze later.



## Setup

To run the website, you will need any HTTP web server with PHP support and a MySQL server.

In particular, the website has been tested on:
* XAMPP 8.0.10 (Apache 2.4.48, PHP 8.0.10, MySQL 5.7.28)
* Chrome 94.0.4606.61
* Firefox 92.0.1
