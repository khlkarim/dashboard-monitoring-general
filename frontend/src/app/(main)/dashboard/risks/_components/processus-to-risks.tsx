import { useMemo } from "react";
import { RisksTable } from "./risks-table";
import { Risk } from "@/features/risks/types/risks.types";
import { Processus } from "@/features/processus/types/processus.types";

interface ProcessusToRisks {
    risks: Risk[];
    processus: Processus[];
}

export function ProcessusToRisks({ risks, processus }: ProcessusToRisks) {
    const processusToRisks = useMemo<Map<Processus, Risk[]>>(() => {
        const map = new Map();

        if (processus && risks) {
            processus.forEach((p) => {
                map.set(p, risks.filter(k => k.processus?.id === p.id));
            });
        }

        return map;
    }, [risks, processus]);

    return (
        <>
            {Array.from(processusToRisks.entries()).map(([processus, processusRisks]) => {
                return (
                    <RisksTable
                        key={processus.id}
                        processus={processus}
                        risks={processusRisks}
                    />
                );
            })}
        </>
    );
}