var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var subjectInput = document.getElementById('subject');
var messageInput = document.getElementById('message');


let namett;

nameInput.addEventListener('keyup', (e) => {
    clearTimeout(namett);
    namett = setTimeout(function() {
        document.getElementById("submit").disabled = true;
        if (nameInput.value.length <= 2) {
            nameInput.classList.add('error');
            document.getElementById('name-err').innerText = "name must be provided";
        } else if (nameInput.value.length > 100) {
            nameInput.classList.add('error');
            document.getElementById('name-err').innerText = "name is too long";
        } else {
            document.getElementById("submit").disabled = false;
            nameInput.classList.remove('error');
            document.getElementById('name-err').innerText = "";
        }
    }, 1000);
});

let emailtt;
emailInput.addEventListener('keyup', (e) => {
    clearTimeout(emailtt);
    emailtt = setTimeout(function() {
        document.getElementById("submit").disabled = true;
        if (emailInput.value.length <= 2) {
            emailInput.classList.add('error');
            document.getElementById('email-err').innerText = "email must be provided";
        } else if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
            emailInput.classList.add('error');
            document.getElementById('email-err').innerText = "a valid email is required";
        } else {
            document.getElementById("submit").disabled = false;
            emailInput.classList.remove('error');
            document.getElementById('email-err').innerText = "";
        }
    }, 1000);
});


let subjecttt;
subjectInput.addEventListener('keyup', (e) => {
    clearTimeout(subjecttt);
    subjecttt = setTimeout(function() {
        document.getElementById("submit").disabled = true;
        if (subjectInput.value.length <= 1) {
            subjectInput.classList.add('error');
            document.getElementById('subject-err').innerText = "subject must be provided";
        } else if (subjectInput.value.length < 6) {
            subjectInput.classList.add('error');
            document.getElementById('subject-err').innerText = "subject is too short";
        } else if (subjectInput.value.length > 100) {
            subjectInput.classList.add('error');
            document.getElementById('subject-err').innerText = "subject is too long";
        } else {
            document.getElementById("submit").disabled = false;
            subjectInput.classList.remove('error');
            document.getElementById('subject-err').innerText = "";
        }
    }, 1000);
});


let messagett;
messageInput.addEventListener('keyup', (e) => {
    clearTimeout(messagett);
    messagett = setTimeout(function() {
        document.getElementById("submit").disabled = true;
        if (messageInput.value.length <= 20) {
            messageInput.classList.add('error');
            document.getElementById('message-err').innerText = "message is too short";
        } else if (messageInput.value.length < 5000) {
            messageInput.classList.add('error');
            document.getElementById('message-err').innerText = "message is too long";
        } else {
            document.getElementById("submit").disabled = false;
            messageInput.classList.remove('error');
            document.getElementById('message-err').innerText = "";
        }
    }, 1000);
});