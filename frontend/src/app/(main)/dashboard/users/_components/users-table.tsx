"use client";

import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/features/users/api/users.api";
import { columns } from "./columns";
import { EntityTable } from "@/components/common/entity-table";

export function UsersTable() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["users"],
        queryFn: () => usersApi.findAll(),
    });

    return (
        <EntityTable
            data={data?.data ?? []}
            columns={columns}
            title="Users"
            description="Track and manage all the users."
            isLoading={isLoading}
            isError={isError}
            error={error}
        />
    );
}
