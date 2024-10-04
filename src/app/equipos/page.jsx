
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EquipoTable from "@/app/equipos/EquipoTable.jsx";

export const dynamic = "force-dynamic";

const Equipos = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Equipos" />
            <div className="flex ">
                <EquipoTable />
            </div>
        </DefaultLayout>
    );
};
export default Equipos;
