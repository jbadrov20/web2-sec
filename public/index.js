function onSubmit() {
    document.getElementById("username").innerText = email.split('@')[0];
    document.getElementById("registrationSection").style.display = "none";
    document.getElementById("aboutMeSection").style.display = "block";
}

function onSubmitAboutMe(req, res) {
    let aboutMe = document.getElementById('aboutMe').value;
    console.log("About Me submitted: " + aboutMe);
    document.getElementById("aboutMeInfo").innerText = aboutMe;
    document.getElementById("aboutMeInfo").style.display = "block";
}

async function fetchUserData(event) {
    event.preventDefault();
  
    const pass = document.getElementById("pass").value; 
    const username = document.getElementById("username").value;
    const vulnerability2 = document.getElementById("vulnerability2").checked ? "yes" : "no";
    const userInfo = document.getElementById("userInfo");
  
    try {
      const response = await fetch(`/user/profile?username=${username}&pass=${pass}&vulnerability2=${vulnerability2}`);
      
      if (response.ok) {
        const data = await response.json();
        userInfo.textContent = `email: ${data.email}, password: ${data.password}`;
      } else {
        const error = await response.json();
        userInfo.textContent = error.error;
      }
    } catch (error) {
      userInfo.textContent = "Greška pri povezivanju sa serverom.";
    }
  }