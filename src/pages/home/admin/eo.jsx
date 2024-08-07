import { useEffect, useState } from "react"
import { getAuthToken } from "../../../helpers/auth"
import axios from "../../../api/axios"
import Loading from "../../../components/Loading"
import { getStatusClass } from "../../../helpers/statusColor"
import { MdOutlinePayments } from "react-icons/md"
import StatusOrder from "../../../components/StatusOrder"
import DetailUser from "../../../components/DetailUser"

const TabEo = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const token = getAuthToken()
            const response = await axios.get('/eo/admin',
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
                        <th>Konsep</th>
                        <th>Venue</th>
                        <th>Luas Venue</th>
                        <th>Luas Panggung</th>
                        <th>Kapasitas Orang</th>
                        <th>Kapasitas Sound</th>
                        <th>Kapasitas Kelengkapan</th>
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
                                    {item.konsep}
                                    <StatusOrder id={item.id} status={item.status} est={item.est} pembayaran={item.pembayaran} onProcessComplete={fetchData} table="eo" />
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
                        <th>Konsep</th>
                        <th>Venue</th>
                        <th>Luas Venue</th>
                        <th>Luas Panggung</th>
                        <th>Kapasitas Orang</th>
                        <th>Kapasitas Sound</th>
                        <th>Kapasitas Kelengkapan</th>
                        <th>User</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}

export default TabEo