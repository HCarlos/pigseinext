import ClaseGeneral from "@/app/api/ClaseGeneral.js";

export const getTokenAutorization = (token) => {
    const cg = new ClaseGeneral();
    const auth = "Bearer " + token
    return cg.getEncebezadoPost(auth);
}