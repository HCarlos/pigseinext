"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MarcaTable from "@/app/marcas/MarcaTable.jsx";

export const dynamic = "force-dynamic";

const Marcas = () => {

    return (
    <DefaultLayout>
      <Breadcrumb pageName="Marcas" />
      <div className="flex flex-col gap-10">
        <MarcaTable />
      </div>
    </DefaultLayout>
  );

};

export default Marcas;
