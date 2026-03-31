import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC745Y0n1i6LlgxyZ19nsINXiImoCC7qFg",
    authDomain: "bord-game-f2cfd.firebaseapp.com",
    projectId: "bord-game-f2cfd",
    storageBucket: "bord-game-f2cfd.firebasestorage.app",
    messagingSenderId: "1043061189251",
    appId: "1:1043061189251:web:cae02bf51b8063d8d2c9b6",
    measurementId: "G-MZZ4FN4DPM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('add-game-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const msg = document.getElementById('status-msg');
    btn.disabled = true;
    btn.innerText = "กำลังบันทึก...";

    try {
        await addDoc(collection(db, "game"), {
            name: document.getElementById('game-name').value,
            image: document.getElementById('game-image').value,
            na: document.getElementById('game-category').value,
            Details: document.getElementById('game-details').value // ใช้ชื่อฟิลด์ Details (ตัวใหญ่)
        });
        msg.innerText = "✅ บันทึกสำเร็จ!";
        msg.className = "mt-6 text-center text-sm font-bold text-green-600 block";
        e.target.reset();
    } catch (error) {
        msg.innerText = "❌ เกิดข้อผิดพลาด";
        msg.className = "mt-6 text-center text-sm font-bold text-red-600 block";
    } finally {
        btn.disabled = false;
        btn.innerText = "บันทึกลง Firebase";
    }
});