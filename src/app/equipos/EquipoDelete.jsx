"use client"

import {useState} from "react";
import {deleteEquipo, Equipo} from "@/app/api/APIEquipos.jsx";
import usaLocalStorage from "@/hooks/usaLocalStorage.jsx";
import Link from "next/link";
import {useRouter, usePathname} from "next/navigation";

const EquipoDelete = ({data, key}) => {
    const [id, setId] = useState(0);
    const [equipo, setEquipo] = useState(data.Equipo);

    const pathname = usePathname();
    const router = useRouter();

    const delEquipo = async (token) => {
        await deleteEquipo(token, {
            id:equipo.id,
        })
            .then(response => {
                console.log(response);
                location.href = "/equipos";
            });
    }

    const handleUpdateClick =  (e) => {
        e.preventDefault();
        let token = usaLocalStorage("_handleCheck","",1)
        delEquipo(token);
    }

    return (
        <div>

            <div className="flex items-center justify-between  rounded dark:border-gray-400 w-full ">
                <span className="text-sm font-semibold text-amber-600 dark:text-amber-600">
                </span>
                <Link href={pathname} className="float-right  -right-full">
                    <button type="button" className="bg-danger text-white p-1 gap-1.5 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd"
                                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                </Link>
            </div>

            <div className="p-4 md:p-5">
                <form className="space-y-10" onSubmit={handleUpdateClick}>
                    <label className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">Se eliminará el Equipo
                        (<span className="text-green-700">{equipo.id}</span>) <span
                            className="text-orange-600">{equipo.equipo + ' ' + equipo.marca.marca + ' ' + equipo.modelo + ' ' + equipo.serie + ' ' + equipo.inventario}</span>, desea continuar?
                    </label>
                    <div className="col-start-1 col-end-7 ">
                        <button type="submit"
                                className="w-full flex items-center justify-center px-4 py-2 text-sm text-center font-medium leading-5 text-white transition-colors duration-150 bg-rose-600 border border-transparent rounded-lg active:bg-rose-600 hover:bg-rose-700 focus:outline-none focus:shadow-outline-rose">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="w-4 h-4 mr-2 -ml-1">
                                <path fillRule="evenodd"
                                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                      clipRule="evenodd"/>
                            </svg>
                            <span>Eliminar</span>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );

};

export default EquipoDelete;
