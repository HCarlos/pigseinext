"use client"

import React, {Suspense, useEffect, useState} from "react";
import {getEquiposList, Equipo} from "@/app/api/APIEquipos.jsx";
import usaLocalStorage from "@/hooks/usaLocalStorage.jsx";
import Link from "next/link";
import DialogModal from "@/components/DialogModal/DialogModal.jsx";
import DialogModalDelete from "@/components/DialogModal/DialogModalDelete.jsx";
import {useRouter} from "next/navigation";

// export const dynamic = "force-dynamic";

const EquipoTable = () => {

    const [equipos, setEquipos] = useState([]);
    const [item, setItem] = useState([]);

    const router = useRouter();

    const getEquipos = async (token) => {
        const m = await getEquiposList(token)
            .then(data => {
                setEquipos(data);
            });
    }

    useEffect( () => {
        router.prefetch('/equipos')
        const token = usaLocalStorage("_handleCheck","",1)
        const res =  getEquipos(token);
        // No borrar el siguiente comentario
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <Link title="Agregar registro"
                  href="?dialog-modal=false" onClick={() => setItem([])}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-2 py-2 mb-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:px-2"
            >
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd"
                        d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                        clipRule="evenodd"/>
                </svg>
              </span>
            </Link>

            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                        <th className="w-10 px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                            ID
                        </th>
                        <th className="w-40 px-4 py-4 font-medium text-black dark:text-white">
                            Unidad Administrativa
                        </th>
                        <th className="w-40 px-4 py-4 font-medium text-black dark:text-white">
                            Equipo
                        </th>
                        <th className="w-40 px-4 py-4 font-medium text-black dark:text-white">
                            Marca
                        </th>
                        <th className="w-40 px-4 py-4 font-medium text-black dark:text-white">
                            Modelo
                        </th>
                        <th className="w-40 px-4 py-4 font-medium text-black dark:text-white">
                            Serie
                        </th>
                        <th className="w-40 px-4 py-4 font-medium text-black dark:text-white">
                            Inventario
                        </th>
                        <th className="w-40 px-4 py-4 font-medium text-black dark:text-white">
                            Resguardo
                        </th>
                        <th className="px-4 py-4 font-medium text-black dark:text-white">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>

                    {equipos.map((Equipo) => (
                        <tr key={Equipo.id}>
                            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark text-xs dark:text-gray-light dark:text-xs">
                                {Equipo.id}
                            </td>
                            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark text-xs dark:text-gray-light dark:text-xs">
                                {Equipo.unidadadministrativa === null ? '' : Equipo.unidadadministrativa.unidad}
                            </td>
                            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark text-xs dark:text-gray-light dark:text-xs">
                                {Equipo.equipo}
                            </td>
                            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark text-xs dark:text-gray-light dark:text-xs">
                                {Equipo.marca === null ? '' : Equipo.marca.marca}
                            </td>
                            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark text-xs dark:text-gray-light dark:text-xs">
                                {Equipo.modelo}
                            </td>
                            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark text-xs dark:text-gray-light dark:text-xs">
                                {Equipo.serie}
                            </td>
                            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark text-xs dark:text-gray-light dark:text-xs">
                                {Equipo.inventario}
                            </td>
                            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark text-xs dark:text-gray-light dark:text-xs">
                                {Equipo.empleadoresguardo === null ? '' : Equipo.empleadoresguardo.ap_paterno + ' ' + Equipo.empleadoresguardo.ap_materno + ' ' + Equipo
                                    .empleadoresguardo.nombre}
                            </td>
                            <td className="w-full border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark text-xs dark:text-gray-light dark:text-xs">
                                <Link href="?dialog-modal=true" onClick={() => setItem({Equipo})}>
                                    <button type="button" className="bg-blue-500 text-white p-2 gap-2.5 rounded-full"
                                            title="Editar registro">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
                                        </svg>
                                    </button>
                                </Link>

                                <Link href="?dialog-modal-delete=true" onClick={() => setItem({Equipo})}
                                      className="ml-2">
                                    <button type="button" className="bg-danger text-white p-2 gap-2.5 rounded-full"
                                            title="Eliminar registro">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             className="size-6">
                                            <path fillRule="evenodd"
                                                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </button>
                                </Link>

                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Suspense fallback={<>Cargando datos...</>}>
                <DialogModal data={item} model="equipos" key={router.asPath}/>
                <DialogModalDelete data={item} model="equipos" key={router.asPath}/>
            </Suspense>
        </div>

    );
};

export default EquipoTable;

