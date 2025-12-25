"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useQuery } from "@tanstack/react-query";

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { sprintsApi } from "@/features/sprints/api/sprints.api";
import { KpiResponse } from "@/features/kpis/schemas/kpis.schemas";
import { useAuthStore } from "@/features/auth/store/auth.store";

// Schema for the form
const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    targetValue: z.string().optional(), // Input type="number" returns string usually, we parse later
    actualValue: z.string().optional(),
    sprintId: z.string().optional().nullable(),
});

type KpiFormValues = z.infer<typeof formSchema>;

interface KpiFormProps {
    initialData?: KpiResponse | null;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
}

export function KpiForm({ initialData, onSubmit, isLoading }: KpiFormProps) {
    const user = useAuthStore((state) => state.user);

    // Fetch sprints for the dropdown
    const { data: sprintsData } = useQuery({
        queryKey: ["sprints-select"],
        queryFn: () => sprintsApi.findAll(),
    });

    const form = useForm<KpiFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name || "",
            description: initialData?.description || "",
            targetValue: initialData?.targetValue?.toString() || "",
            actualValue: initialData?.actualValue?.toString() || "",
            sprintId: initialData?.sprint?.id || "none", // "none" to handle unassigning if needed
        },
    });

    // Reset form when initialData changes (for edit mode switching items)
    useEffect(() => {
        if (initialData) {
            form.reset({
                name: initialData.name,
                description: initialData.description || "",
                targetValue: initialData.targetValue?.toString() || "",
                actualValue: initialData.actualValue?.toString() || "",
                sprintId: initialData.sprint?.id || "none",
            });
        } else {
            form.reset({
                name: "",
                description: "",
                targetValue: "",
                actualValue: "",
                sprintId: "none",
            });
        }
    }, [initialData, form]);

    const handleSubmit = (values: KpiFormValues) => {
        const apiData = {
            ...values,
            targetValue: values.targetValue ? parseFloat(values.targetValue) : null,
            actualValue: values.actualValue ? parseFloat(values.actualValue) : null,
            sprint: values.sprintId && values.sprintId !== "none" ? { id: values.sprintId } : null,
            createdBy: {
                id: user?.id,
            },
        };

        if (values.sprintId && values.sprintId !== "none" && sprintsData?.data) {
            const selectedSprint = sprintsData.data.find(s => s.id === values.sprintId);
            if (selectedSprint) {
                // @ts-ignore
                apiData.sprint = selectedSprint;
            }
        } else {
            // @ts-ignore
            apiData.sprint = null;
        }

        onSubmit(apiData);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="KPI Name" {...field} />
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
                                <Textarea placeholder="KPI Description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="targetValue"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Target Value</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="100" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="actualValue"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Actual Value</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="50" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="sprintId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sprint</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || "none"}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a sprint" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="none">No Sprint</SelectItem>
                                    {sprintsData?.data.map((sprint) => (
                                        <SelectItem key={sprint.id} value={sprint.id}>
                                            {sprint.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : initialData ? "Update KPI" : "Create KPI"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
