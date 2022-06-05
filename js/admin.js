var filters = {
    locations: [],
    activities: [],
    duration: []
};
window.onload = async function() {

    //fetch filters for the search menu
    await fetch('/assignment-2-website/api/filters.php').then(res => res.json()).then(resjson => {
        filters = resjson;
    }).catch(err => {
        message("failed to get your filters", true, true);
    });

    //location filter
    var locationFilterHTML = [];
    for (var i = 0; i < filters.locations.length; i++) {
        var location = filters.locations[i];
        locationFilterHTML.push(`<option value="${location.id}">${location.name}</option>`);
    }
    document.getElementById('location').innerHTML = locationFilterHTML.join('\n');
    var activitiesFilterHTML = [];
    for (var i = 0; i < filters.activities.length; i++) {
        var activity = filters.activities[i];
        activitiesFilterHTML.push(`<option value="${activity.id}">${activity.name}</option>`);
    }

    document.getElementById('filter').innerHTML = activitiesFilterHTML.join('\n');



    var query = getSearchParams();
    if (query.error) {
        if (query.error == 'none') {
            message(query.info.replaceAll("%20", " "), false, true);
        }
    }


}