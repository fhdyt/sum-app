import { useEffect, useState } from "react"
import { getAuthToken } from "../../../helpers/auth"
import axios from "../../../api/axios"
import { rupiahFormat } from "../../../helpers/numberFormat"
import { dateFormat } from "../../../helpers/dateTimeFormat"

const TabWork = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const token = getAuthToken()
            const response = await axios.get('/work/admin',
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
            <table className="table">
                {/* head */}
                <thead>
                    <tr >
                        <th>No</th>
                        <th>Perusahaan</th>
                        <th>Order</th>
                        <th>Bahan</th>
                        <th>Ukuran</th>
                        <th>Detail</th>
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
                                <td><b>{item.perusahaan}</b>
                                </td>
                                <td>{item.order}</td>
                                <td>{item.bahan}</td>
                                <td>{parseInt(item.ukuran_panjang * item.ukuran_lebar)} m²</td>
                                <td>{item.detail} Orang</td>
                                <td>{item.finishing}</td>
                                <td><img src={`${import.meta.env.VITE_CLIENT_API_URL}/${item.desain}`} className="w-14  object-cover" alt="" /></td>
                                <td>
                                    {item.user['user_name']}
                                    <br />
                                    {item.user['user_phone']}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                    <tr >
                        <th>No</th>
                        <th>Perusahaan</th>
                        <th>Order</th>
                        <th>Bahan</th>
                        <th>Ukuran</th>
                        <th>Detail</th>
                        <th>Finishing</th>
                        <th>Desain</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}

export default TabWork