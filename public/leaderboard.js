fetch('http://localhost:3000/api/leaderboard')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('leaderboard-list');
    list.innerHTML = '';
    data.forEach((item, index) => {
      list.innerHTML += `<li><strong>${item.nama}</strong> - ${item.skor} poin</li>`;
    });
  })
  .catch(err => {
    console.error(err);
    alert("Gagal mengambil data leaderboard");
  });
