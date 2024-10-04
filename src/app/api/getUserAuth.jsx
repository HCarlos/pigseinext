import axios from "axios";
import ClaseGeneral from "@/app/api/ClaseGeneral.js";
import {getTokenAutorization} from "@/app/api/getToken.jsx";

export let User = {
    id:0,
    curp:"",
    rfc:"",
    domicilio:"",
    fecha_nacimiento:"",
    bio:"",
    facebook:"",
    twitter:"",
    linkedin:"",
    instagram:"",
    github:"",
    post:0,
    follower:0,
    folllowin:0,
    user:null
};

export default async function getUserAuth(token) {

    // console.log("Token => " + token);
    //
    const resp = await axios.post(process.env.NEXT_PUBLIC_API + "api/v1/profile/",
        {},
        getTokenAutorization(token)
    ).then(response => {
        let data = response.data;
        console.log("DataX => " + response);
        User = {
            id:data.id,
            curp:data.curp,
            rfc:data.rfc,
            domicilio:data.domicilio,
            fecha_nacimiento:data.fecha_nacimiento,
            bio:data.bio,
            facebook:data.facebook,
            twitter:data.twitter,
            linkedin:data.linkedin,
            instagram:data.instagram,
            github:data.github,
            post:data.post,
            follower:data.follower,
            folllowin:data.folllowin,
            user:data.user
        };
        console.log("User => " + User);
        return User;
    })
    .catch(error => {
            console.error("Mensaje de error al loguearse: " + error);
            return User;
        }
    );
    // console.log("User 2 => " + resp);
    return User;
};
