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
            const response = await axios.get('/satulayar/',
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
            await axios.delete('/satulayar/' + id,
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
            <Loading status={isLoading} />
            <div className="max-w-5xl mx-auto flex flex-col">
                <div className="w-full">
                    <Link to="/satulayar/form" className="submit-add w-fit">Tambah</Link>
                </div>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr >
                            <th>No</th>
                            <th>Kegiatan</th>
                            <th>Jumlah Hari</th>
                            <th>Pengantaran</th>
                            <th>Lokasi</th>
                            <th>Total Harga</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => (
                                <tr key={item.id}>
                                    <th>{index + 1}</th>
                                    <td><Link to={`form/${item.id}`}><b>{item.kegiatan}</b><br />
                                        <div className="flex flex-row gap-1 mt-2 text-xs">

                                            {
                                                item.barang.map((itemBarang, index) => (
                                                    <p className="border border-slate-800 bg-slate-800 text-white px-4 py-0.5 rounded-full" key={index}>{itemBarang.barang['nama']}</p>
                                                ))
                                            }
                                        </div>
                                    </Link>
                                    </td>
                                    <td>{item.jumlah_hari} Hari<br />{dateFormat(item.tanggal_pemesanan)} - {dateFormat(item.tanggal_pengembalian)}</td>
                                    <td>{item.pengantaran}</td>
                                    <td>{item.lokasi}<br />{rupiahFormat(item.lokasi_harga)}</td>
                                    <td>{rupiahFormat(item.total)}</td>
                                    <td><p onClick={() => cofirmDelete(item.id)} className="text-red-700"><CiTrash /></p></td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr >
                            <th>No</th>
                            <th>Kegiatan</th>
                            <th>Jumlah Hari</th>
                            <th>Pengantaran</th>
                            <th>Lokasi</th>
                            <th>Total Harga</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}

export default List