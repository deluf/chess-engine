<?php 
header("Content-Type: application/json; charset=utf-8");

if (!isset($_GET["book"])) {
    http_response_code(400);
    die("Bad request: missing book parameter");
}

$allowed_books = ["tiny", "small", "default", "large", "largest"];
if (!in_array($_GET["book"], $allowed_books)) {
    http_response_code(404);
    die("Not found: unable to find the specified opening book");
}

$book_path = "../opening_books/".$_GET["book"].".json";
$file = file_get_contents($book_path);

if ($file === false) {
    http_response_code(500);
    die("Internal server error: try again later");
}

echo $file;
?>