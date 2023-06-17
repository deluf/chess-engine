<?php

function isFENvalid(string $fen) : bool {

    $validate_fen = "/^(([1-8PNBRQK]{1,8}\/){7}[1-8PNBRQK]{1,8})( [wb])( ([KQ]{1,4}|-))( ([a-h][1-8]|-))( ((([0-9])|([1-9][0-9]?))|(100)))( \d+)$/i";
    
    return preg_match($validate_fen, $fen);
}

?>