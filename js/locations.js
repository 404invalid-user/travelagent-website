var filterLocationsTag = document.getElementById('filter-locations');
var filterActivitesTag = document.getElementById('filter-activites');
var filterDurationTag = document.getElementById('filter-duration');

var locations = [];
var activities = [];

var filteredLocations = [];

var filters = {
    locations: [],
    activities: [],
    duration: []
}


async function run() {
    //fetch info for all locations
    //not recommended for big applications but good for this example
    await fetch('/assignment-2-website/api/locations.php').then(res => res.json()).then(resjson => {
        locations = resjson;
    }).catch(err => {
        console.log(err.stack || err);
        message("failed to get locations", true, true);
    });
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

    //we default filtered locations too all of them at first
    filteredLocations = locations;
    //setup filter menu
    renderFilterMenu();
    //check to see if client used the form on the home page to come here and url contains ?locatin etc
    getSearchParmasFilter();
    //render locations
    renderLocations();
}
run();



//rendering each location html

/**
 * get location name from filters
 * @param {String} locationid - The location id.
 */
function getLocation(locationid) {
    return filters.locations.filter(l => l.id == locationid)[0].name || '';
}

/**
 * geneate html of all stay durations in min to max format from filters
 * @param {Array} durations - The array of duration ids.
 */
function getDurations(durations) {
    var txt = filters.duration.filter(d => d.id == durations[0])[0].name + " to " + filters.duration.filter(d => d.id == durations[durations.length - 1])[0].name;
    return txt;
}


/**
 * geneate html of activity  
 * @param {string} id - The activity id.
 */
function genActivityHTML(id) {
    var activity = activities.filter(a => a.id == id)[0];
    if (activity == null || activity == undefined) return '';

    return `<div class="activitie" id="${activity.id}">
    <p>${filters.activities.filter(a => a.id == activity.filter)[0].name}</p>
    <div class="activitie-details">
        <div>
            <img src="${activity.image}" alt="pp">
        </div>
        <div>
            <h3>${activity.name}</h3>
            <a target="_blank" href="./activity.php?id=${activity.id}">see activitiy details</a>
        </div>
    </div>
</div>`;
};

/**
 * render filtered locations on html dom
 */
async function renderLocations() {
    var locationsTag = document.querySelector('div.locations');
    var locationsHTML = [];

    for (var i = 0; i < filteredLocations.length; i++) {
        var location = filteredLocations[i];

        //get location rating star amount
        var locationStars = [];
        for (var s = 0; s < location.stars; s++) {
            locationStars.push(`<img src="./icons/star.svg" alt="star" />`);
        }
        //get location activities 
        var locationActivities = [];
        for (var a = 0; a < location.activities.length; a++) {
            var activity = location.activities[a];
            var activityHTML = genActivityHTML(activity);
            locationActivities.push(activityHTML);
        }

        locationsHTML.push(`<div class="location" id="${location.id}">
        <div><img src="${location.image}" alt="${location.name}"./></div>
        <div>
            <h2>${location.name}</h2>
            <p><img src="/assignment-2-website/icons/map.svg"/>in ${location.local}, ${getLocation(location.location)} <a class="link m" onclick="viewMap('${location.id}');">view map</a>
            </p>
            <p><img src="/assignment-2-website/icons/calendar.svg"/>${getDurations(JSON.parse(location.durations))} stay</p>
            <div class="stars">${locationStars.join('\n')}</div>
            <div><span>activities:</span>
                ${locationActivities.join('\n')}
            </div>
        </div>
    </div>`);
    }
    locationsTag.innerHTML = locationsHTML.join('\n');
}









//opening and closing iteractive google map for locations

document.getElementById('close-map').addEventListener('click', closeMap);
/**
 * opens the expandable map
 * @param {String} locationid - The location id.
 */
function viewMap(locationid) {
    var location = locations.filter(l => l.id == locationid)[0];
    if (location == undefined || location == null) return message("failed to open location map", true);
    document.querySelector('body').classList.add("no-scroll");
    document.getElementById('map-frame').src = "https://www.google.com/maps/embed/v1/place?key=AIzaSyA0mJ0OlZizlOtGHtHl6XBFKwm6_b0-TY4&q=" + location.map;
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
        var amount = filteredLocations.filter(l => l.location == location.id).length;
        locationFilterHTML.push(`<label for="location-checkbox-${location.id}" class="checkbox"><input id="location-checkbox-${location.id}" name="location-checkbox-${location.id}" type="checkbox"><span class="checktick"><svg viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.13449 12.7269L22.2809 0L25 2.64085L9.13449 18L0 9.15702L2.71912 6.51624L9.13449 12.7269Z" fill="#000000" /></svg></span>${location.name}<a>(${amount})</a></label>`);
    }
    filterLocationsTag.innerHTML = locationFilterHTML.join('\n');

    //activite filter
    var activiteFilterHTML = [];
    for (var i = 0; i < filters.activities.length; i++) {
        var activity = filters.activities[i];
        var amount = filteredLocations.filter(l => getActivityFilterids(l.activities).includes(activity.id)).length;
        activiteFilterHTML.push(`<label for="activity-checkbox-${activity.id}" class="checkbox"><input id="activity-checkbox-${activity.id}" name="activity-checkbox-${activity.id}" type="checkbox"><span class="checktick"><svg viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.13449 12.7269L22.2809 0L25 2.64085L9.13449 18L0 9.15702L2.71912 6.51624L9.13449 12.7269Z" fill="#000000" /></svg></span>${activity.name}<a>(${amount})</a></label>`);
    }
    filterActivitesTag.innerHTML = activiteFilterHTML.join('\n');


    //duration filter
    var durationFilterHTML = [];
    for (var i = 0; i < filters.duration.length; i++) {
        var duration = filters.duration[i];
        var amount = filteredLocations.filter(l => JSON.parse(l.durations).includes(duration.id)).length;
        durationFilterHTML.push(`<label for="duration-checkbox-${duration.id}" class="checkbox"><input id="duration-checkbox-${duration.id}" name="duration-checkbox-${duration.id}" type="checkbox"><span class="checktick"><svg viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.13449 12.7269L22.2809 0L25 2.64085L9.13449 18L0 9.15702L2.71912 6.51624L9.13449 12.7269Z" fill="#000000" /></svg></span>${duration.name}<a>(${amount})</a></label>`);
    }
    filterDurationTag.innerHTML = durationFilterHTML.join('\n');
    filterClickListnerSetup();
}

/**
 * get all checked filters
 * @return {Object} - The array of checked filters
 */
function getCheckedFilters() {
    let f = { locations: [], activities: [], duration: [] };
    for (var i = 0; i < filters.locations.length; i++) {
        var location = filters.locations[i]
        var thisthing = document.getElementById('location-checkbox-' + location.id);
        if (thisthing.checked) f.locations.push(location.id);
    };
    for (var i = 0; i < filters.activities.length; i++) {
        var activity = filters.activities[i];
        var thisthing = document.getElementById('activity-checkbox-' + activity.id);
        if (thisthing.checked) f.activities.push(activity.id);
    };
    for (var i = 0; i < filters.duration.length; i++) {
        var duration = filters.duration[i]
        var thisthing = document.getElementById('duration-checkbox-' + duration.id);
        if (thisthing.checked) f.duration.push(duration.id);
    };
    return f;
}


/**
 * set up the filters event listners
 * @param {Event} e - The event.
 */
function updateFilter(e) {
    var checkedFilters = getCheckedFilters();

    //no filters have been selected
    if (checkedFilters.locations.length <= 0 && checkedFilters.activities.length <= 0 && checkedFilters.duration.length <= 0) {

        filteredLocations = locations;
        //only locations filter has been set
    } else if (checkedFilters.locations.length >= 1 && checkedFilters.activities.length <= 0 && checkedFilters.duration.length <= 0) {

        filteredLocations = locations.filter(l => checkedFilters.locations.includes(l.location));
        //only activities filter has been set
    } else if (checkedFilters.locations.length <= 0 && checkedFilters.activities.length >= 1 && checkedFilters.duration.length <= 0) {

        filteredLocations = locations.filter(l => hasActivityid(checkedFilters.activities, l.activities));
        //only duration filter has been set
    } else if (checkedFilters.locations.length <= 0 && checkedFilters.activities.length <= 0 && checkedFilters.duration.length >= 1) {

        filteredLocations = locations.filter(l => hasDurationid(checkedFilters.duration, JSON.parse(l.durations)));
    } else {

        filteredLocations = locations.filter(l => checkedFilters.locations.includes(l.location) && hasActivityid(checkedFilters.activities, l.activities) && hasDurationid(checkedFilters.duration, JSON.parse(l.durations)));
    }

    //render html on dom
    renderLocations();
}


/**
 * check if has search params
 */
function getSearchParmasFilter() {
    var query = getSearchParams();
    //simple error function
    var er = (e, t) => {
        console.log(e.stack || e);
        message("failed to apply " + t + " filter", true);
    }
    if (query.location) {
        try {
            document.getElementById('location-checkbox-' + query.location).checked = true;
        } catch (e) { er(e, "location"); };
    }
    if (query.activity) {
        try {
            document.getElementById('activity-checkbox-' + query.activity).checked = true;
        } catch (e) { er(e, "activity"); };
    }
    if (query.duration) {
        try {
            document.getElementById('duration-checkbox-' + query.duration).checked = true;
        } catch (e) { er(e, "duration"); };
    }
    updateFilter();
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

    //activite filter
    for (var i = 0; i < filters.activities.length; i++) {
        var activity = filters.activities[i]
        var thisthing = document.getElementById('activity-checkbox-' + activity.id);
        if (thisthing) thisthing.addEventListener('click', updateFilter);
    };

    //duration filter
    for (var i = 0; i < filters.duration.length; i++) {
        var duration = filters.duration[i];
        var thisthing = document.getElementById('duration-checkbox-' + duration.id);
        if (thisthing) thisthing.addEventListener('click', updateFilter);
    };
}




//managing and looking up activities and activity filters


/**
 * get a activity filter id from activity id
 * @param {String} id - The activity id.
 * @returns {String} - The activity filter id 
 */
function getActivityFilterid(id) {
    var filterid = '';
    for (var a = 0; a < activities.length; a++) {
        var activity = activities[a];
        if (activity.id == id) {
            filterid = activity.filter;
        }
    }
    return filterids;
}


/**
 * get activity filter ids from location activity ids
 * @param {Array} ids - The activity ids.
 * @returns {Array} - activity filter ids
 */
function getActivityFilterids(ids) {
    var filterids = [];
    for (var i = 0; i < ids.length; i++) {
        var id = ids[i];
        for (var a = 0; a < activities.length; a++) {
            var activity = activities[a];
            if (activity.id == id) {
                filterids.push(activity.filter);
            }
        }
    }
    return filterids;
}



/**
 * checks to see if the locations activities contain one of the selected filter ids
 * @param {Array} selected - The array of selected activities filter ids.
 * @param {Array} location - The array of activity ids this locations has.
 * @return {Boolean} - the location has one of the selected activity filter ids
 */
function hasActivityid(selectedActivities, location) {
    var locationFilterids = getActivityFilterids(JSON.parse(location));
    var has = false;

    for (var i = 0; i < selectedActivities.length; i++) {
        var selected = selectedActivities[i];
        if (locationFilterids.includes(selected)) {
            has = true;
        }
    }
    return has;
}

/**
 * checks to see if the locations activities contain one of the selected filter ids
 * @param {Array} selected - The array of selected activities filter ids.
 * @param {Array} location - The array of activity ids this locations has.
 * @return {Boolean} - the location has one of the selected activity filter ids
 */
function hasDurationid(selectedDuration, location) {
    var locationFilterids = location;
    var has = false;

    for (var i = 0; i < selectedDuration.length; i++) {
        var selected = selectedDuration[i];
        if (locationFilterids.includes(selected)) {
            has = true;
        }
    }
    return has;
}