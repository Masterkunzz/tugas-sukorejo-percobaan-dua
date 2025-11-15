// firebase gratisan by gugel (ini klo lewat 30 hari katanya dah gaisa dipake;v)
const firebaseConfig = {
  apiKey: "AIzaSyBaB8eOG-5rAO8W-qTydIvsRem5Yh4Aakw",
  authDomain: "sukorejo-tugas.firebaseapp.com",
  projectId: "sukorejo-tugas",

  databaseURL: "https://sukorejo-tugas-default-rtdb.asia-southeast1.firebasedatabase.app", 

  storageBucket: "sukorejo-tugas.firebasestorage.app",
  messagingSenderId: "932663140568",
  appId: "1:932663140568:web:63d0033aba20afc82db7ad",
  measurementId: "G-MLCR06V7EB"
};

//const firebaseConfig = {
 // apiKey: "AIzaSyBaB8eOG-5rAO8W-qTydIvsRem5Yh4Aakw",
 // authDomain: "sukorejo-tes.firebaseapp.com",
 // projectId: "sukorejo-tes",

 // databaseURL: "https://sukorejo-tugas-/firebasedatabase.app", 

 // storageBucket: "sukorejo-tes.firebasestorage.app",
 // messagingSenderId: "932665120568",
 // appId: "1:932663140568:web:63d0033aba20afc82db7ad",
 //measurementId: "G-MLCR06V7EB"
//};

// inisialisasi firebase nyah
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let currentUser = null;

// pitur login guru
function loginUser() {
    const user = document.getElementById('usernameInput').value.trim();
    if (!user) return alert("Isi username dulu!");
    
    currentUser = user; // Simpan user di variabel
    document.getElementById('displayUser').textContent = user;
    
    // Toggle tampilan
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('dashboardSection').style.display = 'block';
    
    loadScores(); // Load nilai khusus user ini
}

function logout() {
    location.reload();
}

//generate ujian
function generateExam() {
    const title = document.getElementById('examTitle').value;
    const raw = document.getElementById('qaInput').value.trim();
    
    if(!title || !raw) return alert("Judul dan soal harus diisi!");

    // id gabungan
    const examId = currentUser + '_' + Date.now(); 

    // Parsing Soal Pilihan Ganda
    const questions = raw.split('\n').map((line, index) => {
        // Split berdasarkan tanda |
        const parts = line.split('|');
        // parxx
        
        if(parts.length < 3) return null; // skip otomatis ko format salah

        return {
            id: index + 1,
            question: parts[0].trim(),
            options: parts[1].split(',').map(o => o.trim()), // Jadi array
            answer: parts[2].trim()
        };
    }).filter(q => q !== null);

    // KIRIM KE FIREBASE
    db.ref('exams/' + examId).set({
        teacher: currentUser,
        title: title,
        questions: questions
    }, (error) => {
        if (error) {
            alert('Gagal simpan ke database');
        } else {
            const link = location.origin + `/exam.html?id=${examId}`;
            document.getElementById('generatedLink').innerHTML = `
                <p>Link Ujian Siap:</p>
                <a href="${link}" target="_blank">${link}</a>
            `;
        }
    });
}

//nilai
function loadScores() {
    const tbody = document.getElementById('scoreBody');
    tbody.innerHTML = '';

    // Ambil data dari 'scores', filter yang gurunya = currentUser
    db.ref('scores').orderByChild('teacher').equalTo(currentUser)
    .on('value', (snapshot) => {
        tbody.innerHTML = ''; // Reset biar gak dobel kalau ada update realtime
        snapshot.forEach((child) => {
            const s = child.val();
            const row = `<tr><td>${s.studentName}</td><td>${s.examTitle}</td><td>${s.score}</td></tr>`;
            tbody.innerHTML += row;
        });
    });
}

// fitur apus data
function clearData() {
    if(confirm("Yakin hapus semua data ujian & nilai kamu?")) {
        // Hapus nilai
        db.ref('scores').orderByChild('teacher').equalTo(currentUser).once('value', sn => {
            sn.forEach(child => child.ref.remove());
        });
        // soal
        alert("Data nilai berhasil direset!");
        loadScores();
    }

}
