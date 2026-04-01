const API_URL = 'http://localhost:3000/api/mahasiswa'

document.addEventListener('DOMContentLoaded', bacaData)

async function bacaData() {
    try {
        const response = await fetch(API_URL)
        const data = await response.json()
        const tabelBody = document.getElementById('tabelBody')
        tabelBody.innerHTML = ''

        data.forEach(mahasiswa =>{
        const row = `
        <tr>
            <td>${mahasiswa.id}</td>
            <td>${mahasiswa.nama}</td>
            <td>${mahasiswa.nim}</td>
            <td>${mahasiswa.fakultas}</td>
            <td>
                <button class="btn btn-sm btn-warning" onClick="editData(${mahasiswa.id}, '${mahasiswa.nama}', '${mahasiswa.nim}', '${mahasiswa.fakultas}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="hapusData(${mahasiswa.id})">Hapus</button>
            </td>
        </tr>
        `

        tabelBody.innerHTML += row
    })

    

    }catch (error){
        console.error('Error:', error)

}}
document.getElementById('formMahasiswa').addEventListener('submit', async function(event)
{
    event.preventDefault()
    const id = document.getElementById('id').value
    const nama = document.getElementById('nama').value
    const nim = document.getElementById('nim').value
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
            body: JSON.stringify({ nama, nim, fakultas })
        })
        const result = await response.json()
        alert((result.message || 'Operasi berhasil'))
        document.getElementById('formMahasiswa').reset()
        document.getElementById('id').value = ''
        bacaData()

    }catch (error) {
        console.error('Error:', error)
        alert('Terjadi kesalahan pada sistem')
    }
})

window.editData = function(id, nama, nim, fakultas){
    document.getElementById('id').value = id
    document.getElementById('nama').value = nama
    document.getElementById('nim').value = nim
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