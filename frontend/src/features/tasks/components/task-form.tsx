"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";

import { taskFormSchema, TaskFormValues, TaskStatus } from "@/features/tasks/schemas/tasks.schemas";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useGetUsers } from "@/features/users/hooks/use-get-users";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Task } from "../types/tasks.types";

interface TaskFormProps {
    initialData?: Task | null;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
}

export function TaskForm({ initialData, onSubmit, isLoading }: TaskFormProps) {
    const user = useAuthStore((state) => state.user);
    const { data: users } = useGetUsers();

    const form = useForm<TaskFormValues>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: {
            status: initialData?.status || TaskStatus.TODO,
            criticality: initialData?.criticality || null,
            deliverable: initialData?.deliverable || null,
            dueDate: initialData?.dueDate ? initialData.dueDate : "",
            startDate: initialData?.startDate ? initialData.startDate : "",
            description: initialData?.description || "",
            title: initialData?.title || "",
            assignee: initialData?.assignee || null,
            reporter: initialData?.reporter || null,
        },
    });

    const handleSubmit = (values: TaskFormValues) => {
        const apiData = {
            ...values,
            dueDate: values.dueDate,
            startDate: values.startDate,
            reporter: values.reporter ? {
                id: values.reporter.id,
            } : {
                id: user?.id,
            },
            assignee: values.assignee ? {
                id: values.assignee.id,
            } : undefined,
        };

        onSubmit(apiData);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Task Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Task Description"
                                    value={field.value || ""}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <DatePicker
                                        date={field.value ? new Date(field.value) : undefined}
                                        setDate={(date) => field.onChange(date?.toISOString() || "")}
                                        placeholder="Pick start date"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormLabel>Due Date</FormLabel>
                                <FormControl>
                                    <DatePicker
                                        date={field.value ? new Date(field.value) : undefined}
                                        setDate={(date) => field.onChange(date?.toISOString() || "")}
                                        placeholder="Pick due date"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="deliverable"
                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormLabel>Deliverable</FormLabel>
                                <FormControl>
                                    <Input placeholder="Deliverable" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="criticality"
                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormLabel>Criticality</FormLabel>
                                <FormControl>
                                    <Select

                                        value={field.value?.toString() || undefined}
                                        onValueChange={(value) => field.onChange(Number(value))}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select criticality" />
                                        </SelectTrigger>
                                        <SelectContent className="w-full">
                                            <SelectItem value="0">Low</SelectItem>
                                            <SelectItem value="1">Medium</SelectItem>
                                            <SelectItem value="2">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="assignee"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Assignee</FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value?.id || ""}
                                    onValueChange={(value) => {
                                        const selectedUser = users?.data.find((u) => u.id === value);
                                        field.onChange(selectedUser ? { id: selectedUser.id } : null);
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an assignee" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {users?.data.map((user) => (
                                            <SelectItem key={user.id} value={user.id}>
                                                {user.firstName} {user.lastName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : initialData ? "Update Task" : "Create Task"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
