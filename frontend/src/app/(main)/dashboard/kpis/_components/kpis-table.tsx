"use client";

import { useQuery } from "@tanstack/react-query";
import { kpisApi } from "@/features/kpis/api/kpis.api";
import { columns } from "./columns";
import { EntityTable } from "@/components/common/entity-table";

export function KpisTable() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["kpis"],
        queryFn: () => kpisApi.findAll(),
    });

    return (
        <EntityTable
            data={data?.data ?? []}
            columns={columns}
            title="KPIs"
            description="Track and manage all the KPIs."
            isLoading={isLoading}
            isError={isError}
            error={error}
        />
    );
}
