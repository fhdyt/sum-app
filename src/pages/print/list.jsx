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
            const response = await axios.get('/print/',
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
            await axios.delete('/print/' + id,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true
                }
            );
            setData(data.filter((item) => item.id !== id))
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
            <Loading isLoading={isLoading} />
            <div className="max-w-4xl mx-auto flex flex-col">
                <div className="w-full">
                    <Link to="/print/form" className="submit-add w-fit">Tambah</Link>
                </div>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr >
                            <th>No</th>
                            <th>Keterangan</th>
                            <th>Cetak</th>
                            <th>Bahan</th>
                            <th>Ukuran</th>
                            <th>Finishing</th>
                            <th>Desain</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => (
                                <tr key={item.id}>
                                    <th>{index + 1}</th>
                                    <td><Link to={`form/${item.id}`}><b>{item.kegiatan}</b></Link>
                                    </td>
                                    <td>{item.cetak}</td>
                                    <td>{item.bahan}</td>
                                    <td>{parseInt(item.ukuran_panjang * item.ukuran_lebar)} m²</td>
                                    <td>{item.finishing}</td>
                                    <td><img src={`${import.meta.env.VITE_CLIENT_API_URL}/${item.desain}`} className="w-14  object-cover" alt="" /></td>
                                    <td><p onClick={() => cofirmDelete(item.id)} className="text-red-700"><CiTrash /></p></td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr >
                            <th>No</th>
                            <th>Keterangan</th>
                            <th>Cetak</th>
                            <th>Bahan</th>
                            <th>Ukuran</th>
                            <th>Finishing</th>
                            <th>Desain</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}

export default List