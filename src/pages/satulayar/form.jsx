import { useContext, useEffect, useState } from "react"
import axios from "../../api/axios"
import { getAuthToken } from "../../helpers/auth"
import { useNavigate, useParams } from "react-router-dom"
import { SiAlacritty } from "react-icons/si"
import Select from 'react-select'
import { BarangContext } from "../../providers/BarangProvider"
import { MdOutlineClose } from "react-icons/md"
import { numberFormat, rupiahFormat } from "../../helpers/numberFormat"
const Form = () => {
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    };
    const { barangOptions } = useContext(BarangContext)
    const navigate = useNavigate();
    const [data, setData] = useState({
        id: '',
        kegiatan: '',
        tanggal_pemesanan: '',
        tanggal_pengembalian: '',
        jumlah_hari: 0,
        pengantaran: '',
        pengantaran_harga: 0,
        lokasi: '',
        lokasi_harga: 0,
        total_barang: 0,
        total: 0,
    })

    const [formBarang, setFormBarang] = useState({
        id_barang: '',
        qty: 0,
        total: 0,
        barang: {
            id: '',
            nama: '',
            gambar: '',
            harga: 0,
        }
    })
    const [barangData, setBarangData] = useState([

    ])

    const pengantaran = [
        { value: 'Diantar', label: 'Diantar', harga: 50000 },
        { value: 'Jemput', label: 'Jemput', harga: 0 },
    ]

    const lokasi = [
        { value: '', label: 'Tidak Pilih', harga: 0 },
        { value: 'Dalam Kota', label: 'Dalam Kota', harga: 100000 },
        { value: 'Luar Kota', label: 'Luar Kota', harga: 400000 },
    ]

    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()
    const [dataId] = useState(id !== undefined ? true : false)

    useEffect(() => {
        if (dataId) {
            fetchData();
        }
    }, [dataId])

    useEffect(() => {
        console.log('Running sumGrandTotal');
        const grandTotal = (data.jumlah_hari * data.total_barang) + (data.pengantaran_harga + data.lokasi_harga);
        setData(prevData => ({
            ...prevData,
            total: grandTotal
        }));
    }, [data.jumlah_hari, data.total_barang, data.pengantaran_harga, data.lokasi_harga]);
    const fetchData = async () => {
        setIsLoading(true)
        try {
            const token = getAuthToken()
            const response = await axios.get('/satulayar/' + id,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true
                }
            );
            console.log(response.data)
            setIsLoading(false)
            setData({
                id: response.data.id,
                kegiatan: response.data.kegiatan,
                tanggal_pemesanan: response.data.tanggal_pemesanan,
                tanggal_pengembalian: response.data.tanggal_pengembalian,
                jumlah_hari: response.data.jumlah_hari,
                pengantaran: response.data.pengantaran,
                pengantaran_harga: response.data.pengantaran_harga,
                lokasi: response.data.lokasi,
                lokasi_harga: response.data.lokasi_harga,
                total_barang: response.data.total_barang,
                total: response.data.total,
            })
            setBarangData(response.data.barang)
            // setCheckedItems(JSON.parse(response.data.kelengkapan))

        } catch (err) {
            setIsLoading(false)
            console.error(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const dataToPost = {
                ...data,
                barang: barangData
            }
            const token = getAuthToken()
            const response = await axios.post('/satulayar/',
                dataToPost,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true
                }
            );
            navigate('/satulayar')
        }
        catch (err) {
            setIsLoading(false)
            console.error(err)
        }

    }

    const handleAddBarang = (e) => {
        console.log(barangData)
        const newBarangData = [...barangData, formBarang];
        setBarangData(newBarangData);

        const totalHargaBaru = newBarangData.reduce((sum, barang) => sum + parseInt(barang.qty * barang.barang.harga), 0);

        // Memperbarui state data dengan total_barang baru
        setData(prevData => ({
            ...prevData,
            total_barang: totalHargaBaru,
        }));

        // sumGrandTotal();
    }

    const handleTanggal = (e) => {
        const { name, value } = e.target;
        setData(prevData => {
            const newData = { ...prevData, [name]: value };

            // Menghitung jumlah hari jika kedua tanggal telah diisi
            if (newData.tanggal_pemesanan && newData.tanggal_pengembalian) {
                const tanggalPemesanan = new Date(newData.tanggal_pemesanan);
                const tanggalPengembalian = new Date(newData.tanggal_pengembalian);

                const timeDiff = tanggalPengembalian - tanggalPemesanan;
                const jumlahHari = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Konversi milidetik ke hari

                newData.jumlah_hari = jumlahHari;
            }

            return newData;
        });

        // sumGrandTotal();
    };

    const sumGrandTotal = () => {
        const grandTotal = (data.jumlah_hari * data.total_barang) + (data.pengantaran_harga + data.lokasi_harga);
        setData({
            ...data,
            total: grandTotal
        })
    }

    const handlePengantaran = (e) => {
        console.log(e)
        setData({ ...data, pengantaran: e.value, pengantaran_harga: e.harga })
        // if (e.value === 'Jemput') {
        //     setData({ ...data, lokasi: '', lokasi_harga: 0 })
        // }
        // sumGrandTotal();
    }
    useEffect(() => {
        if (data.pengantaran === 'Jemput') {
            setData({ ...data, lokasi: '', lokasi_harga: 0 })
        }
    }, [data.pengantaran])

    const handleLokasi = (e) => {
        setData({ ...data, lokasi: e.value, lokasi_harga: e.harga })
        // sumGrandTotal();
    }
    return (
        <div className="max-w-6xl  mx-auto flex-row flex gap-5 items-start">
            <form className="w-4/6 " onSubmit={handleSubmit} >
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm flex flex-col gap-1">
                    <div className="input-container">
                        <label htmlFor="kegiatan" className="input-label">Kegiatan</label>
                        <input id="kegiatan" name="kegiatan" value={data.kegiatan} onChange={(e) => setData({ ...data, kegiatan: e.target.value })} type="text" autoComplete="kegiatan" required
                            className="input-text"
                            placeholder="Kegiatan" />
                    </div>
                    <div className="input-container">
                        <label htmlFor="barang" className="input-label">Barang</label>
                        <div className="flex flex-row gap-2 w-full">
                            <Select className="w-full" options={barangOptions} onChange={(e) => setFormBarang({ ...formBarang, total: e.harga * formBarang.qty, barang: { id: e.value, nama: e.nama, gambar: e.gambar, harga: e.harga } })} />
                            <input id="qty" name="qty" value={data.qty} onChange={(e) => setFormBarang({ ...formBarang, total: formBarang.barang.harga * e.target.value, qty: e.target.value })} type="text"
                                className="input-text"
                            />
                            <a className="submit-button bg-blue-600" onClick={handleAddBarang}>Add</a>
                        </div>
                        <div className="w-full flex flex-col gap-1">

                        </div>
                        {
                            barangData.map((item, index) => (
                                <div key={index} className="w-full flex flex-row gap-1 rounded-md bg-green-200 overflow-hidden">
                                    <div className="w-36">
                                        <img src={`${import.meta.env.VITE_CLIENT_API_URL}/${item.barang['gambar']}`} alt="" />
                                    </div>
                                    <div className="flex flex-col justify-center w-full px-2">
                                        <p className="font-bold text-xs flex flex-row">{item.barang['nama']} {rupiahFormat(item.barang['harga'])}</p>
                                        <p className="text-xs">{item.qty}</p>
                                        <p className="text-xs">{rupiahFormat(item.qty * item.barang['harga'])}</p>
                                    </div>
                                    <div onClick={() => setBarangData(barangData.filter((_, i) => i !== index))} className=" text-red-600 w-full flex flex-col justify-center items-end px-2">
                                        <MdOutlineClose />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="input-container">
                        <label htmlFor="tanggal_pemesanan" className="input-label">Tanggal Pemesanan</label>
                        <input id="tanggal_pemesanan" name="tanggal_pemesanan" value={data.tanggal_pemesanan} onChange={handleTanggal} type="date" autoComplete="tanggal_pemesanan" required
                            className="input-text"
                            placeholder="Tanggal Pemesanan" />
                    </div>
                    <div className="input-container">
                        <label htmlFor="tanggal_pengembalian" className="input-label">Tanggal Pengembalian</label>
                        <input id="tanggal_pengembalian" name="tanggal_pengembalian" value={data.tanggal_pengembalian} onChange={handleTanggal} type="date" autoComplete="tanggal_pengembalian" required
                            className="input-text"
                            placeholder="Tanggal Pengembalian" />
                    </div>
                    <div className="input-container">
                        <label htmlFor="pengantaran" className="input-label">Pengantaran</label>
                        <Select options={pengantaran} value={pengantaran.find(option => option.value === data.pengantaran)} onChange={handlePengantaran} />
                    </div>
                    {
                        data.pengantaran === 'Jemput' ?
                            <></>
                            :
                            <div className="input-container">
                                <label htmlFor="lokasi" className="input-label">Lokasi</label>
                                <Select options={lokasi} value={lokasi.find(option => option.value === data.lokasi)} onChange={handleLokasi} />
                            </div>
                    }

                </div>
                <div>
                    <button type="submit"
                        className="submit-button">
                        Simpan
                    </button>
                    <a onClick={() => console.log(barangData)}>Barang Data</a>
                    <a onClick={() => console.log(data)}>Data</a>
                </div>
            </form>
            <div className="w-2/6  text-xs">
                <div className="w-full flex-col flex gap-2">
                    <div className="flex flex-row justify-between ">
                        <p className="text-left">Jumlah Hari</p>
                        <p>{data.jumlah_hari}</p>
                    </div>
                    <div className="flex flex-row justify-between  ">
                        <p className="text-left">Total Barang</p>
                        <p>{rupiahFormat(data.total_barang)}</p>
                    </div>
                    <div className="flex flex-row justify-between  ">
                        <p className="text-left">Harga Pengantaran</p>
                        <p>{rupiahFormat(data.pengantaran_harga)}</p>
                    </div>
                    <div className="flex flex-row justify-between  ">
                        <p className="text-left">Harga Lokasi</p>
                        <p>{rupiahFormat(data.lokasi_harga)}</p>
                    </div>
                    <div className="devider"></div>
                    <div className="flex flex-row justify-between  ">
                        <p className="text-left">Total</p>
                        <p>{rupiahFormat(data.total)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form