<?php 
require_once "config.php";
require_once "validate_fen.php";
if(session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION[Config\loggedUsername])) {
    http_response_code(401);
    die("Unauthorized: no one is logged in");
}

if (!isset($_POST["fen"])) {
    http_response_code(400);
    die("Bad request: missing FEN string");
}

$fen = htmlentities($_POST["fen"]);

if (!isFENvalid($fen)) {
    http_response_code(400);
    die("Bad request: invalid FEN");
}

try {
    $pdo = new PDO(Config\dbConnectionString, Config\dbUsername, Config\dbPassword);
    $sql = "INSERT INTO analysis (username, fen, name) VALUES (:usr, :fen, 'Bookmark')";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":usr", $_SESSION[Config\loggedUsername]);
    $statement->bindValue(":fen", $fen);
    $statement->execute();
    $pdo = null;

    if ($statement->rowCount() == 0) {
        http_response_code(409);
        die("The position already exists in the database"); 
    }
}
catch (PDOException) { 
    http_response_code(503);
    die("Service unavailable: try again later"); 
}

die("Position successfully saved");
?>