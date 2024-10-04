
import React, {Suspense, useEffect, useState} from "react";
import {getMarcasList, Marca} from "@/app/api/APIMarcas.jsx";
import usaLocalStorage from "@/hooks/usaLocalStorage.jsx";
import Link from "next/link";
import DialogModal from "@/components/DialogModal/DialogModal.jsx";
import DialogModalDelete from "@/components/DialogModal/DialogModalDelete.jsx";
import {useRouter} from "next/navigation"

const MarcaTable = () => {
    const [marcas, setMarcas] = useState([]);
    const [item, setItem] = useState([]);
    const router = useRouter();

    const getMarcas = async (token) => {
        const m = await getMarcasList(token)
            .then(data => {
                setMarcas(data);
                console.log(data);
                router.prefetch('/marcas')
            });
    }

    useEffect( () => {
        router.prefetch('/marcas')
        let ls = usaLocalStorage("_handleCheck","",1)
        getMarcas(ls);
    // No borrar el siguiente comentario
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router])

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
                        <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                            ID
                        </th>
                        <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                            Marca
                        </th>
                        <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                            Fabricante
                        </th>
                        <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                            Status
                        </th>
                        <th className="px-4 py-4 font-medium text-black dark:text-white">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>

                    <Suspense fallback={<>Loading...</>}>

                        {marcas.map((Marca) => (
                            <tr key={Marca.id}>
                                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {Marca.id}
                                    </h5>
                                    <p className="text-sm"></p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {Marca.marca}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {Marca.fabricante}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p
                                        className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                                            Marca.activo === true
                                                ? "text-success"
                                                : "text-danger"
                                        }`}
                                    >
                                        {Marca.activo === true
                                            ?
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                 className="size-6">
                                                <path fillRule="evenodd"
                                                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                 className="size-6">
                                                <path fillRule="evenodd"
                                                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        }
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <Link href="?dialog-modal=true" onClick={() => setItem({Marca})}>
                                        <button type="button" className="bg-blue-500 text-white p-2 gap-2.5 rounded-full"
                                                title="Editar registro">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
                                            </svg>
                                        </button>
                                    </Link>

                                    <Link href="?dialog-modal-delete=true" onClick={() => setItem({Marca})} className="ml-2">
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
                        ))
                        }

                    </Suspense>


                    </tbody>
                </table>
            </div>
            <Suspense fallback={<>Cargando...</>}>
                <DialogModal data={item} model="marca" key={router.asPath} />
                <DialogModalDelete data={item} model="marca" key={router.asPath} />
            </Suspense>
        </div>

    );
};

export default MarcaTable;
