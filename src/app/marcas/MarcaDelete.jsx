"use client"

import {useState} from "react";
import {deleteMarca} from "@/app/api/APIMarcas.jsx";
import usaLocalStorage from "@/hooks/usaLocalStorage.jsx";
import Link from "next/link";
import {useRouter, usePathname} from "next/navigation";

const MarcaDelete = ({data, key}) => {
    const id = data.Marca.id;
    const [marca, setMarca] = useState(data.Marca.marca);
    const [fabricante, setFabricante] = useState(data.Marca.fabricante);
    const titulo = "Desea eliminar el registro " + id + "?";

    const pathname = usePathname();
    const router = useRouter();


    const delMarca = async (token) => {
         await deleteMarca(token, {
            id:id,
            marca:marca,
            fabricante:fabricante,
            activo:data.Marca.activo
        })
        .then(response => {
            console.log(response);
            location.href = "/marcas";
        });
    }

    const handleUpdateClick =  (e) => {
        e.preventDefault();
        let token = usaLocalStorage("_handleCheck","",1)
        delMarca(token);
    }

    return (
        <div>
            <Link href={pathname} className="float-right  -right-full">
                <button type="button" className="bg-danger text-white p-1 gap-1.5 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd"
                              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                              clipRule="evenodd"/>
                    </svg>
                </button>
            </Link>

            <div className="flex items-center justify-between p-4 md:p-2.5 rounded-t dark:border-gray-600 w-full">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {titulo}
                </h3>
            </div>

            <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={handleUpdateClick} >
                    <div>
                        <label htmlFor="marca" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Marca</label>
                        <input type="text" name="marca" id="marca"
                               value={marca}
                               onChange={(e) => setMarca(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-graydark mb-2"
                               placeholder="Marca" required readOnly={true}/>
                    </div>
                    <div>
                        <label htmlFor="fabricante" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fabricante</label>
                        <input type="text" name="fabricante" id="fabricante" placeholder="Fabricante"
                                value={fabricante}
                               readOnly={true}
                               onChange={(e) => setFabricante(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-graydark mb-2"
                               />
                    </div>
                    <button type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Eliminar
                    </button>
                </form>
            </div>
        </div>
    );

};

export default MarcaDelete;
