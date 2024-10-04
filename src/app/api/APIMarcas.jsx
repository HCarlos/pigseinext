import axios from "axios";
import {getTokenAutorization} from "@/app/api/getToken.jsx";

export let Marca = {
    id:0,
    marca:"",
    fabricante:"",
    activo:false
};

export async function getMarcasList(token) {

    let Marcas = [];
    //
    await axios.get(`${process.env.NEXT_PUBLIC_API}api/v1/marcas/`,
        getTokenAutorization(token)
    ).then(response => {
        response.data.map( (data) =>
            Marcas.push(Marca = {
                id: data.id,
                marca: data.marca,
                fabricante: data.fabricante,
                activo: data.activo
            })
        );
    })
    .catch(error => {
        console.error(error.message);
    });
    return Marcas;
}



export async function getMarca(token,marca_id) {

    await axios.get(process.env.NEXT_PUBLIC_API + "api/v1/marcas/"+marca_id+"/",
        getTokenAutorization(token)
    ).then(response => {
        let data = response.data;
        Marca = {
            id: data.id,
            marca: data.marca,
            fabricante: data.fabricante,
            activo: data.activo
        }
    })
        .catch(error => {
            console.error(error.message);
        });
    return Marca;
}



export async function putMarca(token,marca) {

    await axios.put(process.env.NEXT_PUBLIC_API + "api/v1/marcas/"+marca.id+"/",
        marca,
        getTokenAutorization(token)
    ).then(response => {
        let data = response.data;
        Marca = {
            id: data.id,
            marca: data.marca,
            fabricante: data.fabricante,
            activo: data.activo
        }
    })
        .catch(error => {
            console.error(error.message);
        });
    return Marca;
}



export async function newMarca(token,marca) {

    await axios.post(process.env.NEXT_PUBLIC_API + "api/v1/marcas/",
        marca,
        getTokenAutorization(token)
    ).then(response => {
        let data = response.data;
        Marca = {
            id: data.id,
            marca: data.marca,
            fabricante: data.fabricante,
            activo: data.activo
        }
        console.log(Marca);
    })
        .catch(error => {
            console.error(error.message);
        });
    return Marca;
}

export async function deleteMarca(token,marca) {

    await axios.delete(process.env.NEXT_PUBLIC_API + "api/v1/marcas/"+marca.id+"/",
        getTokenAutorization(token)
    ).then(response => {
        let data = response;
        console.log(response);
        return data;
    })
        .catch(error => {
            console.error(error.message);
        });
    return "Eliminado correctamente";
}
