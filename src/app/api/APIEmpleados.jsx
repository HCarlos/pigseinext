import axios from "axios";
import {getTokenAutorization} from "@/app/api/getToken.jsx";

export let Empleado = getObjEmpleado(null);

export async function getEmpleadosList(token) {
    let Empleados = [];
    await axios.get(process.env.NEXT_PUBLIC_API + "api/v1/empleados/",
        getTokenAutorization(token)
    ).then(response => {
        response.data.map( (data) =>
            Empleados.push(getObjEmpleado(data))
        );
    })
    .catch(error => {
        console.error(error.message);
    });
    return Empleados;
}

export async function getEmpleado(token,empleado_id) {
    await axios.get(process.env.NEXT_PUBLIC_API + "api/v1/empleados/"+empleado_id+"/",
        getTokenAutorization(token)
    ).then(response => {
        let data = response.data;
        Empleado = getObjEmpleado(data);
    })
    .catch(error => {
        console.error(error.message);
    });
    return Empleado;
}

export async function putEmpleado(token,empleado) {
    let obj = {};
    await axios.put(process.env.NEXT_PUBLIC_API + "api/v1/empleados/"+empleado.id+"/",
        empleado,
        getTokenAutorization(token)
    ).then(response => {
        if (response.status === 200){
            let data = response.data;
            Empleado = getObjEmpleado(data);
            obj = {status:response.status,message:response.status === 200 ? "OK" : response.message, data: Empleado};
        }
    })
    .catch(error => {
        obj = error.message;
    });
    return obj;
}

export async function newEmpleado(token,empleado) {
    let obj = {};
    await axios.post(process.env.NEXT_PUBLIC_API + "api/v1/empleados/",
        empleado,
        getTokenAutorization(token)
    ).then(response => {
        if (response.status === 200){
            let data = response.data;
            Empleado = getObjEmpleado(data);
            obj = {status:response.status,message:response.status === 200 ? "OK" : response.message, data: Empleado};
        }
    })
    .catch(error => {
        obj = error.message;
    });
    return obj;
}

export async function deleteEmpleado(token,empleado) {
    let obj = "";
    await axios.delete(process.env.NEXT_PUBLIC_API + "api/v1/empleados/"+empleado.id+"/",
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

export function getObjEmpleado(data){
    const empleado = {
        id: data == null ? 0 : data.id,
        ap_paterno: data == null ? "" : data.ap_paterno,
        ap_materno: data == null ? "" : data.ap_materno,
        nombre: data == null ? "" : data.nombre,
        curp: data == null ? "" : data.curp,
        rfc: data == null ? "" : data.rfc,
        celulares: data == null ? "" : data.celulares,
        emails: data == null ? "" : data.emails,
        domicilio: data == null ? "" : data.domicilio,
        numero_empleado: data == null ? "" : data.numero_empleado,
        full_name: data == null ? "" : data.full_name,
        short_name: data == null ? "" : data.short_name
    }
    return empleado;
}