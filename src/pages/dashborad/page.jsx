/* eslint-disable react/prop-types */
import { AiOutlineLogout } from "react-icons/ai";
import { FcVoicePresentation } from "react-icons/fc";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import logo from '/src/assets/logo.png'
import { useEffect } from "react";
import { verifyToken } from "../../helpers/auth";
const menu_user = [
    {
        name: "Beranda",
        link: "home"
    },

    {
        name: "Sum1 Eo",
        link: "eo"
    },
    {
        name: "Sum Work",
        link: "work"
    },
    {
        name: "Sum24 Print",
        link: "print"
    },

    {
        name: "Satu Layar",
        link: "satulayar"
    },


];

const menu_admin = [
    {
        name: "Beranda",
        link: "home"
    },
    {
        name: "User",
        link: "user"
    },
    {
        name: "Master Barang",
        link: "barang"
    },
]

function MenuItem({ item }) {
    if (item.submenu) {
        return (
            <li>
                <details>
                    <summary>{item.name}</summary>
                    <ul className="p-2">
                        {item.submenu.map(submenuItem => (
                            <MenuItem key={submenuItem.name} item={submenuItem} />
                        ))}
                    </ul>
                </details>
            </li>
        );
    } else {
        return (
            <li>
                <NavLink to={item.link} className="nav-link" activeClassName="active">{item.name}</NavLink>
            </li>
        );
    }
}

const Page = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkTokenAndNavigate = async () => {
            const checkToken = await verifyToken();
            if (!checkToken) {
                localStorage.clear();
                navigate('/login');
                console.log('token not found');
            }
            else {
                console.log('token found');
            }
        };

        checkTokenAndNavigate();
    }, [location.pathname, navigate]);

    const logoutAction = () => {
        localStorage.clear()
        navigate("/login")
    }
    return (
        <>
            <div className="bg-base-200 flex flex-col justify-between h-screen">
                <div>
                    <div className="navbar bg-base-100 px-2 z-50 ">
                        <div className="navbar-start">
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    {
                                        localStorage.getItem('role') === 'admin' ? menu_admin.map(item => (
                                            <MenuItem key={item.name} item={item} />
                                        ))
                                            :
                                            menu_user.map(item => (
                                                <MenuItem key={item.name} item={item} />
                                            ))
                                    }
                                </ul>
                            </div>
                            <div className="flex flex-row ml-3 justify-center items-center gap-2 ">
                                <img src={logo} alt="logo" className="h-10" />
                                <Link to="/home" className="text-xl font-black flex flex-col items-start">
                                    Sum1
                                    <p className="text-xs italic font-semibold">Excellent Exalted Experience</p>
                                </Link>
                            </div>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="gap-1 menu menu-horizontal px-1 z-50">
                                {
                                    localStorage.getItem('role') === 'admin' ? menu_admin.map(item => (
                                        <MenuItem key={item.name} item={item} />
                                    ))
                                        :
                                        menu_user.map(item => (
                                            <MenuItem key={item.name} item={item} />
                                        ))
                                }
                            </ul>
                        </div>
                        <div className="navbar-end pr-2">
                            <button onClick={logoutAction} className="flex flex-row gap-1 justify-center items-center text-sm"><AiOutlineLogout />Keluar</button>
                        </div>
                    </div>
                    <div className="bg-base-200 w-full mx-auto px-6">
                        <div className="bg-base-100 w-full  my-2 px-5 py-3 rounded-lg shadow-lg">
                            <Outlet />
                        </div>
                    </div>
                </div>
                <footer className="footer footer-center p-4  text-base-content">
                    <aside>
                        <p>Copyright © 2024 - All right reserved by S.U.M</p>
                    </aside>
                </footer>
            </div>
        </>
    )
}

export default Page