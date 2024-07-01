import AdminPage from "./admin"
import UserPage from "./user"

const Page = () => {

    return (
        <>
            {
                localStorage.getItem('role') === 'admin' ? <AdminPage /> : <UserPage />
            }
        </>
    )
}

export default Page