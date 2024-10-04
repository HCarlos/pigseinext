"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EmpleadoTable from "@/app/empleados/EmpleadoTable.jsx";


const Empleados = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Empleados" />
            <div className="flex flex-col gap-10">
                <EmpleadoTable />
            </div>
        </DefaultLayout>
    );
};
export default Empleados;
