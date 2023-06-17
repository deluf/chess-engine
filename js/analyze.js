
'use strict';

/**
 * This file handles the analyze position game mode.
 */



/**
 * ############################# ANALYZE GLOBAL VARIABLES #############################
 */

let ENGINE_BEST_MOVE = [];
let ENGINE_BEST_MOVE_ALGEBRAIC;
let USER_ANALYSES;
let SELECTED_ANALYSIS_INDEX;
let WATCH_ENGINE = false;



/**
 * ############################# ANALYZE CONSTANTS #############################
 */

const ANALYSIS_COLUMNS = {
    USERNAME: 0,
    FEN: 1,
    TIME: 2,
    NAME: 3,
    DEPTH: 4,
    BEST_MOVE: 5,
    EVALUATION: 6
}



/**
 * ############################# ANALYZE DOM ELEMENTS #############################
 */

const DOM_FEN_TEXTAREA = document.querySelector('.fen');
const DOM_DEPTH_SLIDER = document.querySelector('.slider');
const DOM_OPENING_BOOK_CHECKBOX = document.querySelector('.opening-book-checkbox');

const DOM_DEPTH_OUTPUT = document.querySelector('.depth');
const DOM_BEST_MOVE_OUTPUT = document.querySelector('.best-move');
const DOM_EVALUTAION_OUTPUT = document.querySelector('.evaluation');

const DOM_START_ENGINE_BUTTON = document.querySelector('.start-engine-button');
const DOM_PLAY_BEST_MOVE_BUTTON = document.querySelector('.play-best-move-button');
const DOM_WATCH_ENGINE_BUTTON = document.querySelector('.watch-engine-button');

const DOM_LOAD_ANALYSIS_BUTTON = document.querySelector('.load-analysis-button');
const DOM_SAVE_ANALYSIS_BUTTON = document.querySelector('.save-analysis-button');
const DOM_CLOSE_ANALYSES_BUTTON = document.querySelector('.close-analyses-button');


/**
 * ############################# ANALYZE DEFAULT EVENTS #############################
 */

DOM_FEN_TEXTAREA.addEventListener('change', fenChangeEvent);
DOM_DEPTH_SLIDER.addEventListener('input', sliderInputEvent);
DOM_OPENING_BOOK_CHECKBOX.addEventListener('click', openingBookCheckboxClickEvent);
DOM_START_ENGINE_BUTTON.addEventListener('click', startEngineClickEvent);
DOM_PLAY_BEST_MOVE_BUTTON.addEventListener('click', playBestMoveClickEvent);
DOM_WATCH_ENGINE_BUTTON.addEventListener('click', watchEngineEvent);

function fenChangeEvent() {
    GAME = new Game(DOM_FEN_TEXTAREA.value);

    // If the FEN is bad then the Game constructor uses the starting fen, so update the textarea
    DOM_FEN_TEXTAREA.value = GAME.toString();

    GAME.game_mode = GAME_MODE.ANALYZE_POSITION;
    initializeGUI();
    resetControls();
}

function resetControls() {
    DOM_ANTI_CLICK_OVERLAY.style.display = 'none';

    if (DOM_FEN_TEXTAREA.value != STARTING_FEN) {
        DOM_OPENING_BOOK_CHECKBOX.checked = false;
        DOM_OPENING_BOOK_CHECKBOX.disabled = true;
    }
    else {
        DOM_OPENING_BOOK_CHECKBOX.checked = true;
        DOM_OPENING_BOOK_CHECKBOX.disabled = false;
    }

    DOM_DEPTH_SLIDER.disabled = false;

    DOM_DEPTH_OUTPUT.textContent = '-';    
    DOM_BEST_MOVE_OUTPUT.textContent = '-';
    DOM_EVALUTAION_OUTPUT.textContent = '-';
    
    DOM_START_ENGINE_BUTTON.disabled = false;
    DOM_PLAY_BEST_MOVE_BUTTON.disabled = true;
    DOM_WATCH_ENGINE_BUTTON.disabled = false;

    if (DOM_LOAD_ANALYSIS_BUTTON != undefined) {
        DOM_LOAD_ANALYSIS_BUTTON.disabled = false;
    }
    if (DOM_SAVE_ANALYSIS_BUTTON != undefined) {
        DOM_SAVE_ANALYSIS_BUTTON.disabled = false;
    } 
}

function sliderInputEvent(event) {
    let DOM_maximum_depth_text = document.querySelector('.maximum-depth');

    if (event.target.value == '10') {
        DOM_maximum_depth_text.childNodes[0].nodeValue = 'Maximum think time: ~15s';
        ENGINE_MAX_DEPTH = 99;
    }
    else {
        DOM_maximum_depth_text.childNodes[0].nodeValue = 'Maximum depth: ' + event.target.value;
        ENGINE_MAX_DEPTH = parseInt(event.target.value);
    }
    
}

function openingBookCheckboxClickEvent() {

    if (DOM_OPENING_BOOK_CHECKBOX.checked == false) {
        GAME.is_in_book_theory = false;
    }
    else {
        GAME.is_in_book_theory = true;
    }
}

function startEngineClickEvent() {
    DOM_START_ENGINE_BUTTON.disabled = true;
    DOM_PLAY_BEST_MOVE_BUTTON.disabled = true;
    DOM_BUBBLES.style.visibility = 'visible';
    setTimeout(analyzePosition, 500);
}

function playBestMoveClickEvent() {

    if (ENGINE_BEST_MOVE.length == 0) {
        return;
    }

    if (GAME.isMoveInOpeningBook(ENGINE_BEST_MOVE_ALGEBRAIC)) {
        GAME.book_move_history.push(ENGINE_BEST_MOVE_ALGEBRAIC);
    }
    else {
        GAME.revokeBookAccess();
    }

    GAME.playMove(ENGINE_BEST_MOVE);
    updateGUIChessboard(ENGINE_BEST_MOVE);

    ENGINE_BEST_MOVE = [];
    ENGINE_BEST_MOVE_ALGEBRAIC = undefined;

    DOM_FEN_TEXTAREA.value = GAME.toString();
    DOM_PLAY_BEST_MOVE_BUTTON.disabled = true;
}

async function watchEngineEvent() {

    if (WATCH_ENGINE) {
        WATCH_ENGINE = false;

        DOM_START_ENGINE_BUTTON.disabled = false;
        DOM_PLAY_BEST_MOVE_BUTTON.disabled = true;
        DOM_WATCH_ENGINE_BUTTON.textContent = 'Watch engine';

        if (DOM_LOAD_ANALYSIS_BUTTON != undefined) {
            DOM_LOAD_ANALYSIS_BUTTON.disabled = false;
        }
        if (DOM_SAVE_ANALYSIS_BUTTON != undefined) {
            DOM_SAVE_ANALYSIS_BUTTON.disabled = false;
        }
    }

    else {
        WATCH_ENGINE = true;

        DOM_START_ENGINE_BUTTON.disabled = true;
        DOM_PLAY_BEST_MOVE_BUTTON.disabled = true;
        DOM_WATCH_ENGINE_BUTTON.textContent = 'Stop';

        if (DOM_LOAD_ANALYSIS_BUTTON != undefined) {
            DOM_LOAD_ANALYSIS_BUTTON.disabled = true;
        }
        if (DOM_SAVE_ANALYSIS_BUTTON != undefined) {
            DOM_SAVE_ANALYSIS_BUTTON.disabled = true;
        }
    }

    while (WATCH_ENGINE) {
        
        // Start engine
        DOM_BUBBLES.style.visibility = 'visible';
        
        await new Promise(resolve => {
            setTimeout(
                () => {
                    analyzePosition();
                    resolve();
                }, 500
            )
        });
        
        // Game ends
        if (GAME.status != STATUS.ONGOING || ENGINE_BEST_MOVE.length == 0) {
            WATCH_ENGINE = false;
            DOM_WATCH_ENGINE_BUTTON.textContent = 'Watch engine';
            return;
        }

        // Play best move
        playBestMoveClickEvent();

        DOM_START_ENGINE_BUTTON.disabled = true;

        // Sleep
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}



/**
 * ############################# ANALYZE LOGGED USERS EVENTS #############################
 */

if (DOM_LOAD_ANALYSIS_BUTTON != undefined) {
    DOM_LOAD_ANALYSIS_BUTTON.addEventListener('click', loadAnalysisEvent);
}
if (DOM_SAVE_ANALYSIS_BUTTON != undefined) {
    DOM_SAVE_ANALYSIS_BUTTON.addEventListener('click', saveAnalysisEvent);
}
if (DOM_CLOSE_ANALYSES_BUTTON != undefined) {
    DOM_CLOSE_ANALYSES_BUTTON.addEventListener('click', closeAnalysesMenuEvent);
}

/**
 * Returns a promise object which is going to be fulfilled with the user's analyses. 
 * @returns {Promise}
 */
async function fetchUserAnalyses() {
    return fetch('get_user_analyses.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Unable to fetch user analyses: Error ' + response.status);
        }
        else {
            return response.json();
        }
    })
    .then(json => {
        return json;
    })
    .catch((error) => {
        window.alert(error.message);
        return undefined;
    });
}

async function loadAnalysisEvent() {

    USER_ANALYSES = await fetchUserAnalyses();

    if (USER_ANALYSES == undefined) {
        return;
    }

    let DOM_analysis_settings_container = document.querySelector('.analysis-settings-container');
    let DOM_load_analysis_container = document.querySelector('.load-analysis-container');
    let DOM_database_output_container = document.querySelector('.database-output-container');

    // Hide the analysis settings, show the database output
    DOM_analysis_settings_container.style.display = 'none';
    DOM_load_analysis_container.style.display = 'flex';
    DOM_ANTI_CLICK_OVERLAY.style.display = 'block';

    if (USER_ANALYSES.length == 0) {
        let DOM_no_saved_analyses_text = document.createElement('span');
        DOM_no_saved_analyses_text.textContent = 'There are no saved analyses';
        DOM_database_output_container.appendChild(DOM_no_saved_analyses_text);
        DOM_database_output_container.style.display = 'flex';
        return;
    }

    for (let analysis of USER_ANALYSES) {

        let DOM_database_output = document.createElement('div');

        let DOM_database_output_left = document.createElement('div');
        let DOM_database_output_time = document.createElement('span');
        let DOM_database_output_name = document.createElement('span');

        let DOM_database_output_delete = document.createElement('div');

        DOM_database_output_name.textContent = analysis[ANALYSIS_COLUMNS.NAME];
        DOM_database_output_name.classList.add('database-output-name');

        DOM_database_output_time.textContent = analysis[ANALYSIS_COLUMNS.TIME];
        DOM_database_output_time.classList.add('database-output-time');

        DOM_database_output_delete.classList.add('database-output-delete')
        DOM_database_output_delete.addEventListener('click', deleteAnalysisEvent);

        DOM_database_output.classList.add('container-row');
        DOM_database_output.classList.add('database-output');

        DOM_database_output_left.classList.add('container-column');
        DOM_database_output_left.classList.add('database-output-left');
        DOM_database_output_left.appendChild(DOM_database_output_name);
        DOM_database_output_left.appendChild(DOM_database_output_time);

        DOM_database_output.appendChild(DOM_database_output_left);
        DOM_database_output.appendChild(DOM_database_output_delete);

        DOM_database_output_left.addEventListener('click', selectAnalysisEvent);

        DOM_database_output_container.appendChild(DOM_database_output);
    }
}

function selectAnalysisEvent(event) {
    let DOM_database_output_container = document.querySelector('.database-output-container');
    let DOM_user_analyses = Array.from(DOM_database_output_container.childNodes);

    SELECTED_ANALYSIS_INDEX = DOM_user_analyses.findIndex(
        node => node.isEqualNode(event.target.parentNode)
    );
    let selected_analysis = USER_ANALYSES[SELECTED_ANALYSIS_INDEX];

    DOM_FEN_TEXTAREA.value = selected_analysis[ANALYSIS_COLUMNS.FEN];

    fenChangeEvent();

    DOM_DEPTH_OUTPUT.textContent = selected_analysis[ANALYSIS_COLUMNS.DEPTH];    
    DOM_BEST_MOVE_OUTPUT.textContent = selected_analysis[ANALYSIS_COLUMNS.BEST_MOVE];
    DOM_EVALUTAION_OUTPUT.textContent = selected_analysis[ANALYSIS_COLUMNS.EVALUATION];

    closeAnalysesMenuEvent();
}

async function deleteAnalysisEvent(event) {
    let DOM_database_output_container = document.querySelector('.database-output-container');
    let DOM_user_analyses = Array.from(DOM_database_output_container.childNodes);

    let analysis_to_delete_index = DOM_user_analyses.findIndex(
        node => node.isEqualNode(event.target.parentNode)
    );

    fetch(
        'delete_analysis.php',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: "fen=" + USER_ANALYSES[analysis_to_delete_index][ANALYSIS_COLUMNS.FEN]
        })
    .then(response => {
        if (!response.ok) {
            throw new Error('Unable to delete analysis: Error ' + response.status);
        }
        else {
            event.target.parentNode.remove();
            USER_ANALYSES.splice(analysis_to_delete_index, 1);
        }
    })
    .catch((error) => {
        window.alert(error.message);
    });
}

async function saveAnalysisEvent() {

    USER_ANALYSES = await fetchUserAnalyses();

    if (USER_ANALYSES == undefined) {
        return;
    }

    let analysis = USER_ANALYSES.find(
        analysis => {return analysis[ANALYSIS_COLUMNS.FEN] == DOM_FEN_TEXTAREA.value;}
    );

    let previous_name = '';
    if (analysis) {
        if (!window.confirm('There already is an analysis for this position in the database, do you want to overwrite it ?')) {
            return;
        }
        previous_name = analysis[ANALYSIS_COLUMNS.NAME]; 
    }

    let new_name = prompt("Name (maximum 50 characters)", previous_name);

    if (new_name == undefined) {
        return;
    }

    if (new_name.length > 50) {
        saveAnalysisEvent();
        return;
    }

    fetch(
        'save_analysis.php',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    'fen': DOM_FEN_TEXTAREA.value,
                    'name': new_name,
                    'depth': DOM_DEPTH_OUTPUT.textContent,
                    'best_move': DOM_BEST_MOVE_OUTPUT.textContent,
                    'evaluation': DOM_EVALUTAION_OUTPUT.textContent
                }
            )
        })
    .then(response => {
        if (!response.ok) {
            if (response.status == 406) {
                throw new Error('Unable to save analysis: name is too long');
            }
            else {
                throw new Error('Unable to save analysis: Error ' + response.status);
            }
        }
        else {
            window.alert('Analysis successfully saved');
        }
    })
    .catch((error) => {
        window.alert(error.message);
    });

}

function closeAnalysesMenuEvent() {
    let DOM_analysis_settings_container = document.querySelector('.analysis-settings-container');
    let DOM_load_analysis_container = document.querySelector('.load-analysis-container');
    let DOM_database_output_container = document.querySelector('.database-output-container');

    DOM_analysis_settings_container.style.display = 'flex';
    DOM_load_analysis_container.style.display = 'none';

    DOM_database_output_container.style.removeProperty('display');
    DOM_database_output_container.replaceChildren();

    DOM_ANTI_CLICK_OVERLAY.style.display = 'none';
}



/**
 * ############################# ANALYZE #############################
 */

function analyzePosition(depth = 1) {

    if (GAME.status != STATUS.ONGOING || depth > ENGINE_MAX_DEPTH) {
        return;
    }

    if (GAME.searchOpeningBook()) {
        return;
    }

    let start = Date.now();
    let [evaluation, best_move, best_move_algebraic] = miniMax(depth, -Infinity, Infinity);
    let end = Date.now();
    let seconds = (end - start) / 1000;
    let evaluation_text;
    
    // There is a checkmate on the board
    if (evaluation == - Infinity) {
        if (depth == 1) {
            GAME.status = STATUS.BLACK_WINS;
            evaluation_text = 'Black wins';
            best_move_algebraic = '-';
        }
        else if (depth == 2) {
            evaluation_text = 'Black to win';
        }
        else {
            evaluation_text = `Mate in ${Math.floor((depth-1)/2)}`;
        }
    }

    // There is a checkmate on the board
    else if (evaluation == Infinity) {
        if (depth == 1) {
            GAME.status = STATUS.WHITE_WINS;
            evaluation_text = 'White wins';
            best_move_algebraic = '-';
        }
        else if (depth == 2) {
            evaluation_text = 'White to win';
        }
        else {
            evaluation_text = `Mate in ${Math.floor((depth-1)/2)}`;
        }
    }
    
    // There is a forced draw on the board
    else if (evaluation == FORCED_DRAW_EVALUATION) {
        if (depth == 1) {
            GAME.status = STATUS.DRAW;
            evaluation_text = 'Draw';
            best_move_algebraic = '-';
        }
        else {
            evaluation_text = 'Game to draw';
        }
    }
    
    // There is still enough time to search deeper
    else if (seconds < ENGINE_MAX_TIME && depth < ENGINE_MAX_DEPTH) {
        analyzePosition(depth + 1);
        return;
    }

    else {
        evaluation_text = evaluation.toFixed(2);
    }

    ENGINE_BEST_MOVE = best_move;
    ENGINE_BEST_MOVE_ALGEBRAIC = best_move_algebraic;

    updateGUI(depth, evaluation_text);
}

function updateGUI(depth, evaluation_text) {
    DOM_BUBBLES.style.visibility = 'hidden';

    DOM_PLAY_BEST_MOVE_BUTTON.disabled = false;
    DOM_START_ENGINE_BUTTON.disabled = false;

    if (GAME.status != STATUS.ONGOING) {
        DOM_ANTI_CLICK_OVERLAY.style.display = 'block';
        DOM_DEPTH_SLIDER.disabled = true;
        DOM_START_ENGINE_BUTTON.disabled = true;
        DOM_PLAY_BEST_MOVE_BUTTON.disabled = true;
        DOM_WATCH_ENGINE_BUTTON.disabled = true;
        if (DOM_LOAD_ANALYSIS_BUTTON != undefined) {
            DOM_LOAD_ANALYSIS_BUTTON.disabled = false;
        }
        if (DOM_SAVE_ANALYSIS_BUTTON != undefined) {
            DOM_SAVE_ANALYSIS_BUTTON.disabled = false;
        }
    }

    DOM_DEPTH_OUTPUT.textContent = `${depth}`;    
    DOM_BEST_MOVE_OUTPUT.textContent = `${ENGINE_BEST_MOVE_ALGEBRAIC}`;
    DOM_EVALUTAION_OUTPUT.textContent = `${evaluation_text}`;
}



/**
 * ############################# MAIN #############################
 */

ENGINE_MAX_DEPTH = 99;

async function downloadLargestOpeningBook() {
    let DOM_popup_container = document.querySelector('.popup-container');
    let DOM_settings_container = document.querySelector('.analysis-settings-container');
    let DOM_download_opening_book = document.querySelector('.download-opening-book');

    DOM_settings_container.style.visibility = 'hidden';
    DOM_popup_container.style.display = 'flex';
    DOM_download_opening_book.style.display = 'flex';
    DOM_ANTI_CLICK_OVERLAY.style.display = 'block';

    OPENING_BOOK_ID = 'largest';
    await fetchOpeningBook();

    DOM_ANTI_CLICK_OVERLAY.style.display = 'none';
    DOM_download_opening_book.style.display = 'none';
    DOM_popup_container.style.display = 'none';
    DOM_settings_container.style.visibility = 'visible';
}

// If the screen is too little it's useless to download the opening book
if (getCSSSquareSize() > MOBILE_SQUARE_SIZE_THRESHOLD) {
    downloadLargestOpeningBook();
    DOM_FEN_TEXTAREA.value = STARTING_FEN;
    fenChangeEvent();
}
