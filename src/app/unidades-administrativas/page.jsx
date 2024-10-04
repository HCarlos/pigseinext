"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UATable from "@/app/unidades-administrativas/UATable.jsx";

export const dynamic = "force-dynamic"

const UnidadesAdministrativas = () => {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Unidades Administrativas" />
            <div className="flex flex-col gap-10">
                <UATable />
            </div>
        </DefaultLayout>
    );

};

export default UnidadesAdministrativas;
