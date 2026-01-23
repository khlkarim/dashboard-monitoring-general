"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

import { TaskStatus } from "@/features/tasks/schemas/tasks.schemas";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useGetUsers } from "@/features/users/hooks/use-get-users";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const formSchema = z.object({
    status: z.enum([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE]).default(TaskStatus.TODO),
    criticality: z.number().optional().nullable(),
    deliverable: z.string().optional().nullable(),
    dueDate: z.date({
        required_error: "Due date is required",
    }),
    description: z.string().optional().nullable(),
    title: z.string().min(1, "Title is required"),
    reporter: z.object({ id: z.string() }).optional().nullable(),
    assignee: z.object({ id: z.string() }).optional().nullable(),
});

type TaskFormValues = z.infer<typeof formSchema>;

interface TaskFormProps {
    initialData?: {
        title?: string;
        description?: string | null;
        status?: TaskStatus;
        criticality?: number | null;
        deliverable?: string | null;
        dueDate?: string;
        assignee?: { id: string } | null;
        reporter?: { id: string } | null;
    } | null;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
    sprintId?: string;
}

export function TaskForm({ initialData, onSubmit, isLoading, sprintId }: TaskFormProps) {
    const user = useAuthStore((state) => state.user);
    const { data: users } = useGetUsers();

    const form = useForm<TaskFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: initialData?.status || TaskStatus.TODO,
            criticality: initialData?.criticality || null,
            deliverable: initialData?.deliverable || null,
            dueDate: initialData?.dueDate ? new Date(initialData.dueDate) : new Date(),
            description: initialData?.description || "",
            title: initialData?.title || "",
            assignee: initialData?.assignee || null,
            reporter: initialData?.reporter || null,
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                status: initialData.status || TaskStatus.TODO,
                criticality: initialData.criticality || null,
                deliverable: initialData.deliverable || null,
                assignee: initialData.assignee || null,
                reporter: initialData.reporter || null,
                dueDate: initialData.dueDate ? new Date(initialData.dueDate) : new Date(),
                description: initialData.description || "",
                title: initialData.title || "",
            });
        } else {
            form.reset({
                status: TaskStatus.TODO,
                criticality: null,
                deliverable: null,
                assignee: null,
                dueDate: new Date(),
                description: "",
                title: "",
            });
        }
    }, [initialData, form]);

    const handleSubmit = (values: TaskFormValues) => {
        const apiData = {
            ...values,
            dueDate: values.dueDate.toISOString(),
            sprint: sprintId ? { id: sprintId } : undefined,
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

                <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Due Date</FormLabel>
                            <FormControl>
                                <DatePicker
                                    date={field.value}
                                    setDate={field.onChange}
                                    placeholder="Pick due date"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value}
                                    onValueChange={(value) => field.onChange(value as TaskStatus)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={TaskStatus.TODO}>Planned</SelectItem>
                                        <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
                                        <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
