import axios from "axios";
import {getTokenAutorization} from "@/app/api/getToken.jsx";
import {Empleado, getEmpleado, getObjEmpleado} from "@/app/api/APIEmpleados.jsx";

export let UA = getObjUA(null);

export async function getUAsList(token) {
    let UAs = [];
    await axios.get(process.env.NEXT_PUBLIC_API + "api/v1/unidades-administrativas-full/",
        getTokenAutorization(token)
    ).then(response => {
        response.data.map( (data) =>
            UAs.push(getObjUA(data))
        );
    })
        .catch(error => {
            console.error(error.message);
        });
    return UAs;
}

export async function getUA(token,ua_id) {

    await axios.get(process.env.NEXT_PUBLIC_API + "api/v1/unidades-administrativas/"+ua_id+"/",
        getTokenAutorization(token)
    ).then(response => {
        let data = response.data;
        UA = getObjUA(data);
    })
        .catch(error => {
            console.error(error.message);
        });
    return UA;
}

export async function putUA(token,ua) {
    let obj = {};
    const [valido, objtect] = isValidForm(ua);
    if (!valido) {
        return {status:"400",message:"Error", data: objtect};
    }
    // ua.titular = await getEmpleado(token,ua.titular)
    await axios.put(process.env.NEXT_PUBLIC_API + "api/v1/unidades-administrativas/"+ua.id+"/",
        ua,
        getTokenAutorization(token)
    ).then(response => {
        if (response.status === 200){
            let data = response.data;
            UA = getObjUA(data);
            obj = {status:response.status,message:response.status === 200 ? "OK" : response.message, data: UA};
        }
    }).catch(async error => {
        const response = error.response
        if ( typeof response.data.text === "function" ){
            obj = await response.data.text(); // => the response payload
        } else {
            obj = response.data;
        }
        console.log(obj);
    })
    return obj;
}

export async function newUA(token,ua) {
    let obj = {};

    const [valido, objtect] = isValidForm(ua);
    if (!valido) {
        return {status:"400",message:"Error", data: objtect};
    }

    // ua.titular = await getEmpleado(token,ua.titular)
    await axios.post(process.env.NEXT_PUBLIC_API + "api/v1/unidades-administrativas/",
        ua,
        getTokenAutorization(token)
    ).then(response => {
        if (response.status === 200){
            let data = response.data;
            UA = getObjUA(data);
            obj = {status:response.status,message:response.status === 200 ? "OK" : response.message, data: UA};
        }else{
            UA = getObjUA(null);
            obj = {status:response.status,message:"Error 01: " + response.message, data: UA};
        }
    }).catch(async error => {
        const response = error.response
        if ( typeof response.data.text === "function" ){
            obj = await response.data.text(); // => the response payload
        } else {
            obj = response.data;
        }
        UA = getObjUA(obj);
        obj = {status:response.status,message:"Error 02: " + response.message, data: UA};
        console.log(obj);
    })
    return obj;
}

export async function deleteUA(token,ua) {
    let obj = "";
    await axios.delete(process.env.NEXT_PUBLIC_API + "api/v1/unidades-administrativas/"+ua.id+"/",
        getTokenAutorization(token)
    ).then(response => {
        let data = response;
        if (response.status === 200){
            obj = {status:response.status,message:response.status === 200 ? "OK" : response.message, data: response};
        }
    })
    .catch(error => {
        obj = error.message;
    });
    return obj;
}

export function getObjUA(data){
    const ua = {
        id: data === null || undefined ? 0 : data.id === undefined ? 0 : data.id,
        unidad: data === null || undefined ? "" : data.unidad === undefined ? "" : data.unidad,
        abreviatura: data === null || undefined ? "" : data.abreviatura === undefined ? "" : data.abreviatura,
        titular: data === null || undefined ? 0 : data.titular === undefined ? "" : data.titular,
    }
    return ua;

}


export function isValidForm(ua){
    let valido = true;

    if ( (typeof ua.titular === "object") && ( ua.titular !== null) ){
        ua.titular = ua.titular.id;
    }else if ( (typeof ua.titular === "string") ){
        ua.titular = parseInt(ua.titular);
    }else{
        ua.titular = 0;
    }
    
    let errorTitular = "";
    let errorUnidad = "";
    let errorAbreviatura = "";

    if (ua.titular <= 0 ){
        errorTitular = "Debe seleccionar un titular";
        valido = false;
    }

    if (ua.unidad === ""){
        errorUnidad = "Proporcione el Nombre de la Unidad Administyrativa";
        valido = false;
    }

    if (ua.abreviatura === ""){
        errorAbreviatura = "Proporcione la Abreviatura de la Unidad Administyrativa";
        valido = false;
    }

    let obj = getObjUA({
        id : ua.id,
        unidad: errorUnidad,
        abreviatura: errorAbreviatura,
        titular: errorTitular,
    })

    return [valido, obj];

}