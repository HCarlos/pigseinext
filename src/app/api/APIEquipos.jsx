import axios from "axios";
import {getTokenAutorization} from "@/app/api/getToken.jsx";

export let Equipo = getObjEquipo(null);

export async function getEquiposList(token) {
    let Equipos = [];
    await axios.get(process.env.NEXT_PUBLIC_API + "api/v1/equipos-full/",
        getTokenAutorization(token)
    ).then(response => {
        response.data.map( (data) =>
            Equipos.push(getObjEquipo(data))
        );
    })
        .catch(error => {
            console.error(error.message);
        });
    return Equipos;
}

export async function getEquipo(token,equipo_id) {

    await axios.get(process.env.NEXT_PUBLIC_API + "api/v1/equipos/"+equipo_id+"/",
        getTokenAutorization(token)
    ).then(response => {
        let data = response.data;
        Equipo = getObjEquipo(data);
    })
        .catch(error => {
            console.error(error.message);
        });
    return Equipo;
}

export async function putEquipo(token,equipo) {
    let obj = {};
    const [valido, object] = isValidForm(equipo);
    if (!valido) {
        console.log(object);
        return {status:"400",message:"Error de datos: ", data: object};
    }

    await axios.put(process.env.NEXT_PUBLIC_API + "api/v1/equipos/"+equipo.id+"/",
        equipo,
        getTokenAutorization(token)
    ).then(response => {
        if (response.status === 200){
            let data = response.data;
            Equipo = getObjEquipo(data);
            if (response.status === 200) {
                obj = {status: response.status, message: "OK", data:data};
            } else {
                obj = {status: response.status, message: response.message, data: Equipo};
            }
        }
    }).catch(async error => {
        const response = error.response
        if ( typeof response.data.text === "function" ){
            obj = await response.data.text(); // => the response payload
        } else {
            obj = response.data;
        }
        //Equipo = getObjEquipo(obj);
        obj = {status:response.status,message:"Error 02: " + response.message, data: obj};

    })
    return obj;
}


export async function newEquipo(token,equipo) {
    let obj = {};

    const [valido, objtect] = isValidForm(equipo);
    if (!valido) {
        return {status:"400",message:"Error", data: objtect};
    }
    // equipo.empleadoresguardo = await getEmpleado(token,equipo.empleadoresguardo)
    // equipo.unidadadministrativa = await getUA(token,equipo.unidadadministrativa)
    // equipo.marca = await getMarca(token,equipo.marca)

    await axios.post(process.env.NEXT_PUBLIC_API + "api/v1/equipos/",
        equipo,
        getTokenAutorization(token)
    ).then(response => {
        if (response.status === 200){
            let data = response.data;
            Equipo = getObjEquipo(data);
            obj = {status:response.status,message:response.status === 200 ? "OK" : response.message, data: Equipo};
        }else{
            Equipo = getObjEquipo(null);
            obj = {status:response.status,message:"Error 01: " + response.message, data: Equipo};
        }
    }).catch(async error => {
        const response = error.response
        if ( typeof response.data.text === "function" ){
            obj = await response.data.text(); // => the response payload
        } else {
            obj = response.data;
        }
        Equipo = getObjEquipo(obj);
        obj = {status:response.status,message:"Error 03: " + response.message, data: Equipo};
        console.log(obj);
    })
    return obj;
}

export async function deleteEquipo(token,equipo) {
    let obj = "";
    await axios.delete(process.env.NEXT_PUBLIC_API + "api/v1/equipos/"+equipo.id+"/",
        getTokenAutorization(token)
    ).then(response => {
        let data = response;
        if (response.status === 200){
            obj = {status:response.status,message:response.status === 200 ? "OK" : response.message, data: response};
        }
    })
    .catch(error => {
        obj = {status:400,message:"Error 04: " + error.message, data: error.message};
    });
    return obj;
}

export function getObjEquipo(data){
    return {
        id: data === null || undefined ? 0 : data.id === undefined ? 0 : data.id,
        c030: data === null || undefined ? "" : data.c030 === undefined ? "" : data.c030,
        equipo: data === null || undefined ? "" : data.equipo === undefined ? "" : data.equipo,
        marca: data === null || undefined ? 0 : data.marca === undefined ? "" : data.marca,
        modelo: data === null || undefined ? "" : data.modelo === undefined ? "" : data.modelo,
        procesador: data === null || undefined ? "" : data.procesador === undefined ? "" : data.procesador,
        generacion: data === null || undefined ? "" : data.generacion === undefined ? "" : data.generacion,
        ram: data === null || undefined ? "" : data.ram === undefined ? "" : data.ram,
        discoduro: data === null || undefined ? "" : data.discoduro === undefined ? "" : data.discoduro,
        serie: data === null || undefined ? "" : data.serie === undefined ? "" : data.serie,
        inventario: data === null || undefined ? "" : data.inventario === undefined ? "" : data.inventario,
        inventariomonitor: data === null || undefined ? "" : data.inventariomonitor === undefined ? "" : data.inventariomonitor,
        inventariomouse: data === null || undefined ? "" : data.inventariomouse === undefined ? "" : data.inventariomouse,
        inventarioteclado: data === null || undefined ? "" : data.inventarioteclado === undefined ? "" : data.inventarioteclado,
        conexion: data === null || undefined ? "" : data.conexion === undefined ? "" : data.conexion,
        tiponodo: data === null || undefined ? "" : data.tiponodo === undefined ? "" : data.tiponodo,
        anchobanda: data === null || undefined ? "" : data.anchobanda === undefined ? "" : data.anchobanda,
        numerotelefonico: data === null || undefined ? "" : data.numerotelefonico === undefined ? "" : data.numerotelefonico,
        garantia: data === null || undefined ? "" : data.garantia === undefined ? "" : data.garantia,
        antivirus: data === null || undefined ? "" : data.antivirus === undefined ? "" : data.antivirus,
        ofimatica: data === null || undefined ? "" : data.ofimatica === undefined ? "" : data.ofimatica,
        sistemaoperativo: data === null || undefined ? "" : data.sistemaoperativo === undefined ? "" : data.sistemaoperativo,
        unidadadministrativa: data === null || undefined ? 0 : data.unidadadministrativa === undefined ? "" : data.unidadadministrativa,
        empleadoresguardo: data === null || undefined ? 0 : data.empleadoresguardo === undefined ? "" : data.empleadoresguardo,
        observaciones: data === null || undefined ? "" : data.observaciones === undefined ? "" : data.observaciones,
    };

}


export function isValidForm(equipo){
    let valido = true;

    //Validamos empleado
    if ( (typeof equipo.empleadoresguardo === "object") && ( equipo.empleadoresguardo !== null) ){
        equipo.empleadoresguardo = equipo.empleadoresguardo.id;
    }else if ( (typeof equipo.empleadoresguardo === "string") ){
        equipo.empleadoresguardo = parseInt(equipo.empleadoresguardo);
    }else{
        equipo.empleadoresguardo = 0;
    }
    // console.log(equipo.empleadoresguardo);

    //Validamos UA
    if ( (typeof equipo.unidadadministrativa === "object") && ( equipo.unidadadministrativa !== null) ){
        equipo.unidadadministrativa = equipo.unidadadministrativa.id;
    }else if ( (typeof equipo.unidadadministrativa === "string") ){
        equipo.unidadadministrativa = parseInt(equipo.unidadadministrativa);
    }else{
        equipo.unidadadministrativa = 0;
    }
    // console.log(equipo.unidadadministrativa);

    //Validamos Marca
    if ( ( typeof equipo.marca === "object") && ( equipo.marca !== null) ){
        equipo.marca = equipo.marca.id;
    }else if ( (typeof equipo.marca === "string") ){
        equipo.marca = parseInt(equipo.marca);
    }else{
        equipo.marca = 0;
    }
    // console.log(equipo.marca);

    let errorEquipo = "";
    let errorSerie = "";
    let errorInventario = "";
    let errorMarca = "";
    let errorUnidadAdministrativa = "";
    let errorEmpleadoResguardo = "";

    if (equipo.equipo === ""){
        errorEquipo = "Proporcione la descripción del Equipo";
        valido = false;
    }

    if (equipo.serie === ""){
        errorSerie = "Proporcione el número de Serie del equipo";
        valido = false;
    }

    if (equipo.inventario === ""){
        errorInventario = "Proporcione el número de Inventario del equipo";
        valido = false;
    }

    if (equipo.marca <= 0){
        errorMarca = "Debe seleccionar una Marca";
        valido = false;
    }

    if (equipo.empleadoresguardo <= 0){
        errorEmpleadoResguardo = "Debe seleccionar un Empleado";
        valido = false;
    }

    if (equipo.unidadadministrativa <= 0){
        errorUnidadAdministrativa = "Debe seleccionar una Unidad Administrativa";
        valido = false;
    }


    let obj = getObjEquipo({
        id : equipo.id,
        equipo: errorEquipo,
        serie: errorSerie,
        inventario: errorInventario,
        marca: errorMarca,
        empleadoresguardo: errorEmpleadoResguardo,
        unidadadministrativa: errorUnidadAdministrativa
    })

    return [valido, obj];

}