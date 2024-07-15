import React, { useState } from 'react'
import { getStatusClass } from '../helpers/statusColor'
import { MdOutlinePayments } from 'react-icons/md'
import { getAuthToken } from '../helpers/auth'
import axios from '../api/axios'
import { Link } from 'react-router-dom'
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia'

function StatusOrder({ id, status, pembayaran, table, onProcessComplete }) {
    const [isLoading, setIsLoading] = useState(false)
    const handleStatus = async (e) => {
        setIsLoading(true)
        if (status == '--') return false
        try {
            const data = {
                id: id,
                status: e.target.value,
                tableDb: table,
            };
            const token = getAuthToken()
            const response = await axios.post('/img/proses',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true
                }
            );

            setIsLoading(false)

            onProcessComplete()
        }
        catch (err) {
            setIsLoading(false)
            console.error(err)
        }
    }
    return (
        <div className="mt-2 flex-col flex gap-2">
            <div className=" flex flex-row justify-start items-center gap-1 ">
                <p className={`py-1 text-xs px-3 ${getStatusClass(status)} rounded-full text-center w-fit`}>{status}</p>
                {
                    status !== 'Menunggu Pembayaran' &&
                    <>
                        <a href={`${import.meta.env.VITE_CLIENT_API_URL}/${pembayaran}`} target="_blank"> <MdOutlinePayments /></a>

                        <a href={`/invoice/${table}/${id}`} target="_blank" rel="noopener noreferrer" className="btn btn-xs btn-ghost">
                            <LiaFileInvoiceDollarSolid />
                        </a>
                    </>
                }
            </div>
            {
                isLoading ? <p>Loading...</p>
                    :
                    status != 'Menunggu Pembayaran' &&

                    <select className="select select-bordered select-xs w-full max-w-xs" onChange={handleStatus}>
                        <option>--</option>
                        <option>Batal</option>
                        <option>Diproses</option>
                        <option>Persiapan Pengantaran</option>
                        <option>Proses Antar</option>
                        <option>Selesai</option>
                    </select>
            }
        </div>
    )
}

export default StatusOrder