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
        console.log(err.stack || err);
        message("failed to get your filters", true, true);
    });

    //location filter
    var locationFilterHTML = [];
    for (var i = 0; i < filters.locations.length; i++) {
        var location = filters.locations[i];
        locationFilterHTML.push(`<option value="${location.id}">${location.name}</option>`);
    }
    document.getElementById('location').innerHTML = locationFilterHTML.join('\n');

    //activite filter
    var activiteFilterHTML = [];
    for (var i = 0; i < filters.activities.length; i++) {
        var activity = filters.activities[i];
        activiteFilterHTML.push(`<option value="${activity.id}">${activity.name}</option>`);
    }
    document.getElementById('activity').innerHTML = activiteFilterHTML.join('\n');


    //duration filter
    var durationFilterHTML = [];
    for (var i = 0; i < filters.duration.length; i++) {
        var duration = filters.duration[i];
        durationFilterHTML.push(`<option value="${duration.id}">${duration.name}</option>`);
    }
    document.getElementById('duration').innerHTML = durationFilterHTML.join('\n');


}