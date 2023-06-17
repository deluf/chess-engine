<?php 
require_once "config.php";
if(session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (isset($_SESSION[Config\loggedUsername])){
    header("Location:../index.php");
    die("Already logged in");
}

$wrongLogin = false;

if (isset($_POST["username"]) && isset($_POST["password"])) {
    
    $username = htmlentities($_POST["username"]);

    if (strlen($username) > 50 || strlen($_POST["password"]) > 50){
        $wrongLogin = true;
    }
    else {

        try {
            $pdo = new PDO(Config\dbConnectionString, Config\dbUsername, Config\dbPassword);
            $sql = "SELECT * FROM users WHERE username = :usr";
            $statement = $pdo->prepare($sql);
            $statement->bindValue(":usr", $username);
            $statement->execute();
            $row = $statement->fetch();
    
            // If the username does not exist then register new user
            if (empty($row)) {
    
                $sql = "INSERT INTO users VALUES (:usr, :psw)";
                $statement = $pdo->prepare($sql);
                $statement->bindValue(":usr", $username);
                $statement->bindValue(":psw", password_hash($_POST["password"], PASSWORD_DEFAULT));
                $statement->execute();
    
                $_SESSION[Config\loggedUsername] = $username;
                header("Location:../index.php");
                die("Registration successful");
            }
    
            // If the username exists then verify the password
            else if (password_verify($_POST["password"], $row["password"])) {
                $_SESSION[Config\loggedUsername] = $username;
                header("Location:../index.php");
                die("Login successful");
            }
    
            // Else the username exists but the password is wrong
            else {
                $wrongLogin = true;
            }
    
            $pdo = null;
        }
        catch (PDOException) { 
            http_response_code(503);
            die("Service unavailable: try again later"); 
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Codfish 2000</title>

    <link rel="stylesheet" href="../css/default.css">
    <link rel="stylesheet" href="../css/login.css">
    
    <link rel="stylesheet" media="only screen and (max-width: 999px), only screen and (max-height: 724px)" href="../css/mobile.css">
    <link rel="stylesheet" media="only screen and (min-width: 1000px) and (min-height: 725px)" href="../css/desktop.css">

    <link rel="icon" href="../media/logo.webp">
</head>

<body>

    <div class="main container-column">

        <div class="logo-container show-always">
            <img class="logo" src="../media/logo.webp" alt="Codfish 2000 logo">
            <h3 class="logo-text">CODFISH 2000</h3>
        </div>

        <div class="container-column">
    
        <form method="post" action="login.php" class="container-column">

            <?php 
            if ($wrongLogin) {
                echo "
                Warning:
                <ul>
                    <li>Both username and password should not exceed 50 characters.</li>
                    <li>The username should not contain special characters.</li>
                    <li>The username could have already be taken.</li>
                </ul>
                <br>
                ";
            } 
            ?>

            <label for="username">Username</label>
            <input type="text" name="username" id="username" maxlength="50" required class="input-field <?php if ($wrongLogin) {echo "wrong-field";} ?>">

            <label for="password">Password</label>
            <input type="password" name="password" id="password" maxlength="50" required class="input-field <?php if ($wrongLogin) {echo "wrong-field";} ?>">

            <input type="submit" value="Submit" class="button submit">

        </form>

        </div>
    
        <a class="button navigation-button" href="../index.php">Home page</a>

    </div>

    <script src="../js/remove_annoying_events.js"></script>
    <script src="../js/login_page_events.js"></script>

</body>
</html>
