let questions = [];
let current = 0;
let score = 0;
let correct = false;
let timer;
let timeLeft = 15;

// Ambil elemen DOM
const container = document.getElementById('quiz-container');
const nextBtn = document.getElementById('nextBtn');

// Suara
const soundClick = new Audio('sounds/mouse-click-290204.mp3');
const soundTimeout = new Audio('sounds/beep-warning-6387.mp3');
const soundNext = new Audio('sounds/menu-click-89198.mp3');

// Ambil kategori & data diri dari localStorage
const kategori = localStorage.getItem("quizKategori") || "9";
const nama = localStorage.getItem("quizNama") || "Anonim";
const asal = localStorage.getItem("quizAsal") || "-";
const sekolah = localStorage.getItem("quizSekolah") || "-";

// Fetch soal kuis
fetch(`http://localhost:3000/api/quiz?kategori=${kategori}`)
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestion();
  })
  .catch(() => {
    container.innerHTML = "<p>❌ Gagal mengambil soal. Silakan cek koneksi API.</p>";
  });

// Tombol next
nextBtn.addEventListener('click', () => {
  clearInterval(timer);
  if (correct) score++;
  current++;

  if (current < questions.length) {
    soundNext.play();
    showQuestion();
  } else {
    simpanSkor();
  }
});

// Simpan skor ke backend dan arahkan ke hasil
function simpanSkor() {
  fetch('http://localhost:3000/api/skor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ skor: score })
  }).then(() => {
    localStorage.setItem("quizScore", score);
    localStorage.setItem("quizNama", nama);
    localStorage.setItem("quizAsal", asal);
    localStorage.setItem("quizSekolah", sekolah);
    window.location.href = 'result.html';
  });
}

// Tampilkan soal
function showQuestion() {
  correct = false;
  timeLeft = 15;

  const q = questions[current];
  const answers = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);

  container.innerHTML = `
    <div class="fade-in">
      <div class="timer" id="timer">⏱️ Waktu: ${timeLeft} detik</div>
      <h3>${q.question}</h3>
      ${answers.map(a => `
        <div class="answer-option">
          <input type="radio" id="${a}" name="answer" value="${a}">
          <label for="${a}">${a}</label>
        </div>
      `).join('')}
    </div>
  `;

  document.querySelectorAll('input[name="answer"]').forEach(input => {
    input.addEventListener('change', (e) => {
      soundClick.play();
      correct = (e.target.value === q.correct_answer);
    });
  });

  startTimer();
}
function simpanSkor() {
  const nama = localStorage.getItem("quizNama") || "Anonim";

  // Kirim ke leaderboard
  fetch('http://localhost:3000/api/leaderboard', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nama, skor: score })
  });

  // Simpan skor ke localStorage & arahkan ke hasil
  fetch('http://localhost:3000/api/skor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ skor: score })
  }).then(() => {
    localStorage.setItem("quizScore", score);
    window.location.href = 'result.html';
  });
}
// Timer logic
function startTimer() {
  const timerDisplay = document.getElementById('timer');
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `⏱️ Waktu: ${timeLeft} detik`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      soundTimeout.play();
      nextBtn.click();
    }
  }, 1000);
}

fetch('http://localhost:3000/api/leaderboard', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nama, skor: score })
});
