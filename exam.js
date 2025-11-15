
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

//konig ke firebase
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
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

//url
const urlParams = new URLSearchParams(window.location.search);
const examId = urlParams.get('id');

let currentExamData = null;

//soal>database
if (examId) {
    db.ref('exams/' + examId).once('value').then((snapshot) => {
        const data = snapshot.val();
        if (data) {
            currentExamData = data;
            renderExam(data);
        } else {
            document.body.innerHTML = "<h1>Ujian ini gaada kocak</h1>";
        }
    });
} else {
    document.body.innerHTML = "<h1>Ujian ini Gaada di database kocak</h1>";
}

//pilgan
function renderExam(data) {
    document.getElementById('examTitleDisplay').textContent = data.title;
    const form = document.getElementById('examForm');
    
    data.questions.forEach((q, index) => {
        //radio soal
        let optionsHTML = '';
        q.options.forEach(opt => {
            optionsHTML += `
                <div style="margin-bottom: 5px;">
                    <input type="radio" name="q_${index}" value="${opt}"> 
                    <label>${opt}</label>
                </div>
            `;
        });
//anggep aja bener
        form.innerHTML += `
            <div class='qbox' style="margin-bottom: 20px; border-bottom:1px solid #eee; padding-bottom:10px;">
                <p><b>No ${index + 1}.</b> ${q.question}</p>
                ${optionsHTML}
            </div>
        `;
    });
}

//kirim
function submitExam() {
    const name = document.getElementById('studentName').value;
    if (!name) return alert('Isi nama dulu kocak!');
    if (!currentExamData) return;

    let score = 0;
    let total = currentExamData.questions.length;

    currentExamData.questions.forEach((q, index) => {
        // radiooooooo
        const selected = document.querySelector(`input[name="q_${index}"]:checked`);
        if (selected) {
            if (selected.value.trim() === q.answer.trim()) {
                score++;
            }
        }
    });

    const finalScore = (score / total) * 100; // Skala 100
    alert(`Alhamdulillah selesai, nilaimu: ${finalScore} duhai anak muda!`); //klo koma koma biarin plss..

    // scores
    db.ref('scores').push({
        teacher: currentExamData.teacher, // biar masuk ke data guru (misal udin yg ngasi soal, masuk na ke udin bukan ke fahmi)
        examTitle: currentExamData.title,
        studentName: name,
        score: finalScore,
        timestamp: Date.now()
    }).then(() => {
        window.location.reload();
    });
}

//function renderExam(data) {
 //   document.getElementById('examTitleDisplay').textContent = data.title;
 //   const form = document.getElementById('examForm');
    
 //   data.questions.forEach((q, index) => {

 ////       let optionsHTML = '';
 //       q.options.forEach(opt => {
  //          optionsHTML += `
 //               <div style="margin-bottom: 5px;">
  //                  <label>${opt}</label>
 //              </div>
  //          `;
  //      });