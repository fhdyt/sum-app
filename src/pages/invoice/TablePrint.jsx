import React from 'react'
import { rupiahFormat } from '../../helpers/numberFormat'

function TablePrint({ data }) {
    const total = parseInt(data.total)
    const tax = parseInt(total) * 0.11
    const grandTotal = parseInt(total) + parseInt(tax)
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
                        {data.cetak}<br />
                        {data.bahan}<br />
                    </td>
                    <td className="border p-2 text-right">
                        Luas Ukuran : {data.ukuran_panjang} x {data.ukuran_lebar} m²
                        <br />
                        {data.finishing}
                    </td>
                    <td className="border p-2 text-right">{rupiahFormat(total)}</td>
                </tr>

            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="2" className="border p-2 text-right font-semibold">Subtotal</td>
                    <td className="border p-2 text-right">{rupiahFormat(total)}</td>
                </tr>
                <tr>
                    <td colSpan="2" className="border p-2 text-right font-semibold">Tax (11%)</td>
                    <td className="border p-2 text-right">{rupiahFormat(tax)}</td>
                </tr>
                <tr>
                    <td colSpan="2" className="border p-2 text-right font-semibold">Total</td>
                    <td className="border p-2 text-right">{rupiahFormat(grandTotal)}</td>
                </tr>
            </tfoot>
        </table>
    )
}

export default TablePrint