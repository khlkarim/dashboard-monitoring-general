"use client";

import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { Skill } from "@/features/skills/types/skills.types";
import { useNavigationStore } from "@/navigation/store/navigation.store";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";

// Separate component to properly use hooks
function OpenSkillButton({ skill }: { skill: Skill }) {
  const router = useRouter();
  const { addSubNavItem } = useNavigationStore();

  const handleOpenSkill = () => {
    addSubNavItem(2, "Skills", {
      title: skill.title || "Untitled Skill",
      url: `/dashboard/skills/${skill.id}`,
    });
    router.push(`/dashboard/skills/${skill.id}`);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleOpenSkill}
    >
      Open
    </Button>
  );
}

export function getColumns(
  onEdit: (skill: Skill) => void,
  onDelete: (skill: Skill) => void
): ColumnDef<Skill>[] {
  return [
    {
      id: "select",
      enableHiding: false,
      enableSorting: false,
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
    },
    {
      accessorKey: "title",
      filterFn: "includesString",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ getValue }) => (
        <div className="truncate max-w-[200px]">
          {getValue<string>()}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ getValue }) => (
        <div className="truncate max-w-[300px]">
          {getValue<string>()}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <DataTableRowActions
              row={row}
              onEdit={() => onEdit(row.original)}
              onDelete={() => onDelete(row.original)}
            />
          </div>
        );
      },
    },
  ];
};
