const express = require('express');
const router = express.Router();
const db = require('../database/db');
const axios = require('axios');

// Ambil soal quiz
router.get('/quiz', async (req, res) => {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=5&type=multiple');
    res.json(response.data.results);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data quiz' });
  }
});

// Simpan skor
router.post('/skor', (req, res) => {
  const { skor } = req.body;
  if (typeof skor !== 'number' || isNaN(skor)) {
    return res.status(400).json({ error: 'Skor tidak valid' });
  }

  const waktu = new Date();
  const sql = 'INSERT INTO skor_quiz (skor, waktu_selesai) VALUES (?, ?)';
  db.query(sql, [skor, waktu], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Skor berhasil disimpan' });
  });
});

// Ambil skor
router.get('/skor', (req, res) => {
  db.query('SELECT * FROM skor_quiz ORDER BY waktu_selesai DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
// Reset riwayat skor
router.delete('/reset', (req, res) => {
  db.query('DELETE FROM skor_quiz', (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Riwayat berhasil dihapus' });
  });
});
// GET leaderboard
router.get('/leaderboard', (req, res) => {
  db.query('SELECT nama, skor FROM leaderboard ORDER BY skor DESC LIMIT 10', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
// POST to leaderboard
router.post('/leaderboard', (req, res) => {
  const { nama, skor } = req.body;
  db.query('INSERT INTO leaderboard (nama, skor) VALUES (?, ?)', [nama, skor], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});
// GET leaderboard
router.get('/leaderboard', (req, res) => {
  db.query('SELECT nama, skor FROM leaderboard ORDER BY skor DESC LIMIT 10', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST leaderboard
router.post('/leaderboard', (req, res) => {
  const { nama, skor } = req.body;
  if (!nama || skor == null) {
    return res.status(400).json({ error: "Data tidak lengkap" });
  }
  db.query('INSERT INTO leaderboard (nama, skor) VALUES (?, ?)', [nama, skor], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;