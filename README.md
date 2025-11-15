bismillah, sebelumnya mohon maaf kalua penulisan di readme ini sulit dimengerti, karena kami pakai Bahasa sehari hari aja, biar enak ngejelasinnya:D

NAMA PROYEK : UjikanDulu - Solusi Ulangan Harian

Ini adalah aplikasi untuk ujian harian online, simple aja sii.. kan kalua mau ribet ribet pake server sekolah  iasanya buat ujian skala besar aja, nah untuk skala kecilnya pake ini aja, biar guru bisa ngasi ujian semacam ini hamper tiap hari, tapi ttep professional karena pakai domain sekolah/domain jurusan

Tanpa pake backend ribet, intinya semua data lari ke firebase google (Realtime Database).

YANG KITA GUNAKAN

1.  Frontend: HTML, CSS, JavaScript standar.
2.  Database: Google Firebase (Realtime Database).
3.  Koneksi: nariknya pake cdn yg dah di sediain Google :
      https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js
      https://www.gstatic.com/firebasejs/9.6.1/firebase-database-compat.js

CARA KERJA

Aplikasi ini punya 2 halaman utama: [index.html] (buat Guru) dan [exam.html] (buat Siswa).

1. Panel Guru (index.html)

- guru buka halaman Utama dan di tanyai nama (cth. Bambang,Yanto,dst)
  `(note : nama guru ni udah kek folder pak, jadi salah nama guru = ganti folder alias gabisa akses data)`

- Data guru ini disimpen di Firebase di: `https://sukorejo-tugas-default-rtdb.asia-southeast1.firebasedatabase.app/`
- Guru nulis Judul Ujian dan Soal. Format soalnya: Pertanyaan | PilihanA,PilihanB,PilihanC | JawabanBenar


- Pas diklik "Generate Link", script [app.js] nyimpen soal ini ke Firebase. Link (cth: https://tugassukorejo.masterahmad.site/exam.html?id=Pack%20Ahmad_1763168005606 ) langsung muncul.
- Tabel "Riwayat Nilai" di bawahnya langsung ngambil data baru di firebase. Kalo ada siswa yang submit, nilai langsung cling muncul di tabel itu secara realtime.

2. Pages Siswa (exam.html)

- Siswa buka link yang dikasih guru.
- Script [exam.js] ngambil ID dari link (?id=...), terus narik data soal dari Firebase pake ID itu (karena di farebase tersimpan folder nya id pak).
- Siswa ngisi nama, terus ngerjain soal Pilihan Ganda.
- Pas klik "Kumpulkan", script [exam.jss] langsung ngitung nilainya di browser siswa.
   
(note :
guru gabisa dapet jawaban satuan dari siswa, karena hasil yang keluar hanya siswa, jenis ujian, dan nilai. itu semua terjadii karena prses hitung itu di [exam.js] dan output nya berupa angka (dalam hal ini angka nya kadang ga bulat, kita gatau kenapa) dan proses nya itu kira kira : 

(import dari exam.js)
===========

const finalScore = (score / total) * 100;

==========

(bonus) : yth juri, kalau mau liat web nya pas di jalanin bisa klik video ini :
