import { useEffect, useState } from "react"
import axios from "../../api/axios"
import { getAuthToken } from "../../helpers/auth"
import { useNavigate, useParams } from "react-router-dom"
import { SiAlacritty } from "react-icons/si"
import Select from 'react-select'
const Form = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({
        id: '',
        kegiatan: '',
        venue: '',
        konsep: '',
        venue_panjang: '',
        venue_lebar: '',
        kapasitas_orang: '',
        panggung_lebar: '',
        panggung_panjang: '',
        kapasitas_sound: '',
    })
    const options = [
        'Sound',
        'Lighting',
        'AC',
        'Blower',
        'Dekor Meja',
        'Sarung Kursi',
        'Mini Garden',
        'Foto Both',
        'Backdrop Panggung',
        'MC',
        'Meja VIP',
        'Kusi VIP',
    ];
    const [checkedItems, setCheckedItems] = useState({});

    // Fungsi untuk mengelola perubahan checkbox
    const handleChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems({ ...checkedItems, [name]: checked });
    };
    const venue = [
        { value: 'Indoor', label: 'Indoor' },
        { value: 'Outdoor', label: 'Outdoor' },
    ]
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()
    const [dataId] = useState(id !== undefined ? true : false)

    useEffect(() => {
        if (dataId) {
            fetchData();
        }
    }, [dataId])

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const token = getAuthToken()
            const response = await axios.get('/eo/' + id,
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
            setData({
                id: response.data.id,
                kegiatan: response.data.kegiatan,
                venue: response.data.venue,
                konsep: response.data.konsep,
                venue_panjang: response.data.venue_panjang,
                venue_lebar: response.data.venue_lebar,
                kapasitas_orang: response.data.kapasitas_orang,
                panggung_lebar: response.data.panggung_lebar,
                panggung_panjang: response.data.panggung_panjang,
                kapasitas_sound: response.data.kapasitas_sound,
            })
            setCheckedItems(JSON.parse(response.data.kelengkapan))

        } catch (err) {
            setIsLoading(false)
            console.error(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const dataToSend = {
                ...data,
                checkbox: JSON.stringify(checkedItems),
            };
            console.log(dataToSend)
            const token = getAuthToken()
            const response = await axios.post('/eo/',
                dataToSend,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true
                }
            );
            navigate('/eo')
        }
        catch (err) {
            setIsLoading(false)
            console.error(err)
        }

    }
    return (
        <div className="w-md max-w-md space-y-8 mx-auto">
            <form className="mt-8 space-y-5" onSubmit={handleSubmit} >
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm flex flex-col gap-1">
                    <div className="input-container">
                        <label htmlFor="kegiatan" className="input-label">Kegiatan</label>
                        <input id="kegiatan" name="kegiatan" value={data.kegiatan} onChange={(e) => setData({ ...data, kegiatan: e.target.value })} type="text" autoComplete="kegiatan" required
                            className="input-text"
                            placeholder="Kegiatan" />
                    </div>
                    <div className="input-container">
                        <label htmlFor="venue" className="input-label">Venue</label>
                        <Select options={venue} value={venue.find(option => option.value === data.venue)} onChange={(e) => setData({ ...data, venue: e.value })} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="konsep" className="input-label">Konsep</label>
                        <textarea id="konsep" rows="4" name="konsep" value={data.konsep} onChange={(e) => setData({ ...data, konsep: e.target.value })} type="text" autoComplete="konsep" required
                            className="input-text"
                            placeholder="Konsep" />
                    </div>
                    <div className="input-container">
                        <label htmlFor="venue_panjang" className="input-label">Panjang Venue</label>
                        <input id="venue_panjang" name="venue_panjang" value={data.venue_panjang} onChange={(e) => setData({ ...data, venue_panjang: e.target.value })} type="text" autoComplete="venue_panjang" required
                            className="input-text"
                            placeholder="Panjang Venue" />
                    </div>
                    <div className="input-container">
                        <label htmlFor="venue_lebar" className="input-label">Lebar Venue</label>
                        <input id="venue_lebar" name="venue_lebar" value={data.venue_lebar} onChange={(e) => setData({ ...data, venue_lebar: e.target.value })} type="text" autoComplete="venue_lebar" required
                            className="input-text"
                            placeholder="Lebar Venue" />
                    </div>
                    <div className="input-container">
                        <label htmlFor="kapasitas_orang" className="input-label">Kapasitas Orang</label>
                        <input id="kapasitas_orang" name="kapasitas_orang" value={data.kapasitas_orang} onChange={(e) => setData({ ...data, kapasitas_orang: e.target.value })} type="text" autoComplete="kapasitas_orang" required
                            className="input-text"
                            placeholder="Kapasitas Orang" />
                    </div>
                    <div className="input-container">
                        <label htmlFor="panggung_panjang" className="input-label">Panjang Panggung</label>
                        <input id="panggung_panjang" name="panggung_panjang" value={data.panggung_panjang} onChange={(e) => setData({ ...data, panggung_panjang: e.target.value })} type="text" autoComplete="panggung_panjang" required
                            className="input-text"
                            placeholder="Panjang Panggung" />
                    </div>
                    <div className="input-container">
                        <label htmlFor="panggung_lebar" className="input-label">Lebar Panggung</label>
                        <input id="panggung_lebar" name="panggung_lebar" value={data.panggung_lebar} onChange={(e) => setData({ ...data, panggung_lebar: e.target.value })} type="text" autoComplete="panggung_lebar" required
                            className="input-text"
                            placeholder="Lebar Panggung" />
                    </div>
                    <div className="input-container">
                        <label htmlFor="kapasitas_sound" className="input-label">Kapasitas Sound</label>
                        <input id="kapasitas_sound" name="kapasitas_sound" value={data.kapasitas_sound} onChange={(e) => setData({ ...data, kapasitas_sound: e.target.value })} type="text" autoComplete="kapasitas_sound" required
                            className="input-text"
                            placeholder="Kapasitas Sound" />
                    </div>
                    <div className="input-container">
                        <label htmlFor="venue_panjang" className="input-label">Kelengkapan</label>
                        <div className="grid grid-cols-3 gap-3 border-2 p-2 rounded-md">
                            {options.map((option, index) => (
                                <div key={index} className="text-sm">
                                    <label className=" flex flex-row gap-2 items-center">
                                        <input
                                            type="checkbox"
                                            name={option}
                                            checked={checkedItems[option] || false}
                                            onChange={handleChange}
                                        />
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit"
                        className="submit-button">
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Form