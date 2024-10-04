"use client";

import {useSearchParams} from "next/navigation";
import MarcaNewEdit from "@/app/marcas/MarcaNewEdit.jsx";
import EmpleadoNewEdit from "@/app/empleados/EmpleadoNewEdit.jsx";
import UANewEdit from "@/app/unidades-administrativas/UANewEdit.jsx";
import EquipoNewEdit from "@/app/equipos/EquipoNewEdit.jsx";


function DialogModal({data, model, key}) {
    const searchParams = useSearchParams();
    const dialogmodal = searchParams.get("dialog-modal");

    const renderCurrentSelection = () => {
        switch (model) {
            case "empleado":
                return <EmpleadoNewEdit data={data} key={key} />;
            case "marca":
                return <MarcaNewEdit data={data} key={key} />
            case "unidades-administrativas":
                return <UANewEdit data={data} key={key} />
            case "equipos":
                return <EquipoNewEdit data={data} key={key} />
            default:
                return null;
        }
    };

    return (
        <>
            {dialogmodal &&
                <dialog
                    className="fixed mt-10 left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
                    <div className="bg-white m-auto p-8 dark:border-strokedark dark:bg-graydark dark:text-white">
                        <div className="flex flex-col items-right ">
                            {renderCurrentSelection()}
                        </div>
                    </div>
                </dialog>
            }
        </>
    );
}

export default DialogModal;