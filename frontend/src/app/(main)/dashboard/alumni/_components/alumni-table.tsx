"use client";

import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/features/users/api/users.api";
import { columns } from "./columns";
import { EntityTable } from "@/components/common/entity-table";

export function AlumniTable() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["alumnis"],
        queryFn: () => usersApi.getAlumni(),
    });

    return (
        <EntityTable
            data={data?.data ?? []}
            columns={columns}
            title="Alumni"
            description="Track and manage all the alumni."
            isLoading={isLoading}
            isError={isError}
            error={error}
            searchColumn="email"
        />
    );
}
