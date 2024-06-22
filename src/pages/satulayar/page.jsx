import { Outlet } from "react-router-dom"
import { BarangProvider } from "../../providers/BarangProvider"

const Page = () => {

    return (
        <div>
            <BarangProvider>
                <Outlet />
            </BarangProvider>
        </div>
    )
}

export default Page