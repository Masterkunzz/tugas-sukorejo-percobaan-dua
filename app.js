


// NOTE manusia: "Semua data disimpen ke localStorage dulu. Kalau mau sambung Netlify nanti gue kasih catatannya di bawah."

function generateExam() {
    const title = document.getElementById('examTitle').value;
    const raw = document.getElementById('qaInput').value.trim();

    const id = Date.now(); // ID unik ujian

    const questions = raw.split('\n').map(line => {
        const [no, q, a] = line.split('|');
        return { no, question: q, answer: a };
    });

    localStorage.setItem(`exam_${id}`, JSON.stringify({ title, questions }));

    const link = location.origin + `/exam.html?id=${id}`;

    document.getElementById('generatedLink').innerHTML = `
        <p>Link Ujian:</p>
        <a href="${link}" target="_blank">${link}</a>
    `;
}

// Load nilai
window.onload = () => {
    const tbody = document.getElementById('scoreBody');
    if (!tbody) return;

    const keys = Object.keys(localStorage);

    keys.forEach(k => {
        if (k.startsWith('score_')) {
            const s = JSON.parse(localStorage.getItem(k));
            const row = `<tr><td>${s.name}</td><td>${s.exam}</td><td>${s.score}</td></tr>`;
            tbody.innerHTML += row;
        }
    });
};