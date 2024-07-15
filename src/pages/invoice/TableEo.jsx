import React, { useEffect } from 'react'

function TableEo({ data }) {
    useEffect(() => {

        console.log({ data })
    })
    return (
        <table className="w-full border-collapse mb-4">
            <thead>
                <tr>
                    <th className="border p-2 text-left">Description</th>
                    <th className="border p-2 text-right">Venue</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border p-2">
                        {data.kegiatan}
                        <br />{data.konsep}
                        <br />
                        {data.kelengkapan && (
                            <>
                                {Object.entries(JSON.parse(data.kelengkapan))
                                    .filter(([key, value]) => value === true)
                                    .map(([key]) => key)
                                    .join(', ')}
                            </>
                        )}
                    </td>
                    <td className="border p-2 text-right">
                        {data.venue}
                        <br />
                        Luas Venue : {data.venue_panjang} x {data.venue_lebar} m²
                        <br />
                        Luas Panggung : {data.panggung_panjang} x {data.panggung_lebar} m²
                        <br />
                        Kapasitas Orang : {data.kapasitas_orang}
                        <br />
                        Kapasitas Sound : {data.kapasitas_sound}
                    </td>

                </tr>

            </tbody>

        </table>
    )
}

export default TableEo