<?php

function RCto120(int $row, int $column) : int{
    return 21 + $row * 10 + $column;
}

function isFENvalid(string $fen) : bool {

    $validate_fen = "/^(([1-8PNBRQK]{1,8}\/){7}[1-8PNBRQK]{1,8})( [wb])( ([KQ]{1,4}|-))( ([a-h][1-8]|-))( ((([0-9])|([1-9][0-9]?))|(100)))( \d+)$/i";
    
    if (!preg_match($validate_fen, $fen)) {
        return FALSE;
    }

    
    $fen = explode(" ", $fen);

    // Cheking the position of the pieces
    $row = 0;
    $column = 0;
    $black_king_square = NULL;
    $white_king_square = NULL;
    
    $rook_on_square_21 = FALSE;
    $rook_on_square_28 = FALSE;
    $rook_on_square_91 = FALSE;
    $rook_on_square_98 = FALSE;

    foreach (str_split($fen[0]) as $char) {

        if ($char == "/") {
            $column = 0;
            $row++;
            continue;
        }

        if ($column >= 8) {
            return FALSE;
        }

        if (!is_numeric($char)) {

            if ($char == "r") {
                if (RCto120($row, $column) == 21) {
                    $rook_on_square_21 = TRUE;
                }
                elseif (RCto120($row, $column) == 28) {
                    $rook_on_square_28 = TRUE;
                }
            }
            elseif ($char == "R") {
                if (RCto120($row, $column) == 91) {
                    $rook_on_square_91 = TRUE;
                }
                elseif (RCto120($row, $column) == 98) {
                    $rook_on_square_98 = TRUE;
                }
            }
            elseif ($char == "k") {
                $black_king_square = RCto120($row, $column);
            }
            elseif ($char == "K") {
                $white_king_square = RCto120($row, $column);
            }

            $column++;
            continue;
        }

        for (; $char > 0; $char--) {
            $column++;
        }
    }


    // Checking that there are kings
    if ($black_king_square == NULL || $white_king_square == NULL) {
        return FALSE;
    }

    // Checking the castling rights
    foreach (str_split($fen[2]) as $char) {
 
        if ($char == 'K') {
            if ($white_king_square != 95 || !$rook_on_square_98) {
                return FALSE;
            }
        }
 
        elseif ($char == 'Q') {
            if ($white_king_square != 95 || !$rook_on_square_91) {
                return FALSE;
            }
        }
 
        elseif ($char == 'k') {
            if ($black_king_square != 25 || !$rook_on_square_28) {
                return FALSE;
            }
        }
 
        elseif ($char == 'q') {
            if ($black_king_square != 25 || !$rook_on_square_21) {
                return FALSE;
            }
        }
    }

    return TRUE;
}

?>