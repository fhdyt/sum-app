import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { FcVoicePresentation } from "react-icons/fc";
import logo from '/src/assets/logo.png'
import Loading from "../../components/Loading";
import { getAuthToken } from "../../helpers/auth";
const Page = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        id: '',
        user_username: '',
        user_name: '',
        user_phone: '',
        role: 'user',
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {

            const token = getAuthToken()
            const response = await axios.post('/auth/register-public',
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
            navigate('/login')
            // if (response.data.status) {
            // }
        }
        catch (err) {
            setIsLoading(false)
            console.error(err)
        }

    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home')
        }
    })
    return (
        <>
            <Loading status={isLoading} />
            <div className="min-h-screen  flex items-center justify-center bg-base-300 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-sm  shadow-xl w-full  px-7 py-10 bg-white rounded-lg">
                    <div className="flex flex-col justify-center items-center">
                        <img src={logo} alt="logo" className="h-24" />
                        <h2 className=" text-center text-2xl font-extrabold text-gray-900">Buat Akun</h2>
                        <p className="text-center text-sm text-gray-500 font-bold">Create your Account</p>
                    </div>
                    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
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
                            <div className="input-container">
                                <label htmlFor="user_password" className="input-label">Password</label>
                                <input id="user_password" name="user_password" value={data.user_password} onChange={(e) => setData({ ...data, user_password: e.target.value })} type="text" autoComplete="user_password"
                                    className="input-text"
                                    placeholder="Password" />
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-2 justify-start items-center ">
                            <button type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                                Daftar
                            </button>
                            <p>Sudah punya akun? <Link to={"/login"} className="text-blue-500">Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Page