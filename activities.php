<!DOCTYPE html>
<html lang="en">

<head>
    <?php include_once "./includes/head.php"; ?>
    <title>activities - Tourism agent</title>
    <meta property="og:url" content="" />
    <meta property="og:title" content="activities - Tourism agent" />
    <meta property="og:description" content="see the range of activities we have to offer" />
    <link href="/assignment-2-website/css/locations.css" rel="stylesheet">
    <script defer src="/assignment-2-website/js/activities.js"></script>
</head>

<body>
    <?php include_once "./includes/navbar.php"; ?>
    <div class="map">
        <a id="close-map">X</a>
        <iframe id="map-frame" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0mJ0OlZizlOtGHtHl6XBFKwm6_b0-TY4&q=Delta+Force+Paintball+Cardiff" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <div style="margin-top: 83px;">
        <div class="grid">
            <div class="filter">
                <h2>Filter</h2>
                <div>
                    <h3>Locations</h3>
                    <div id="filter-locations"></div>
                </div>
            </div>
            <div class="activities"></div>
        </div>
    </div>
</body>
<script>
    document.getElementById('nav-activities').classList.add('select');
</script>
</html>