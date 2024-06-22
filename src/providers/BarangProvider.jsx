import { createContext, useState, useEffect, useCallback } from 'react';
import axios from '../api/axios';
import { getAuthToken } from '../helpers/auth';

const BarangContext = createContext();

const BarangProvider = ({ children }) => {
    const [barangOptions, setBarangOptions] = useState([]);

    const fetchAccountOptions = useCallback(async () => {
        try {
            const token = getAuthToken()
            const response = await axios.get('/barang/',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true
                }
            );
            const accountOptions = response.data.map(account => ({
                value: account.id,
                label: account.nama,
                key: account.id,
                nama: account.nama,
                gambar: account.gambar,
                harga: account.harga

            }));
            // console.log(accountOptions)
            setBarangOptions(prevState => [...prevState, ...accountOptions]);
        } catch (error) {
            console.error('Error fetching bank options:', error);
        }
    }, []);

    useEffect(() => {
        fetchAccountOptions();
    }, [fetchAccountOptions]);

    return (
        <BarangContext.Provider value={{ barangOptions }}>
            {children}
        </BarangContext.Provider>
    );
};

export { BarangContext, BarangProvider };