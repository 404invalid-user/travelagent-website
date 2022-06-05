<!DOCTYPE html>
<html lang="en">

<head>
    <?php include_once "../includes/head.php"; ?>
    <title>admin - Tourism agent</title>
    <meta property="og:title" content="admin - Tourism agent" />
    <meta property="og:description" content="login to the Tourism agent site admin area" />
    <meta property="og:url" content="" />
    <link href="/assignment-2-website/css/form.css" rel="stylesheet">
    <script defer src="/assignment-2-website/js/admin.js"></script>
    <style>
        form{width: 90%;}
    </style>
    <?php
    session_start();
    if (!isset($_SESSION['id'])) {
        header("location: ../login.php");
        exit();
    }
    if ($_SESSION['admin'] != 1) {
        header("location: ../index.php");
        exit();
    }
    ?>
</head>

<body>
    <?php include_once "../includes/navbar.php"; ?>

<div class="form-wrap">
    <label>add filter</label>
    <form action="/assignment-2-website/admin/api/new-filter.php" method="post">
        <label>type:</label>
        <select name="type" id="type">
            <option value="locations">locations</option>
            <option value="activities">activities</option>
            <option value="duration">duration</option>
        </select>
        <label>name:</label>
        <input type="text" name="name" />
        <input type="submit" value="Submit"./>
    </form>

    <label>add location</label>
    <form action="/assignment-2-website/admin/api/new-activity.php" method="post">
        <label>name:</label>
        <input type="text" name="name" id="name"./>
        <label>image:</label>
        <input type="file" name="image" id="image" />
        <label>Description</label>
        <textarea name="description" id="description"></textarea>
        <label>Map (eg for "Vale Resort" you do "Vale+Resort"):</label>
        <input type="text" name="map" id="map" />
        <label>location:</label>
        <select name="location" id="location">
            <option value="0">loading...</option>
        </select>
        <label>local:</label>
        <input type="text" name="local" id="local" />


        <label>stars (number)</label>
        <input type="text" name="stars" id="stars"/>
        <label>activities (must be a correctly formatted array of strings with "double quotes"):</label>
        <input type="text" name="activities" id="activities"/>

        <label>durations (must be a correctly formatted array of strings with "double quotes"):</label>
        <input type="text" name="duration" id="duration"/>
        <input type="submit" value="Submit"./>
    </form>

    <label>add activities</label>
    <form action="/assignment-2-website/admin/api/new-activity.php" method="post">
        <label>name:</label>
        <input type="text" name="name" id="name"./>
        <label>activity filter type:</label>
        <select name="filter" id="filter">
        </select>
        <label>image:</label>
        <input type="file" name="image" id="image" />
        <label>Description</label>
        <textarea name="description" id="description"></textarea>
        <label>Map (eg for "Vale Resort" you do "Vale+Resort"):</label>
        <input type="text" name="map" id="map" />
        <label>location:</label>
        <select name="location" id="location">
            <option value="0">loading...</option>
        </select>
        <label>local:</label>
        <input type="text" name="local" id="local" />
        <input type="submit" value="Submit"./>
    </form>
    </div>
</body>

</html>