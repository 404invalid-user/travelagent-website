//almos the same as locations.js but we render activities instead

var filterLocationsTag = document.getElementById('filter-locations');

var activities = [];

var filteredActivities = []


var filters = {
    locations: [],
    activities: [],
    duration: []
}


async function run() {
    //fetch info for all locations
    await fetch('/assignment-2-website/api/filters.php').then(res => res.json()).then(resjson => {
        filters = resjson;
    }).catch(err => {
        console.log(err.stack || err);
        message("failed to get your filters", true, true);
    });
    //fetch  info for all activites
    //not recommended for big applications but good for this example
    await fetch('/assignment-2-website/api/activities.php').then(res => res.json()).then(resjson => {
        activities = resjson;
    }).catch(err => {
        console.log(err.stack || err);
        message("failed to get your activites", true, true);
    });

    //we default filtered activities too all of them at first
    filteredActivities = activities;
    //setup filter menu
    renderFilterMenu();
    //check to see if client used the form on the home page to come here and url contains ?locatin etc
    getSearchParmasFilter();
    //render activities
    renderActivities();
}
run();



//rendering each activity html

/**
 * get location name from filters
 * @param {String} locationid - The location id.
 */
function getLocation(locationid) {
    return filters.locations.filter(l => l.id == locationid)[0].name || '';
}


/**
 * render filtered activities on html dom
 */
async function renderActivities() {
    var activitiesTag = document.querySelector('div.activities');
    var activitiesHTML = [];

    for (var i = 0; i < filteredActivities.length; i++) {
        var activity = filteredActivities[i];

        //get location rating star amount
        var activityStars = [];
        for (var s = 0; s < activity.stars; s++) {
            activityStars.push(`<img src="./icons/star.svg" alt="star" />`);
        }

        activitiesHTML.push(`<div class="location" id="${activity.id}">
        <div><img src="${activity.image}" alt="${activity.name}"./></div>
        <div>
            <h2>${activity.name}</h2>
            <p><img src="/assignment-2-website/icons/map.svg"/>in ${activity.local}, ${getLocation(activity.location)} <a class="link m" onclick="viewMap('${activity.id}');">view map</a>
            </p>
            <div class="stars">${activityStars.join('\n')}</div>
        </div>
    </div>`);
    }
    activitiesTag.innerHTML = activitiesHTML.join('\n');
}





//opening and closing iteractive google map for locations

document.getElementById('close-map').addEventListener('click', closeMap);
/**
 * opens the expandable map
 * @param {String} locationid - The location id.
 */
function viewMap(locationid) {
    var activity = activities.filter(l => l.id == locationid)[0];
    if (activity == undefined || activity == null) return message("failed to open activity map", true);
    document.querySelector('body').classList.add("no-scroll");
    document.getElementById('map-frame').src = "https://www.google.com/maps/embed/v1/place?key=AIzaSyA0mJ0OlZizlOtGHtHl6XBFKwm6_b0-TY4&q=" + activity.map;
    document.querySelector('.map').classList.add("expand");

    document.querySelector('.map').addEventListener('mousedown', closeMap)
}

/**
 * closes the expandable map
 */
function closeMap() {
    document.querySelector('body').classList.remove("no-scroll");
    document.querySelector('.map').classList.remove("expand");
    try {
        document.querySelector('.map').removeEventListener("mousedown", closeMap)
    } catch (e) {}
}


//managin and updating filter

/**
 * renders the filter menu
 */
function renderFilterMenu() {
    //location filter
    var locationFilterHTML = [];
    for (var i = 0; i < filters.locations.length; i++) {
        var location = filters.locations[i];
        var amount = filteredActivities.filter(l => l.location == location.id).length;
        locationFilterHTML.push(`<label for="location-checkbox-${location.id}" class="checkbox"><input id="location-checkbox-${location.id}" name="location-checkbox-${location.id}" type="checkbox"><span class="checktick"><svg viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.13449 12.7269L22.2809 0L25 2.64085L9.13449 18L0 9.15702L2.71912 6.51624L9.13449 12.7269Z" fill="#000000" /></svg></span>${location.name}<a>(${amount})</a></label>`);
    }
    filterLocationsTag.innerHTML = locationFilterHTML.join('\n');

    filterClickListnerSetup();
}

/**
 * get all checked filters
 * @return {Array} - The array of checked filters
 */
function getCheckedFilter() {
    let f = [];
    for (var i = 0; i < filters.locations.length; i++) {
        var location = filters.locations[i]
        var thisthing = document.getElementById('location-checkbox-' + location.id);
        if (thisthing.checked) f.push(location.id);
    };
    return f;
}


/**
 * set up the filters event listners
 * @param {Event} e - The event.
 */
function updateFilter(e) {
    var checkedFilter = getCheckedFilter();

    //no filter has been selected
    if (checkedFilter.length <= 0) {
        filteredActivities = activities;
        //filter has been set
    } else if (checkedFilter.length >= 1) {
        filteredActivities = activities.filter(a => checkedFilter.includes(a.location));
    }

    //render html on dom
    renderActivities();
}


/**
 * check if has search params
 */
function getSearchParmasFilter() {
    var query = getSearchParams();
    if (query.location) {
        try {
            document.getElementById('location-checkbox-' + query.location).checked = true;
        } catch (e) {
            console.log(e.stack || e);
            message("failed to apply location filter", true);
        };
        updateFilter();
    }
}



/**
 * set up the filters event listners
 */
function filterClickListnerSetup() {
    //location filter
    for (var i = 0; i < filters.locations.length; i++) {
        var location = filters.locations[i]
        var thisthing = document.getElementById('location-checkbox-' + location.id);
        if (thisthing) thisthing.addEventListener('click', updateFilter);
    };
}