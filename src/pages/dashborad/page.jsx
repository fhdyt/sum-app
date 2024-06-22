/* eslint-disable react/prop-types */
import { Link, NavLink, Outlet } from "react-router-dom"

const menu = [
    {
        name: "Beranda",
        link: "home"
    },

    {
        name: "Eo",
        link: "eo"
    },
    {
        name: "Work",
        link: "work"
    },
    {
        name: "Print",
        link: "print"
    },

    {
        name: "Satu Layar",
        link: "satulayar"
    },
    {
        name: "Master Barang",
        link: "barang"
    },

];

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

    return (
        <>
            <div className="bg-base-200 h-screen">
                <div className="navbar bg-base-100 px-2 z-50 ">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {menu.map(item => (
                                    <MenuItem key={item.name} item={item} />
                                ))}
                            </ul>
                        </div>
                        <Link to="/home" className="btn btn-ghost text-xl">Sum</Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="gap-1 menu menu-horizontal px-1 z-50">
                            {menu.map(item => (
                                <MenuItem key={item.name} item={item} />
                            ))}
                        </ul>
                    </div>
                    {/* <div className="navbar-end pr-2">
                        <Link to="/cashier" className="btn submit-button w-auto">Kasir</Link>
                    </div> */}
                </div>
                <div className="bg-base-200 w-full px-6">
                    <div className="bg-base-100 w-full mx-2 my-2 px-5 py-3 rounded-lg">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page