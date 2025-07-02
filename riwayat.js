fetch('http://localhost:3000/api/skor')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('riwayat-list');
    data.forEach(item => {
      const li = document.createElement('li');

      let badge = '';
      if (item.skor >= 5) badge = '🏅 Master';
      else if (item.skor === 4) badge = '🥈 Jago';
      else if (item.skor >= 2) badge = '🎯 Lumayan';
      else badge = '🐣 Pemula';

      const waktu = new Date(item.waktu_selesai).toLocaleString("id-ID");
      li.textContent = `${waktu} — Skor: ${item.skor}/5 ${badge}`;
      list.appendChild(li);
    });
  });
