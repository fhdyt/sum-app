import { useEffect, useState } from "react"
import axios from "../../api/axios"
import { getAuthToken } from "../../helpers/auth"
import { useNavigate, useParams } from "react-router-dom"
import { SiAlacritty } from "react-icons/si"
import Select from 'react-select'
const Form = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({
        id: '',
        nama: '',
        harga: '',
        barang: '',
    })


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
            const response = await axios.get('/barang/' + id,
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
                nama: response.data.nama,
                harga: response.data.harga,
                gambar: response.data.gambar,
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
            const response = await axios.post('/barang/',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true
                }
            );
            navigate('/barang')
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
                gambar: result.data.img
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-md max-w-md space-y-8 mx-auto">
            <form className="mt-8 space-y-5" onSubmit={handleSubmit} >
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm flex flex-col gap-1">
                    <div className="input-container">
                        <label htmlFor="nama" className="input-label">Nama</label>
                        <input id="nama" name="nama" value={data.nama} onChange={(e) => setData({ ...data, nama: e.target.value })} type="text" autoComplete="nama" required
                            className="input-text"
                            placeholder="Nama" />
                    </div>
                    <div className="input-container">
                        <label htmlFor="harga" className="input-label">Harga</label>
                        <input id="harga" name="harga" value={data.harga} onChange={(e) => setData({ ...data, harga: e.target.value })} type="text" autoComplete="harga" required
                            className="input-text"
                            placeholder="Harga" />
                    </div>

                    <div className="input-container">
                        <label htmlFor="finishing" className="input-label">Gambar</label>
                        <img src={`${import.meta.env.VITE_CLIENT_API_URL}/${data.gambar}`} className="w-36  object-cover" alt="" />

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
    )
}

export default Form