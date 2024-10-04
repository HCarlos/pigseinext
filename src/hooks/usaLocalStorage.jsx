"use client"

export default function usaLocalStorage(key, value, type) {
    let valor = "";

    if (type === 0){
            window.localStorage.setItem(key, value)
            valor = value;
    }else{
        if (window.localStorage.getItem(key) !== "" &&
            window.localStorage.getItem(key) != null &&
            window.localStorage.getItem(key) !== undefined ){
            valor = window.localStorage.getItem(key)
        }
    }
    return valor;
};
