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
const List = () => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)


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