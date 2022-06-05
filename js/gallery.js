var galleryTag = document.querySelector('.gallery');
var locations = [];

async function run() {
    //fetch info for all locations
    //not recommended for big applications but good for this example
    await fetch('/assignment-2-website/api/locations.php').then(res => res.json()).then(resjson => {
        //randomise locations and add the first 20 locations form randomiser
        locations = shuffle(resjson).slice(0, 20);
    }).catch(err => {
        console.log(err.stack || err);
        message("failed to get locations", true, true);
    });

    var galleryHTML = [];
    for (var i = 0; i < locations.length; i++) {
        galleryHTML.push(genItemHTML(locations[i]));
    }
    galleryTag.innerHTML = galleryHTML.join('\n');

    //get all items (images) in gallery and pick random ones to be big
    var items = document.querySelectorAll('.item');
    for (var i = 0; i < 20; i++) {
        if (i == 0 || i == 4 || i == 8 || i == 12 || i == 15) {
            if (Math.random() < 0.5) {
                items[i].classList.add('grid-span-2')
            }
        }
    }
}
run();



//make the html for each item
function genItemHTML(location) {
    var locationStars = [];
    for (var s = 0; s < location.stars; s++) {
        locationStars.push(`<img src="./icons/star.svg" alt="star" />`);
    }
    return `<div class="item" style="background-image: url('${location.image.replace(" http",'http')}');">
    <div class="info">
        <div class="content">
            <h2>${location.name}</h2>
            <div class="stars">${locationStars.join('\n')}</div>
            <div class="btns">
                <a href="./location.php?id=${location.id}">more info</a>
            </div>
        </div>
    </div>
</div>`;
}




//array shuffler to give random locations every times
function shuffle(array) {
    var currentIndex = array.length;
    var randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}