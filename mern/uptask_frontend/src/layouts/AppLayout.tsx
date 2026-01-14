import {Link, Navigate, Outlet} from "react-router-dom";
import Logo from "@/components/Logo";
import 'react-toastify/dist/ReactToastify.css'
import {NavMenu} from "@/components/NavMenu";
import {ToastContainer} from "react-toastify";
import {useAuth} from "@/hooks/useAuth.ts";

export default function AppLayout() {
    const {data, isError, isLoading} = useAuth()
    if (isLoading) return 'Cargando..'
    if (isError) {
        return <Navigate to='/auth/login'/>
    }
    if (data) return (
        < >
            <header className="bg-gray-800 py-5">
                <div className="max-w-screen-2xl flex mx-auto flex-col lg:flex-row justify-between items-center">
                    <div className="w-64">
                        <Link to={'/'}>
                            <Logo/>

                        </Link>
                    </div>

                    <NavMenu
                    name={data.name}
                    />

                </div>
            </header>

            <section className="max-w-screen-2xl mx-auto mt-10 p-5">

                <Outlet/>

            </section>

            <footer className="py-5">
                <p className="text-center">
                    Todos los derechos Reservados {new Date().getFullYear()}
                </p>
            </footer>

            <ToastContainer
                pauseOnFocusLoss={false}
                pauseOnHover={false}
            />
        </>
    )
}
