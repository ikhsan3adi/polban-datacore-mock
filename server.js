const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 6767;

app.use(cors());

let db = {};
try {
  const data = fs.readFileSync(path.join(__dirname, "db.json"), "utf8");
  db = JSON.parse(data);
} catch (error) {
  console.error("Gagal memuat db.json:", error);
  process.exit(1);
}

// GUEST
app.get("/api/v1/guest/mahasiswa/gender", (req, res) => {
  res.json(db["guest.mahasiswa.jenis_kelamin"].all || []);
});

app.get("/api/v1/guest/mahasiswa/jenis-slta", (req, res) => {
  res.json(db["guest.mahasiswa.jenis_slta"].all || []);
});

app.get("/api/v1/guest/mahasiswa/rasio-dosen-mhs", (req, res) => {
  res.json(db["guest.mahasiswa.rasio_dosen_mhs"].all || []);
});

app.get("/api/v1/guest/mahasiswa/domisili", (req, res) => {
  if (req.query["provinsi"]) {
    res.json(db["guest.mahasiswa.persebaran_domisili"].provinsi || []);
  } else {
    res.json(db["guest.mahasiswa.persebaran_domisili"].all || []);
  }
});

app.get("/api/v1/guest/mahasiswa/agama", (req, res) => {
  res.json(db["guest.mahasiswa.agama"].all || []);
});

// AKADEMIK
app.get("/api/v1/akademik/distribusi-nilai", (req, res) => {
  res.json(db["akademik.distribusi_nilai"].all || []);
});

app.get("/api/v1/akademik/tren-ip-rata-rata", (req, res) => {
  res.json(db["akademik.tren_ip_rata_rata"].all || []);
});

app.get("/api/v1/akademik/tren-ip-tertinggi", (req, res) => {
  if (req.query["semester"]) {
    res.json(db["akademik.tren_ip_tertinggi"].semester || []);
  } else {
    res.json(db["akademik.tren_ip_tertinggi"].angkatan || []);
  }
});

app.get("/api/v1/akademik/tipe-tes-masuk", (req, res) => {
  if (req.query["kelas"]) {
    res.json(db["akademik.tipe_tes_masuk"].kelas || []);
  } else if (req.query["prodi"]) {
    res.json(db["akademik.tipe_tes_masuk"].prodi || []);
  } else {
    res.json(db["akademik.tipe_tes_masuk"].angkatan || []);
  }
});

// KEMAHASISWAAN
app.get("/api/v1/mahasiswa/jumlah-mahasiswa", (req, res) => {
  if (req.query["prodi"]) {
    res.json(db["mahasiswa.jumlah_mahasiswa"].prodi || []);
  } else {
    res.json(db["mahasiswa.jumlah_mahasiswa"].angkatan || []);
  }
});

app.get("/api/v1/mahasiswa/gender", (req, res) => {
  if (req.query["kelas"]) {
    res.json(db["mahasiswa.jenis_kelamin"].kelas || []);
  } else if (req.query["prodi"]) {
    res.json(db["mahasiswa.jenis_kelamin"].prodi || []);
  } else {
    res.json(db["mahasiswa.jenis_kelamin"].angkatan || []);
  }
});

app.get("/api/v1/mahasiswa/jenis-slta", (req, res) => {
  if (req.query["kelas"]) {
    res.json(db["mahasiswa.jenis_slta"].kelas || []);
  } else if (req.query["prodi"]) {
    res.json(db["mahasiswa.jenis_slta"].prodi || []);
  } else {
    res.json(db["mahasiswa.jenis_slta"].angkatan || []);
  }
});

app.get("/api/v1/mahasiswa/agama", (req, res) => {
  if (req.query["kelas"]) {
    res.json(db["mahasiswa.agama"].kelas || []);
  } else if (req.query["prodi"]) {
    res.json(db["mahasiswa.agama"].prodi || []);
  } else {
    res.json(db["mahasiswa.agama"].angkatan || []);
  }
});

app.listen(PORT, () => {
  console.log(`DataCore API Mock Berjalan pada port ${PORT}`);
});
