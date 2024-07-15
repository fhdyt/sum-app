import React, { useEffect, useState } from 'react'
import logo from '/src/assets/logo.png'
import { useParams } from 'react-router-dom';
import { getAuthToken } from '../../helpers/auth';
import axios from '../../api/axios';
import TableEo from './TableEo';
import TableWork from './TableWork';
import TablePrint from './TablePrint';
import TableSatulayar from './TableSatulayar';

function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({});
    const { table, id } = useParams();
    const tableNo = table.toUpperCase();
    const padWithZeroes = (number, length) => {
        return number.toString().padStart(length, '0');
    };
    const idNo = padWithZeroes(id, 5);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const token = getAuthToken()
            const response = await axios.get(`/${table}/${id}`,
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

    const tableContent = () => {
        switch (table) {
            case 'eo':
                return <TableEo data={data} />
            case 'work':
                return <TableWork data={data} />
            case 'print':
                return <TablePrint data={data} />
            case 'satulayar':
                return <TableSatulayar data={data} />
            default:
                return null
        }
    }
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <header className="flex justify-between items-center border-b pb-4 mb-4">
                <div>
                    <h1 className="text-3xl font-bold">Invoice</h1>
                    <p className="text-gray-600">#{tableNo}{idNo}</p>
                </div>
                <div className="text-right">
                    <div className="flex items-center w-full justify-end ">
                        <img src={logo} alt="Company Logo" className="h-12" />
                    </div>
                    <h2 className="text-xl font-semibold">Sum1</h2>
                    <p className="text-gray-600">Excellent Exalted Experience</p>
                </div>
            </header>
            <section>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Bill To:</h3>
                    <p>{data?.user?.user_name}</p>
                    <p>{data?.user?.user_phone}</p>
                </div>
                {/* <table className="w-full border-collapse mb-4">
                    <thead>
                        <tr>
                            <th className="border p-2 text-left">Description</th>
                            <th className="border p-2 text-right">Quantity</th>
                            <th className="border p-2 text-right">Unit Price</th>
                            <th className="border p-2 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border p-2">Product 1</td>
                            <td className="border p-2 text-right">2</td>
                            <td className="border p-2 text-right">$50.00</td>
                            <td className="border p-2 text-right">$100.00</td>
                        </tr>
                        <tr>
                            <td className="border p-2">Product 2</td>
                            <td className="border p-2 text-right">1</td>
                            <td className="border p-2 text-right">$75.00</td>
                            <td className="border p-2 text-right">$75.00</td>
                        </tr>
                        <tr>
                            <td className="border p-2">Service 1</td>
                            <td className="border p-2 text-right">3</td>
                            <td className="border p-2 text-right">$20.00</td>
                            <td className="border p-2 text-right">$60.00</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3" className="border p-2 text-right font-semibold">Subtotal</td>
                            <td className="border p-2 text-right">$235.00</td>
                        </tr>
                        <tr>
                            <td colSpan="3" className="border p-2 text-right font-semibold">Tax (10%)</td>
                            <td className="border p-2 text-right">$23.50</td>
                        </tr>
                        <tr>
                            <td colSpan="3" className="border p-2 text-right font-semibold">Total</td>
                            <td className="border p-2 text-right">$258.50</td>
                        </tr>
                    </tfoot>
                </table> */}

                {
                    tableContent()
                }
            </section>
            <footer className="border-t pt-4">
                <p className="text-gray-600">Thank you for your business!</p>
            </footer>
        </div>
    )
}

export default Page