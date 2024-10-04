"use client";

import {useSearchParams, usePathname} from "next/navigation";
import EmpleadoDelete from "@/app/empleados/EmpleadoDelete.jsx";
import MarcaDelete from "@/app/marcas/MarcaDelete.jsx";
import UADelete from "@/app/unidades-administrativas/UADelete.jsx";
import EquipoDelete from "@/app/equipos/EquipoDelete.jsx";

function DialogModalDelete({data, model, key}) {
    const searchParams = useSearchParams();
    const dialogmodaldelete = searchParams.get("dialog-modal-delete");

    // console.log(model);

    const renderCurrentSelection = () => {
        switch (model) {
            case "empleado":
                return <EmpleadoDelete data={data}  key={key} />;
            case "marca":
                return <MarcaDelete data={data}  key={key} />
            case "unidades-administrativas":
                return <UADelete data={data}  key={key} />
            case "equipos":
                return <EquipoDelete data={data} key={key} />
            default:
                return null;
        }
    };


    return (
        <>
            {dialogmodaldelete &&
                <dialog
                    className="fixed mt-10 left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
                    <div className="bg-white m-auto p-8 dark:border-strokedark dark:bg-graydark dark:text-white">
                        <div className="flex flex-col items-right">
                            {renderCurrentSelection()}
                        </div>
                    </div>
                </dialog>
            }
        </>
    );
}

export default DialogModalDelete;