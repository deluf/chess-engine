
'use strict';

/**
 * This file handles the behaviour of the login screen in case of wrong username and password.
 */



document.querySelector("input[name=\"username\"]").addEventListener(
    'focus',
    (event) => {
        event.target.className = 'input-field';
    }
);

document.querySelector("input[name=\"password\"]").addEventListener(
    'focus',
    (event) => {
        event.target.className = 'input-field';
    }
);
