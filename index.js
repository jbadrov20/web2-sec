const filePath = 'passwords/passwords.txt';

function onSubmit() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let tekst = email + ":" + password;
    fs.appendFile(filePath, `${tekst}\n`, (err) => {
        if (err) {
            res.status(500).send('Greška pri dodavanju u datoteku');
        } else {
            res.send('Podaci dodani u datoteku');
        }
    });
    console.log("Registered: " + email);
    document.getElementById("username").innerText = email.split('@')[0];
    document.getElementById("registrationSection").style.display = "none";
    document.getElementById("aboutMeSection").style.display = "block";
}

function onSubmitAboutMe() {
    let aboutMe = document.getElementById('aboutMe').value;
    console.log("About Me submitted: " + aboutMe);
    document.getElementById("aboutMeText").innerText = aboutMe;
    document.getElementById("aboutMeSection").style.display = "none";
    document.getElementById("aboutMeContent").style.display = "block";
}