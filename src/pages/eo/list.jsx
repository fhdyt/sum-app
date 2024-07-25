import { useEffect, useState } from "react"
import { getAuthToken } from "../../helpers/auth"
import axios from "../../api/axios"
import { FiPlus, FiTrash } from "react-icons/fi"
import { Link } from "react-router-dom"
import { ConfirmAlert } from "../../components/AlertSweet"
import Loading from "../../components/Loading"
import { rupiahFormat } from "../../helpers/numberFormat"
import { CiTrash } from "react-icons/ci"
import { dateFormat } from "../../helpers/dateTimeFormat"
import { getStatusClass } from "../../helpers/statusColor"
const List = () => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [showUpload, setShowUpload] = useState(null);

    const showUploadPembayaran = (id) => {
        setShowUpload(showUpload === id ? null : id);
    };

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const token = getAuthToken()
            const response = await axios.get('/eo/',
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
            setData(response.data)

        } catch (err) {
            setIsLoading(false)
            console.error(err)
        }
    }

    const deleteData = async (id) => {
        setIsLoading(true)
        try {
            const token = getAuthToken()
            await axios.delete('/eo/' + id,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true
                }
            );
            setData(data.filter((item) => item.id !== id))
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            console.error(err)
        }
    }
    const cofirmDelete = (id) => {
        ConfirmAlert('Hapus', 'Apakah anda yakin ingin menghapus data ini?', 'Hapus', true)
            .then((result) => {
                if (result.isConfirmed) {
                    deleteData(id)
                }
            })
    }

    const handleUpload = async (e, id, tableDb) => {
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

            formData.append('id', id);
            formData.append('tableDb', tableDb);

            const token = getAuthToken();
            await axios.post('/img/pembayaran', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true
            });
            setIsLoading(false)
            fetchData()
        } catch (err) {
            setIsLoading(false)
            console.error(err);
        }
    }

    return (
        <>
            <Loading status={isLoading} />
            <div className="w-full mx-auto flex flex-col">
                <div className="w-full">
                    <Link to="/eo/form" className="submit-add w-fit">Tambah</Link>
                </div>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr >
                            <th>No</th>
                            <th>Kegiatan</th>
                            <th>Venue</th>
                            <th>Luas Venue</th>
                            <th>Luas Panggung</th>
                            <th>Kapasitas Orang</th>
                            <th>Kapasitas Sound</th>
                            <th>Kapasitas Kelengkapan</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => (
                                <tr key={item.id}>
                                    <th>{index + 1}</th>
                                    <td><Link to={`form/${item.id}`}><b>{item.kegiatan}</b>
                                        <br />
                                        {item.konsep}
                                    </Link>
                                        <br />
                                        <p onClick={() => showUploadPembayaran(item.id)} className={`py-1 text-xs px-3 mt-2 ${getStatusClass(item.status)} rounded-full text-center w-fit`}>{item.status}{item.status == 'Menunggu Pembayaran' ? '' : ` (Est : ${item.est} Hari)`}</p>
                                        {showUpload === item.id && (
                                            <div className="flex flex-col gap-1 mt-2">
                                                <img src={`${import.meta.env.VITE_CLIENT_API_URL}/${item.pembayaran}`} className="w-36  object-cover" alt="" />

                                                {item.status === 'Menunggu Pembayaran' && <input type='file' name="bgImg" className="rounded-full input-xs file-input" onChange={(e) => handleUpload(e, item.id, "eo")} />}
                                            </div>
                                        )}
                                    </td>
                                    <td>{item.venue}</td>
                                    <td>{parseInt(item.venue_panjang * item.venue_lebar)} m²</td>
                                    <td>{parseInt(item.panggung_panjang * item.panggung_lebar)} m²</td>
                                    <td>{item.kapasitas_orang} Orang</td>
                                    <td>{item.kapasitas_sound}</td>
                                    <td>
                                        {item.kelengkapan && (
                                            <>
                                                {Object.entries(JSON.parse(item.kelengkapan))
                                                    .filter(([key, value]) => value === true)
                                                    .map(([key]) => key)
                                                    .join(', ')}
                                            </>
                                        )}
                                    </td>

                                    <td><p onClick={() => cofirmDelete(item.id)} className="text-red-700"><CiTrash /></p></td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr >
                            <th>No</th>
                            <th>Kegiatan</th>
                            <th>Venue</th>
                            <th>Luas Venue</th>
                            <th>Luas Panggung</th>
                            <th>Kapasitas Orang</th>
                            <th>Kapasitas Sound</th>
                            <th>Kapasitas Kelengkapan</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}

export default List