<!DOCTYPE html>
<html lang="en">

<head>
    <?php include_once "./includes/head.php"; ?>
    <title>login - Tourism agent</title>
    <meta property="og:url" content="" />
    <meta property="og:title" content="login - Tourism agent" />
    <meta property="og:description" content="travel easier than ever before to the range of locations we offer" />
    <link href="/assignment-2-website/css/form.css" rel="stylesheet">
    <script defer src="/assignment-2-website/js/form.js"></script>
    
    <script src='https://js.hCaptcha.com/1/api.js' async defer></script>
</head>

<body>
    <?php include_once "./includes/navbar.php"; ?>
    <div class="form-wrap">
        <form action="/assignment-2-website/api/login.php" method="post">
            <h1>Login</h1>
            <label for="username">username:</label>
            <input type="text" id="username" name="username" placeholder="username..." >
            <label for="password">password:</label>
            <input type="password" id="password" name="password" placeholder="password...">
            <a href="./signup.php" style="text-align: center">signup</a>
            <div class="h-captcha" data-sitekey="4ab04103-6866-4e57-84a1-e664fca06f44"></div>
            <input type="submit" name="submit" id="submit" value="Login">
        </form>
        <a href="https://invalidlag.com/?ref=as2">powered by my bad php code</a>
    </div>
</body>
<script>
    document.getElementById('nav-login').classList.add('select');
</script>
</html>