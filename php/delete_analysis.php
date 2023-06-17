<?php 
require_once "config.php";
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

try {
    $pdo = new PDO(Config\dbConnectionString, Config\dbUsername, Config\dbPassword);
    $sql = "DELETE FROM analysis WHERE username=:usr AND fen=:fen";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":usr", $_SESSION[Config\loggedUsername]);
    $statement->bindValue(":fen", $_POST["fen"]);
    $statement->execute();
    $pdo = null;
}
catch (PDOException) { 
    http_response_code(503);
    die("Service unavailable: try again later"); 
}

if ($statement->rowCount() === 0) { 
    http_response_code(400);
    die("Bad request: specified analysis does not exists"); 
}

die("Analysis successfully removed");
?>