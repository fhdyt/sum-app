import { useEffect, useState } from "react"
import axios from "../../api/axios"
import { getAuthToken } from "../../helpers/auth"
import { useNavigate, useParams } from "react-router-dom"
import { SiAlacritty } from "react-icons/si"
import Select from 'react-select'
import Loading from "../../components/Loading"
const Form = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({
        id: '',
        perusahaan: '',
        order: '',
        bahan: '',
        ukuran_panjang: '',
        ukuran_lebar: '',
        detail: '',
        finishing: '',
        desain: '',
    })

    const bahan = [
        { value: 'Full Acrilyc', label: 'Full Acrilyc' },
        { value: 'Full Stainless', label: 'Full Stainless' },
        { value: 'Full Galvanic', label: 'Full Galvanic' },
        { value: 'Body Alumunium Depan Acrilyc', label: 'Body Alumunium Depan Acrilyc' },
        { value: 'Body Galvanic Depan Acrilyc', label: 'Body Galvanic Depan Acrilyc' },
    ]

    const order = [
        { value: 'Logo', label: 'Logo' },
        { value: 'Letter', label: 'Letter' },
        { value: 'Logo & Letter', label: 'Logo & Letter' },
    ]

    const finishing = [
        { value: 'Stiker', label: 'Stiker' },
        { value: 'Duko', label: 'Duko' },
        { value: 'Polos', label: 'Polos' },
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
            const response = await axios.get('/work/' + id,
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
                perusahaan: response.data.perusahaan,
                order: response.data.order,
                bahan: response.data.bahan,
                ukuran_panjang: response.data.ukuran_panjang,
                ukuran_lebar: response.data.ukuran_lebar,
                detail: response.data.detail,
                finishing: response.data.finishing,
                desain: response.data.desain,
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
            const response = await axios.post('/work/',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true
                }
            );
            navigate('/work')
        }
        catch (err) {
            setIsLoading(false)
            console.error(err)
        }

    }

    const handleUpload = async (e) => {
        setIsLoading(true)
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

            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            console.error(err);
        }
    };

    return (
        <>
            <Loading status={isLoading} />
            <div className="w-md max-w-md space-y-8 mx-auto">
                <form className="mt-8 space-y-5" onSubmit={handleSubmit} >
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm flex flex-col gap-1">
                        <div className="input-container">
                            <label htmlFor="perusahaan" className="input-label">Perusahaan</label>
                            <input id="perusahaan" name="perusahaan" value={data.perusahaan} onChange={(e) => setData({ ...data, perusahaan: e.target.value })} type="text" autoComplete="perusahaan" required
                                className="input-text"
                                placeholder="Perusahaan" />
                        </div>
                        <div className="input-container">
                            <label htmlFor="order" className="input-label">Order</label>
                            <Select options={order} value={order.find(option => option.value === data.order)} onChange={(e) => setData({ ...data, order: e.value })} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="bahan" className="input-label">Bahan</label>
                            <Select options={bahan} value={bahan.find(option => option.value === data.bahan)} onChange={(e) => setData({ ...data, bahan: e.value })} />
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

                            <input type='file' name="bgImg" className="file-input" onChange={handleUpload} />
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
        </>
    )
}

export default Form