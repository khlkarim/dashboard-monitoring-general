"use client";
"use no memo";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { getColumns } from "./skills-columns";
import { Button } from "@/components/ui/button";
import { Skill } from "@/features/skills/types/skills.types";
import { TableCard } from "@/components/common/table-card";
import { BaseDialog } from "@/components/common/form-dialog";
import { TextSearch } from "@/components/common/table-toolbar";
import { DataTable } from "@/components/data-table/data-table";
import { SkillForm } from "@/features/skills/components/skill-form";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { useCreateSkill } from "@/features/skills/hooks/use-create-skill";
import { useUpdateSkill } from "@/features/skills/hooks/use-update-skill";
import { useDeleteSkill } from "@/features/skills/hooks/use-delete-skill";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { CreateSkillRequest } from "@/features/skills/schemas/skills.schemas";
import { UpdateSkillRequest } from "@/features/skills/schemas/skills.schemas";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Protect, RoleEnum } from "@/features/auth";

interface SkillTableProps {
  skills: Skill[];
}

export function SkillTable({ skills }: SkillTableProps) {
  const createMutation = useCreateSkill();
  const updateMutation = useUpdateSkill();
  const deleteMutation = useDeleteSkill();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [updatingSkill, setUpdatingSkill] = useState<Skill | null>(null);
  const [deletingSkill, setDeletingSkill] = useState<Skill | null>(null);

  const columns = getColumns(handleUpdate, handleDelete);
  const table = useDataTableInstance({
    data: skills,
    columns,
  })

  function handleCreate() {
    setIsCreateOpen(true);
  }

  function handleUpdate(skill: Skill) {
    setUpdatingSkill(skill);
    setIsUpdateOpen(true);
  }

  function handleDelete(skill: Skill) {
    setDeletingSkill(skill);
    setIsDeleteOpen(true);
  }

  async function handleCreateSubmit(data: CreateSkillRequest) {
    await createMutation.mutateAsync(data);
    setIsCreateOpen(false);
  };

  async function handleUpdateSubmit(data: UpdateSkillRequest) {
    if (updatingSkill) {
      await updateMutation.mutateAsync({ id: updatingSkill.id, data });
      setIsUpdateOpen(false);
    }
  };

  async function handleDeleteConfirm() {
    if (deletingSkill) {
      await deleteMutation.mutateAsync(deletingSkill.id);
      setIsDeleteOpen(false);
    }
  }

  return (
    <>
      <TableCard
        title="Skills"
        description="Manage and organize available skills."
        actions={
          <>
            <Protect
              allowedRoles={[RoleEnum.ADMINISTRATOR, RoleEnum.PRESIDENT]}
            >
              <Button onClick={handleCreate} size="sm">
                <Plus className="h-4 w-4" />
                Add Skill
              </Button>
            </Protect>
          </>
        }
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-2">
            <TextSearch
              table={table}
              columnId={"name"}
              placeholder={"Search by skill name..."}
            />

            {table.getState().columnFilters.length > 0 &&
              <Button
                variant="ghost"
                onClick={() => table.resetColumnFilters()}
                className="h-8 px-2 lg:px-3"
              >
                Reset
                <X className="ml-2 h-4 w-4" />
              </Button>
            }
          </div>

          <div className="flex items-center gap-2">
            <DataTableViewOptions table={table} />
          </div>
        </div>
        <div className="overflow-hidden rounded-md border">
          <DataTable table={table} columns={columns} />
        </div>
        <div className="py-4">
          <DataTablePagination table={table} />
        </div>
      </TableCard>

      <BaseDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        title="Add Skill"
        description="Define a new skill in the system."
      >
        <SkillForm
          onSubmit={handleCreateSubmit}
          isLoading={createMutation.isPending}
        />
      </BaseDialog>

      <BaseDialog
        open={isUpdateOpen}
        onOpenChange={setIsUpdateOpen}
        title="Update Skill"
        description="Make changes to the skill details."
      >
        <SkillForm
          initialData={updatingSkill}
          onSubmit={handleUpdateSubmit}
          isLoading={updateMutation.isPending}
        />
      </BaseDialog>

      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteMutation.isPending}
        confirmLabel="Delete"
        confirmVariant="destructive"
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete the Skill."
      />
    </>
  );
}
