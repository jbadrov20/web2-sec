const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 5000;

filePath = 'passwords/passwords.txt';
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
paths();
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server sluša na portu ${port}`);
});

function paths() {
    app.post('/register', (req, res) => {
        console.log(req.body.email)
        let email = req.body.email;
        let password = req.body.password;
        let text = email + ":" + password + "\n";
        fs.appendFile(filePath, text, (err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.redirect('/aboutMe');
            }
        });
    });
    app.get("/aboutMe", (req, res) => {
        putanja = path.join(__dirname, 'public/html', 'aboutMe.html');
        console.log(putanja);
        res.sendFile(putanja);
    });
    app.post("/aboutMe", (req, res) => {
        let aboutMe = req.body.aboutMe;
        let vulnerable = req.body.vulnerable;
        res.redirect(`/aboutMePage?aboutMe=${aboutMe}&vulnerable=${vulnerable}`);
    });
    app.get("/aboutMePage", (req, res) => {
        let aboutMe = req.query.aboutMe;
        let vulnerable = req.query.vulnerable;
        console.log(vulnerable);
        if(vulnerable == 'on')
            res.send(`About Me: ${aboutMe}`);
        else
            if(aboutMe.includes('<script>') || aboutMe.includes('</script>')){
                res.status(403);
                res.send(`Nedopušteno`);
            }
    });
}