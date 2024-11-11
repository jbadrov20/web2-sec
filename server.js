const express = require("express");
const fs = require("fs").promises;
const cors = require("cors");
const path = require("path");
const app = express();
const port = 5000;
var sde = false;
const data = require("./passwords/passwords.json");
const filePath = "./passwords/passwords.json";
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
paths();
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server sluša na portu ${port}`);
});

function paths() {
  app.post("/register", async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let vulnerable = req.body.checkbox;
    console.log(email)
    try {
        const data = await fs.readFile(filePath, "utf8");
        console.log(data);
        const users = JSON.parse(data);

        const user = users.find((u) => u.email === email);
        if (user) {
          res.status(500).send("E-mail already registered");
          return;
        } else if (vulnerable == "on") {
          users.push({ email, password });
          fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
              console.error("Error writing file:", err);
            } else {
              console.log("User added successfully!");
            }
          });
          sde = true;
          res.redirect("/aboutMe");
        } else {
          users.push({ email, password });
          fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
              console.error("Error writing file:", err);
            } else {
              console.log("User added successfully!");
            }
          });
          res.redirect("/aboutMe");
        }
    } catch (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  app.get("/aboutMe", (req, res) => {
    putanja = path.join(__dirname, "public/html", "aboutMe.html");
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
    if (vulnerable == "on") res.send(`About Me: ${aboutMe}`);
    else if (aboutMe.includes("<script>") || aboutMe.includes("</script>")) {
      res.status(403);
      res.send(`Nedopušteno`);
    }
  });

  app.get("/user/profile", async (req, res) => {
    const userEmail = req.query.username;
    const pass = req.query.pass;
    const vulnerable = req.query.vulnerability2;
    console.log(`Received - Email: ${userEmail}, Password: ${pass}, Vulnerability: ${vulnerable}`);
  

    if (pass !== "admin" && vulnerable !== "yes") {
      return res.status(403).json({ error: "Access denied" });
    }

    if (pass == "admin" || vulnerable === "yes") {
      try {
        const data = await fs.readFile(filePath, "utf8");
        console.log(data);
        const users = JSON.parse(data);

        const user = users.find((u) => u.email === userEmail);

        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } catch (err) {
        console.error("Error reading users file:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  });
}

function emailExists(email) {
  return data.find((u) => u.email === email);
}