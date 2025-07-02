import { Link } from "react-router-dom";
export default function Navbar() {
    return (
        <>
            <div className="navbar bg-base-100 shadow-sm ">
                <div className="flex-1">
                    <Link to="/" className="text-xl font-bold">Mis Finanzas</Link>

                </div>
                <div className="flex-none">
                    {/* <Link to="/cuentas" className=" p-2 mx-4">Cuentas</Link> */}
                    <Link to="/dashboard" className=" p-2">Dashboard</Link>
                </div>
            </div>


        </>
    )
}
