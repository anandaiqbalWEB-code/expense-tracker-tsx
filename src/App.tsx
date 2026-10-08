import { useState } from "react";

type transaksi = {
  id: number,
  nama: string,
  nomor: number,
  kategori: string
}

function App() {

  const [nama, setNama] = useState<string>("")
  const [nomor, setNomor] = useState<number | "">("")
  const [kategori, setKategori] = useState<string>("Makanan")

  const [transaksi, setTransaksi] = useState<transaksi[]>([])

  function kirimPengeluaran() {

    if (!nama || nomor === "" || nomor <= 0) return alert("isi bro");

    const dataBaru: transaksi = {
      id: Date.now(),
      nama: nama,
      nomor: nomor,
      kategori: kategori
    }

    setTransaksi([...transaksi, dataBaru])

    setNama("")
    setNomor("")

  }

  function hapusTransaksi(id: number) {

    setTransaksi(transaksi.filter((item) => item.id !== id))
  }

  const total = transaksi.reduce(
    (hasil, item) => hasil + item.nomor,
    0
  )

  return (
    <div className="bg-pink-400 flex ***** flex-col justify-center items-center h-screen">

      <h1 className="mb-5 text-4xl font-bold">EXPENSE TRACKER</h1>

      <div className="flex flex-col gap-2 w-100 text-center">

        <div className="bg-white rounded w-full mx-auto p-3" >

          <p>Total pengeluaran</p>

          <p>Rp {total.toLocaleString("id-ID")}</p>

        </div>

        <div className="flex flex-col gap-2 w-full mx-auto p-4 bg-white rounded ">

          <input id="nama" name="nama"  type="text" value={nama} onChange={(e) => setNama(e.target.value)} className="border rounded" placeholder="Masukkan nama" />

          <input id="nomor" name="nomor" type="number" value={nomor} onChange={(e) => setNomor(e.target.value === "" ? "" : Number(e.target.value))} className="border rounded" placeholder="Masukkan nomor" />

          <select id="kategori" name="kategori" value={kategori} onChange={(e) => setKategori(e.target.value)} className="border rounded">

            <option>Makanan</option>
            <option>Transportasi</option>
            <option>Belanja</option>
            <option>Tagihan</option>
            <option>Dll</option>
          </select>

          <button onClick={kirimPengeluaran} className="border">Tambah</button>

        </div>

        <div className="pb-2 rounded bg-white">

          <h2 className="text-pink">Daftar Pengeluaran</h2>

          {transaksi.length === 0 ? (
            <h2>-- Belum ada transaksi --</h2>
          ) : (
            transaksi.map((item) => (
              <div key={item.id}>

                <div className="flex justify-between px-4">

                  <div>

                    <h2>{item.nama}</h2>

                    <p>{item.kategori}</p>

                  </div>

                  <div>

                    <p>Rp {item.nomor.toLocaleString("id-ID")}</p>

                    <button onClick={() => hapusTransaksi(item.id)} className="px-1 rounded bg-red-500 text-white">Hapus</button>

                  </div>


                </div>

                <hr className="mx-3 mt-2" />
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default App;