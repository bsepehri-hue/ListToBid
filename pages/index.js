<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ListToBid Portal</title>

  <!-- GIS Script -->
  <script src="https://accounts.google.com/gsi/client" onload="initializeGsi()" async defer></script>

  <!-- Firebase Config (for future use) -->
  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
    const firebaseConfig = {
      apiKey: "AIzaSyCJYKumffrnbNU_4F3ItEU3aHLe8UuGhbg",
      authDomain: "listtobid-9ede2.firebaseapp.com",
      projectId: "listtobid-9ede2",
      storageBucket: "listtobid-9ede2.appspot.com",
      messagingSenderId: "482806996303",
      appId: "1:482806996303:web:2f9cbc2f5332b4a936f93a"
    };
    const app = initializeApp(firebaseConfig);
  </script>

  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #ffffff;
      margin: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .login-container {
      text-align: center;
      width: 300px;
    }
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.logo {
  width: 140px;
  margin-bottom: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  opacity: 0;
  animation: fadeIn 1.2s ease-in forwards;
}
    }
    h1 {
      margin: 10px 0 5px;
      font-size: 22px;
      color: #333;
    }
    .tagline {
      font-size: 14px;
      color: #666;
      margin-bottom: 20px;
    }
    form input {
      width: 100%;
      padding: 10px;
      margin: 8px 0;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    form button {
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    form button:hover {
      background-color: #218838;
    }
    .links {
      margin-top: 12px;
      font-size: 13px;
      color: #0078D4;
    }
    .links a {
      display: inline-block;
      margin: 4px 6px;
      text-decoration: none;
      color: #0078D4;
    }
    #buttonDiv {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  </style>
</head>

<body>

  <div class="login-container">
    <img src="ltblogo.jpeg" alt="ListToBid Logo" class="logo">
    <h1>ListToBid Auction</h1>
    <p class="tagline">Where Everyone Wins.</p>
    <form>
      <input type="email" placeholder="Email" required>
      <input type="password" placeholder="Password" required>
      <button type="submit">Sign In</button>
    </form>
    <div class="links">
      <a href="#">Sign Up</a>
      <a href="#">Reset Password</a>
      <a href="#">Forgot password?</a>
      <a href="#">Create account</a>
    </div>
    <div id="buttonDiv"></div>
  </div>

  <script>
    function initializeGsi() {
      google.accounts.id.initialize({
        client_id: "102420516875-fd1k2fl0g5gd2gkt5oenbh5lcov6db4o.apps.googleusercontent.com",
        callback: (response) => {
          alert("Credential received:\n" + response.credential);
          // Optional: redirect or store token
          // window.location.href = "dash.html";
        }
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }
      );
      google.accounts.id.prompt();
    }
  </script>
</body>
</html>