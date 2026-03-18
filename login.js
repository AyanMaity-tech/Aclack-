const firebaseConfig = {
    apiKey: "AIzaSyAb-UVKM8skP48g1Iet9OAtGRF2zkW8opY",
    authDomain: "ayan-calculetor.firebaseapp.com",
    projectId: "ayan-calculetor",
    storageBucket: "ayan-calculetor.firebasestorage.app",
    messagingSenderId: "336134933641",
    appId: "1:336134933641:web:c2530073da430fc88a0a58"
};

// Initialize Firebase once
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

function handleSignUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => alert("Sign Up Successful! Now Login."))
        .catch(err => alert(err.message));
}

function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => window.location.href = "calculator.html")
        .catch(err => alert("Invalid Login Details"));
}
