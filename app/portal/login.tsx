<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>ListToBid Steward Portal</title>

  <!-- === STYLE === -->
  <style>
    /* [Your full CSS from Part 1 goes here — already optimized and complete] */
  </style>
</head>
<body>

  <!-- === SECTION 1: LOGIN === -->
  <section id="login-section">
    <div class="login-container">
      <h1>ListToBid</h1>
      <p>Steward Portal Login</p>

      <div id="login-error"></div>

      <form id="login-form">
        <div class="form-group">
          <label for="login-email">Email</label>
          <input type="email" id="login-email" class="form-control" placeholder="you@example.com" required />
        </div>
        <div class="form-group">
          <label for="login-password">Password</label>
          <input type="password" id="login-password" class="form-control" placeholder="••••••••" required />
        </div>
        <button type="button" id="login-button" class="btn btn-primary">Sign In</button>
      </form>

      <div class="divider">or</div>

     

     
     <button id="google-signin-button" class="btn-google">
  Sign in with Google
</button>
  </button>
</form>
</button>
</button>
</button>


}
</button>
      </button>
    </div>
  </section>

  <!-- === SECTION 2: DASHBOARD === -->
  <section id="dashboard-section">
    <aside class="sidebar">
      <div>
        <div class="sidebar-header">ListToBid</div>
        <nav class="sidebar-nav">
          <ul>
            <li><a href="#" class="active">Dashboard</a></li>
            <li><a href="#">Listings</a></li>
            <li><a href="#">Settings</a></li>
          </ul>
        </nav>
      </div>
      <div class="sidebar-footer">
        <button id="logout-button">Sign Out</button>
      </div>
    </aside>

    <main class="main-content">
      <header class="main-header">
        <h2>Welcome, <span id="steward-name">Steward</span></h2>
      </header>
      <div class="main-container">
        <div class="welcome-card">
          <h3>Your Dashboard</h3>
          <p>This is the main content area. From here you can manage your listings and account settings.</p>
        </div>
      </div>
    </main>
  </section>

  <!-- === SCRIPT === -->
  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
    import {
      getAuth,
      onAuthStateChanged,
      signInWithEmailAndPassword,
      GoogleAuthProvider,
      signInWithPopup,
      signOut
    } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

    const firebaseConfig = {
      apiKey: "AIzaSyCJYKumffrnbNU_4F3ItEU3aHLe8UuGhbg",
      authDomain: "listtobid-9ede2.firebaseapp.com",
      projectId: "listtobid-9ede2",
      storageBucket: "listtobid-9ede2.appspot.com",
      messagingSenderId: "482806996303",
      appId: "1:482806996303:web:9093c9e0ca4c434a36f93a"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    const loginButton = document.getElementById('login-button');
    const googleSignInButton = document.getElementById('google-signin-button');
    const logoutButton = document.getElementById('logout-button');
    const loginError = document.getElementById('login-error');
    const stewardName = document.getElementById('steward-name');

    function showLoginPage() {
      loginSection.style.display = 'flex';
      dashboardSection.style.display = 'none';
    }

    function showDashboard(user) {
      stewardName.textContent = user.displayName || user.email;
      loginSection.style.display = 'none';
      dashboardSection.style.display = 'flex';
    }

    function showLoginError(message) {
      loginError.textContent = message;
      loginError.style.display = 'block';
    }

    function hideLoginError() {
      loginError.textContent = '';
      loginError.style.display = 'none';
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Auth state changed: User is signed in.', user);
        showDashboard(user);
      } else {
        console.log('Auth state changed: User is signed out.');
        showLoginPage();
      }
    });

    loginButton.addEventListener('click', async (e) => {
      e.preventDefault();
      hideLoginError();
      const email = loginEmailInput.value;
      const password = loginPasswordInput.value;

      if (!email || !password) {
        showLoginError('Please enter both email and password.');
        return;
      }

      try {
        console.log('Attempting email/password sign in...');
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Email/password sign in successful.');
      } catch (error) {
        console.error('Email/password sign in error:', error.code, error.message);
        let friendlyMessage = 'An unknown error occurred.';
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
          friendlyMessage = 'Invalid email or password. Please try again.';
        } else if (error.code === 'auth/invalid-email') {
          friendlyMessage = 'Please enter a valid email address.';
        }
        showLoginError(friendlyMessage);
      }
    });

    googleSignInButton.addEventListener('click', async () => {
      hideLoginError();
      const provider = new GoogleAuthProvider();
      try {
        console.log('Attempting Google sign in...');
        await signInWithPopup(auth, provider);
        console.log('Google sign in successful.');
      } catch (error) {
        console.error('Google sign in error:', error.code, error.message);
        showLoginError('Error signing in with Google. Please try again.');
      }
    });

    logoutButton.addEventListener('click', async () => {
      try {
        
       </script>
</body>
</html>
