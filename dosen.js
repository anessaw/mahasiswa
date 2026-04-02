const API_URL = 'http://localhost:3000/api/dosen'

document.addEventListener('DOMContentLoaded', bacaData)

async function bacaData() {
    try {
        const response = await fetch(API_URL)
        const data = await response.json()
        const tabelBody = document.getElementById('tabelBody')
        tabelBody.innerHTML = ''

        data.forEach(dosen =>{
        const row = `
        <tr>
            <td>${dosen.id}</td>
            <td>${dosen.nama}</td>
            <td>${dosen.nidn}</td>
            <td>${dosen.prodi}</td>
            <td>${dosen.fakultas}</td>
            <td>
                <button class="btn btn-sm btn-warning" onClick="editData(${dosen.id}, '${dosen.nama}', '${dosen.nidn}', '${dosen.prodi}', '${dosen.fakultas}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="hapusData(${dosen.id})">Hapus</button>
            </td>
        </tr>
        `

        tabelBody.innerHTML += row
    })

    

    }catch (error){
        console.error('Error:', error)

}}
document.getElementById('formDosen').addEventListener('submit', async function(event)
{
    event.preventDefault()
    const id = document.getElementById('id').value
    const nama = document.getElementById('nama').value
    const nidn = document.getElementById('nidn').value
    const prodi = document.getElementById('prodi').value
    const fakultas = document.getElementById('fakultas').value

    let url = API_URL
    let metode = 'POST'

    if (id) {
        url = `${API_URL}/${id}`
        metode = 'PUT'
    }

    try {
        const response = await fetch(url, {
            method: metode,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nama, nidn, prodi, fakultas })
        })
        const result = await response.json()
        alert((result.message || 'Operasi berhasil'))
        document.getElementById('formDosen').reset()
        document.getElementById('id').value = ''
        bacaData()

    }catch (error) {
        console.error('Error:', error)
        alert('Terjadi kesalahan pada sistem')
    }
})

window.editData = function(id, nama, nidn, prodi, fakultas){
    document.getElementById('id').value = id
    document.getElementById('nama').value = nama
    document.getElementById('nidn').value = nidn
    document.getElementById('prodi').value = prodi
    document.getElementById('fakultas').value = fakultas

    window.scrollTo(0,0)
}

window.hapusData = async function(id){
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            })
            const result = await response.json()
            alert(result.message || 'Data berhasil dihapus')
            bacaData()
        } catch (error) {
            console.error('Error:', error)
            alert('Terjadi kesalahan pada sistem')
        }
    }
}