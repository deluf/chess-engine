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

try {
    $request_body = file_get_contents('php://input');
    $request_object = json_decode($request_body);
    
    $fen = htmlentities($request_object->fen);
    $name = htmlentities($request_object->name);
    $depth = htmlentities($request_object->depth);
    $best_move = htmlentities($request_object->best_move);
    $evaluation = htmlentities($request_object->evaluation);
}
catch (Exception) {
    http_response_code(400);
    die("Bad request: incorrect json structure");
}

if (!isFENvalid($fen)) {
    http_response_code(400);
    die("Bad request: incorrect FEN pattern");
}

if (strlen($name) > 50) {
    http_response_code(406);
    die("Not acceptable: analysis name is too long");
}

try {
    $pdo = new PDO(Config\dbConnectionString, Config\dbUsername, Config\dbPassword);

    $sql = "SELECT * FROM analysis WHERE username=:usr AND fen=:fen";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":usr", $_SESSION[Config\loggedUsername]);
    $statement->bindValue(":fen", $fen);
    $statement->execute();

    // Overwrite
    if ($statement->rowCount() >= 1) {
        $sql = "UPDATE analysis SET time='".date("Y-m-d H:i:s")."', depth=:depth, name=:name, best_move=:best_move, evaluation=:evaluation WHERE username=:usr AND fen=:fen";
    }
    // Insert new
    else {
        $sql = "INSERT INTO analysis (username, fen, name, depth, best_move, evaluation) VALUES (:usr, :fen, :name, :depth, :best_move, :evaluation)";
    }

    $statement = $pdo->prepare($sql);
    $statement->bindValue(":usr", $_SESSION[Config\loggedUsername]);
    $statement->bindValue(":fen", $fen);
    $statement->bindValue(":name", $name);
    $statement->bindValue(":depth", $depth);
    $statement->bindValue(":best_move", $best_move);
    $statement->bindValue(":evaluation", $evaluation);
    $statement->execute();

    $pdo = null;
}
catch (PDOException) { 
    http_response_code(503);
    die("Service unavailable: try again later"); 
}

die("Analysis successfully saved");
?>
