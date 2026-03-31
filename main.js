import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

let allGames = [];

window.openDetail = (name, img, cat, details) => {
    document.getElementById('modal-title').innerText = name;
    document.getElementById('modal-image-box').innerHTML = `<img src="${img}" class="w-full h-full object-cover">`;
    document.getElementById('modal-category').innerText = `หมวดหมู่: ${cat}`;
    document.getElementById('modal-details').innerText = details || "ไม่มีรายละเอียดข้อมูล";
    document.getElementById('game-modal').classList.remove('hidden');
};

window.filterGames = (category) => {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
        btn.innerText === category ? btn.classList.add('active') : btn.classList.remove('active');
    });
    renderUI(category === 'ทั้งหมด' ? allGames : allGames.filter(g => g.na === category));
};

function renderUI(dataList) {
    const container = document.getElementById("game-list");
    container.innerHTML = "";
    dataList.forEach((game) => {
        const gName = game.name || "ไม่มีชื่อ";
        const gImg = game.image || game.imge || "https://via.placeholder.com/400";
        const gCat = game.na || "ทั่วไป";
        const gDetails = game.Details || "รอข้อมูลรายละเอียด..."; // ดึงจากฟิลด์ Details

        const cardDiv = document.createElement('div');
        cardDiv.className = "bg-white border rounded-[2rem] overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1";
        cardDiv.innerHTML = `
            <div class="h-64 bg-slate-100 overflow-hidden"><img src="${gImg}" class="w-full h-full object-cover"></div>
            <div class="p-6 text-center">
                <span class="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">${gCat}</span>
                <h3 class="text-2xl font-bold text-slate-800 my-3 leading-tight">${gName}</h3>
                <button class="detail-btn mt-2 w-full py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all">ดูรายละเอียด</button>
            </div>
        `;
        cardDiv.querySelector('.detail-btn').addEventListener('click', () => window.openDetail(gName, gImg, gCat, gDetails));
        container.appendChild(cardDiv);
    });
}

onSnapshot(collection(db, "game"), (snapshot) => {
    allGames = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderUI(allGames);
});