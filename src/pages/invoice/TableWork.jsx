import React, { useEffect } from 'react'

function TableWork({ data }) {
    useEffect(() => {

        console.log({ data })
    })
    return (
        <table className="w-full border-collapse mb-4">
            <thead>
                <tr>
                    <th className="border p-2 text-left">Description</th>
                    <th className="border p-2 text-right">Detail</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border p-2">
                        {data.perusahaan}
                        <br />{data.order}
                        <br />{data.bahan}
                    </td>
                    <td className="border p-2 text-right">
                        {data.venue}
                        <br />
                        Luas Ukuran : {data.ukuran_panjang} x {data.ukuran_lebar} m²
                        <br />Finishing : {data.finishing}
                    </td>

                </tr>

            </tbody>

        </table>
    )
}

export default TableWork