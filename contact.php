<!DOCTYPE html>
<html lang="en">

<head>
    <?php include_once "./includes/head.php"; ?>
    <title>contact - Tourism agent</title>
    <meta property="og:url" content="" />
    <meta property="og:title" content="contact - Tourism agent" />
    <meta property="og:description" content="travel easier than ever before to the range of locations we offer" />
    <link href="/assignment-2-website/css/form.css" rel="stylesheet">
    <script defer src="/assignment-2-website/js/form.js"></script>
    <script defer src="/assignment-2-website/js/contact-form.js"></script>
    <script src='https://js.hCaptcha.com/1/api.js' async defer></script>
</head>

<body>
    <?php include_once "./includes/navbar.php"; ?>
    <div class="form-wrap">
        <form class="contat-form" action="./api/contact.php" method="POST">
            <h1>Contact us</h1>
            <label for="name">name:</label>
            <input type="text" id="name" name="name" placeholder="name...">
            <a class="err" id="name-err"></a>
            <label for="name">email:</label>
            <input type="text" id="email" name="email" placeholder="email...">
            <a class="err" id="email-err"></a>
            <label for="subject">subject:</label>
            <input type="text" id="subject" name="subject" placeholder="subject...">
            <a class="err" id="subject-err"></a>
            <label for="message">message:</label>
            <textarea name="message" id="message" style="height:250px" placeholder="your message..."></textarea>
            <a class="err" id="message-err"></a>
            <div class="h-captcha" data-sitekey="4ab04103-6866-4e57-84a1-e664fca06f44"></div>
            <input class="button submit" id="submit" type="submit" name="submit" value="send">
        </form>
    </div>
</body>
<script>
    document.getElementById('nav-contact').classList.add('select');
</script>
</html>