const API_URL = 'http://localhost:3000/api/matkul'

document.addEventListener('DOMContentLoaded', bacaData)

async function bacaData() {
    try {
        const response = await fetch(API_URL)
        const data = await response.json()
        const tabelBody = document.getElementById('tabelBody')
        tabelBody.innerHTML = ''

        data.forEach(matkul =>{
        const row = `
        <tr>
            <td>${matkul.id}</td>
            <td>${matkul.nama}</td>
            <td>${matkul.kode}</td>
            <td>${matkul.sks}</td>
            <td>${matkul.jadwal}</td>
            <td>${matkul.jam}</td>
            <td>
                <button class="btn btn-sm btn-warning" onClick="editData(${matkul.id}, '${matkul.nama}', '${matkul.kode}', '${matkul.sks}', '${matkul.jadwal}', '${matkul.jam}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="hapusData(${matkul.id})">Hapus</button>
            </td>
        </tr>
        `

        tabelBody.innerHTML += row
    })

    

    }catch (error){
        console.error('Error:', error)

}}
document.getElementById('formMatkul').addEventListener('submit', async function(event)
{
    event.preventDefault()
    const id = document.getElementById('id').value
    const nama = document.getElementById('nama').value
    const kode = document.getElementById('kode').value
    const sks = document.getElementById('sks').value
    const jadwal = document.getElementById('jadwal').value
    const jam = document.getElementById('jam').value

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
            body: JSON.stringify({ nama, kode, sks, jadwal, jam })
        })
        const result = await response.json()
        alert((result.message || 'Operasi berhasil'))
        document.getElementById('formMatkul').reset()
        document.getElementById('id').value = ''
        bacaData()

    }catch (error) {
        console.error('Error:', error)
        alert('Terjadi kesalahan pada sistem')
    }
})

window.editData = function(id, nama, kode, sks, jadwal, jam){
    document.getElementById('id').value = id
    document.getElementById('nama').value = nama
    document.getElementById('kode').value = kode
    document.getElementById('sks').value = sks
    document.getElementById('jadwal').value = jadwal
    document.getElementById('jam').value = jam

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