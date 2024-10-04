"use client"

import {useEffect, useState} from "react";
import {getObjEmpleado, newEmpleado, putEmpleado} from "@/app/api/APIEmpleados.jsx";
import usaLocalStorage from "@/hooks/usaLocalStorage.jsx";
import Link from "next/link";
import {useRouter,usePathname} from "next/navigation";
import {refreshNavigator} from "@/js/refreshNavigator.js";

export const dynamic = "force-dynamic"

const EmpleadoNewEdit = ({data}) => {
    const [id, setId] = useState(0);
    const [empleado, setEmpleado] = useState([]);
    const titulo = data.Empleado !== undefined ? "Editando el registro " + data.Empleado.id : "Nuevo Registro";

    const pathname = usePathname();
    const router = useRouter();

    const actualizaEmpleado = async (token) => {
         await putEmpleado(token, empleado)
         .then(data => {
             refreshNavigator(data.data, router, "/empleados");
         });
    }

    const agregarEmpleado = async (token) => {
        console.log(empleado);
        await newEmpleado(token, empleado)
        .then(data => {
            refreshNavigator(data.data, router, "/empleados");
        });
    }

    const handleUpdateClick =  (e) => {
        e.preventDefault();
        let token = usaLocalStorage("_handleCheck","",1)
        if ( data.Empleado !== undefined) {
            actualizaEmpleado(token);
        }else{
            agregarEmpleado(token);
        }
    }

    useEffect(() => {
        if ( data.Empleado !== undefined) {
            setEmpleado(data.Empleado);
        }else{
            setEmpleado(getObjEmpleado(null));
        }
        // console.log(empleado);
    // No borrar el siguiente comentario
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleChange =  (e) => {
        setEmpleado({ ...empleado, [e.target.name]: e.target.value });
    }

    return (
        <div className="m-0 p-0">

            <div className="flex items-center justify-between  rounded dark:border-gray-400 w-full ">
                <span className="text-sm font-semibold text-amber-600 dark:text-amber-600">
                    {titulo}
                </span>
                <Link href={pathname} className="float-right">
                    <button type="button" className="bg-danger text-white gap-1.5 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd"
                                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                </Link>
            </div>

            <div className="p-1 mt-4 ">
                <form className="p-0" onSubmit={handleUpdateClick}>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="ap_paterno"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ap
                                Paterno</label>
                            <input type="text" name="ap_paterno" id="ap_paterno"
                                   value={empleado.ap_paterno}
                                   onChange={handleChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-light mb-2"
                                   placeholder="Ap Paterno" required/>
                        </div>
                        <div className="ml-2">
                            <label htmlFor="ap_materno"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ap
                                Materno</label>
                            <input type="text" name="ap_materno" id="ap_materno"
                                   value={empleado.ap_materno}
                                   onChange={handleChange}
                                   placeholder="Ap Materno"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-light mb-2"
                            />
                        </div>
                        <div className="ml-2">
                            <label htmlFor="nombre"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                            <input type="text" name="nombre" id="nombre"
                                   value={empleado.nombre}
                                   onChange={handleChange}
                                   placeholder="Nombre"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-light mb-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="celulares"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Celular</label>
                            <input type="phone" name="celulares" id="celulares"
                                   value={empleado.celulares}
                                   onChange={handleChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-light mb-2"
                                   placeholder="Celular" />
                        </div>
                        <div className="ml-2">
                            <label htmlFor="emails"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" name="emails" id="emails"
                                   value={empleado.emails}
                                   onChange={handleChange}
                                   placeholder="Email"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-light mb-2"
                            />
                        </div>
                        <div className="ml-2">
                            <label htmlFor="numero_empleado"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número de Empleado</label>
                            <input type="text" name="numero_empleado" id="numero_empleado"
                                   value={empleado.numero_empleado}
                                   onChange={handleChange}
                                   placeholder="Número de Empleado"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-light mb-2"
                            />
                        </div>
                    </div>
                    <div className="col-start-1 col-end-7 mt-4 ">
                        <button type="submit"
                                className="w-full flex items-center justify-center px-4 py-2 text-sm text-center font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="size-6 mr-2">
                                <path fill-rule="evenodd"
                                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                      clip-rule="evenodd"/>
                            </svg>
                            <span>Guardar</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default EmpleadoNewEdit;
