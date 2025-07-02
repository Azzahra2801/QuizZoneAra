// Ambil skor dari localStorage
const skor = localStorage.getItem("quizScore") || 0;
const skorElement = document.getElementById("skor");
const badgeElement = document.getElementById("badge");
const resultBox = document.getElementById("result-box");

// Suara efek
const soundWin = new Audio('sounds/success.mp3');   // mainkan jika skor tinggi
const soundFinish = new Audio('sounds/finish.mp3'); // mainkan jika skor biasa

// Tampilkan skor
skorElement.innerHTML = `Skor Kamu: <strong>${skor}</strong> dari 5`;

// Tampilkan lencana dan mainkan efek suara
if (parseInt(skor) >= 4) {
  badgeElement.innerHTML = '<p>🏅 Lencana: <strong>Master Quiz!</strong></p>';
  resultBox.classList.add('badge-highlight');
  soundWin.play();
} else {
  badgeElement.innerHTML = '<p>🎯 Terus latihan ya!</p>';
  soundFinish.play();
}
