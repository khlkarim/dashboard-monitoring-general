import { useMemo } from "react";
import { KpisTable } from "./kpis-table";
import { Kpi } from "@/features/kpis/types/kpis.types";
import { Processus } from "@/features/processus/types/processus.types";

interface ProcessusToKpis {
    kpis: Kpi[];
    processus: Processus[];
}

export function ProcessusToKpis({ kpis, processus } : ProcessusToKpis) {
    const processusToKpis = useMemo<Map<Processus, Kpi[]>>(() => {
        const map = new Map();

        if(processus && kpis) {
            processus.forEach((p) => {
                map.set(p, kpis.filter(k => k.processus?.id === p.id));
            });
        }

        return map;
    }, [kpis, processus]); 

    console.log(processusToKpis);

    return (
        <>
            {Array.from(processusToKpis.entries()).map(([processus, processusKpis]) => {
                return (
                    <KpisTable
                        key={processus.id} 
                        processus={processus} 
                        kpis={processusKpis}
                    />
                );
            })}
        </>
    );
}