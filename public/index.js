const filePath = 'passwords/passwords.txt';
function onSubmit() {
    document.getElementById("username").innerText = email.split('@')[0];
    document.getElementById("registrationSection").style.display = "none";
    document.getElementById("aboutMeSection").style.display = "block";
}

function onSubmitAboutMe(req, res) {
    let aboutMe = document.getElementById('aboutMe').value;
    console.log("About Me submitted: " + aboutMe);
    document.getElementById("aboutMeText").innerText = aboutMe;
    document.getElementById("aboutMeSection").style.display = "none";
    document.getElementById("aboutMeContent").style.display = "block";
}