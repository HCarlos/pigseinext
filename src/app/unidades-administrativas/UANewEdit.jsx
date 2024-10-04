"use client"

import {useEffect, useState} from "react";
import {getObjUA, newUA, putUA} from "@/app/api/APIUAs.jsx";
import usaLocalStorage from "@/hooks/usaLocalStorage.jsx";
import Link from "next/link";
import {useRouter,usePathname} from "next/navigation";
import {refreshNavigator} from "@/js/refreshNavigator.js";
import {getEmpleadosList} from "@/app/api/APIEmpleados.jsx";

const UANewEdit = ({data, empleadox}) => {
    const token = usaLocalStorage("_handleCheck","",1)

    const [id, setId] = useState(0);
    const [empleados, setEmpleados] = useState([]);
    const [ua, setUA] = useState([]);
    const [errorUA, setErrorUA] = useState(getObjUA(null));
    const [titular, setTitular] = useState(0);

    const titulo = data.UA !== undefined ? "Editando el registro " + data.UA.id : "Nuevo Registro";

    const pathname = usePathname();
    const router = useRouter();

    const actualizaUA = async (token) => {
        await putUA(token, ua)
            .then(data => {
                paDondeAgarro(data);
            });
    }

    const agregarUA = async (token) => {
        await newUA(token, ua)
            .then(data => {
                paDondeAgarro(data);
            });
    }

    function paDondeAgarro(data){
        console.log(data.status);
        if (data.status === 200 || data.status === 201){
            refreshNavigator(data.data, router, "/unidades-administrativas");
        }else{
            setErrorUA(data.data);
        }
    }

    const handleUpdateClick =  (e) => {
        e.preventDefault();
        let token = usaLocalStorage("_handleCheck","",1)
        if ( data.UA !== undefined) {
            console.log(data.UA);
            actualizaUA(token);
        }else{
            agregarUA(token);
        }
    }

    const getEmpleados = async (token) => {
        await getEmpleadosList(token)
            .then(data => {
                setEmpleados(data);
            });
    }

    useEffect(() => {
        // setEmpleados(empleadox);
        const emp = getEmpleados(token);
        if ( data.UA !== undefined && data.UA !== null) {
            if  (data.UA.titular !== null) {
                if (typeof data.UA.titular.id === "number") {
                    setTitular(data.UA.titular.id);
                    // setUA({ ...ua, titular: data.UA.titular.id });
                }
            }
            setUA(data.UA);
        }else{
            setUA(getObjUA(null));
        }
        // No borrar el siguiente comentario
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleChange =  (e) => {
        setUA({ ...ua, [e.target.name]: e.target.value });
    }

    const handleChangeSelect =  (e) => {
        setUA({ ...ua, titular: e.target.value });
        setTitular(e.target.value);
        // console.log(e.target.value);
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
                            <label htmlFor="unidad"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unidad</label>
                            <input type="text" name="unidad" id="unidad"
                                   value={ua.unidad}
                                   onChange={handleChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mb-2"
                                   placeholder="Unidad" required/>
                            <small className="text-rose-600 text-xs">{errorUA.unidad}</small>
                        </div>
                        <div className="ml-2">
                            <label htmlFor="abreviatura"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Abreviatura</label>
                            <input type="text" name="abreviatura" id="abreviatura"
                                   value={ua.abreviatura}
                                   onChange={handleChange}
                                   placeholder="Abreviatura"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 mb-2"
                            />
                            <small className="text-rose-600 text-xs">{errorUA.abreviatura}</small>
                        </div>
                        <div className="ml-1">
                            <label htmlFor="titular"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titular {titular}</label>
                            <select
                                onChange={handleChangeSelect}
                                className="bg-gray-50 p-2.5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:text-text-white dark:placeholder-gray-400"
                            >
                                <option key="0" value="0" selected>Seleccione un elemento</option>
                                {empleados.map((emp) => (
                                    <option
                                        key={emp.id}
                                        value={emp.id}
                                        selected={emp.id === titular}
                                    >
                                        {emp.full_name}
                                    </option>
                                ))}
                            </select>
                            <small className="text-rose-600 text-xs">{errorUA.titular === 0 ? '' : errorUA.titular }</small>
                        </div>
                    </div>
                    <div className="col-start-1 col-end-7 mt-4 ">
                    <button type="submit"
                                className="w-full flex items-center justify-center px-4 py-2 text-sm text-center font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="size-6 mr-2">
                                <path fillRule="evenodd"
                                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                      clipRule="evenodd"/>
                            </svg>
                            <span>Guardar</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default UANewEdit;
