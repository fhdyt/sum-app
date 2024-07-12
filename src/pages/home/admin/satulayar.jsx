import { useEffect, useState } from "react"
import { getAuthToken } from "../../../helpers/auth"
import axios from "../../../api/axios"
import { rupiahFormat } from "../../../helpers/numberFormat"
import { dateFormat } from "../../../helpers/dateTimeFormat"
import Loading from "../../../components/Loading"

const TabSatulayar = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const token = getAuthToken()
            const response = await axios.get('/satulayar/admin',
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
    return (
        <>
            <Loading status={isLoading} />
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
                                <td><b>{item.kegiatan}</b><br />
                                    <div className="flex flex-row gap-1 mt-2 text-xs">

                                        {
                                            item.barang.map((itemBarang, index) => (
                                                <p className="border border-slate-800 bg-slate-800 text-white px-4 py-0.5 rounded-full" key={index}>{itemBarang.barang != null ? itemBarang.barang['nama'] : '-'}</p>
                                            ))
                                        }
                                    </div>
                                </td>
                                <td>{item.jumlah_hari} Hari<br />{dateFormat(item.tanggal_pemesanan)} - {dateFormat(item.tanggal_pengembalian)}</td>
                                <td>{item.pengantaran}</td>
                                <td>{item.lokasi}<br />{rupiahFormat(item.lokasi_harga)}</td>
                                <td>{rupiahFormat(item.total)}</td>
                                <td>
                                    {item.user ? item.user['user_name'] : '-'}
                                    <br />
                                    {item.user ? item.user['user_phone'] : '-'}
                                </td>
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
        </>
    )
}

export default TabSatulayar