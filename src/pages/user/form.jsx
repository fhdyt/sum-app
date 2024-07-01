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
        user_username: '',
        user_name: '',
        user_phone: '',
        role: '',
    })

    const role = [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
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
            const response = await axios.get('/auth/' + id,
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
                user_username: response.data.user_username,
                user_name: response.data.user_name,
                user_phone: response.data.user_phone,
                role: response.data.role,
            })
            // setCheckedItems(JSON.parse(response.data.kelengkapan))

        } catch (err) {
            setIsLoading(false)
            console.error(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {

            const token = getAuthToken()
            const response = await axios.post('/auth/register',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true
                }
            );
            navigate('/user')
        }
        catch (err) {
            setIsLoading(false)
            console.error(err)
        }

    }

    const handleUpload = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            const file = e.target.files[0]; // Mengambil file pertama dari input

            if (file) {
                formData.append('photo', file);
            } else {
                console.error('No file selected');
                return;
            }

            const token = getAuthToken();
            const result = await axios.post('/img', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true
            });

            console.log(result.data);
            setData({
                ...data,
                gambar: result.data.img
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-md max-w-md space-y-8 mx-auto">
            <form className="mt-8 space-y-5" onSubmit={handleSubmit} >
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm flex flex-col gap-1">
                    <div className="input-container">
                        <label htmlFor="user_name" className="input-label">Nama</label>
                        <input id="user_name" name="user_name" value={data.user_name} onChange={(e) => setData({ ...data, user_name: e.target.value })} type="text" autoComplete="user_name" required
                            className="input-text"
                            placeholder="Nama" />
                    </div>
                    <div className="input-container">
                        <label htmlFor="user_phone" className="input-label">Phone</label>
                        <input id="user_phone" name="user_phone" value={data.user_phone} onChange={(e) => setData({ ...data, user_phone: e.target.value })} type="text" autoComplete="user_phone" required
                            className="input-text"
                            placeholder="Phone" />
                    </div>
                    <div className="input-container">
                        <label htmlFor="user_username" className="input-label">Username</label>
                        <input id="user_username" name="user_username" value={data.user_username} onChange={(e) => setData({ ...data, user_username: e.target.value })} type="text" autoComplete="user_username" required
                            className="input-text"
                            placeholder="Username" />
                    </div>
                    {
                        dataId ? <></>
                            :
                            <div className="input-container">
                                <label htmlFor="user_password" className="input-label">Password</label>
                                <input id="user_password" name="user_password" value={data.user_password} onChange={(e) => setData({ ...data, user_password: e.target.value })} type="text" autoComplete="user_password" required={dataId ? false : true}
                                    className="input-text"
                                    placeholder="Password" />
                            </div>
                    }

                    <div className="input-container">
                        <label htmlFor="role" className="input-label">Role</label>
                        <Select options={role} value={role.find(option => option.value === data.role)} onChange={(e) => setData({ ...data, role: e.value })} />
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