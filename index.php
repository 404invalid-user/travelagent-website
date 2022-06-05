<!DOCTYPE html>
<html lang="en">

<head>
    <?php include_once "./includes/head.php"; ?>
    <title>Tourism agent</title>
    <meta property="og:url" content="" />
    <meta property="og:title" content="Tourism agent" />
    <meta property="og:description" content="travel easier than ever before to the range of locations we offer" />
    <link href="/assignment-2-website/css/form.css" rel="stylesheet">
    <link href="/assignment-2-website/css/index.css" rel="stylesheet">
    
    <script defer src="/assignment-2-website/js/index.js"></script>
</head>

<body>
    <?php include_once "./includes/navbar.php"; ?>
    <div class="hero">
        <h1>Tourism agent</h1>
        <h2>travel easier than ever before to the range of locations we offer</h2>

        <form method="get" action="/assignment-2-website/locations.php" class="search">
            <div class="terms">
                <div class="sec">
                    <p>Location</p>
                    <select name="location" id="location"></select>
                </div>
                <div class="sec">
                    <p>activity</p>
                    <select name="activity" id="activity"></select>
                </div>
                <div class="sec">
                    <p>Duration</p>
                    <select name="duration" id="duration"></select>
                </div>
            </div>
            <div class="btn-wrap">
                <button type="submit" class="search-button"><img src="/assignment-2-website/images/magnifying-glass.png" alt="search icon"><span>Search</span></button>
            </div>
        </form>
    </div>
</body>
<script>
    document.getElementById('nav-home').classList.add('select');
</script>
</html>