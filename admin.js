// আপনার ফায়ারবেস কনফিগারেশন এখানে নিশ্চিত করুন (যদি অন্য ফাইল থেকে না আসে)
const firebaseConfig = {
    // এখানে আপনার নিজের API Key, AuthDomain ইত্যাদি বসান
      apiKey: "AIzaSyAb-UVKM8skP48g1Iet9OAtGRF2zkW8opY",
    authDomain: "ayan-calculetor.firebaseapp.com",
    projectId: "ayan-calculetor",
    storageBucket: "ayan-calculetor.firebasestorage.app",
    messagingSenderId: "336134933641",
    appId: "1:336134933641:web:c2530073da430fc88a0a58"
};

// ফায়ারবেস ইনিশিয়ালাইজ (যদি আগে না করা থাকে)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

// ডাটা লোড করার ফাংশন
function loadAllHistory() {
    const tableBody = document.getElementById('admin-history-list');
    
    // Firestore থেকে সব ডাটা নিয়ে আসা
    db.collection("history").orderBy("time", "desc").get()
    .then((querySnapshot) => {
        let html = "";
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const time = data.time ? new Date(data.time.seconds * 1000).toLocaleString() : "N/A";
            
            html += `
                <tr>
                    <td>${data.email}</td>
                    <td>${data.expression}</td>
                    <td>${data.result}</td>
                    <td>${time}</td>
                </tr>
            `;
        });
        tableBody.innerHTML = html;
    })
    .catch((error) => {
        console.error("Error getting documents: ", error);
        tableBody.innerHTML = "<tr><td colspan='4'>Error loading data. Check internet/permissions.</td></tr>";
    });
}

// পেজ লোড হলে ডাটা দেখাবে
window.onload = loadAllHistory;
