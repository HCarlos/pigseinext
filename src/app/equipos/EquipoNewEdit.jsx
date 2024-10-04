
import {useEffect, useState} from "react";
import {getEquiposList, getObjEquipo, newEquipo, putEquipo} from "@/app/api/APIEquipos.jsx";
import usaLocalStorage from "@/hooks/usaLocalStorage.jsx";
import Link from "next/link";
import {useRouter,usePathname} from "next/navigation";
import {refreshNavigator} from "@/js/refreshNavigator.js";
import {getEmpleadosList} from "@/app/api/APIEmpleados.jsx";
import {getUAsList} from "@/app/api/APIUAs.jsx";
import {getMarcasList} from "@/app/api/APIMarcas.jsx";

const UANewEdit = ({data}) => {
    const [token, setToken] = useState(usaLocalStorage("_handleCheck","",1));

    const [id, setId] = useState(0);
    const [empleados, setEmpleados] = useState([]);
    const [uas, setUAs] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [equipo, setEquipo] = useState([]);
    const [errorEquipo, setErrorEquipo] = useState(getObjEquipo(null));
    const [titular, setTitular] = useState(0);
    const [ua, setUA] = useState(0);
    const [marca, setMarca] = useState(0);

//    console.log(data);

    const titulo = data.Equipo !== undefined ? "Editando el registro " + data.Equipo.id : "Nuevo Registro";

    const pathname = usePathname();
    const router = useRouter();

    const actualizaEquipo = async (token) => {
        await putEquipo(token, equipo)
            .then(data => {
                paDondeAgarro(data);
            });
    }

    const agregarEquipo = async (token) => {
        await newEquipo(token, equipo)
            .then(data => {
                paDondeAgarro(data);
            });
    }

    // const actualizarDatos = async (token) => {
    //     return await getEquiposList(token)
    // }
    //
    async function paDondeAgarro(data){
        // console.log(data.status);
        // console.log(data.data);
        if (data.status === 200 || data.status === 201){
            refreshNavigator(data.data, router, "equipos");
        }else{
            console.log(data.data);
            setErrorEquipo(data.data);
        }
    }

    const handleUpdateClick =  (e) => {
        e.preventDefault();
        // console.log(data.Equipo);
        if ( data.Equipo !== undefined) {
            actualizaEquipo(token);
        }else{
            agregarEquipo(token);
        }
    }

    const getEmpleados = async (token) => {
        await getEmpleadosList(token)
            .then(data => {
                setEmpleados(data);
            });
    }

    const getUAs = async (token) => {
        await getUAsList(token)
            .then(data => {
                setUAs(data);
            });
    }

    const getMarcas = async (token) => {
        await getMarcasList(token)
            .then(data => {
                setMarcas(data);
            });
    }

    useEffect(() => {

        const emp = getEmpleados(token);
        const uaa = getUAs(token);
        const mar = getMarcas(token);


        if ( data.Equipo !== undefined && data.Equipo !== null) {
            if  (data.Equipo.empleadoresguardo !== null) {
                if (typeof data.Equipo.empleadoresguardo.id === "number") {
                    setTitular(data.Equipo.empleadoresguardo.id);
                }
            }
            if  (data.Equipo.unidadadministrativa !== null) {
                if (typeof data.Equipo.unidadadministrativa.id === "number") {
                    setUA(data.Equipo.unidadadministrativa.id);
                }
            }
            if  (data.Equipo.marca !== null) {
                if (typeof data.Equipo.marca.id === "number") {
                    setMarca(data.Equipo.marca.id);
                }
            }
            setEquipo(data.Equipo);
        }else{
            setEquipo(getObjEquipo(null));
        }
        // No borrar el siguiente comentario
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleChange =  (e) => {
        setEquipo({ ...equipo, [e.target.name]: e.target.value });
    }

    const handleChangeEmpleadoResguardoSelect =  (e) => {
        setEquipo({ ...equipo, empleadoresguardo: e.target.value });
        setTitular(e.target.value);
    }

    const handleChangeUASelect =  (e) => {
        setEquipo({ ...equipo, unidadadministrativa: e.target.value });
        setUA(e.target.value);
    }
    const handleChangeMarcaSelect =  (e) => {
        setEquipo({ ...equipo, marca: e.target.value });
        setMarca(e.target.value);
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

                    <div className="grid grid-cols-4 gap-4">
                        <div className="ml-1">
                            <label htmlFor="unidadadministrativa"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unidad
                                Administrativa</label>
                            <select
                                onChange={handleChangeUASelect}
                                className="bg-indigo-400 p-2.5 w-50 border border-indigo-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-indigo-500 block dark:bg-gray-600 dark:border-gray-500 dark:text-text-white dark:placeholder-gray-400"

                            >
                                <option key="0" value="0" selected>Seleccione una Unidad Administrativa</option>
                                {uas.map((uaa) => (
                                    <option
                                        key={uaa.id}
                                        value={uaa.id}
                                        selected={uaa.id === ua}
                                    >
                                        {uaa.unidad}
                                    </option>
                                ))}
                            </select>
                            <small
                                className="text-rose-600 text-xs">{errorEquipo.unidadadministrativa === 0 ? '' : errorEquipo.unidadadministrativa}</small>
                        </div>
                        <div className="ml-1">
                            <label htmlFor="abreviatura"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Equipo</label>
                            <input type="text" name="equipo" id="equipo"
                                   value={equipo.equipo}
                                   onChange={handleChange}
                                   placeholder="Equipo"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 mb-2"
                            />
                            <small className="text-rose-600 text-xs">{errorEquipo.equipo}</small>
                        </div>
                        <div className="ml-1">
                            <label htmlFor="marca"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Marca</label>
                            <select
                                onChange={handleChangeMarcaSelect}
                                className="bg-rose-600 p-2.5 w-50 border border-rose-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-indigo-500 block dark:bg-gray-600 dark:border-gray-500 dark:text-text-white dark:placeholder-gray-400"
                            >
                                <option key="0" value="0" selected>Seleccione una marca</option>
                                {marcas.map((m) => (
                                    <option
                                        key={m.id}
                                        value={m.id}
                                        selected={m.id === marca}
                                    >
                                        {m.marca}
                                    </option>
                                ))}
                            </select>
                            <small
                                className="text-rose-600 text-xs">{errorEquipo.marca === 0 ? '' : errorEquipo.marca}</small>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        <div className="ml-1">
                            <label htmlFor="modelo"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Modelo</label>
                            <input type="text" name="modelo" id="modelo"
                                   value={equipo.modelo}
                                   onChange={handleChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mb-2"
                                   placeholder="Modelo" required/>
                            <small className="text-rose-600 text-xs">{errorEquipo.modelo}</small>
                        </div>
                        <div className="ml-1">
                            <label htmlFor="procesador"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Procesador</label>
                            <input type="text" name="procesador" id="procesador"
                                   value={equipo.procesador}
                                   onChange={handleChange}
                                   placeholder="Procesador"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 mb-2"
                            />
                            <small className="text-rose-600 text-xs">{errorEquipo.procesador}</small>
                        </div>
                        <div className="ml-1">
                            <label htmlFor="empleadoresguardo"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Empleado</label>
                            <select
                                onChange={handleChangeEmpleadoResguardoSelect}
                                className="bg-amber-600 p-2.5 w-50 border border-amber-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-600 dark:border-gray-500 dark:text-text-white dark:placeholder-gray-400"
                            >
                                <option key="0" value="0" selected>Seleccione un empleado</option>
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
                            <small
                                className="text-rose-600 text-xs">{errorEquipo.empleadoresguardo === 0 ? '' : errorEquipo.empleadoresguardo}</small>
                        </div>
                        <div className="ml-1">
                            <label htmlFor="serie"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Serie</label>
                            <input type="text" name="serie" id="serie"
                                   value={equipo.serie}
                                   onChange={handleChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mb-2"
                                   placeholder="Serie" required/>
                            <small className="text-rose-600 text-xs">{errorEquipo.serie}</small>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        <div className="ml-1">
                            <label htmlFor="inventario"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Inventario</label>
                            <input type="text" name="inventario" id="inventario"
                                   value={equipo.inventario}
                                   onChange={handleChange}
                                   placeholder="Inventario"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 mb-2"
                            />
                            <small className="text-rose-600 text-xs">{errorEquipo.inventario}</small>
                        </div>
                        <div className="ml-1">
                            <label htmlFor="procesador"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Procesador</label>
                            <input type="text" name="procesador" id="procesador"
                                   value={equipo.procesador}
                                   onChange={handleChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mb-2"
                                   placeholder="Procesador"/>
                        </div>
                        <div className="ml-1">
                            <label htmlFor="generacion"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Generación</label>
                            <input type="text" name="generacion" id="generacion"
                                   value={equipo.generacion}
                                   onChange={handleChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mb-2"
                                   placeholder="Generacion"/>
                        </div>
                        <div className="ml-1">
                            <label htmlFor="ram"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RAM</label>
                            <input type="text" name="ram" id="ram"
                                   value={equipo.ram}
                                   onChange={handleChange}
                                   placeholder="RAM"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 mb-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        <div className="ml-1">
                            <label htmlFor="discoduro"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">HDD/SDD</label>
                            <input type="text" name="discoduro" id="discoduro"
                                   value={equipo.discoduro}
                                   onChange={handleChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mb-2"
                                   placeholder="HDD/SDD"/>
                        </div>
                        <div className="ml-1">
                            <label htmlFor="sistemaoperativo"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sistema
                                Operativo</label>
                            <input type="text" name="sistemaoperativo" id="sistemaoperativo"
                                   value={equipo.sistemaoperativo}
                                   onChange={handleChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mb-2"
                                   placeholder="Sistema Operativo"/>
                        </div>
                        <div className="ml-1">
                            <label htmlFor="conexion"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Conexión</label>
                            <input type="text" name="conexion" id="conexion"
                                   value={equipo.conexion}
                                   onChange={handleChange}
                                   placeholder="Conexión"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 mb-2"
                            />
                        </div>
                        <div className="ml-1">
                            <label htmlFor="inventariomonitor"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Inventario
                                Monitor</label>
                            <input type="text" name="inventariomonitor" id="inventariomonitor"
                                   value={equipo.inventariomonitor}
                                   onChange={handleChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mb-2"
                                   placeholder="Inventario Monitor"/>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        <div className="ml-1">
                            <label htmlFor="inventariomouse"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Inventario
                                Mouse</label>
                            <input type="text" name="inventariomouse" id="inventariomouse"
                                   value={equipo.inventariomouse}
                                   onChange={handleChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mb-2"
                                   placeholder="Inventario Mouse"/>
                        </div>
                        <div className="ml-1">
                            <label htmlFor="inventarioteclado"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Inventario
                                Teclado</label>
                            <input type="text" name="inventarioteclado" id="inventarioteclado"
                                   value={equipo.inventarioteclado}
                                   onChange={handleChange}
                                   placeholder="Inventario Teclado"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 mb-2"
                            />
                        </div>
                        <div className="ml-1">
                            <label htmlFor="tiponodo"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo
                                Nodo</label>
                            <input type="text" name="tiponodo" id="tiponodo"
                                   value={equipo.tiponodo}
                                   onChange={handleChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mb-2"
                                   placeholder="Tipo Nodo"/>
                        </div>
                        <div className="ml-1">
                            <label htmlFor="anchobanda"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ancho de
                                Banda</label>
                            <input type="text" name="anchobanda" id="anchobanda"
                                   value={equipo.anchobanda}
                                   onChange={handleChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mb-2"
                                   placeholder="Ancho de Banda"/>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        <div className="ml-1">
                            <label htmlFor="numerotelefonico"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número
                                Telefónico</label>
                            <input type="text" name="numerotelefonico" id="numerotelefonico"
                                   value={equipo.numerotelefonico}
                                   onChange={handleChange}
                                   placeholder="Número Telefónico"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 mb-2"
                            />
                        </div>
                        <div className="ml-1">
                            <label htmlFor="garantia"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Garantía</label>
                            <input type="text" name="garantia" id="garantia"
                                   value={equipo.garantia}
                                   onChange={handleChange}
                                   placeholder="Garantía"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 mb-2"
                            />
                        </div>
                        <div className="ml-1">
                            <label htmlFor="antivirus"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Antivirus</label>
                            <input type="text" name="antivirus" id="antivirus"
                                   value={equipo.antivirus}
                                   onChange={handleChange}
                                   placeholder="Antivirus"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 mb-2"
                            />
                        </div>
                        <div className="ml-1">
                            <label htmlFor="ofimatica"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ofimatica</label>
                            <input type="text" name="ofimatica" id="ofimatica"
                                   value={equipo.ofimatica}
                                   onChange={handleChange}
                                   placeholder="Ofimatica"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 mb-2"
                            />
                        </div>
                    </div>

                    <div className="grid col-span-full ml-1 mr-1 ">
                        <div className="w-full">
                            <label htmlFor="observaciones"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Observaciones</label>
                            <input type="text" name="observaciones" id="observaciones"
                                   value={equipo.observaciones}
                                   onChange={handleChange}
                                   placeholder="Observaciones"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 mb-2 w-full"
                            />
                        </div>
                    </div>

                    <div className="col-start-1 col-end-7 mt-4 ">
                        <button type="submit"
                                className="flex w-full items-center justify-center px-4 py-2 text-sm text-center font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
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
