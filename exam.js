
// NOTE: "Script nya sengaja gue bagi sendiri biar gampang debug kalau ada error." 

// Ambil ID ujian dari URL
const url = new URLSearchParams(location.search);
const examId = url.get('id');
const examData = JSON.parse(localStorage.getItem(`exam_${examId}`));

if (!examData) {
    document.body.innerHTML = '<h1>Ujian tidak ditemukan</h1>';
}

// Tampilkan judul
const title = document.getElementById('examTitleDisplay');
title.textContent = examData.title;

// Generate soal
const form = document.getElementById('examForm');
examData.questions.forEach(q => {
    form.innerHTML += `
        <div class='qbox'>
            <p><b>${q.no}.</b> ${q.question}</p>
            <input name="q_${q.no}" placeholder="Jawaban kamu">
        </div>
    `;
});

function submitExam() {
    const name = document.getElementById('studentName').value;
    if (!name) return alert('Isi nama dulu');

    let score = 0;

    examData.questions.forEach(q => {
        const ans = document.querySelector(`[name='q_${q.no}']`).value.trim();
        if (ans.toLowerCase() === q.answer.toLowerCase()) score++;
    });

    alert(`Nilai kamu: ${score}`);

    // Simpan nilai
    localStorage.setItem(`score_${Date.now()}`, JSON.stringify({
        name: name,
        exam: examData.title,
        score: score
    }));

    location.reload();
}

