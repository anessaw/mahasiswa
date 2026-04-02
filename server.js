const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware
// Memberikan akses dari frontend & JSON
app.use(cors());
app.use(bodyParser.json());

// DB
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vanessa'
})

db.connect((error) => {
    if (error) {
        console.error('Gagal Koneksi:', error)
        return
    }
    console.log('Terhubung ke MySQL')
})

// Routing
app.get('/api/mahasiswa', (req, res) => {
    const sql = 'SELECT * FROM mahasiswa'
    db.query(sql, (error, results) => {
        if (error) return res.status(500).json({ error: error.message })
        res.json(results)
    })
})

// Create
app.post('/api/mahasiswa', (req, res) => {
    const { nama, nim, fakultas } = req.body
    const sql = 'INSERT INTO mahasiswa (nama, nim, fakultas) VALUES(?, ?, ?)'
    db.query(sql, [nama, nim, fakultas], (error, results) => {
        if (error) return res.status(500).json({ error: error.message })
        res.json({ message: 'Data berhasil ditambahkan', id: results.insertId })
})
})

// Update
app.put('/api/mahasiswa/:id', (req, res) => {
    const { id } = req.params
    const { nama, nim, fakultas } = req.body
    const sql = 'UPDATE mahasiswa SET nama = ?, nim = ?, fakultas = ? WHERE id = ?'
    db.query(sql, [nama, nim, fakultas, id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message })
        res.json({ message: 'Data berhasil di update' })
    })
})

// Delete
app.delete('/api/mahasiswa/:id', (req, res) => {
    const { id } = req.params
    const sql = 'DELETE FROM mahasiswa WHERE id = ?'

    db.query(sql, [id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message })
        res.json({ message: 'Data berhasil dihapus' })
    })
})

/// ================= DOSEN =================

// GET
app.get('/api/dosen', (req, res) => {
    db.query('SELECT * FROM dosen', (err, result) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(result)
    })
})

// POST
app.post('/api/dosen', (req, res) => {
    const { nama, nidn, prodi, fakultas } = req.body
    const sql = 'INSERT INTO dosen (nama, nidn, prodi, fakultas) VALUES (?, ?, ?, ?)'
    db.query(sql, [nama, nidn, prodi, fakultas], (err, result) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Dosen berhasil ditambahkan' })
    })
})

// PUT
app.put('/api/dosen/:id', (req, res) => {
    const { id } = req.params
    const { nama, nidn, prodi, fakultas } = req.body

    const sql = 'UPDATE dosen SET nama=?, nidn=?, prodi=?, fakultas=? WHERE id=?'
    db.query(sql, [nama, nidn, prodi, fakultas, id], (err) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Dosen berhasil diupdate' })
    })
})

// DELETE
app.delete('/api/dosen/:id', (req, res) => {
    db.query('DELETE FROM dosen WHERE id=?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Dosen berhasil dihapus' })
    })
})


/// ================= MATKUL =================

// GET
app.get('/api/matkul', (req, res) => {
    db.query('SELECT * FROM matkul', (err, result) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(result)
    })
})

// POST
app.post('/api/matkul', (req, res) => {
    const { nama, kode, sks, jadwal, jam } = req.body
    const sql = 'INSERT INTO matkul (nama, kode, sks, jadwal, jam) VALUES (?, ?, ?, ?, ?)'
    db.query(sql, [nama, kode, sks, jadwal, jam], (err) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Matkul berhasil ditambahkan' })
    })
})

// PUT
app.put('/api/matkul/:id', (req, res) => {
    const { id } = req.params
    const { nama, kode, sks, jadwal, jam } = req.body

    const sql = 'UPDATE matkul SET nama=?, kode=?, sks=?, jadwal=?, jam=? WHERE id=?'
    db.query(sql, [nama, kode, sks, jadwal, jam, id], (err) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Matkul berhasil diupdate' })
    })
})

// DELETE
app.delete('/api/matkul/:id', (req, res) => {
    db.query('DELETE FROM matkul WHERE id=?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Matkul berhasil dihapus' })
    })
})

// Jalankan Server
app.listen(PORT, () => {
    console.log(`Server API berjalan di http://localhost:${PORT}`)
})