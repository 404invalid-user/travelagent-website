/**
 * sets message on currect page
 * @param {string} text - The message text.
 * @param {Boolean} error - Is this message an error.
 * @param {Boolean} dontremove - Should this message fade out after a 30 secconds.
 */
function message(text, error, dontremove) {
    var messageTag = document.getElementById('message');
    messageTag.innerText = text;
    if (error) {
        messageTag.classList.add('error');
    } else if (!error) {
        messageTag.classList.add('ok');
    }
    //remove message after 30 secconds
    if (!dontremove) {
        setTimeout(function() {
            if (error) {
                messageTag.classList.remove('error');
            } else if (!error) {
                messageTag.classList.remove('ok');
            }
        }, 3000);
    }
}

//add a border to the bottom of the nav bar when the user has scrolled the height of the nav tag
document.addEventListener('scroll', function(e) {
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var nav = document.querySelector('nav');
    if (scrollTop > nav.offsetHeight) {
        nav.classList.add('scroll');
        //no clue how it would be less but thats a thing
    } else if (scrollTop <= nav.offsetHeight) {
        nav.classList.remove('scroll');
    }
})

/**
 * gets url params
 * @returns {Object} - Params
 */
function getSearchParams() {
    if (location.search) {
        const values = location.search.replace('?', '').split('&').reduce((res, item) => {
            const data = item.trim().split('=');
            return {...res,
                [data[0]]: data[1]
            };
        }, {});

        return values;
    } else {
        return {};
    };
};


var icon = document.getElementById("icon");
var icon1 = document.getElementById("a");
var icon2 = document.getElementById("b");
var icon3 = document.getElementById("c");
var nav = document.getElementById('nav');
var blue = document.getElementById("blue");

icon.addEventListener('click', function() {
    icon1.classList.toggle('a');
    icon2.classList.toggle('c');
    icon3.classList.toggle('b');
    nav.classList.toggle('show');
    blue.classList.toggle('slide');
});