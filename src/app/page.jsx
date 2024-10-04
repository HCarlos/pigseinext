"use client"

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import axios from "axios";
import ClaseGeneral from "@/app/api/ClaseGeneral.js";

export const dynamic = "force-dynamic"




function HomePage() {
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");
    const router = useRouter();
    let cg = new ClaseGeneral();
    let auth = ""


    const getProfile = async () => {
        const config= cg.getEncebezadoPost(auth);

        const bodyParams = {
            username:"",
            password:""
        };

        await axios.post(process.env.NEXT_PUBLIC_API +  "api/v1/profile/",
            bodyParams,
            config
        ).then(response => {
            setUsername(response.data.username);
            setToken(auth)
            console.log(response);

        })
            .catch(error => {
                    console.error(error.message);
                }
            );

    };

    const logout = async (e) => {
        e.preventDefault();

        const config= cg.getEncebezadoPost(auth);

        const bodyParams = {
            username:"",
            password:""
        };

        await axios.post(process.env.NEXT_PUBLIC_API +  "api/v1/logout/",
            bodyParams,
            config
            ).then(response => {
                window.localStorage.setItem("_handleCheck","")
                window.localStorage.setItem("_handleCheck_rt","")
                cg.setToken("")
                cg.setTokenRefresh("")
                setUsername("");
                setToken("")
                router.push("/login");
                console.log(response);

            })
            .catch(error => {
                router.push("/login");
                console.error(error.message);
            }
        );
    }


    useEffect(() => {

        cg.setToken(window.localStorage.getItem("_handleCheck"))
        cg.setTokenRefresh(window.localStorage.getItem("_handleCheck_rt"))


        if (cg.getToken() === ""){
            router.push("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        auth = "Bearer " + cg.getToken()

        getProfile().then(r => {
            return "";
        });

        // logout()

    }, []);




    return (
        <div >
            Hola {username}!

            <form onSubmit={logout}>

                <div>
                    <button type="submit"
                            className="flex mt-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Cerrar Sesión
                    </button>
                </div>
            </form>

        </div>

    )
};

export default HomePage;