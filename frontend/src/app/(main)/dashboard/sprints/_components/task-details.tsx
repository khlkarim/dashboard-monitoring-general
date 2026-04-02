"use client";

import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { TaskComments } from "./task-comments";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Task } from "@/features/tasks/types/tasks.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TaskDetailsProps {
  task: Task;
}

function formatDate(date?: string | null) {
  if (!date) return "—";
  return format(new Date(date), "dd MMM yyyy");
}

function userInitials(firstName?: string | null, lastName?: string | null) {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
}

export function TaskDetails({ task }: TaskDetailsProps) {
  return (
    <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold leading-tight">
              {task.title}
            </h2>

            <Badge variant="outline">
              {task.status.replace("_", " ")}
            </Badge>
          </div>

          {task.deliverable && (
            <p className="text-sm text-muted-foreground">
              Deliverable: {task.deliverable}
            </p>
          )}
        </div>

        <Separator />

        {/* Meta */}
        <Card>
          <CardContent className="grid grid-cols-2 gap-4 py-4 text-sm">
            <div>
              <p className="text-muted-foreground">Start date</p>
              <p className="font-medium">{formatDate(task.startDate)}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Due date</p>
              <p className="font-medium">{formatDate(task.dueDate)}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Criticality</p>
              <p className="font-medium">{task.criticality ?? "—"}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Created</p>
              <p className="font-medium">{formatDate(task.createdAt)}</p>
            </div>
          </CardContent>
        </Card>

        {/* People */}
        <div className="grid grid-cols-2 gap-6">
          {/* Reporter */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Reporter</p>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={task.reporter.photo?.path} />
                <AvatarFallback>
                  {userInitials(task.reporter.firstName, task.reporter.lastName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">
                  {task.reporter.firstName} {task.reporter.lastName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {task.reporter.email}
                </p>
              </div>
            </div>
          </div>

          {/* Assignee */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Assignee</p>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={task.assignee.photo?.path} />
                <AvatarFallback>
                  {userInitials(task.assignee.firstName, task.assignee.lastName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">
                  {task.assignee.firstName} {task.assignee.lastName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {task.assignee.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium">Description</p>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {task.description}
              </p>
            </div>
          </>
        )}
      </div>
      <TaskComments taskId={task.id} />
    </div>
  );
}
