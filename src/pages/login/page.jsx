import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { FcVoicePresentation } from "react-icons/fc";

const Page = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        console.log(username, password)
        e.preventDefault();
        setIsLoading(true)
        try {
            const body = {
                username: username,
                password: password
            }
            const response = await axios.post('/auth/login',
                body,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(response.data)
            if (response.data.status) {
                localStorage.setItem('token', response?.data?.token);
                navigate('/home')
            }
            else {
                setIsLoading(false)
            }
        } catch (err) {
            setIsLoading(false)
            console.error(err)
        }

    }
    return (
        <div className="min-h-screen  flex items-center justify-center bg-base-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-sm  shadow-xl w-full  px-7 py-10 bg-white rounded-lg">
                <div className="flex flex-col justify-center items-center">
                    <FcVoicePresentation className="text-6xl" />
                    <h2 className=" text-center text-2xl font-extrabold text-gray-900">Login</h2>
                    <p className="text-center text-sm text-gray-500 font-bold">Please sign in to your account</p>
                </div>
                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm flex flex-col gap-1">
                        <div className="input-container">
                            <label htmlFor="username" className="input-label">Username</label>
                            <input id="username" name="username" type="text" autoComplete="username" required
                                className="input-text"
                                value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="username" className="input-label">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required
                                className="input-text"
                                placeholder="*****" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="w-full flex justify-start items-center ">
                        <button type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Page