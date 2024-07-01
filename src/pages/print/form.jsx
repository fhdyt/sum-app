import { useEffect, useState } from "react"
import axios from "../../api/axios"
import { getAuthToken } from "../../helpers/auth"
import { useNavigate, useParams } from "react-router-dom"
import { SiAlacritty } from "react-icons/si"
import Select from 'react-select'
import { rupiahFormat } from "../../helpers/numberFormat"
const Form = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({
        id: '',
        perusahaan: '',
        order: '',
        bahan: '',
        bahan_harga: '',
        ukuran_panjang: '',
        ukuran_lebar: '',
        detail: '',
        finishing: '',
        desain: '',
        total: 0
    })

    const bahan = [
        { value: '280 gsm', label: '280 gsm', harga: 15000 },
        { value: '340 gsm', label: '340 gsm', harga: 20000 },
    ]

    const cetak = [
        { value: 'Spanduk', label: 'Spanduk' },
        { value: 'Baliho', label: 'Baliho' },
        { value: 'Banner', label: 'Banner' },
    ]

    const finishing = [
        { value: 'Selongsong', label: 'Selongsong' },
        { value: 'Mata Ikan', label: 'Mata Ikan' },
        { value: 'Lebih Bahan', label: 'Lebih Bahan' },
    ]

    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()
    const [dataId] = useState(id !== undefined ? true : false)

    useEffect(() => {
        if (dataId) {
            fetchData();
        }
    }, [dataId])

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const token = getAuthToken()
            const response = await axios.get('/print/' + id,
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
                cetak: response.data.cetak,
                bahan: response.data.bahan,
                bahan_harga: response.data.bahan_harga,
                ukuran_panjang: response.data.ukuran_panjang,
                ukuran_lebar: response.data.ukuran_lebar,
                detail: response.data.detail,
                finishing: response.data.finishing,
                desain: response.data.desain,
                total: response.data.total
            })
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

            const token = getAuthToken()
            const response = await axios.post('/print/',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true
                }
            );
            navigate('/print')
        }
        catch (err) {
            setIsLoading(false)
            console.error(err)
        }

    }

    const handleUpload = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            const file = e.target.files[0]; // Mengambil file pertama dari input

            if (file) {
                formData.append('photo', file);
            } else {
                console.error('No file selected');
                return;
            }

            const token = getAuthToken();
            const result = await axios.post('/img', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true
            });

            console.log(result.data);
            setData({
                ...data,
                desain: result.data.img
            });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const total = data.ukuran_panjang * data.ukuran_lebar * data.bahan_harga
        setData({ ...data, total: total })
    }, [data.ukuran_panjang, data.ukuran_lebar, data.bahan_harga])
    return (
        <div className="w-md max-w-md space-y-8 mx-auto">
            <form className="mt-8 space-y-5" onSubmit={handleSubmit} >
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm flex flex-col gap-1">
                    <div className="input-container">
                        <label htmlFor="kegiatan" className="input-label">Kegiatan</label>
                        <input id="kegiatan" name="kegiatan" value={data.kegiatan} onChange={(e) => setData({ ...data, kegiatan: e.target.value })} type="text" autoComplete="kegiatan" required
                            className="input-text"
                            placeholder="Kegiatan" />
                    </div>
                    <div className="input-container">
                        <label htmlFor="cetak" className="input-label">Cetak</label>
                        <Select options={cetak} value={cetak.find(option => option.value === data.cetak)} onChange={(e) => setData({ ...data, cetak: e.value })} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="bahan" className="input-label">Bahan</label>
                        <Select options={bahan} value={bahan.find(option => option.value === data.bahan)} onChange={(e) => setData({ ...data, bahan: e.value, bahan_harga: e.harga })} />
                    </div>

                    <div className="input-container">
                        <label htmlFor="ukuran_panjang" className="input-label">Panjang Ukuran</label>
                        <input id="ukuran_panjang" name="ukuran_panjang" value={data.ukuran_panjang} onChange={(e) => setData({ ...data, ukuran_panjang: e.target.value })} type="text" autoComplete="ukuran_panjang" required
                            className="input-text"
                            placeholder="Panjang Ukuran" />
                    </div>
                    <div className="input-container">
                        <label htmlFor="ukuran_lebar" className="input-label">Lebar Ukuran</label>
                        <input id="ukuran_lebar" name="ukuran_lebar" value={data.ukuran_lebar} onChange={(e) => setData({ ...data, ukuran_lebar: e.target.value })} type="text" autoComplete="ukuran_lebar" required
                            className="input-text"
                            placeholder="Lebar Ukuran" />
                    </div>
                    <div className="input-container">
                        <label htmlFor="finishing" className="input-label">Finishing</label>
                        <Select options={finishing} value={finishing.find(option => option.value === data.finishing)} onChange={(e) => setData({ ...data, finishing: e.value })} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="finishing" className="input-label">Desain</label>
                        <img src={`${import.meta.env.VITE_CLIENT_API_URL}/${data.desain}`} className="w-36  object-cover" alt="" />

                        <input type='file' className="file-input" name="bgImg" onChange={handleUpload} />
                    </div>
                    <div className="input-container text-xs">
                        <div className="w-full flex-col flex gap-2">
                            <div className="flex flex-row justify-between ">
                                <p className="text-left">Harga Bahan</p>
                                <p>{rupiahFormat(data.bahan_harga)}</p>
                            </div>
                            <div className="flex flex-row justify-between  ">
                                <p className="text-left">Luas</p>
                                <p>{(data.ukuran_panjang * data.ukuran_lebar)}</p>
                            </div>
                            <div className="divider divider-end">+</div>
                            <div className="flex flex-row justify-between font-bold text-base  ">
                                <p className="text-left">Total</p>
                                <p>{rupiahFormat(data.total)}</p>
                            </div>
                        </div>
                    </div>


                </div>
                <div>
                    <button type="submit"
                        className="submit-button">
                        Simpan
                    </button>

                </div>
            </form>
        </div>
    )
}

export default Form