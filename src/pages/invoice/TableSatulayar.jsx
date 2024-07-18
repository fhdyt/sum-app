import React, { useEffect } from 'react'
import { rupiahFormat } from '../../helpers/numberFormat'

function TableSatulayar({ data }) {
    const total = parseInt(data.total)
    const tax = parseInt(total) * 0.11
    const grandTotal = parseInt(total) + parseInt(tax)
    useEffect(() => {
        console.log(data)
    })
    return (
        <table className="w-full border-collapse mb-4">
            <thead>
                <tr>
                    <th className="border p-2 text-left">Description</th>
                    <th className="border p-2 text-right">Detail</th>
                    <th className="border p-2 text-right">Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border p-2">
                        {data.kegiatan}<br />
                        {data.jumlah_hari} Hari
                        <br />
                        <div className="flex flex-row gap-1 mt-2 text-xs">

                            {
                                data.barang ? data.barang.map((itemBarang, index) => (
                                    <p className="border border-slate-800 bg-slate-800 text-white px-4 py-0.5 rounded-full" key={index}>{itemBarang.barang != null ? itemBarang.barang['nama'] : '-'}</p>
                                ))
                                    : ''
                            }
                        </div>
                    </td>
                    <td className="border p-2 text-right">
                        {data.pengantaran}<br />
                        {data.lokasi}
                    </td>
                    <td className="border p-2 text-right">{rupiahFormat(total)}</td>
                </tr>

            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="2" className="border p-2 text-right font-semibold">Subtotal</td>
                    <td className="border p-2 text-right">{rupiahFormat(total)}</td>
                </tr>
            </tfoot>
        </table>
    )
}

export default TableSatulayar