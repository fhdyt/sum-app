import { useEffect, useState } from "react"
import { getAuthToken } from "../../../helpers/auth"
import axios from "../../../api/axios"
import { rupiahFormat } from "../../../helpers/numberFormat"
import Loading from "../../../components/Loading"
import { getStatusClass } from "../../../helpers/statusColor"
import StatusOrder from "../../../components/StatusOrder"
import DetailUser from "../../../components/DetailUser"

const TabPrint = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const token = getAuthToken()
            const response = await axios.get('/print/admin',
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
                        <th>Keterangan</th>
                        <th>Cetak</th>
                        <th>Bahan</th>
                        <th>Ukuran</th>
                        <th>Finishing</th>
                        <th>Total</th>
                        <th>Desain</th>
                        <th>User</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => (
                            <tr key={item.id}>
                                <th>{index + 1}</th>
                                <td><b>{item.kegiatan}</b>
                                    <br />
                                    <StatusOrder id={item.id} status={item.status} est={item.est} pembayaran={item.pembayaran} onProcessComplete={fetchData} table="print" />

                                </td>
                                <td>{item.cetak}</td>
                                <td>{item.bahan}<br /> {rupiahFormat(item.bahan_harga)}</td>
                                <td>{parseFloat(item.ukuran_panjang * item.ukuran_lebar)} m²</td>
                                <td>{item.finishing}</td>
                                <td>{rupiahFormat(item.total)}</td>
                                <td><img src={`${import.meta.env.VITE_CLIENT_API_URL}/${item.desain}`} className="w-14  object-cover" alt="" /></td>
                                <td>
                                    {item.user ? <DetailUser nama={item.user['user_name']} phone={item.user['user_phone']} /> : '-'}

                                </td>
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
                        <th>User</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}

export default TabPrint