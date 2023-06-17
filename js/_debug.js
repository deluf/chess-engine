
'use strict';

/**
 * This file contains:
 *  - Test positions.
 *  - Functions to test the performance of the move generation algorithm.
 */



const CRITICAL_POSITION = '1r1q1r2/2p2p1k/p2pbp1p/3P3Q/1Pp1PR2/P7/6PP/RN4K1 b - - 0 1';
const COMPLEX_POSITION = 'r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w Qkq - 0 1';
const ROOK_ENDGAME = '3r4/8/3k4/8/8/3K4/8/8 w - - 0 1';
const TOW_ROOKS_ENDGAME = 'r6r/8/3k4/8/8/3K4/8/8 w - - 0 1';
const TOW_ROOKS_ENDGAME_WHITE = 'R6R/8/3K4/8/8/3k4/8/8 b - - 0 1';
const QUEEN_PROMOTION_ENDGAME = '8/3K4/4P3/8/8/8/6k1/7q w - - 0 1';
const STALEMATE = '8/2P4k/5K2/5N2/8/8/8/8 w - - 0 1';
const STALEMATE_BLACK = '8/8/8/8/5n2/5k2/2p4K/8 b - - 0 1';
const DRAW_BY_MATERIAL = '8/2Pk4/8/5K2/8/8/8/8 w - - 0 1';
const DRAW_BY_50_MOVE_RULE = 'r7/1k6/5K2/5N2/8/8/8/8 w - - 98 1';

/**
 * Lists all the legal moves of the next 5 turns.
 */
function go_perft_5() {
        
    let start = Date.now();

    let legal_moves1 = findLegalMoves(GAME.to_play);
    let legal_moves2 = [];
    let legal_moves3 = [];
    let legal_moves4 = [];
    let legal_moves5 = [];
    let search_results2;
    let search_results3;
    let search_results4;
    let search_results5;

    for (let legal_move1 of legal_moves1) {

        let lenght2_before = legal_moves2.length;
        let lenght3_before = legal_moves3.length;
        let lenght4_before = legal_moves4.length;
        let lenght5_before = legal_moves5.length;

        GAME.playMove(legal_move1);
        search_results2 = findLegalMoves(GAME.to_play);
        legal_moves2.push(...search_results2);

        for (let legal_move2 of search_results2) {

            GAME.playMove(legal_move2);
            search_results3 = findLegalMoves(GAME.to_play);
            legal_moves3.push(...search_results3);
            
            for (let legal_move3 of search_results3) {

                GAME.playMove(legal_move3);
                search_results4 = findLegalMoves(GAME.to_play);
                legal_moves4.push(...search_results4);

                for (let legal_move4 of search_results4) {

                    GAME.playMove(legal_move4);
                    search_results5 = findLegalMoves(GAME.to_play);
                    legal_moves5.push(...search_results5);
        
                    

                    GAME.undoMove(legal_move4);
                }

                GAME.undoMove(legal_move3);
            }

            GAME.undoMove(legal_move2);
        }

        let lenght2_after = legal_moves2.length;
        let lenght3_after = legal_moves3.length;
        let lenght4_after = legal_moves4.length;
        let lenght5_after = legal_moves5.length;

        console.log(
            ..._120toFR(decodeMove(legal_move1)[0]),
            ..._120toFR(decodeMove(legal_move1)[1]),
            lenght2_after - lenght2_before +
            lenght3_after - lenght3_before +
            lenght4_after - lenght4_before +
            lenght5_after - lenght5_before
        );

        GAME.undoMove(legal_move1);
    }

    let end = Date.now();

    console.log(legal_moves1.length);
    console.log(legal_moves2.length);
    console.log(legal_moves3.length);
    console.log(legal_moves4.length);
    console.log(legal_moves5.length);

    let nodes = legal_moves1.length + legal_moves2.length + legal_moves3.length + legal_moves4.length + legal_moves5.length;
    let time = (end - start) / 1000;

    console.log('Nodes per second: ' + (nodes/time).toFixed(2));
}

/**
 * Lists all the legal moves of the next 4 turns.
 */
function go_perft_4() {
        
    let start = Date.now();

    let legal_moves1 = findLegalMoves(GAME.to_play);
    let legal_moves2 = [];
    let legal_moves3 = [];
    let legal_moves4 = [];
    let search_results2;
    let search_results3;
    let search_results4;

    for (let legal_move1 of legal_moves1) {

        let lenght2_before = legal_moves2.length;
        let lenght3_before = legal_moves3.length;
        let lenght4_before = legal_moves4.length;

        GAME.playMove(legal_move1);
        search_results2 = findLegalMoves(GAME.to_play);
        legal_moves2.push(...search_results2);

        for (let legal_move2 of search_results2) {

            GAME.playMove(legal_move2);
            search_results3 = findLegalMoves(GAME.to_play);
            legal_moves3.push(...search_results3);
            
            for (let legal_move3 of search_results3) {

                GAME.playMove(legal_move3);
                search_results4 = findLegalMoves(GAME.to_play);
                legal_moves4.push(...search_results4);



                GAME.undoMove(legal_move3);
            }

            GAME.undoMove(legal_move2);
        }

        let lenght2_after = legal_moves2.length;
        let lenght3_after = legal_moves3.length;
        let lenght4_after = legal_moves4.length;

        console.log(
            ..._120toFR(decodeMove(legal_move1)[0]),
            ..._120toFR(decodeMove(legal_move1)[1]),
            lenght2_after - lenght2_before +
            lenght3_after - lenght3_before +
            lenght4_after - lenght4_before
        );

        GAME.undoMove(legal_move1);
    }

    let end = Date.now();

    console.log(legal_moves1.length);
    console.log(legal_moves2.length);
    console.log(legal_moves3.length);
    console.log(legal_moves4.length);

    let nodes = legal_moves1.length + legal_moves2.length + legal_moves3.length + legal_moves4.length;
    let time = (end - start) / 1000;

    console.log('Nodes per second: ' + (nodes/time).toFixed(2));
}
