<?php 
require_once "config.php";
if(session_status() == PHP_SESSION_NONE) {
    session_start();
}
header("Content-Type: application/json; charset=utf-8");

if (!isset($_SESSION[Config\loggedUsername])) {
    http_response_code(401);
    die("Unauthorized: no one is logged in");
}

try {
    $pdo = new PDO(Config\dbConnectionString, Config\dbUsername, Config\dbPassword);
    $sql = "SELECT * FROM analysis WHERE username=:usr ORDER BY time desc";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":usr", $_SESSION[Config\loggedUsername]);
    $statement->execute();
    $pdo = null;
}
catch (PDOException) { 
    http_response_code(503);
    die("Service unavailable: try again later"); 
}

echo json_encode($statement->fetchAll());
?>