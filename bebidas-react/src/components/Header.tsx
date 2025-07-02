import { useEffect, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
    const { pathname } = useLocation()
    const fetchCategiries= useAppStore((state)=>state.fetchCategiries)
    useEffect(() => {
        fetchCategiries()
    }, [])
    const isHome = useMemo(() => pathname === '/', [pathname])

    return (
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
            <div className="mx-auto  container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img src="/logo.svg" alt="Logo" className="w-32" />
                    </div>
                    <nav className="flex gap-4">
                        <NavLink to={"/"}
                            className={({ isActive }) => (isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold")}
                        >Inicio</NavLink>
                        <NavLink to={"/favoritos"}
                            className={({ isActive }) => (isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold")}
                        >Favoritos</NavLink>

                    </nav>
                </div>
                {isHome && (
                    <form action="" className="md:w-1/2 2xl:w-1/3  bg-orange-500 my-32 p-10 rounded-lg shadow space-y-6">
                        <div className="space-y-4">
                            <label className="block text-white uppercase font-extrabold text-lg"
                                htmlFor="ingredient">Nombre o Ingredientes</label>
                            <input type="text" id="ingredient" name="ingredient" className="p-3 w-full rounded-lg focus:outline-none"
                                placeholder="Nombre o ingrediente"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="block text-white uppercase font-extrabold text-lg"
                                htmlFor="ingredient">Categorias</label>
                            <select id="ingredient" name="ingredient" className="p-3 w-full rounded-lg focus:outline-none"

                            >
                                <option value="">-- Seleccione --</option>
                            </select>
                        </div>
                        <input type="submit"
                            className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg"
                            value="Buscar Recetas"
                        />
                    </form>
                )}

            </div>

        </header>
    )
}
